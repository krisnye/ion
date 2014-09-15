basicTraverse = require './traverse'
nodes = require './nodes'
{addStatement} = require "./astFunctions"

trackVariableDeclaration = (context, node, kind, name = node.name) ->
    scope = context.scope()
    if not scope?
        return
    variable =
        kind: kind
        id:
            type: 'Identifier'
            name: name
        name: name
        node: node
        scope: scope
    context.variableCallback?(variable, context)
    scope.variables[name] = variable

trackVariableDeclarations = (context, node, kind = 'let') ->
    if Array.isArray node
        for item in node
            trackVariableDeclarations context, item, kind
    else
        if node.type is 'FunctionDeclaration'
            kind = 'const'
            if node.id?
                trackVariableDeclarations context, node.id, kind
        else if node.type is 'VariableDeclaration'
            kind = node.kind
            for declarator in node.declarations
                trackVariableDeclarations context, declarator.id, kind
        else if node.type is "Identifier"
            trackVariableDeclaration context, node, kind
        else if node.type is "ObjectPattern"
            basicTraverse.traverse node, (child, newContext) ->
                if child.key? and child.value?
                    name = child.key.value ? child.key.name
                    trackVariableDeclaration context, child, kind, name
                    newContext.skip()
        else if node.type is "ArrayPattern"
            basicTraverse.traverse node, (child, newContext) ->
                if child.type is 'Identifier'
                    trackVariableDeclaration context, child, kind
                    newContext.skip()

exports.traverse = (program, enterCallback, exitCallback, variableCallback, previousContext) ->
    ourEnter = (node, context) ->
        context.variableCallback ?= variableCallback
        context.scopeStack ?= []
        context.scope ?= -> @scopeStack[@scopeStack.length - 1]
        context.ancestorNodes ?= []
        context.getAncestor ?= (predicate) ->
            for ancestor in @ancestorNodes by -1
                if predicate ancestor
                    return ancestor
            return null
        context.rootNode ?= -> @ancestorNodes[0]
        context.parentNode ?= -> @ancestorNodes[@ancestorNodes.length - 1]
        context.parentScope ?= -> @scopeStack[@scopeStack.length - 2]
        context.parentReactive ?= -> @_reactiveStack[@_reactiveStack.length - 1]
        context.isParentBlock ?= -> nodes[@parentNode()?.type]?.isBlock ? false
        context.getVariableInfo ?= (id) -> @scope().variables[id]
        context._variableCounts ?= previousContext?._variableCounts ? {}
        context.getNewInternalIdentifier ?= (prefix = '_ref') ->
            counts = @_variableCounts
            count = counts[prefix] ?= 1
            counts[prefix]++
            name = if count is 1 then prefix else prefix + count
            return {type:'Identifier',name:name}
        context.getAncestorChildOf ?= (ancestor) ->
            index = @ancestorNodes.indexOf ancestor
            return if index >= 0 then @ancestorNodes[index + 1] ? @current() else undefined
        context.getSharedVariableId ?= (name) ->
            return @getVariableInfo(name)?.id ? @addVariable({id:name,offset:Number.MIN_VALUE})
        context.addStatement ?= (statement, offset, addToNode) ->
            if typeof statement is 'number'
                [statement, offset] = [offset, statement]
            addToNode ?= @scope().node
            trackVariableDeclarations context, statement
            addStatement addToNode, statement, @getAncestorChildOf(addToNode), offset
        context.addVariable ?= (options) ->
            variable = @getVariable options
            @addStatement variable, options.offset
            return variable.declarations[0].id
        context.getVariable ?= (options) ->
            options ?= {}
            if typeof options.id is 'string'
                options.id =
                    type: 'Identifier'
                    name: options.id
            options.id ?= @getNewInternalIdentifier(options.prefix)
            options.kind ?= 'let'
            # handle patterns.
            variable =
                type: "VariableDeclaration"
                declarations: [{
                    type: "VariableDeclarator"
                    id: options.id
                    init: options.init
                }]
                kind: options.kind
            return variable
        context.error = (message, node) ->
            node ?= @current()
            # make sure node has line/column numbers or else search up stack
            e = new Error(message)
            e.line = node.loc?.start?.line
            e.column = node.loc?.start?.column + 1
            e.lineEnd = node.loc?.end?.line
            e.columnEnd = node.loc?.end?.column + 1
            return e
        if node.type?
            nodeInfo = nodes[node.type]
            if nodeInfo?.reactive?
                (context._reactiveStack ?= []).push context.reactive
                context.reactive = nodeInfo.reactive
            if nodeInfo?.newScope
                context.scopeStack.push
                    variables: Object.create(context.scope()?.variables ? {})
                    node: node
            if Array.isArray(node.body)
                trackVariableDeclarations context, node.body
            if nodeInfo?.isFunction
                trackVariableDeclarations context, node.params, nodeInfo.paramKind
            else if node.type is 'ForInStatement' or node.type is 'ForOfStatement'
                trackVariableDeclarations context, node.left
            else if node.type is 'ObjectExpression'
                trackVariableDeclarations context, node.properties
            enterCallback?(node, context)
            context.ancestorNodes.push node
    ourExit = (node, context) ->
        if node.type?
            nodeInfo = nodes[node.type]
            if nodeInfo?.reactive?
                context.reactive = context._reactiveStack.pop()
            context.ancestorNodes.pop()
            exitCallback?(node, context)
            if nodeInfo?.newScope
                context.scopeStack.pop()

    basicTraverse.traverse program, ourEnter, ourExit

# exports.test = ->
#     index = require './index'
#     ast = index.parse """
#         var double = ->
#             var foo = -> 2
#             var a = 1
#             var b = 2
#             var {e,f} = bar, [g,[h]] = baz
#             if a is b
#                 var c = 3
#                 if c
#                     log(c)
#             else
#                 var c = 5
#                 var d = 4
#                 log(d)
#         """
#     expected = ["enter",1,["double"],"Program","enter",2,["double"],"FunctionExpression","enter",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",2,["double"],"FunctionExpression","exit",1,["double"],"Program"]
#     actual = []
#     enter = (node, context) ->
#         keys = (key for key of context.scope().variables)
#         if nodes[node.type]?.newScope
#             actual.push "enter", context.scopeStack.length, keys, node.type
#     exit = (node, context) ->
#         keys = (key for key of context.scope().variables)
#         if nodes[node.type]?.newScope
#             actual.push "exit", context.scopeStack.length, keys, node.type
#     exports.traverse ast, enter, exit
#     if JSON.stringify(actual) isnt JSON.stringify(expected)
#         throw new Error "#{actual} isnt #{expected}"
#     return
