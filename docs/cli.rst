.. cli:

Command line interface
======================

Once ``mothertongues`` is installed, you can run the following commands by calling either ``mtd`` or ``mothertongues``
In addition, you may run the ``mothertongues`` Flask API/Web application with the ``run`` command. Enter ``mtd --help`` for help.

-available
-------------

Use this to see what languages are available at a particular path. For example, ``mtd available .``

.. autofunction:: mtd.cli.available

-prepare
-----------

Use this to prepare files to build website or API. You can point it either to a file or directory
For example, ``mtd prepare your_language_config_file.json`` or ``mtd_prepare .`` 

.. autofunction:: mtd.cli.prepare


-export
----------

Use this to export dictionary or data to a particular format.

For example, ``mtd export your_language_config_file.json raw-xlsx output.xlsx`` would export the dictionary defined in a file called your_language_config_file.json as an xlsx file called output.xlsx.

``mtd export your_language_config_file.json web output_dir`` would export the dictionary defined in your_language_config_file.json to a directory called output_dir.

- Export types prefixed with raw just export raw data from the language resources.
- Exporting to js/json will create both a config and dict_cached file needed for MTD front ends.
- Exporting to web will export a frozen website version 

.. note:: API will not work as static site.


Exporting to GitHub Pages
^^^^^^^^^^^^^^^^^^^^^^^^^

You can export the files necessary for Mother Tongues Dictionaries directly to GitHub. If you are using
`GitHub pages <https://pages.github.com/>`_ , you can host your Mother Tongues Dictionary for free!

Before you begin, you will need a `Personal Access Token <https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/>`_ for GitHub. Be careful with these, treat them like passwords.

Once you have your token, make a yml file with the following data::

  token: <your_token_here>
  user: <your_github_username>
  repo: <your_repo_name>
  path: <path_to_write_files>

Then add the file to your language configuration file. See, :ref:`validation`

Finally run `mtd export germanic_languages.txt github`

.. autofunction:: mtd.cli.export

