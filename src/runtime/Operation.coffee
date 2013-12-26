
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
    "with":
        runtime: './WithStatement'
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
    "templateDef":
        addIndexesEnabled: false
        # a template definition just returns an expression equivalent to the template AST.
        # the context where the template is defined is irrelevant.
        createRuntime: (context, args) -> new (require './StaticExpression') value:args[0]
    "templateApply":
        createRuntime: (context, args) ->
            templateVar = context.getVariableExpression name = args[0]
            templateAst = templateVar?.value
            throw new Error "Invalid template: #{name}" unless templateAst?
            return context.createRuntime templateAst
    "ref":
        createRuntime: (context, args) ->
            context.getVariableExpression args[0]
    "predicate":
        newInputContext: true
        runtime: './NewContextExpression'
        evaluate: (left, right) -> if right then left else undefined
    "local":
        # a local expression, usually of the format alpha.(x+y)
        newInputContext: true
        runtime: './NewContextExpression'
        evaluate: (left, right) -> right
    "member":
        runtime: './MemberExpression'
    "null":
        evaluate: -> null
    "call":
        observe: 1
        evaluate: (fn, thisArg, args...) ->
            # on nodejs these errors are not logged anywhere if we don't log them
            # process.on 'uncaughtException' doesn't seem to work either
            try
                fn?.apply thisArg, args
            catch e
                console.error e.stack ? e
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
        evaluate: (condition, a, b) -> if condition then a else b
    "?":
        evaluate: (a, b) -> a ? b
    "!":
        evaluate: (a) -> !a
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
    "input":
        evaluate: (delta) -> @getInput delta
    "output":
        evaluate: (delta) -> @getOutput delta

for key, properties of ops
    properties.op = key
    Operation[key] = new Operation properties

Operation.getOperation = getOperation = (op) ->
    operation = Operation[op]
    throw new Error "Operation not found #{op}" unless operation?
    return operation
