from mtd.languages import LanguageConfig
from mtd.languages.suites import LanguageSuite
from mtd.dictionary import Dictionary

VERSION = '0.11'

def create_dictionary(language_config):
    """ Given a LanguageConfig (or a path to one), create a Dictionary
    """
    if isinstance(language_config, LanguageConfig):
        return Dictionary(language_config)
    else:
        language_config = LanguageConfig(language_config)
        return Dictionary(language_config)

def create_suite(language_configs):
    """ Create a LanguageSuite from a list of LanguageConfigs or paths to language configs
    """
    return LanguageSuite(language_configs)
