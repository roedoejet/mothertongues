from mtd.app import app
import os
from flask import render_template
from mtd.resources import languages_api

app.register_blueprint(languages_api, url_prefix='/api/v1')

@app.route('/')
def home():
    return render_template('index.html')

