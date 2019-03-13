from unittest import TestCase
from string import ascii_lowercase
from mtd.dictionary import Dictionary
from mtd.languages.suites import LanguageSuite
from mtd import create_dictionary, create_suite
from mtd import static as static_dir
import os


class DictionaryTest(TestCase):
    """Test basic Dictionary methods
    """

    def setUp(self):
        self.manifest = {
            "name": 'test_words',
            "compare": "word",
            "sorting": "word",
            "display": "word",
            "targets": {
                "word": 'word',
                "definition": 'definition',
                "optional": [{
                    "optional": 'optional.[*].optional_title'
                }]
            }
        }

        self.config = {
            "config": {
                "L1": "Test",
                "L2": "Test",
                "optional_field_title": "Optional Field",
                "alphabet": list(ascii_lowercase),
            },
            "data": [{
                "manifest":
                self.manifest,
                "resource": [{
                    "word": "test",
                    "definition": "test",
                    "optional": [{
                        "optional_title": "test_option"
                    }]
                }]
            }]
        }

        self.minimal_config =  {
            "config": {
                "L1": "Test",
                "L2": "Test"
            },
            "data": [{
                "manifest":
                self.manifest,
                "resource": [{
                    "word": "test",
                    "definition": "test",
                }]
            }]
        }

        self.suite = [self.config]

    def test_active_sites(self):
        try:
            self.assertTrue(os.path.exists(os.path.join(os.path.dirname(static_dir.__file__), 'active.sites.json')))
        except FileNotFoundError:
            self.fail(f"file 'active.sites.json' does not exist")

    def test_main_methods(self):
        self.assertTrue(isinstance(create_dictionary(self.config), Dictionary))
        self.assertTrue(isinstance(create_suite(self.suite), LanguageSuite))

    def test_minimal(self):
        self.assertTrue(isinstance(create_dictionary(self.minimal_config), Dictionary))