import os
import json
from unittest import TestCase
from mtd.tests import test_data
from mtd.tests.test_data import json as json_dir


def item_generator(json_input):
    if isinstance(json_input, dict):
        for k, v in json_input.items():
            if isinstance(v, str):
                yield v
            else:
                yield from item_generator(v)
    elif isinstance(json_input, list):
        for item in json_input:
            yield from item_generator(item)

class DataConfigurationTest(TestCase):
    def setUp(self):
        self.maxDiff = None
        with open(os.path.join(os.path.dirname(test_data.__file__), 'whitespace_manifest.json')) as f:
            self.whitespace_manifest_values = list(item_generator(json.load(f)))
        with open(os.path.join(os.path.dirname(json_dir.__file__), 'manifest.json')) as f:
            self.norm_manifest_values = list(item_generator(json.load(f)))

    def test_whitespace_only(self):
        ''' Should only strip whitespace '''
        self.assertEqual([v.strip() for v in self.whitespace_manifest_values], self.norm_manifest_values)
