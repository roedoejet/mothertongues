from mtd.parsers import parse
from string import ascii_lowercase
from mtd.processors.sorter import ArbSorter
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

    def createTransducerFunction(self, fn):
        """ TODO
        """
        return fn

    def transduce(self, data_obj):
        transducers = []
        if "transducers" in data_obj['manifest']:
            transducers = data_obj['manifest']['transducers']
        df = data_obj['data']
        for transducer in transducers:
            try:
                if "lambda" in transducer['function']:
                    df[transducer['target']] = df[transducer['source']].apply(eval(transducer['function']))
                else:
                    fn = self.createTransducerFunction(transducer['function'])
                    df[transducer['target']] = df[transducer['source']].apply(fn)
            except KeyError:
                raise TransducerSourceNotFoundError(f"'{transducer['source']}' does not exist in data frame. Please edit your manifest.")
        data_obj['data'] = df
        return data_obj
    