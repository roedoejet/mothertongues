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
    }
    $.each(dataDict, function (resourceID, manifest) {
        $.each(manifest["data"], function (i, entry) {
            entry["source_id"] = resourceID;
            allEntries.push(entry);
        });
    });
    return allEntries;
}

var allWords = []

function getAllWords() {
    if (allWords.length > 0) {
        return allWords;
    }
    $.each(dataDict, function (resourceID, manifest) {
        if (resourceID == "words") {
            $.each(manifest["data"], function (i, entry) {
                entry["source_id"] = resourceID;
                allWords.push(entry);
            });
        } else {
            return getAllEntries()
        }
    });
    return allWords;
}

var audioEntries = [];


function getAllAudioEntries() {
    if (audioEntries.length > 0) {
        return audioEntries;
    }
    $.each(dataDict, function (resourceID, manifest) {
        $.each(manifest["data"], function (i, entry) {
            if (entry["audio"] || entry["audio1"] || entry["audio2"] || entry["audio3"]) {
                audioEntries.push(entry);
            }
        });
    });
    return audioEntries;
}