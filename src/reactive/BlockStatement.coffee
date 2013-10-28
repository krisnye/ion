Operation = require './Operation'
Expression = require './Expression'
Statement = require './Statement'

module.exports = class BlockStatement extends Statement
    activate: ->
        super()
        @statements ?= Operation.createRuntimes @context, @args
        for statement in @statements
            statement.activate()
    deactivate: ->
        super()
        # we deactivate in reverse order
        # this makes removing items from an array more efficient
        # and keeps our operations more symmetrical.
        for index in [@statements.length - 1 .. 0] by -1
            statement = @statements[index]
            statement.deactivate()
