#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import os
import glob
import mtd as parent_dir
import json
from datetime import datetime as dt
from mtd.app import app
from mtd.tests import logger
from mtd.dictionary import Dictionary
from mtd.exceptions import CredentialsMissingError, UnfoundConfigError
from mtd.languages import LanguageConfig
from mtd.languages.suites import LanguageSuite
from mtd.processors.validator import check_alphabet, return_null, return_dupes
from jsonschema.exceptions import ValidationError
from mtd.buildtools.write_static import set_active_dictionaries, write_static, write_swagger
from flask.cli import FlaskGroup
from flask_frozen import Freezer
from mtd.static import ACTIVE
import pathlib
from distutils.dir_util import copy_tree
from base64 import b64encode
from urllib.parse import urljoin
from slugify import slugify
import requests
from mtd.version import __version__

def create_app():
    return app

def return_configs_from_path(path):
    path = os.path.abspath(path)
    if os.path.isdir(path):
        configs = glob.glob(os.path.join(path, '**', 'config*.json')) + glob.glob(os.path.join(path, 'config*.json'))
    elif os.path.isfile(path):
        if path.endswith('txt'):
            with open(path, 'r', encoding='utf8') as f:
                paths = f.read().splitlines()
            configs = [LanguageConfig(path) for path in paths]
        elif path.endswith('json'):
            configs = [LanguageConfig(path)]
        else:
            raise UnfoundConfigError(path)
    else:
        raise UnfoundConfigError(path)
    return configs

def push_to_github(dictionary: Dictionary):
    '''Push Dictionary to GitHub
    '''
    if not 'github_credentials_path' in dictionary.config:
        raise CredentialsMissingError(dictionary.name)
    else:
        base_url = "https://api.github.com/repos/"

        with open(dictionary.config['github_credentials_path'], 'r', encoding='utf8') as f:
            creds = json.load(f)
       
        config_path = os.path.join(base_url, creds['user'], creds['repo'], 'contents', creds['path'], 'config.js')
        dict_path = os.path.join(base_url, creds['user'], creds['repo'], 'contents', creds['path'], 'dict_cached.js')
        
        config_r = requests.get(config_path)
        dict_r = requests.get(dict_path)

        config_rjson = config_r.json()
        dict_rjson = dict_r.json()
        try:
            config_sha = config_rjson['sha']
            dict_sha = dict_rjson['sha']
        except KeyError:
            config_sha = ""
            dict_sha = ""

        config_b64 = b64encode(str.encode(dictionary.return_formatted_config('js')))
        config_json = json.dumps({
                        "message": "update",
                        "content": config_b64.decode('utf8'),
                        "sha": config_sha
                        })
        
        dict_b64 = b64encode(str.encode(dictionary.return_formatted_data('js')))
        dict_json = json.dumps({
                        "message": "update",
                        "content": dict_b64.decode('utf8'),
                        "sha": dict_sha
                        })

        headers={'Authorization': 'token {tok}'.format(tok=creds['token'])}
        
        if input(f"Overwrite file at {config_path}? ") in ['yes', 'y']:
            code = requests.put(config_path, data=config_json, headers=headers)
            logger.info(f"Tried pushing file to {config_path} and received code {code} in response.")
        else:
            print("Aborted. You must type 'yes' or 'y' to push to GitHub.") 

        if input(f"Overwrite file at {dict_path}? ") in ['yes', 'y']:
            code = requests.put(dict_path, data=dict_json, headers=headers)
            logger.info(f"Tried pushing file to {config_path} and received code {code} in response.")
        else:
            print("Aborted. You must type 'yes' or 'y' to push to GitHub.")

@click.version_option(version=__version__, prog_name="Mother Tongues Dictionaries")
@click.group(cls=FlaskGroup, create_app=create_app)
def cli():
    """Management script for Mother Tongues Dictionaries."""

