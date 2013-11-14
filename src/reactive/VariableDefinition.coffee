Operation = require './Operation'
Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
ion = require '../'
require 'sugar'

module.exports = class VariableDefinition extends Statement
    constructor: (properties) ->
        super properties
        @context.variables[@args[0]] = Operation.createRuntime @context, @args[1]
    activate: ->
        super()
    deactivate: ->
        super()

module.exports.test = (done) ->
    c = new Context()
    c.variables.foo = Operation.createRuntime c, 12
    e = Operation.createRuntime c, {op:'ref', args:["foo"]}
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 12" unless result is 12
    done()
