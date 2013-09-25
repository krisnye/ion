
module.exports = class Operation
    constructor: (properties) ->
        for key, value of properties
            @[key] = value
    format: (a, b) -> "#{a} #{@op} #{b}"
    toString: -> @op
    toJSON: -> @op

Operation.isOp = isOp = (value) -> value?.op?.constructor is Operation
Operation.evaluate = evaluate = (context, operation) ->
    op = operation.op
    if op?.constructor is Operation
        args = operation.args
    else
        op = Operation.value
        args = [operation]
    op.evaluate.apply context, args
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
    "*": {}
    "/": {}
    "+": {}
    "-": {}

for key, properties of ops
    properties.op = key
    Operation[key] = new Operation properties
