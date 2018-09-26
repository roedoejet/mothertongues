from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter

class Builder():
    def __init__(self, config_object):
        self.config = config_object
        self.parsed_data = []
        for d in config_object['data']:
            self.parsed_data.append(parse(d['manifest_path'], d['resource_path']))
        
    def sort(self, data_obj, order=list(ascii_lowercase)):
        arbsorter = ArbSorter(order)
        sort_key = data_obj['manifest']['sorting']
        df = data_obj['data']
        return arbsorter.add_to_data_frame(df, sort_key)

    def transduce(self, data_obj):
        pass  
    