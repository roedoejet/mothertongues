from mtd import templates as output_temp_dir
from mtd import static
import os
import jinja2
import json

def set_active_dictionaries(dictionaries):
    static_dir = os.path.dirname(static.__file__)
    names = [d.name for d in dictionaries]
    with open(os.path.join(static_dir, 'active.sites.json'), 'w') as f:
        f.write(json.dumps(names))

def write_static(dictionaries):
    # write config.js and dict_cached.js files
    static_dir = os.path.dirname(static.__file__)
    for dictionary in dictionaries:
        config_fn = f"config-{dictionary.name}.js"
        data_fn = f"dict_cached-{dictionary.name}.js"

        with open(os.path.join(static_dir, "assets", "js", config_fn), 'w') as f:
            f.write(dictionary.return_formatted_config())

        with open(os.path.join(static_dir, "assets", "js", data_fn), 'w') as f:
            f.write(dictionary.return_formatted_data())
