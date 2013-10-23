Operation = require './Operation'
Expression = require './Expression'
Statement = require './Statement'

module.exports = class BlockStatement extends Statement
    activate: ->
        super()
        @statements ?= Operation.getRuntimes @context, @args
        for statement in @statements
            statement.activate()
    deactivate: ->
        super()
        for statement in @statements
            statement.deactivate()
