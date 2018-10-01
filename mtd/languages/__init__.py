import json
import os
from mtd import languages as current_dir
current_dir = os.path.dirname(current_dir.__file__)

with open(os.path.join(current_dir, 'config_schema.json')) as f:
    CONFIG_SCHEMA = json.load(f)

with open(os.path.join(current_dir, 'manifest_schema.json')) as f:
    MANIFEST_SCHEMA = json.load(f)