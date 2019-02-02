from unittest import TestCase
from mtd.tests import SAMPLE_DATA_OBJ, SAMPLE_DATA_DF
from mtd.processors.validator import DfValidator
from pandas import DataFrame

class ValidatorTest(TestCase):
    def setUp(self):
        self.duped_data = DataFrame([SAMPLE_DATA_OBJ[0], SAMPLE_DATA_OBJ[0]])
        missing_key = SAMPLE_DATA_OBJ
        missing_key[0].pop('word')
        self.missing_key_data = DataFrame(missing_key)
        missing_val = SAMPLE_DATA_OBJ
        missing_val[0]['word'] = ''
        self.missing_value_data = DataFrame(missing_val)
    
    def test_missing_key(self):
        dfv = DfValidator(self.missing_key_data)
        self.assertFalse(dfv.check_not_null())

    def test_missing_value(self):
        dfv = DfValidator(self.missing_value_data)
        self.assertFalse(dfv.check_not_null())

    def test_dupes(self):
        dfv = DfValidator(self.duped_data)
        self.assertTrue(SAMPLE_DATA_DF.equals(dfv.remove_dupes()))
        self.assertTrue(self.duped_data.equals(dfv.log_dupes()))
