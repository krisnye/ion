ion = require '../'

module.exports = class Context
    constructor: (input = global, output, parent, additions) ->
        @variables = {}
        @input = input
        @output = output ? input
        @parent = parent
        @additions = additions ? parent?.additions ? [ion.count @output]
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



