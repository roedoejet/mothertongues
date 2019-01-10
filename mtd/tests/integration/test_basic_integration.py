from unittest import TestCase
import re
from mohawkapi import app
from mohawkapi.data.api_data.models import affix_data, pronoun_data, verb_data
from mohawkapi.resources.affix import AffixOptions 
import requests
import logging
from .. import logger


class ResourceIntegrationBasicErrorTest(TestCase):
    """
    This tests language agnostic malformed requests.  
    """
    def setUp(self):
        # host
        self.host = "http://localhost:5000"
        self.prefix = "/api/v1"
        # routes
        self.routes = [str(route) for route in app.url_map.iter_rules()]
        self.routes_no_fst_no_args = [route for route in self.routes if not "<" in route and not "conjugation" in route]
        self.routes_no_args = [route for route in self.routes if not "<" in route and route not in self.routes_no_fst_no_args]
        self.routes_only_args = [route for route in self.routes if "<" in route and route != "/static/<path:filename>"]
        # endpoints
        self.rules_by_endpoint = app.url_map._rules_by_endpoint
        self.endpoints = [rt for rt in self.rules_by_endpoint.keys()]
        # args
        self.arg_match = re.compile(r'\<[a-z:]+\>')
        self.all_pronoun_tags = [x['tag'] for x in pronoun_data]
        # non-existant resources
        self.non_existant_tag = "foobar"
    
    def return_endpoint_arg(self, ep):
        split = ep.split('.')
        split_length = len(split)
        return split[split_length-1]
    
    def return_route_from_endpoint(self, ep):
        return str(self.rules_by_endpoint[ep][0])

    def test_error_response_code_405_with_disallowed_methods(self):
        '''
        Ensure all disallowed methods return 405s
        '''
        for rt in self.routes_no_fst_no_args:
            try:
                r = requests.delete(self.host + rt)
                self.assertEqual(r.status_code, 405)
                logger.info("'DELETE' method on route " + self.host + rt + " returned " + str(r.status_code))
                r = requests.put(self.host + rt)
                self.assertEqual(r.status_code, 405)
                logger.info("'PUT' method on route " + self.host + rt + " returned " + str(r.status_code))
                r = requests.post(self.host + rt)
                self.assertEqual(r.status_code, 405)
                logger.info("'POST' method on route " + self.host + rt + " returned " + str(r.status_code))
            except AssertionError:
                logger.warning("Route " + self.host + rt + " returned " + str(r.status_code))
            except:
                logger.error("Couldn't connect. Is flask running?")
        
    def test_error_response_code_404_with_non_existant_args(self):
        '''
        Ensure all non-existant args return 404
        '''
        for ep in self.routes_only_args:
            if "/verb" in ep:
                rt = re.sub(self.arg_match, self.non_existant_tag, ep)
                try:
                    r = requests.get(self.host + rt)
                    self.assertEqual(r.status_code, 404)
                    logger.info("Non-existant arg on route " + self.host + rt + " returned " + str(r.status_code))
                except AssertionError:
                    logger.error("Route " + self.host + rt + " returned " + str(r.status_code))
                except:
                    logger.error("Couldn't connect. Is flask running?")
            elif "/aff-option" in ep:
                rt = re.sub(self.arg_match, self.non_existant_tag, ep)
                try:
                    r = requests.get(self.host + rt)
                    self.assertEqual(r.status_code, 404)
                    logger.info("Non-existant arg on route " + self.host + rt + " returned " + str(r.status_code))
                except AssertionError:
                    logger.error("Route " + self.host + rt + " returned " + str(r.status_code))
                except:
                    logger.error("Couldn't connect. Is flask running?")
            elif "/affix" in ep:
                rt = re.sub(self.arg_match, self.non_existant_tag, ep)
                try:
                    r = requests.get(self.host + rt)
                    self.assertEqual(r.status_code, 404)
                    logger.info("Non-existant arg on route " + self.host + rt + " returned " + str(r.status_code))
                except AssertionError:
                    logger.error("Route " + self.host + rt + " returned " + str(r.status_code))
                except:
                    logger.error("Couldn't connect. Is flask running?")
            elif "/pronoun" in ep:
                rt = re.sub(self.arg_match, self.non_existant_tag, ep)
                try:
                    r = requests.get(self.host + rt)
                    self.assertEqual(r.status_code, 404)
                    logger.info("Non-existant arg on route " + self.host + rt + " returned " + str(r.status_code))
                except AssertionError:
                    logger.error("Route " + self.host + rt + " returned " + str(r.status_code))
                except:
                    logger.error("Couldn't connect. Is flask running?")
            elif "/conjugations":
                rt = re.sub(self.arg_match, self.non_existant_tag, ep)
                try:
                    r = requests.get(self.host + rt)
                    self.assertEqual(r.status_code, 404)
                    logger.info("Non-existant arg on route " + self.host + rt + " returned " + str(r.status_code))
                except AssertionError:
                    logger.error("Route " + self.host + rt + " returned " + str(r.status_code))
                except:
                    logger.error("Couldn't connect. Is flask running?")
            else:
                logger.warning("Route " + self.host + ep + " was registered, but not tested.")
 
