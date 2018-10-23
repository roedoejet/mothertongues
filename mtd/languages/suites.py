import json
import os
import requests
import glob
import mtd.languages as ldir
from mtd.dictionary import Dictionary
from mtd.languages import CONFIG_SCHEMA
from urllib.parse import urlparse
from jsonschema import validate
from jsonschema.exceptions import ValidationError

def create_config_object(config_path):
    if isinstance(config_path, dict):
        validated = validate_config_object(config_path)
    elif 'http' in urlparse(config_path).scheme:
        r = requests.get(config_path)
        validated = validate_config_object(r.json())
    else:
        if not os.path.isabs(config_path):
            config_path = os.path.join(self.languages_path, config_path)
        with open(config_path, 'r') as f:
            validated = validate_config_object(json.load(f))
    return validated

def validate_config_object(co):
        '''Validate manifest json against manifest json schema
        '''
        try:
            validate(co, CONFIG_SCHEMA)
            return co
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the {co} configuration file, but got {e}. Please refer to the Mother Tongues data manifest schema.")

class LanguageSuite():
    def __init__(self, config_paths):
        self.languages_path = os.path.dirname(ldir.__file__)
        self.config_objects = []
        for cp in config_paths:
            self.config_objects.append(create_config_object(cp))
        self.dictionaries = [Dictionary(co) for co in self.config_objects]
    
    
# ALL_CONFIGS = glob.glob(os.path.join(os.path.dirname(ldir.__file__), '**', 'config.json'), recursive=True)

# ALL_CONFIGS_SUITE = LanguageSuite(ALL_CONFIGS)
    