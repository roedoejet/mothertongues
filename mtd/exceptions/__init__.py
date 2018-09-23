class MissingFileError(Exception):
    """Raise when file is not found"""

class UnsupportedFiletypeError(Exception):
    """Raise when unable to import parser for filetype"""

class ValidationError(Exception):
    """Raise when file does not pass validation"""