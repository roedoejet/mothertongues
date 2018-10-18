from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter
from mtd.processors.transducer import Transducer
from mtd.processors.validator import DfValidator
from mtd.exceptions import DuplicateDataNameError, TransducerSourceNotFoundError
import os
import json
import pandas as pd

class Builder():
    def __init__(self, config_object):
        self.config = config_object
        self.parsed_data = []
        for d in config_object['data']:
            self.parsed_data.append(parse(d['manifest'], d['resource']))
        self.transduced_data = []
        for d in self.parsed_data:
            self.transduced_data.append(self.transduce(d))
        self.sorted_transduced_data = []
        for d in self.transduced_data:
            self.sorted_transduced_data.append(self.sort(d))
        
    def sort(self, data_obj, order=list(ascii_lowercase)):
        """Return sorted data

        :param dict data_obj: each 'data object' has two keys, 'manifest' and 'data' dataframe
        :param list order: an order to sort by, default is ascii_lowercase
        """
        arbsorter = ArbSorter(order)
        sort_key = data_obj['manifest']['sorting']
        data_obj['data'] = arbsorter.add_to_data_frame(data_obj['data'], sort_key)
        return data_obj

    def transduce(self, data_obj):
        df = data_obj['data']
        transducers = []
        if "transducers" in data_obj['manifest']:
            transducers = data_obj['manifest']['transducers']
        transducer = Transducer(transducers)
        data_obj['data'] = transducer.apply_to_data_frame(df)
        return data_obj

    def validate(self, data_obj):
        df = data_obj['data']
        dfvalidator = DfValidator(df)
        return dfvalidator.check_not_null()

    def join(self, data_objs):
        keys = []
        dfs = []
        for d in data_objs:
            dfs.append(d['data'])
            keys.append(d['manifest']['name'])
        if len(keys) != len(set(keys)):
            raise DuplicateDataNameError
        return pd.concat(dfs, keys=keys)

    def index_key_to_column(self, df):
        indexed = df.reset_index(level=0)
        indexed.rename(columns={"level_0": "source"}, inplace=True)
        return indexed
    
    def return_config_js(self, form="js"):
        config = self.config['config']
        config_template_object = {"L1": {"name": config['L1'],
                                              "lettersInLanguage": config['alphabet']},
                                       "L2": {"name": config['L2']}}
        if form == 'obj':
            return config_template_object
        elif form == 'js':
            return f"var config = {json.dumps(config_template_object)}"
        elif form == 'json':
            return json.dumps(config_template_object)
    
    def return_dict_from_data_objs(self, form="js"):
        formatted_data_obj = {}
        for data_obj in self.sorted_transduced_data:
            df = data_obj['data']
            if not data_obj['manifest']['name'] in formatted_data_obj:
                formatted_data_obj[data_obj['manifest']['name']] = df.to_dict(orient='records')
            else:
                print('Should raise error, and figure out merging')
        formatted_json = json.dumps(formatted_data_obj)
        if form == 'json':
            return formatted_json
        elif form == 'js':
            return f"var dataDict = {formatted_json}"

    def return_dict_from_df(self, df, form="js"):
        formatted_json = json.dumps(df.to_dict(orient='records'))
        if form == 'json':
            return formatted_json
        elif form == 'js':
            return f"var dataDict = {formatted_json}"

    def export_processed_df_as(self, df, export_path, export_type="json"):
        """Use pandas export functions with some sensible defaults
        to export raw data to xlsx/json/csv/psv/tsv/html
        """
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
            