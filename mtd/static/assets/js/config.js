

waldayu.transducers["norm"] = (function() {
    var correspondences = {'`': " '", '\u0332_': '_', '\u0315,': " '", '\u02ca': " '", '\u0331_': '_', '\u02b9': " '", '\u0312,': " '", '\u0314,': " '", '\u0320_': '_', '\u0313,': " '", '\u2019': " '", '\u2018': " '", '\u02bb': " '", '\u02bd': " '", '\u02bc': " '", '\u02cd_': '_', '\u031b,': " '"};
    var keys = ['\u0332_', '\u0315,', '\u0331_', '\u0312,', '\u0314,', '\u0320_', '\u0313,', '\u02cd_', '\u031b,', '`', '\u02ca', '\u02b9', '\u2019', '\u2018', '\u02bb', '\u02bd', '\u02bc'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["combining_comma"] = (function() {
    var correspondences = {'k\u0332\u0315': 'k\u0332\u0313', 't\u0315': 't\u0313', 'k\u0315': 'k\u0313', 'p\u0315': 'p\u0313'};
    var keys = ['k\u0332\u0315', 't\u0315', 'k\u0315', 'p\u0315'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["hacek_norm"] = (function() {
    var correspondences = {'z\u030c': '\u017e', 'c\u030c': '\u010d', 'k\u030c': '\u01e9', 'j\u030c': '\u01f0', 's\u030c': '\u0161', 'g\u030c': '\u01e7'};
    var keys = ['z\u030c', 'c\u030c', 'k\u030c', 'j\u030c', 's\u030c', 'g\u030c'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["slurpy_norm"] = (function() {
    var correspondences = {'\u0142': '\u026b'};
    var keys = ['\u0142'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["sliammon_norm"] = (function() {
    var correspondences = {'\\?': '\u0294', 'j': '\u01f0'};
    var keys = ['\\?', 'j'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["sliammon_approx"] = (function() {
    var correspondences = {'\u019b\u0313': 'tl', 'k\u0313\u02b7': 'kw', '\u0254y': 'oy', '\u028a': 'u', 'k\u0313\u02b8': 'ky', 'k\u0313': 'k', 't\u0313\u1dbf': 'th', 'y\u0313': 'y', '\u0294': '', 'm\u0313': 'm', 's\u030c': 'sh', '\u019b': 'tl', '\u03c7\u02b7': 'hu', 'q\u02b7': 'kw', '\u0259y': 'i', 'k\u02b7': 'kw', 'q\u0313\u02b7': 'kw', 'q\u0313': 'k', 'k\u02b8': 'ky', '\u0259w': 'u', 'w\u0313': 'w', 'p\u0313': 'p', '\u03c7': 'h', 't\u0313': 't', 'g\u02b8': 'gy', '\u0254': 'o', '\u03b8': 'th', '\u0259': 'e', '\u025b': 'e', 'n\u0313': 'n', 'x\u02b7': 'hu', 't\u1dbf': 'th', 'c\u030c': 'ch', '\u0269': 'i', '\xe6': 'a', '\u026c': 'sh', 'q': 'k', '\u01f0': 'j', '\u010d\u0313': 'ch', 'l\u0313': 'l'};
    var keys = ['k\u0313\u02b7', 'k\u0313\u02b8', 't\u0313\u1dbf', 'q\u0313\u02b7', '\u019b\u0313', '\u0254y', 'k\u0313', 'y\u0313', 'm\u0313', 's\u030c', '\u03c7\u02b7', 'q\u02b7', '\u0259y', 'k\u02b7', 'q\u0313', 'k\u02b8', '\u0259w', 'w\u0313', 'p\u0313', 't\u0313', 'g\u02b8', 'n\u0313', 'x\u02b7', 't\u1dbf', 'c\u030c', '\u010d\u0313', 'l\u0313', '\u028a', '\u0294', '\u019b', '\u03c7', '\u0254', '\u03b8', '\u0259', '\u025b', '\u0269', '\xe6', '\u026c', 'q', '\u01f0'];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["sliammon_compare_composite"] = (function(){
    var orths = ['norm', 'combining_comma', 'hacek_norm', 'slurpy_norm', 'sliammon_norm', 'sliammon_approx'];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();

var config = {
    "L1": {
        "name": "Ayajuthem",
        "underlying": "",
        "compare": "sliammon_compare_composite",
        "optionalField": "Optional Information",
        "lettersInLanguage" : ['a', '\xe6', 'aw', 'ay', '\u0254', '\u010d', '\u010d\u0313', 'e', '\u025b', '\u0259', '\u0259w', '\u0259y', 'g', 'g\u02b8', 'h', 'i', '\u0269', '\u01f0', 'k', 'k\u0313', 'k\u02b7', 'k\u0313\u02b7', 'k\u02b8', 'k\u0313\u02b8', 'l', 'l\u0313', '\u026c', '\u019b', '\u019b\u0313', 'm', 'm\u0313', 'n', 'n\u0313', 'o', '\u0254y', 'p', 'p\u0313', 'q', 'q\u0313', 'q\u02b7', 'q\u0313\u02b7', 's', '\u0161', 't', 't\u0313', '\u03b8', 't\u1dbf', 't\u0313\u1dbf', 'u', '\u028a', 'w', 'w\u0313', '\u03c7', '\u03c7\u02b7', 'x', 'x\u02b7', 'y', 'y\u0313', '\u0294']
    },
    "L2": {
        "name": "English",
        "underlying": "",
        "compare": ""
    },
    "department": "UBC",
    "PI": ['UBC'],
    "developers": ['Patrick Littell', 'Aidan Pine'],
    "lexicographers": ['UBC']
};

/* Search Variables */
var l1_weights_config = {'underlying_form': 0.1, 'compare_form': 1.0};

var l1_thresholds_config = {'partial': 1.0, 'other': 4.0, 'exact': 0.0};

var l2_weights_config = {'definition': 1.0};

var l2_thresholds_config = {'partial': 1.9, 'other': 1000.0, 'exact': 0.9};

var theme_hierarchy = true;
var build = 1;
