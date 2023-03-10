import re
from pandas import DataFrame

class ArbSorter(object):
    ''' Sort entries based on alphabet. Thanks to Lingweenie: https://lingweenie.org/conlang/sort.html

        Given a sequence of letters (arbitrary-length Unicode strings), convert each into a numerical code.
        Then, convert any string to be sorted into its numerical equivalent and sort on that.
    
        Examples:
            Here is an example of a sorter.

            >>> sorter = ArbSorter(['a', 'b', 'c'])
            >>> sorter.word_as_values('abc')
            [0, 1, 2]
            >>> sorter.values_as_word([0, 1, 2])
            'abc'

        Args:
            order (list[str]): The order to sort by.
    '''
    def __init__(self, order, ignorable=None):
        self.ignorable = [] if ignorable is None else ignorable
        split_order = [re.escape(x) for x in sorted(order, key=len, reverse=True)]
        self.splitter = re.compile(f'({"|".join(split_order)})', re.UNICODE)
        # Next, collect weights for the ordering.
        self.char_to_ord_lookup = {order[i]: i for i in range(len(order))}
        self.ord_to_char_lookup = {v: k for k, v in self.char_to_ord_lookup.items()}
        self.oov_count = 10000
 
    # Turns a word into a list of ints representing the new
    # lexicographic ordering.  Python, helpfully, allows one to
    # sort ordered collections of all types, including lists.
    def word_as_values(self, word):
        """Turn word into values"""
        # ignore empty strings
        word = [x for x in self.splitter.split(word) if x]
        values = []
        for char in word:
            if char in self.ignorable:
                continue
            if char in self.char_to_ord_lookup:
                values.append(self.char_to_ord_lookup[char])
            else:
                # OOV (can be multiple OOVs strung together)
                for oov in char:
                    if oov in self.ignorable:
                        continue
                    self.char_to_ord_lookup[oov] = self.oov_count
                    self.ord_to_char_lookup[self.oov_count] = oov
                    values.append(self.oov_count)
                    self.oov_count += 1
        return values
 
    def values_as_word(self, values):
        """Turn values into word"""
        return "".join([self.ord_to_char_lookup[v] for v in values])
 
    def __call__(self, item_list, target):
        """Return sorted list based on item's (word's) sorting_form"""
        sorted_list = []
        for item in item_list:
            item["sorting_form"] = self.word_as_values(item[target])
            sorted_list.append(item)
        return sorted(sorted_list, key=lambda x: x['sorting_form'])
    
    def add_to_data_frame(self, df: DataFrame, sort_key: str) -> DataFrame:
        '''Add "sorting_form" to DataFrame.

        Args:
            :param DataFrame df: Pandas DataFrame to add sorting form to
            :param str sort_key: DataFrame key to sort based on
        '''
        df['sorting_form'] = df[sort_key].apply(lambda x: self.word_as_values(x))
        return df.sort_values(by=['sorting_form'])
        