import os
import importlib
import glob
import re
import json
from urllib.parse import urlparse
import requests
from mtd.parsers import gsheet_parser, request_parser, dict_parser
from mtd.languages import MANIFEST_SCHEMA
from mtd.tests import logger
from mtd.exceptions import MissingFileError, UnsupportedFiletypeError
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from .. import exceptions

class ResourceManifest():
    def __init__(self, manifest_dict_or_path):
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

# filename format
_FN_SUFFIX = "_parser"


def parse(manifest, resource_dict_or_path):
    '''Find the right filetype parser and parse it.

    This function will read the file extension of your resource path determine the right parser.

    :param str manifest_dict_or_path: an absolute path or URL to a data manifest describing a data resource, or a dict of the resource itself
    :param str resource_path: an absolute path or URL to a data resource of one of the supported file types (CSV/TSV/PSV/TXT, Google Sheet, JSON), or a dict of the manifest itself
    '''
    if not isinstance(manifest, ResourceManifest):
        manifest = ResourceManifest(manifest)

    if isinstance(resource_dict_or_path, dict):
        parser = dict_parser.Parser(manifest, resource_dict_or_path)
    elif "gsheet_credentials_path" in manifest:
        parser = gsheet_parser.Parser(manifest, resource_dict_or_path)
    # If resource is URL, use request parser
    elif 'http' in urlparse(resource_dict_or_path).scheme:
        parser = request_parser.Parser(manifest, resource_dict_or_path)
    else:
        # Check if file exists and filetype is supported, then return parser
        if not os.path.exists(resource_dict_or_path):
            raise MissingFileError(resource_dict_or_path)
        _, ext = os.path.splitext(resource_dict_or_path)
        ext = ext.lower()

        rel_module = ext + _FN_SUFFIX

        try:
            filetype_module = importlib.import_module(
                rel_module, 'mtd.parsers'
            )
        except ImportError:
            raise UnsupportedFiletypeError(ext)
        parser = filetype_module.Parser(manifest, resource_dict_or_path)
    return parser.parse()
        




