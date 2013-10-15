
module.exports = class Operation
    constructor: (properties) ->
        for key, value of properties
            @[key] = value
    format: (a, b) -> "#{a} #{@op} #{b}"
    toString: -> @op
    toJSON: -> @op

ops =
    "value":
        evaluate: (value) ->
            output = @output
            if Object.isFunction output?.push
                output.push value
            else if Object.isFunction output?.add
                output.add value
            else
                @output = output = value
            return output
    ":":
        evaluate: (key, value) ->
            key = @evaluate key
            value = @evaluate value
            output = @output
            if not typeof output isnt 'object'
                @output = output = {}
            output[key] = value
    "=": {}
    "if": {}
    "for": {}
    "ref": {}
    "get": {}
    "object": {}
    "*":
        evaluate: (left, right) -> left * right
    "/":
        evaluate: (left, right) -> left / right
    "%":
        evaluate: (left, right) -> left % right
    "+":
        evaluate: (left, right) -> left + right
    "-":
        evaluate: (left, right) -> left - right
    "&&":
        evaluate: (left, right) -> left && right
    "||":
        evaluate: (left, right) -> left || right

for key, properties of ops
    properties.op = key
    Operation[key] = new Operation properties

Operation.getOperation = (op) ->
    operation = Operation[op]
    throw new Error "Operation not found #{op}" unless operation?
    return operation
