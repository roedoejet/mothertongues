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

    def test_listofs(self):
        """Make sure listof semantics matches the documentation."""
        DATA = {
            "spam": "spam",
            "eggs": "eggs",
            "audio": {
                "speaker": "Eric Idle",
                "filename": "spam.mp3"
            },
            "examples": [ "spam", "spam", "eggs", "spam" ],
            "example_audio": [
                { "speaker": "Viking 1" },
                { "speaker": "Viking 2" },
                { "speaker": "Viking 3" },
                { "speaker": "Viking 4" },
            ],
            "example_audio2": [
                [
                    { "speaker": "Viking 1", "filename": "spam1.mp3" },
                    { "speaker": "Viking 2", "filename": "spam2.mp3" },
                 ],
                [
                    { "speaker": "Viking 3", "filename": "spam3.mp3" },
                    { "speaker": "Viking 4", "filename": "spam4.mp3" },
                ],
            ],
            "examples2": [
                {
                    "spam": "spam",
                    "audio": [
                        { "speaker": "Viking 1", "filename": "spam1.mp3" },
                        { "speaker": "Viking 2", "filename": "spam2.mp3" },
                    ],
                },
                {
                    "spam": "eggs",
                    "audio": [
                        { "speaker": "Viking 3", "filename": "spam3.mp3" },
                        { "speaker": "Viking 4", "filename": "spam4.mp3" },
                    ],
                },
            ],
        }
        MANIFEST = {
            "name": "Glorious Spam",
            "sorting": "spam",
            "targets": {
                "word": "spam",
                "definition": "eggs",
                "spameggs": [ "examples[0]", "examples[2]" ],
                "spameggs2": { "spam": "examples[0]", "eggs": "examples[2]" },
                "vikings": { "listof": "example_audio", "value": "speaker" },
                "examples": { "listof": "examples", "value": "$" },
                "examples2": { "listof": "examples" },
                "vikings2": {
                    "listof": "example_audio2",
                    "value": {
                        "listof": "$",
                        "value": {"speaker": "speaker",
                                  "filename": "filename"},
                    }
                },
                "vikings3": {
                    "listof": "examples2",
                    "value": {
                        "listof": "audio",
                        "value": {"speaker": "speaker",
                                  "filename": "filename"},
                    }
                },
            }
        }
        EXPECTED = {
            "word": "spam",
            "definition": "eggs",
            "spameggs": [ "spam", "eggs" ],
            "spameggs2": { "spam": "spam", "eggs": "eggs" },
            "vikings": [ "Viking 1", "Viking 2", "Viking 3", "Viking 4" ],
            "examples": [ "spam", "spam", "eggs", "spam" ],
            "examples2": [ "spam", "spam", "eggs", "spam" ],
            "vikings2": [
                [
                    { "speaker": "Viking 1", "filename": "spam1.mp3" },
                    { "speaker": "Viking 2", "filename": "spam2.mp3" },
                 ],
                [
                    { "speaker": "Viking 3", "filename": "spam3.mp3" },
                    { "speaker": "Viking 4", "filename": "spam4.mp3" },
                ],
            ],
            "vikings3": [
                [
                    { "speaker": "Viking 1", "filename": "spam1.mp3" },
                    { "speaker": "Viking 2", "filename": "spam2.mp3" },
                 ],
                [
                    { "speaker": "Viking 3", "filename": "spam3.mp3" },
                    { "speaker": "Viking 4", "filename": "spam4.mp3" },
                ],
            ]
        }
        parsed_data = parse(MANIFEST, [DATA])
        parsed_data_obj = parsed_data['data'].to_dict(orient='records')
        self.assertEqual(EXPECTED, parsed_data_obj[0])


if __name__ == '__main__':
    main()