@app.cli.command()
@click.argument('language', type=click.Path(exists=True, resolve_path=True))
def prepare(language):
    """Prepares all necessary files for Mother Tongues dictionary web app and API

    :param str language: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    """
    language = os.path.abspath(language)
    configs = return_configs_from_path(language)
    ls = LanguageSuite(configs)
    names = [l['config']['L1'] for l in ls.config_objects]
    write_static(ls.dictionaries)
    write_swagger(ls.dictionaries)
    set_active_dictionaries(ls.config_objects)
    try:
        if 40 in logger._cache and logger._cache[40]:
            click.echo("Sorry, your build finished with some errors. Please look at your logs/messages above and try again.")
        else:
            click.echo(f"Successfully built static files for the following dictionaries: {names}. You may now run the app.")
    except AttributeError:
        click.echo(f"Successfully built static files for the following dictionaries: {names}. You may now run the app. *Warning* Mother Tongues uses logger caching to check if your build finished with errors. Because you are using a version of Python < 3.7 this feature is disabled and running your dictionary might not work.")


@click.argument('language', type=click.Path(exists=True, resolve_path=True))
@click.option('--alphabet', '-al', is_flag=True, required=False, default=True, help='Check alphabet is readable and no missed characters in data')
@app.cli.command()
def check(language, alphabet):
    ''' Utility to check various aspects of your Mother Tongues Dictionary.
    '''
    base_template = '''
    ===========================================================
    =                       MTD Report                        =
    =                                                         =
    =                                                         =
    =                                                         =
    =                                                         =
    =                                                         =
    ===========================================================

    Time: {time}

    Dictionaries
    ++++++++++++

    {dictionaries}

    '''
    dictionary_template = '''
    {L1} to {L2} Dictionary
    -----------------------

    Config
    ------
    Alphabet: {original_alphabet}

    Tests
    -----

    Alphabet Test: {alphabet_test} 
        Characters Not in Alphabet: {letters_not_in_alphabet}
    Null Items Test: {null_test}
        Number of Null Items: {number_of_null_rows}
    Duplicates Test: {duplicate_test}
        Number of Duplicates: {number_of_duplicates}
    
    Data
    ----

    {duplicates}
    '''
    time = str(dt.now())
    dictionaries = []
    success = '✓'
    fail = '✗'
    language = os.path.abspath(language)
    configs = return_configs_from_path(language)
    ls = LanguageSuite(configs)
    for i, lang in enumerate(ls.config_objects):
        df = ls.dictionaries[i].df
        dictionary = {'L1': lang.config['config']['L1'], 'L2': lang.config['config']['L2'], 'tests': {}}
        # Check Alphabet
        excess = check_alphabet(lang.config['config']['alphabet'], df)
        if excess:
            dictionary['tests']['alphabet_test'] = fail
        else:
            dictionary['tests']['alphabet_test'] = success
        dictionary['letters_not_in_alphabet'] = json.dumps(excess)
        # Check Null
        null = return_null(df)
        if null:
            dictionary['tests']['null_test'] = fail
        else:
            dictionary['tests']['null_test'] = success
        dictionary['number_of_null_rows'] = len(null)
        # Check Duplicates
        dupes = return_dupes(df)
        if dupes:
            dictionary['tests']['duplicate_test'] = fail
        else:
            dictionary['tests']['duplicate_test'] = success
        dictionary['number_of_duplicates'] = len(dupes)
        dictionary['duplicates'] = [x['value'] for x in dupes]
        dictionary['original_alphabet'] = json.dumps(lang.config['config']['alphabet'])
        dictionaries.append(dictionary)
    base = base_template.format(time=time, 
                        dictionaries='\n'.join([dictionary_template.format(L1=d['L1'], 
                                                                 L2=d['L2'], 
                                                                 alphabet_test=d['tests']['alphabet_test'],
                                                                 letters_not_in_alphabet=d['letters_not_in_alphabet'],
                                                                 null_test=d['tests']['null_test'],
                                                                 number_of_null_rows=d['number_of_null_rows'],
                                                                 duplicate_test=d['tests']['duplicate_test'],
                                                                 number_of_duplicates=d['number_of_duplicates'],
                                                                 duplicates=d['duplicates'],
                                                                 original_alphabet=d['original_alphabet']) for d in dictionaries]))
    with open(f'mtd-{time}.log', 'w') as f:
        f.write(base)

