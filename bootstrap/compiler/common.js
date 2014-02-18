(function(){var _ion_compiler_common_ = function(module,exports,require){var exports, getIndent, getMinIndent, indentToken, isEmpty, joinLines, lineDelimiter, outdentToken, splitLines, unindentLines, unindentString;

lineDelimiter = "\n";

isEmpty = function(s) {
  return (s == null) || s.length === 0 || ((s.trim != null) && s.trim().length === 0);
};

module.exports = exports = {
  indentToken: indentToken = "{{{{",
  outdentToken: outdentToken = "}}}}",
  splitLines: splitLines = function(s) {
    return s.split(lineDelimiter);
  },
  joinLines: joinLines = function(array) {
    return array.join(lineDelimiter);
  },
  getIndent: getIndent = function(s, regex) {
    var _ref, _ref1;
    if (regex == null) {
      regex = /^([ ]*)/;
    }
    return (_ref = (_ref1 = regex.exec(s)) != null ? _ref1[1].length : void 0) != null ? _ref : Number.MAX_VALUE;
  },
  unindentString: unindentString = function(s, sourceMapping) {
    var lines, minIndent;
    lines = splitLines(s.trimRight());
    minIndent = unindentLines(lines);
    if (sourceMapping != null) {
      sourceMapping.columnOffset = minIndent;
    }
    return joinLines(lines);
  },
  getMinIndent: getMinIndent = function(lines, regex) {
    var line, minIndent, _i, _len;
    minIndent = Number.MAX_VALUE;
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      line = lines[_i];
      if (typeof line === 'string' && !isEmpty(line)) {
        minIndent = Math.min(minIndent, getIndent(line, regex));
      }
    }
    return minIndent;
  },
  unindentLines: unindentLines = function(lines) {
    var i, line, minIndent, _i, _len;
    minIndent = getMinIndent(lines);
    for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
      line = lines[i];
      if (typeof line === 'string') {
        lines[i] = isEmpty(line) ? "" : line.substring(minIndent);
      }
    }
    return minIndent;
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/common',_ion_compiler_common_);
    else
      _ion_compiler_common_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_common_.call(this);
  }
}).call(this)