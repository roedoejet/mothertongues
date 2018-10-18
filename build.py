from mtd.languages.suites import ALL_CONFIGS_SUITE, LanguageSuite
from mtd.dictionary import Dictionary
import pandas as pd

co = ALL_CONFIGS_SUITE.config_objects[0]
direct = {
    "config": {
        "L1": "ayajuthem",
        "L2": "english",
        "optional_field_title": "Optional Field",
        "alphabet": [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g"
        ],
        "credits": [
            {
                "role": "funding",
                "name": "UBC"
            }
        ]
    },
    "data": [
        {
            "manifest": "/Users/pinea/mothertongues/mtd/languages/ayajuthem/csv/manifest.json",
            "resource": "/Users/pinea/mothertongues/mtd/languages/ayajuthem/csv/data.csv"
        },
        # {
        #     "manifest": "/Users/pinea/mothertongues/mtd/languages/ayajuthem/json/manifest.json",
        #     "resource": "/Users/pinea/mothertongues/mtd/languages/ayajuthem/json/data.json"
        # },
        {
            "manifest": {
    "name": "words",
    "display": "word",
    "compare": "word",
    "sorting": "word",
    "location": "/entries",
    "targets": {
        "word": "/word",
        "definition": "/definition",
        "entryID": "/entryID",
        "optional": [
            { "test": "/theme"}, 
            { "test2": "/norm"}]
    }
},
            "resource": {"entries": [{"definition": "He piled it.", "sorting": "\u010dihiq\u02b7at\u0259s", "word": "\u010dihiq\u02b7at\u0259s", "english_audio": "160805-engl-to_pile_something", "sentence": [], "compareDefinition": "He piled it.", "sorting_form": [5, 15, 14, 15, 39, 0, 43, 9, 41], "display_form": "\u010dihiq\u02b7at\u0259s", "forms": "\u010dihiq\u02b7at\u0259s", "underlying_form": ["\u010dihiq\u02b7at\u0259s"], "theme": ["action"], "entryID": 457, "norm": "\u010dihiq\u02b7at\u0259s", "sentence_definition": [], "english_sentence_audio": [], "audio": [{"speaker": "Elsie Paul", "filename": "160805-ElsieP-to_pile_something"}], "displayDefinition": "He piled it.", "compare_form": ["\u010dihikwates"], "sentence_audio": []}, {"definition": "good at something (good at what you're doing)", "sorting": "\u010d\u0269gat", "word": "\u010d\u0269gat", "english_audio": "Dec122015-engl-good_at_something", "sentence": [], "compareDefinition": "good at something (good at what you're doing)", "sorting_form": [5, 16, 12, 0, 43], "display_form": ["\u010d\u0269gat"], "forms": ["\u010d\u0269gat"], "underlying_form": ["\u010d\u0269gat"], "theme": ["description"], "entryID": 135, "norm": "\u010d\u0269gat", "sentence_definition": [], "english_sentence_audio": [], "audio": [{"speaker": "Elsie Paul", "filename": "Dec122015-ElsieP-good_at_something"}], "displayDefinition": "good at something (good at what you're doing)", "compare_form": ["\u010digat"], "sentence_audio": []}]}
        }
    ],
    "adhoc_vars": [
        {
            "theme_hierarchy": True
        }
    ]
}
directsuite = LanguageSuite([direct])
dictionary = Dictionary(directsuite.config_objects[0])
breakpoint()

