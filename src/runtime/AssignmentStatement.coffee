Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'

module.exports = class AssignmentStatement extends Statement
    activate: ->
        super()
        @leftExpression ?= Operation.createRuntime @context, @args[0]
        @rightExpression ?= Operation.createRuntime @context, @args[1]
        @leftExpression.watch @leftWatcher ?= (@leftValue) => @_assign()
        @rightExpression.watch @rightWatcher ?= (@rightValue) => @_assign()
    _assign: ->
        if @leftValue? and @rightValue isnt undefined
            # store original values so we can revert them
            @original ?= {}
            if not @original.hasOwnProperty @leftValue
                @original[@leftValue] =
                    if @context.output.hasOwnProperty @leftValue
                        @context.output[@leftValue]
                    else
                        undefined
            # set the new value on this property
            @context.output[@leftValue] = @rightValue
    deactivate: (revert = true) ->
        super()
        @leftExpression.unwatch @leftWatcher
        @rightExpression.unwatch @rightWatcher
        if revert and @original?
            # restore original values
            for key, value of @original
                if value is undefined
                    delete @context.output[key]
                else
                    @context.output[key] = value
    dispose: ->
        super()
        @leftExpression?.dispose()
        @rightExpression?.dispose()

module.exports.test = (done) ->
    object = { x: 1, y: 2, z: -1}
    context = new Context object
    a = Operation.createRuntime context, ast = require('../').parseStatement "z: @x + @y"
    # activate this statement.
    a.activate()
    throw "object.z != 3" unless object.z is 3
    # deactivate and change x
    a.deactivate()
    # make sure the object was reverted to previous state.
    throw "object.z != -1" unless object.z is -1
    object.x = 10
    # upon reactivation the result should immediately be 12
    a.activate()
    throw "object.z != 12" unless object.z is 12

    # now we will dynamically wait for the result to be 22
    Object.observe object, (changes) ->
        if object.z is 22
            a.deactivate()
            done()
    object.x = 20
