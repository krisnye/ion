Operation = require './Operation'

module.exports = class Context
    constructor: (input, output) ->
        output = input if output is undefined
        @inputStack = [input]
        @outputStack = [output]
        @variableStack = [{}]
    evaluate: (operation) -> Operation.evaluate @, operation
Object.defineProperties Context.prototype,
    output:
        get: -> @outputStack[@outputStack.length - 1]
        set: (value) -> @outputStack[@outputStack.length - 1] = value
