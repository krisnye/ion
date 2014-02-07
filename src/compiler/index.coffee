
exports.parse = parse = (content, options) ->
    preprocessor = require './preprocessor'
    parser = require './parser'
    try
        sourceMapping = {}
        preprocessed = preprocessor.preprocess content, sourceMapping
        parsed = parser.parse preprocessed, options ? {}
        fixed = preprocessor.fixSourceLocations parsed, sourceMapping
    catch e
        console.log '-Preprocessed--------------------------------------------'
        console.log preprocessed
        console.log '-Error---------------------------------------------------'
        console.log "line: " + e.line + ", column: " + e.column
        throw e
    return fixed

exports.compile = compile = (content, options) ->
    postprocessor = require './postprocessor'
    escodegen = require 'escodegen'
    program = parse content, options
    program = postprocessor.postprocess program, options
    javascript = escodegen.generate program
    return javascript
