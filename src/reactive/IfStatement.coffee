Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'

module.exports = class IfStatement extends Statement
    activate: ->
        super()
        @leftExpression ?= Operation.createRuntime @context, @args[0]
        @rightExpression ?= Operation.createRuntime @context, @args[1]
        @leftExpression.watch @leftWatcher ?= (@leftValue) => @assign()
        @rightExpression.watch @rightWatcher ?= (@rightValue) => @assign()
    deactivate: ->
        super()
        @leftExpression.unwatch @leftWatcher
        @rightExpression.unwatch @rightWatcher
    assign: ->
        if @leftValue? and @rightValue isnt undefined
            @context.this[@leftValue] = @rightValue
    dispose: ->
        super()
        @leftExpression?.dispose()
        @rightExpression?.dispose()

module.exports.test = ->
    "IfStatement"
