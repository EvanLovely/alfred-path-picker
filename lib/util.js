#!/usr/bin/env node
'use strict';
var yaml = require('js-yaml');
var _ = require('lodash');
var fs = require('fs');
var log = console.log;

var loadYaml = function (file) {
  // Get document, or throw exception on error
  file = file.replace('~', process.env.HOME);
  try {
    var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    // console.log(doc);
    return doc;
  } catch (e) {
    return [];
  }
};

var config = loadYaml(process.env.HOME + '/.alfred-path-picker.yml');

var search = function (myArray, query) {
  query = new RegExp(query.replace(' ', '.*'), 'i');
  return myArray.filter(function (element) {
    if (element.name.search(query) !== -1 || element.path.search(query) !== -1) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  loadYaml: loadYaml,
  search: search,
  config: config
};