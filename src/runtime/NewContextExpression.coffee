DynamicExpression = require './DynamicExpression'
Context = require './Context'
core = require './core'

left = 0
right = 1
# an expression that uses the left expression as a new context
# for the right expression
module.exports = class NewContextExpression extends DynamicExpression
    constructor: (properties) ->
        super properties
        @leftExpression = @context.createRuntime @args[left]
    activate: ->
        super()
        @leftExpression.watch @leftWatcher ?= (value) =>
            if @leftValue isnt value
                # unwatch any previous right expression
                @rightExpression?.unwatch @rightWatcher
                # store the new left value
                @leftValue = value
                # now create the right value and watch it
                if @leftValue?
                    # create a new context using the left value
                    @leftContext = new Context @leftValue, @context.output, @context
                    @rightWatcher ?= (value) =>
                        @rightValue = value
                        @evaluate()
                    # create right expression with this new context
                    @rightExpression = @leftContext.createRuntime @args[right]
                    @rightExpression.watch @rightWatcher
                else
                    @leftContext = null
                    @rightExpression = null
                    @setValue undefined
    deactivate: ->
        super()
        @leftExpression.unwatch @leftWatcher
    evaluate: ->
        value = @operation.evaluate.call @context, @leftValue, @rightValue
        @setValue value

module.exports.test = (done) ->
    try
        object = {alpha:{x:1,y:2}}
        context = new Context object
        e = context.createRuntime ast = require('../').parseExpression "$.alpha.(.x + .y)"
        result = undefined
        watcher = (value) ->
            result = value
            if value is 12
                done()
        e.watch watcher
        # we should actually get an immediate result
        throw "result != 3" unless result is 3
        # now change the x value
        object.alpha.x = 10
        # the watcher should be called with 12 which will pass this test
    catch error
        done error
