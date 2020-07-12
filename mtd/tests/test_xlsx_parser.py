from mtd.tests.test_data import xlsx as xlsx_dir
from mtd.tests import SAMPLE_DATA_DF_BLANK, SAMPLE_DATA_OBJ_BLANK
import os
from unittest import TestCase
from mtd.parsers import parse
from mtd.exceptions import MissingResourceError, UnsupportedFiletypeError

class XlsxParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(xlsx_dir.__file__)
        self.data = os.path.join(self.path, 'data.xlsx')
        self.missing_sheet_data = os.path.join(self.path, 'missing_sheet_data.xlsx')
        self.manifest = os.path.join(self.path, 'manifest.json')
        self.manifest_alternate = os.path.join(self.path, 'manifest_alternate.json')
        self.maxDiff = None

    def test_data_df_matches_sample(self):
        '''Check test XLSX data is parsed and looks like ground truth SAMPLE_DATA_DF
        '''
        parsed_data = parse(self.manifest, self.data)
        self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(SAMPLE_DATA_DF_BLANK))

    def test_data_obj_matches_sample(self):
        '''Check test XLSX data is parsed and looks like ground truth SAMPLE_DATA_OBJ
        '''
        parsed_data = parse(self.manifest, self.data)
        parsed_data_obj = parsed_data['data'].to_dict(orient='records')
        self.assertEqual(SAMPLE_DATA_OBJ_BLANK, parsed_data_obj)

    def test_missing_sheet(self):
        '''Check error raised for missing sheet in 'location'
        '''
        with self.assertRaises(MissingResourceError):
            parse(self.manifest, self.missing_sheet_data)

    def test_no_file(self):
        '''Check error raised for nonexistant file
        '''
        with self.assertRaises(MissingResourceError):
            parse(self.manifest, 'foobar.xlsx')
        with self.assertRaises(UnsupportedFiletypeError):
            parse(self.manifest, os.path.join(self.path, 'manifest.xlsx'))

    def test_alternate(self):
        '''Check alternate manifest with no location or skipheader
        '''
        try:
            parse(self.manifest_alternate, self.data)
        except:
            self.fail("Couldn't parse from alternate manifest.")