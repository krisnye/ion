Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'
core = require '../core'
# hack for chrome missing Map iterator
{Map,Set} = require '../harmonyCollections'

module.exports = class ForStatement extends Statement
    activate: ->
        super()
        @statementMap ?= new Map

        @collectionExpression = Operation.createRuntime @context, @args[0] ? @context.input
        @collectionExpression.watch @collectionWatcher ?= (collection) =>
            if @collection != collection
                if @collection?
                    for key, item of @collection
                        @removeItem item
                    core.unobserve collection, @collectionObserver
                @collection = collection
                for key, item of collection
                    @addItem item
                core.observe collection, @collectionObserver ?= @applyChanges.bind @
    ignoreProperty: (name) ->
        if not name?
            return true
        if name[0] is '_'
            return true
        if name is 'length' and Array.isArray @collection
            return true
        return false
    applyChanges: (changes) ->
        oldValues = new Set
        newValues = new Set
        for change in changes when not @ignoreProperty change.name
            oldValue = change.oldValue
            newValue = @collection[change.name]
            oldValues.add oldValue if oldValue isnt undefined
            newValues.add newValue if newValue isnt undefined
        oldValues.forEach (key, value) =>
            if not newValues.has key
                @removeItem value
        newValues.forEach (key, value) =>
            if not oldValues.has key
                @addItem value
    addItem: (item) ->
        if item isnt undefined and not @statementMap.has item
            newContext = new Context item, @context.output, @context, @context.additions
            statement = Operation.createRuntime newContext, @args[1]
            # console.log "**for.addItem: " + JSON.stringify(item) + " " + JSON.stringify(@args[1])
            # store the created statement
            @statementMap.set item, statement
            statement.activate()
    removeItem: (item) ->
        # console.log "**for.removeItem: " + JSON.stringify item
        if item isnt undefined
            statement = @statementMap.get item
            if statement?
                statement.deactivate()
                @statementMap.delete item
    deactivate: ->
        super()
        # deactivate all statements
        @statementMap.forEach (item, statement) =>
            @removeItem item
        @statementMap.clear()
    dispose: ->
        super()

module.exports.test = (done) ->
    input = {numbers:[1,2,3,4]}
    output = []
    context = new Context input, output
    ast = require('../').parseStatement """
        for .numbers
            . * 2
        """
    a = Operation.createRuntime context, ast
    a.activate()

    input.numbers.remove 2
    input.numbers.add 5

    Object.observe output, (changes) ->
        if Object.equal output, [2,6,8,10]
            a.deactivate()
            if not output.length is 0
                done "output should have been empty: #{JSON.stringify output}"
            else
                done()
