from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter
from mtd.processors.transducer import Transducer
from mtd.processors.validator import DfValidator
from mtd.exceptions import TransducerSourceNotFoundError

class Builder():
    def __init__(self, config_object):
        self.config = config_object
        self.parsed_data = []
        for d in config_object['data']:
            self.parsed_data.append(parse(d['manifest_path'], d['resource_path']))
        
    def sort(self, data_obj, order=list(ascii_lowercase)):
        """Return sorted data

        :param dict data_obj: each 'data object' has two keys, 'manifest' and 'data' dataframe
        :param list order: an order to sort by, default is ascii_lowercase
        """
        arbsorter = ArbSorter(order)
        sort_key = data_obj['manifest']['sorting']
        data_obj['data'] = arbsorter.add_to_data_frame(data_obj['data'], sort_key)
        return data_obj

    def transduce(self, data_obj):
        df = data_obj['data']
        transducers = []
        if "transducers" in data_obj['manifest']:
            transducers = data_obj['manifest']['transducers']
        transducer = Transducer(transducers)
        data_obj['data'] = transducer.apply_to_data_frame(df)
        return data_obj

    def validate(self, data_obj):
        df = data_obj['data']
        dfvalidator = DfValidator(df)
        return dfvalidator.check_not_null()
    