core = require './core'

module.exports = class Context
    constructor: (input = global, output, parent, additions) ->
        @variables = {}
        @input = input
        @output = output ? input
        @parent = parent
        @additions = additions ? parent?.additions ? [core.count @output]
    createRuntime: (ast) ->
        op = ast?.op
        return new (require './StaticExpression') {value:ast} unless op?
        operation = (require './Operation').getOperation op
        return operation.createRuntime @, ast.args
    toString: -> "Context"
    getInsertionIndex: (addIndex) ->
        return unless addIndex?
        insertionIndex = 0
        # we include our own index in the insertionIndex
        # this is because for-loops need to add after any of their
        # own previous insertions.
        for i in [0...addIndex]
            count = @additions[i]
            if count?
                insertionIndex += count
        return insertionIndex
    incrementAdditionCount: (addIndex) ->
        return unless addIndex?
        @additions[addIndex] = (@additions[addIndex] ? 0) + 1
    decrementAdditionCount: (addIndex) ->
        return unless addIndex?
        @additions[addIndex] = (@additions[addIndex] ? 0) - 1
    _getAncestorProperty: (name, delta = -1) ->
        context = @
        while delta != 0 and context.parent?
            if context.parent[name] isnt context[name]
                delta--
            context = context.parent
        return context[name]
    getInput: (delta) -> @_getAncestorProperty "input", delta
    getOutput: (delta) -> @_getAncestorProperty "output", delta
    setVariable: (name, ast) -> @variables[name] = @createRuntime ast
    getVariableExpression: (name, allowGlobals = true) ->
        context = @
        while context?
            variable = context.variables[name]
            return variable if variable?
            context = context.parent
        # if the variable is not defined by us then it is probably a global variable.
        # we do however require that it be a globally defined variable, otherwise we throw an error.
        if allowGlobals
            value = global[name]
        if value is undefined
            throw new Error "Variable not found: '#{name}'" if value is undefined
        # global values are considered to be constants.
        return new (require './StaticExpression') {value:value}
    # the input object that values are read from
    input: null
    # the output object that values are written to
    output: null
    # parent is either null or another Context
    parent: null
    # an object that maps variable names to values
    variables: null
    # contains the number of items that add operations have inserted
    # into the output object.
    # It allows us to keep track of where to insert new items dynamically at
    # while still retaining the correct order.
    additions: null



