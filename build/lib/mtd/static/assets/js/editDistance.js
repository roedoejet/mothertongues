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

var distanceCalculator2 = function (entries) {

    // First, create a dict of candidates, where the key is the comparison form
    // and the value is the entry itself.    
    var candidates = {};
    var candidateKeys = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry["compare_form"]) {
            var compareForm = entry["compare_form"];
        } else {
            var compareForm = entry["word"];
        }
        // If target entry is a phrase
        if (compareForm.indexOf(' ') >= 0) {
            var compare_form_array = compareForm.split(" ");
            for (var k = 0; k < compare_form_array.length; k++) {
                if (!(compare_form_array[k] in candidates)) {
                    candidates[compare_form_array[k]] = [];
                    candidateKeys.push(String(compare_form_array[k]));
                }
                if (!(entry in candidates)) {
                    candidates[compare_form_array[k]].push(entry);
                }
            }
            // If target entry is a word
        } else {
            if (!(compareForm in candidates)) {
                candidates[compareForm] = [];
                candidateKeys.push(String(compareForm));
            }
            candidates[compareForm].push(entry);
        };
    }
    console.log(candidates)
    // Then build a Levenshtein Automaton from the keys
    var builder = new levenshtein.Builder()
        .dictionary(candidateKeys, false)
        .algorithm("transposition")
        .sort_candidates(true)
        .include_distance(true)
        .maximum_candidates(10);
    var transducer = builder.transducer();

    // Return the appropriate search function
    return function (query) {
        var results = [];
        var distanceFormPairs = transducer.transduce(query, Math.floor(query.length / 3.0));
        console.log(distanceFormPairs)
        for (var i = 0; i < distanceFormPairs.length; i++) {
            var distance = distanceFormPairs[i][1];
            var form = distanceFormPairs[i][0];
            var resultingEntries = candidates[form];
            for (var j = 0; j < resultingEntries.length; j++) {
                resultingEntries[j]["distance"] = distance;
                results.push([distance, resultingEntries[j]]);
            }
        }
        return results;
    };
};

var distanceCalculatorEng = function (entries) {

    // First, create a dict of candidates, where the key is the comparison form
    // and the value is the entry itself.    
    var candidates = {};
    var candidateKeys = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry["compareDefinition"]){
            var compareForm = entry["compareDefinition"]
        } else {
            var compareForm = entry["definition"]
        }
        for (var j = 0; j < compareForm.length; j++) {
            var compareForm = compareForm[j];
            if (!(compareForm in candidates)) {
                candidates[compareForm] = [];
                candidateKeys.push(compareForm);
            }
            candidates[compareForm].push(entry);
        };
    }
    // Then build a Levenshtein Automaton from the keys
    var builder = new levenshtein.Builder()
        .dictionary(candidateKeys, false)
        .algorithm("transposition")
        .sort_candidates(true)
        .include_distance(true)
        .maximum_candidates(10);
    var transducer = builder.transducer();

    // Return the appropriate search function
    return function (query) {
        var results = [];
        var distanceFormPairs = transducer.transduce(query, Math.floor(query.length / 3.0));
        for (var i = 0; i < distanceFormPairs.length; i++) {
            var distance = distanceFormPairs[i][1];
            var form = distanceFormPairs[i][0];
            var resultingEntries = candidates[form];
            for (var j = 0; j < resultingEntries.length; j++) {
                resultingEntries[j]["distance"] = distance;
                results.push([distance, resultingEntries[j]]);
            }
        }
        return results;
    };
};