import json
from jsonpointer import resolve_pointer
import pandas as pd
from mtd.exceptions import ValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError

class Parser(BaseParser):
    '''
    Parse data for MTD
    '''
    def __init__(self, manifest, resource_path):
        try:
            if isinstance(resource_path, str):
                with open(resource_path) as f:
                    self.resource = json.load(f)
            elif isinstance(resource_path, (dict, list)):
                self.resource = resource_path
        except ValueError:
            raise ValidationError(f"The JSON file at {resource_path} seems to be malformed. Please run it through a JSON validator")
            
        self.manifest = manifest
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
        except:
            print('no targets')