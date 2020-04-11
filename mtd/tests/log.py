import coloredlogs, logging
import time
import os

FIELD_STYLES = dict(
    levelname=dict(color='green'),
)

FORMATTER = logging.Formatter('%(levelname)s - %(message)s')
      
def setup_logger(name):
    logging.basicConfig(
        level=logging.INFO
        # filename="logger.log"
        )
    logger = logging.getLogger(name)
    coloredlogs.install(level='INFO', fmt='%(levelname)s - %(message)s', logger=logger, field_styles=FIELD_STYLES)
    return logger