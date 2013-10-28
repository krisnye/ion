Operation = require './Operation'
Expression = require './Expression'
Statement = require './Statement'
Context = require './Context'
ion = require '../'

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
    _add: ->
        if @_addedValue is undefined
            ion.add @context.this, @value
            @_addedValue = @value
    _remove: ->
        if @_addedValue isnt undefined
            ion.remove @context.this, @_addedValue
            @_addedValue = undefined
    deactivate: ->
        super()
        @expression.unwatch @watcher

module.exports.test = ->
    object = [false]
    context = new Context object
    s = Operation.createRuntime context, {op:"block",args:[
            {op:'add',args:[1]}
            {op:'if',args:[
                {op:'member',args:[{op:'ancestor',args:[0]},0]}
                {op:'add',args:[2]}
            ]}
            {op:'add',args:[3]}
            {op:'add',args:[4]}
        ]}
    s.activate()

    console.log JSON.stringify object

    # now changing object[0] to true should cause a 2 to be inserted into the array
    Object.observe object, (changes) ->
        console.log JSON.stringify object
    object[0] = true

    # s.deactivate()

    "AddStatement"