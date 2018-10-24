from mtd.app import app
import os
from flask import abort, render_template
from mtd.resources import languages_api
from mtd.static import ACTIVE
from slugify import slugify

app.register_blueprint(languages_api, url_prefix='/api/v1')

active_names = [slugify(a['config']['L1']) for a in ACTIVE]

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
