from mtd import create_dictionary
from mtd.languages import LanguageConfig

dictionary = create_dictionary('languages/ayajuthem/config.json')
dictionary.export_raw_data('C:\\Users\\pinea\\Desktop', export_type="html")