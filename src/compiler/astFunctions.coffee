
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
