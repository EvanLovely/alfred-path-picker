#!/usr/bin/env node
'use strict';
var yaml = require('js-yaml');
var _ = require('lodash');
var jsonToAlfred = require('json-to-alfred');
var fs = require('fs');
var log = console.log;
var arg = process.argv[2];
var searchQuery = new RegExp(arg.replace(' ', '.*'), 'i');
var config = loadYaml(process.env.HOME + '/.alfred-path-picker.yml');
var paths = [];

function loadYaml(file) {
  // Get document, or throw exception on error
  file = file.replace('~', process.env.HOME);
  try {
    var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    // console.log(doc);
    return doc;
  } catch (e) {
    return [];
  }
}

function search(myArray, query) {
  return myArray.filter(function (element) {
    if (element.name.search(query) !== -1 || element.path.search(query) !== -1) {
      return true;
    } else {
      return false;
    }
  });
}

(function init() {
  if (config.loadExamples.drupal7) {
    config.pathFiles.push(__dirname + '/../example/drupal7.yml');
  }
  
  config.pathFiles.forEach(function (currentValue, i, parentArray) {
    paths[i] = loadYaml(currentValue);
  });
  paths = _.flatten(paths);
  var results = [];

  search(paths, searchQuery).forEach(function (result) {
    results.push({
      "title": result.name,
      "arg": result.path,
      "uid": result.path,
      "copy": result.path,
      "subtitle": result.path
    });
  });

  console.log(jsonToAlfred({ "results": results }));
  
})();
