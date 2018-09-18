// Waldayu Mobile
// Copyright (C) 2016  Aidan Pine
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as published
//    by the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//        but WITHOUT ANY WARRANTY; without even the implied warranty of
//        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//        GNU Affero General Public License for more details.
//
//        You should have received a copy of the GNU Affero General Public License
//        along with this program.  If not, see //<http://www.gnu.org/licenses/>.
'use strict';



// get the distances


waldayu.searchers = {}
waldayu.searchers["L1"] = function () {

    var weights = l1_weights_config
    var thresholds = l1_thresholds_config

    return function (needle, haystack, query_value) {
        var results = [];
        for (var i = 0; i < haystack.length; i++) {
            var entry = haystack[i];
            var distance = 0;

            waldayu.convertQuery(query_value, "L1", "compare")

            for (weightKey in weights) {
                if (weights.hasOwnProperty(weightKey)) {
                    weightValue = weights[weightKey];
                    distance += distanceCalculator.getLeastEditDistance(needle[weightKey], entry[weightKey]) * weightValue;
                }
            }
            entry["distance"] = distance; // keep track of the result for testing purposes
            results.push(entry);
        }

        // sort the results by distance
        results.sort(function (a, b) {
            return a["distance"] - b["distance"];
        });

        return results;
    }
}();

waldayu.searchers["L12"] = function () {
    var weights = l2_weights_config
    var thresholds = l2_thresholds_config

};

var l1SearchAlg = null;

function searchGit(query_value) {
    if (l1SearchAlg === null) {
        l1SearchAlg = distanceCalculator2(getAllEntries());
    }
    query_value = query_value.toLowerCase();
    // Case for multi-word query
    if (query_value.indexOf(' ') >= 0) {
        var query_array = query_value.split(" ");
        var result_container = []
        for (var i = 0; i < query_array.length; i++) {
            result_container = result_container.concat(l1SearchAlg(query_array[i]))
        }
        return result_container
        // Case for single-word query
    } else {
        var needle = waldayu.convertQuery(query_value, "L1", "compare");
        return l1SearchAlg(needle);
    }
}
var l2SearchAlg = null;

function searchEng(query_value) {
    if (l2SearchAlg === null) {
        l2SearchAlg = distanceCalculatorEng(getAllEntries());
    }
    query_value = query_value.toLowerCase();
    return l2SearchAlg(query_value);
}
//
//function searchEng(query_value) {
//    var results = [];
//    query_value = query_value.toLowerCase();
//    // get the distances
//    var entries = getAllEntries();
//    for (var i = 0; i < entries.length; i++) {
//        var target_value = entries[i]["definition"];
//        //var normalized_target = target_value.toLowerCase();
//        var distance = distanceCalculator.getLeastEditDistance(query_value, target_value);
//        entries[i]["distance"] = distance;
//        results.push(entries[i]);
//    }
//
//    // sort the results
//    results.sort(function(a,b) {
//        return a["distance"] - b["distance"];
//    });
//
//    return results;
//
//}
var response = [];

function search(lang_value, side, input_area) {
    response = [];
    var query_value = $(input_area).val().trim();
    if (query_value !== '') {

        $("div#results").fadeOut({
            duration: 0
        });
        $(".searchInstructions").fadeOut({
            duration: 0
        });

        if (lang_value == 'git') {
            results = searchGit(query_value);
        } else {
            results = searchEng(query_value);
        }


        for (var i = 0; i < Math.min(10, results.length); i++) {
            var distance = results[i][0];
            var result = results[i][1];
            response.push(result);
        }

        response.sort(function (a, b) {
            return a[0] - b[0];
        });
        console.log(response);
        $("div#results").show();
    }
    return false;
}

function shuffle(array) {
    var tmp, current, top = array.length;

    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

    return array;
}

function getRandom10() {
    var entries = shuffle(getAllEntries()); // shuffle entries
    return entries.slice(0, 10);
}

function get10(entries, startIndex) {
    return entries.slice(startIndex, startIndex + 10);
}

function get1(entries, startIndex) {
    return entries.slice(startIndex, startIndex + 1);
}

waldayu.transduce = function (str, transducerName) {
    if (transducerName in waldayu.transducers) {
        var transducer = waldayu.transducers[transducerName];
        console.log(transducer(str))
        return transducer(str);
    } else {
        waldayu.err('Transducer <b>' + transducerName + '</b> not found.');
        return str;
    }
};

waldayu.convertQuery = function (str, lang, orthType) {
    var orths = config[lang][orthType];
    return waldayu.transduce(str, orths);
};
