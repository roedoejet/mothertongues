.. start:

Getting Started
================

To make a dictionary, you need to do the following three things:

1. Write a valid Mother Tongues Language configuration file. This is a JSON file that is documented **here**
2. Write valid Mother Tongues data configuration files. This is also a JSON file that is documented **here**
3. Install mothertongues
4. Build your dictionary.

Build either with the command line:

.. code-block:: bash

    mothertongues prepare PATH_TO_LANGUAGE_CONFIGURATION
    mothertongues run

Then open your browser at ``localhost:5000``

or build with Python:

.. code-block:: python

    from mtd import create_dictionary
    from mtd.app import app

    dictionary = create_dictionary({PATH_TO_LANGUAGE_CONFIGURATION})
    app.run()


