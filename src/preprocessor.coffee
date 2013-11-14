core = require './core'

getSpace = (size) ->
    result = []
    result.push " " for i in [0...size]
    result.join ""

exports.isMarkdownCommented = (source) -> /(\n|^)[^\s\n][^\n]*\n(\s*\n)+\s+[^\s\n]/.test source

exports.preprocess = preprocess = (source, lineMapping) ->
    isMarkdownCommented = exports.isMarkdownCommented source
    baseIndent = if isMarkdownCommented then 1 else 0
    totalIndent = 0
    indentStack = []
    lines = core.splitLines source
    inputLine = 0
    writeLine = (line) ->
        output.push line
        lineMapping?.push inputLine
    outdent = ->
        indentStack.pop()
        totalIndent = indentStack[indentStack.length - 1] ? 0
        if totalIndent >= baseIndent
            writeLine getSpace(totalIndent) + core.outdentToken
    output = []
    for line, index in lines
        inputLine = index
        indent = core.getIndent line
        isEmpty = line.trim().length is 0
        if not isEmpty
            if indent > totalIndent
                if totalIndent >= baseIndent
                    writeLine getSpace(totalIndent) + core.indentToken
                totalIndent = indent
                indentStack.push indent
            else
                while indent < totalIndent
                    outdent()

        comment = isMarkdownCommented and indent is 0 and not isEmpty
        if not comment
            writeLine line
    # push any remaining outdents
    while indentStack.length > 0
        outdent()

    return core.unindent core.joinLines output

sample = """

This is a comment.
Anything left justified is a comment.

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
sample2 = """
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
    # first try with the markdown commented sample.
    result = preprocess sample, lineMapping
    if result != expectedResult
        console.log 'result---------------------------------'
        console.log result
        console.log 'expected-------------------------------'
        console.log expectedResult
        throw new Error "Preprocessor result not expected result."
    if JSON.stringify(lineMapping) != "[0,3,4,5,5,6,7,8,8,9,9,10,11,11,12,13,13,14,15,16,17,17,18,18,19,19,19,19,19,19]"
        throw new Error "Unexpected line mapping: " + JSON.stringify lineMapping
    # now try with the uncommented sample.
    result = preprocess sample2, lineMapping
    if result != expectedResult
        console.log 'result---------------------------------'
        console.log result
        console.log 'expected-------------------------------'
        console.log expectedResult
        throw new Error "Preprocessor result not expected result."


