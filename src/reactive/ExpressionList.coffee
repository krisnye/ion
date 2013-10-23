
Operation = require './Operation'
DynamicExpression = require './DynamicExpression'

module.exports = class ExpressionList extends DynamicExpression
    constructor: (@context, @items) ->
        throw new Error "items is required" unless @items?
    setArgumentValue: (index, value) ->
        @argumentValues[index] = value
        if @isActive
            @notify()
    activate: ->
        unless @argumentValues?
            @expressions = Operation.createRuntimes @context, @items
            @argumentValues = []
            @expressionWatchers = []
            for index in [0..@expressions.length]
                @expressionWatchers[index] = @setArgumentValue.bind @, index
        for expression, index in @expressions
            expression.watch @expressionWatchers[index]
        super()
        @setValue @argumentValues
    deactivate: ->
        for expression, index in @expressions
            expression.unwatch @expressionWatchers[index]
        super()

module.exports.test = ->
    e = new ExpressionList null, [1, 2]
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    throw "result != [1,2]" unless Object.equal result, [1,2]
