# ember-cli-coffees6

[ember-cli-coffeescript](https://github.com/kimroen/ember-cli-coffeescript) works great with ember-cli, but the syntax for module imports and exports is less than ideal:

```coffee
`import Ember from 'ember'`

DummyController = Ember.Controller.extend()

`export default DummyController`
```

Replace ember-cli-coffeescript with ember-cli-coffees6 and you can use a much more natural syntax:

```coffee
import Ember from 'ember'

export default Ember.Controller.extend()
```

## Installation

```
# If you already have ember-cli-coffeescript installed
npm uninstall ember-cli-coffeescript --save-dev

ember install:addon ember-cli-coffees6
```

## Known bugs:

1. For ember v1 - v1.10.0, `Router.map` does not return the Router instance, so you can't do `export default Router.map(...)` and need to do this instead:
```coffee
Router = Ember.Router.extend()
Router.map( -> ... )
export default Router
```

Track the fix here: https://github.com/emberjs/ember.js/commit/23b762fd19b431deaa0e8f7541aac53dce4aa9c3


## Debugging

You can turn on verbose debugging output by adding the option in your Brocfile.js:

```javascript
var app = new EmberApp({
  coffeeES6: {
    debug: true
  }
});
```

## Warnings / disclaimers

1. `export`, `default`, and `import` are reserved words in coffeescript. It's possible that in future they will be implemented with a different meaning. You may have to refactor this code to work with possible future versions of coffeescript
2. This currently works with ugly regex substitution and not a full parsing. It won't work for every possible expression or indentation etc.

Help us figure out more elegant ways to use new es6 features like imports and exports in coffeescript! It's a challenging ordeal.
