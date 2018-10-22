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

    def check_dupes(self):
        """Removes and logs any true duplicate entries TODO: fix if list in df

           :param list notduped: list of keys (columns) to check for duplicates
        """
        dupes = self.df.iloc[self.df.duplicated(keep=False)]
        for i in range(len(dupes)):
            dupe_i = dupes.index[i]
            dupe_v = dupes.values[i]
            logger.warning(f"The information at index {dupe_i} with the value {dupe_v} is duplicated. Duplicates are removed by default.")
        return self.df.drop_duplicates()


