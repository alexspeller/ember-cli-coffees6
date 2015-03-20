CoffeescriptEs6Filter = require '../filter'

process = (string) ->
  new CoffeescriptEs6Filter("test").processString string

assertOutput = (input, output) ->
  equal process(input), output

test "default imports", =>
  assertOutput """
    import Ember from "ember"
  """
  ,
  """
    `import Ember from "ember";`
  """


test "named imports", =>
  assertOutput """
    import { sin, cos as c } from "math"
  """
  ,
  """
    `import { sin, cos as c } from "math";`
  """

test "combined default and named imports", =>
  assertOutput """
    import Matrix, { multiply } from "matrix"
  """
  ,
  """
    `import Matrix, { multiply } from "matrix";`
  """

test "batch import", =>
  assertOutput """
    import * as Math from "math"
  """
  ,
  """
    `import * as Math from "math";`
  """

test "default expression export", =>
  assertOutput """
    export default 42
  """
  ,
  """
    ___DefaultExportObject___ = 42

    `export default ___DefaultExportObject___;`
  """

test "default named function export", =>
  assertOutput """
    export default sin = (x) ->
  """
  ,
  """
    ___DefaultExportObject___ = sin = (x) ->

    `export default ___DefaultExportObject___;`
  """


test "default named class export", ->
  assertOutput """
    export default class Matrix
  """
  ,
  """
    ___DefaultExportObject___ = class Matrix

    `export default ___DefaultExportObject___;`
  """

test "default anonymous function export", ->
  assertOutput """
    export default (x) ->
  """
  ,
  """
    ___DefaultExportObject___ = (x) ->

    `export default ___DefaultExportObject___;`
  """

test "default anonymous class export", ->
  assertOutput """
    export default class Foo
  """
  ,
  """
    ___DefaultExportObject___ = class Foo

    `export default ___DefaultExportObject___;`
  """

test "named exports", ->
  assertOutput """
    export { sin, c as cos }
  """
  ,
  """
    `export { sin, c as cos };`
  """

test "named class export", ->
  assertOutput """
    export class Point
      constructor: (@x, @y) ->
  """
  ,
  """
    class Point
      constructor: (@x, @y) ->

    `export { Point };`
  """

test "named function export", ->
  assertOutput """
    export sin = (x) ->
  """
  ,
  """
    sin = (x) ->

    `export { sin };`
  """

test "named variable export", ->
  assertOutput """
    export PI = 3.14159
  """
  ,
  """
    PI = 3.14159

    `export { PI };`
  """

test "named exports with source", ->
  assertOutput """
    export { sin, cos as c } from "math"
  """
  ,
  """
    `export { sin, cos as c } from "math";`
  """
test "batch export", ->
  assertOutput """
    export * from "math"
  """
  ,
  """
    `export * from "math";`
  """



test "multiple exports", ->
  assertOutput """
    export { sin, c as cos }
    export class Matrix
    export sin = (x) ->
    export PI = 3.14159

    export { sin, cos as c } from "math"
    export * from "math"
    export default 42
  """
  ,
  """
    `export { sin, c as cos };`
    class Matrix
    sin = (x) ->
    PI = 3.14159

    `export { sin, cos as c } from "math";`
    `export * from "math";`
    ___DefaultExportObject___ = 42

    `export default ___DefaultExportObject___;`

    `export { Matrix, sin, PI };`
  """
