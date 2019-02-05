.. _mtd-UI:

MTD UI
==============================

A Mother Tongues Dictionary User Interface is what you need to actually *visualize* the data that MTD exports. 
MTD comes bundled with a template that will draw the most recent MTD-UI from the `MTD-UI repo <https://github.com/roedoejet/mothertongues-UI>`_


REST API
--------

By default, when a dictionary is created using the CLI (See, :ref:`cli` ), a basic RESTful API from your specified dictionaries.
This allows you to expose your dictionary data and configuration files with a RESTful API.

.. autoclass:: mtd.resources.Languages

.. autofunction:: mtd.resources.Languages.get