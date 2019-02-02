from numpy import nan
from mtd.exceptions import DfMissingKeysValidationError, DfNullValuesValidationError
from mtd.tests import logger
from pandas import concat, DataFrame
from typing import List, Union

class DfValidator():
    '''Validate DataFrame to check for null values or duplicates etc...

    Args:
        :param DataFrame df: DataFrame to check
    '''
    def __init__(self, df: DataFrame):
        self.df = df.replace('', nan)

    def check_not_null(self, notnull: List[str]=['word', 'definition']) -> bool:
        """Returns false if any of the keys in notnull are empty

        :param list notnull: list of keys to guarantee non-null values for
        """
        if all([nn in self.df for nn in notnull]):
            is_not_null = all([self.df[nn].notnull().all() for nn in notnull])
            if is_not_null:
                return is_not_null
            else:
                all_null_values = []
                for col in notnull:
                    all_null_values.append(self.df[self.df[col].isnull()])
                all_null_values = concat(all_null_values)
                e = DfNullValuesValidationError(notnull, all_null_values)
                logger.warn(e)
                return False
        else:
            e = DfMissingKeysValidationError(notnull)
            logger.warn(e)
            return False

    def remove_dupes(self) -> DataFrame:
        """Removes and logs any true duplicate entries TODO: fix if list in df

           :param list notduped: list of keys (columns) to check for duplicates
        """
        dupes_removed = self.df.drop_duplicates(subset=["word", "definition"])
        return dupes_removed

    def log_dupes(self, dupe_columns: List[str] = ['word', 'definition']) -> DataFrame:
        '''Log all word/definition duplicates.
        '''
        dupes = self.df.loc[self.df.duplicated(subset=dupe_columns, keep=False)]
        dcols = " and ".join(dupe_columns)
        for i in range(len(dupes)):
            dupe_i = dupes.index[i]
            dupe_v = [v for v in dupes.values[i] if isinstance(v, str)]
            logger.warning(f"The information at index {dupe_i} with the values {dupe_v} has duplicate values for {dcols}. Duplicates are not removed by default, so this is just a warning. Note that the index may not directly correspond to the location in your data.")
        return dupes


