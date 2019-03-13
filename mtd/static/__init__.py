"""Activate available languages
"""
import os
import json
from mtd import static

static_dir = os.path.dirname(static.__file__)
active_path = os.path.join(static_dir, 'active.sites.json')
ACTIVE = []
if os.path.exists(active_path) and os.stat(active_path).st_size:
    with open(active_path, 'r') as f:
        ACTIVE = json.load(f)