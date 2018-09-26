from mtd.languages.suites import ALL_CONFIGS_SUITE
from mtd.builder import Builder

co = ALL_CONFIGS_SUITE.config_objects[0]
b = Builder(co)
print(b.parsed_data[0])
print(b.parsed_data[0]['data'].to_string())
print(b.sort(b.parsed_data[0]).to_string())