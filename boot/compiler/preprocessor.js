(function(){var _ion_compiler_preprocessor_ = function(module,exports,require){var common, fixSourceLocation, fixSourceLocations, getSpace, preprocess;

common = require('./common');

getSpace = function(size) {
  var i, result, _i;
  result = [];
  for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
    result.push(" ");
  }
  return result.join("");
};

exports.isMarkdownCommented = function(source) {
  return /(\n|^)[^\s\n][^\n]*\n(\s*\n)+\s+[^\s\n]/.test(source);
};

exports.fixSourceLocation = fixSourceLocation = function(location, sourceMapping) {
  var _ref;
  if (!location.fixed) {
    location.fixed = true;
    location.line = sourceMapping[location.line - 1] + 1;
    return location.column += (_ref = sourceMapping.columnOffset) != null ? _ref : 0;
  }
};

exports.fixSourceLocations = fixSourceLocations = function(program, sourceMapping) {
  require('./traverseAst').traverse(program, function(node) {
    var _ref, _ref1;
    if (((_ref = node.loc) != null ? _ref.start : void 0) != null) {
      fixSourceLocation(node.loc.start, sourceMapping);
    }
    if (((_ref1 = node.loc) != null ? _ref1.end : void 0) != null) {
      return fixSourceLocation(node.loc.end, sourceMapping);
    }
  });
  return program;
};

exports.preprocess = preprocess = function(source, sourceMapping) {
  var baseIndent, comment, indent, indentStack, index, isEmpty, isMarkdownCommented, line, lines, nonCommentCount, outdent, output, totalIndent, writeLine, _i, _len;
  isMarkdownCommented = false;
  baseIndent = isMarkdownCommented ? 1 : 0;
  totalIndent = 0;
  indentStack = [];
  lines = common.splitLines(source);
  nonCommentCount = 0;
  writeLine = function(line, inputIndex) {
    var trimmed;
    if (inputIndex != null) {
      if (sourceMapping != null) {
        sourceMapping[output.length] = inputIndex;
      }
    }
    trimmed = line.trim();
    if (trimmed.length > 0 && line.trim()[0] !== '#') {
      nonCommentCount++;
    }
    return output.push(line);
  };
  outdent = function(inputIndex) {
    var _ref;
    indentStack.pop();
    totalIndent = (_ref = indentStack[indentStack.length - 1]) != null ? _ref : 0;
    if (totalIndent >= baseIndent) {
      return writeLine(getSpace(totalIndent) + common.outdentToken, inputIndex);
    }
  };
  output = [];
  for (index = _i = 0, _len = lines.length; _i < _len; index = ++_i) {
    line = lines[index];
    indent = common.getIndent(line);
    isEmpty = line.trim().length === 0;
    if (!isEmpty) {
      if (indent > totalIndent) {
        if (totalIndent >= baseIndent) {
          writeLine(getSpace(totalIndent) + common.indentToken, index);
        }
        totalIndent = indent;
        indentStack.push(indent);
      } else {
        while (indent < totalIndent) {
          outdent(index);
        }
      }
    }
    comment = isMarkdownCommented && indent === 0 && !isEmpty;
    if (!comment) {
      writeLine(line, index);
    }
  }
  while (indentStack.length > 0) {
    outdent(lines.length);
  }
  if (nonCommentCount === 0) {
    return "";
  } else {
    return common.unindentString(common.joinLines(output), sourceMapping);
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/preprocessor',_ion_compiler_preprocessor_);
    else
      _ion_compiler_preprocessor_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_preprocessor_.call(this);
  }
}).call(this)