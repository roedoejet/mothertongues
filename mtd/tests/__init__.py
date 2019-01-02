from . import log
import logging, coloredlogs

class ListHandler(logging.Handler):
    def __init__(self, log_list):
        logging.Handler.__init__(self)
        logging.basicConfig(format='%(levelname)s - %(message)s')
        self.log_list = log_list
        self.level_dict = {0: "Not Set", 10: "Debug", 20: "Info", 30: "Warning", 40: "Error", 50: "Critical"}

    def emit(self, record):
        self.log_list.append({'level': self.level_dict[record.levelno], 'msg': record.msg, 'levelno': record.levelno})


logger = log.setup_logger('root')
