{traverse} = require './traverseAst'

exports.postprocess = (program) ->
    traverse program, (node, context) ->
        if node.type is 'ForInStatement' and node.value?
            context.addVariable node.value,
                type: "MemberExpression"
                computed: true
                object: node.right #right needs to be id
                property: node.left
    program
