import csv
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError

class Parser(BaseParser):
    '''
    Parse data for MTD

    manifest param: skipheader skips first row
    '''
    def __init__(self, manifest, resource_path):
        self.resource = []
        self.manifest = manifest
        try:
            with open(resource_path, encoding='utf8') as f:
                reader = csv.reader(f, delimiter="|")
                if self.manifest['skipheader']:
                    next(reader, [])
                for line in reader:
                    self.resource.append(line)
        except ValueError:
            raise SchemaValidationError('psv', resource_path)
        self.entry_template = self.manifest['targets']

    def resolve_targets(self):
        word_list = []
        for entry in self.resource:
            word_list.append(self.fill_entry_template(self.entry_template, entry, lambda x, y: x[int(y)]))
        return word_list
    
    def parse(self):
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except Exception as e:
            print(e)
            print('no targets')