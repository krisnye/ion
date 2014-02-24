
exports.traverse = (graph, enterCallback, exitCallback) ->
    result = graph
    skip = false
    removed = 0
    context =
        path: []
        ancestors: []
        # skip traversing children of current node?
        skip: -> skip = true
        key: -> @path[@path.length - 1]
        parent: -> @ancestors[@ancestors.length - 1]
        remove: (node) ->
            if not node?
                throw new Error "You must specify the node to remove"
            parent = @parent()
            if Array.isArray parent
                index = parent.indexOf node
                parent.splice index, 1
                removed++
            else
                delete parent[@key()]
        replace: (value) ->
            if value is undefined
                throw new Error "You must specify a replacement value"
            parent = @parent()
            if parent?
                parent[@key()] = value
            else
                result = value
        current: ->
            parent = @parent()
            if parent?
                return parent[@key()]
            else
                return result
    traverseNode = (node) ->
        if node? and typeof node is 'object'
            enterCallback?(node, context)
            if skip
                skip = false
            else
                # node may have been changed, in which case we have to get the new value
                newNode = context.current()
                if newNode isnt node
                    exitCallback?(node, context)
                    node = newNode
                    if node?
                        enterCallback?(node, context)
                if node? and typeof node is 'object'
                    context.ancestors.push node
                    if Array.isArray node
                        index = 0
                        while index < node.length
                            value = node[index]
                            context.path.push index
                            traverseNode value
                            context.path.pop()
                            index++
                            if removed > 0
                                index -= removed
                                removed = 0
                    else
                        for key, value of node
                            context.path.push key
                            traverseNode value
                            context.path.pop()
                    context.ancestors.pop()
            if node?
                exitCallback?(node, context)
    traverseNode graph
    return result

exports.test = ->
    graph =
        id: 'root'
        alpha: 1
        beta:
            id: 'beta'
            charlie: 2
            delta: 3
        echo:
            id: 'echo'
            foxtrot: 1
    # test basic call returns root graph
    throw new Error "traverse should have returned graph" unless graph is exports.traverse(graph, ->)
    # test that replacing root node returns new value
    throw new Error "traverse should have returned 2" unless 2 is exports.traverse(graph, (node, context) -> context.replace(2))
    # # test that traversal and replacement and skip works
    # result = []
    # exports.traverse graph, (node, context) ->
    #     result.push node.id
    #     result.push context.key()
    #     result.push context.parent()?.id
    #     if node.id is 'beta'
    #         context.replace
    #             id: 'foo'
    #             bar:
    #                 id: 'baz'
    #                 skipMe:
    #                     value: 1
    #     else if node.id is 'baz'
    #         context.skip()

    # expected = ["root", undefined, undefined, "beta", "beta", "root", "baz", "bar", "foo", "echo", "echo", "root"]
    # throw new Error "#{result} != #{expected}" unless JSON.stringify(result) is JSON.stringify(expected)
    # return
