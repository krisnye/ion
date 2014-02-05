
getVariablesFromStatements = (statements) ->
    return [] if not statements?
    variables = (statement for statement in statements when statement.type is 'VariableDeclaration')
    return variables

addStatement = (node, statement) ->
    body = node.body
    if body.type is "BlockStatement"
        body = body.body
    if not Array.isArray body
        node.body =
            type: "BlockStatement"
            body: body = [node.body]
    body.unshift statement

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
    Function:
        newScope: true
        getVariables: (node) -> return node.params
