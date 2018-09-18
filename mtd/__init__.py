from flask import Flask
import os

VERSION = '1.0'

class Config(object):
    DEBUG = False
    HOST = '0.0.0.0'
    PORT = int(os.environ.get("PORT", 5500))
    THREADED = True
    HEROKU = False

app = Flask(__name__)

import mtd.views