from openpyxl import load_workbook
import pandas as pd
from mtd.parsers import BaseParser

class XlsxParser(BaseParser):
    '''
    Parse data for MTD
    '''
    def __init__(self, manifest, resource):
        self.manifest = manifest
        work_book = load_workbook(resource)
        work_sheet = work_book.active
        if self.manifest['skip_first']:
            min_row = 2
        else:
            min_row = 1
        self.resource =  work_sheet.iter_rows(min_row=min_row)
    
    
    
    def resolve_targets(self):
        word_list = []
        for entry in self.resource:
            new_lemma = {}
            for cell in entry:
                for key, value in self.manifest['targets'].iteritems():
                    if isinstance(value, str):
                        if cell.column == value:
                            new_lemma[key] = self.return_list(cell.value)
                    elif isinstance(value, dict):
                        new_lemma[key] = {}
                        for inner_key, inner_value in value.iteritems():
                            if cell.column == inner_value:
                                new_lemma[key][inner_key] = cell.value
            word_list.append(new_lemma)
        return word_list

    def parse(self):
        try:
            data = self.resolve_targets()
            return pd.DataFrame(data)
        except:
            print('no targets')