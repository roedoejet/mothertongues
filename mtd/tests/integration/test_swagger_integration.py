# -*- coding: utf-8 -*-
from unittest import TestCase
import json
import os
import requests
import re
from jsonpointer import resolve_pointer, set_pointer, JsonPointerException
from mohawkapi.data import swagger
from mohawkapi.data.api_data.models import pronoun_data, affix_data, verb_data
from mohawkapi.resources.affix import AffixOptions
from mohawkapi import static
from . import logger

class SwaggerSpecIntegrationTest(TestCase):
    def setUp(self):
        # Swagger
        self.timeout = 5
        self.pre_path = os.path.join(os.path.dirname(swagger.__file__), "swagger-pre.json")
        self.static = os.path.join(os.path.dirname(static.__file__), "swagger.json")
        self.prefix = '/api/v1'
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
        with open(self.pre_path, 'r', encoding='utf8') as f:
            self.pre_data = json.load(f)
        with open(self.static, 'r', encoding='utf8') as f:
            self.generated_data = json.load(f)
        
        # example data
        self.all_affix_tags = [x['tag'] for x in affix_data]
        affix_options = AffixOptions()
        self.all_affopt_tags = [x['tag'] for x in affix_options.AFF_OPTIONS]
        self.all_pronoun_tags = [x['tag'] for x in pronoun_data]
        self.all_verb_tags = [x['tag'] for x in verb_data]

        # define pointers
        self.servers = [s['url'] for s in resolve_pointer(self.generated_data, '/servers')]
        self.route_pointer = '/paths'
        self.routes = resolve_pointer(self.generated_data, self.route_pointer).keys()
        self.routes_with_args = [self.insert_example_arg(x) for x in self.routes]
    
    def insert_example_arg(self, url):
        return url.format(verbTag=self.all_verb_tags[0], pronounTag=self.all_pronoun_tags[0],
                          affixTag=self.all_affix_tags[0], affoptionTag=self.all_affopt_tags[0])

    def test_routes_and_servers(self):
        '''
        All servers in spec should be reachable
        '''
        for host in self.servers:
            for route in self.routes_with_args:
                try:
                    r = requests.get(host + route, headers=self.headers, timeout=self.timeout)
                    t = r.elapsed.total_seconds()
                    try:
                        self.assertEqual(r.status_code, 200)
                        logger.info("Server at " + host + route + " responded in " 
                                    + str(t) + " seconds, with a " + str(r.status_code) + " status code.")
                    except:
                        logger.error("Server at " + host + route + " responded in " 
                                    + str(t) + " seconds, with a " + str(r.status_code) + " status code.")
                except requests.exceptions.ReadTimeout:
                    logger.error("Server at " + host + route + " timed out after " 
                                + str(self.timeout) + " seconds.")
                except requests.exceptions.ConnectTimeout:
                    logger.error("Server at " + host + route + " could not connect and timed out after " 
                                + str(self.timeout) + " seconds.")