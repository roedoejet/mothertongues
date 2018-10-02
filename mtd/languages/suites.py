import json
import os
import requests
import glob
import mtd.languages as ldir
from mtd.languages import CONFIG_SCHEMA
from urllib.parse import urlparse
from jsonschema import validate
from jsonschema.exceptions import ValidationError

class LanguageSuite():
    def __init__(self, config_paths):
        self.languages_path = os.path.dirname(ldir.__file__)
        self.config_objects = []
        for cp in config_paths:
            if 'http' in urlparse(cp).scheme:
                print(urlparse(cp).scheme)
                r = requests.get(cp)
                self.config_objects.append(r.json())
            else:
                if not os.path.isabs(cp):
                    cp = os.path.join(self.languages_path, cp)
                with open(cp, 'r') as f:
                    self.config_objects.append(json.load(f))
        for c in self.config_objects:
            self.validate_config(c)
    
    def validate_config(self, c):
        '''Validate manifest json against manifest json schema
        '''
        try:
            validate(c, CONFIG_SCHEMA)
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the {c} configuration file, but got {e}. Please refer to the Mother Tongues data manifest schema.")


UBC_SUITE = LanguageSuite(["ayajuthem/config.json"])

ALL_CONFIGS = glob.glob(os.path.join(os.path.dirname(ldir.__file__), '**', 'config.json'), recursive=True)

ALL_CONFIGS_SUITE = LanguageSuite(ALL_CONFIGS)
    