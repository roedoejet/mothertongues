import json
from jsonpointer import resolve_pointer, JsonPointerException
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
from jsonpath_ng import parse as json_parse
from tqdm import tqdm

class Parser(BaseParser):
    '''
    Parse data for MTD. location (jsonpath) specifies location of data

    :param ResourceManifest manifest: Manifest for parser
    :param (str or json) resource_path: JSON or path to JSON
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: Union[str, dict, list]):
        self.manifest = manifest
        self.path_cache = {}
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

    def get_matcher(self, path: str):
        if path not in self.path_cache:
            self.path_cache[path] = json_parse(path)
        return self.path_cache[path]

    def getValueFromJsonPath(self, entry: dict, path: str):
        jsonpath_expr = self.get_matcher(path)
        result = jsonpath_expr.find(entry)
        if not result:
            result = ''
        return result

    def resolve_targets(self) -> List[dict]:
        return [
            self.fill_entry_template(
                self.entry_template, entry, self.getValueFromJsonPath
            )
            for entry in tqdm(self.resource)
        ]

    def fill_listof_entry_template(self, listof_dict: dict, entry, convert_function) -> list:
        # Run the query
        listof = convert_function(entry, listof_dict['listof'])
        if not listof:
            return listof
        new_els = []
        if "value" in listof_dict:
            # Legacy (somewhat bogus) behaviour, which assumes an extra list somewhere
            if isinstance(listof_dict['value'], dict) and "listof" in listof_dict['value']:
                # Recurse one level down (apparently no more than this)
                listof_dict['listof'] = listof_dict['value']['listof']
                listof_dict['value'] = listof_dict['value']['value']
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_el = self.fill_listof_entry_template(listof_dict, item, convert_function)
                        new_els.append(new_el)
            elif isinstance(listof_dict['value'], dict):
                # Create outputs with dictionaries of queries from "value" on results
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_el = {}
                        for k, v in listof_dict['value'].items():
                            new_json_expr = self.get_matcher(v.strip())
                            new_el[k] = self.validate_type(k, [match.value for match in new_json_expr.find(item)])
                        new_els.append(new_el)
            else:
                # Do ... something, totally ignoring the "value" key
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_els.append(item)
        else:
            # New mode, just give me the list of items THAT I ASKED FOR
            for el in listof:
                new_els.append(el.value)

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
                if "listof" in v:
                    new_lemma[k] = self.fill_listof_entry_template(v, entry, convert_function)
                else:
                    new_lemma[k] = self.fill_entry_template(v, entry, convert_function)
            elif isinstance(v, list):
                new_v = []
                for x in v:
                    value = list(self.fill_entry_template({k: x}, entry, convert_function).values())
                    if value[0]:
                        new_v += value
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = self.validate_type(k, convert_function(entry, v.strip()))
                except:
                    breakpoint()
        return new_lemma

    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except JsonPointerException as e:
            raise e
