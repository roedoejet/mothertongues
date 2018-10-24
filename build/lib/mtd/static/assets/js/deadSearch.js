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
