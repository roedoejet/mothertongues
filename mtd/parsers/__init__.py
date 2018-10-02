import os
import importlib
import glob
import re
import json
from urllib.parse import urlparse
import requests
from mtd.parsers import gsheet_parser, request_parser
from mtd.languages import MANIFEST_SCHEMA
from mtd.tests import logger
from mtd.exceptions import MissingFileError, UnsupportedFiletypeError
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from .. import exceptions

# filename format
_FN_SUFFIX = "_parser"

def validate_manifest(m):
    '''Validate manifest json against manifest json schema.
    '''
    try:
        validate(m, MANIFEST_SCHEMA)
    except ValidationError as e:
        raise ValidationError(f"Attempted to validate the manifest file, but got {e}. Please refer to the Mother Tongues data manifest schema.")

def warn_extra_properties_in(props, schema_props):
    for t in props:
        if not t in schema_props:
            logger.info(f"'{t}' is declared in the default schema but is not part of your manifest. You may not have full functionality in your Mother Tongues Dictionary.")
    for t in schema_props:
        if not t in props:
            logger.info(f"'{t}' is declared in your manifest but is not part of the default schema. You may need to modify your Mother Tongues Dictionary to use this data.")

def parse_manifest(manifest_path):
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
    
    validate_manifest(manifest)

    schema_targets = MANIFEST_SCHEMA['properties']['targets']['properties'].keys()
    manifest_targets = manifest['targets'].keys()
    schema_properties = MANIFEST_SCHEMA['properties'].keys()
    manifest_properties = manifest.keys()

    warn_extra_properties_in(schema_properties, manifest_properties)
    warn_extra_properties_in(schema_targets, manifest_targets)
    
    return manifest

def parse(manifest_path, resource_path):
    '''Find the right filetype parser and parse it.

    This function will read the file extension of your resource path determine the right parser.

    :param str manifest_path: an absolute path or URL to a data manifest describing a data resource
    :param str resource_path: an absolute path or URL to a data resource of one of the supported file types (CSV/TSV/PSV/TXT, Google Sheet, JSON)
    '''

    manifest = parse_manifest(manifest_path)

    if "gsheet_credentials_path" in manifest:
        parser = gsheet_parser.Parser(manifest, resource_path)
    # If resource is URL, use request parser
    elif 'http' in urlparse(resource_path).scheme:
        parser = request_parser.Parser(manifest, resource_path)
    else:
        # Check if file exists and filetype is supported, then return parser
        if not os.path.exists(resource_path):
            raise MissingFileError(resource_path)
        _, ext = os.path.splitext(resource_path)
        ext = ext.lower()

        rel_module = ext + _FN_SUFFIX

        try:
            filetype_module = importlib.import_module(
                rel_module, 'mtd.parsers'
            )
        except ImportError:
            raise UnsupportedFiletypeError(ext)
        parser = filetype_module.Parser(manifest, resource_path)
    return parser.parse()
        




