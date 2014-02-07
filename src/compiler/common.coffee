lineDelimiter = "\n"
isEmpty = (s) -> not s? or s.length is 0 or (s.trim? and s.trim().length is 0)

module.exports = exports =
    indentToken: indentToken = "{{{{"
    outdentToken: outdentToken = "}}}}"
    splitLines: splitLines = (s) -> s.split lineDelimiter
    joinLines: joinLines = (array) -> array.join lineDelimiter
    getIndent: getIndent = (s, regex) ->
        regex ?= /^([ ]*)/
        return regex.exec(s)?[1].length ? Number.MAX_VALUE
    unindentString: unindentString = (s, sourceMapping) ->
        lines = splitLines s.trimRight()
        minIndent = unindentLines lines
        sourceMapping?.columnOffset = minIndent
        return joinLines lines
    getMinIndent: getMinIndent = (lines, regex) ->
        minIndent = Number.MAX_VALUE
        for line in lines when typeof line is 'string' and not isEmpty line
            minIndent = Math.min(minIndent, getIndent(line, regex))
        return minIndent
    unindentLines: unindentLines = (lines) ->
        minIndent = getMinIndent lines
        for line, i in lines when typeof line is 'string'
            lines[i] = if isEmpty(line) then "" else line.substring(minIndent)
        return minIndent
