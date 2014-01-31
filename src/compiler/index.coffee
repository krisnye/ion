
preprocessor = require './preprocessor'
parser = require './parser'

exports.parseExpression = (content, options) ->
    sourceMapping = {}
    preprocessed = preprocessor.preprocess content, sourceMapping
    try
        parsed = parser.parse preprocessed, options
    catch e
        console.log '-Preprocessed--------------------------------------------'
        console.log preprocessed
        console.log '-Error---------------------------------------------------'
        console.log JSON.stringify e, null, '    '
        throw e
    return parsed
