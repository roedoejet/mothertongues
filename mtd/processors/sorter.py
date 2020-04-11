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
    def __init__(self, order):
        split_order = [re.escape(x) for x in sorted(order, key=len, reverse=True)]
        self.splitter = re.compile(u"(%s)" % "|".join(split_order), re.UNICODE)
        # Next, collect weights for the ordering.
        self.ords = {}
        self.vals = []
        for i in range(len(order)):
            self.ords[order[i]] = i
            self.vals.append(order[i])
 
    # Turns a word into a list of ints representing the new
    # lexicographic ordering.  Python, helpfully, allows one to
    # sort ordered collections of all types, including lists.
    def word_as_values(self, word):
        """Turn word into values"""
        word = self.splitter.split(word)[1::2]
        return [self.ords[char] for char in word]
 
    def values_as_word(self, values):
        """Turn values into word"""
        return "".join([self.vals[v] for v in values])
 
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
        