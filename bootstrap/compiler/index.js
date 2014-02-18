(function(){var _ion_compiler_index_ = function(module,exports,require){var compile, parse;

exports.parse = parse = function(content, options) {
  var e, fixed, parsed, parser, preprocessed, preprocessor, sourceMapping;
  preprocessor = require('./preprocessor');
  parser = require('./parser');
  try {
    sourceMapping = {};
    preprocessed = preprocessor.preprocess(content, sourceMapping);
    parsed = parser.parse(preprocessed, options != null ? options : {});
    fixed = preprocessor.fixSourceLocations(parsed, sourceMapping);
  } catch (_error) {
    e = _error;
    console.log('-Preprocessed--------------------------------------------');
    console.log(preprocessed);
    console.log('-Error---------------------------------------------------');
    console.log("line: " + e.line + ", column: " + e.column);
    throw e;
  }
  return fixed;
};

exports.compile = compile = function(content, options) {
  var escodegen, javascript, postprocessor, program;
  postprocessor = require('./postprocessor');
  escodegen = require('escodegen');
  program = parse(content, options);
  program = postprocessor.postprocess(program, options);
  if ((options != null ? options.generate : void 0) === false) {
    return program;
  }
  javascript = escodegen.generate(program);
  return javascript;
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