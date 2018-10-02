from mtd.exceptions import TransducerSourceNotFoundError
from mtd.tests import logger

class Transducer():
    def __init__(self, transducers):
        self.transducers = transducers

    def createTransducerFunction(self, fn):
        """ TODO
        """
        return fn

    def apply_to_data_frame(self, df):
        for transducer in self.transducers:
            source = transducer['source']
            if not source in df:
                e = TransducerSourceNotFoundError(source)
                logger.error(e)
                raise e
            if "lambda" in transducer['function']:
                df[transducer['target']] = df[source].apply(eval(transducer['function']))
            else:
                fn = self.createTransducerFunction(transducer['function'])
                df[transducer['target']] = df[source].apply(fn)
        return df