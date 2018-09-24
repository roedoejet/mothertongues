from mtd.parsers import parse
class Builder():
    def __init__(self, config_object):
        self.parsed_data = []
        for d in config_object['data']:
            self.parsed_data.append(parse(d['manifest_path'], d['resource_path']))
      
            