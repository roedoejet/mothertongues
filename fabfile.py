from flask_frozen import Freezer
from mtd.app import app
from fabric.api import local

def freeze():
    freezer = Freezer(app)
    freezer.freeze()
    local('rm -rf docs/static/*')
    local('rm -f docs/index.html')
    local('cp -r mtd/build/* docs/')
