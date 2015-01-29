void (function(){var _ion_compiler_index_ = function(module,exports,require){'use strict';
var ion = require('../'), makePrettyError = function (e, source, id) {
        if (typeof e.line === 'number' && typeof e.column === 'number' && e.line > 0 && e.column > 0) {
            var line = source.split('\n')[e.line - 1];
            var caret = '^';
            for (var i = 1; i < e.column; i++) {
                caret = ' ' + caret;
            }
            var newMessage = '' + (id != null ? id : '(anonymous)') + ':' + e.line + ':' + e.column + ': ' + e.message + '\n' + line + '\n' + caret;
            e.originalMessage = e.message;
            e.message = newMessage;
            e.stack = newMessage;
        }
    };
var parse = exports.parse = function (content, options) {
        if (options == null)
            options = {};
        options.generate = false;
        return compile(content, options);
    }, compile = exports.compile = function (content, options) {
        if (options == null)
            options = {};
        return compileWithSourceMap(content, options)[0];
    }, compileWithSourceMap = exports.compileWithSourceMap = function (content, options) {
        if (options == null)
            options = {};
        var header = '';
        if (content.startsWith('#!')) {
            header = content.split(/\r|\n/)[0] + '\n';
        }
        options.loc = options.loc != null ? options.loc : true;
        options.target = options.target != null ? options.target : 'es5';
        var preprocessor = require('./preprocessor'), parser = require('./parser'), postprocessor = require('./postprocessor'), escodegen = require('./escodegen');
        var sourceMapping = {}, result = preprocessor.preprocess(content, sourceMapping), sourceMap = null, preprocessed = result, sourceLocationsFixed = false, dump = function (description) {
                if (options.debug) {
                    console.log('-' + description + '--------------------------------------');
                    console.log(typeof result === 'string' ? result : JSON.stringify(result, null, '  '));
                    console.log('---------------------------------------------------');
                }
            };
        try {
            dump('Preprocessed');
            result = parser.parse(result, options);
            dump('Parsed');
            result = preprocessor.fixSourceLocations(result, sourceMapping, options.source);
            sourceLocationsFixed = true;
            if (options.postprocess !== false) {
                result = postprocessor.postprocess(result, options);
                if ((options != null ? options.generate : void 0) !== false) {
                    var generateOptions = {};
                    {
                        generateOptions.sourceMapWithCode = true;
                        if (!(global.window != null)) {
                            generateOptions.sourceMap = options.sourceMap != null ? options.sourceMap : options.source;
                        }
                        generateOptions.sourceContent = content;
                        generateOptions.verbatim = 'verbatim';
                    }
                    var output = escodegen.generate(result, generateOptions);
                    result = output.code;
                    dump('Generated');
                    sourceMap = output.map != null ? output.map.toString() : void 0;
                }
            }
        } catch (e) {
            if (!sourceLocationsFixed) {
                preprocessor.fixSourceLocation(e, sourceMapping);
            }
            makePrettyError(e, content, options.id);
            throw e;
        }
        return [
            header + result,
            sourceMap
        ];
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
//# sourceMappingURL=./index.map