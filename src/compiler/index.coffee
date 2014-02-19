
makePrettyError = (e, source, id) ->
    if typeof e.line is 'number' and typeof e.column is 'number' and e.line > 0 and e.column > 0
        line = source.split('\n')[e.line - 1]
        caret = "^"
        for i in [2..e.column] by 1
            caret = " " + caret
        newMessage = "#{if id? then id + ':' else ''}#{e.line}:#{e.column}\n#{e.message}\n#{line}\n#{caret}"
        e.originalMessage = e.message
        e.message = newMessage

exports.parse = parse = (content, options) ->
    options ?= {}
    options.generate = false
    return compile content, options

exports.compile = compile = (content, options) ->
    options ?= {}
    preprocessor = require './preprocessor'
    parser = require './parser'
    postprocessor = require './postprocessor'
    escodegen = require 'escodegen'
    sourceMapping = {}
    result = preprocessed = preprocessor.preprocess content, sourceMapping
    try
        result = parser.parse result, options ? {}
        result = preprocessor.fixSourceLocations result, sourceMapping
        if options.postprocess isnt false
            result = postprocessor.postprocess result, options
            if options?.generate isnt false
                result = escodegen.generate result
    catch e
        preprocessor.fixSourceLocation e, sourceMapping
        console.log '-Preprocessed--------------------------------------------'
        console.log preprocessed
        makePrettyError e, content
        throw e
    return result
