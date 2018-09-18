class BaseParser():
    def __init__(self):
        pass
    
    def return_list(self, d):
        if isinstance(d, list):
            return d
        elif isinstance(d, str):
            return [d]
        else:
            print("should go in log, not string or list")