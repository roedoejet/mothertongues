import json
import os
import requests
import glob
import mtd.languages as ldir
from mtd.dictionary import Dictionary
from mtd.languages import LanguageConfig
from typing import List, Union

class LanguageSuite():
    '''A collection of languages and their corresponding LanguageConfig and Dictionary objects

    Args:
        config_paths (List[str|LanguageConfig]): A list of LanguageConfigs or paths to files needed to initialize LanguageConfigs
    '''
    def __init__(self, config_paths):
        self.languages_path = os.path.dirname(ldir.__file__)
        self.config_objects = []
        for cp in config_paths:
            if isinstance(cp, LanguageConfig):
                self.config_objects.append(cp)
            else:
                self.config_objects.append(LanguageConfig(cp))
        self.dictionaries = [Dictionary(co) for co in self.config_objects]
    
    
# ALL_CONFIGS = glob.glob(os.path.join(os.path.dirname(ldir.__file__), '**', 'config.json'), recursive=True)

# ALL_CONFIGS_SUITE = LanguageSuite(ALL_CONFIGS)
    