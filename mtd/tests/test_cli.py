from unittest import TestCase
import os
from mtd.app import app
from mtd.tests import logger
from mtd.tests.test_data import test_dictionary as td
from mtd.tests.test_data import csv as csv_dir
from mtd.exceptions import UnfoundConfigError

class CliTester(TestCase):
    def setUp(self):
        self.runner = app.test_cli_runner()
        self.dictionary_dir = os.path.dirname(td.__file__)
        self.empty_dir = os.path.dirname(csv_dir.__file__)

    def test_available(self):
        result = self.runner.invoke(args=['available', self.dictionary_dir])
        self.assertIn('The following languages are available', result.output)
        self.assertEqual(result.exit_code, 0)

    def test_not_available(self):
        # Point to non-existant file
        result = self.runner.invoke(args=['available', '/foobar'])
        self.assertIn('does not exist', result.output)
        self.assertGreater(result.exit_code, 0)
        # Point to file that is not config
        path = os.path.abspath(td.__file__)
        result = self.runner.invoke(args=['available', path])
        self.assertIn('No config files found', result.output)
        # Point to dir without any configs
        result = self.runner.invoke(args=['available', self.empty_dir])
        self.assertIn('No config files found', result.output)

    def test_prepare(self):
        result = self.runner.invoke(args=['prepare', self.dictionary_dir])
        try:
            logger._cache[40] = True
            result = self.runner.invoke(args=['prepare', self.dictionary_dir])
            self.assertIn('Sorry, your build finished with some errors', result.output)
            logger._cache[40] = False
            result = self.runner.invoke(args=['prepare', self.dictionary_dir])
            self.assertIn('Successfully built static files', result.output)
        except AttributeError:
            self.assertIn('*Warning*', result.output)
        self.assertEqual(result.exit_code, 0)

    def test_prepare_errors(self):
        # Point to non-existant file
        result = self.runner.invoke(args=['prepare', '/foobar'])
        self.assertIn('does not exist', result.output)
        self.assertGreater(result.exit_code, 0)

        