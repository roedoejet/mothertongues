from mtd.exceptions import TransducerSourceNotFoundError, TransducerNotFoundError
from mtd.tests import logger
from mtd import transducers as default_dir
import os
import glob
import csv
import json
import random
import re
import yaml

from g2p.mappings import Mapping
from g2p.mappings.utils import load_from_file
from g2p.transducer import Transducer as G2PTransducer
from pandas import DataFrame
from typing import Callable, Dict, List, Union
from collections import ChainMap

TRANSDUCER_DIR = os.path.dirname(default_dir.__file__)

class Transducer():
    '''Class that creates transducers in a variety of formats.

    Args:
        transducers_needed (List[dict], optional): A list of dicts containing a source key (str), target key (str) and list of transducer functions (either lambda functions or transducer names or paths)
        transducers_available_dir (str, optional): Path to directory containing transducers
    '''
    def __init__(self, transducers_needed=[], transducers_config=os.path.join(TRANSDUCER_DIR, 'config.yaml')):
        self.transducers_needed = transducers_needed
        with open(transducers_config, encoding='utf8') as f:
            data = yaml.safe_load(f)
        for mapping in data['mappings']:
            mapping['mapping'] = os.path.join(TRANSDUCER_DIR, mapping['mapping'])
        self.available_transducers = {x['language_name']: x for x in data['mappings']}
        
    def return_transducer_path(self, t_name_or_path):
        t_name_or_path = os.path.expanduser(t_name_or_path)
        if os.path.exists(t_name_or_path):
            return t_name_or_path
        elif t_name_or_path in self.available_transducers:
            return t_name_or_path
        else:
            raise TransducerNotFoundError(t_name_or_path)
        
    def return_transducer_name(self, t_name_or_path: str):
        '''Check if transducer is in self.available_transducers or if path exists, otherwise raise error.
        '''

        if not t_name_or_path:
            raise TransducerNotFoundError(t_name_or_path)
        if t_name_or_path in self.available_transducers:
            return t_name_or_path
        t_name_or_path = os.path.expanduser(t_name_or_path)
        if os.path.exists(t_name_or_path):
            fn, ext = os.path.splitext(os.path.basename(t_name_or_path))
            return fn
        else:
            raise TransducerNotFoundError(t_name_or_path)

    def create_transducer_mapping(self, t_name_or_path: str) -> Callable[[str], str]:
        """ Gets mapping of transducer

        :param t_name_or_path: <string> path to transducer or default transducer
        """
        path = self.return_transducer_path(t_name_or_path)
        if t_name_or_path in self.available_transducers:
            mapping = Mapping(**self.available_transducers[t_name_or_path])
        elif path.endswith('.yaml'):
            mapping = Mapping(self.return_transducer_path(t_name_or_path))
        else:
            mapping = Mapping(load_from_file(self.return_transducer_path(t_name_or_path)))
        return G2PTransducer(mapping)

    def create_composite_transducer_mapping(self, t_name_or_path: str) -> List[Callable]:
        ''' Gets mapping of composite transducer
        
        Args: 
            :param str t_name_or_path: name of transducer or path to composite transducer.
        '''
        t_path = self.return_transducer_path(t_name_or_path)
        t_path_dir = os.path.abspath(os.path.dirname(t_path))
        fns = {}
        with open(t_path, encoding='utf8') as f:
            composite = json.load(f)
        for t in composite:
            # Try and find transducers
            try:
                path = self.return_transducer_path(t)
            except TransducerNotFoundError:
                path = False
            if not path and t in self.available_transducers:
                fn = self.create_transducer_function(t)
            elif not path:
                globs = glob.glob(os.path.join(t_path_dir, t + '.*'))
                # If there's a match
                if globs:
                    globs = [x for x in filter(lambda x: 'composite' not in x, globs)]
                    if len(globs) > 1:
                        for path in globs:
                            # prioritize yaml
                            if path.endswith('yaml') or globs.index(path) == len(globs) - 1:
                                fn = self.create_transducer_mapping(path)
                                mapping = [{x['in']: x['out']} for x in fn.mapping()]
                                break
                    else:
                        # return the first
                        fn = self.create_transducer_mapping(globs[0])  
                        mapping = [{x['in']: x['out']} for x in fn.mapping()] 
                else:
                    raise TransducerNotFoundError(t_name_or_path)     
            else:       
                fn = self.create_transducer_mapping(t)
                mapping = [{x['in']: x['out']} for x in fn.mapping()]
            name = self.return_mapping_name(t)
            fns[name] = mapping
        comp_name = self.return_mapping_name(t_path, True)
        return {comp_name: fns}

    def create_transducer_function(self, t_name_or_path: str) -> Callable[[str], str]:
        """ Creates function based on transducer

        :param t_name_or_path: <string> path to transducer or default transducer
        """
        path = self.return_transducer_path(t_name_or_path)
        if t_name_or_path in self.available_transducers:
            mapping = Mapping(**self.available_transducers[t_name_or_path])
        elif path.endswith('yaml'):
            mapping = Mapping(self.return_transducer_path(t_name_or_path))
        else:
            mapping = Mapping(load_from_file(self.return_transducer_path(t_name_or_path)))
        transducer = G2PTransducer(mapping)
        return lambda x: transducer(x).output_string

    
    def load_composite(self, t_name_or_path: str) -> List[Callable]:
        '''Load composite transducer from path or name
        
        Args: 
            :param str t_name_or_path: name of transducer or path to transducer.
        '''
        t_path = self.return_transducer_path(t_name_or_path)
        t_path_dir = os.path.abspath(os.path.dirname(t_path))
        fns = []
        with open(t_path, encoding='utf8') as f:
            composite = json.load(f)
        for t in composite:
            # Try and find transducers
            try:
                path = self.return_transducer_path(t)
            except TransducerNotFoundError:
                path = False
            if not path and t in self.available_transducers:
                fn = self.create_transducer_function(t)
            elif not path:
                globs = glob.glob(os.path.join(t_path_dir, t + '.*'))
                # If there's a match
                if globs:
                    globs = [x for x in filter(lambda x: 'composite' not in x, globs)]
                    if len(globs) > 1:
                        for path in globs:
                            # prioritize yaml
                            if path.endswith('yaml') or globs.index(path) == len(globs) - 1:
                                fn = self.create_transducer_function(path)
                                break
                    else:
                        # return the first
                        fn = self.create_transducer_function(globs[0])   
                else:
                    raise TransducerNotFoundError(t_name_or_path)     
            else:       
                fn = self.create_transducer_function(t)
            fns.append(fn)
        return fns

    def apply_to_data_frame(self, df: DataFrame) -> DataFrame:
        '''Apply all transducers in self.transducers_needed to df.

        **EVAL**

        Args:
            :param DataFrame df: DataFrame to have data transduced
        '''
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
                    for fn in self.load_composite(function):
                        # fn = self.create_transducer_function(t)
                        df[transducer['target']] = df[source].apply(fn)
                else:
                    try:
                        fn = self.create_transducer_function(function)
                        df[transducer['target']] = df[source].apply(fn)
                    except:
                        raise ValueError(f'could not create transducer from {function}. Please look at it and try again.')
        return df
    
    def return_mapping_name(self, t_name_or_path, allow_composite = False) -> str:
        fn, ext = os.path.splitext(os.path.basename(t_name_or_path))
        fn_pieces = [x for x in fn.split('_')]
        fn_pieces = [x for x in fn_pieces if x != 'composite']
        if not allow_composite:
            return fn_pieces[-1]
        return f'{fn_pieces[-1]}_composite'

    def return_mapping_configs(self) -> object:
        '''Given an transducer name or path, create a config object that can be used to reconstruct the necessary JS function
        '''
        mapping_configs = {}
        for transducer in self.transducers_needed:
            for function in transducer['functions']:
                if not function.endswith('json') and not function.endswith('yml') and not function.endswith('yaml'):
                    pass
                fn, ext = os.path.splitext(os.path.basename(function))
                if fn.endswith('composite'):
                    composite_configs = self.create_composite_transducer_mapping(function)
                    mapping_configs = {**composite_configs, **mapping_configs}
                elif not function.startswith('lambda'):
                    name = self.return_mapping_name(function)
                    transducer = self.create_transducer_mapping(function)
                    mapping = [{x['in']: x['out']} for x in transducer.mapping()]
                    mapping_configs[name] = mapping
        return mapping_configs

    def return_js_template(self, t_name_or_path: str) -> str:
        '''Given a transducer, create JavaScript string of that transducer.

        Args: 
            :param str t_name_or_path: name of transducer or path to transducer.
        '''
        name = self.return_transducer_name(t_name_or_path)
        transducer_js_template = '''\n\nmtd.transducers["{name}"] = (function() {{
                                        var correspondences = {cors};
                                        var keys = {keys};
                                        var regex = new RegExp("(" + keys.join("|") + ")", "g");
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
            with open(t_name_or_path, encoding='utf8') as f:
                composite_transducers = json.load(f)
                return composite_js_template.format(name=name, composite_transducers=composite_transducers)
        else:
            path = self.return_transducer_path(t_name_or_path)
            if not path and t_name_or_path in self.available_transducers:
                mapping = Mapping(**self.available_transducers[t_name_or_path])
            elif path.endswith('yaml'):
                cors = Mapping(self.return_transducer_path(t_name_or_path))
            else:
                cors = Mapping(load_from_file(self.return_transducer_path(t_name_or_path)))
            keys = sorted([cor['in'] for cor in cors.mapping], key=len, reverse=True)
            # js_cors = [{k:v for k,v in cor} for cor in cors]
            js_cors = [{cor['in']: cor['out']} for cor in cors.mapping]
            js_cors = dict(ChainMap(*js_cors)) 
            return transducer_js_template.format(name=name, cors=js_cors, keys=keys)
        