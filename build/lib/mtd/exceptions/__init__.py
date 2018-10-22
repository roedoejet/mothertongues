import sys

# sys.tracebacklimit = 0
class CommandLineError(Exception):
    """The traceback of all CommandLineError's is supressed when the
    errors occur on the command line to provide a useful command line
    interface.
    """
    def render(self, msg):
        return msg % vars(self)

class MissingFileError(CommandLineError):
    """Raise when file is not found"""
    def __init__(self, path):
        self.path = path
    
    def __str__(self):
        return self.render(f"File at {self.path} does not exist")

class UnsupportedFiletypeError(CommandLineError):
    """Raise when unable to import parser for filetype"""
    def __init__(self, path):
        self.path = path
    
    def __str__(self):
        return self.render(f"Filetype at {self.path} is unsupported.")

class SchemaValidationError(CommandLineError):
    """Raise when file does not pass validation"""
    def __init__(self, ftype, path):
        self.path = path
        self.ftype = ftype
    
    def __str__(self):
        return self.render(f"The {self.ftype} file at {self.path} seems to be malformed.")

class DuplicateDataNameError(CommandLineError):
    """Raise when two or more data resources share the same name"""
    def __init__(self):
        pass
    
    def __str__(self):
        return self.render("Your data must have different names. Please change your data manifest.")

class DfValidationError(CommandLineError):
    """Raise when data frame does not pass validation"""
    def __init__(self, cols, values):
        self.cols = cols
        self.values = values
    
    def __str__(self):
        return self.render(
        f"Your data has null values in the following columns: {self.cols}. " +
                                  f"See below for specific locations \n {self.values}"
        )

class UnfoundConfigErrror(CommandLineError):
    """Raise when config files cannot be found"""
    def __init__(self, path):
        self.path = path
    
    def __str__(self):
        return self.render(f"No config files found in {self.path}")

class RequestException(CommandLineError):
    """Raise when request returns anything other than a 2XX"""
    def __init__(self, path, status_code):
        self.path = path
        self.status_code = status_code
    
    def __str__(self):
        return self.render(f"Request made to {self.path}, but returned status: {self.status_code}")

class TransducerSourceNotFoundError(CommandLineError):
    """Raise when transducer source does not exist"""
    def __init__(self, source):
        self.source = source
    
    def __str__(self):
        return self.render(("'%(source)s' does not exist in data frame. Please edit your manifest."))

class TransducerNotFoundError(CommandLineError):
    """Raise when transducer does not exist"""
    def __init__(self, t):
        self.t = t
    
    def __str__(self):
        return self.render(("'%(t)s' does not exist. Please edit your manifest."))