from unittest import TestCase
import re
from mtd.app import app
import requests
import logging
from .. import logger
from slugify import slugify

class ResourceIntegrationTest(TestCase):
    """
    This tests that the api returns 200s for all basic
    GET requests.    

    """
    def setUp(self):
        # host
        self.host = "http://0.0.0.0:5000"
        self.prefix = "/api/v1"
        # routes
        self.routes = [str(route) for route in app.url_map.iter_rules()]
        self.routes_no_args = [route for route in self.routes if not "<" in route]
        self.routes_only_args = [route for route in self.routes if "<" in route and route != "/static/<path:filename>"]
        # endpoints
        self.rules_by_endpoint = app.url_map._rules_by_endpoint
        self.endpoints = [rt for rt in self.rules_by_endpoint.keys()]
        # args
        self.arg_match = re.compile(r'\<[a-z:]+\>')
        args = requests.get(self.host + self.prefix + '/languages')
        self.args = [arg['slug'] for arg in args.json()]
    
    def return_endpoint_arg(self, ep):
        split = ep.split('.')
        split_length = len(split)
        return split[split_length-1]
    
    def return_route_from_endpoint(self, ep):
        return str(self.rules_by_endpoint[ep][0])

    def test_response_code(self):
        '''
        Ensure all routes return 200
        '''
        # Test for "unprepared"
        for rt in self.routes_no_args:
            try:
                print(rt)
                r = requests.get(self.host + rt)
                self.assertEqual(r.status_code, 200)
                logger.info("Route " + self.host + rt + " returned " + str(r.status_code))
            except:
                logger.error("Couldn't connect. Is flask running?")
        
    def test_response_code_with_args(self):
        '''
        Ensure all args return 200
        '''
        for ep in self.routes_only_args:
            for x in self.args:
                rt = re.sub(self.arg_match, x, ep)
                r = requests.get(self.host + rt)
                self.assertEqual(r.status_code, 200)
                
