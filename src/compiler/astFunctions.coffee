
exports.addStatement = (node, statement, index = 0) ->
    body = node.body
    if body.type is "BlockStatement"
        body = body.body
    if not Array.isArray body
        node.body =
            type: "BlockStatement"
            body: body = [node.body]
    body.unshift statement
