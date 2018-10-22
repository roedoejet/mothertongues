from mtd.parsers.utils import BaseParser
import requests
from mtd.parsers import json_parser
from mtd.exceptions import RequestException
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

class Parser(BaseParser):
    '''
    Parse Google Spreadsheet data for MTD **TODO
    '''
    def __init__(self, manifest, resource_path):
        scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

        path = manifest['gsheet_credentials_path']
        credentials = ServiceAccountCredentials.from_json_keyfile_name(path, scope)
        gc = gspread.authorize(credentials)
        self.resource = gc.open(resource_path)
        print(self.resource)
        self.manifest = manifest
    
    def parse(self):
        pass