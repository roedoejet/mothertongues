from . import log
import logging, coloredlogs
from pandas import DataFrame

class ListHandler(logging.Handler):
    def __init__(self, log_list):
        logging.Handler.__init__(self)
        logging.basicConfig(format='%(levelname)s - %(message)s')
        self.log_list = log_list
        self.level_dict = {0: "Not Set", 10: "Debug", 20: "Info", 30: "Warning", 40: "Error", 50: "Critical"}

    def emit(self, record):
        self.log_list.append({'level': self.level_dict[record.levelno], 'msg': record.msg, 'levelno': record.levelno})

logger = log.setup_logger('root')

SAMPLE_DATA_OBJ = [
    {
    'audio': [{'speaker': 'AP', 'filename': 'ap_red.mp3'}, {'speaker': 'AR', 'filename': 'ar_red.mp3'}], 
    'definition': 'red', 
    'definition_audio': [{'speaker': 'AP', 'filename': 'ap_red_def.mp3'}, {'speaker': 'AR', 'filename': 'ar_red_def.mp3'}], 
    'entryID': '1', 
    'example_sentence': ['Har du røde øjne?', 'Døde røde rødøjede rådne røgede ørreder.'], 
    'example_sentence_audio': [[{'speaker': 'AP', 'filename': 'ap_sent1.mp3'}, {'speaker': 'AR', 'filename': 'ar_sent1.mp3'}], [{'speaker': 'AP', 'filename': 'ap_sent2.mp3'}, {'speaker': 'AR', 'filename': 'ar_sent2.mp3'}]],
    'example_sentence_definition': ['Do you have red eyes?', 'Dead, red, red-eyed, rotten, smoked trout.'], 
    'example_sentence_definition_audio': [[{'speaker': 'AP', 'filename': 'ap_def_sent1.mp3'}, {'speaker': 'AR', 'filename': 'ar_def_sent1.mp3'}], [{'speaker': 'AP', 'filename': 'ap_def_sent2.mp3'}, {'speaker': 'AR', 'filename': 'ar_def_sent2.mp3'}]], 
    'img': 'hund.png', 
    'optional': [{'Part of Speech': 'adjective'}, {'Source': 'test_data'}], 
    'secondary_theme': 'basic', 
    'theme': 'colours', 
    'word': 'rød'}
    ]

SAMPLE_DATA_OBJ_REDUCED = [
    {
    'audio': [{'speaker': 'AP', 'filename': 'ap_red.mp3'}], 
    'definition': 'red', 
    'definition_audio': [{'speaker': 'AP', 'filename': 'ap_red_def.mp3'}], 
    'entryID': '1', 
    'example_sentence': ['Har du røde øjne?'], 
    'example_sentence_audio': [[{'speaker': 'AP', 'filename': 'ap_sent1.mp3'}]],
    'example_sentence_definition': ['Do you have red eyes?'], 
    'example_sentence_definition_audio': [[{'speaker': 'AP', 'filename': 'ap_def_sent1.mp3'}]], 
    'img': 'hund.png', 
    'optional': [{'Part of Speech': 'adjective'}, {'Source': 'test_data'}], 
    'secondary_theme': 'basic', 
    'theme': 'colours', 
    'word': 'rød'}
    ]

SAMPLE_DATA_OBJ_REDUCED_EMPTY = [
    {
    'audio': [{'speaker': 'AP', 'filename': 'ap_red.mp3'}], 
    'definition': 'red', 
    'definition_audio': [{'speaker': 'AP', 'filename': 'ap_red_def.mp3'}], 
    'entryID': '1', 
    'example_sentence': ['Har du røde øjne?'], 
    'example_sentence_audio': [[{'speaker': 'AP', 'filename': 'ap_sent1.mp3'}]],
    'example_sentence_definition': ['Do you have red eyes?'], 
    'example_sentence_definition_audio': [[{'speaker': 'AP', 'filename': 'ap_def_sent1.mp3'}]], 
    'img': 'hund.png', 
    'optional': [{'Part of Speech': 'adjective'}, {'Source': 'test_data'}], 
    'secondary_theme': 'basic', 
    'theme': 'colours', 
    'word': 'rød'}
    ]

SAMPLE_DATA_OBJ_BLANK = [
    {
    'audio': [{'speaker': 'AP', 'filename': 'ap_red.mp3'}, {'speaker': 'AR', 'filename': 'ar_red.mp3'}], 
    'definition': 'red', 
    'definition_audio': [{'speaker': 'AP', 'filename': 'ap_red_def.mp3'}, {'speaker': '', 'filename': ''}], 
    'entryID': '1', 
    'example_sentence': ['Har du røde øjne?', 'Døde røde rødøjede rådne røgede ørreder.'], 
    'example_sentence_audio': [[{'speaker': 'AP', 'filename': 'ap_sent1.mp3'}, {'speaker': 'AR', 'filename': 'ar_sent1.mp3'}], [{'speaker': 'AP', 'filename': 'ap_sent2.mp3'}, {'speaker': 'AR', 'filename': 'ar_sent2.mp3'}]],
    'example_sentence_definition': ['Do you have red eyes?', 'Dead, red, red-eyed, rotten, smoked trout.'], 
    'example_sentence_definition_audio': [[{'speaker': 'AP', 'filename': 'ap_def_sent1.mp3'}, {'speaker': 'AR', 'filename': 'ar_def_sent1.mp3'}], [{'speaker': 'AP', 'filename': 'ap_def_sent2.mp3'}, {'speaker': 'AR', 'filename': 'ar_def_sent2.mp3'}]], 
    'img': 'hund.png', 
    'optional': [{'Part of Speech': 'adjective'}, {'Source': 'test_data'}], 
    'secondary_theme': 'basic', 
    'theme': 'colours', 
    'word': 'rød'}
    ]


SAMPLE_DATA_DF = DataFrame(SAMPLE_DATA_OBJ)
SAMPLE_DATA_DF_REDUCED = DataFrame(SAMPLE_DATA_OBJ_REDUCED)
SAMPLE_DATA_DF_REDUCED_EMPTY = DataFrame(SAMPLE_DATA_OBJ_REDUCED_EMPTY)
SAMPLE_DATA_DF_BLANK = DataFrame(SAMPLE_DATA_OBJ_BLANK)