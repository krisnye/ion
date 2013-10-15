Expression = require './Expression'

module.exports = class StaticExpression extends Expression
    constructor: (properties) ->
        super properties
        Object.freeze @
    getValue: -> @value
    watch: (watcher) -> watcher @value
    unwatch: (watcher) -> watcher undefined

module.exports.test = ->
    e = new StaticExpression {value:12}
    throw "e.getValue() != 12" unless e.getValue() is 12
    e.value = 10
    throw "e.getValue() != 12" unless e.getValue() is 12

    value = undefined
    watcher = (v) -> value = v
    e.watch watcher
    throw "value != 12" unless value is 12
    e.unwatch watcher
    throw "value != undefined" unless value is undefined
