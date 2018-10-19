from setuptools import setup, find_packages
import mtd

with open('requirements.txt') as f:
    REQS = f.read().splitlines()

setup(
    name='mothertongues',
    version=mtd.VERSION,
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