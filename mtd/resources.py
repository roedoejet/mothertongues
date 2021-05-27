from flask_restful import (Resource, Api, reqparse, inputs, fields, url_for, marshal_with, marshal)
from flask import jsonify, Blueprint, abort
from flask_cors import CORS
from mtd.static import ACTIVE
from mtd.dictionary import Dictionary
from slugify import slugify

class Languages(Resource):
    """REST API resource that exposes available dictionaries, including formatted data and configuration files.
       Interactive documentation for the API is automatically generated and available at the route /api/docs after running `mtd run`
    """
    def __init__(self):
        self.available = [{"plain": l['config']['L1'], "slug": slugify(l['config']['L1'])} for l in ACTIVE]
        self.dictionaries = [Dictionary(d) for d in ACTIVE]
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'only-config', dest='only-config',
            type=bool, location='args', default=False,
            required=False, help='Return only config',
        )
        self.parser.add_argument(
            'only-data', dest='only-data',
            type=bool, location='args', default=False,
            required=False, help='Return only data',
        )
        self.parser.add_argument(
            'available', dest='available',
            type=bool, location='args', default=False,
            required=False, help='Return all available languages',
        )
        self.parser.add_argument(
            'name', dest='name',
            type=str, location='args', action='append',
            required=False, help='Specify languages',
        )
        
    def get(self):
        """Get available dictionary names, data and configurations
        """
        # breakpoint()
        args = self.parser.parse_args()
        if "available" in args and args["available"]:
            return jsonify(self.available)
        else:
            if "name" in args and args['name']:
                for dnry in self.dictionaries:
                    if dnry.name in args['name']:
                        if "only-data" in args and args['only-data']:
                            return jsonify(dnry.return_formatted_data('obj'))
                        elif "only-config" in args and args['only-config']:
                            return jsonify(dnry.return_formatted_config('obj'))
                        else:
                            return jsonify({"config": dnry.return_formatted_config('obj'), "data": dnry.return_formatted_data('obj')})
                abort(404)
            else:
                return jsonify(self.available)


languages_api = Blueprint('resources-languages', __name__)

CORS(languages_api)

api = Api(languages_api)

api.add_resource(
    Languages,
    '/languages',
    endpoint='languages'
)
