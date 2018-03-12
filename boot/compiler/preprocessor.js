void (function(){var _ion_compiler_preprocessor_ = function(module,exports,require){var common, fixSourceLocation, fixSourceLocations, getSpace, preprocess;

common = require('./common');

getSpace = function(size) {
  var i, j, ref, result;
  result = [];
  for (i = j = 0, ref = size; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    result.push(" ");
  }
  return result.join("");
};

exports.isMarkdownCommented = function(source) {
  return /(\n|^)[^\s\n][^\n]*\n(\s*\n)+\s+[^\s\n]/.test(source);
};

exports.fixSourceLocation = fixSourceLocation = function(location, sourceMapping, source) {
  var ref;
  if (!location.fixed) {
    location.fixed = true;
    location.line = sourceMapping[location.line - 1] + 1;
    location.column += (ref = sourceMapping.columnOffset) != null ? ref : 0;
    return location.source != null ? location.source : location.source = source;
  }
};

exports.fixSourceLocations = fixSourceLocations = function(program, sourceMapping, source) {
  require('./traverseAst').traverse(program, function(node) {
    var ref, ref1;
    if (((ref = node.loc) != null ? ref.start : void 0) != null) {
      fixSourceLocation(node.loc.start, sourceMapping, source);
    }
    if (((ref1 = node.loc) != null ? ref1.end : void 0) != null) {
      return fixSourceLocation(node.loc.end, sourceMapping, source);
    }
  });
  return program;
};

exports.preprocess = preprocess = function(source, sourceMapping) {
  var baseIndent, comment, indent, indentStack, index, isEmpty, isMarkdownCommented, j, len, line, lines, nonCommentCount, outdent, output, totalIndent, writeLine;
  isMarkdownCommented = false; // exports.isMarkdownCommented source
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
    var ref;
    indentStack.pop();
    totalIndent = (ref = indentStack[indentStack.length - 1]) != null ? ref : 0;
    if (totalIndent >= baseIndent) {
      return writeLine(getSpace(totalIndent) + common.outdentToken, inputIndex);
    }
  };
  output = [];
  for (index = j = 0, len = lines.length; j < len; index = ++j) {
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
  // push any remaining outdents
  while (indentStack.length > 0) {
    outdent(lines.length);
  }
  if (nonCommentCount === 0) {
    return "";
  } else {
    return common.unindentString(common.joinLines(output), sourceMapping);
  }
};

// sample = """

// This is a comment.
// Anything left justified is a comment.

//     Person
//         name: "Alpha"
//         age: 40
//         children:
//             Person
//                 name: "Beta"
//                 age: 1
//             Person

//                 name: "Charlie"

//                 age: 2
//                 description: ""
//                         This is just a
//                     sample indented multiline
//                     string literal.
// """
// expectedResult = """

// Person
// {{{{
//     name: "Alpha"
//     age: 40
//     children:
//     {{{{
//         Person
//         {{{{
//             name: "Beta"
//             age: 1
//         }}}}
//         Person

//         {{{{
//             name: "Charlie"

//             age: 2
//             description: ""
//             {{{{
//                     This is just a
//             }}}}
//                 sample indented multiline
//             {{{{
//                 string literal.
//             }}}}
//         }}}}
//     }}}}
// }}}}
// """
// exports.test = ->
//     sourceMapping = {}
//     # first try with the markdown commented sample.
//     result = preprocess sample, sourceMapping
//     if result != expectedResult
//         console.log 'result---------------------------------'
//         console.log result
//         console.log 'expected-------------------------------'
//         console.log expectedResult
//         throw new Error "Preprocessor result not expected result."
//     if JSON.stringify(sourceMapping) != '{"0":0,"1":3,"2":4,"3":5,"4":5,"5":6,"6":7,"7":8,"8":8,"9":9,"10":9,"11":10,"12":11,"13":11,"14":12,"15":13,"16":13,"17":14,"18":15,"19":16,"20":17,"21":17,"22":18,"23":18,"24":19,"25":19,"26":20,"27":20,"28":20,"29":20,"columnOffset":4}'
//         throw new Error "Unexpected line mapping: " + JSON.stringify sourceMapping

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