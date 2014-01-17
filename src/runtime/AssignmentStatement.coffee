Statement = require './Statement'
Context = require './Context'
core = require './core'

module.exports = class AssignmentStatement extends Statement
    activate: ->
        super()
        @leftExpression ?= @context.createRuntime @args[0]
        @rightExpression ?= @context.createRuntime  @args[1]
        @bidirectional = @args[2] is true and @rightExpression.setMemberValue?
        @leftExpression.watch @leftWatcher ?= (@leftValue) =>
            if @rightExpression.setAssignmentCurrentValue?
                currentValue = core.get @context.output, leftValue
                if currentValue?
                    @rightExpression.setAssignmentCurrentValue?(currentValue)
            @_assign()
        @rightExpression.watch @rightWatcher ?= (rightValue) =>
            @rightValue = rightValue
            @_assign()

        if @bidirectional
            # then we need to observe the context output object for changes to the leftValue property.
            @contextObserver ?= =>
                if @leftValue?
                    value = core.get @context.output, @leftValue, @rightValue
                    if value isnt undefined
                        @rightExpression.setMemberValue value
            core.observe @context.output, @contextObserver, @leftValue
    _assign: ->
        if @leftValue? and @rightValue isnt undefined
            currentValue = core.get @context.output, @leftValue
            if currentValue isnt @rightValue
                core.set @context.output, @leftValue, @rightValue
    deactivate: (revert = true) ->
        super()
        if revert and @leftValue?
            core.set @context.output, @leftValue, undefined
        @leftExpression.unwatch @leftWatcher
        @rightExpression.unwatch @rightWatcher
        # unobserve if this is a bi-directional assignment
        core.unobserve @context.output, @contextObserver

return if @java or @window
module.exports.test = (done) ->

    object = { x: 1, y: 2, z: -1, w: { a: 1 }}
    context = new Context object
    a = context.createRuntime ast = require('../').parseStatement """
        z: @x + @y
        w:
            b: 2
        """
    # activate this statement.
    a.activate()
    throw "object.z != 3" unless object.z is 3
    # deactivate and change x
    a.deactivate()
    object.x = 10
    # upon reactivation the result should immediately be 12
    a.activate()
    throw "object.z != 12" unless object.z is 12
    # the w.a property should not have been changed, indicating we patched the output without rewriting the w property

    # now we will dynamically wait for the result to be 22
    core.observe object, (changes) ->
        if object.z is 22
            a.deactivate()
            done()
    object.x = 20
