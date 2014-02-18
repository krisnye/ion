(function(){var _ion_compiler_index_ = function(module,exports,require){var compile, makePrettyError, parse;

makePrettyError = function(e, source) {
  var caret, i, line, newMessage, _i, _ref;
  if (typeof e.line === 'number' && typeof e.column === 'number' && e.line > 0 && e.column > 0) {
    line = source.split('\n')[e.line - 1];
    caret = "^";
    for (i = _i = 2, _ref = e.column; _i <= _ref; i = _i += 1) {
      caret = " " + caret;
    }
    newMessage = "" + (typeof id !== "undefined" && id !== null ? id + ':' : '') + e.line + ":" + e.column + "\n" + e.message + "\n" + line + "\n" + caret;
    e.originalMessage = e.message;
    return e.message = newMessage;
  }
};

exports.parse = parse = function(content, options) {
  if (options == null) {
    options = {};
  }
  options.generate = false;
  return compile(content, options);
};

exports.compile = compile = function(content, options) {
  var e, escodegen, parser, postprocessor, preprocessed, preprocessor, result, sourceMapping;
  if (options == null) {
    options = {};
  }
  preprocessor = require('./preprocessor');
  parser = require('./parser');
  postprocessor = require('./postprocessor');
  escodegen = require('escodegen');
  sourceMapping = {};
  result = preprocessed = preprocessor.preprocess(content, sourceMapping);
  try {
    result = parser.parse(result, options != null ? options : {});
    result = preprocessor.fixSourceLocations(result, sourceMapping);
    if (options.postprocess !== false) {
      result = postprocessor.postprocess(result, options);
      if ((options != null ? options.generate : void 0) !== false) {
        result = escodegen.generate(result);
      }
    }
  } catch (_error) {
    e = _error;
    preprocessor.fixSourceLocation(e, sourceMapping);
    console.log('-Preprocessed--------------------------------------------');
    console.log(preprocessed);
    makePrettyError(e, content);
    throw e;
  }
  return result;
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/index',_ion_compiler_index_);
    else
      _ion_compiler_index_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_index_.call(this);
  }
}).call(this)