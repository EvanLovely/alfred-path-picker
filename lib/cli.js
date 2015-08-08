#!/usr/bin/env node
'use strict';
var yaml = require('js-yaml');
var _ = require('lodash');
var Mustache = require('Mustache');
var fs = require('fs');
var log = console.log;
var arg = process.argv[2];
var searchQuery = new RegExp(arg.replace(' ', '.*'), 'i');
var pathFiles = [
    process.env.HOME + '/.paths.drupal7.yml',
    process.env.HOME + '/active-project/_files/settings/paths.yml'
];
var paths = [];
var template = fs.readFileSync(__dirname + '/../templates/alfred.mustache', 'utf8');

function loadYaml(file) {
    // Get document, or throw exception on error
    try {
      var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
      // console.log(doc);
      return doc;
    } catch (e) {
      return [];
    }
}

function search(myArray, query) {
    return myArray.filter(function(element) {
        if (element.name.search(query) !== -1 || element.path.search(query) !== -1) {
            return true;
        } else {
            return false;
        }
    });
}

(function init() {
    pathFiles.forEach(function(currentValue, i, parentArray) {
        paths[i] = loadYaml(currentValue);
    });
    paths = _.flatten(paths);
    var results = search(paths, searchQuery);
    
    log('<?xml version="1.0" encoding="utf-8"?> <items> ');
    results.forEach(function(result) {
        log(Mustache.render(template, result));
    });
    log('</items>');

})();

