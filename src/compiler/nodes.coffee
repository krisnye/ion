{addStatement} = require "./astFunctions"

getVariablesFromStatements = (statements) ->
    return [] if not statements?
    variables = (statement for statement in statements when statement.type is 'VariableDeclaration')
    return variables

module.exports =
    BlockStatement: blockStatement =
        newScope: true
        getVariables: (node) -> getVariablesFromStatements node.body
        addStatement: addStatement
    Program: blockStatement
    ForInStatement:
        newScope: true
        getVariables: (node) -> [node.left].concat getVariablesFromStatements node.body
        addStatement: addStatement
    FunctionExpression:
        newScope: true
        getVariables: (node) -> return node.params
