Operation = require '../Operation'

module.exports = class Expression
    constructor: (properties) ->
        for key, value of properties
            @[key] = value
    watch: (watcher) -> throw new Error "not implemented"
    unwatch: (watcher) -> throw new Error "not implemented"
    toJSON: ->
        json =
            "$": @constructor.name
        for own key, value of @
            json[key] = value
        return json

Expression.createExpressions = (context, args) ->
    args.map (arg) -> Expression.createExpression context, arg

Expression.createExpression = (context, object) ->
    if object?.op
        operation = Operation.getOperation object.op
        return new (require './OperationExpression')
            context: context
            operation:operation
            args: object.args
    else
        return new (require './StaticExpression')
            value: object