@app.cli.command()
@click.argument('language', type=click.Path(exists=True, resolve_path=True))
@click.argument('export_type', type=click.Choice(["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "mobile", "github"]))
@click.argument('output', type=click.Path(exists=True, file_okay=False, dir_okay=True, writable=True, resolve_path=True), required=False)
@click.option('--enable-logging', '-el', is_flag=True, required=False, default=False, help='Log output to file')
def export(language, export_type, output, enable_logging):
    """Exports Mother Tongues Dictionary

    :param str language: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    :param str export_type: choose type of export: ["raw-json", "raw-xlsx", "raw-csv", "raw-psv", "raw-tsv", "raw-html", "js", "json", "web", "mobile", "github"]
    :param str output: choose where output is exported to
    """
    if enable_logging:
        import logging
        from mtd.tests.log import FORMATTER
        from datetime import datetime as dt
        now = dt.now()
        fh = logging.FileHandler(f'{language}-{dt.timestamp(now)}.log')
        fh.setLevel(logging.WARNING)
        fh.setFormatter(FORMATTER)
        logger.addHandler(fh)
    if export_type in ["mobile"]:
        click.echo(f"this feature is coming soon")
    else:
        language = os.path.abspath(language)
        configs = return_configs_from_path(language)
        ls = LanguageSuite(configs)
        if output:
            output = os.path.abspath(output)
        if export_type.startswith('raw'):
            for d in ls.dictionaries:
                ext = export_type.split('-')[1]
                output_name = os.path.join(output, f"{d.name}.{ext}")
                d.export_raw_data(output_name, export_type=ext)
        elif export_type == "js" or export_type == "json":
            for d in ls.dictionaries:
                config_output_name = os.path.join(output, f"config-{d.name}.{export_type}")
                data_output_name = os.path.join(output, f"dict_cached-{d.name}.{export_type}")
                with open(config_output_name, 'w', encoding='utf8') as f:
                    f.write(d.return_formatted_config(form=export_type))
                with open(data_output_name, 'w', encoding='utf8') as f:
                    f.write(d.return_formatted_data(form=export_type))
        elif export_type == 'github':
            for d in ls.dictionaries:
                push_to_github(d)
        elif export_type == "web":
            freezer = Freezer(create_app())
            @freezer.register_generator
            def show_dictionary():
                for l in ACTIVE:
                    language = slugify(l['config']['L1'])
                    yield {'path': f"/dictionaries/{language}/", 'language': language}

            @freezer.register_generator
            def show_stats():
                for l in ACTIVE:
                    language = slugify(l['config']['L1'])
                    yield {'path': f"/statistics/{language}/", 'language': language }

            freezer.freeze()
            build_dir = os.path.join(os.path.dirname(parent_dir.__file__), "build")
            copy_tree(build_dir, os.path.join(output, "mtd-output"))


@app.cli.command(with_appcontext=False)
@click.argument('path', type=click.Path(exists=True, resolve_path=True))
def available(path):
    """ Return names of all language configs at specified path

    :param str path: path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files
    """
    try:
        configs = return_configs_from_path(path)
        ls = LanguageSuite(configs)
        names = [l['config']['L1'] for l in ls.config_objects]
        if names:
            click.echo(f"The following languages are available at {path}: {names}")
        else:
            click.echo(UnfoundConfigError(path))
    except UnfoundConfigError:
        click.echo(UnfoundConfigError(path))
    

