Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
core = require './core'
require 'sugar'

module.exports = class AddStatement extends Statement
    activate: ->
        super()
        @expression ?= @context.createRuntime @args[0]
        @expression.watch @watcher ?= (value) => @_updateNewValue(value)
    value: undefined
    _updateNewValue: (value) ->
        if value isnt @value
            @_remove @value
            @_add value
            @value = value
    _getAddIndex: -> @args[1]
    _add: (value) ->
        if value isnt undefined
            # console.log "**AddStatement.add: " + JSON.stringify(value)
            addIndex = @_getAddIndex()
            insertIndex = @context.getInsertionIndex addIndex
            core.add @context.output, value, insertIndex, @context
            @context.incrementAdditionCount addIndex
    _remove: (value) ->
        if value isnt undefined
            # console.log "**AddStatement.remove: " + JSON.stringify(value)
            addIndex = @_getAddIndex()
            core.remove @context.output, value
            @context.decrementAdditionCount addIndex
    deactivate: ->
        super()
        @expression.unwatch @watcher

module.exports.test = (done) ->
    object = [false]
    context = new Context object
    s = context.createRuntime ast = require('../').parseStatement """
        1
        if $[0]
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
