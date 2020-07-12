from mtd.tests.test_data import psv as psv_path
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ
import os
from unittest import TestCase
from mtd.parsers import parse

class PsvParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(psv_path.__file__)
        self.data = os.path.join(self.path, 'data.psv')
        self.manifest = os.path.join(self.path, 'manifest.json')

    def test_data_df_matches_sample(self):
        '''Check test PSV data is parsed and looks like ground truth SAMPLE_DATA_DF
        '''
        parsed_data = parse(self.manifest, self.data)
        self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(SAMPLE_DATA_DF))

    def test_data_obj_matches_sample(self):
        '''Check test PSV data is parsed and looks like ground truth SAMPLE_DATA_OBJ
        '''
        parsed_data = parse(self.manifest, self.data)
        parsed_data_obj = parsed_data['data'].to_dict(orient='records')
        self.assertEqual(SAMPLE_DATA_OBJ, parsed_data_obj)