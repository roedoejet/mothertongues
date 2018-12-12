from mtd.parsers.utils import BaseParser
import requests
from jsonschema.exceptions import ValidationError
from mtd.parsers import json_parser
from mtd.exceptions import RequestException
from mtd.parsers.utils import ResourceManifest

class Parser(BaseParser):
    '''
    Parse JSON request data for MTD

    :param ResourceManifest manifest: Manifest for parser
    :param str resource_path: request address 
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: str):
        self.manifest = manifest
        res = requests.get(resource_path)
        if res.status_code >= 200 and res.status_code < 300:
            self.resource = res.json()
        else:
            raise RequestException(resource_path, res.status_code)
    
    def parse(self):
        parser = json_parser.Parser(self.manifest, self.resource)
        return parser.parse()