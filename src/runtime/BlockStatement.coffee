Expression = require './Expression'
Statement = require './Statement'

module.exports = class BlockStatement extends Statement
    activate: ->
        super()
        @statements ?= @args.map (arg) => @context.createRuntime arg
        for statement in @statements
            statement.activate()
    deactivate: ->
        super()
        # we deactivate in reverse order
        # this makes removing items from an array more efficient
        # and keeps our operations more symmetrical.
        for i in [@statements.length - 1 .. 0] by -1
            statement = @statements[i]
            statement.deactivate()

