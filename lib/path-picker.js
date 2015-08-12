#!/usr/bin/env node
var util = require('./util.js');
var _ = require('lodash');
var arg = process.argv[2];
var jsonToAlfred = require('json-to-alfred');
var paths = [];

(function init() {
  if (util.config.loadExamples.drupal7) {
    util.config.pathFiles.push(__dirname + '/../example/drupal7.yml');
  }
  
  util.config.pathFiles.forEach(function (currentValue, i) {
    paths[i] = util.loadYaml(currentValue);
  });
  paths = _.flatten(paths);
  var data = {
    results: []
  };

  util.search(paths, arg).forEach(function (result) {
    data.results.push({
      "title": result.name,
      "arg": result.path,
      "uid": result.path,
      "copy": result.path,
      "subtitle": result.path
    });
  });

  console.log(jsonToAlfred.createItems(data));
  
})();