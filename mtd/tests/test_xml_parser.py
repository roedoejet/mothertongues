from test_data import xml
from . import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ
import os
from unittest import TestCase
from mtd.parsers import parse

class XmlParserTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(xml.__file__)
        self.data = os.path.join(self.path, 'data.xml')
        self.manifest = os.path.join(self.path, 'manifest.json')
        self.maxDiff = None

    def test_data_df_matches_sample(self):
        '''Check test XML data is parsed and looks like ground truth SAMPLE_DATA_DF
        '''
        parsed_data = parse(self.manifest, self.data)
        self.assertTrue(parsed_data['data'].equals(SAMPLE_DATA_DF))

    def test_data_obj_matches_sample(self):
        '''Check test XML data is parsed and looks like ground truth SAMPLE_DATA_OBJ
        '''
        parsed_data = parse(self.manifest, self.data)
        parsed_data_obj = parsed_data['data'].to_dict(orient='records')
        self.assertEqual(SAMPLE_DATA_OBJ, parsed_data_obj)