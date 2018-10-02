from numpy import nan
from mtd.exceptions import DfValidationError
from mtd.tests import logger

class DfValidator():
    def __init__(self, df):
        self.df = df.replace('', nan)

    def check_not_null(self, notnull=['word', 'definition', 'entryID']):
        """Returns false if any of the keys in notnull are empty

        :param list notnull: list of keys to guarantee non-null values for
        """
        is_not_null = all([self.df[nn].notnull().all() for nn in notnull])
        if is_not_null:
            return is_not_null
        else:
            null_columns = self.df.columns[self.df.isnull().any()]
            all_null_values = self.df[self.df.isnull().any(axis=1)][null_columns].head()
            e = DfValidationError(null_columns.values, all_null_values)
            logger.error(e)
            

