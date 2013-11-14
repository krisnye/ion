Construct = require './Construct'

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
    "call": {}
    "object":
        addIndexesEnabled: true
        runtime: './ObjectExpression'
    "var":
        runtime: './VariableDefinition'
    "ref":
        createRuntime: (context, args) ->
            name = args[0]
            while context?
                variable = context.variables[name]
                return variable if variable?
                context = context.parent
            throw new Error "Variable not found: #{@name}"
    "predicate":
        newInputContext: true
        runtime: './NewContextExpression'
        evaluate: (left, right) -> if right then left else undefined
    "local":
        newInputContext: true
        # a local expression, usually of the format alpha.(x+y)
        runtime: './NewContextExpression'
        evaluate: (left, right) -> right
    "member":
        newInputContext: true
        runtime: './NewContextExpression'
        observeLeftValue: true
        evaluate: (left, right) ->
            value = left?[right]
            if typeof value is 'function'
                value = value.bind left
            return value
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
    "global":
        evaluate: -> global
    "root":
        evaluate: do ->
            getRoot = (context) ->
                if context.parent?
                    getRoot(context.parent)
                else
                    context.input
            return -> getRoot @
    "ancestor":
        evaluate: (delta) ->
            context = @
            while delta > 0 and context?
                context = context.parent
                delta--
            return context.input

for key, properties of ops
    properties.op = key
    Operation[key] = new Operation properties

Operation.getOperation = getOperation = (op) ->
    operation = Operation[op]
    throw new Error "Operation not found #{op}" unless operation?
    return operation
Operation.createRuntimes = (context, astArray) ->
    astArray.map (arg) -> Operation.createRuntime context, arg
Operation.createRuntime = (context, ast) ->
    op = ast?.op
    return new (require './StaticExpression') {value:ast} unless op?
    operation = getOperation op
    return operation.createRuntime context, ast.args
