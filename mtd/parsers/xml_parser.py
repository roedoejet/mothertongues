from mtd.parsers.utils import BaseParser
from lxml import etree
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
import pandas as pd

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
        if entry.xpath(f"count({xpath})") == 1.0:
            return entry.xpath(xpath)[0]
        else:
            return entry.xpath(xpath)

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getValueFromXpath))
        return word_list

    # def manifest_key_is_list(self, key: str, manifest: dict) -> Union[dict, list, str]:
    #     for k, v in manifest.items():
    #         if isinstance(v, list):
    #             for item in v:
    #                 if self.manifest_key_is_list(key, item):
    #                     return True
    #         elif isinstance(v, dict):
    #             if self.manifest_key_is_list(key, v):
    #                 return True
    #         else:
    #             if k == key:
    #                 return isinstance(v, list) 
    #     return False
    
    def return_manifest_key_type(self, key: str, manifest: dict) -> Union[dict, list, str]:
        '''Given a key in a nested dict, return the type of the corresponding value
        '''
        for k, v in manifest.items():
            if k == key:
                return type(v)
            elif isinstance(v, list):
                for item in v:
                    if self.return_manifest_key_type(key, item) is not None:
                        return self.return_manifest_key_type(key, item)
            elif isinstance(v, dict):
                if type(self.manifest_key_is_list(key, v)) is not None:
                    return self.return_manifest_key_type(key, v)

    # def resolve_lists(self, word_list: List) -> List[dict]:
        
        
    
    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        breakpoint()
        data = self.resolve_targets()
        
        resolved = self.resolve_lists(data)
        # breakpoint()
        return {"manifest": self.manifest, "data": pd.DataFrame(data)}