Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
require 'sugar'

module.exports = class VariableDefinition extends Statement
    constructor: (properties) ->
        super properties
        @context.setVariable @args[0], @args[1]
    activate: ->
        super()
    deactivate: ->
        super()

module.exports.test = (done) ->
    c = new Context()
    c.variables.foo = c.createRuntime 12
    e = c.createRuntime {op:'ref', args:["foo"]}
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 12" unless result is 12
    done()
