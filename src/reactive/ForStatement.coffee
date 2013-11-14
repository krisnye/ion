Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'
core = require '../core'
# hack for chrome missing Map iterator
Map = require '../ForEachMap'

module.exports = class ForStatement extends Statement
    activate: ->
        super()
        @statementMap ?= new Map
        for key, value of @context.input
            @addItem value

        core.observe @context.input, @applyChanges.bind @
    applyChanges: (changes) ->
        # O(n) operation.
        # because we have to make a new set of the items, this is a linear time operation.
        # WE ONLY have to do this for Arrays since they suck.
        # we can optimize this later to use O(1) time if the @context.input is not an array.
        current = new Set
        for key, value of @context.input
            current.add value

        maybeRemove = new Map
        for change in changes when change.name isnt 'length'
            if change.oldValue?
                maybeRemove.set change.oldValue, change.oldValue
            newValue = @context.input[change.name]
            if newValue?
                @addItem newValue

        maybeRemove.forEach (key, value) =>
            if not current.has value
                @removeItem value

    addItem: (item) ->
        if not @statementMap.has item
            newContext = new Context item, @context.output, @context, @context.additions
            statement = Operation.createRuntime newContext, @args[1]
            # store the created statement
            @statementMap.set item, statement
            statement.activate()
    removeItem: (item) ->
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
    input = [1,2,3,4]
    output = []
    context = new Context input, output
    ast = require('../').parseStatement """
        for
            . * 2
        """
    a = Operation.createRuntime context, ast
    a.activate()

    input.remove 2
    input.add 5

    Object.observe output, (changes) ->
        if Object.equal output, [2,6,8,10]
            a.deactivate()
            if not output.length is 0
                done "output should have been empty: #{JSON.stringify output}"
            else
                done()
