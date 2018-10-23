from mtd.languages.suites import create_config_object, LanguageSuite
from mtd.dictionary import Dictionary

VERSION = '0.11'

def create_dictionary(language_config):
    return Dictionary(create_config_object(language_config))

def create_suite(language_configs):
    return LanguageSuite(language_configs)
