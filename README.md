# Mother Tongues Dictionaries (MTD)

*This repo is under construction and could change drastically in the coming months with breaking changes.*

[![Coverage Status](https://coveralls.io/repos/github/roedoejet/mothertongues/badge.svg?branch=master)](https://coveralls.io/github/roedoejet/mothertongues?branch=master)
[![Build Status](https://travis-ci.org/roedoejet/mothertongues.svg?branch=master)](https://travis-ci.org/roedoejet/mothertongues)
[![Documentation Status](https://readthedocs.org/projects/mother-tongues-dictionaries/badge/?version=latest)](https://mother-tongues-dictionaries.readthedocs.io/en/latest/?badge=latest)
[![PyPI package](https://img.shields.io/pypi/v/mothertongues.svg)](https://pypi.org/project/mothertongues/)
[![license](https://img.shields.io/github/license/roedoejet/mothertongues.svg)](LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

MTD is the first of two open-source tools that allow language communities and developers to quickly and inexpensively make their dictionary data digitally accessible. MTD is a tool that parses and prepares your data for being used with an [MTD UI](https://github.com/roedoejet/mothertongues-ui).

Please visit the [website](https://www.mothertongues.org) or [docs](https://mother-tongues-dictionaries.readthedocs.io/en/latest/) for more information.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Background

This project started as just a single dictionary for Gitxsan - a language spoken in Northern British Columbia, but it became quickly apparent that many communities also had the same problem. That is, they had some dictionary data but all of the options for sharing that data online were prohibitively expensive. MTD aims to make it easier to create online digital dictionary resources.

**Note** - Just because you _can_ make an online dictionary does _not_ mean you _should_. Before making a dictionary, you must have clear consent from the language community in order to publish a dictionary. For some background on why this is important, please read sections 1 and 2.1 [here](http://oxfordre.com/linguistics/view/10.1093/acrefore/9780199384655.001.0001/acrefore-9780199384655-e-8)

## Install

It is recommended to install mothertongues using pip. The package name is `mothertongues`, but it is imported as `mtd` and the CLI can be run using either `mothertongues` or `mtd`.

```
pip install mothertongues
```

## Usage

In order to create a Mother Tongues Dictionary you will need at least two things:

- A configuration file for you language/dictionary
- A configuration file for each source of data

You can find out more about how to create these files against the MTD configuration schema by visiting the [docs](https://mother-tongues-dictionaries.readthedocs.io/en/latest/)

Once you have those files, you can either create a dictionary programatically or using the command line interface.

### Using Python directly

```python
from mtd import create_dictionary

dictionary = create_dictionary(PATH_TO_LANGUAGE_CONFIG)

# write a file containing configuration information
config_js = dictionary.return_formatted_config(form='js')
with open('config.js', 'w', encoding='utf8') as f:
    f.write(config_js)

# write a file containing lexical data
dict_cached_js = dictionary.return_formatted_data(form='js')
with open('dict_cached.js', 'w', encoding='utf8') as f:
    f.write(dict_cached_js)
```

The two files that are then created above (`config.js` and `dict_cached.js`) can be dropped into any MTD-UI to build a dictionary.

### Using the CLI

You can either export your dictionary as a static site:

```
mtd export <PATH_TO_LANGUAGE_CONFIG> web <OUTPUT_DIR>
```

Or, you can build it first:

```
mtd prepare <PATH_TO_LANGUAGE_CONFIG>
```

And then serve it locally:

```
mtd run
```

## Contributing

PRs accepted. Help writing and clarifying documentation is also very welcome.

## Acknowledgements

Thank you to both Patrick Littell & Mark Turin for their contributions, guidance and support as well as institutional support from the [First Peoples' Cultural Council](http://www.fpcc.ca/) and SSHRC Insight Grant 435-2016-1694, ‘Enhancing Lexical Resources for BC First Nations Languages’.

## License

[AGPL-3 © Aidan Pine.](LICENSE)
