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
        pass
        # try:
        #     with open(resource_path) as f:
        #         self.resource = json.load(f)
        # except ValueError:
        #     raise ValidationError(f"The JSON file at {resource_path} seems to be malformed. Please run it through a JSON validator")
        # self.manifest = manifest
        # self.entry_template = self.manifest['targets']

    def resolve_targets(self):
        pass
        # word_list = []
        # for entry in self.resource:
        #     word_list.append(self.fill_entry_template(self.entry_template, entry, resolve_pointer))
        # return word_list
    
    def parse(self):
        pass
        # try:
        #     data = self.resolve_targets()
        #     return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        # except:
        #     print('no targets')