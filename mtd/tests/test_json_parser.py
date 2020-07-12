from mtd.tests.test_data import json as json_path
import json
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ, SAMPLE_DATA_DF_REDUCED, SAMPLE_DATA_OBJ_REDUCED, SAMPLE_DATA_DF_REDUCED_EMPTY, SAMPLE_DATA_OBJ_REDUCED_EMPTY
import os
from unittest import main, TestCase
from mtd.parsers import parse

class JsonParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(json_path.__file__)
        self.data = [(os.path.join(self.path, 'data.json'), SAMPLE_DATA_DF,
                      SAMPLE_DATA_OBJ),
                     (os.path.join(self.path, 'data_reduced.json'),
                      SAMPLE_DATA_DF_REDUCED_EMPTY,
                      SAMPLE_DATA_OBJ_REDUCED_EMPTY)]
        self.manifest = os.path.join(self.path, 'manifest.json')
        self.large_manifest = os.path.join(self.path, 'large_data_manifest.json')
        self.large_data_path = os.path.join(self.path, 'data_large.json')
        self.maxDiff = None

    def test_data_df_matches_sample(self):
        '''Check test JSON data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(data[1]))

    def test_data_obj_matches_sample(self):
        '''Check test JSON data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            parsed_data_obj = parsed_data['data'].to_dict(orient='records')
            self.assertEqual(data[2], parsed_data_obj)

if __name__ == '__main__':
    main()