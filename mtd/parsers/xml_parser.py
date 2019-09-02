from mtd.parsers.utils import BaseParser
from lxml import etree
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
import pandas as pd
from tqdm import tqdm

class Parser(BaseParser):
    '''
     Parse data for MTD. Location (XPath) specifies path to entry elements.

    :param ResourceManifest manifest: Manifest for parser
    :param str resource_path: path to file 
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: Union[str, dict, list]):
        self.manifest = manifest
        if isinstance(resource_path, str):
            self.resource = etree.parse(resource_path)
        elif isinstance(resource_path, etree._Element):
            self.resource = resource_path
        self.entry_template = self.manifest['targets']
        if "location" in self.manifest and self.manifest['location']:
            self.resource = self.resource.xpath(self.manifest['location'])

    def getValueFromXpath(self, entry: etree._Element, xpath: str) -> str:
        ''' Supports XPaths to elements. Location *must* be xpath to all entry elements.
            All other XPaths are relative to those entry elements.
        '''
        return entry.xpath(xpath)

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in tqdm(self.resource):
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getValueFromXpath))
        return word_list

    def fill_listof_entry_template(self, listof_dict: dict, entry, convert_function) -> list:
        '''This recursive function "fills in" the data according to the resoruce manifest, but for data that uses xpaths or jsonpaths and not specific locations like columns or indices.

        Args:
            :param dict listof_dict: The dict containing a path to the elements to create a list from, and a path to the values
        '''
        # return a list of elements following the path defined in listof_dict['listof']
        listof = convert_function(entry, listof_dict['listof'])
        # allow for nested "listof" parsing
        if isinstance(listof_dict['value'], dict) and "listof" in listof_dict['value']:
            new_els = []
            for el in listof:
                el = self.fill_listof_entry_template(listof_dict['value'], el, convert_function)
                new_els.append(el)
            return new_els
        # parse all k,v in a dict
        elif isinstance(listof_dict['value'], dict):
            new_els = []
            for el in listof:
                new_el = {}
                for k,v in listof_dict['value'].items():
                    new_el[k] = self.validate_type(k, convert_function(el, v.strip()))
                new_els.append(new_el)
            return new_els
        # or just parse strings
        else:
            return [convert_function(el, listof_dict['value'])[0] for el in listof]
        
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
                    new_v += list(self.fill_entry_template({k: x}, entry, convert_function).values())
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = self.validate_type(k, convert_function(entry, v.strip()))
                except:
                    breakpoint()
        return new_lemma

    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        data = self.resolve_targets()
        return {"manifest": self.manifest, "data": pd.DataFrame(data)}