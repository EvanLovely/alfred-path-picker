#!/usr/bin/env node
var util = require('./util.js');
var _ = require('lodash');
var jsonToAlfred = require('json-to-alfred');
var arg = process.argv[2];
var hosts = [];

(function init() {
  
  util.config.hostFiles.forEach(function (currentValue, i) {
    hosts[i] = util.loadYaml(currentValue);
  });
  hosts = _.flatten(hosts);
  var data = {
    results: []
  };

  util.search(hosts, arg).forEach(function (result) {
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