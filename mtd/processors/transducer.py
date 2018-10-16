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
        
    def return_transducer_path(self, t_name_or_path):
        if t_name_or_path in self.available_transducers:
            return self.available_transducers[t_name_or_path]
        elif os.path.exists(t_name_or_path):
            return t_name_or_path
        else:
            raise TransducerNotFoundError(t_name_or_path)
        
    def return_transducer_name(self, t_name_or_path):
        if t_name_or_path in self.available_transducers:
            return t_name_or_path
        elif os.path.exists(t_name_or_path):
            fn, ext = os.path.splitext(os.path.basename(t_name_or_path))
            return fn
        else:
            raise TransducerNotFoundError(t_name_or_path)

    def getCorrespondences(self, t_name_or_path):
        """ Get all correspondences for transducer

        :param t_name_or_path: <string> path to transducer or default transducer
        """
        cors = []
        t_path = self.return_transducer_path(t_name_or_path)
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
    
    def load_composite(self, t_name_or_path):
        t_path = self.return_transducer_path(t_name_or_path)
        fns = []
        with open(t_path, encoding='utf8') as f:
            composite = json.load(f)
            return composite

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
                elif "composite" in function:
                    for t in self.load_composite(function):
                        fn = self.createTransducerFunction(t)
                        df[transducer['target']] = df[source].apply(fn)
                else:
                    fn = self.createTransducerFunction(function)
                    df[transducer['target']] = df[source].apply(fn)
        return df
    
    def return_js_template(self, t_name_or_path):
        name = self.return_transducer_name(t_name_or_path)

        transducer_js_template = '''\n\nmtd.transducers["{name}"] = (function() {{
                                        var correspondences = {cors};
                                        var keys = {keys};
                                        var regex = new RegExp("(" + keys.join('|') + ")", 'g');
                                        return function(str) {{
                                            return str.replace(regex, function(a,b) {{
                                                return correspondences[a];
                                            }});
                                        }};
                                    }})();'''

        composite_js_template = u'''\n\nmtd.transducers["{name}"] = (function(){{
                                        var orths = {composite_transducers};
                                        return function(str) {{
                                            for (var i = 0; i < orths.length; i++) {{
                                                transducer = mtd.transducers[orths[i]];
                                                str = transducer(str);
                                            }}
                                            return str;
                                        }};
                                    }})();'''

        if "composite" in t_name_or_path:
            composite_transducers = self.load_composite(t_name_or_path)
            return composite_js_template.format(name=name, composite_transducers=composite_transducers)
        else:
            cors = self.getCorrespondences(t_name_or_path)
            keys = sorted([cor['from'] for cor in cors], key=len, reverse=True)
            return transducer_js_template.format(name=name, cors=cors, keys=keys)
        