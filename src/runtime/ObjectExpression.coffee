Operation = require './Operation'
DynamicExpression = require './DynamicExpression'
Statement = require './Statement'
Context = require './Context'
require 'sugar'
ion = require '../'

module.exports = class ObjectExpression extends DynamicExpression
    activate: ->
        super()
        @typeExpression ?= Operation.createRuntime @context, @args[0]
        @typeExpression.watch @typeWatcher ?= (type) =>
            if type is undefined
                value = undefined
            else if not ion.is @value, type
                @statements?.deactivate()
                @statements = null
                value = new (type ? Object)
            else
                # a default value could have been passed in
                value = @value

            if value? and not @statements? and @args[1]?
                newContext = new Context @context.input, value, @context
                @statements = Operation.createRuntime newContext, @args[1]
                @statements.activate()

            @setValue value
    deactivate: ->
        super()
        @typeExpression.unwatch @typeWatcher


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
    a = Operation.createRuntime context, ast

    a.watch watcher = (output) ->
        if output?
            if Object.equal output, {x:1,y:2,z:3}
                return done()
            else
                done new Error JSON.stringify(output) + " should be {x:1,y:2,z:3}"
            a.unwatch watcher
