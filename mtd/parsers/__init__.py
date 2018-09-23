from mtd.tests import MANIFEST_SCHEMA
from jsonschema import validate
from jsonschema.exceptions import ValidationError

class BaseParser():
    def __init__(self):
        pass

    def validate_manifest(self, m):
        try:
            validate(m, MANIFEST_SCHEMA)
        except ValidationError as e:
            raise ValidationError(f"Attempted to validate the manifest file at {m}, but got {e}. Please refer to the Mother Tongues data manifest schema.")

    def return_list(self, d):
        if isinstance(d, list):
            return d
        elif isinstance(d, str):
            return [d]
        else:
            print("should go in log, not string or list")