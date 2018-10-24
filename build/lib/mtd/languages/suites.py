import json
import os
import requests
import glob
import mtd.languages as ldir
from mtd.dictionary import Dictionary
from mtd.languages import LanguageConfig

class LanguageSuite():
    def __init__(self, config_paths):
        self.languages_path = os.path.dirname(ldir.__file__)
        self.config_objects = []
        for cp in config_paths:
            self.config_objects.append(LanguageConfig(cp))
        self.dictionaries = [Dictionary(co) for co in self.config_objects]
    
    
# ALL_CONFIGS = glob.glob(os.path.join(os.path.dirname(ldir.__file__), '**', 'config.json'), recursive=True)

# ALL_CONFIGS_SUITE = LanguageSuite(ALL_CONFIGS)
    