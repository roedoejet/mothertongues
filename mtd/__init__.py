from mtd.languages import LanguageConfig
from mtd.languages.suites import LanguageSuite
from mtd.dictionary import Dictionary
from typing import List, Union

VERSION = '0.18'

def create_dictionary(language_config):
    """ Given a LanguageConfig (or a path to one), create a Dictionary

    Args:
        language_config (Union[LanguageConfig, str]): A valid language config, or path to one

    Returns:
        Dictionary: The Dictionary based on the provided configuration

    """
    if isinstance(language_config, LanguageConfig):
        return Dictionary(language_config)
    else:
        language_config = LanguageConfig(language_config)
        return Dictionary(language_config)

def create_suite(language_configs):
    """ Given a list of LanguageConfigs (or a list of paths), create corresponding Dictionaries

    Args:
        language_configs (List[Union[LanguageConfig, str]]): A valid language config, or path to one

    Returns:
        LanguageSuite: The LanguageSuite of all dictionaries

    """
    return LanguageSuite(language_configs)

# load app for gunicorn
from mtd.app import app
