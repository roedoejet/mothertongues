// Waldayu Mobile
// Copyright (C) 2016  Aidan Pine

/* Setup a "waldayu" object that holds things like transducers, templates, etc. */
'use strict';

var waldayu = {}

/* This establishes a function that we can use to
    add error messages that are visible to the user.  
    I don't really use it enough; oughta add more 
    error message possibilities. */

waldayu.errors = [];
waldayu.err = function (e) {
    if (waldayu.errors.indexOf(e) == -1) {
        $("#errors").append("<p>ERROR: " + e + "</p>");
        $("#errors").show();
        waldayu.errors.push(e);
    }
}
waldayu.msg = function (e) {
    $("#errors").append("<p>MESSAGE: " + e + "</p>");
    $("#errors").show();
}

waldayu.transducers = {};