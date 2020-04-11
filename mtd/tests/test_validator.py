from unittest import TestCase
from mtd.tests import SAMPLE_DATA_OBJ, SAMPLE_DATA_DF
from mtd.processors.validator import return_null, return_dupes, remove_dupes
from pandas import DataFrame
from copy import deepcopy

class ValidatorTest(TestCase):
    def setUp(self):
        self.duped_data = DataFrame([SAMPLE_DATA_OBJ[0], SAMPLE_DATA_OBJ[0]])
        missing_key = deepcopy(SAMPLE_DATA_OBJ)
        missing_key[0].pop('word')
        self.missing_key_data = DataFrame(missing_key)
        missing_val = deepcopy(SAMPLE_DATA_OBJ)
        missing_val[0]['word'] = ''
        self.missing_value_data = DataFrame(missing_val)
    
    def test_missing_key(self):
        self.assertFalse(return_null(self.missing_key_data))

    def test_missing_value(self):
        self.assertFalse(return_null(self.missing_value_data))

    def test_dupes(self):
        self.assertTrue(SAMPLE_DATA_DF.equals(remove_dupes(self.duped_data)))
        self.assertTrue(len(return_dupes(self.duped_data)) == 2)
