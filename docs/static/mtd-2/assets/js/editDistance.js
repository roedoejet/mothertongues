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
        var compareForm = entry["compare_form"];
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var compareForm = entry["compare_form"];
            // If target entry is a phrase
            if (compareForm[0].indexOf(' ') >= 0) {
                var compare_form_array = compareForm[0].split(" ");
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

var distanceCalculatorEng = function (entries) {

    // First, create a dict of candidates, where the key is the comparison form
    // and the value is the entry itself.    
    var candidates = {};
    var candidateKeys = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        for (var j = 0; j < entry["compareDefinition"].length; j++) {
            var compareForm = entry["compareDefinition"][j];
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

var distanceCalculator = {

    insertionCost: 1.0,
    deletionCost: 1.0,
    insertionAtBeginningCost: 0.11,
    deletionAtEndCost: 0.1,
    substitutionCost: 1.0,

    getEditDistance: function (a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        var matrix = [];
        // var currentInsertionCost, currentDeletionCost, currentSubstitutionCost = 0;

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i * this.insertionAtBeginningCost];
        }

        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                currentInsertionCost = matrix[i][j - 1] + this.insertionCost;
                currentSubstitutionCost = matrix[i - 1][j - 1] + (b.charAt(i - 1) != a.charAt(j - 1) ? this.substitutionCost : 0);
                currentDeletionCost = matrix[i - 1][j] + (j == a.length ? this.deletionAtEndCost : this.deletionCost);
                matrix[i][j] = Math.min(currentSubstitutionCost, Math.min(currentInsertionCost, currentDeletionCost));

            }
        }

        return matrix[b.length][a.length];
    },


    // Given a query <a> and a series of targets <bs>, return the least distance to any target
    getLeastEditDistance: function (a, bs) {
        var that = this;
        return Math.min.apply(null, bs.map(function (b) {
            return that.getEditDistance(a, b);
        }));
    }
}