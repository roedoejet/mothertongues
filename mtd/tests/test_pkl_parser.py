import os
import pickle
from unittest import TestCase, main

from mtd.tests.test_data import pkl as pkl_path
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ
from mtd.parsers import parse


class PklParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(pkl_path.__file__)
        self.data = os.path.join(self.path, 'data.pkl')
        self.manifest = os.path.join(self.path, 'manifest.json')

    def test_data_df_matches_sample(self):
        '''Check test pkl data is parsed and looks like ground truth SAMPLE_DATA_DF
        '''
        parsed_data = parse(self.manifest, self.data)
        self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(SAMPLE_DATA_DF))

    def test_data_obj_matches_sample(self):
        '''Check test pkl data is parsed and looks like ground truth SAMPLE_DATA_OBJ
        '''
        parsed_data = parse(self.manifest, self.data)
        parsed_data_obj = parsed_data['data'].to_dict(orient='records')
        self.assertEqual(SAMPLE_DATA_OBJ, parsed_data_obj)

if __name__ == '__main__':
    main()