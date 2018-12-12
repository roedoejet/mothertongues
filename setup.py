from setuptools import setup, find_packages
import mtd
import datetime as dt
import os

build_no = dt.datetime.today().strftime('%Y%m%d')
version_path = os.path.join(os.path.dirname(mtd.__file__), 'version.py')
VERSION = mtd.VERSION + "." + build_no

with open(version_path, 'w') as f:
    f.write(f'__version__ = "{VERSION}"')

with open('requirements.txt') as f:
    REQS = f.read().splitlines()

setup(
    name='mothertongues',
    version=VERSION,
    long_description='Mother Tongues',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=REQS,
    python_requires='>=3.3',
    entry_points='''
        [console_scripts]
        mtd=mtd.cli:cli
        mothertongues=mtd.cli:cli
    '''
)