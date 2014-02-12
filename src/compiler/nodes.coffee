
getVariablesFromStatements = (statements) ->
    return [] if not statements?
    variables = (statement for statement in statements when statement.type is 'VariableDeclaration')
    return variables

module.exports =
    BlockStatement: blockStatement =
        isBlock: true
        newScope: true
        getVariables: (node) -> getVariablesFromStatements node.body
    Program: blockStatement
    ForInStatement:
        newScope: true
        getVariables: (node) -> [node.left].concat getVariablesFromStatements node.body
    FunctionExpression:
        newScope: true
        getVariables: (node) -> return node.params
