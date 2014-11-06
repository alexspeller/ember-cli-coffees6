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

## Warnings / disclaimers

1. `export`, `default`, and `import` are reserved words in coffeescript. It's possible that in future they will be implemented with a different meaning. You may have to refactor this code to work with possible future versions of coffeescript
2. This currently works with ugly regex substitution and not a full parsing. It won't work for every possible expression or indentation etc.