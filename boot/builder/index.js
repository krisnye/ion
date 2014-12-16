void (function(){var _ion_builder_index_ = function(module,exports,require){var addBrowserShim, changeExtension, compileCoffeeScript, compileIon, compileIonWithSourceMap, compilePegjs, exports, fs, getModuleId, isPrivate, normalizePath, np, removeExtension, shimJavascript, showPrettyError, syntaxErrorToString, utility, _;

if (global.window) {
  return;
}

_ = require('underscore');

utility = require('./utility');

fs = require('fs');

np = require('path');

process.on('uncaughtException', function(e) {
  var _ref;
  return console.error((_ref = e.stack) != null ? _ref : e);
});

module.exports = exports = {
  removeExtension: removeExtension = utility.removeExtension,
  changeExtension: changeExtension = utility.changeExtension,
  normalizePath: normalizePath = utility.normalizePath,
  isPrivate: isPrivate = function(path) {
    var result;
    if (path == null) {
      return false;
    }
    path = normalizePath(path);
    result = path[0] === '_' || path.indexOf('/_') >= 0;
    return result;
  },
  link: function(object) {
    var existingPath, isDirectory, key, value, _results;
    _results = [];
    for (key in object) {
      value = object[key];
      if (!fs.existsSync(key)) {
        console.error("link source not found: " + key);
        continue;
      }
      isDirectory = utility.isDirectory(key);
      existingPath = np.relative(value, key);
      _results.push(console.log("link EXISTING: " + existing + "  LINK: " + value));
    }
    return _results;
  },
  runIonFile: function(file) {
    var js, src;
    src = fs.readFileSync(file, 'utf8');
    js = require('../compiler').compile(src);
    return eval(js);
  },
  runTests: (function() {
    var fn;
    fn = function(manifestFile) {
      return require('../browser/tester').spawnTests(manifestFile);
    };
    return _.debounce(_.throttle(fn, 100), 2000);
  })(),
  buildScriptIncludeFile: function(files, base) {
    if (base == null) {
      base = '';
    }
    return files.map(function(x) {
      return "document.writeln(\"<script type='text/javascript' src='" + base + (normalizePath(x)) + "'></script>\");";
    }).join('\n');
  },
  getModuleId: getModuleId = function(source, packageObject) {
    var path, root;
    if (typeof source === 'string') {
      root = source;
      path = packageObject;
      return normalizePath(removeExtension(np.join(root, path)));
    }
    if (packageObject != null) {
      return normalizePath(removeExtension(np.join(packageObject.name, np.relative(packageObject.directories.src, source.path))));
    } else {
      return null;
    }
  },
  showPrettyError: showPrettyError = function(e, filename, input) {
    var beep, message;
    message = e.message = syntaxErrorToString(e, filename, input);
    beep = '\x07';
    return console.error(message + beep);
  },
  syntaxErrorToString: syntaxErrorToString = function(e, filename, code) {
    var codeLine, colorize, end, first_column, first_line, last_column, last_line, marker, repeat, start, _ref, _ref1;
    if (e.location == null) {
      return e.toString();
    }
    repeat = function(str, n) {
      var res;
      res = '';
      while (n > 0) {
        if (n & 1) {
          res += str;
        }
        n >>>= 1;
        str += str;
      }
      return res;
    };
    _ref = e.location, first_line = _ref.first_line, first_column = _ref.first_column, last_line = _ref.last_line, last_column = _ref.last_column;
    if (last_line == null) {
      last_line = first_line;
    }
    if (last_column == null) {
      last_column = first_column;
    }
    codeLine = code.split('\n')[first_line];
    start = first_column;
    end = first_line === last_line ? last_column + 1 : codeLine.length;
    marker = repeat(' ', start) + repeat('^', end - start);
    colorize = function(str) {
      return "\x1B[1;31m" + str + "\x1B[0m";
    };
    codeLine = codeLine.slice(0, start) + colorize(codeLine.slice(start, end)) + codeLine.slice(end);
    marker = colorize(marker);
    return "" + filename + ":" + (first_line + 1) + ":" + (first_column + 1) + ": error: " + ((_ref1 = e.originalMessage) != null ? _ref1 : e.message) + "\n\n" + codeLine + "\n" + marker;
  },
  compileCoffeeScript: compileCoffeeScript = function(source, packageObject) {
    var compiled, cs, e, filename, input, moduleId, options;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    input = source.read();
    filename = source.path;
    cs = require('coffee-script');
    try {
      console.log("Compile: " + filename);
      compiled = cs.compile(input, options = {
        bare: true
      });
      compiled = addBrowserShim(compiled, moduleId);
      return compiled;
    } catch (_error) {
      e = _error;
      showPrettyError(e, filename, input);
    }
  },
  compilePegjs: compilePegjs = function(source, packageObject) {
    var e, filename, input, moduleId, parser, peg;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    filename = source.path;
    try {
      peg = require('pegjs');
      console.log("Building: " + filename);
      input = source.read();
      parser = peg.buildParser(input, {
        cache: true,
        output: "source"
      });
      source = "module.exports = " + parser;
      source = addBrowserShim(source, moduleId);
      return source;
    } catch (_error) {
      e = _error;
      return console.error(e);
    }
  },
  compileIon: compileIon = function(source, packageObject) {
    var _ref;
    return (_ref = compileIonWithSourceMap(source, packageObject)) != null ? _ref[0] : void 0;
  },
  compileIonWithSourceMap: compileIonWithSourceMap = function(source, packageObject) {
    var e, filename, input, ionCompiler, map, moduleId, _ref;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    filename = source.path;
    try {
      console.log("Compile: " + filename);
      ionCompiler = require('../compiler');
      input = source.read();
      _ref = ionCompiler.compileWithSourceMap(input, {
        source: moduleId + ".ion",
        sourceMap: filename.split(/[\/\\]/).pop()
      }), source = _ref[0], map = _ref[1];
      source = addBrowserShim(source, moduleId);
      return [source, map];
    } catch (_error) {
      e = _error;
      return console.error(String(e));
    }
  },
  shimJavascript: shimJavascript = function(source, packageObject) {
    var moduleId;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    return addBrowserShim(source.read(), moduleId);
  },
  addBrowserShim: addBrowserShim = function(sourceText, moduleId) {
    var safeId;
    if (sourceText.substring(0, 2) === "#!") {
      return sourceText;
    }
    if (moduleId != null) {
      safeId = "_" + moduleId.replace(/[^a-zA-Z0-9]/g, '_') + "_";
      sourceText = "void (function(){var " + safeId + " = function(module,exports,require){" + sourceText + "\n  }\n  if (typeof require === 'function') {\n    if (require.register)\n      require.register('" + moduleId + "'," + safeId + ");\n    else\n      " + safeId + ".call(this, module, exports, require);\n  }\n  else {\n    " + safeId + ".call(this);\n  }\n}).call(this)";
    }
    return sourceText;
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/index',_ion_builder_index_);
    else
      _ion_builder_index_.call(this, module, exports, require);
  }
  else {
    _ion_builder_index_.call(this);
  }
}).call(this)