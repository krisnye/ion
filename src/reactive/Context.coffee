
module.exports = class Context
    constructor: (input, output, parent, additions) ->
        @variables = {}
        @input = input
        @output = output ? input
        @parent = parent
        @additions = additions ? parent?.additions
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



