from unittest import TestCase
import requests
import re
from mtd.app import app 
from .. import logger

class ViewIntegrationTest(TestCase):
    """
    This tests language agnostic malformed requests.  
    """
    def setUp(self):
        # host
        self.host = "http://0.0.0.0:5000"
        self.api_prefix = "/api/v1"
        # routes
        # breakpoint()
        self.routes = [str(route) for route in app.url_map.iter_rules()]
        self.views_no_args = [route for route in self.routes if not "<" in route and not route.startswith('/api') and not route.startswith('/static')]
        self.views_only_args = [route for route in self.routes if "<" in route and not route.startswith('/api') and not route.startswith('/static')]
        # endpoints
        self.rules_by_endpoint = app.url_map._rules_by_endpoint
        self.endpoints = [rt for rt in self.rules_by_endpoint.keys()]
        # args
        self.arg_match = re.compile(r'\<[a-z:]+\>')
        args = requests.get(self.host + self.api_prefix + '/languages')
        self.args = [arg['slug'] for arg in args.json()]

    def test_response_code(self):
        '''
        Ensure all routes return 200
        '''
        # Test for "unprepared"
        for rt in self.views_no_args:
            try:
                r = requests.get(self.host + rt)
                self.assertEqual(r.status_code, 200)
                logger.info("Route " + self.host + rt + " returned " + str(r.status_code))
            except:
                logger.error("Couldn't connect. Is flask running?")
        
    def test_response_code_with_args(self):
        '''
        Ensure all args return 200
        '''
        for ep in self.views_only_args:
            pass
            for x in self.args:
                rt = re.sub(self.arg_match, x, ep)
                r = requests.get(self.host + rt)
                self.assertEqual(r.status_code, 200)
                logger.info("Route " + self.host + rt + " returned " + str(r.status_code))
