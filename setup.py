from setuptools import setup, find_packages
import mtd

with open('requirements.txt') as f:
    REQS = f.read().splitlines()

setup(
    name='Mother Tongues',
    version=mtd.VERSION,
    long_description='Mother Tongues',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=REQS,
    entry_points='''
        [console_scripts]
        mtd=mtd.cli:cli
        mothertongues=mtd.cli:cli
    '''
)