class BaseParser():
    """This class contains common methods that are used
    between many of the format specific parsers
    """
    def __init__(self):
        pass

    def fill_entry_template(self, entry_template, entry, convert_function):
        new_lemma = {}
        for k, v in entry_template.items():
            if isinstance(v, dict):
                new_lemma[k] = self.fill_entry_template(v, entry, convert_function)
            elif isinstance(v, list):
                new_v = list()
                for x in v:
                    new_v.append(self.fill_entry_template(x, entry, convert_function))
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = convert_function(entry, v)
                except:
                    breakpoint()
        return new_lemma

    def return_list(self, d):
        if isinstance(d, list):
            return d
        elif isinstance(d, str):
            return [d]
        else:
            print("should go in log, not string or list")