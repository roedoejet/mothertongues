from mtd.parsers.utils import BaseParser
import requests
from jsonschema.exceptions import ValidationError
from mtd.parsers import json_parser, xml_parser
from mtd.exceptions import RequestException, MissingResourceError, UnsupportedFiletypeError
from mtd.parsers.utils import ResourceManifest
from json.decoder import JSONDecodeError
from lxml import etree
from typing import Dict, List, Union
from pandas import DataFrame

class Parser(BaseParser):
    '''
    Parse JSON or XML request data for MTD

    :param ResourceManifest manifest: Manifest for parser
    :param str resource_path: request address 
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: str):
        self.manifest = manifest
        self.type = "json"
        try:
            res = requests.get(resource_path)
        except:
            raise MissingResourceError(f"{resource_path}")
        if res.status_code >= 200 and res.status_code < 300:
            if "xml" in res.headers['content-type']:
                self.type = "xml"
                self.resource = etree.XML(res.content)
            else:
                try:
                    self.resource = res.json()
                except JSONDecodeError:
                    raise UnsupportedFiletypeError(resource_path)
        else:
            raise RequestException(resource_path, res.status_code)
    
    def parse(self) -> Dict[str, Union[dict, DataFrame]]:
        if self.type == "json":
            parser = json_parser.Parser(self.manifest, self.resource)
        elif self.type == "xml":
            parser = xml_parser.Parser(self.manifest, self.resource)
        return parser.parse()