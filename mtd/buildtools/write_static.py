from mtd import templates as output_temp_dir
from mtd import static
from mtd import buildtools as swagger_dir
from jsonpointer import set_pointer
import os
import jinja2
import json

def set_active_dictionaries(configs):
    static_dir = os.path.dirname(static.__file__)
    # names = [d.name for d in dictionaries]
    with open(os.path.join(static_dir, 'active.sites.json'), 'w') as f:
        f.write(json.dumps(configs))

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

def write_swagger(dictionaries):
    static_dir = os.path.dirname(static.__file__)
    pre_path = os.path.join(os.path.dirname(swagger_dir.__file__), 'swagger-pre.json')
    post_path = os.path.join(static_dir, 'swagger.json')
    with open(pre_path, 'r', encoding='utf8') as f:
            data = json.load(f)
    languages_pointer = '/components/schemas/LanguageTags/enum'
    language_tags = sorted(list(set([d.name for d in dictionaries])))
    new_data = set_pointer(data, languages_pointer, language_tags)
    with open(post_path, 'w') as f:
            json.dump(new_data, f)