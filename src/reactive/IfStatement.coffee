Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'

module.exports = class IfStatement extends Statement
    activate: ->
        super()
        @conditionExpression ?= Operation.createRuntime @context, @args[0]
        @conditionExpression.watch @conditionWatcher ?= (@conditionValue) => @_choose()
    deactivate: ->
        super()
        @conditionExpression.unwatch @conditionWatcher
    _choose: ->
        if @conditionValue
            @trueStatement ?= Operation.createRuntime @context, @args[1]
            @trueStatement.activate()
            @falseStatement?.deactivate()
        else
            if @args[2]?
                @falseStatement ?= Operation.createRuntime @context, @args[2]
                @falseStatement.activate()
            @trueStatement?.deactivate()
    dispose: ->
        super()
        @conditionExpression?.dispose()

module.exports.test = (done) ->
    object = { a:true, x: 1, y: 2 }
    context = new Context object
    a = Operation.createRuntime context, ast = require('../').parseStatement """
        if @a
            z1: true
        else
            z2: false
        """

    a.activate()
    throw new "object.z1 != true" unless object.z1 is true
    # deactivate, reset z1 and reactivate
    a.deactivate()
    object.a = false
    a.activate()
    throw new "object.hasOwnProperty('z1')" if object.hasOwnProperty('z1')
    throw new "object.z2 != false" unless object.z2 is false

    # now do dynamic watch
    # now we will dynamically wait for z1 to be written
    Object.observe object, (changes) ->
        if object.z1 is true
            # also make sure that z2 has been deleted.
            throw new "object.hasOwnProperty('z2')" if object.hasOwnProperty('z2')
            # conditionals DO NOT unwrite things or do they?
            a.deactivate()
            done()
    object.a = true
    return
