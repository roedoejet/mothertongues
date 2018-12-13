from mtd.app import app
import os
from flask import abort, render_template
from mtd.resources import languages_api
from mtd.static import ACTIVE
from mtd.dictionary import Dictionary
from slugify import slugify
from pandas import DataFrame
import logging
from logging.handlers import MemoryHandler
from mtd.tests import logger, ListHandler

app.register_blueprint(languages_api, url_prefix='/api/v1')

active_names = {slugify(a['config']['L1']): a for a in ACTIVE}

def return_len_of_not_null(df: DataFrame, k: str) -> int:
    '''Return length of non null values at df[k]
    '''
    return len([e for e in df[k].notnull() if e])

def return_unique_len(df: DataFrame, k: str) -> dict:
    '''Given a DataFrame and a key, return all unique values in df[k] as keys in a dict with
    the number of instances as the value.
    '''
    return [{"name": v, "value": len(df[k].loc[df[k] == v])} for v in df[k].unique()]


@app.route('/')
def home():
    return render_template('index.html', data=active_names)

@app.route('/api/docs')
def apidocs():
    return render_template('apidocs.html')

@app.route('/dictionaries/<language>/')
def show_dictionary(language):
    config = f"assets/js/config-{language}.js"
    data = f"assets/js/dict_cached-{language}.js"
    if not slugify(language) in active_names:
        abort(404)
    else:
        return render_template("dictionary.html", name=language, config=config, data=data)

@app.route('/statistics/<language>/')
def show_stats(language):
    if not slugify(language) in active_names:
        abort(404)
    else:
        stats = {}
        # Add Handler to collect problems with Dictionary
        problems = []
        lh = ListHandler(problems)
        lh.setLevel(logging.INFO)
        logger.addHandler(lh)
        dictionary = Dictionary(active_names[language])
        logger.removeHandler(lh)
        df = dictionary.df
        stats['total_len'] = len(dictionary)
        if 'audio' in df:
            stats['audio_len'] = return_len_of_not_null(df, 'audio')
        else:
            stats['audio_len'] = 0
        if 'img' in df:
            stats['img_len'] = return_len_of_not_null(df, 'img')
        else:
            stats['img_len'] = 0
        stats['source'] = return_unique_len(df, 'source')
        problems = sorted(problems, key=lambda k: k['levelno'], reverse=True)
        return render_template('stats.html', name=language, stats=stats, alphabet=dictionary.config['alphabet'], problems=problems)

@app.route('/validator')
def validate():
    return render_template('validator.html')