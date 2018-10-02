import click
import os
import glob
from mtd.app import app
from mtd.exceptions import UnfoundConfigErrror
from mtd.languages.suites import LanguageSuite

@app.cli.command()
@click.argument('path', type=click.Path(exists=True))
def return_configs(path):
    """ Return all language configs at specified path

    :param str path: an absolute path to either a txt file with paths to one or more MTD language configuration files **or** a directory containing MTD language configuration files

    """
    if os.path.isdir(path):
        configs = glob.glob(os.path.join(os.path.dirname(path), '**', 'config.json'), recursive=True)
    elif os.path.isfile(path):
        with open(path, 'r') as f:
            configs = f.read().splitlines()
    else:
        raise UnfoundConfigErrror(path)
    ls = LanguageSuite(configs)
    if ls.config_objects:
        click.echo(ls.config_objects)
    else:
        click.echo(UnfoundConfigErrror(path))
