import click
import os
import glob
import mtd as parent_dir
from mtd.app import app
from mtd.dictionary import Dictionary
from mtd.exceptions import UnfoundConfigErrror
from mtd.languages.suites import LanguageSuite
from mtd.buildtools.write_static import set_active_dictionaries, write_static, write_swagger
from flask.cli import FlaskGroup
from flask_frozen import Freezer
from mtd.static import ACTIVE
from distutils.dir_util import copy_tree

def create_app():
    return app

def return_configs_from_path(path):
    path = os.path.abspath(path)
    if os.path.isdir(path):
        configs = glob.glob(os.path.join(path, '**', 'config.json')) + glob.glob(os.path.join(path, 'config.json'))
    elif os.path.isfile(path):
        with open(path, 'r') as f:
            configs = f.read().splitlines()
    else:
        raise UnfoundConfigErrror(path)
    return configs

@click.group(cls=FlaskGroup, create_app=create_app)
def cli():
    """Management script for the Wiki application."""

@app.cli.command()
@click.argument('language', type=click.Path(exists=True))
def prepare(language):
    """Prepares all necessary files for Mother Tongues dictionary web app and API

    :param str language: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    """
    language = os.path.abspath(language)
    configs = return_configs_from_path(language)
    ls = LanguageSuite(configs)
    names = [l['config']['L1'] for l in ls.config_objects]
    dictionaries = [Dictionary(l) for l in ls.config_objects]
    write_static(dictionaries)
    write_swagger(dictionaries)
    set_active_dictionaries(ls.config_objects)
    click.echo(f"Successfully built static files for the following dictionaries: {names}. You may now run the app.")

@app.cli.command()
@click.argument('language', type=click.Path(exists=True))
@click.argument('output', type=click.Path(exists=True, file_okay=False, dir_okay=True, writable=True))
@click.argument('export_type', type=click.Choice(["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "mobile", "github"]))
def export(language, export_type, output):
    """Exports Mother Tongues

    :param str language: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    :param str export_type: choose type of export: ["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "mobile", "github"]
    :param str output: choose where output is exported to
    """
    if export_type in ["mobile", "github"]:
        click.echo(f"this feature is coming soon")
    else:
        language = os.path.abspath(language)
        configs = return_configs_from_path(language)
        ls = LanguageSuite(configs)
        output = os.path.abspath(output)
        dictionaries = [Dictionary(l) for l in ls.config_objects]
        if export_type.startswith('raw'):
            for d in dictionaries:
                ext = export_type.split('-')[1]
                output_name = os.path.join(output, f"{d.name}.{ext}")
                d.export_raw_data(output_name, export_type=ext)
        elif export_type == "js" or export_type == "json":
            for d in dictionaries:
                config_output_name = os.path.join(output, f"config-{d.name}.{export_type}")
                data_output_name = os.path.join(output, f"dict_cached-{d.name}.{export_type}")
                with open(config_output_name, 'w') as f:
                    f.write(d.return_formatted_config(form=export_type))
                with open(data_output_name, 'w') as f:
                    f.write(d.return_formatted_data(form=export_type))
        elif export_type == "web":
            freezer = Freezer(create_app())
            @freezer.register_generator
            def show_dictionary():
                return [f"/dictionaries/{l['config']['L1']}/" for l in ACTIVE]
            freezer.freeze()
            build_dir = os.path.join(os.path.dirname(parent_dir.__file__), "build")
            copy_tree(build_dir, os.path.join(output, "mtd-output"))

@app.cli.command()
@click.argument('path', type=click.Path(exists=True))
def available(path):
    """ Return names of all language configs at specified path

    :param str path: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    """
    configs = return_configs_from_path(path)
    ls = LanguageSuite(configs)
    names = [l['config']['L1'] for l in ls.config_objects]
    if names:
        click.echo(f"The following languages are available at {path}: {names}")
    else:
        click.echo(UnfoundConfigErrror(path))
