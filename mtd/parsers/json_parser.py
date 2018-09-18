import json
import jsonpointer
import pandas as pd
from mtd.parsers import BaseParser

class JsonParser(BaseParser):
    '''
    Parse data for MTD
    '''
    def __init__(self, manifest, resource):
        self.manifest = manifest
        with open(resource) as f:
            self.resource = json.load(f)

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