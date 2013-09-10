lineParser = require './lineParser'

indentSize = 2
getIndent = (text) ->
    spaces = 0
    for i in [0..text.length] when text[i] is ' '
        spaces++
    return spaces / indentSize

class Line
    constructor: (@raw, @number) ->
        @text = @raw
        @isEmpty = @text.trim().length == 0
        @indent = getIndent @text
    toString: -> @text

parse = (text) ->
    console.log '-----------------------------------------'
    # make sure there are NO tabs in the text
    lines = []
    for line, index in text.split "\r\n"
        lines.push new Line line, index + 1
    value = getValue lines, undefined, root = true
    console.log JSON.stringify value, null, '  '
    return value
    # infer type based upon keyValues, either array or object
    # unless first item is a type, then this is that type

parseLinesToKeyValues = (lines) ->
    results = []
    while lines.length > 0
        result = parseNextObject lines
        if result isnt undefined
            results.push result
    return results

getValue = (childLines, type, root) ->
    if childLines.some((x) -> not x.isEmpty)
        # is the content a string literal?
        if typeof type is 'string' and type?.length is 0
            console.log 'string literal'
        else
            # parse the lines
            childKeyValues = parseLinesToKeyValues childLines
            if childKeyValues.every((x) -> x.hasOwnProperty('key'))
                value = {}
                value.$ = type if type?
                for child in childKeyValues
                    value[child.key] = child.value
            else if childKeyValues.every((x) -> not x.hasOwnProperty('key'))
                # if this is the root, then we consider a single item
                # to not be an array
                if root and childKeyValues.length is 1
                    value = childKeyValues[0].value
                else
                    value = []
                    for child in childKeyValues
                        value.push child.value
            else
                console.log 'TODO: mixed key children? TABLE format'
    return value

parseNextObject = (lines) ->
    # skip any empty lines from the start
    while lines[0]?.isEmpty
        lines.shift()
    # parse the next line
    first = lines.shift()
    return undefined unless first?
    try
        parsed = lineParser.parse first.toString()
        Object.defineProperty parsed, 'line', {value:first}
    catch e
        throw new Error "line #{first.number}: #{first}\n" + e
    # now lets consume all lines that are indented more than us
    childLines = []
    while lines.length > 0 and (lines[0].isEmpty or lines[0].indent > first.indent)
        childLines.push lines.shift()

    value = getValue childLines, parsed.value
    if value isnt undefined
        parsed.value = value
    else if parsed.value is undefined
        parsed.value = {}

    console.log 'parse lines: ' + JSON.stringify parsed
    return parsed

ion =
    parse: parse

if typeof module is 'undefined'
    #   global.ion
    do -> this.ion = ion
else
    #   nodejs module
    module.exports = ion

    if require.main is module
        fs = require 'fs'
        args = process.argv.slice 2
        if args.length is 0
            return console.log 'Usage: ion file.ion'
        content = fs.readFileSync args[0], 'utf8'
        object = ion.parse content
        console.log JSON.stringify object, null, '    '