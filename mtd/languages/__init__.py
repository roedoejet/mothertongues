import json
import os
from mtd import languages as ldir
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from urllib.parse import urlparse

ldir = os.path.dirname(ldir.__file__)

with open(os.path.join(ldir, 'config_schema.json')) as f:
    CONFIG_SCHEMA = json.load(f)

with open(os.path.join(ldir, 'manifest_schema.json')) as f:
    MANIFEST_SCHEMA = json.load(f)

class LanguageConfig():
    def __init__(self, config_object):
        self.config_schema = CONFIG_SCHEMA
        self.language_default_dir = os.path.dirname(ldir)
        if isinstance(config_object, dict):
            self._config = config_object
        elif 'http' in urlparse(config_object).scheme:
            r = requests.get(config_path)
            self._config = r.json()
        else:
            if not os.path.isabs(config_object):
                config_object = os.path.join(self.language_default_dir, config_object)
            with open(config_object, 'r') as f:
                self._config = json.load(f)
        self._config = self.validate_config_object(self._config)

    def __getitem__(self, position):
        return self._config[position] 

    @property
    def config(self):
        return self._config

    @config.setter
    def config(self, value):
        self._config = self.validate_config_object(value)

    def validate_config_object(self, co):
        """Validate manifest json against manifest json schema
        """
        try:
            validate(co, self.config_schema)
            return co
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the {self._config} configuration file, but got {e}. Please refer to the Mother Tongues data manifest schema.")
