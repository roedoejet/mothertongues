import os
from unittest import TestLoader, TextTestRunner, TestSuite
from mtd.tests import logger, __file__ as testf

# Unit tests

## Parsers
from mtd.tests.test_csv_parser import CsvParserTest
from mtd.tests.test_dict_parser import DictParserTest
from mtd.tests.test_json_parser import JsonParserTest
from mtd.tests.test_request_parser import RequestsParserTest
from mtd.tests.test_pkl_parser import PklParserTest
from mtd.tests.test_psv_parser import PsvParserTest
from mtd.tests.test_tsv_parser import TsvParserTest
from mtd.tests.test_xlsx_parser import XlsxParserTest
from mtd.tests.test_xml_parser import XmlParserTest

## Processors
from mtd.tests.test_sorter import SorterTest
from mtd.tests.test_transducer import TransducerTest
from mtd.tests.test_validator import ValidatorTest

# Integration tests
from mtd.tests.integration.test_api_resources import ResourceIntegrationTest
from mtd.tests.integration.test_basic_integration import ViewIntegrationTest
# from mtd.tests.integration.test_swagger_integration import SwaggerSpecIntegrationTest
from mtd.tests.integration.test_cli import CliTest

# Other tests
from mtd.tests.test_cli import CliTester
from mtd.tests.test_dictionary import DictionaryTest
from mtd.tests.test_data_configuration_parser import DataConfigurationTest

loader = TestLoader()

parser_tests = [
        loader.loadTestsFromTestCase(test)
        # for test in [JsonParserTest]
        # for test in (CsvParserTest, PsvParserTest, TsvParserTest, XlsxParserTest)
        # for test in [XlsxParserTest]
        for test in (CsvParserTest, DictParserTest, JsonParserTest, PklParserTest, PsvParserTest, RequestsParserTest, TsvParserTest, XlsxParserTest, XmlParserTest)
    ]

processor_tests = [
    loader.loadTestsFromTestCase(test)
    for test in (SorterTest, TransducerTest, ValidatorTest)
]

integration_tests = [
    loader.loadTestsFromTestCase(test)
    for test in (CliTest, ResourceIntegrationTest, ViewIntegrationTest)
]

other_tests = [
    loader.loadTestsFromTestCase(test)
    # for test in [DataConfigurationTest]
    for test in [CliTester, DataConfigurationTest, DictionaryTest]
]

fst_dev_tests = []

def run_tests(suite):
    if suite == 'parsers':
        suite = TestSuite(parser_tests)
    elif suite == 'processors':
        suite = TestSuite(processor_tests)
    elif suite == 'dev':
        suite = TestSuite(parser_tests + processor_tests + integration_tests + other_tests)
    elif suite == 'prod' or suite == 'all':
        suite = loader.discover(os.path.dirname(testf))
    elif suite == 'integration':
        suite = TestSuite(integration_tests)
    elif suite == 'other':
        suite = TestSuite(other_tests)
        
    runner = TextTestRunner(verbosity=3)
    runner.run(suite)

if __name__ == "__main__":
    run_tests('dev')