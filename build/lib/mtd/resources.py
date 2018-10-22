from flask_restful import (Resource, Api, reqparse, inputs, fields, url_for, marshal_with, marshal)
from flask import jsonify, Blueprint, abort
from flask_cors import CORS
from mtd.languages.suites import ALL_CONFIGS_SUITE

class LanguageSuites(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'tag', dest='tag',
            type=str, location='args', action='append',
            required=False, help='A tag to filter',
        )
        self.suite = ALL_CONFIGS_SUITE

    def get(self):
        args = self.parser.parse_args()
        if args['tag']:
            language = [l for l in self.suite.config_objects if l['config']['L1'] in args['tag']]
            return jsonify(language)
        else:
            return jsonify(self.suite.config_objects)


languages_api = Blueprint('resources.languages', __name__)

CORS(languages_api)

api = Api(languages_api)

api.add_resource(
    LanguageSuites,
    '/languages',
    endpoint='languages'
)