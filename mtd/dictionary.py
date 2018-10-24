from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter
from mtd.processors.transducer import Transducer
from mtd.processors.validator import DfValidator
from mtd.exceptions import DfValidationError, DuplicateDataNameError, TransducerSourceNotFoundError
import os
import json
import pandas as pd
from slugify import slugify

class Dictionary():
    """A Mother Tongues Dictionary object

    - Properties:
        df (pandas.DataFrame): A parsed, transduced, sorted, joined and indexed DataFrame of the data provided by the language_config that initialized the class instance

    - Attributes:
        config (dict): dict from LanguageConfig
        name (str): Name of Dictionary
        data_objs (list): List of dicts containing ResourceManifest and parsed data
     
    Calling len on a Dictionary gives the length of the dataframe ie. how many entries
    Dictionary is a subscriptable class which access the row in the dataframe at the given index
    """
    def __init__(self, language_config):
        self.config = language_config['config']
        self.name = slugify(self.config['L1'])
        self.data_objs = language_config['data']
        # parse
        self.data_objs = [parse(d['manifest'], d['resource']) for d in self.data_objs]
        # transduce
        self.transduce()
        # sort
        self.sort()
        # join
        self._df = self.joined()
        # index
        self.index_key_to_column()
        # validate
        self.validate(self._df)

    def __len__(self):
        return len(self._df.index)
    
    def __getitem__(self, position):
        return self._df.iloc[[position]]
        
    @property
    def df(self):
        return self._df
    
    @df.setter
    def df(self, value):
        if not self.validate(value):
            raise DfValidationError
        self._df = value

    def validate(self, df):
        dfvalidator = DfValidator(df)
        return dfvalidator.check_not_null()

    def joined(self):
        keys = []
        dfs = []
        for d in self.data_objs:
            dfs.append(d['data'])
            keys.append(d['manifest']['name'])
        if len(keys) != len(set(keys)):
            raise DuplicateDataNameError
        return pd.concat(dfs, keys=keys)

    def index_key_to_column(self):
        indexed = self._df.reset_index(level=0)
        indexed.rename(columns={"level_0": "source"}, inplace=True)
        self._df = indexed
    
    def sort(self, order=list(ascii_lowercase)):
        """Return sorted data

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

    def transduce(self):
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
    
    def return_formatted_config(self, form="js"):
        config_template_object = {"L1": {"name": self.config['L1'],
                                              "lettersInLanguage": self.config['alphabet']},
                                       "L2": {"name": self.config['L2']}}
        if form == 'obj':
            return config_template_object
        elif form == 'js':
            return f"var config = {json.dumps(config_template_object)}"
        elif form == 'json':
            return json.dumps(config_template_object)

    def return_formatted_data(self, form="js"):
        formatted_json = json.dumps(self._df.to_dict(orient='records'))
        if form == 'json':
            return formatted_json
        elif form == 'js':
            return f"var dataDict = {formatted_json}"

    def export_raw_data(self, export_path, export_type="json"):
        """Use pandas export functions with some sensible defaults
        to export raw data to xlsx/json/csv/psv/tsv/html
        
        .. note:: Dictionary.export_raw_data exports **raw** data, not formatted data which is required
        """
        if os.path.isdir(export_path):
            export_path = os.path.join(export_path, f"output.{export_type}")
        if not export_path.endswith(export_type):
            raise TypeError(f"Export type of {export_type} does not match file at {export_path}")
        if export_type == "xlsx":
            writer = pd.ExcelWriter(export_path)
            self._df.to_excel(writer, 'sheet1', index=False, merge_cells=False)
            writer.save()
        else:
            with open(export_path, 'w', encoding='utf8') as f:
                if export_type == "json":
                    self._df.to_json(f, orient='records', force_ascii=False)
                elif export_type == "csv":
                    self._df.to_csv(f, encoding='utf-8', index=False)
                elif export_type == "psv":
                    self._df.to_csv(f, sep='|', encoding='utf-8', index=False)
                elif export_type == "tsv":
                    self._df.to_csv(f, sep='\t', encoding='utf-8', index=False)
                elif export_type == "html":
                    utf8 = "<head><meta charset=\"UTF-8\"></head>"
                    f.write(utf8)
                    self._df.to_html(f)
            