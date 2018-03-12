void (function(){var _ion_builder_index_ = function(module,exports,require){var _, addBrowserShim, changeExtension, compileCoffeeScript, compileIon, compileIonWithSourceMap, compilePegjs, compilePegs, exports, fs, getModuleId, i, ion, isPrivate, len, name, normalizePath, np, ref, removeExtension, shimJavascript, showPrettyError, syntaxErrorToString, utility;

if (global.window) {
  return;
}

_ = require('./nodash'); // imported for debounce/throttle methods

utility = require('./utility');

fs = require('fs');

np = require('path');

ion = require('../');

// this doesn't seem to work with Object.observe callbacks
process.on('uncaughtException', function(e) {
  var ref;
  return console.error((ref = e.stack) != null ? ref : e);
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
    var existingPath, isDirectory, key, results, value;
// EXISTING_FILE : SYMBOLIC_LINK
    results = [];
    for (key in object) {
      value = object[key];
      if (!fs.existsSync(key)) {
        console.error(`link source not found: ${key}`);
        continue;
      }
      isDirectory = utility.isDirectory(key);
      // existing file path needs to be relative to the link path
      existingPath = np.relative(value, key);
      results.push(console.log(`link EXISTING: ${existing}  LINK: ${value}`));
    }
    return results;
  },
  runFile: function(file) {
    var code, js;
    if (!fs.existsSync(file)) {
      console.warn("File not found: {{file}}");
      return;
    }
    code = utility.read(file);
    js = ion.compiler.compile(code);
    return eval(js);
  },
  runTests: (function() {
    var fn;
    fn = function(manifestFile) {
      // convert the files to a name, moduleId map
      return require('../browser/tester').spawnTests(manifestFile);
    };
    return _.debounce(_.throttle(fn, 100), 2000);
  })(),
  buildScriptIncludeFile: function(files, base = '') {
    return files.map(function(x) {
      return `document.writeln("<script type='text/javascript' src='${base}${normalizePath(x)}'></script>");`;
    }).join('\n');
  },
  getModuleId: getModuleId = function(source, packageObject) {
    var dir, i, len, path, root, srcDirectory;
    // new getModuleId behavior
    if (typeof source === 'string') {
      root = source;
      path = packageObject;
      return normalizePath(removeExtension(np.join(root, path)));
    }
    // old getModuleId behavior
    if (packageObject != null) {
      srcDirectory = packageObject.directories.src;
      if (Array.isArray(srcDirectory)) {
        for (i = 0, len = srcDirectory.length; i < len; i++) {
          dir = srcDirectory[i];
          if (source.path.startsWith(dir)) {
            srcDirectory = dir;
            break;
          }
        }
        if (Array.isArray(srcDirectory)) {
          throw new Error("Couldn't find correct source directory for " + source);
        }
      }
      return normalizePath(removeExtension(np.join(packageObject.name, np.relative(srcDirectory, source.path))));
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
    var codeLine, colorize, end, first_column, first_line, last_column, last_line, marker, ref, repeat, start;
    if (e.location == null) {
      return e.toString();
    }
    // lifted from https://github.com/jashkenas/coffee-script/blob/master/src/helpers.coffee
    repeat = function(str, n) {
      var res;
      // Use clever algorithm to have O(log(n)) string concatenation operations.
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
    ({first_line, first_column, last_line, last_column} = e.location);
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
      return `\x1B[1;31m${str}\x1B[0m`;
    };
    codeLine = codeLine.slice(0, start) + colorize(codeLine.slice(start, end)) + codeLine.slice(end);
    marker = colorize(marker);
    return `${filename}:${first_line + 1}:${first_column + 1}: error: ${(ref = e.originalMessage) != null ? ref : e.message}\n\n${codeLine}\n${marker}`;
  },
  // this compiles coffeescript if needed, but does not actually write the result.
  compileCoffeeScript: compileCoffeeScript = function(source, packageObject) {
    var compiled, cs, e, filename, input, moduleId, options;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    input = source.read();
    filename = source.path;
    cs = require('coffeescript');
    try {
      // console.log "Compile: #{filename}"
      compiled = cs.compile(input, options = {
        bare: true
      });
      // console.log 'sourceMap: ' + typeof options.sourceMap
      compiled = addBrowserShim(compiled, moduleId, input);
      return compiled;
    } catch (error) {
      e = error;
      showPrettyError(e, filename, input);
    }
  },
  // this compiles a pegjs parser and returns the result.  Does not write to the target file.
  compilePegjs: compilePegjs = function(source, packageObject) {
    var e, filename, input, moduleId, parser, peg;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    filename = source.path;
    try {
      peg = require('pegjs');
      // console.log "Building: #{filename}"
      input = source.read();
      parser = peg.buildParser(input, {
        cache: true,
        output: "source"
      });
      source = "module.exports = " + parser;
      source = addBrowserShim(source, moduleId);
      return source;
    } catch (error) {
      e = error;
      return console.error(e);
    }
  },
  // this compiles a pegs parser and returns the result.  Does not write to the target file.
  compilePegs: compilePegs = function(source, packageObject) {
    var e, filename, input, moduleId, parser, peg;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    filename = source.path;
    try {
      peg = require('pegs').bootstrap;
      // console.log "Building: #{filename}"
      input = source.read();
      parser = peg.parse(input);
      source = parser;
      source = addBrowserShim(source, moduleId);
      return source;
    } catch (error) {
      e = error;
      return console.error(e);
    }
  },
  compileIon: compileIon = function(source, packageObject) {
    var ref;
    return (ref = compileIonWithSourceMap(source, packageObject)) != null ? ref[0] : void 0;
  },
  // this compiles ion and returns the result.  Does not write to the target file.
  compileIonWithSourceMap: compileIonWithSourceMap = function(source, packageObject) {
    var e, filename, input, ionCompiler, map, moduleId;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    filename = source.path;
    try {
      // console.log "Compile: #{filename}"
      ionCompiler = require('../compiler');
      input = source.read();
      [source, map] = ionCompiler.compileWithSourceMap(input, {
        source: moduleId + ".ion",
        sourceMap: filename.split(/[\/\\]/).pop()
      });
      source = addBrowserShim(source, moduleId, input);
      return [source, map];
    } catch (error) {
      e = error;
      return console.error(String(e));
    }
  },
  shimJavascript: shimJavascript = function(source, packageObject) {
    var moduleId, result;
    if (source.modified === 0) {
      return;
    }
    moduleId = typeof packageObject === 'string' ? packageObject : getModuleId(source, packageObject);
    result = addBrowserShim(source.read(), moduleId);
    return result;
  },
  addBrowserShim: addBrowserShim = function(sourceText, moduleId, originalSource) {
    var safeId, stripValue;
    // don't shim if the source starts with a shebang
    if ((originalSource != null ? originalSource.substring(0, 2) : void 0) === "#!") {
      stripValue = "#!browser";
      if (sourceText.startsWith(stripValue)) {
        sourceText = sourceText.substring(stripValue.length);
      }
      return sourceText;
    }
    // make sure the javascript isn't already shimmed, so we don't shim it twice.
    if (moduleId != null) {
      safeId = "_" + moduleId.replace(/[^a-zA-Z0-9]/g, '_') + "_";
      sourceText = `void (function(){var ${safeId} = function(module,exports,require){${sourceText}\n  }\n  if (typeof require === 'function') {\n    if (require.register)\n      require.register('${moduleId}',${safeId});\n    else\n      ${safeId}.call(this, module, exports, require);\n  }\n  else {\n    ${safeId}.call(this);\n  }\n}).call(this)`;
    }
    return sourceText;
  }
};

ref = ["ModuleBuilder", "WebsiteBuilder", "File", "Directory", "utility"];
for (i = 0, len = ref.length; i < len; i++) {
  name = ref[i];
  (function(name) {
    return Object.defineProperty(exports, name, {
      enumerable: true,
      get: function() {
        return require("./" + name);
      }
    });
  })(name);
}

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