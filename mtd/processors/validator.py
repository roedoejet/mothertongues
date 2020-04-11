from mtd.exceptions import DfMissingKeysValidationError, DfNullValuesValidationError
from mtd.tests import logger
from pandas import concat, DataFrame
from typing import List, Union

def return_null(df, notnull: List[str]=['word', 'definition']) -> bool:
    """Returns a list of null items

    :param list notnull: list of keys to guarantee non-null values for
    """
    if all([nn in df for nn in notnull]):
        is_not_null = all([df[nn].notnull().all() for nn in notnull])
        if is_not_null:
            return []
        else:
            all_null_values = []
            for col in notnull:
                all_null_values.append(df[df[col].isnull()].values)
            return all_null_values
    else:
        e = DfMissingKeysValidationError(notnull)
        logger.error(e)

def check_alphabet(alphabet: List[str], df: DataFrame, key: str = 'word') -> List[str]:
    ''' Checks if any characters exist in the DataFrame that aren't in the alphabet.
    '''
    errored = []
    data = df[key].values
    chars = list(set(''.join(data)))
    alphabet = list(set(''.join(alphabet)))
    for char in chars:
        char = char.strip()
        if char and char not in alphabet:
            errored.append(char)
    return errored

def remove_dupes(df) -> DataFrame:
    """Removes and logs any true duplicate entries TODO: fix if list in df

        :param list notduped: list of keys (columns) to check for duplicates
    """
    dupes_removed = df.drop_duplicates(subset=["word", "definition"])
    return dupes_removed

def return_dupes(df, dupe_columns: List[str] = ['word']) -> DataFrame:
    '''return all word/definition duplicates. TODO: why does ['word', 'definition'] not work for dupe_columns?
    '''
    dupes = df.loc[df.duplicated(subset=dupe_columns, keep=False)]
    dupe_msgs = []
    dcols = " and ".join(dupe_columns)
    for i in range(len(dupes)):
        dupe_i = dupes.index[i]
        dupe_v = [v for v in dupes.values[i] if isinstance(v, str)]
        dupe_msgs.append({'name': dcols, 'index': dupe_i, 'value': dupe_v})
    return dupe_msgs


