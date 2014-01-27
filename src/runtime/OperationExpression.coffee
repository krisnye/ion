Expression = require './Expression'
DynamicExpression = require './DynamicExpression'
ExpressionList = require './ExpressionList'
Context = require './Context'

toString = (value, options) ->
    if value?
        value.toString options
    else
        String value

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
    toString: (options) ->
        format = (x) -> if x? then x.toString options else x
        if @operation.hasOwnProperty 'toString'
            return @operation.toString options, @args.map(format)...
        else
            return "(#{format(@args[0])} #{@operation.op} #{format(@args[1])})"

return if @java or @window
module.exports.test = ->
    context = new Context
    e = context.createRuntime ast = require('../').parseExpression "1 + 2"
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    # we should actually get an immediate result
    throw "result != 3" unless result is 3
