
Operation = require '../Operation'
Expression = require './Expression'
DynamicExpression = require './DynamicExpression'
ExpressionList = require './ExpressionList'

module.exports = class OperationExpression extends DynamicExpression
    constructor: (properties) ->
        super properties
        @expressionList = new ExpressionList @context, @args
    activate: ->
        super()
        @expressionList.watch @watcher ?= (value) =>
            @argumentValues = value
            @evaluate()
    deactivate: ->
        super()
        @expressionList.unwatch @watcher
    evaluate: ->
        value = @operation.evaluate.apply @operation, @argumentValues
        @setValue value

module.exports.test = ->
    op = Operation.getOperation "+"
    e = new OperationExpression {operation:op, args:[1, 2]}
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 3" unless result is 3
