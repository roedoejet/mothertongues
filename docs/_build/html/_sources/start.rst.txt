.. start:

Getting Started
================

Mother Tongues Dictionaries (MTD) is a tool developed by Aidan Pine to quickly develop dictionaries, with a particular focus on language revitalization of Indigenous languages. For a primer in understanding
some of the motivations behind language revitalization, see `this chapter <http://oxfordre.com/linguistics/view/10.1093/acrefore/9780199384655.001.0001/acrefore-9780199384655-e-8>`_ of the Oxford Research Encyclopedia of Linguistics.

MTD is unique in a number of ways:

1. Approximate search comes out of the box. Approximate search isn't just a *nice* feature for dictionaries of endangered languages - it's usually a requirement. Often, it's learners of languages that want to use dictionaries the most, and if your dictionary doesn't allow approximate search, beginners might have a hard time accessing entries in the dictionary. See `this paper <http://roedoejet.github.io/cv/static/cv/pdfs/computel.pdf>`_ for further discussion.
2. Free & open source. MTD is licensed by AGPL 3.0.
3. Multiple platforms. MTD has a number of front ends that it is compatible with, including for the Web, iOS and Android

You can think of MTD as two distinct parts. The **first part** is this tool documented here, which is essentially a text processing tool. It is able to take data for one or more languages from multiple different
sources (spreadsheets, websites, plain text files etc...) and combine the data, sort it, index it, find duplicates, and then export it to a number of different formats. The **second part** is a front-end component. Each
front end tool must accept two files, a "config.js" file which has information about the dictionary including an alphabet to sort by and the name of the language etc... and a 'data_cached.js" file which contains all the lexical (word related)
data for the dictionary.

To make a dictionary from your data, you need to do the following three things:

1. Install mothertongues, see :ref:`installation`.
2. Write a valid Mother Tongues Language configuration file. See :ref:`validation`
3. Write valid Mother Tongues data resource configuration files. See, :ref:`validation`

Then, build either with the command line:

.. code-block:: bash

    mothertongues prepare <path_to_language_configuration>
    mothertongues run

Then open your browser at ``localhost:5000``

or build with Python:

.. code-block:: python

    from mtd import create_dictionary
    from mtd.app import app

    dictionary = create_dictionary(<path_to_language_configuration>)
    app.run()


Finally, export your dictionaries to JavaScript to be used with an MTD frontend (See :ref:`web` or :ref:`mobile`) using either the command line:

.. code-block:: bash

    mothertongues export <path_to_language_configuration> js <output_dir>

Or Python:

.. code-block:: python

    config_js = dictionary.return_formatted_config(form='js')
    
    with open('config.js', 'w', encoding='utf8') as f:
        f.write(config_js)

    dict_cached_js = dictionary.return_formatted_data(form='js')
    
    with open('dict_cached.js', 'w', encoding='utf8') as f:
        f.write(dict_cached_js)

Or freeze your Dictionaries as a static site:

.. code-block:: bash

    mothertongues export <path_to_language_configuration> web <output_dir>

.. note:: API will not work as static site.




