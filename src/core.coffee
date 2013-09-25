
lineDelimiter = "\n"
isEmpty = (s) -> not s? or s.length is 0 or (s.trim? and s.trim().length is 0)
getIndent = (s) -> /^[ ]*/.exec(s)[0].length
splitLines = (s) -> s.split lineDelimiter
joinLines = (array) -> array.join lineDelimiter
unindent = (s) ->
    lines = splitLines s.trimRight()
    minIndent = Number.MAX_VALUE
    for line in lines
        if (!isEmpty(line))
            minIndent = Math.min(minIndent, getIndent(line))
    for line, i in lines
        trim = if isEmpty(line) then getIndent(line) else minIndent
        lines[i] = line.substring(trim)
    return joinLines lines

module.exports =
    indentToken: "{{{{"
    outdentToken: "}}}}"
    splitLines: splitLines
    joinLines: joinLines
    getIndent: getIndent
    unindent: unindent
