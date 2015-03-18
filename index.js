'use strict';

var Filter = require('broccoli-filter')
var checker = require('ember-cli-version-checker');
var debug = require('debug')('ember-cli:ember-cli-coffees6');
var CoffeescriptAddon = require('ember-cli-coffeescript');
var coffeescriptOptions = CoffeescriptAddon.getConfig;
var CoffeescriptPreprocessor = require('ember-cli-coffeescript/lib/coffee-preprocessor');

//
// Broccoli Filter
//

function CoffeescriptEs6Filter (inputTree, options) {
  if (!(this instanceof CoffeescriptEs6Filter)) return new CoffeescriptEs6Filter(inputTree, options);
  this.options = options;
  Filter.call(this, inputTree)
}

CoffeescriptEs6Filter.prototype = Object.create(Filter.prototype);
CoffeescriptEs6Filter.prototype.constructor = CoffeescriptEs6Filter;

CoffeescriptEs6Filter.prototype.extensions = CoffeescriptPreprocessor.prototype.ext;
CoffeescriptEs6Filter.prototype.targetExtension = 'coffee'

CoffeescriptEs6Filter.prototype.processString = function (string, src) {
  debug("Coffees6 Input:\n\n", string, "\n=======");

  // Fix export statements
  var exportRegex = /^export default /m;
  if (string.match(exportRegex)) {
    string = string.replace(exportRegex, "___ExportObject___ = ");
    string = string + "\n\n`export default ___ExportObject___`";
  }

  // Fix import statements
  var importRegex = /^import (.+) from ("|')(.+)("|')( \t)*$/gm
  var match;
  while (match = importRegex.exec(string)) {
    string = string.replace(match[0], "`" + match[0] + ";`");
  }
  debug("Coffees6 Output:\n\n", string, "\n=======");

  return string;
}


//
// Ember-CLI Preprocessor Plugin
//

function CoffeeES6Preprocessor(project, options) {
  this.project = project;
  this.options = options || {};
  this.name = 'ember-cli-coffees6';
}

CoffeeES6Preprocessor.prototype.ext = CoffeescriptEs6Filter.prototype.extensions;
CoffeeES6Preprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  var es6ified = new CoffeescriptEs6Filter(tree, this.options);
  return new CoffeescriptPreprocessor(coffeescriptOptions.call(this)).toTree(es6ified);
};


//
// Ember-CLI Addon
//

function CoffeescriptES6Addon(project) {
  this.project = project;
  this.name = 'Ember CLI Coffeescript ES6 Addon';
}

CoffeescriptES6Addon.prototype.shouldSetupRegistryInIncluded = function() {
  return !checker.isAbove(this, '0.2.0');
}

CoffeescriptES6Addon.prototype.setupPreprocessorRegistry = function(type, registry) {
  var plugin = new CoffeeES6Preprocessor(this.project, {/* config here */});
  registry.add('js', plugin);
}

CoffeescriptES6Addon.prototype.included = function(app) {
  this.app = app;
  if (this.shouldSetupRegistryInIncluded()) {
    this.setupPreprocessorRegistry('parent', app.registry);
  }
};

module.exports = CoffeescriptES6Addon;