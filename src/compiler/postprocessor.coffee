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

exports.postprocess = (program, options) ->
    steps = [
        [extractForLoopRightVariable, callFunctionBindForFatArrows]
        [createForInLoopValueVariable, convertForInToForLength]
        [convertObjectExpressionToArrayExpression]
    ]
    for traversal in steps
        traverse program, (node, context) ->
            for step in traversal
                step node, context, options
    program
