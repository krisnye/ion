(function(){var _ion_compiler_preprocessor_ = function(module,exports,require){var common, expectedResult, fixSourceLocation, fixSourceLocations, getSpace, preprocess, sample;

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
  var baseIndent, comment, indent, indentStack, index, isEmpty, isMarkdownCommented, line, lines, outdent, output, totalIndent, writeLine, _i, _len;
  isMarkdownCommented = exports.isMarkdownCommented(source);
  baseIndent = isMarkdownCommented ? 1 : 0;
  totalIndent = 0;
  indentStack = [];
  lines = common.splitLines(source);
  writeLine = function(line, inputIndex) {
    if (inputIndex != null) {
      if (sourceMapping != null) {
        sourceMapping[output.length] = inputIndex;
      }
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
  return common.unindentString(common.joinLines(output), sourceMapping);
};

sample = "\nThis is a comment.\nAnything left justified is a comment.\n\n    Person\n        name: \"Alpha\"\n        age: 40\n        children:\n            Person\n                name: \"Beta\"\n                age: 1\n            Person\n\n                name: \"Charlie\"\n\n                age: 2\n                description: \"\"\n                        This is just a\n                    sample indented multiline\n                    string literal.";

expectedResult = "\n\nPerson\n{{{{\n    name: \"Alpha\"\n    age: 40\n    children:\n    {{{{\n        Person\n        {{{{\n            name: \"Beta\"\n            age: 1\n        }}}}\n        Person\n\n        {{{{\n            name: \"Charlie\"\n\n            age: 2\n            description: \"\"\n            {{{{\n                    This is just a\n            }}}}\n                sample indented multiline\n            {{{{\n                string literal.\n            }}}}\n        }}}}\n    }}}}\n}}}}";

exports.test = function() {
  var result, sourceMapping;
  sourceMapping = {};
  result = preprocess(sample, sourceMapping);
  if (result !== expectedResult) {
    console.log('result---------------------------------');
    console.log(result);
    console.log('expected-------------------------------');
    console.log(expectedResult);
    throw new Error("Preprocessor result not expected result.");
  }
  if (JSON.stringify(sourceMapping) !== '{"0":0,"1":3,"2":4,"3":5,"4":5,"5":6,"6":7,"7":8,"8":8,"9":9,"10":9,"11":10,"12":11,"13":11,"14":12,"15":13,"16":13,"17":14,"18":15,"19":16,"20":17,"21":17,"22":18,"23":18,"24":19,"25":19,"26":20,"27":20,"28":20,"29":20,"columnOffset":4}') {
    throw new Error("Unexpected line mapping: " + JSON.stringify(sourceMapping));
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