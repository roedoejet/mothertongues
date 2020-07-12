from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter
from mtd.processors.transducer import Transducer
from mtd.processors.validator import return_null, return_dupes
from mtd.exceptions import DfValidationError, DuplicateDataNameError, TransducerSourceNotFoundError
from mtd.languages import LanguageConfig
from mtd.parsers.utils import ResourceManifest
from mtd.tests import logger
import os
import json
import pandas as pd
from numpy import nan
from typing import Dict, List, Union
from slugify import slugify
import datetime

class Dictionary():
    """A Mother Tongues Dictionary object containing all of your dictionary data.

    Args:
        language_config (LanguageConfig): Configuration object to initialize Dictionary

    Attributes:
        config (dict): LanguageConfig
        df (pandas.DataFrame): A parsed, transduced, sorted, joined and indexed DataFrame of the data provided by the language_config that initialized the class instance
        name (str): Name of Dictionary
        data_objs (list): List of dicts containing ResourceManifest and parsed data
     
    Note:
        Calling len on a Dictionary gives the length of the dataframe ie. how many entries are in the dictionary. Dictionary is a subscriptable class which accesses the row in the dataframe at the given index
    """
    def __init__(self, language_config):
        self.config = language_config['config']
        self.name = slugify(self.config['L1'])
        # parse
        self.data_objs = [parse(d['manifest'], d['resource']) for d in language_config['data']]
        # validate
        for do in self.data_objs:
            do['data'] = do['data'].replace('', nan)
            if return_null(do['data']):
                logger.warning('Removing null rows')
                do['data'] = do['data'].dropna(subset=['word'], how='all')
        # transduce
        self.transduce()
        # sort
        self.sort()
        # join
        self._df = self.joined()
        # index
        self.index_key_to_column()
        # validate ID
        if not self.validate_id(self._df):
            logger.warning("No value for 'entryID' was found in your data. Using index instead. Note, this will not be consistent across builds.")
            self._df['entryID'] = self._df.index.astype(str)
        # log dupes
        dupes = return_dupes(self._df)
        
    def __len__(self):
        return len(self._df.index)
    
    def __getitem__(self, position):
        return self._df.iloc[[position]]
        
    @property
    def df(self):
        return self._df
    
    @df.setter
    def df(self, value: pd.DataFrame):
        self._df = value

    def validate_id(self, df) -> bool:
        if not "entryID" in df:
            return False
        else:
            return return_null(df, notnull=['entryID'])

    def joined(self) -> pd.DataFrame:
        keys = []
        dfs = []
        for d in self.data_objs:
            dfs.append(d['data'])
            keys.append(d['manifest']['name'])
        if len(keys) != len(set(keys)):
            raise DuplicateDataNameError
        return pd.concat(dfs, keys=keys)

    def index_key_to_column(self) -> None:
        indexed = self._df.reset_index(level=0)
        indexed.rename(columns={"level_0": "source"}, inplace=True)
        self._df = indexed
    
    def sort(self, order=list(ascii_lowercase)) -> List[Dict[str, Union[ResourceManifest, pd.DataFrame]]]:
        """Return sorted data. Also sorts self.data_objs

        :param list order: an order to sort by, default is ascii_lowercase
        """
        if "alphabet" in self.config:
            order = self.config['alphabet']
        arbsorter = ArbSorter(order)
        sorted_data_objs = []
        for data_obj in self.data_objs:
            sort_key = data_obj['manifest']['sorting']
            data_obj['data'] = arbsorter.add_to_data_frame(data_obj['data'], sort_key)
            sorted_data_objs.append(data_obj)
        return sorted_data_objs

    def transduce(self) -> List[Dict[str, Union[ResourceManifest, pd.DataFrame]]]:
        '''Return transduced data objs. Also transduces self.data_objs
        '''
        transduced_data_objs = []
        for data_obj in self.data_objs:
            df = data_obj['data']
            transducers = []
            if "transducers" in data_obj['manifest']:
                transducers = data_obj['manifest']['transducers']
            transducer = Transducer(transducers)
            data_obj['data'] = transducer.apply_to_data_frame(df)
        return transduced_data_objs

    def flatten_entry(self, y):
        """not yet working. creates unnecessary optional_0, optional_1"""
        out = {}
        def flatten(x, name=''):
            if type(x) is dict:
                for a in x:
                    flatten(x[a], name + a + '_')
            elif type(x) is list:
                i = 0
                for a in x:
                    flatten(a, name + str(i) + '_')
                    i += 1
            else:
                out[name[:-1]] = x
        flatten(y)
        return out
    
    def return_flattened_data(self):
        return [self.flatten_entry(e) for e in self._df.to_dict(orient='records')]

    def return_formatted_config(self, form: str="js") -> Union[str, dict]:
        '''Return config for Dictionary as either obj, js, or json.
        '''
        config_template_object = {"L1": {"name": self.config['L1'],
                                              "lettersInLanguage": self.config['alphabet']},
                                       "L2": {"name": self.config['L2']},
                                    "build": datetime.datetime.today().strftime('%Y%m%d%H%M')}
        ## Add transducer name that converts search queries
        if 'L1_compare_transducer_name' in self.config:
            config_template_object['L1']['compare'] = self.config['L1_compare_transducer_name']
        if "audio_path" in self.config:
            config_template_object['audio_path'] = self.config['audio_path']
        if "img_path" in self.config:
            config_template_object['img_path'] = self.config['img_path']
        if form == 'obj':
            return config_template_object
        elif form == 'js':
            ## Add adhoc_vars
            adhoc_vars = ''
            if "adhoc_vars" in self.config:
                adhoc_vars = []
                for av in self.config['adhoc_vars']:
                    for k,v in av.items():
                        adhoc_vars.append(f"var {k} = {v};")
                adhoc_vars = "\n".join(adhoc_vars)
            ## Add transducers
            transducers_config = {}
            for data_obj in self.data_objs:
                transducers = []
                if "transducers" in data_obj['manifest']:
                    transducers = data_obj['manifest']['transducers']
                transducer_obj = Transducer(transducers)
                configs = transducer_obj.return_mapping_configs()
                config_template_object["L1"]["transducers"] = configs
            return f"var config = {json.dumps(config_template_object)}" + adhoc_vars
        elif form == 'json':
            return json.dumps(config_template_object)

    def return_formatted_data(self, form: str="js") -> Union[str, dict]:
        '''Return data for Dictionary as either obj, js or json.
        '''
        formatted_json = json.dumps(self._df.to_dict(orient='records'))
        if form == 'obj':
            return self._df.to_dict(orient='records')
        elif form == 'json':
            return formatted_json
        elif form == 'js':
            return f"var dataDict = {formatted_json}"

    def export_raw_data(self, export_path, export_type = "json", flatten = True):
        """Use pandas export functions with some sensible defaults to export raw data to xlsx/json/csv/psv/tsv/html
        
        Args:
            export_path (str): the path to export to
            export_type (str, optional): the type of file to export (json, psv, csv, tsv, html, xlsx). Defaults to 'json'.
            flatten (bool, optional): whether to flatten the data. Defaults to True.
        
        Returns:
            None: Writes file to path instead.

        Note:
            This method exports **raw** data, not formatted data which is required for Mother Tongues apps
        """
        export_path = os.path.abspath(export_path)
        flattened = self.return_flattened_data()
        if flatten:
            df = pd.DataFrame(flattened)
        else:
            df = self._df
        if os.path.isdir(export_path):
            export_path = os.path.join(export_path, f"output.{export_type}")
        if not export_path.endswith(export_type):
            raise TypeError(f"Export type of {export_type} does not match file at {export_path}")
        if export_type == "xlsx":
            writer = pd.ExcelWriter(export_path)
            df.to_excel(writer, 'sheet1', index=False, merge_cells=False)
            writer.save()
        else:
            with open(export_path, 'w', encoding='utf8') as f:
                if export_type == "json":
                    df.to_json(f, orient='records', force_ascii=False)
                elif export_type == "csv":
                    df.to_csv(f, encoding='utf-8', index=False)
                elif export_type == "psv":
                    df.to_csv(f, sep='|', encoding='utf-8', index=False)
                elif export_type == "tsv":
                    df.to_csv(f, sep='\t', encoding='utf-8', index=False)
                elif export_type == "html":
                    utf8 = "<head><meta charset=\"UTF-8\"></head>"
                    f.write(utf8)
                    df.to_html(f)
            