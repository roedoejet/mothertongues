from unittest import TestCase
from mtd.tests import SAMPLE_DATA_OBJ, SAMPLE_DATA_DF
from mtd.processors.validator import return_null, return_dupes, remove_dupes
from mtd.exceptions import DfMissingKeysValidationError
from pandas import DataFrame
from copy import deepcopy


class ValidatorTest(TestCase):
    def test_missing_key(self):
        missing_key = deepcopy(SAMPLE_DATA_OBJ)
        missing_key[0].pop("word")
        missing_key_data = DataFrame(missing_key)
        with self.assertRaises(DfMissingKeysValidationError):
            _ = return_null(missing_key_data)

    def test_missing_value(self):
        missing_val = deepcopy(SAMPLE_DATA_OBJ)
        # Empty string does not count as null!
        missing_val[0]["word"] = ""
        missing_value_data = DataFrame(missing_val)
        self.assertEqual([], return_null(missing_value_data))
        # None does count as null (Pandas will probably make it NaN)
        missing_val[0]["word"] = None
        missing_value_data = DataFrame(missing_val)
        missing_values_by_column = return_null(
            missing_value_data, ["word", "definition"]
        )
        # Missing word, but not definition
        self.assertNotEqual(0, len(missing_values_by_column[0]))
        self.assertEqual(0, len(missing_values_by_column[1]))

    def test_dupes(self):
        duped_data = DataFrame([SAMPLE_DATA_OBJ[0], SAMPLE_DATA_OBJ[0]])
        self.assertTrue(SAMPLE_DATA_DF.equals(remove_dupes(duped_data)))
        self.assertTrue(len(return_dupes(duped_data)) == 2)
