import json
import jsonpointer
import pandas as pd
from mtd.exceptions.validation import ValidationError
from mtd.parsers import BaseParser
from jsonschema import validate
from jsonschema.exceptions import ValidationError

class JsonParser(BaseParser):
    '''
    Parse data for MTD
    '''
    def __init__(self, manifest, resource):
        try:
            with open(manifest) as f:
                self.manifest = json.load(f)
        except ValueError:
            raise ValidationError(f"The manifest JSON file at {manifest} seems to be malformed. Please run it through a JSON validator")
        
        try:
            with open(resource) as f:
                self.resource = json.load(f)
        except ValueError:
            raise ValidationError(f"The JSON file at {resource} seems to be malformed. Please run it through a JSON validator")
        
        self.validate_manifest(self.manifest)

    def resolve_targets(self):
        word_list = []
        for entry in self.resource:
            new_lemma = {}
            for key, value in self.manifest["targets"].iteritems():
                value = jsonpointer.resolve_pointer(entry, value)
                new_lemma[key] = self.return_list(value)
            word_list.append(new_lemma)
        return word_list
    
    def parse(self):
        try:
            data = self.resolve_targets()
            return pd.DataFrame(data)
        except:
            print('no targets')