void (function(){var _ion_compiler_common_ = function(module,exports,require){'use strict';
var ion = require('../'), lineDelimiter = '\n', isEmpty = function (s) {
        return !(s != null) || s.length === 0 || (s.trim != null ? s.trim().length : void 0) === 0;
    };
var indentToken = exports.indentToken = '{{{{', outdentToken = exports.outdentToken = '}}}}', splitLines = exports.splitLines = function (s) {
        return s.split(lineDelimiter);
    }, joinLines = exports.joinLines = function (array) {
        return array.join(lineDelimiter);
    }, getIndent = exports.getIndent = function (s, regex) {
        regex = regex != null ? regex : /^([ ]*)/;
        return (regex.exec(s) != null ? regex.exec(s)[1].length : void 0) != null ? regex.exec(s)[1].length : Number.MAX_VALUE;
    }, unindentString = exports.unindentString = function (s, sourceMapping) {
        var lines = splitLines(s.trimRight());
        var minIndent = unindentLines(lines);
        if (sourceMapping != null) {
            sourceMapping.columnOffset = minIndent;
        }
        return joinLines(lines);
    }, getMinIndent = exports.getMinIndent = function (lines, regex) {
        var minIndent = Number.MAX_VALUE;
        for (var _i = 0; _i < lines.length; _i++) {
            var line = lines[_i];
            if (typeof line === 'string' && !isEmpty(line)) {
                minIndent = Math.min(minIndent, getIndent(line, regex));
            }
        }
        return minIndent;
    }, unindentLines = exports.unindentLines = function (lines) {
        var minIndent = getMinIndent(lines);
        for (var _i2 = 0; _i2 < lines.length; _i2++) {
            var i = _i2;
            var line = lines[_i2];
            if (typeof line === 'string') {
                lines[i] = isEmpty(line) ? '' : line.substring(minIndent);
            }
        }
        return minIndent;
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
//@ sourceMappingURL=./common.map