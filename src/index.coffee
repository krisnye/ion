require 'sugar'
Template = require './Template'
preprocessor = require './preprocessor'
parser = require './parser'

parse = (input) ->
    lineMapping = []
    preprocessed = preprocessor.preprocess input, lineMapping
    # console.log preprocessed
    ast = parser.parse preprocessed
    return ast

template = (input, name) -> new Template parse(input), name

exports._parse = parse
exports.template = template

