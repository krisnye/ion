DynamicExpression = require './DynamicExpression'
Statement = require './Statement'
Context = require './Context'
require 'sugar'
core = require './core'

module.exports = class ObjectExpression extends DynamicExpression
    # this is called by an AssignmentStatement to let us know the current left hand value.
    setAssignmentCurrentValue: (value) ->
        @value = value
        return
    activate: ->
        super()
        @typeExpression ?= @context.createRuntime @args[0]
        @typeExpression.watch @typeWatcher ?= (type) =>
            if type is undefined
                value = undefined
            else if not core.is @value, type
                @statements?.deactivate()
                @statements = null
                if type? and typeof type is 'object'
                    # the type is actually an instance to use.
                    value = type
                else
                    # otherwise the type is a function to use as our constructor.
                    value = new (type ? Object)
            else
                # a default value could have been passed in
                value = @value

            if value? and not @statements? and @args[1]?
                newContext = new Context @context.input, value, @context
                @statements = newContext.createRuntime @args[1]
                @statements.activate()

            @setValue value

module.exports.test = (done) ->
    input = { x: 1, y: 2, z: -1}
    output = []
    context = new Context input, output
    ast = require('../').parseExpression """
        {}
            x: .x
            y: .y
            z: .x + .y
        """
    a = context.createRuntime ast

    a.watch watcher = (output) ->
        if output?
            if Object.equal output, {x:1,y:2,z:3}
                return done()
            else
                done new Error JSON.stringify(output) + " should be {x:1,y:2,z:3}"
            a.unwatch watcher
