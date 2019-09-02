import pandas as pd
from mtd.parsers.utils import BaseParser
from mtd.exceptions import UnsupportedFiletypeError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Tuple, Union
from tqdm import tqdm
import gspread

class Parser(BaseParser):
    '''
    Parse data for MTD **TODO: test worksheet location. Skipheader in manifest skips first row. Location in manifest decides worksheet.

    :param ResourceManifest manifest: Manifest for parser
    :param str resource_path: path to file 
    '''
    def __init__(self, manifest: ResourceManifest, resource: gspread.models.Spreadsheet):
        self.manifest = manifest
        try:
            work_book = resource
            if "location" in self.manifest:
                work_sheet = work_book.get_worksheet(self.manifest['location'])
            else:
                work_sheet = work_book.get_worksheet(0)
            if "skipheader" in self.manifest and self.manifest['skipheader']:
                min_row = 1
            else:
                min_row = 0
            self.resource = work_sheet.get_all_records()[min_row:]
        except:
            raise UnsupportedFiletypeError('Google Spreadsheet')
        
        self.entry_template = self.manifest['targets']

    def getCellValue(self, entry: Dict, col: str) -> str:
        ''' Given a gspread record dict, return the value of the key matching the header in the record
        '''
        for k,v in entry.items():
            if k == col:
                return v
        return ''

    def resolve_targets(self) -> List[dict]:
        word_list = []
        for entry in tqdm(self.resource):
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getCellValue))
        return word_list

    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except Exception as e:
            print(e)