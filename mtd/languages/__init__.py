import json
import csv
import os
from mtd import languages as ldir
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from urllib.parse import urlparse
from typing import List, Union
import requests
import logging
from pathlib import Path
from string import ascii_uppercase, ascii_lowercase

ldir = os.path.dirname(ldir.__file__)

with open(os.path.join(ldir, 'config_schema.json'), encoding='utf8') as f:
    CONFIG_SCHEMA = json.load(f)

with open(os.path.join(ldir, 'manifest_schema.json'), encoding='utf8') as f:
    MANIFEST_SCHEMA = json.load(f)

class LanguageConfig():
    '''The configuration information necessary for making a Dictionary from a language.

    Args:
        config_object (str|dict): Path to a valid language config file according to MTD config schema

    '''
    def __init__(self, config_object):
        self.config_schema = CONFIG_SCHEMA
        self.language_default_dir = os.path.dirname(ldir)
        self.path = None
        if isinstance(config_object, dict):
            self._config = config_object
        elif 'http' in urlparse(config_object).scheme:
            r = requests.get(config_object)
            self._config = r.json()
        else:
            if not os.path.isabs(config_object):
                config_object = os.path.join(self.language_default_dir, config_object)
            self.path = config_object
            with open(config_object, 'r', encoding='utf8') as f:
                self._config = json.load(f)
        if 'alphabet' in self._config['config']:
            if isinstance(self._config['config']['alphabet'], str):
                if self.path and not os.path.isabs(self._config['config']['alphabet']) and isinstance(self.path, str):
                    self._config['config']['alphabet'] = os.path.abspath(os.path.join(os.path.dirname(self.path), self._config['config']['alphabet']))
                self._config['config']['alphabet'] = self.parse_alphabet(self._config['config']['alphabet'])
        else:
            self._config['config']['alphabet'] = list(ascii_uppercase) + list(ascii_lowercase)
        if self.path:
            self.path_dir = os.path.dirname(self.path)
            for data in self._config['data']:
                for k, v in data.items():
                    if isinstance(v, str):
                        if not os.path.isabs(v):
                            path = os.path.abspath(os.path.join(self.path_dir, v)) 
                            if not os.path.exists(path):
                                logging.error(f"Path {v} relative to the config file at {self.path} does not exist")
                            data[k] = path
                        elif not os.path.exists(v):
                            logging.error(f"Resource path at {v} does not exist")
        self._config = self.validate_config_object(self._config)
        
    def __getitem__(self, position):
        return self._config[position]

    def parse_alphabet(self, path: str) -> List[str]:
        if os.path.isfile(path):
            if path.endswith('csv'):
                with open(path) as f:
                    data = csv.reader(f)
                    data = [x[0] for x in data]
            elif path.endswith('json'):
                with open(path) as f:
                    data = json.load(f)
            if isinstance(data, list):
                return data
            else:
                return list(ascii_uppercase) + list(ascii_lowercase)
        else:
            return list(ascii_uppercase) + list(ascii_lowercase)

    @property
    def config(self):
        '''Get the validated config object
        '''
        return self._config

    @config.setter
    def config(self, value):
        self._config = self.validate_config_object(value)

    def validate_config_object(self, co: Union[str, dict]) -> dict:
        """Validate manifest json against manifest json schema
        """
        try:
            validate(co, self.config_schema)
            return co
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the {self._config} configuration file, but got {e}. Please refer to the Mother Tongues data manifest schema.")
