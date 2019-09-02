import csv
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
from tqdm import tqdm

class Parser(BaseParser):
    '''
    Parse data for MTD. Skipheader in manifest skips first row

    :param ResourceManifest manifest: Manifest for parser
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: str):
        self.resource = []
        self.manifest = manifest
        try:
            with open(resource_path, encoding='utf8') as f:
                reader = csv.reader(f)
                if "skipheader" in self.manifest and self.manifest['skipheader']:
                    next(reader, [])
                for line in reader:
                    self.resource.append(line)
        except ValueError:
            raise SchemaValidationError('csv', resource_path)
        self.entry_template = self.manifest['targets']

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in tqdm(self.resource):
            word_list.append(self.fill_entry_template(self.entry_template, entry, lambda x, y: x[int(y)]))
        return word_list
    
    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except Exception as e:
            print(e)