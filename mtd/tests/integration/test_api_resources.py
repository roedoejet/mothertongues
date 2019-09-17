from unittest import TestCase
import re
from mtd.app import app
import requests
import logging
from mtd.tests import logger
from slugify import slugify
from mtd.resources import Languages

class ResourceIntegrationTest(TestCase):
    """
    This tests that the api returns 200s for all basic
    GET requests.    

    """
    def setUp(self):
        # host
        self.host = "http://0.0.0.0:5000"
        self.prefix = "/api/v1"
        self.client = app.test_client()
        # routes
        self.routes = [str(route) for route in app.url_map.iter_rules()]
        self.api_resources = [route for route in self.routes if route.startswith(self.prefix)]
        # endpoints
        self.rules_by_endpoint = app.url_map._rules_by_endpoint
        self.endpoints = [rt for rt in self.rules_by_endpoint.keys()]
        # breakpoint()
        # args
        self.arg_match = re.compile(r'\<[a-z:]+\>')
        args = requests.get(self.host + self.prefix + '/languages')
        self.args = [arg['slug'] for arg in args.json()]
        languages_resource = Languages()
        self.optional_args = [arg for arg in languages_resource.parser.args if arg.type == bool]
        
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
        for rt in self.api_resources:
            try:
                r = self.client.get(self.host + rt)
                self.assertEqual(r.status_code, 200)
                logger.info("Route " + self.host + rt + " returned " + str(r.status_code))
            except:
                logger.error("Couldn't connect. Is flask running?")
        
    def test_languages_resource_with_args(self):
        '''
        Ensure all args return 200 and check with boolean kwargs
        '''
        for ep in self.api_resources:
            for x in self.args:
                rt = re.sub(self.arg_match, x, ep)
                for arg in self.optional_args:
                    # bool is True
                    params = {'name': 'danish', arg.name: True}
                    r_true = self.client.get(self.host + rt, query_string=params)
                    self.assertEqual(r_true.status_code, 200)
                    logger.info("Route " + self.host + rt + f" with params: {params} returned " + str(r_true.status_code))
                    # bool is False
                    params = {'name': 'danish', arg.name: False}
                    r_false = self.client.get(self.host + rt, query_string={arg.name: False})
                    self.assertEqual(r_false.status_code, 200)
                    logger.info("Route " + self.host + rt + f" with params: {params} returned " + str(r_true.status_code))
                # no args besides language
                params = {'name': 'danish'}
                r_true = self.client.get(self.host + rt, query_string=params)
                self.assertEqual(r_true.status_code, 200)
                logger.info("Route " + self.host + rt + f" with params: {params} returned " + str(r_true.status_code))
                
    def test_wrong_name(self):
        '''
        Ensure 404 is given for wrong name 
        '''
        res = self.client.get("/languages", query_string={'name': 'foobar'})
        self.assertEqual(res.status_code, 404)
        