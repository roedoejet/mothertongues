import json
from jsonpointer import resolve_pointer, JsonPointerException
import pandas as pd
from mtd.exceptions import SchemaValidationError
from mtd.parsers.utils import BaseParser
from mtd.languages import MANIFEST_SCHEMA
from jsonschema.exceptions import ValidationError
from mtd.parsers.utils import ResourceManifest
from typing import Dict, List, Union
from jsonpath_ng import parse as json_parse
from tqdm import tqdm

class Parser(BaseParser):
    '''
    Parse data for MTD. location (jsonpath) specifies location of data

    :param ResourceManifest manifest: Manifest for parser
    :param (str or json) resource_path: JSON or path to JSON
    '''
    def __init__(self, manifest: ResourceManifest, resource_path: Union[str, dict, list]):
        self.manifest = manifest
        self.path_cache = {}
        try:
            if isinstance(resource_path, str):
                with open(resource_path, encoding='utf8') as f:
                    self.resource = json.load(f)
            elif isinstance(resource_path, (dict, list)):
                self.resource = resource_path
        except ValueError:
            raise SchemaValidationError('json', resource_path)
        if "location" in self.manifest:
            self.resource = resolve_pointer(self.resource, self.manifest['location'])
        self.entry_template = self.manifest['targets']

    def get_matcher(self, path: str):
        if path not in self.path_cache:
            self.path_cache[path] = json_parse(path)
        return self.path_cache[path]

    def getValueFromJsonPath(self, entry: dict, path: str):
        jsonpath_expr = self.get_matcher(path)
        result = jsonpath_expr.find(entry)
        if not result:
            result = ''
        return result

    def resolve_targets(self) -> List[dict]:
        return [
            self.fill_entry_template(
                self.entry_template, entry, self.getValueFromJsonPath
            )
            for entry in tqdm(self.resource)
        ]

    def fill_listof_entry_template(self, listof_dict: dict, entry, convert_function) -> list:
        """Handle a "listof" template in the manifest.

        The logic here is not very obvious due to weirdity of
        jsonpath.  See `fill_entry_template` for a description of the
        semantics.

        """
        # Run the query (convert function is always getValueFromJsonPath)
        listof = convert_function(entry, listof_dict['listof'])
        if not listof:
            return listof
        new_els = []
        if "value" in listof_dict:
            if isinstance(listof_dict['value'], dict) and "listof" in listof_dict['value']:
                next_listof_dict = {
                    "listof": listof_dict['value']['listof'],
                    "value": listof_dict['value']['value'],
                }
                # `listof` will usually have only one element, which
                # is the actual list we were looking for
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_el = self.fill_listof_entry_template(next_listof_dict, item, convert_function)
                        new_els.append(new_el)
            elif isinstance(listof_dict['value'], dict):
                # Create outputs with dictionaries of queries from "value" on results
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_el = {}
                        for k, v in listof_dict['value'].items():
                            new_json_expr = self.get_matcher(v.strip())
                            new_el[k] = self.validate_type(k, [match.value for match in new_json_expr.find(item)])
                        new_els.append(new_el)
            else:
                for el in listof:
                    items = el.value
                    if isinstance(items, dict):
                        items = [items]
                    for item in items:
                        new_json_expr = self.get_matcher(listof_dict["value"].strip())
                        for match in new_json_expr.find(item):
                            new_els.append(match.value)
        else:
            # No "value" is a synonym for "$", i.e. identity function
            for el in listof:
                # We use "extend" here because of jsonpath's
                # frustrating feature of always wrapping things in
                # lists...
                new_els.extend(el.value)

        return new_els

    def fill_entry_template(self, entry_template: dict, entry, convert_function) -> dict:
        '''This recursive function "fills in" the data according to the
        resource manifest. This is a slight modification from the one used by
        all parsers.

        The logic here is not always obvious due to weirdity of
        jsonpath among other things.

        In the case of a scalar value, no problem, e.g. if your JSON has:

            {
                "audio": {
                     "speaker": "Eric Idle",
                     "filename": "spam.mp3"
                },
                "examples": [ "spam", "spam", "eggs", "spam" ],
                "example_audio": [
                     { "speaker": "Viking 1" },
                     { "speaker": "Viking 2" },
                     { "speaker": "Viking 3" },
                     { "speaker": "Viking 4" }
                ]
            }

        Then a value in the manifest like "audio.speaker" will yield
        the string "Eric Idle".

        If you want to create a list of a fixed length, or a
        dictionary, in the output, you can do that too, e.g.

            [ "examples[0]", "examples[2]" ]

        will yield `[ "spam", "eggs" ]`,
        and
        
            { "spam": "examples[0]", "eggs", "examples[2]" }

        will yield `{ "spam": "spam", "eggs": "eggs" }`.

        But if you want to construct a list of variable length, you
        have to use "listof", *even if* you are simply passing through
        an existing list from the input.  This is because the JSON
        schema validation does not know that "examples" in the input
        above has a list as its value.  So you have to use "listof",
        which means that your value is a dictionary with two keys,
        "listof" and "value".  This runs the value of "listof" as a
        query which is expected to return a ... list of things.  The
        output is then constructed by running the query in "value" on
        *each item in* that list.  So, for instance:

            "vikings": { "listof": "example_audio", "value": "speaker" }

        should give you a list of Vikings.  If you don't want to
        actually run any query on the items (e.g., they are just
        strings), you can use "$" as the "value", or actually just
        omit "value" entirely, which does the same thing, e.g.:
        
            "examples": { "listof": "examples", "value": "$" }
            "examples": { "listof": "examples" }

        You can nest listofs, but be aware that the embedded "listof"
        query will be applied *to each entry in the list returned by
        the parent query*, and these results will be collected in a
        list, so in the case of lists of lists, you need to take care
        not to flatten your data - this can be achieved by using "$"
        as the second-level "listof" query, e.g. if your JSON has:

            "example_audio2": [
                [ { "speaker": "Viking 1", "filename": "spam1.mp3" },
                  { "speaker": "Viking 2", "filename": "spam2.mp3" },
                 ],
                [
                    { "speaker": "Viking 3", "filename": "spam3.mp3" },
                    { "speaker": "Viking 4", "filename": "spam4.mp3" },
                ]
            ]

        Then you could use this to extract the "speaker" value:

            "vikings2": {
                "listof": "example_audio2",
                "value": {
                    "listof": "$",
                    "value": {
                        "speaker": "speaker",
                        "filename": "filename"
                    }
                }
            }

        Finally, because jsonpath is weird, it is not recommended to
        use the `[*]` syntax to get all items of a list, because this
        will cause it to get flattened as well.

        Args:

            :param dict entry_template: The template for an
            entry. Keys are preserved, values are usually paths in the
            resource to data (JSONPath, XPath or Cell coordinates etc)

            :param any entry: The actual word/entry to extract some
            data from. This could be a row, or json dict or any piece
            of nested data from the data resource.

            :param function convert_function: A function that takes an
            entry and a path and returns the "filled in" object

        '''
        new_lemma = {}
        for k, v in entry_template.items():
            if isinstance(v, dict):
                if "listof" in v:
                    new_lemma[k] = self.fill_listof_entry_template(v, entry, convert_function)
                else:
                    new_lemma[k] = self.fill_entry_template(v, entry, convert_function)
            elif isinstance(v, list):
                new_v = []
                for x in v:
                    value = list(self.fill_entry_template({k: x}, entry, convert_function).values())
                    if value[0]:
                        new_v += value
                new_lemma[k] = new_v
            else:
                try:
                    new_lemma[k] = self.validate_type(k, convert_function(entry, v.strip()))
                except:
                    breakpoint()
        return new_lemma

    def parse(self) -> Dict[str, Union[dict, pd.DataFrame]]:
        try:
            data = self.resolve_targets()
            return {"manifest": self.manifest, "data": pd.DataFrame(data)}
        except JsonPointerException as e:
            raise e
