require 'sugar'
Context = require './Context'

module.exports = class Template
    constructor: (@statements, @name = "template") ->
    render: (input, output) ->
        context = new Context input, output
        for statement in @statements
            context.evaluate statement
        return context.output
