import json
from jsonpointer import resolve_pointer, JsonPointerException
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
from jsonpath_rw import parse as json_parse

class Parser(BaseParser):
    '''
    Parse data for MTD. location (jsonpath) specifies location of data

    :param ResourceManifest manifest: Manifest for parser
    :param (str or json) resource_path: JSON or path to JSON
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: Union[str, dict, list]):
        self.manifest = manifest
        try:
            if isinstance(resource_path, str):
                with open(resource_path, encoding='utf8') as f:
                    self.resource = json.load(f)
            elif isinstance(resource_path, (dict, list)):
                self.resource = resource_path
        except ValueError:
            raise SchemaValidationError('json', resource_path)
        if "location" in self.manifest:
            self.resource = resolve_pointer(self.resource, self.manifest['location'])
        self.entry_template = self.manifest['targets']

    def getValueFromJsonPath(self, entry: dict, path: str):
        jsonpath_expr = json_parse(path)
        return jsonpath_expr.find(entry)

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getValueFromJsonPath))
        return word_list

    def fill_listof_entry_template(self, listof_dict: dict, entry, convert_function) -> list:
        listof = [match for match in convert_function(entry, listof_dict['listof'])]
        if isinstance(listof_dict['value'], dict) and "listof" in listof_dict['value']:
            new_els = []
            listof_dict['listof'] = listof_dict['value']['listof']
            listof_dict['value'] = listof_dict['value']['value']
            for el in listof:
                json_expr = json_parse(f"{el.full_path}")
                items = [match.value for match in json_expr.find(entry)][0]
                for item in items:
                    i = items.index(item)
                    item_json_expr = json_parse(f"{json_expr}.[{i}]")
                    new_entry = [match.value for match in item_json_expr.find(entry)]
                    el = self.fill_listof_entry_template(listof_dict, new_entry, convert_function)
                    new_els.append(el)
            return new_els
        elif isinstance(listof_dict['value'], dict):
            new_els = []
            items = [match.value for match in listof][0]
            if isinstance(items, dict):
                items = [items]
            json_expr = listof[0].full_path
            for el in items:
                i = items.index(el)
                new_el = {}
                for k,v in listof_dict['value'].items():
                    new_json_expr = json_parse(f"{json_expr}.[{i}].[{v}]")
                    new_el[k] = self.validate_type(k, [match.value for match in new_json_expr.find(entry)])
                new_els.append(new_el)
            return new_els
        else:
            new_els = []
            for el in listof:
                i = listof.index(el)
                json_expr = json_parse(f"{el.full_path}.[{i}]")
                new_json_expr = json_parse(f"{json_expr}.{listof_dict['value']}")
                new_el = [match.value for match in new_json_expr.find(entry)][0]
                new_els.append(new_el)
            return new_els

    def fill_entry_template(self, entry_template: dict, entry, convert_function) -> dict:
        '''This recursive function "fills in" the data according to the resource manifest. This is a slight modification from the one used by all parsers.

        Args:
            :param dict entry_template: The template for an entry. Keys are preserved, values are usually paths in the resource to data (JSONPath, XPath or Cell coordinates etc)
            :param any entry: The actual word/entry to extract some data from. This could be a row, or json dict or any piece of nested data from the data resource.
            :param function convert_function: A function that takes an entry and a path and returns the "filled in" object
        '''
        new_lemma = {}
        
        for k, v in entry_template.items():
            if isinstance(v, dict):
                # listof syntax used for jsonpath/xpath type parsers
                if "listof" in v:
                    new_lemma[k] = self.fill_listof_entry_template(v, entry, convert_function)
                else:
                    new_lemma[k] = self.fill_entry_template(v, entry, convert_function)
            elif isinstance(v, list):
                new_v = list()
                for x in v:
                    value = list(self.fill_entry_template({k: x}, entry, convert_function).values())
                    if value[0]:
                        new_v += value
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = self.validate_type(k, convert_function(entry, v))
                except:
                    breakpoint()
        return new_lemma
    
    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            # breakpoint()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except JsonPointerException as e:
            raise e
