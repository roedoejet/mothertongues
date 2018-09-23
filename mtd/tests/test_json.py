import json
import os
from .test_data import json as jp
from unittest import TestCase

class JsonTest(TestCase):
    def setUp(self):
        self.path = os.path.dirname(jp.__file__)
        self.bad = os.path.join(self.path, "bad.json")
        self.missing = os.path.join(self.path, "missing.json")
        self.test = os.path.join(self.path, "test.json")