
# this ion function call should be replaced by the ion/builder with a parsed AST expression1
exports.ion = ion '@width * @height'
exports.test = ->
    # this makes sure that the inline compile time ion expression parser is working
    if (result = JSON.stringify exports.ion) isnt expected = '{"op":"*","args":[{"op":"member","args":[{"op":"output","args":[0]},"width"]},{"op":"member","args":[{"op":"output","args":[0]},"height"]}]}'
        throw new Error "#{result} != #{expected}"

