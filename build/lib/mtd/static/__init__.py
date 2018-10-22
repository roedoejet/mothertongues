"""Activate available languages
"""
import os
import json
from mtd import static

static_dir = os.path.dirname(static.__file__)

with open(os.path.join(static_dir, 'active.sites.json'), 'r') as f:
    ACTIVE = json.load(f)