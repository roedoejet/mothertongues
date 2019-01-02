import json
from jsonpointer import resolve_pointer, JsonPointerException
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union

class Parser(BaseParser):
    '''
    Parse data for MTD. location (jsonpath) specifies location of data

    :param ResourceManifest manifest: Manifest for parser
    '''
    def __init__(self, manifest: ResourceManifest, resource: dict):
        self.manifest = manifest
        self.resource = resource
        if "location" in self.manifest:
            self.resource = resolve_pointer(self.resource, self.manifest['location'])
        self.entry_template = self.manifest['targets']

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, resolve_pointer))
        return word_list
    
    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except JsonPointerException as e:
            raise e