
module.exports = class Context
    constructor: (@this, @parent) ->
        @variables = {}
    # parent is either null or another Context
    parent: null
    # an object that maps variable names to values
    variables: null

