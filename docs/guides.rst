.. _guides:

######
Guides
######

Here are some guides to help do some of the required tasks for creating a Mother Tongues Dictionary.

Sections
********

1. `Preparing your Mother Tongues Dictionary <#schema-validation>`_
2. `Building your Mother Tongues Dictionary <#building-a-dictionary>`_
3. `Adding/Editing the Mother Tongues UI <#adding-a-user-interface>`_
4. `Publishing your Mother Tongues Dictionary <#publishing-your-mother-tongues-dictionary>`_

There are a lot of steps here, but if you stick with it, it will dramatically reduce the amount of time needed to create and publish a dictionary app.
For a total summary and checklist to work through, please have a look at the `Checklist`_ section.

*****************
Schema validation
*****************

Below are some resources to help you create the two documents you need to create your dictionary.

You will need to create one `Language Configuration <#mtd-language-configuration-file>`_ file for your dictionary
and one `Resource Configuration <#mtd-data-resource-configuration-file>`_ file for *each* source of data.

MTD Language Configuration file
===============================
Every language must have a configuration file, and it must be validated against the following schema `here. <https://roedoejet.github.io/mothertongues/mtd/languages/config_schema.json>`__
Below is a minimal Language Configuration file labelled ``danish_config.json``.

.. code-block:: json

    {
        "config":{
            "L1": "Danish",
            "L2": "English"
        },
        "data": [
            {
                "manifest": "/Users/pinea/danish_csv_manifest.json",
                "resource": "/Users/pinea/danish.csv"
            }
        ]
    }

.. note ::
    The language configuration file must point to each data resource and where that data is located in order for the data to be included in the dictionary.

MTD Data Resource Configuration file
====================================
Every data resource must have a configuration, and it must be validating against the following schema `here. <https://roedoejet.github.io/mothertongues/mtd/languages/manifest_schema.json>`__
Below is a minimal Data Configuration file found at, for example, ``/Users/pinea/danish_csv_manifest.json`` on my machine. This must be referenced in the language configuration above.
This configuration file describes a CSV dictionary resource that only has two columns where the first column includes the word in the target language and the second column includes the 'definition' of that word or 'gloss' in the L2 language.

.. code-block:: json

    {
        "name": "2017 Spreadsheet",
        "sorting": "word",
        "targets": {
            "word": "0",
            "definition": "1"
        }
    }

In the future, I would like to have an online schema validation tool in the vein of `SwaggerHub <https://swagger.io/tools/swaggerhub/faster-api-design/>`_

Customized Alphabet
-------------------

Adding your custom alphabet allows your entries to be sorted based on that alphabet. In your Language Configuration file, set the ``alphabet`` key equal to an array containing the letters in your language's alphabet in alphabetical order:

.. code-block:: json

    { 
        "config": {
            "L1": "...",
            "L2": "...",   
            "alphabet": ["a", "b", "c"]
        }
    }

Optional Information
--------------------

To add information that can be optionally displayed in the UI, you must point to it in your Data Resource configuration file. For example, if you wanted to add "Part of Speech" information that could be displayed optionally and that was present in column "F" of an Excel spreadsheet and etymological information that was present in columng "G", you would add the following to your Data Resource configuration file:

.. code-block:: json

    {
        "targets": {
            "optional": [
                    { 
                        "Part of Speech": "F"
                    }
                ]
        }
    }


Images & Audio
--------------

To add images and audio, you must have the filenames of your files in your dictionary data resource. Then, change your Data Resource configuration files to point to the location of the filenames.

For images, just add a target for the ``img`` key. Take the following example for an Excel spreadsheet with image filenames in column "D":

.. code-block:: json

    {
        "targets": {
            "img": "D"
        }
    }

For audio, you minimally have to add the filename, but you can also add a speaker name. You can also choose between ``audio`` for audio files in the target language, ``definition_audio`` for audio files of the definition, ``example_sentence_audio`` for audio files corresponding to an example sentence and ``example_sentence_definition_audio`` for audio files corresponding to the definitions of example sentences.

Take the following example for an Excel spreadsheet with audio in columns "B" & "C" and example sentence audio in column "D". The speaker names for audio files are in columns "E", "F", and "G" respectively.

.. code-block:: json

    {
        "targets": {
            "audio": [
                { 
                    "filename": "B",
                    "speaker": "E" 
                },
                { 
                    "filename": "C",
                    "speaker": "F" 
                } 
            ],
            "example_sentence_audio": [
                [
                    {
                        "filename": "D",
                        "speaker": "G"
                    }
                ]
            ]
        }

    }
 

