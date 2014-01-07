Statement = require './Statement'
Context = require './Context'
core = require './core'
# hack for chrome missing Map iterator
{Map,Set} = require './iterableCollections'

module.exports = class ForStatement extends Statement
    activate: ->
        super()
        @statementMap ?= new Map

        @collectionExpression = @context.createRuntime @args[0] ? @context.input
        @collectionExpression.watch @collectionWatcher ?= (collection) =>
            if @collection != collection
                # console.log '---collection changed: ' + collection
                if @collection?
                    for key, item of @collection
                        @removeItem item
                    core.unobserve collection, @collectionObserver
                @collection = collection
                for key, item of collection
                    @addItem key, item
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
        # this will be an N performance algorithm for ARRAY insertions/deletions.
        for change in changes when not @ignoreProperty change.name
            key = change.name
            oldValue = change.oldValue
            newValue = @collection[change.name]
            # console.log '---apply changes--- ', change
            @removeItem key, oldValue if oldValue isnt undefined
            @addItem key, newValue if newValue isnt undefined
    addItem: (key, value) ->
        if value isnt undefined and not @statementMap.has key
            # console.log '+++addItem ' + key, value?.toString()
            newContext = new Context value, @context.output, @context, @context.additions
            # add a key variable to the new context
            newContext.setVariable (@args[2] ? "key"), key
            # optionally add a value variable to the new context
            if @args[3]?
                newContext.setVariable @args[3], value
            statement = newContext.createRuntime @args[1]
            # console.log "**for.addItem: " + JSON.stringify(key) + " " + JSON.stringify(value)
            # store the created statement
            @statementMap.set key, statement
            statement.activate()
    removeItem: (key, oldValue) ->
        # console.log "**for.removeItem: " + JSON.stringify key
        if key isnt undefined
            statement = @statementMap.get key
            if statement?
                # console.log '---removeItem ' + key, oldValue?.toString()
                statement.deactivate()
                @statementMap.delete key
    deactivate: ->
        super()
        # deactivate all statements
        # console.log '-----FOR deactivate'
        @statementMap.forEach (key, statement) =>
            @removeItem key
        @statementMap.clear()

return if @java or @window
module.exports.test =
    values: (done) ->
        input = {numbers:[1,2,3,4]}
        output = []
        context = new Context input, output
        ast = require('../').parseStatement """
            for .numbers
                . * 2
            """
        a = context.createRuntime ast
        a.activate()

        input.numbers.remove 2
        input.numbers.add 5

        core.observe output, (changes) ->
            if Object.equal output, expected = [2,6,8,10]
                a.deactivate()
                if not output.length is 0
                    done "#{JSON.stringify output} should have been #{JSON.stringify expected}"
                else
                    done()
    keys: (done) ->
        input = {a:1,b:2,c:3}
        output = {}
        context = new Context input, output
        ast = require('../').parseStatement """
            for .
                (key): . * 2
            """
        a = context.createRuntime ast
        a.activate()
        expected = {a:2,b:4,c:6}
        if not Object.equal output, expected
            done "#{JSON.stringify output} should have been #{JSON.stringify expected}"
        # effectively move the value
        delete input.b
        input.d = 2

        # console.log JSON.stringify output
        # now change the values.
        core.observe output, (changes) ->
            if Object.equal output, expected = {a:2,c:6,d:4}
                a.deactivate()
                if not output.length is 0
                    done "#{JSON.stringify output} should have been #{JSON.stringify expected}"
                else
                    done()

