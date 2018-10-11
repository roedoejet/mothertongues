from mtd.languages.suites import ALL_CONFIGS_SUITE
from mtd.builder import Builder
import pandas

co = ALL_CONFIGS_SUITE.config_objects[0]
b = Builder(co)
# print(b.parsed_data)
df = b.parsed_data[0]['data']
# print(b.sort(b.parsed_data[0])['data'].to_string())
print(b.transduce(b.parsed_data[0]))
# b.validate(b.parsed_data[0])
# df.to_csv('test.csv', encoding='utf-8', index=False)
# df.to_csv('test.tsv', sep='\t', encoding='utf-8', index=False)