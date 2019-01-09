from unittest import TestCase
from mtd.processors.transducer import Transducer
from pandas import DataFrame
from pandas.util.testing import assert_frame_equal
import os
import mtd.tests.test_data.transducers as test_transducers_path
import mtd.transducers as transducers_path
from mtd.exceptions import TransducerNotFoundError


class TransducerTest(TestCase):
    def setUp(self):
        self.test_transducers_path = os.path.dirname(
            test_transducers_path.__file__)
        self.transducers_path = os.path.dirname(transducers_path.__file__)

    def test_find_path_to_transducers(self):
        '''Find path to transducer. Raise NotFoundError if transducer doesn't exist.
        '''
        transducer = Transducer()
        path = transducer.return_transducer_path('norm')
        name = transducer.return_transducer_name(path)
        self.assertEqual(name, 'norm')
        self.assertTrue(os.path.exists(path))
        with self.assertRaises(TransducerNotFoundError):
            transducer.return_transducer_path('foobar')

    def test_normal_transducer(self):
        '''Sanity check a->b transducer.
        '''
        data = [{"word": "aaa"}]
        transduced_data = [{"word": "bbb"}]

        data_df = DataFrame(data)
        transduced_data_df = DataFrame(transduced_data)

        t_path = os.path.join(self.test_transducers_path,
                              'test_transducer.csv')
        transducer = Transducer([{
            'source': 'word',
            'target': 'word',
            'functions': [t_path]
        }])
        transducer_fn = transducer.create_transducer_function(t_path)
        self.assertEqual(transduced_data[0]["word"],
                         transducer_fn(data[0]['word']))
        self.assertTrue(
            transduced_data_df.equals(transducer.apply_to_data_frame(data_df)))

    def test_lambda_transducer(self):
        '''Transducer should allow lambda transductions.
        '''
        data = [{"word": "test"}]
        transduced_data = [{"word": "TEST"}]
        data_df = DataFrame(data)
        transduced_data_df = DataFrame(transduced_data)
        transducer = Transducer([{
            'source': 'word',
            'target': 'word',
            'functions': ['lambda x: x.upper()']
        }])
        transducer_fn = eval(transducer.transducers_needed[0]['functions'][0])
        self.assertEqual('TEST', transducer_fn('test'))
        self.assertTrue(
            transduced_data_df.equals(transducer.apply_to_data_frame(data_df)))

    def test_length_ordering(self):
        '''Transductions should be reverse ordered by length. Here with a transducer that turns 
        a->b and aa->c we get 'cbb' instead of 'bbbb'
        '''
        t_path = os.path.join(self.test_transducers_path,
                              'test_length_transducer.csv')
        transducer = Transducer()
        transducer_fn = transducer.create_transducer_function(t_path)
        self.assertEqual('cbb', transducer_fn('aaba'))

    def test_composite_transducer(self):
        '''Transducer should allow composite transducer. A composite transducer is a list of transducers that are applied
        in a specific order. Now by making a composite transducer of a->b + aa->c we can get the 'bbbb' output from the length ordering test
        '''
        data = [{"word": "aaba"}]
        transduced_data = [{"word": "bbbb"}]

        data_df = DataFrame(data)
        transduced_data_df = DataFrame(transduced_data)

        t_path = os.path.join(self.test_transducers_path,
                              'test_composite.json')
        transducer = Transducer(
            transducers_needed=[{
                'source': 'word',
                'target': 'word',
                'functions': ['test_composite']
            }],
            transducers_available_dir=self.test_transducers_path)
 
        fns = transducer.load_composite(t_path)
        f_in = data[0]['word']
        for fn in fns:
            f_in = fn(f_in)
        self.assertEqual(f_in, 'bbbb')
        self.assertTrue(
            transduced_data_df.equals(transducer.apply_to_data_frame(data_df)))

    def test_chained_transducer(self):
        '''Transducer should allow chained transductions with lambda transductions
        '''
        transducer = Transducer([{
            'source':
            'word',
            'target':
            'word',
            'functions': [
                'lambda x: x.upper()', 'lambda x: x.split("-")',
                'lambda x: "".join(x)'
            ]
        }])
        f_in = 'test-test'
        for t in transducer.transducers_needed:
            for fn in t['functions']:
                fn = eval(fn)
                f_in = fn(f_in)
        self.assertEqual('TESTTEST', f_in)

    def test_standard_transducers(self):
        '''Test MTD-supplied transducers
        '''
        pass
