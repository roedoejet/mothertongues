import json
from mtd.tests import SAMPLE_DATA_DF, SAMPLE_DATA_OBJ, SAMPLE_DATA_DF_REDUCED, SAMPLE_DATA_OBJ_REDUCED, SAMPLE_DATA_DF_REDUCED_EMPTY, SAMPLE_DATA_OBJ_REDUCED_EMPTY
import os
from mtd.tests.test_data import json as json_path, xml as xml_path
from unittest import main, TestCase
from mtd.parsers import parse
from mtd.exceptions import MissingResourceError, RequestException, UnsupportedFiletypeError

class RequestsParserTest(TestCase):
    def setUp(self):
        self.host = 'https://roedoejet.github.io/mothertongues'
        self.json_path = os.path.dirname(json_path.__file__)
        self.json_manifest = os.path.join(self.json_path, 'manifest.json')
        self.json_data = [(self.host + '/mtd/tests/test_data/json/data.json', SAMPLE_DATA_DF, SAMPLE_DATA_OBJ), (self.host + '/mtd/tests/test_data/json/data_reduced.json', SAMPLE_DATA_DF_REDUCED_EMPTY, SAMPLE_DATA_OBJ_REDUCED_EMPTY)]
        self.xml_path = os.path.dirname(xml_path.__file__)
        self.xml_manifest = os.path.join(self.xml_path, 'manifest.json')
        self.xml_data = [(self.host + '/mtd/tests/test_data/xml/data.xml', SAMPLE_DATA_DF, SAMPLE_DATA_OBJ), (self.host + '/mtd/tests/test_data/xml/data_reduced.xml', SAMPLE_DATA_DF_REDUCED, SAMPLE_DATA_OBJ_REDUCED)]
        self.maxDiff = None

    def test_data_df_matches_xml_sample(self):
        '''Check test requested xml data is parsed and looks like ground truth data.
        '''
        for data in self.xml_data:
            parsed_data = parse(self.xml_manifest, data[0])
            self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(data[1]))

    def test_data_obj_matches_xml_sample(self):
        '''Check test Dict or List data is parsed and looks like ground truth data.
        '''
        for data in self.xml_data:
            parsed_data = parse(self.xml_manifest, data[0])
            parsed_data_obj = parsed_data['data'].to_dict(orient='records')
            self.assertEqual(data[2], parsed_data_obj)
        
    def test_data_df_matches_json_sample(self):
        '''Check test requested xml data is parsed and looks like ground truth data.
        '''
        for data in self.json_data:
            parsed_data = parse(self.json_manifest, data[0])
            self.assertTrue(parsed_data['data'].sort_index(axis=1).equals(data[1]))

    def test_data_obj_matches_json_sample(self):
        '''Check test Dict or List data is parsed and looks like ground truth data.
        '''
        for data in self.json_data:
            parsed_data = parse(self.json_manifest, data[0])
            parsed_data_obj = parsed_data['data'].to_dict(orient='records')
            self.assertEqual(data[2], parsed_data_obj)

    def test_no_connection(self):
        '''Check can't connect to site
        '''
        with self.assertRaises(MissingResourceError):
            parse(self.json_manifest, 'https://foo.bar')

    def test_404(self):
        '''Test returns request exception from 404
        '''
        with self.assertRaises(RequestException):
            parse(self.json_manifest, 'https://www.google.com/foobar1')

    # def test_bad_format(self):
    #     '''Check non-json/xml returns unsupported format error
    #       FIX: For some bizarre reason, this throws simplejson.errors.JSONDecodeError and not json.decoder.JSONDecodeError.
    #       I don't want to require simplejson just to use this test, so until I dig a bit more into this, it will remain untested.
    #     '''
    #     with self.assertRaises(JSONDecodeError):
    #         with self.assertRaises(UnsupportedFiletypeError):
    #             parse(self.json_manifest, 'https://google.com')


if __name__ == '__main__':
    main()