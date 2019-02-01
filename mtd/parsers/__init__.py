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


def parse(manifest, resource_dict_or_path):
    '''Find the right filetype parser and parse it.

    This function will read the file extension of your resource path determine the right parser.

    :param str manifest_dict_or_path: an absolute path or URL to a data manifest describing a data resource, or a dict of the resource itself
    :param str resource_path: an absolute path or URL to a data resource of one of the supported file types (CSV/TSV/PSV/TXT, JSON), or a dict of the manifest itself
    '''
    if not isinstance(manifest, ResourceManifest):
        manifest = ResourceManifest(manifest)
    if isinstance(resource_dict_or_path, dict) or isinstance(resource_dict_or_path, list):
        parser = dict_parser.Parser(manifest, resource_dict_or_path)
    elif isinstance(resource_dict_or_path, Spreadsheet):
        parser = gsheet_parser.Parser(manifest, resource_dict_or_path)
    # If resource is URL, use request parser
    elif 'http' in urlparse(resource_dict_or_path).scheme:
        parser = request_parser.Parser(manifest, resource_dict_or_path)
    else:
        # Check if file exists and filetype is supported, then return parser
        if not os.path.exists(resource_dict_or_path):
            raise MissingResourceError(resource_dict_or_path)
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
        




