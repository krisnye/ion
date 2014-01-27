
module.exports = class Operation
    constructor: (properties) ->
        Object.merge @, properties
    format: (a, b) -> "#{a} #{@op} #{b}"
    toString: -> @op
    runtime: './OperationExpression'
    # creates a runtime construct from this operation
    # with the specified context and AST arguments
    createRuntime: (context, args) ->
        type = require @runtime
        return new type {operation:@, context:context, args:args}

ops =
    "add":
        addIndex: true
        runtime: './AddStatement'
    "block":
        runtime: './BlockStatement'
    "set":
        newOutputContext: true
        runtime: './AssignmentStatement'
    "if":
        runtime: './IfStatement'
    "for":
        # for loop children do not use add indexes
        # because otherwise they would all try to insert at zero.
        addIndexesEnabled: false
        runtime: './ForStatement'
    "object":
        addIndexesEnabled: true
        runtime: './ObjectExpression'
    "var":
        runtime: './VariableDefinition'
    "function":
        evaluate: (text) ->
            # we are calling eval which is sort of bad.
            # let's at least check that the text looks like a function definition
            # we can fix this by extracting the arguments and body in the parser
            # and calling the Function constructor explicitly here.
            if /^\(?function\(/.test text
                eval text
            else
                throw new Error "Invalid Function: #{text}"
    # "templateDef":
    #     addIndexesEnabled: false
    #     # a template definition just returns an expression equivalent to the template AST.
    #     # the context where the template is defined is irrelevant.
    #     createRuntime: (context, args) -> new (require './StaticExpression') value:args[0]
    # "templateApply":
    #     createRuntime: (context, args) ->
    #         templateVar = context.getVariableExpression name = args[0]
    #         templateAst = templateVar?.value
    #         throw new Error "Invalid template: #{name}" unless templateAst?
    #         return context.createRuntime templateAst
    "ref":
        createRuntime: (context, args) ->
            context.getVariableExpression args[0]
    "member":
        runtime: './MemberExpression'
    "null":
        evaluate: -> null
    "call":
        observe: 1
        evaluate: (fn, thisArg, args...) ->
            if global.process?.platform?
                try
                    # on nodejs these errors are not logged anywhere if we don't log them
                    # process.on 'uncaughtException' doesn't seem to work either
                    fn?.apply thisArg, args
                catch e
                    console.error e
            else
                fn?.apply thisArg, args
    "new":
        evaluate: (constructor, args...) ->
            return undefined unless constructor?
            # console.log 'NEW', constructor.name, args
            try
                return new constructor args...
            catch e
                console.error e.stack ? e
    "regex":
        evaluate: (text, options) ->
            if text?
                new RegExp text, options
            else
                undefined
    "?:":
        # note that both conditions are evaluated.
        # since the declarative mode has no side-effects, it shouldn't matter.
        evaluate: (condition, a, b) -> if condition then a else b
    "?":
        evaluate: (a, b) -> a ? b
    "exists":
        evaluate: (a) -> a?
        toString: (options, a) ->
            if options?
                "#(({a}) != null)"
            else
                "#{a}?"
    "!":
        evaluate: (a) -> not a
        toString: (options, a) -> "#!({a})"
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
    "&":
        evaluate: (left, right) -> left & right
    "|":
        evaluate: (left, right) -> left | right
    "==":
        evaluate: (left, right) -> left == right
    "!=":
        evaluate: (left, right) -> left != right
    "<":
        evaluate: (left, right) -> left < right
    ">":
        evaluate: (left, right) -> left > right
    "<=":
        evaluate: (left, right) -> left <= right
    ">=":
        evaluate: (left, right) -> left >= right
    "global":
        evaluate: -> global
        toString: -> "global"
    "input":
        evaluate: (delta) -> @getInput delta
        toString: (options, delta) -> "@(#{delta})"
    "output":
        evaluate: (delta) -> @getOutput delta
        toString: (options, delta) -> "$(#{delta})"

for key, properties of ops
    properties.op = key
    Operation[key] = new Operation properties

Operation.getOperation = getOperation = (op) ->
    operation = Operation[op]
    throw new Error "Operation not found #{op}" unless operation?
    return operation
