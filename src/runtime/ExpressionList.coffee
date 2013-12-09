
DynamicExpression = require './DynamicExpression'
Context = require './Context'
core = require './core'

module.exports = class ExpressionList extends DynamicExpression
    constructor: (@context, @items) ->
        throw new Error "items is required" unless @items?
        throw new Error "context is required" unless @context?
    observeItems: false
    notifyIfActive: ->
        if @isActive
            @notify()
    setArgumentValue: (key, value) ->
        if @argumentValues[key] isnt value
            if @observeItems
                core.unobserve @argumentValues[key], @itemObserver
            @argumentValues[key] = value
            if @observeItems
                # console.log "observe items=============" + JSON.stringify value
                core.observe value, @itemObserver ?= =>
                    # console.log '=========observed========' + JSON.stringify(value)
                    @notifyIfActive()
            @notifyIfActive()
    activate: ->
        unless @argumentValues?
            @expressions = @items.map (item) =>  @context.createRuntime item
            @argumentValues = []
            @expressionWatchers = []
            for key in [0..@expressions.length]
                @expressionWatchers[key] = @setArgumentValue.bind @, key
        for expression, key in @expressions
            expression.watch @expressionWatchers[key]
        super()
        @setValue @argumentValues
    deactivate: ->
        for expression, key in @expressions
            expression.unwatch @expressionWatchers[key]
        super()

module.exports.test = ->
    e = new ExpressionList new Context(), [1, 2]
    result = undefined
    watcher = (value) ->
        result = value
    e.watch watcher
    throw "result != [1,2]" unless Object.equal result, [1,2]
