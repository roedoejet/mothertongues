from mtd.buildtools import templates as build_temp_dir
from mtd import templates as output_temp_dir
from mtd import static
import os
import jinja2

def write_to_static(dictionaries):
    latexJinjaEnv = jinja2.Environment(
        block_start_string='\jblock{',
        block_end_string='}',
        variable_start_string='\jvar{',
        variable_end_string='}',
        comment_start_string='\#{',
        comment_end_string='}',
        line_statement_prefix='%%',
        line_comment_prefix='%#',
        trim_blocks=True,
        autoescape=False,
        loader=jinja2.FileSystemLoader(os.path.dirname(build_temp_dir.__file__))
    )
    # write index.html and config.js and dict_cached.js files
    static_dir = os.path.dirname(static.__file__)
    for dictionary in dictionaries:
        template = latexJinjaEnv.get_template('index_template.html')
        path = os.path.join(os.path.dirname(output_temp_dir.__file__), f"{dictionary.name}.html")
        with open(path, 'w') as f:
            f.write(template.render(name=dictionary.name))

        config_fn = f"config-{dictionary.name}.js"
        data_fn = f"dict_cached-{dictionary.name}.js"

        with open(os.path.join(static_dir, "assets", "js", config_fn), 'w') as f:
            f.write(dictionary.return_formatted_config())

        with open(os.path.join(static_dir, "assets", "js", data_fn), 'w') as f:
            f.write(dictionary.return_formatted_data())
