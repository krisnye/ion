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

template = (input, name) -> new Template parse(input), name

exports._parse = parse
exports.template = template

exports.add = (container, item) ->
    container.add item
exports.remove = (container, item) ->
    container.remove item

