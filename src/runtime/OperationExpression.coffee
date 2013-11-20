
Operation = require './Operation'
Expression = require './Expression'
DynamicExpression = require './DynamicExpression'
ExpressionList = require './ExpressionList'
Context = require './Context'

module.exports = class OperationExpression extends DynamicExpression
    constructor: (properties) ->
        super properties
        @expressionList = new ExpressionList @context, @args
        if @operation.observe
            @expressionList.observeItems = true
    args: null
    activate: ->
        super()
        @expressionList.watch @watcher ?= (value) =>
            @argumentValues = value
            @evaluate()
    deactivate: ->
        super()
        @expressionList.unwatch @watcher
    evaluate: ->
        if not @operation.evaluate?
            throw new Error "evaluate method not defined for operation: " + @operation.op
        value = @operation.evaluate.apply @context, @argumentValues
        @setValue value

module.exports.test = ->
    context = new Context
    e = Operation.createRuntime context, ast = require('../').parseExpression "1 + 2"
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 3" unless result is 3
