from mtd.languages.suites import ALL_CONFIGS_SUITE
from mtd.builder import Builder
from mtd.output_templates import MTDConfigTemplate
import pandas as pd

co = ALL_CONFIGS_SUITE.config_objects[0]
b = Builder(co)
# print(b.parsed_data)
df = b.parsed_data[0]['data']
# print(b.sort(b.parsed_data[0])['data'].to_string())
print(b.transduce(b.parsed_data[0]))
df2 = b.transduce(b.parsed_data[0])['data']

ctemp = MTDConfigTemplate(b.config)
