basicTraverse = require './traverse'
nodes = require './nodes'
{addStatement} = require "./astFunctions"

trackVariables = (context, nodes) ->
    scope = context.scope()
    trackVariable = (kind, id, init, sourceNode, shadow) ->
        # if scope.variables[id]?
        #     # todo: this needs to be a strongly typed SyntaxError
        #     throw new Error "Cannot redefine: " + id
        scope.variables[id] =
            kind: kind
            id: id
            init: init
            sourceNode: sourceNode

    for node in nodes
        if node.type is "Identifier"
            trackVariable "let", node.name, null, node
        if node.type is "VariableDeclaration"
            for declarator in node.declarations
                idpattern = declarator.id
                # deal with destructuring patterns later
                if idpattern.type is "Identifier"
                    trackVariable node.kind, idpattern.name, declarator.init, node
                else if idpattern.type is "ObjectPattern"
                    basicTraverse.traverse idpattern, (child, newContext) ->
                        if child.key? and child.value?
                            name = child.key.value ? child.key.name
                            trackVariable node.kind, name, declarator.init, node
                            newContext.skip()
                else if idpattern.type is "ArrayPattern"
                    basicTraverse.traverse idpattern, (child, newContext) ->
                        if child.type is 'Identifier'
                            trackVariable node.kind, child.name, declarator.init, node
                            newContext.skip()

exports.traverse = (program, enterCallback, exitCallback) ->
    ourEnter = (node, context) ->
        context.scopeStack ?= []
        context.scope ?= -> @scopeStack[@scopeStack.length - 1]
        context.ancestorNodes ?= []
        context.parentNode ?= -> @ancestorNodes[@ancestorNodes.length - 1]
        context.isParentBlock ?= -> nodes[@parentNode()?.type]?.isBlock ? false
        context.getVariableInfo ?= (id) -> @scope().variables[id]
        context.getNewInternalIdentifier ?= (prefix = '_ref') ->
            i = 1
            while true
                check = prefix + (if i is 1 then "" else i)
                if @getVariableInfo(check) is undefined
                    return {type:'Identifier',name:check}
        context.addStatement ?= (statement, offset) ->
            addStatement @parentNode(), statement, @current(), offset
        context.addVariable ?= (pattern, init, kind = 'let') ->
            pattern ?= @getNewInternalIdentifier()
            sourceNode = @scope().sourceNode
            nodeInfo = nodes[sourceNode.type]
            # handle patterns.
            variable =
                type: "VariableDeclaration"
                declarations: [{
                    type: "VariableDeclarator"
                    id: pattern
                    init: init
                }]
                kind: kind
            addStatement sourceNode, variable
            trackVariables context, [variable]
            return pattern

        if node.type?
            nodeInfo = nodes[node.type]
            if nodeInfo?.newScope
                context.scopeStack.push
                    variables: Object.create(context.scope()?.variables ? {})
                    sourceNode: node
            if nodeInfo?.getVariables?
                trackVariables context, nodeInfo.getVariables node
            enterCallback?(node, context)
            context.ancestorNodes.push node
    ourExit = (node, context) ->
        if node.type?
            nodeInfo = nodes[node.type]
            context.ancestorNodes.pop()
            exitCallback?(node, context)
            if nodeInfo?.newScope
                context.scopeStack.pop()

    basicTraverse.traverse program, ourEnter, ourExit

exports.test = ->
    index = require './index'
    ast = index.parse """
        var double = ->
            var foo = -> 2
            var a = 1
            var b = 2
            var {e,f} = bar, [g,[h]] = baz
            if a is b
                var c = 3
                if c
                    log(c)
            else
                var c = 5
                var d = 4
                log(d)
        """
    expected = ["enter",1,["double"],"Program","enter",2,["double"],"FunctionExpression","enter",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",2,["double"],"FunctionExpression","exit",1,["double"],"Program"]
    actual = []
    enter = (node, context) ->
        keys = (key for key of context.scope().variables)
        if nodes[node.type]?.newScope
            actual.push "enter", context.scopeStack.length, keys, node.type
    exit = (node, context) ->
        keys = (key for key of context.scope().variables)
        if nodes[node.type]?.newScope
            actual.push "exit", context.scopeStack.length, keys, node.type
    exports.traverse ast, enter, exit
    if JSON.stringify(actual) isnt JSON.stringify(expected)
        throw new Error "#{actual} isnt #{expected}"
    return
