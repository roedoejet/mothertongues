from flask_frozen import Freezer
from mtd.app import app
from fabric.api import local

def freeze():
    freezer = Freezer(app)
    freezer.freeze()
