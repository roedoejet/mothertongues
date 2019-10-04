from setuptools import setup, find_packages
import mtd
import datetime as dt
import os

build_no = dt.datetime.today().strftime('%Y%m%d')
version_path = os.path.join(os.path.dirname(mtd.__file__), 'version.py')
VERSION = mtd.VERSION + "." + build_no
this_directory = os.path.abspath(os.path.dirname(__file__))

with open(version_path, 'w') as f:
    f.write(f'__version__ = "{VERSION}"')

with open(os.path.join(this_directory, 'requirements.txt')) as f:
    REQS = f.read().splitlines()

with open(os.path.join(this_directory, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    author="Aidan Pine",
    author_email="info@mothertongues.org",
    name='mothertongues',
    version=VERSION,
    license="AGPL-3.0",
    url="https://github.com/roedoejet/mothertongues",
    description='Mother Tongues Dictionaries dictionary creation tool',
    long_description=long_description,
    long_description_content_type='text/markdown',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=REQS,
    python_requires='>=3.6.2',
    entry_points='''
        [console_scripts]
        mtd=mtd.cli:cli
        mothertongues=mtd.cli:cli
    '''
)