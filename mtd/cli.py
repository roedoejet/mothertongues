import click
import os
import glob
from mtd.app import app
from mtd.exceptions import UnfoundConfigErrror
from mtd.languages.suites import LanguageSuite

@app.cli.command()
@click.argument('path', type=click.Path(exists=True))
@click.pass_context
def return_configs(ctx, path):
    if os.path.isdir(path):
        configs = glob.glob(os.path.join(os.path.dirname(path), '**', 'config.json'), recursive=True)
    elif os.path.isfile(path):
        print(path)
        with open(path, 'r') as f:
            configs = f.read().splitlines()
    else:
        raise UnfoundConfigErrror(f"No config files found in {path}")
    ls = LanguageSuite(configs)
    if ls.config_objects:
        click.echo(ls.config_objects)
    else:
        click.echo(UnfoundConfigErrror(f"No config files found in {path}"))
