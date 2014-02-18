
exports.addStatement = (node, statement, index, offset) ->
    body = node.body
    if body.type is "BlockStatement"
        body = body.body
    if not Array.isArray body
        node.body =
            type: "BlockStatement"
            body: body = [node.body]
    # clamp index from zero to length
    if not index?
        index = 0
    else if index.type?
        index = body.indexOf(index) + (offset ? 1)
    index = Math.max(0, Math.min(index, body.length))
    body.splice index, 0, statement

# traverses the pattern and finds every destructuring assignment
# the first callback argument is the identifier to assign to
# the second callback argument is the expression used to extract the value
exports.forEachDestructuringAssignment = forEachDestructuringAssignment = (pattern, expression, callback) ->
    if pattern.type is 'Identifier'
        callback pattern, expression
    else if pattern.properties?
        for {key,value} in pattern.properties
            forEachDestructuringAssignment value, {
                type: 'MemberExpression'
                object: expression
                property: key
                computed: key.type isnt 'Identifier'
                }, callback
    else if pattern.elements?
        for value, index in pattern.elements
            forEachDestructuringAssignment value, {
                type: 'MemberExpression'
                object: expression
                property:
                    type: 'Literal'
                    value: index
                computed: true
                }, callback
