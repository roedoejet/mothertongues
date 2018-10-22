import re

class ArbSorter(object):
    """
        Sort entries based on alphabet
    """
    def __init__(self, order):
        split_order = sorted(order, key=len, reverse=True)
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
            item["sorting_form"] = self.word_as_values(item[target][0])
            sorted_list.append(item)
        return sorted_list
    
    def add_to_data_frame(self, df, sort_key):
        df['sorting_form'] = df[sort_key].apply(lambda x: self.word_as_values(x))
        return df.sort_values(by=['sorting_form'])
        