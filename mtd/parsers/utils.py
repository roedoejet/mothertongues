from mtd.languages import MANIFEST_SCHEMA
from urllib.parse import urlparse
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from mtd.tests import logger
from typing import Dict, List, Union
from jsonpath_rw import jsonpath, parse as json_parse
import requests
import os

class ResourceManifest():
    '''A manifest file for a given resource.

       Resources in this case are lexical resources. They can be in any format supported by MTD and the resources
       for a single Dictionary can be heterogeneous. They must be initialized by a manifest file that can be
       validated against the MTD resource manifest json schema.

       Args:
            manifest (dict|str): Path to resource manifest or the dict itself
    '''
    def __init__(self, manifest):
        self.schema = MANIFEST_SCHEMA
        self.path = None
        if isinstance(manifest, dict):
            self._manifest = manifest
        else:
            self._manifest = self.parse(manifest)
        if self.path:
            self.path_dir = os.path.dirname(self.path)
            if 'transducers' in self._manifest:
                for t in self._manifest['transducers']:
                    for i, fn in enumerate(t['functions']):
                        if fn.endswith('.yaml') or fn.endswith('.json'):
                            path = fn if os.path.isabs(fn) else os.path.abspath(os.path.join(self.path_dir, fn))
                            t['functions'][i] = path

        self.file_type = "na"
        if "file_type" in self._manifest:
            self.file_type = self._manifest['file_type']
        # List of keys not used by specific file types
        txt_keys = ["location"]
        json_keys = ["skipheader"]

        xlsx_keys = []
        xml_keys = ["skipheader"]
        self.type_specific_keys = { "csv": txt_keys, "json": json_keys, "psv": txt_keys, "tsv": txt_keys, "xlsx": xlsx_keys, "xml": xml_keys, "na": []}
        self.validate(self._manifest)

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

    def validate(self, manifest):
        '''Validate manifest json against manifest json schema.
        '''
        try:
            schema_targets = self.schema['properties']['targets']['properties'].keys()
            manifest_targets = manifest['targets'].keys()
            schema_properties = self.schema['properties'].keys()
            manifest_properties = manifest.keys()
            self.warn_extra_properties_in(schema_properties, manifest_properties)
            self.warn_extra_properties_in(schema_targets, manifest_targets)
            validate(manifest, self.schema)
            return manifest
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the manifest file, but got {e}. Please refer to the Mother Tongues data manifest schema.")

    def warn_extra_properties_in(self, props, schema_props):
        for t in props:
            if not t in schema_props:
                if self.file_type and self.file_type in self.type_specific_keys and not t in self.type_specific_keys[self.file_type]:
                    logger.warning(f"'{t}' is declared in the default schema but is not part of your manifest. You may not have full functionality in your Mother Tongues Dictionary.")
        for t in schema_props:
            if not t in props:
                logger.warning(f"'{t}' is declared in your manifest but is not part of the default schema. You may need to modify your Mother Tongues Dictionary to use this data.")

    def parse(self, manifest_path):
        # Allow for URL loaded manifest
        if 'http' in urlparse(manifest_path).scheme:
            r = requests.get(manifest_path)
            manifest = r.json()
        else:
            try:
                with open(manifest_path, 'r', encoding='utf8') as f:
                    manifest = json.load(f)
                    self.path = manifest_path
            except ValueError:
                raise ValidationError(f"The manifest JSON file at {manifest_path} seems to be malformed. Please run it through a JSON validator")

        return manifest

class BaseParser():
    """This class contains common methods which are inherited by the format specific parsers.
    """
    def __init__(self):
        # to be overwritten by parsers
        self.manifest = None

    def return_manifest_key_type(self, key: str, manifest: dict) -> Union[dict, list, str]:
        '''Given a key in a nested dict, return the type of the corresponding value
        '''
        for k, v in manifest.items():
            if k == key:
                if "listof" in v:
                    return type([])
                else:
                    return type(v)
            elif isinstance(v, list):
                for item in v:
                    if isinstance(item, dict) and self.return_manifest_key_type(key, item) is not None:
                        return self.return_manifest_key_type(key, item)
                return type(item)
            elif isinstance(v, dict):
                if type(self.return_manifest_key_type(key, v)) is not None:
                    return self.return_manifest_key_type(key, v)

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
                # If is string literal
                if v.startswith("'") and v.endswith("'"):
                    new_lemma[k] = v[1:-1]
                else:
                    try:
                        new_lemma[k] = self.validate_type(k, convert_function(entry, v.strip()))
                    except:
                        new_lemma[k] = v.strip()
        return new_lemma
    
    def validate_type(self, k, v):
        '''Some parsers like lxml and jsonpath_rw return lists when the data manifest does not specify a list, this corrects that.
        '''
        if type(v) == list and len(v) > 0 and type(v[0]) == jsonpath.DatumInContext:
            v = v[0].value
        if isinstance(v, list) and len(v) == 1 and self.return_manifest_key_type(k, self.manifest.manifest) != list:
            return v[0]
        else:
            return v