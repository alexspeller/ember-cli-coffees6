var Filter = require('broccoli-persistent-filter')
var debug = require('debug')('ember-cli:ember-cli-coffees6');

function CoffeescriptEs6Filter (inputNode, options) {
  if (!(this instanceof CoffeescriptEs6Filter)) return new CoffeescriptEs6Filter(inputTree, options);
  Filter.call(this, inputNode, {annotation: (options || {}).annotation});
  this.options = options;
}

CoffeescriptEs6Filter.prototype = Object.create(Filter.prototype);
CoffeescriptEs6Filter.prototype.constructor = CoffeescriptEs6Filter;

CoffeescriptEs6Filter.prototype.extensions = ['coffee'];
CoffeescriptEs6Filter.prototype.targetExtension = 'coffee'

CoffeescriptEs6Filter.prototype.processString = function (string, src) {
  debug("Coffees6 Input:\n\n", string, "\n=======");
  var match;
  var namedThingsToExport = [];

  var importRegexSemicolon = /^import (.+) from ("|')(.+)("|')\s*;\s*$/gm
  if (match = string.match(importRegexSemicolon)) {
    throw new Error("Don't use semicolons in coffeescript: " + match[0])
  }

  // Fix import statements
  var importRegex = /^import (.+) from ("|')(.+)("|')\s*$/gm
  while (match = importRegex.exec(string)) {
    string = string.replace(match[0], "`" + match[0] + ";`");
  }


  var exportRegexSemicolon = /^export .+;\s*$/gm;
  if (match = string.match(exportRegexSemicolon)) {
    throw new Error("Don't use semicolons in coffeescript: " + match[0])
  }

  // Fix export default statements
  var exportRegex = /^export default ?/m;
  if (string.match(exportRegex)) {
    string = string.replace(exportRegex, "___DefaultExportObject___ = ");
    string = string + "\n\n`export default ___DefaultExportObject___;`";
  }

  // Fix named export statements
  var exportRegex = /^export (\{.*\}|\*)( from ("|').+("|'))?\s*$/gm;
  while (match = exportRegex.exec(string)) {
    string = string.replace(match[0], "`" + match[0] + ";`");
  }


  // Fix named class export standments
  var namedExportRegex = /^export class ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+)/m;
  while (match = namedExportRegex.exec(string)) {
    string = string.replace(new RegExp("^export class " + match[1], 'm'), "class " + match[1]);
    namedThingsToExport.push(match[1]);
  }

  // Fix named variable export standments
  var namedExportRegex = /^export ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+) =/m;
  while (match = namedExportRegex.exec(string)) {
    string = string.replace(new RegExp("^export " + match[1], 'm'), match[1]);
    namedThingsToExport.push(match[1]);
  }


  if (namedThingsToExport.length) {
    string = string + "\n\n`export { " + namedThingsToExport.join(', ') + " };`";
  }


  debug("Coffees6 Output:\n\n", string, "\n=======");

  return string;
}


module.exports = CoffeescriptEs6Filter;