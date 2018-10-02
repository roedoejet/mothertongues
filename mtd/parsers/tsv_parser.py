import csv
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError

class Parser(BaseParser):
    '''
    Parse data for MTD
    '''
    def __init__(self, manifest, resource_path):
        self.resource = []
        try:
            with open(resource_path) as f:
                reader = csv.reader(f, delimiter="\t")
                # if skipheader: next(reader)
                for line in reader:
                    self.resource.append(line)
        except ValueError:
            raise SchemaValidationError('tsv', resource_path)
        self.manifest = manifest
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