
Operation = require './Operation'
Expression = require './Expression'
DynamicExpression = require './DynamicExpression'
ExpressionList = require './ExpressionList'

module.exports = class OperationExpression extends DynamicExpression
    constructor: (properties) ->
        super properties
        @expressionList = new ExpressionList @context, @args
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
        value = @operation.evaluate.apply @context, @argumentValues
        @setValue value

module.exports.test = ->
    e = Operation.createRuntime null, {op:'+', args:[1, 2]}
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 3" unless result is 3
