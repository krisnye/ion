Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
core = require './core'

# A Variable definition can actually be used as a statement
# OR an expression.
module.exports = class VariableDefinition extends Statement
    constructor: (properties) ->
        super properties
        @name = @args[0]
        @context.setVariable @name, @args[1]
    watch: (watcher) ->
        @expression ?= @context.getVariableExpression @name
        @expression.watch watcher
    unwatch: (watcher) ->
        @expression?.unwatch watcher
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
