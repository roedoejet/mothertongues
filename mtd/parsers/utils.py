from mtd.languages import MANIFEST_SCHEMA
from urllib.parse import urlparse
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from mtd.tests import logger
from typing import Dict, List, Union

class ResourceManifest():
    '''A manifest file for a given resource.

       Resources in this case are lexical resources. They can be in any format supported by MTD and the resources
       for a single Dictionary can be heterogeneous. They must be initialized by a manifest file that can be 
       validated against the MTD resource manifest json schema.

       Args:
            :param (dict or str) manifest_dict_or_path: Path to resource manifest or the dict itself
    '''
    def __init__(self, manifest_dict_or_path: Union[str, dict]):
        self.schema = MANIFEST_SCHEMA
        if isinstance(manifest_dict_or_path, dict):
            self._manifest = self.validate(manifest_dict_or_path)
        else:
            self._manifest = self.parse(manifest_dict_or_path)

    def __iter__(self):
        yield from self._manifest.keys()

    def __getitem__(self, position):
        if isinstance(position, str):
            return self._manifest[position]
        else:
            keys = list(self._manifest.keys())
            return self._manifest[keys[position]]

    @property
    def manifest(self):
        '''Return the validated manifest object.
        '''
        return self._manifest

    @manifest.setter
    def manifest(self, value):
        self._manifest = self.validate(value)

    def validate(self, m):
        '''Validate manifest json against manifest json schema.
        '''
        try:
            validate(m, self.schema)
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the manifest file, but got {e}. Please refer to the Mother Tongues data manifest schema.")

    def warn_extra_properties_in(self, props, schema_props):
        for t in props:
            if not t in schema_props:
                logger.info(f"'{t}' is declared in the default schema but is not part of your manifest. You may not have full functionality in your Mother Tongues Dictionary.")
        for t in schema_props:
            if not t in props:
                logger.info(f"'{t}' is declared in your manifest but is not part of the default schema. You may need to modify your Mother Tongues Dictionary to use this data.")

    def parse(self, manifest_path):
        # Allow for URL loaded manifest
        if 'http' in urlparse(manifest_path).scheme:
            r = requests.get(manifest_path)
            manifest = r.json()
        else:
            try:
                with open(manifest_path, 'r') as f:
                    manifest = json.load(f)
            except ValueError:
                raise ValidationError(f"The manifest JSON file at {manifest_path} seems to be malformed. Please run it through a JSON validator")
        
        self.validate(manifest)

        schema_targets = self.schema['properties']['targets']['properties'].keys()
        manifest_targets = manifest['targets'].keys()
        schema_properties = self.schema['properties'].keys()
        manifest_properties = manifest.keys()

        self.warn_extra_properties_in(schema_properties, manifest_properties)
        self.warn_extra_properties_in(schema_targets, manifest_targets)
        return manifest

class BaseParser():
    """This class contains common methods that are used
    between many of the format specific parsers
    """
    def __init__(self):
        pass

    def fill_entry_template(self, entry_template: dict, entry, convert_function) -> dict:
        '''This recursive function "fills in" the data according to the resource manifest. It is used by all parsers.

        Args:
            :param dict entry_template: The template for an entry. Keys are preserved, values are usually paths in the resource to data (JSONPath, XPath or Cell coordinates etc)
            :param any entry: The actual word/entry to extract some data from. This could be a row, or json dict or any piece of nested data from the data resource.
            :param function convert_function: A function that takes an entry and a path and returns the "filled in" object
        '''
        new_lemma = {}
        
        for k, v in entry_template.items():
            
            if isinstance(v, dict):
                new_lemma[k] = self.fill_entry_template(v, entry, convert_function)
            elif isinstance(v, list):
                new_v = list()
                for x in v:
                    new_v += list(self.fill_entry_template({k: x}, entry, convert_function).values())
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = convert_function(entry, v)
                except:
                    breakpoint()
        return new_lemma

    def return_list(self, d) -> list:
        ''' if d is not list, return as list
        '''
        if isinstance(d, list):
            return d
        elif isinstance(d, str):
            return [d]
        else:
            print("should go in log, not string or list")