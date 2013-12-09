Statement = require './Statement'
Context = require './Context'
core = require './core'

module.exports = class WithStatement extends Statement
    activate: ->
        super()
        @statementMap ?= new Map

        @leftExpression ?= @context.createRuntime @args[0]
        @leftExpression.watch @leftWatcher ?= (left) =>
            if @left != left
                # deactivate any previous statements
                @statements?.deactivate()
                @left = left
                # create new context
                newContext = new Context left, @context.output, @context, @context.additions
                # evaluate statements within new context
                @statements = newContext.createRuntime @args[1]
        @statements?.activate()
    deactivate: ->
        super()
        @leftExpression?.unwatch @leftWatcher
        @statements?.deactivate()

# tested in renderTests.