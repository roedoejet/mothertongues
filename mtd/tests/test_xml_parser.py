from mtd.tests.test_data import xml
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ, SAMPLE_DATA_OBJ_REDUCED, SAMPLE_DATA_DF_REDUCED
import os
from unittest import main, TestCase
from mtd.parsers import parse

class XmlParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(xml.__file__)
        self.data = [(os.path.join(self.path, 'data.xml'), SAMPLE_DATA_DF, SAMPLE_DATA_OBJ), (os.path.join(self.path, 'data_reduced.xml'), SAMPLE_DATA_DF_REDUCED, SAMPLE_DATA_OBJ_REDUCED)]
        self.manifest = os.path.join(self.path, 'manifest.json')
        self.maxDiff = None

    def test_data_df_matches_sample(self):
        '''Check test XML data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(data[1]))

    def test_data_obj_matches_sample(self):
        '''Check test XML data is parsed and looks like ground truth data.
        '''
        for data in self.data:
            parsed_data = parse(self.manifest, data[0])
            parsed_data_obj = parsed_data['data'].to_dict(orient='records')
            self.assertEqual(data[2], parsed_data_obj)
        
if __name__ == '__main__':
    main()