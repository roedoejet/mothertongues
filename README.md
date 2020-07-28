# Mother Tongues Dictionaries (MTD)

[![Coverage Status](https://coveralls.io/repos/github/roedoejet/mothertongues/badge.svg?branch=master)](https://coveralls.io/github/roedoejet/mothertongues?branch=master)
[![Build Status](https://travis-ci.org/roedoejet/mothertongues.svg?branch=master)](https://travis-ci.org/roedoejet/mothertongues)
[![Documentation Status](https://img.shields.io/badge/-docs-blue)](https://docs.mothertongues.org)
[![PyPI package](https://img.shields.io/pypi/v/mothertongues.svg)](https://pypi.org/project/mothertongues/)
[![license](https://img.shields.io/github/license/roedoejet/mothertongues.svg)](LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

MTD is the first of two open-source tools that allow language communities and developers to quickly and inexpensively make their dictionary data digitally accessible. MTD is a tool that parses and prepares your data for being used with an MTD User Interface. Currently [mobile](https://github.com/roedoejet/mothertongues-ui) and [web](https://github.com/MotherTongues/mothertongues-UI-Web) are supported.

Please visit the [website](https://www.mothertongues.org) or [docs](https://docs.mothertongues.org) for more information.

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

You can find out more about how to create these files against the MTD configuration schema by visiting the [guides](https://docs.mothertongues.org/docs/mtd-guides)

Once you have those files, you can either create a dictionary using the command line interface.

The basic workflow for creating a dictionary is as follows:

1. Fork and clone the [mtd-starter](https://github.com/roedoejet/mtd-starter)
2. [Edit and prepare](https://docs.mothertongues.org/docs/mtd-guides-prepare) the repo using your own data
3. [Export your data](https://docs.mothertongues.org/docs/mtd-guides-ui#exporting-your-data) to a format readable by the Mother Tongues User Interfaces
4. Chose an interface, either [mobile](https://github.com/roedoejet/mothertongues-ui) or [web](https://github.com/MotherTongues/mothertongues-UI-Web)
5. Add your exported data (`config.js` and `dict_cached.js`) from step 3 and then [publish](https://docs.mothertongues.org/docs/mtd-guides-publishing) your dictionary! 🎉


## Contributing

If something is not working, or you'd like to see another feature added, feel free to dive in! [Open an issue](https://github.com/roedoejet/mothertongues/issues/new) or submit PRs. Help writing and clarifying documentation is also very welcome.

This repo follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## Acknowledgements

Thank you to both Patrick Littell & Mark Turin for their contributions, guidance and support as well as institutional support from the [First Peoples' Cultural Council](http://www.fpcc.ca/) and SSHRC Insight Grant 435-2016-1694, ‘Enhancing Lexical Resources for BC First Nations Languages’.

Thank you to all other contributors for support with improving MotherTongues, finding bugs and writing documentation.

### Contributors

This project exists thanks to all the people who contribute. 

[@littell](https://github.com/littell).
[@markturin](https://github.com/markturin).
[@eddieantonio](https://github.com/eddieantonio).
[@kavonjon](https://github.com/kavonjon).

## License

[AGPL-3 © Aidan Pine.](LICENSE)
