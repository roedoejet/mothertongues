import json
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ, SAMPLE_DATA_DF_REDUCED, SAMPLE_DATA_OBJ_REDUCED, SAMPLE_DATA_DF_REDUCED_EMPTY, SAMPLE_DATA_OBJ_REDUCED_EMPTY
import os
from mtd.tests.test_data import json as json_path
from unittest import TestCase
from mtd.parsers import parse

class DictParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(json_path.__file__)
        self.data = [(SAMPLE_DATA_OBJ, SAMPLE_DATA_DF, SAMPLE_DATA_OBJ), (SAMPLE_DATA_OBJ_REDUCED_EMPTY, SAMPLE_DATA_DF_REDUCED_EMPTY, SAMPLE_DATA_OBJ_REDUCED_EMPTY)]
        self.manifest = os.path.join(self.path, 'dict_manifest.json')
        self.maxDiff = None

    # def test_dict_manifest(self):
    #     '''Check manifest loaded as dict NOT WORKING
    #     '''
    #     with open(self.manifest, 'r') as f:
    #         json_manifest = json.load(f)
    #     for data in self.data:
    #         parsed_data = parse(json_manifest, data[0])
    #         self.assertTrue(parsed_data['data'].equals(data[1]))

    def test_data_df_matches_sample(self):
        '''Check test Dict or List data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(data[1]))

    def test_data_obj_matches_sample(self):
        '''Check test Dict or List data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            parsed_data_obj = parsed_data['data'].to_dict(orient='records')
            self.assertEqual(data[2], parsed_data_obj)