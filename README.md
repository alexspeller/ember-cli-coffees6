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

npm install ember-cli-coffees6 --save-dev
```

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
3. exporting the value returned from Router.map may give you this error: `Failed to create an instance of 'router:main'. Most likely an improperly defined class or an invalid module export` if this is the case, use a `Router` variable like you would without this plugin:
```coffee
Router = Ember.Router.extend()
Router.map( -> ... )
export default Router
```
