'use strict';
const lineDelimiter = '\n';
const isEmpty = function (s) {
    return !(s != null) || s.length === 0 || (s.trim != null ? s.trim().length : void 0) === 0;
};
const indentToken = exports.indentToken = '{{{{';
const outdentToken = exports.outdentToken = '}}}}';
const splitLines = exports.splitLines = function (s) {
        return s.split(lineDelimiter);
    };
const joinLines = exports.joinLines = function (array) {
        return array.join(lineDelimiter);
    };
const getIndent = exports.getIndent = function (s, regex) {
        regex = regex != null ? regex : /^([ ]*)/;
        return (regex.exec(s) != null ? regex.exec(s)[1].length : void 0) != null ? regex.exec(s)[1].length : Number.MAX_VALUE;
    };
const unindentString = exports.unindentString = function (s, sourceMapping) {
        let lines = splitLines(s.trimRight());
        let minIndent = unindentLines(lines);
        if (sourceMapping != null) {
            sourceMapping.columnOffset = minIndent;
        }
        return joinLines(lines);
    };
const getMinIndent = exports.getMinIndent = function (lines, regex) {
        let minIndent = Number.MAX_VALUE;
        for (let _i = 0; _i < lines.length; _i++) {
            let line = lines[_i];
            if (typeof line === 'string' && !isEmpty(line)) {
                minIndent = Math.min(minIndent, getIndent(line, regex));
            }
        }
        return minIndent;
    };
const unindentLines = exports.unindentLines = function (lines) {
        let minIndent = getMinIndent(lines);
        for (let _i = 0; _i < lines.length; _i++) {
            let i = _i;
            let line = lines[_i];
            if (typeof line === 'string') {
                lines[i] = isEmpty(line) ? '' : line.substring(minIndent);
            }
        }
        return minIndent;
    };