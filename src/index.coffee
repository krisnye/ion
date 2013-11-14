require 'sugar'
Template = require './Template'
preprocessor = require './preprocessor'
postprocessor = require './postprocessor'
parser = require './parser'

parse = (input) ->
    lineMapping = []
    preprocessed = preprocessor.preprocess input, lineMapping
    # console.log preprocessed
    ast = parser.parse preprocessed
    postprocessed = postprocessor.postprocess ast
    return postprocessed

exports.parseStatement = parse
exports.parseExpression = (input) ->
    ast = parse input
    # the only statement should be a single add statement
    throw new Error "Expected a single expression:\n#{input}" unless ast.op is 'add'
    return ast.args[0]

Context = require './runtime/Context'
Operation = require './runtime/Operation'
exports.createRuntime = (ast, input, output, options) ->
    context = new Context input, output
    runtime = Operation.createRuntime context, ast
    return runtime

exports.count = (container) -> container.length ? 0
exports.add = (container, item, index, context) ->
    if index? and container.splice?
        container.splice index, 0, item
    else
        container.add item
exports.remove = (container, item) ->
    container.remove item
exports.is = (instance, type) ->
    return false unless instance?
    return true unless type?
    if typeof instance.is is 'function'
        return instance.is type
    return instance instanceof type
