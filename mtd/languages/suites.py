import json
import os
import requests
import glob
import mtd.languages as ldir
from urllib.parse import urlparse

class LanguageSuite():
    def __init__(self, config_paths):
        self.languages_path = os.path.dirname(ldir.__file__)
        self.config_objects = []
        for cp in config_paths:
            if urlparse(cp).scheme != "":
                r = requests.get(cp)
                self.config_objects.append(r.json())
            else:
                if not os.path.isabs(cp):
                    cp = os.path.join(self.languages_path, cp)
                with open(cp, 'r') as f:
                    self.config_objects.append(json.load(f))

UBC_SUITE = LanguageSuite(["ayajuthem/config.json"])

ALL_CONFIGS = glob.glob(os.path.join(os.path.dirname(ldir.__file__), '**', 'config.json'), recursive=True)

ALL_CONFIGS_SUITE = LanguageSuite(ALL_CONFIGS)
    