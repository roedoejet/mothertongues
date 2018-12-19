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
        return entry.xpath(xpath)

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getValueFromXpath))
        return word_list
    
    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        data = self.resolve_targets()
        return {"manifest": self.manifest, "data": pd.DataFrame(data)}