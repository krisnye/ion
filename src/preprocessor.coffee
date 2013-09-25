core = require './core'

getSpace = (size) ->
    result = []
    result.push " " for i in [0...size]
    result.join ""

exports.preprocess = preprocess = (source, lineMapping) ->
    totalIndent = 0
    indentStack = []
    lines = core.splitLines source
    inputLine = 0
    writeLine = (line) ->
        output.push line
        lineMapping?.push inputLine
    outdent = ->
        indentStack.pop()
        totalIndent = indentStack[indentStack.length - 1]
        writeLine getSpace(totalIndent) + core.outdentToken
    output = []
    for line, index in lines
        inputLine = index
        indent = core.getIndent line
        if indent > totalIndent
            writeLine getSpace(totalIndent) + core.indentToken
            totalIndent = indent
            indentStack.push indent
        else
            while indent < totalIndent
                outdent()
        writeLine line
    # push any remaining outdents
    while totalIndent > 0
        outdent()

    return core.joinLines output

sample = """
Person
    name: "Alpha"
    age: 40
    children:
        Person
            name: "Beta"
            age: 1
        Person
            name: "Charlie"
            age: 2
            description: ""
                    This is just a
                sample indented multiline
                string literal.
"""
expectedResult = """
Person
{{{{
    name: "Alpha"
    age: 40
    children:
    {{{{
        Person
        {{{{
            name: "Beta"
            age: 1
        }}}}
        Person
        {{{{
            name: "Charlie"
            age: 2
            description: ""
            {{{{
                    This is just a
            }}}}
                sample indented multiline
            {{{{
                string literal.
            }}}}
        }}}}
    }}}}
}}}}
"""
exports.test = ->
    lineMapping = []
    result = preprocess sample, lineMapping
    if result != expectedResult
        console.log JSON.stringify result
        console.log JSON.stringify expectedResult
        throw new Error "Preprocessor result not expected result."
    if JSON.stringify(lineMapping) != "[0,1,1,2,3,4,4,5,5,6,7,7,8,8,9,10,11,11,12,12,13,13,13,13,13,13]"
        throw new Error "Unexpected line mapping: " + JSON.stringify lineMapping
