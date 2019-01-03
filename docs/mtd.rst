.. mtd:

Python Package
===============

Dictionary
__________

The Dictionary is the most important class in MTD. It is the object that contains all your dictionary data. It must be initialized by a valid MTD language configuration file. See :ref:`validation`

.. autoclass:: mtd.dictionary.Dictionary

.. autofunction:: mtd.create_dictionary

.. autofunction:: mtd.dictionary.Dictionary.export_raw_data

Language Suite
______________

A Language Suite is a useful class for creating a single website or API from multiple dictionaries. It is initialzed with one or more valid MTD language configuration files. See :ref:`validation`

.. autofunction:: mtd.create_suite

.. autoclass:: mtd.languages.suites.LanguageSuite

Schemas
_______

You must create two types of json files for each Dictionary. First, a Language configuration file. You only need one of these for each language. Second, one or more data configuration files. You need one for each source of data. For instance, if you are making a Dictionary from two different spreadsheets, you must write two different data configuration files and include them in your Language configuration file.

Language Configuration file
----------------------------

.. autoclass:: mtd.languages.LanguageConfig

Data Configuration file
------------------------

.. autoclass:: mtd.parsers.ResourceManifest

Parser 
_______

MTD is able to parse data from a variety of different formats. Custom parsers can easily be created by inheriting the BaseParser class.

.. autoclass:: mtd.parsers.utils.BaseParser

.. autofunction:: mtd.parsers.parse

Sorter
_______

MTD sorts based on arbitrary alphabets defined in your Language Configuration file. 

.. autoclass:: mtd.processors.sorter.ArbSorter

Transducer
__________

MTD performs arbitrary transductions on data defined in each Data Configuration file.

.. autoclass:: mtd.processors.transducer.Transducer

Validation
__________

MTD checks to make sure each data source has values for Word and Definition for every entry. Duplicates are also flagged.

..autoclass:: mtd.processors.validator.DfValidator