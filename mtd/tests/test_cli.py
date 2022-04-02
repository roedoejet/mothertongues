from unittest import main, TestCase
import os
from shutil import rmtree
from mtd.app import app
from mtd.tests import logger
from mtd.tests.test_data import test_dictionary as td
from mtd.tests.test_data import csv as csv_dir, exports
from mtd.exceptions import UnfoundConfigError
from subprocess import Popen
import requests

class CliTester(TestCase):
    def setUp(self):
        self.runner = app.test_cli_runner()
        self.dictionary_dir = os.path.dirname(td.__file__)
        self.empty_dir = os.path.dirname(csv_dir.__file__)
        self.exports_dir = os.path.dirname(exports.__file__)
        self.valid_exports = ["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "github"]
        self.staged_exports = ["mobile"]

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

    def test_prepare_minimal(self):
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

    def test_staged_export(self):
        for arg in self.staged_exports:
            result = self.runner.invoke(args=["export", self.dictionary_dir, arg, self.exports_dir])
            self.assertIn("coming soon", result.output)

    def test_raw_export(self):
        for arg in [x for x in self.valid_exports if x.startswith('raw')]:
            arg_ext = arg[4:]
            result = self.runner.invoke(args=["export", self.dictionary_dir, arg, self.exports_dir])
            exported = os.path.join(self.exports_dir, f'danish.{arg_ext}')
            self.assertTrue(os.path.exists(exported))
            os.remove(exported)

    def test_formatted_export(self):
        for arg in ['js', 'json']:
            result = self.runner.invoke(args=["export", self.dictionary_dir, arg, self.exports_dir])
            exported_config = os.path.join(self.exports_dir, f'config-danish.{arg}')
            exported_dict = os.path.join(self.exports_dir, f"dict_cached-danish.{arg}")
            self.assertTrue(os.path.exists(exported_config))
            self.assertTrue(os.path.exists(exported_dict))
            os.remove(exported_config)
            os.remove(exported_dict)

    def test_web_export(self):
        result = self.runner.invoke(args=["export", self.dictionary_dir, 'web', self.exports_dir])
        self.assertTrue(os.path.exists(os.path.join(self.exports_dir, 'mtd-output', 'index.html')))
        rmtree(os.path.join(self.exports_dir, 'mtd-output'))
        
if __name__ == '__main__':
    main()