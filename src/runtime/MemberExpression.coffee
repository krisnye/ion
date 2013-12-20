DynamicExpression = require './DynamicExpression'
Context = require './Context'
core = require './core'

module.exports = class MemberExpression extends DynamicExpression
    constructor: (properties) ->
        super properties
        @leftExpression = @context.createRuntime @args[0]
        @rightExpression = @context.createRuntime @args[1]
    activate: ->
        super()
        @rightExpression.watch @rightWatcher ?= (@rightValue) => @updateLeftRight()
        @leftExpression.watch @leftWatcher ?= (@leftValue) => @updateLeftRight()
    updateLeftRight: ->
        if @leftObservedValue isnt @leftValue or @rightObservedValue isnt @rightValue
            @leftObserver ?= (changes) => @evaluate()
            core.unobserve @leftObservedValue, @leftObserver, @rightObservedValue
            @leftObservedValue = @leftValue
            @rightObservedValue = @rightValue
            core.observe @leftObservedValue, @leftObserver, @rightObservedValue
        @evaluate()
    deactivate: ->
        super()
        @leftExpression?.unwatch @leftWatcher
        @rightExpression?.unwatch @rightWatcher
    evaluate: ->
        @setValue @leftValue?[@rightValue]
    dispose: ->
        super()
        @leftValue = undefined
        @rightValue = undefined
        @updateLeftRight()
