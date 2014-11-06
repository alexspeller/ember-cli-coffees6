'use strict';

var Filter = require('broccoli-filter')


CoffeeScriptEs6Filter.prototype = Object.create(Filter.prototype);
CoffeeScriptEs6Filter.prototype.constructor = CoffeeScriptEs6Filter

function CoffeeScriptEs6Filter (inputTree) {

  if (!(this instanceof CoffeeScriptEs6Filter)) return new CoffeeScriptEs6Filter(inputTree)
  Filter.call(this, inputTree)
}

CoffeeScriptEs6Filter.prototype.extensions = ['coffee']
CoffeeScriptEs6Filter.prototype.targetExtension = 'coffee'



CoffeeScriptEs6Filter.prototype.processString = function (string) {
  var regex = /^export default /m;
  if (string.match(regex)) {
    string = string.replace(regex, "___ExportClass___ = ");
    string = string + "\n\n`export default ___ExportClass___`";
  }

  var importRegex = /^import (.+) from ("|')(.+)("|')( \t)*$/gm
  var match;

  while (match = importRegex.exec(string)) {
    string = string.replace(match[0], "`" + match[0] + ";`");
  }

  return string;
}

function CoffeeES6Preprocessor() {
  this.name = 'ember-cli-coffees6';
  this.ext = 'js';
}

CoffeeES6Preprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  return new CoffeeScriptEs6Filter(tree);
};

function CoffeescriptES6Addon(project) {
  this._project = project;
  this.name     = 'Ember CLI Coffeescript ES6 Addon';
}

CoffeescriptES6Addon.prototype.included = function(app) {
  this.app = app;

  // The existing coffeescript addon will be registered first. We need
  // to be in the pipeline first so we can make our substitutions before
  // the existing coffeescript compiler
  var registered = this.app.registry.registeredForType('js'), existing;
  for (var i = 0, l = registered.length; i < l; i++) {
    if (registered[i].name === 'ember-cli-coffeescript') {
      existing = registered[i];
    }
  }

  this.app.registry.remove('js', 'ember-cli-coffeescript');

  var plugin = new CoffeeES6Preprocessor();
  this.app.registry.add('js', plugin);

  this.app.registry.add('js', existing);
};

module.exports = CoffeescriptES6Addon;
