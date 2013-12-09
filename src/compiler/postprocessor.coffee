core = require './core'
Operation = require '../runtime/Operation'

class ParseError extends Error
    constructor: (@message, @line, @column) ->
    toString: -> @message

assignAddIndexes = (node, depthStack = [0], addIndexesEnabled = true) ->
    if node?.op?
        operation = Operation.getOperation node.op
        if operation.addIndex and addIndexesEnabled
            index = ++depthStack[depthStack.length - 1]
            # push this index value into the operation args
            node.args.push index
        # for loops turn off add indexes, but objects turn them back on
        if operation.addIndexesEnabled?
            addIndexesEnabled = operation.addIndexesEnabled
        if operation.newOutputContext
            depthStack.push [0]
        if node?.args?
            for child in node.args when child?
                assignAddIndexes child, depthStack, addIndexesEnabled
        if operation.newOutputContext
            depthStack.pop()

    return

reservedVarWords =
    key: true
checkForReservedWords = (node) ->
    if (node.op is "var" && reservedVarWords[node.args[0]])
        throw new ParseError "'#{node.args[0]}' is a reserved word.", node.line, node.column

addThisArgToFunctionCalls = (node) ->
    if node.op is "call"
        left = node.args[0]
        thisArg = if left?.op is "member" then left.args[0] else null
        # insert the thisArg first
        node.args.unshift thisArg

# checkForTemplateCalls = (node, stack, variables) ->
#     if node.op is 'call' and node.args[1]?.op is 'ref'
#         name = node.args[1].args[0]
#         variable = variables[name]
#         if variable?.op is Operation.templateDef.toString()
#             # remove the first argument (thisArg)
#             node.args.shift()
#             # change ref to just the template id
#             node.args[0] = name
#             # convert from function call to template apply
#             node.op = Operation.templateApply.toString()
#             console.log 'template call-------- ' + name

module.exports =
    foreachNode: foreachNode = (node, callback, stack = [], variables = {}) ->
        if node?
            if node.op?
                if node.op is 'var'
                    variables[node.args[0]] = node.args[1]
                stack.push node
                callback node, stack, variables
                children = if Array.isArray node then node else node.args
                if children?
                    for child in children
                        foreachNode child, callback, stack, variables
                stack.pop()
        return
    postprocess: postprocess = (ast) ->
        assignAddIndexes ast
        foreachNode ast, checkForReservedWords
        foreachNode ast, addThisArgToFunctionCalls
        return ast
