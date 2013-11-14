Operation = require './Operation'
Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
ion = require '../'
require 'sugar'

module.exports = class AddStatement extends Statement
    activate: ->
        super()
        @expression ?= Operation.createRuntime @context, @args[0]
        @expression.watch @watcher ?= (@value) => @_update()
    _addedValue: undefined
    _update: ->
        if @value != undefined
            @_add()
        else
            @_remove()
    _getAddIndex: -> @args[1]
    _add: ->
        if @_addedValue is undefined
            addIndex = @_getAddIndex()
            insertIndex = @context.getInsertionIndex addIndex
            ion.add @context.output, @value, insertIndex, @context
            @_addedValue = @value
            @context.incrementAdditionCount addIndex
    _remove: ->
        if @_addedValue isnt undefined
            addIndex = @_getAddIndex()
            ion.remove @context.output, @_addedValue
            @_addedValue = undefined
            @context.decrementAdditionCount addIndex
    deactivate: ->
        super()
        @expression.unwatch @watcher

module.exports.test = (done) ->
    object = [false]
    context = new Context object
    s = Operation.createRuntime context, ast = require('../').parseStatement """
        1
        if @[0]
            2
        3
        4
        """
    s.activate()

    # console.log JSON.stringify object
    unless Object.equal object, [false, 1, 3, 4]
        return done(JSON.stringify(object) " should be [false,1,3,4]")

    # now changing object[0] to true should cause a 2 to be inserted into the array
    Object.observe object, (changes) ->
        # console.log JSON.stringify object
        if Object.equal object, [true, 1, 2, 3, 4]
            done()
    object[0] = true