Semantic Categories
-------------------

To add semantic categories to your entries, you can make use of both the ``theme`` and ``secondary_theme`` keys in the Data Resource configuration file. Using these will allow your entries to be sorted based on semantic categories like "colours", or "animals" etc.

For example, suppose you have an Excel spreadsheet where column "A" has main categories like "Animals", and column "B" has sub-categories like "- Fish", and "- Reptiles". Your Data Resource congfiguration file would have to add the following targets:

.. code-block:: json

    {
        "targets": {
            "theme": "A",
            "secondary_theme": "B"
        }
    }



Approximate Search
------------------

This is a guide for how to customize the approximate search algorithm used by MTD. See `this paper <http://roedoejet.github.io/cv/static/cv/pdfs/computel.pdf>`_ for further discussion.

Approximate search isn't just a *nice* feature for dictionaries of endangered languages - it's usually a requirement. 
Often, it's learners of languages that want to use dictionaries the most, and if your dictionary doesn't allow approximate search, beginners might have a hard time accessing entries in the dictionary.

*********************
Building a Dictionary
*********************

Once you have prepared a Language Configuration and Resource Configuration files for each source of data, you need to build the dictionary files, which contains the data for your dictionary in machine readable form.
The following will guide you through the process of building your dictionary.

Basic
=====

There is a basic Google Colaboratory tutorial for how to make a Mother Tongues Dictionary using a Google sheet available `here <https://colab.research.google.com/drive/1Z2Isg5qAFdINpxnTnKPpa1GDOpTfSSFg>`_. The tutorial is from a workshop taught at `ICLDC 6 <https://icldc6.weebly.com/>`_ and also shows how to deploy using GitHub Pages.

Advanced
========
This guide assumes that you have worked through the steps to `prepare your Mother Tongues Dictionary <#schema-validation>`_ and have all the configuration files needed. It also assumes you have a directory structure similar to the one `described in the style guide <#file-structure>`_.

First, run the ``mtd prepare`` command. You will need to point this command at the directory with your configuration files, either by declaring the directory path as an argument, as in

``mtd prepare <directory path>``

or you can run the following command from within the directory:

``mtd prepare .``

If successful, you will see the message:

.. parsed-literal::

  Successfully built static files \for the 
  following dictionaries: <dictionary>. 
  You may now run the app.

Next, you can run the app using ``mtd run``. This will run the app with the default Mother Tongues mobile UI. To use a different UI, see `Adding a User Interface`_. To build and publish the app on Google Play or the Apple App Store, see `Publishing your Mother Tongues Dictionary`_.

***********************
Adding a User Interface
***********************

This is an advanced guide for adding your dictionary files to a User Interface.

Export
======
First, you need to export the JavaScript files required by any MTD UI. 

1. Change directories to your `MTD folder <#file-structure>`_. 
2. Then, build the dictionary using the ``mtd export`` command to create necessary JavaScript files. For example, given a dictionary named ``abc``, a Language configuration file named ``abc_config.json``, and a desired output folder ``output``, run the following:

``mtd export abc_config.json js output``

Because we are in our MTD folder, we can just run ``mtd export . js .``

You will see various messages displayed, potentially including info, warnings, and errors, which are ordered in terms of severity. If there are only info messages, the command executed successfully, and the info might advise you on how to improve your configuration inputs. If there are warnings (which may be in addition to info messages), the command executed but there might be serious issues with the output files. If there are errors (which may be in addition to info messages and warnings), the command did not execute successfully.

Checking your output folder, you should see two files: ``config-abc.js`` and ``dict_cached-abc.js``. These files contain the data for your dictionary.

Once you have built your dictionary files, you can add them to a dictionary UI such as an `MTD UI <https://github.com/roedoejet/mothertongues-ui>`_. 
As a simple example, you can make a functioning dictionary website by downloading the mothertongues-UI repository and extracting the files to your computer. 
Once complete, copy the two files outputed by the ``mtd export`` function to the following location in your Mothertongues-UI:

``mothertongues-UI-master/src/assets/js``

.. note::
    Default files named ``config.js`` and dict_cached.js`` should already exist. You must overwrite these files with the ones you have just exported.
    Note that these files already exist, and contain a set of sample entries. You should overwrite these files with your dictionary data files.

If you are using the default mobile MTD UI, you can then install all dependencies (``npm install``) and run the app (``ionic serve``).

*****************************************
Publishing your Mother Tongues Dictionary
*****************************************

The simplest way to publish your app is on the web. This guide is for publishing the more advanced iOS and Android apps, which, honestly, is a pain. This isn't specific to Mother Tongues though - this is just the normal process for publishing apps.

