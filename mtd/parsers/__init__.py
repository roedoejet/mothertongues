import os
import importlib
import glob
import re
import requests
from mtd.parsers.utils import ResourceManifest
from mtd.parsers import request_parser, dict_parser, gsheet_parser
from mtd.exceptions import MissingResourceError, UnsupportedFiletypeError
from urllib.parse import urlparse
from pandas import DataFrame
from gspread.models import Spreadsheet


from .. import exceptions

# filename format
_FN_SUFFIX = "_parser"


def parse(manifest, resource):
    '''This module finds the right filetype parser and parses each file in the resource according to the manifest's configuration.

    This function will read the file extension of your resource path determine the right parser.

    Args:
        manifest (str|ResourceManifest): an absolute path or URL to a data manifest describing a data resource, or a dict of the resource itself
        resource (str|dict|list|Spreadsheet): an absolute path or URL to a data resource of one of the supported file types (CSV/TSV/PSV/TXT, JSON), or a dict of the manifest itself
    '''
    if not isinstance(manifest, ResourceManifest):
        manifest = ResourceManifest(manifest)
    if isinstance(resource, dict) or isinstance(resource, list):
        parser = dict_parser.Parser(manifest, resource)
    elif isinstance(resource, Spreadsheet):
        parser = gsheet_parser.Parser(manifest, resource)
    # If resource is URL, use request parser
    elif 'http' in urlparse(resource).scheme:
        parser = request_parser.Parser(manifest, resource)
    else:
        # Check if file exists and filetype is supported, then return parser
        if not os.path.exists(resource):
            raise MissingResourceError(resource)
        _, ext = os.path.splitext(resource)
        ext = ext.lower()

        rel_module = ext + _FN_SUFFIX

        try:
            filetype_module = importlib.import_module(
                rel_module, 'mtd.parsers'
            )
        except ImportError:
            raise UnsupportedFiletypeError(ext)
        parser = filetype_module.Parser(manifest, resource)
    return parser.parse()
        




