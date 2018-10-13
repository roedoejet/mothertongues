import json
from jsonpointer import resolve_pointer, JsonPointerException
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError

class Parser(BaseParser):
    '''
    Parse data for MTD

    manifest param: location (jsonpath) specifies location of data
    '''
    def __init__(self, manifest, resource_path):
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

    def resolve_targets(self):
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, resolve_pointer))
        return word_list
    
    def parse(self):
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except JsonPointerException as e:
            raise e