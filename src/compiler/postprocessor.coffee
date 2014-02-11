{traverse} = require './traverseAst'
{addStatement} = require "./astFunctions"

extractForLoopRightVariable = (node, context) ->
    if node.type is 'ForOfStatement' or node.type is 'ForInStatement' and node.left.declarations.length > 1
        if node.left.declarations.length > 2
            throw new Error "too many declarations"
        right = node.right
        if right.type isnt "Identifier"
            ref = context.getNewInternalIdentifier()
            node.right = ref
            context.replace
                type: "BlockStatement"
                body: [
                    {type:"VariableDeclaration",declarations:[{type:"VariableDeclarator",id:ref,init:right}],kind:"let"}
                    node
                ]

createForInLoopValueVariable = (node, context) ->
    if node.type is 'ForInStatement' and node.left.declarations.length > 1
        valueDeclarator = node.left.declarations[1]
        context.addVariable valueDeclarator.id,
            type: "MemberExpression"
            computed: true
            object: node.right #right needs to be id
            property: node.left.declarations[0].id

convertForInToForLength = (node, context) ->
    if node.type is 'ForOfStatement'
        index = node.left.declarations[1]?.id
        if not index?
            index = context.getNewInternalIdentifier "_i"

        addStatement node,
            type:"VariableDeclaration"
            declarations:[
                {
                    type:"VariableDeclarator"
                    id: node.left.declarations[0].id
                    init:
                        type: "MemberExpression"
                        object: node.right
                        property: index
                        computed: true
                }
            ]
            kind:"let"

        context.replace
            type: 'ForStatement'
            init:
                type:"VariableDeclaration"
                declarations:[
                    { type:"VariableDeclarator",id:index,init:{ type:"Literal", value:0 } }
                ]
                kind:"let"
            test:
                type: "BinaryExpression"
                operator: "<"
                left: index
                right:
                    type: "MemberExpression"
                    object: node.right
                    property: { type: "Identifier", name: "length" }
                    computed: false
            update:
                type: "UpdateExpression"
                operator: "++"
                argument: index
                prefix: false
            body: node.body

callFunctionBindForFatArrows = (node, context) ->
    if node.type is "FunctionExpression" and node.bound
        delete node.bound
        context.replace
            type: "CallExpression"
            callee:
                type: "MemberExpression"
                object: node
                property:
                    type: "Identifier"
                    name: "bind"
            arguments: [ { type:"ThisExpression" } ]

convertObjectExpressionToArrayExpression = (node, context) ->
    if node.type is "ObjectExpression" and node.objectType?.type is "ArrayExpression"
        node.type = "ArrayExpression"
        node.elements = node.properties.map (x) -> x.expression
        delete node.properties

nodejsModules = (node, context) ->
    # convert ImportExpression{name} into require(name)
    if node.type is 'ImportExpression'
        node.type = 'CallExpression'
        node.callee =
            type: 'Identifier'
            name: 'require'
        node.arguments = [node.name]
        delete node.name
    else if node.type is 'ExportStatement'
        if node.value.type is 'VariableDeclaration'
            # variable export
            context.exports = true
            # replace this node with the VariableDeclaration
            context.replace node.value
            # then add an export statements after this
            for declarator in node.value.declarations by -1
                if not declarator.init?
                    throw new Error "Export variables must have an init value"
                context.addStatement
                    type: 'ExpressionStatement'
                    expression:
                        type: 'AssignmentExpression'
                        operator: '='
                        left:
                            type: 'MemberExpression'
                            object:
                                type: 'Identifier'
                                name: 'exports'
                            property: declarator.id
                        right: declarator.id
        else
            # default export
            console.log 'default------------------- ' + context.exports
            if context.exports
                throw new Error "default export must be first"
            context.replace
                type: 'ExpressionStatement'
                expression:
                    type: 'AssignmentExpression'
                    operator: '='
                    left:
                        type: 'MemberExpression'
                        object:
                            type: 'Identifier'
                            name: 'module'
                        property:
                            type: 'Identifier'
                            name: 'exports'
                    right:
                        type: 'AssignmentExpression'
                        operator: '='
                        left:
                            type: 'Identifier'
                            name: 'exports'
                        right: node.value

exports.postprocess = (program, options) ->
    steps = [
        [extractForLoopRightVariable, callFunctionBindForFatArrows]
        [createForInLoopValueVariable, convertForInToForLength]
        [convertObjectExpressionToArrayExpression, nodejsModules]
    ]
    for traversal in steps
        traverse program, (node, context) ->
            for step in traversal
                step node, context, options
    program