To get started, you'll need to have `prepared <#schema-validation>`_,  `built <#building-a-dictionary>`_ and made any `adjustments <#adding-a-user-interface>`_ to the UI of your dictionary.

Then, you can add the cordova platforms:

``ionic cordova platform add ios``
``ionic cordova platform add android``

Then, move your ``icon.png`` and ``splash.png`` files to your ``~/mothertongues-UI/resources`` directory.

Then, generate all of the necessary icon and splash image sizes: ``ionic cordova resources``.

Then, edit your `~/mothertongues-UI/config.xml` file to have your App name and version/build version.

Android
=======

Build and sign your android app:

``ionic cordova build android --release``

Your app will then be built at ``~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk``.

Then, sign your app, ``jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "your.keystore" "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release//app-release-unsigned.apk" alias_name``

Then, zip-align your app, ``zipalign -v 4 "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/release.apk"``

Then, you can `sign up for a Google Play Developer Account <https://support.google.com/googleplay/android-developer/answer/6112435?hl=en>`_.

Then, create a new app and upload your ``~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/release.apk`` file.

.. note ::
    Because we use the Cordova Media plugin to play local audio files, some default permissions are added that we don't actually use, 
    including 'android.permission.RECORD_AUDIO' and 'android.permission.READ_PHONE_STATE' which have some pretty alarming messages to users.
    To disable these, remove them from ``~/mothertongues-UI/platforms/android/android.json`` and ``~/mothertongues-UI/platforms/android/app/src/main/AndroidManifest.xml`` before running ``ionic cordova build android --release``

iOS
===

Build your iOS app:

``ionic cordova build ios --release``

Then you can use Xcode to sign and upload your app to the App Store. Before doing this, you must `sign up <https://developer.apple.com/programs/enroll/>`_ and create an app in iTunes Connect, and you must create a Distribution Certificate for your app.

.. note ::
    I recommend adding ``<key>ITSAppUsesNonExemptEncryption</key><false/>`` to your Info.plist file 
    and `disabling push notifications <https://stackoverflow.com/questions/26168713/cordova-app-that-doesnt-use-push-notifications-missing-push-notification-enti>`_ 
    You might also need to select the `legacy build <https://stackoverflow.com/questions/30972472/error-itms-90174-missing-provisioning-profile-ios-apps-must-contain-a-provis>`_ option

.. note ::
    You cannot have any non-ASCII characters in your asset filenames, otherwise you will get a cryptic message from Apple saying that your app certificate is not valid.
    
***********
Style Guide
***********

File structure
==============

It is recommended that you keep the following structure for your dictionary.

.. parsed-literal::

    mtd-<your-language-name>
     |
     \|--- alphabet.json
     |
     \|--- config
     |     \|--- config.json
     |     \|--- data1_manifest.json
     |     \|--- data2_manifest.json
     |
     \|--- data
     |    \|--- data1.json
     |    \|--- data2.csv
     |
     \|--- resources
     |    \|--- icon.png
     |    \|--- splash.png
     |
     \|--- transducers
            \|--- <your-language-name>\_approx.csv
            \|--- <your-language-name>\_norm.csv
            \|--- <your-language-name>\_composite.json

*********
Checklist
*********

Here is a basic checklist to help you from start to finish.

.. |check| raw:: html

    <input checked=""  type="checkbox">

.. |check_| raw:: html

    <input checked=""  disabled="" type="checkbox">

.. |uncheck| raw:: html

    <input type="checkbox">

.. |uncheck_| raw:: html

    <input disabled="" type="checkbox">

- Collect, and clean data |uncheck|
- Ensure you have proper permission to use data! |uncheck|
- Install python, node, npm, and git |uncheck|
- Create `MTD folder <#file-structure>`_ |uncheck|
- `Prepare <#schema-validation>`_ your data  |uncheck|
- `Compile and export <#export>`_ your MTD JavaScript files  |uncheck|
- `Clone/download the Mother Tongues UI`  |uncheck|
- `Move <#export>`_ your JavaScript files  |uncheck|
- Move your icon and splash resources  |uncheck|
- Edit config.xml  |uncheck|
- NPM install dependencies and `add platforms <#publishing-your-mother-tongues-dictionary>`_  |uncheck|
- Remove unnecessary permissions  |uncheck|
- Build `Android`_  |uncheck|
- Sign android  |uncheck|
- Build `iOS`_  |uncheck|
- Edit Xcode as necessary  |uncheck|
- Make screenshots  |uncheck|