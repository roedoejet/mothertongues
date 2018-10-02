import numpy as np
from mtd.exceptions import ValidationError
class DfValidator():
    def __init__(self, df):
        self.df = df.replace('', np.nan)

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
            raise ValidationError(f"Your data has null values in the following columns: {null_columns.values}. " +
                                  f"See below for specific locations \n {all_null_values}")
