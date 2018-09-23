from flask import Flask

app = Flask(__name__)

import mtd.views
import mtd.cli