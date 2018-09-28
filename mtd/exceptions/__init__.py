class MissingFileError(Exception):
    """Raise when file is not found"""

class UnsupportedFiletypeError(Exception):
    """Raise when unable to import parser for filetype"""

class ValidationError(Exception):
    """Raise when file does not pass validation"""

class UnfoundConfigErrror(Exception):
    """Raise when config files cannot be found"""

class RequestException(Exception):
    """Raise when request returns anything other than a 2XX"""