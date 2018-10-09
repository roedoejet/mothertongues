
class MTDConfigTemplate:
    def __init__(self):
        self.config_template = '''
                                var config = {{
                                                "L1": {{
                                                    "name": "{l1_name}",
                                                    "underlying": "",
                                                    "compare": "{l1_compare}",
                                                    "lettersInLanguage" : {letters}
                                                }},
                                                "L2": {{
                                                    "name": "{l2_name}",
                                                    "compare": ""
                                                }}
                                            }};
                                ''' 
  
class MTDTransducerTemplate:
    def __init__(self, name, cors=[], composite_transducers=[]):
        self.name = name
        self.cors = cors
        self.keys = sorted([cor['from'] for cor in self.cors], key=len, reverse=True)
        self.composite_transducers = composite_transducers
        self.transducer_template = '''\n\nmtd.transducers["{name}"] = (function() {{
                                        var correspondences = {cors};
                                        var keys = {keys};
                                        var regex = new RegExp("(" + keys.join('|') + ")", 'g');
                                        return function(str) {{
                                            return str.replace(regex, function(a,b) {{
                                                return correspondences[a];
                                            }});
                                        }};
                                    }})();'''

        self.composite_template = u'''\n\nmtd.transducers["{name}"] = (function(){{
                                        var orths = {composite_transducers};
                                        return function(str) {{
                                            for (var i = 0; i < orths.length; i++) {{
                                                transducer = mtd.transducers[orths[i]];
                                                str = transducer(str);
                                            }}
                                            return str;
                                        }};
                                    }})();'''

    def createTransducer(self):
        if (self.cors and self.keys and not self.composite_transducers):
            return self.transducer_template.format(name=self.name, cors=self.cors, keys=self.keys)
        elif (self.composite_transducers and not self.cors and not self.keys):
            return self.composite_transducers.format(name=self.name, composite_transducers=self.composite_transducers)
        else:
            print('should raise some sort of malformed transducer error')
        
  
# config_filled_out = config_template.format(l1_name=your_language_name, l1_compare=your_language_name.lower() + "_compare", letters=alphabet)

# Create the correspondences to be formatted into the transducer template
# transducer_dicts = {cor['from']: cor['to'] for cor in df_cors}
# keys = [cor['from'] for cor in df_cors]
# sorted_keys = sorted(keys, key=len, reverse=True)

# formatted_transducer = transducer_template.format(name=your_language_name.lower(), cors=transducer_dicts, keys=sorted_keys)
