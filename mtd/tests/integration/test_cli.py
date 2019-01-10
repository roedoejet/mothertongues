from unittest import TestCase
import os
import click
from click.testing import CliRunner
from mtd.cli import available, cli, export, prepare
from mtd.tests.test_data import test_dictionary
from mtd.tests import test_data
from string import ascii_lowercase
import json

class CliTest(TestCase):
    def setUp(self):
        self.runner = CliRunner()
        self.test_data_dir = os.path.dirname(test_data.__file__)
        self.test_dictionary_dir = os.path.dirname(test_dictionary.__file__)

        # set default alphabet (Danish)
        self.alphabet = list(ascii_lowercase) + [ "æ", "ø", "å"]
        # create minimal language config template
        self.language_config_template = '''
        {{ "config": {{
                "L1": "Danish",
                "L2": "English",
                "alphabet": {alphabet}
            }},
            "data": {data}
        }}
        '''
        # define each dictionary to create a config for
        self.data = [[{"manifest": os.path.abspath(os.path.join(self.test_data_dir, "csv", "manifest.json")), 
                       "resource": os.path.abspath(os.path.join(self.test_data_dir, "csv", "data.csv"))}], 
                     [{"manifest": os.path.abspath(os.path.join(self.test_data_dir, "xml", "manifest.json")), 
                       "resource": os.path.abspath(os.path.join(self.test_data_dir, "xml", "data.xml"))}]]
        i = 0
        self.all_configs = []
        # write dictionaries to files
        while i < len(self.data):   
            config_path = os.path.join(self.test_dictionary_dir, f'config_{i}.json')
            self.all_configs.append(config_path)
            with open(config_path, 'w', encoding='utf8') as f:
                f.write(self.language_config_template.format(alphabet=json.dumps(self.alphabet), data=json.dumps(self.data[i])))
            i += 1
            
        # write txt file with all generated config paths
        all_configs_txt = '\n'.join(self.all_configs)
        with open(os.path.join(self.test_dictionary_dir, 'dictionaries.txt'), 'w') as f:
            f.write(all_configs_txt)
        
    def test_hello_world(self):
        result = self.runner.invoke(cli)
        self.assertEqual(result.exit_code, 0)
        self.assertTrue(result.stdout.startswith("Usage"))

    def test_available(self):
        dir_result = self.runner.invoke(available, [self.test_dictionary_dir])
        txt_result = self.runner.invoke(available, [os.path.join(self.test_dictionary_dir, 'dictionaries.txt')])
        file_result = self.runner.invoke(available, [self.all_configs[0]])
        self.assertEqual(dir_result.exit_code, 0)
        self.assertEqual(txt_result.exit_code, 0)
        self.assertEqual(file_result.exit_code, 0)

    def test_export(self):
        export_possibilities = ["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "mobile", "github"]
        # check export possibilities do something
        # check 'coming soon'
        # check raw exports
        # check path exists
        # check click choices equal export possibilities variable
        # check output exists and is a directory
        # check export to web and github
        pass

    def test_prepare(self):
        # check prepare of a bad file ends in error
        # check prepare of a good file ends with a publishable site - check name
        pass

    def test_run(self):
        # check runs and gives 200
        # check what happens if not prepared...
        pass
        
    