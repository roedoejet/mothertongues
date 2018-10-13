from mtd.exceptions import TransducerSourceNotFoundError, TransducerNotFoundError
from mtd.tests import logger
from mtd import transducers as default_dir
import os
import glob
import csv
import json
import random
import re

class Transducer():
    def __init__(self, transducers_needed, transducers_available_dir=os.path.dirname(default_dir.__file__)):
        self.transducers_needed = transducers_needed
        csv_files = os.path.join(transducers_available_dir, "*.csv")
        json_files = os.path.join(transducers_available_dir, "*.json")
        self.paths_to_available_transducers = glob.glob(csv_files) + glob.glob(json_files)
        self.available_transducers = {os.path.splitext(os.path.basename(p))[0]: p for p in self.paths_to_available_transducers}

    def getCorrespondences(self, t_name_or_path):
        """ Get all correspondences for transducer

        :param t_name_or_path: <string> path to transducer or default transducer
        """
        cors = []
        print(t_name_or_path)
        if t_name_or_path in self.available_transducers:
            t_path = self.available_transducers[t_name_or_path]
        elif os.path.exists(t_name_or_path):
            t_path = t_name_or_path
        else:
            raise TransducerNotFoundError(t_name_or_path)
        
        if t_path.endswith('csv'):
            with open(t_path, encoding='utf8') as f:
                    reader = csv.reader(f)
                    for cor in reader:
                        cor = {"from": cor[0], "to": cor[1]}
                        cors.append(cor)
        elif t_path.endswith('json'):
            with open(t_path, encoding='utf8') as f:
                transducer = json.load(f)
                for cor in transducer:
                    cor = {"from": cor["from"], "to": cor["to"]}
                    cors.append(cor)

        # prevent feeding in rules
        for cor in cors:
            # if output exists as input for another cor
            if cor['to'] in [temp_cor['from'] for temp_cor in cors]:
                # assign a random, unique character as a temporary value. this could be more efficient
                random_char = chr(random.randrange(9632, 9727))
                # make sure character is unique
                if [temp_char for temp_char in cors if 'temp' in list(temp_char.keys())]:
                    while random_char in [temp_char['temp'] for temp_char in cors if 'temp' in list(temp_char.keys())]:
                        random_char = chr(random.randrange(9632, 9727))
                cor['temp'] = random_char

        # sort cors
        cors.sort(key=lambda x: len(x['from']), reverse=True)
        return cors

    def createTransducerFunction(self, t_name_or_path):
        """ Creates function based on transducer

        :param t_name_or_path: <string> path to transducer or default transducer
        """
        cors = self.getCorrespondences(t_name_or_path)
        def transduce(to_parse):
            for cor in cors:
                if "temp" in cor:
                    to_parse = re.sub(cor["from"], cor["temp"], to_parse)
                else:
                    to_parse = re.sub(cor["from"], cor["to"], to_parse)
            for cor in cors:
                try:
                    if cor["temp"] and re.search(cor["temp"], to_parse):
                        to_parse = re.sub(cor["temp"], cor["to"], to_parse)
                except KeyError:
                    pass
            return to_parse
        return transduce
    
    def load_composite(self, composite_transducer):
        t_path = self.available_transducers[composite_transducer]
        fns = []
        with open(t_path, encoding='utf8') as f:
            composite = json.load(f)
            for transducer in composite:
                fn = self.createTransducerFunction(transducer)
                fns.append(fn)
        return fns

    def apply_to_data_frame(self, df):
        for transducer in self.transducers_needed:
            for function in transducer['functions']:
                source = transducer['source']
                if not source in df:
                    e = TransducerSourceNotFoundError(source)
                    logger.error(e)
                    raise e
                elif "lambda" in function:
                    df[transducer['target']] = df[source].apply(eval(function))
                elif "composite" in function and function in self.available_transducers:
                    print(function)
                    for fn in self.load_composite(function):
                        df[transducer['target']] = df[source].apply(fn)
                else:
                    fn = self.createTransducerFunction(function)
                    df[transducer['target']] = df[source].apply(fn)
        return df