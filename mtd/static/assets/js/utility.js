// Waldayu Mobile
// Copyright (C) 2016  Aidan Pine
'use strict';

if (typeof (String.prototype.trim) === "undefined") {
    String.prototype.trim = function () {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


function makeLinkSafe(entryID) {
    return entryID.replace(" ", "+");
}

var allEntries = [];

function getAllEntries() {
    if (allEntries.length > 0) {
        return allEntries;
    } else {
        allEntries = dataDict
    }
    return allEntries;
}

var allWords = []

function getAllWords() {
    if (allWords.length > 0) {
        return allWords;
    } else {
        $.each(dataDict, function (entry){
            if ("word" in entry.source) {
                allWords.push(entry)
            }
        })
        if (allWords.length <= 0){
            return getAllEntries()
        } else {
            return allWords
        }
    }
}

var audioEntries = [];


function getAllAudioEntries() {
    if (audioEntries.length > 0) {
        return audioEntries;
    }
    $.each(dataDict, function (entry) {
        if (Object.keys(entry).indexOf("audio")){
            audioEntries.push(entry)
        }
    });
    return audioEntries;
}