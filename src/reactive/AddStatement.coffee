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
            @context.setAdditionCount addIndex, 1
    _remove: ->
        if @_addedValue isnt undefined
            addIndex = @_getAddIndex()
            ion.remove @context.output, @_addedValue
            @_addedValue = undefined
            @context.setAdditionCount addIndex, 0
    deactivate: ->
        super()
        @expression.unwatch @watcher

module.exports.test = (done) ->
    object = [false]
    context = new Context object
    s = Operation.createRuntime context, {op:"block",args:[
            {op:'add',args:[1,1]}
            {op:'if',args:[
                {op:'member',args:[{op:'ancestor',args:[0]},0]}
                {op:'add',args:[2,2]}
            ]}
            {op:'add',args:[3,3]}
            {op:'add',args:[4,4]}
        ]}
    s.activate()

    # console.log JSON.stringify object

    # now changing object[0] to true should cause a 2 to be inserted into the array
    Object.observe object, (changes) ->
        # console.log JSON.stringify object
        if Object.equal object, [true, 1, 2, 3, 4]
            done()
    object[0] = true
