from mtd import app
import os
from flask import render_template

@app.route('/')
def home():
    return render_template('index.html')
