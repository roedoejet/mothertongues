from mtd.exceptions import TransducerSourceNotFoundError

class Transducer():
    def __init__(self, transducers):
        self.transducers = transducers

    def createTransducerFunction(self, fn):
        """ TODO
        """
        return fn

    def apply_to_data_frame(self, df):
        for transducer in self.transducers:
            try:
                if "lambda" in transducer['function']:
                    df[transducer['target']] = df[transducer['source']].apply(eval(transducer['function']))
                else:
                    fn = self.createTransducerFunction(transducer['function'])
                    df[transducer['target']] = df[transducer['source']].apply(fn)
            except KeyError:
                raise TransducerSourceNotFoundError(f"'{transducer['source']}' does not exist in data frame. Please edit your manifest.")
        return df