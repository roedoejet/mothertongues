from openpyxl import load_workbook
import pandas as pd
from mtd.parsers.utils import BaseParser
from mtd.exceptions import UnsupportedFiletypeError

class Parser(BaseParser):
    '''
    Parse data for MTD **TODO
    '''
    def __init__(self, manifest, resource_path):
        self.manifest = manifest
        try:
            work_book = load_workbook(resource_path)
            work_sheet = work_book.active
            if self.manifest['skip_first']:
                min_row = 2
            else:
                min_row = 1
            self.resource = work_sheet.iter_rows(min_row=min_row)
        except:
            raise UnsupportedFiletypeError(f"File at {resource_path} not found.")
        
        self.entry_template = self.manifest['targets']

    def getCellValue(self):
        pass
    
    def resolve_targets(self):
        word_list = []
        for i, entry in enumerate(self.resource):
            word_list.append(self.fill_entry_template(self.entry_template, entry, self.getCellValue))
        return word_list

    def parse(self):
        try:
            data = self.resolve_targets()
            return pd.DataFrame(data)
        except:
            print('no targets')