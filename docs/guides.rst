.. _guides:

Guides
======

Here are some guides to help do some of the basic tasks required for creating a Mother Tongues Dictionary.

Schema validation
-----------------

Below are some resources to help you create the two documents you need to create your dictionary.

You will need to create one Language Configuration file for your dictionary
and one Resource Manifest file for *each* source of data.

1. MTD Language Configuration file
    Every language must have a configuration file, and it must be validated against the following schema `here <https://roedoejet.github.io/mothertongues/mtd/languages/config_schema.json>`_


2. MTD Resource Manifest file
    Every data resource must have a manifest, and it must be validating against the following schema `here <https://roedoejet.github.io/mothertongues/mtd/languages/manifest_schema.json>`_

In the future, I would like to have an online schema validation tool in the vein of `SwaggerHub <https://swagger.io/tools/swaggerhub/faster-api-design/>`_

Approximate Search
------------------

This is a guide for how to customize the approximate search algorithm used by MTD. See `this paper <http://roedoejet.github.io/cv/static/cv/pdfs/computel.pdf>`_ for further discussion.

Approximate search isn't just a *nice* feature for dictionaries of endangered languages - it's usually a requirement. 
Often, it's learners of languages that want to use dictionaries the most, and if your dictionary doesn't allow approximate search, beginners might have a hard time accessing entries in the dictionary.

*More info soon*