core = require './core'
Operation = require './reactive/Operation'

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

exports.postprocess = postprocess = (ast) ->
    assignAddIndexes ast
    return ast
