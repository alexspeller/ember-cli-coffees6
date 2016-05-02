# ember-cli-coffees6 [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-coffees6.svg)](http://emberobserver.com/addons/ember-cli-coffees6) [![Build Status](https://travis-ci.org/alexspeller/ember-cli-coffees6.svg?branch=master)](https://travis-ci.org/alexspeller/ember-cli-coffees6)



[ember-cli-coffeescript](https://github.com/kimroen/ember-cli-coffeescript) works great with ember-cli, but the syntax for module imports and exports is less than ideal:

```coffee
`import Ember from 'ember'`

DummyController = Ember.Controller.extend()

`export default DummyController`
```

Enhance ember-cli-coffeescript with ember-cli-coffees6 and you can use a much more natural syntax:

```coffee
import Ember from 'ember'

export default Ember.Controller.extend()
```

ember-cli-coffees6 depends on ember-cli-coffeescript, and does simple string substitution on the .coffee files before passing them through to the regular coffeescript compiler. It should work out of the box with anything that currently works with ember-cli-coffeescript, and changing to the new module syntax is option so it can be done one file at a time. If you find a case where this isn't true, please report an issue and it will be fixed!

## Upgrading

If you are upgrading from a version before `0.3.0`, you will need to add `ember-cli-coffeescript` to your `package.json`, as it's no longer included with `ember-cli-coffees6`

## Installation

```
# if coffeescript is not already installed
ember install ember-cli-coffeescript

ember install ember-cli-coffees6
```

## Supported syntax

This plugin aims to support all ES6 module syntax, see the tests for full examples.

## Debugging

You can turn on verbose debugging output by adding the option in your Brocfile.js:

```javascript
var app = new EmberApp({
  coffeeES6: {
    debug: true
  }
});
```

## Running tests

`npm test`

## Warnings / disclaimers

1. `export`, `default`, and `import` are reserved words in coffeescript. It's possible that in future they will be implemented with a different meaning. You may have to refactor this code to work with possible future versions of coffeescript
2. This currently works with ugly regex substitution and not a full parsing. It won't work for every possible expression or indentation etc.

Help us figure out more elegant ways to use new es6 features like imports and exports in coffeescript! It's a challenging ordeal.
