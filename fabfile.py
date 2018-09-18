from flask_frozen import Freezer
from mtd import app
from fabric.api import local

def freeze():
    freezer = Freezer(app)
    freezer.freeze()
    local('rm -r docs/static/*')
    local('rm docs/index.html')
    local('cp -r mtd/build/* docs/')
