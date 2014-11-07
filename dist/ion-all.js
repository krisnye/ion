void (function(){var _ion_browser_require_ = function(module,exports,require){var modules, normalize, require, resolve;

if (this.global == null) {
  this.global = (function() {
    return this;
  })();
}

if (this.require != null) {
  return;
}

require = function(path) {
  var i, m, object, originalPath, steps;
  if (path === 'ion/browser/require') {
    return require;
  }
  originalPath = path;
  m = modules[path];
  if (!m) {
    if (path[path.length - 1] !== '/') {
      path += '/';
    }
    path += "index";
    m = modules[path];
  }
  if (!m) {
    steps = path.replace(/\/index$/, "").split(/\//);
    object = this;
    i = 0;
    while ((object != null) && i < steps.length) {
      object = object[steps[i]];
      i++;
    }
    if (object != null) {
      m = modules[originalPath] = {
        exports: object
      };
    }
  }
  if (!m) {
    throw new Error("Couldn't find module for: " + path);
  }
  if (!m.exports) {
    m.exports = {};
    m.id = path;
    m.call(this, m, m.exports, resolve(path));
  }
  return m.exports;
};

modules = {};

normalize = require.normalize = function(curr, path) {
  var i, seg, segs;
  segs = curr.split("/");
  seg = void 0;
  if (path[0] !== ".") {
    return path;
  }
  segs.pop();
  path = path.split("/");
  i = 0;
  while (i < path.length) {
    seg = path[i];
    if (seg === "..") {
      segs.pop();
    } else {
      if (seg !== ".") {
        segs.push(seg);
      }
    }
    ++i;
  }
  return segs.join("/");
};

resolve = function(path) {
  return function(p) {
    return require(normalize(path, p));
  };
};

require.register = function(path, fn) {
  return modules[path] = fn;
};

require.loadAll = function() {
  var id, _results;
  _results = [];
  for (id in modules) {
    _results.push(require(id));
  }
  return _results;
};

require.getModuleIds = function() {
  return Object.keys(modules);
};

require.runTests = function(callback) {
  var fn;
  fn = function() {
    return require("ion/browser/tester").runTests(require.getModuleIds(), callback);
  };
  if (global.setTimeout != null) {
    return setTimeout(fn, 0);
  } else {
    return fn();
  }
};

require.compileScripts = function() {
  var compiledWrapper, compiler, ion, removeLastResult, result, scriptElement, template, _i, _len, _ref, _results;
  ion = require('ion');
  compiler = require('ion/compiler');
  _ref = document.querySelectorAll("script[type=ion]");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    scriptElement = _ref[_i];
    compiledWrapper = eval("(function(){ " + (compiler.compile(scriptElement.innerHTML)) + " })");
    result = compiledWrapper.call(scriptElement);
    if (result != null) {
      if (typeof result.template) {
        template = result.call(scriptElement);
        removeLastResult = null;
        _results.push(template.watch(function(templateResult) {
          if (typeof removeLastResult === "function") {
            removeLastResult();
          }
          removeLastResult = null;
          if (templateResult != null) {
            return removeLastResult = ion.add(scriptElement.parentElement, templateResult);
          }
        }));
      } else {
        _results.push(ion.add(scriptElement.parentElement, result));
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

if (typeof module === "undefined") {
  this.require = require;
} else {
  module.exports = require;
}

if (global.window != null) {
  window.addEventListener('load', function(e) {
    return require.compileScripts();
  });
}

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/require',_ion_browser_require_);
    else
      _ion_browser_require_.call(this, module, exports, require);
  }
  else {
    _ion_browser_require_.call(this);
  }
}).call(this)

void (function(){var _ion_browser_index_ = function(module,exports,require){Object.defineProperty(exports, 'elements', {get:function(){ return require('./elements') }}) 
Object.defineProperty(exports, 'require', {get:function(){ return require('./require') }}) 
Object.defineProperty(exports, 'tester', {get:function(){ return require('./tester') }}) 
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/index',_ion_browser_index_);
    else
      _ion_browser_index_.call(this, module, exports, require);
  }
  else {
    _ion_browser_index_.call(this);
  }
}).call(this)
void (function(){var _ion_browser_tester_ = function(module,exports,require){var args, file, manifest, manifestFile, moduleId, modules, np, runTest, runTests, spawnTests, utility, _i, _len, _ref;

runTest = function(name, test, callback) {
  var e, expectedCallbacks, key, result, value;
  expectedCallbacks = [];
  if (typeof test === 'object') {
    for (key in test) {
      value = test[key];
      expectedCallbacks = expectedCallbacks.concat(runTest(name + ' ' + key, value, callback));
    }
  } else if (typeof test === 'function') {
    if (/^\s*function\s*[a-zA-Z_0-9]*\s*\(\s*(done)?\s*\)/.test(test.toString())) {
      expectedCallbacks.push(name);
      try {
        if (test.length === 1) {
          test(function(error, warning) {
            return callback(name, error, warning);
          });
        } else {
          result = test();
          callback(name, null, result);
        }
      } catch (_error) {
        e = _error;
        callback(name, e, null);
      }
    }
  }
  return expectedCallbacks;
};

exports.spawnTests = spawnTests = function(manifestFile) {
  var command;
  command = "node" + (process.platform === 'win32' ? '.cmd' : '') + " " + __filename + " " + manifestFile;
  require('../builder/utility').spawn(command);
};

exports.runTests = runTests = function(moduleIds, callback) {
  var array, duration, e, error, expectedCallbacks, getIncompleteCallbacks, handler, inc, key, module, moduleId, name, timeout, waitingForFinishTimeout, warning, _i, _len,
    _this = this;
  if (!moduleIds) {
    throw new Error("moduleIds is required");
  }
  if (callback == null) {
    callback = exports.createCallback();
  }
  expectedCallbacks = {};
  waitingForFinishTimeout = null;
  handler = function(name, error, warning) {
    var inc;
    expectedCallbacks[name] = true;
    callback(name, error, warning);
    if (waitingForFinishTimeout != null) {
      inc = getIncompleteCallbacks();
      if (inc.length === 0) {
        clearTimeout(waitingForFinishTimeout);
        return callback();
      }
    }
  };
  for (key in moduleIds) {
    moduleId = moduleIds[key];
    try {
      module = require(moduleId);
      name = Array.isArray(moduleIds) ? moduleId : key;
      array = runTest(name, module.test, handler);
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        name = array[_i];
        if (expectedCallbacks[name] == null) {
          expectedCallbacks[name] = false;
        }
      }
    } catch (_error) {
      e = _error;
      handler(moduleId, e, null);
    }
  }
  getIncompleteCallbacks = function() {
    var value;
    return (function() {
      var _results;
      _results = [];
      for (name in expectedCallbacks) {
        value = expectedCallbacks[name];
        if (!value) {
          _results.push(name);
        }
      }
      return _results;
    })();
  };
  inc = getIncompleteCallbacks();
  if (inc.length === 0) {
    return callback();
  } else {
    duration = 1000;
    error = "Timed out after " + duration + " ms";
    warning = void 0;
    timeout = function() {
      var _j, _len1;
      inc = getIncompleteCallbacks();
      for (_j = 0, _len1 = inc.length; _j < _len1; _j++) {
        name = inc[_j];
        callback(name, error, warning);
      }
      return callback();
    };
    if (global.setTimeout != null) {
      return waitingForFinishTimeout = setTimeout(timeout, duration);
    } else {
      error = void 0;
      warning = "Platform missing setTimeout";
      return timeout();
    }
  }
};

exports.createCallback = function(options, html) {
  var beep, blue, endColor, endLine, fails, green, log, plain, red, start, tests, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
  if (html == null) {
    html = global.window != null;
  }
  if (options == null) {
    options = html ? {
      red: '<span style="color:red;white-space:pre">',
      green: '<span style="color:green;white-space:pre">',
      blue: '<span style="color:blue;white-space:pre">',
      plain: '<span>',
      endColor: '</span>',
      log: function(x) {
        return document.body.innerHTML += x;
      },
      beep: '',
      endLine: '<br>'
    } : {};
  }
  red = (_ref = options.red) != null ? _ref : '\u001b[31m';
  green = (_ref1 = options.green) != null ? _ref1 : '\u001b[32m';
  blue = (_ref2 = options.blue) != null ? _ref2 : '\u001b[36m';
  endColor = (_ref3 = options.endColor) != null ? _ref3 : '\u001b[0m';
  plain = (_ref4 = options.plain) != null ? _ref4 : '';
  beep = (_ref5 = options.beep) != null ? _ref5 : '\u0007';
  log = (_ref6 = options.log) != null ? _ref6 : function(x) {
    return console.log(x);
  };
  endLine = (_ref7 = options.endLine) != null ? _ref7 : '';
  tests = 0;
  fails = 0;
  start = null;
  return function(name, error, result) {
    var color, finish, passed, time, title, _ref10, _ref8, _ref9;
    if (start == null) {
      start = new Date().getTime();
    }
    if (name != null) {
      tests++;
      if (error != null) {
        fails++;
      }
      color = error != null ? red : result != null ? blue : plain;
      return log(color + name + ": " + ((_ref8 = (_ref9 = (_ref10 = error != null ? error.stack : void 0) != null ? _ref10 : error) != null ? _ref9 : result) != null ? _ref8 : "") + endColor + endLine);
    } else {
      finish = new Date().getTime();
      time = finish - start;
      passed = tests - fails;
      log(endLine);
      color = passed === tests ? green : red + beep;
      log(color + (title = "" + passed + "/" + tests + " Passed (" + time + " ms).") + endColor + endLine);
      if (global.document) {
        document.title = title;
      }
      return log(endLine);
    }
  };
};

exports.test = function() {
  var assert, tests;
  assert = {
    equal: function(a, b) {
      if (!a == b) {
        throw new Error("" + a + " != " + b);
      }
    }
  };
  tests = {
    alpha: function() {
      throw "Failure";
    },
    beta: function() {},
    charlie: function() {
      return "Return value";
    }
  };
  runTest('fail', (function() {
    throw 'Failure';
  }), function(name, error, result) {
    assert.equal(name, 'fail');
    assert.equal(error, 'Failure');
    return assert.equal(result, null);
  });
  runTest('pass', (function() {}), function(name, error, result) {
    assert.equal(name, 'pass');
    assert.equal(error, null);
    return assert.equal(result, null);
  });
  runTest('warn', (function() {
    return 'warning';
  }), function(name, error, result) {
    assert.equal(name, 'warn');
    assert.equal(error, null);
    return assert.equal(result, 'warning');
  });
};

if (require.main === module) {
  np = require('path');
  args = process.argv.slice(2).map(function(x) {
    return x.replace(/\\/g, '\/');
  });
  if (args.length < 1) {
    console.log("Usage: tester manifestFile");
    return;
  }
  manifestFile = args[0];
  utility = require('../builder/utility');
  manifest = JSON.parse(utility.read(manifestFile));
  modules = {};
  _ref = manifest.files;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    file = _ref[_i];
    moduleId = np.join(process.cwd(), np.dirname(manifestFile), file);
    modules[file] = moduleId;
  }
  console.log("------------------------------------------------------");
  runTests(modules);
}

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/tester',_ion_browser_tester_);
    else
      _ion_browser_tester_.call(this, module, exports, require);
  }
  else {
    _ion_browser_tester_.call(this);
  }
}).call(this)













void (function(){var _ion_compiler_esutils_index_ = function(module,exports,require){/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.code = require('./code');
    exports.keyword = require('./keyword');
}());
/* vim: set sw=4 ts=4 et tw=80 : */
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/esutils/index',_ion_compiler_esutils_index_);
    else
      _ion_compiler_esutils_index_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_esutils_index_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_esutils_keyword_ = function(module,exports,require){/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = require('./code');

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierName(id) {
        var i, iz, ch;

        if (id.length === 0) {
            return false;
        }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStart(ch) || ch === 92) {  // \ (backslash)
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPart(ch) || ch === 92) {  // \ (backslash)
                return false;
            }
        }
        return true;
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierName: isIdentifierName
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/esutils/keyword',_ion_compiler_esutils_keyword_);
    else
      _ion_compiler_esutils_keyword_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_esutils_keyword_.call(this);
  }
}).call(this)








void (function(){var _ion_es6_Function_ = function(module,exports,require){
// Fix Function#name on browsers that do not support it (IE):
if (!(function f() {}).name) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
            Object.defineProperty(this, 'name', {value:name})
            return name
        }
    });
}

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Function',_ion_es6_Function_);
    else
      _ion_es6_Function_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Function_.call(this);
  }
}).call(this)
void (function(){var _ion_es6_index_ = function(module,exports,require){'use strict';
require('./String');
require('./Map');
require('./Set');
require('./Object');
require('./Object.observe');
require('./Function');
require('./Array');
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/index',_ion_es6_index_);
    else
      _ion_es6_index_.call(this, module, exports, require);
  }
  else {
    _ion_es6_index_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./index.map
void (function(){var _ion_es6_Map_ = function(module,exports,require){'use strict';
var ion = null;
var uniqueCounter = 0;
var idName = '_Map_id_';
var getId = function (key) {
    if (!(key != null)) {
        return String(key);
    }
    if (typeof key === 'string' || typeof key === 'number' || typeof key === 'boolean') {
        return '_' + key;
    }
    var id = key[idName];
    if (!(id != null)) {
        var def = Object.getOwnPropertyDescriptor(key, idName);
        if (def != null) {
            id = def.value;
        } else {
            id = ++uniqueCounter;
            Object.defineProperty(key, idName, { value: id });
        }
    }
    return id;
};
function MapShim(pairs) {
    if (pairs != null) {
        throw new Error('Don\'t add items in the constructor, IE implementation of Set breaks this');
    }
    var lookup = {};
    var keys = [];
    var methods = {
            get: function (key) {
                return lookup[getId(key)];
            },
            set: function (key, value) {
                var id = getId(key);
                if (!lookup.hasOwnProperty(id)) {
                    keys.push(key);
                }
                lookup[id] = value;
                return value;
            },
            has: function (key) {
                var id = getId(key);
                return lookup.hasOwnProperty(id);
            },
            delete: function (key) {
                var id = getId(key);
                keys.remove(key);
                delete lookup[id];
            },
            clear: function () {
                lookup = {};
                keys = [];
            },
            forEach: function (callback, thisArg) {
                for (var _i = 0; _i < keys.length; _i++) {
                    var key = keys[_i];
                    var value = this.get(key);
                    callback.call(thisArg, value, key, this);
                }
            }
        };
    for (var key in methods) {
        var value = methods[key];
        Object.defineProperty(this, key, { value: value });
    }
}
if (!((global.Map != null ? global.Map.prototype.forEach : void 0) != null)) {
    if (global.window) {
        console.warn('Shimming Map');
    }
    global.Map = MapShim;
}
var test = exports.test = function () {
        var Map = global.Map;
        var map = new Map();
        map.set('a', 1);
        map.set('b', 2);
        if (!(Object.keys(map).length === 0))
            throw new Error('Assertion Failed: (Object.keys(map).length is 0)');
        if (!map.has('a'))
            throw new Error('Assertion Failed: (map.has(\'a\'))');
        if (!!map.has('c'))
            throw new Error('Assertion Failed: (not map.has(\'c\'))');
        if (!(map.get('a') === 1))
            throw new Error('Assertion Failed: (map.get(\'a\') is 1)');
        if (!(map.get('b') === 2))
            throw new Error('Assertion Failed: (map.get(\'b\') is 2)');
        if (!(map.get('c') === void 0))
            throw new Error('Assertion Failed: (map.get(\'c\') is undefined)');
        var mykey1 = {};
        map.set(mykey1, 'one');
        if (!(Object.keys(mykey1).length === 0))
            throw new Error('Assertion Failed: (Object.keys(mykey1).length is 0)');
        if (!(map.get(mykey1) === 'one'))
            throw new Error('Assertion Failed: (map.get(mykey1) is "one")');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Map',_ion_es6_Map_);
    else
      _ion_es6_Map_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Map_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Map.map
void (function(){var _ion_es6_Object_ = function(module,exports,require){'use strict';
if (!(Object.is != null)) {
    Object.defineProperty(Object, 'is', {
        value: function (a, b) {
            if (a === b) {
                if (a === 0) {
                    return 1 / a === 1 / b;
                }
                return true;
            }
            return a !== a && b !== b;
        }
    });
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Object',_ion_es6_Object_);
    else
      _ion_es6_Object_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Object_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Object.map
void (function(){var _ion_es6_Object_observe_ = function(module,exports,require){'use strict';
var clone = function (object, properties) {
    if (properties != null) {
        var _ref3 = {};
        for (var key in properties) {
            _ref3[key] = object[key];
        }
        return _ref3;
    } else {
        var _ref4 = {};
        for (var key in object) {
            var value = object[key];
            _ref4[key] = value;
        }
        return _ref4;
    }
};
var createShim = exports.createShim = function () {
        var map = new Map();
        var observe = function (object, callback, property) {
            var meta = map.get(object);
            if (!(meta != null)) {
                var _ref5 = {};
                _ref5[property] = 0;
                meta = {
                    object: object,
                    properties: {},
                    all: 0,
                    clone: clone(object, property ? _ref5 : null),
                    callbacks: []
                };
                map.set(object, meta);
            }
            if (property != null) {
                meta.properties[property] = meta.properties[property] != null ? meta.properties[property] : 0;
                meta.properties[property]++;
            } else {
                meta.all++;
            }
            meta.callbacks.push(callback);
        };
        var unobserve = function (object, callback, property) {
            var meta = map.get(object);
            if (meta != null) {
                meta.callbacks.remove(callback);
                if (meta.callbacks.length === 0) {
                    map.delete(object);
                }
                if (property != null) {
                    meta.properties[property]--;
                    if (meta.properties[property] === 0) {
                        delete meta.properties[property];
                    }
                } else {
                    meta.all--;
                }
            }
        };
        var getChanges = function (oldValue, newValue, properties) {
            var changes = null;
            var change = function (type, name, oldValue, object) {
                changes = changes != null ? changes : [];
                changes.push({
                    type: type,
                    name: name,
                    oldValue: oldValue,
                    object: object
                });
            };
            var checkForChange = function (property) {
                if (newValue.constructor === Object) {
                    if (oldValue.hasOwnProperty(name)) {
                        var oldPropertyValue = oldValue[name];
                        if (!newValue.hasOwnProperty(name)) {
                            if (oldPropertyValue !== void 0) {
                                change('delete', name, oldPropertyValue, newValue);
                            }
                        } else {
                            var newPropertyValue = newValue[name];
                            if (!Object.is(newPropertyValue, oldPropertyValue)) {
                                change('update', name, oldPropertyValue, newValue);
                            }
                        }
                    } else if (newValue.hasOwnProperty(name)) {
                        change('add', name, void 0, newValue);
                    }
                } else {
                    var oldPropertyValue = oldValue[name];
                    var newPropertyValue = newValue[name];
                    if (!Object.is(newPropertyValue, oldPropertyValue)) {
                        change('update', name, oldPropertyValue, newValue);
                    }
                }
            };
            if (properties != null) {
                for (var name in properties) {
                    checkForChange(name);
                }
            } else {
                for (var name in oldValue) {
                    checkForChange(name);
                }
                for (var name in newValue) {
                    if (!oldValue.hasOwnProperty(name)) {
                        checkForChange(name);
                    }
                }
            }
            return changes;
        };
        observe.checkForChanges = function () {
            var maxCycles = 10;
            for (var i = 0; i < maxCycles; i++) {
                var totalChanges = 0;
                var pendingChanges = [];
                map.forEach(function (meta, key) {
                    var properties = meta.all > 0 ? null : meta.properties;
                    var changes = getChanges(meta.clone, meta.object, properties);
                    if (changes != null) {
                        totalChanges++;
                        meta.clone = clone(meta.object, properties);
                        pendingChanges.push([
                            changes,
                            meta.callbacks.slice(0),
                            meta
                        ]);
                    }
                });
                if (totalChanges === 0) {
                    return;
                }
                for (var _i = 0; _i < pendingChanges.length; _i++) {
                    var _ref6 = pendingChanges[_i];
                    var changes = _ref6[0];
                    var callbacks = _ref6[1];
                    for (var _i2 = 0; _i2 < callbacks.length; _i2++) {
                        var callback = callbacks[_i2];
                        callback(changes);
                    }
                }
            }
            throw new Error('Circular Object.observe dependency');
        };
        return {
            observe: observe,
            unobserve: unobserve
        };
    };
var test = exports.test = function () {
        var _ref = createShim();
        var observe = _ref.observe;
        var unobserve = _ref.unobserve;
        var object = {
                a: 1,
                b: {
                    c: 2,
                    d: 3
                }
            };
        var changes;
        var handler = function (c) {
            changes = c;
        };
        observe(object, handler);
        object.a = 2;
        delete object.b;
        object.c = 5;
        observe.checkForChanges();
        if (!(JSON.stringify(changes) === JSON.stringify([
                {
                    'type': 'update',
                    'name': 'a',
                    'oldValue': 1,
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                },
                {
                    'type': 'delete',
                    'name': 'b',
                    'oldValue': {
                        'c': 2,
                        'd': 3
                    },
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                },
                {
                    'type': 'add',
                    'name': 'c',
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                }
            ])))
            throw new Error('Assertion Failed: (JSON.stringify(changes) is JSON.stringify([{"type":"update","name":"a","oldValue":1,"object":{"a":2,"c":5}},{"type":"delete","name":"b","oldValue":{"c":2,"d":3},"object":{"a":2,"c":5}},{"type":"add","name":"c","object":{"a":2,"c":5}}]))');
        unobserve(object, handler);
    };
if (!(Object.observe != null) && global.Map != null) {
    console.warn('Shimming Object.observe');
    {
        var _ref2 = createShim();
        for (var key in _ref2) {
            var value = _ref2[key];
            Object[key] = value;
        }
    }
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Object.observe',_ion_es6_Object_observe_);
    else
      _ion_es6_Object_observe_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Object_observe_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Object.observe.map
void (function(){var _ion_es6_Set_ = function(module,exports,require){'use strict';
var ion = require('../');
require('./Map');
function SetShim(items) {
    if (items != null) {
        throw new Error('Don\'t add items in the constructor, IE implementation of Set breaks this');
    }
    var map = new Map();
    var methods = {
            has: function (key) {
                return map.has(key);
            },
            delete: function (key) {
                return map.delete(key);
            },
            add: function (key) {
                return map.set(key, true);
            },
            forEach: function (callback, thisArg) {
                map.forEach(ion.bind(function (value, key) {
                    callback.call(thisArg, key, this);
                }, this));
            }
        };
    for (var key in methods) {
        var value = methods[key];
        Object.defineProperty(this, key, { value: value });
    }
}
if (!(global.Set != null) || !(Set.prototype.forEach != null)) {
    if (global.window) {
        console.warn('Shimming Set');
    }
    global.Set = SetShim;
}
var test = exports.test = function () {
        var Set = global.Set;
        var a = {};
        var b = function () {
        };
        var set = new Set();
        set.add(a);
        set.add(b);
        if (!set.has(a))
            throw new Error('Assertion Failed: (set.has(a))');
        if (!set.has(b))
            throw new Error('Assertion Failed: (set.has(b))');
        set.delete(b);
        if (!!set.has(b))
            throw new Error('Assertion Failed: (not set.has(b))');
        set.add(b);
        if (!set.has(b))
            throw new Error('Assertion Failed: (set.has(b))');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Set',_ion_es6_Set_);
    else
      _ion_es6_Set_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Set_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Set.map
void (function(){var _ion_es6_String_ = function(module,exports,require){if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || this.length;
            position = position - searchString.length;
            var lastIndex = this.lastIndexOf(searchString);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

if (!String.prototype.contains ) {
    String.prototype.contains = function() {
        return this.indexOf(arguments) !== -1;
    };
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/String',_ion_es6_String_);
    else
      _ion_es6_String_.call(this, module, exports, require);
  }
  else {
    _ion_es6_String_.call(this);
  }
}).call(this)




void (function(){var _ion_runtime_BlockStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var BlockStatement = ion.defineClass({
        name: 'BlockStatement',
        properties: {
            activate: function () {
                BlockStatement.super.prototype.activate.apply(this, arguments);
                if (!(this.statements != null)) {
                    var _ref = [];
                    {
                        var _ref2 = this.body;
                        for (var _i = 0; _i < _ref2.length; _i++) {
                            var s = _ref2[_i];
                            _ref.push(this.context.createRuntime(s));
                        }
                    }
                    this.statements = _ref;
                }
                {
                    var _ref3 = this.statements;
                    for (var _i2 = 0; _i2 < _ref3.length; _i2++) {
                        var statement = _ref3[_i2];
                        statement.activate();
                    }
                }
            },
            deactivate: function () {
                BlockStatement.super.prototype.deactivate.apply(this, arguments);
                for (var i = this.statements.length - 1; i >= 0; i--) {
                    var statement = this.statements[i];
                    statement.deactivate();
                }
            }
        }
    }, Statement);
module.exports = exports = BlockStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/BlockStatement',_ion_runtime_BlockStatement_);
    else
      _ion_runtime_BlockStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_BlockStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./BlockStatement.map
void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression'), ArrayExpression = require('./ArrayExpression');
var _ref = {};
{
    _ref.args = null;
    _ref.activate = function () {
        CallExpression.super.prototype.activate.apply(this, arguments);
        this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
        this.calleeExpression.watch(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : ion.bind(function (value) {
            this.calleeValue = value;
            var thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
            if (thisArg !== this.thisArg) {
                ion.unobserve(this.thisarg, this.thisObserver);
                this.thisArg = thisArg;
                if (!(this.calleeValue != null ? this.calleeValue.template : void 0)) {
                    var deep = Array.isArray(thisArg);
                    if (deep) {
                        ion.patch.watch(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function (patch) {
                            this.evaluate();
                        }, this));
                    } else {
                        ion.observe(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function () {
                            this.evaluate();
                        }, this));
                    }
                }
            }
            this.evaluate();
        }, this));
        this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
            type: 'ArrayExpression',
            elements: this.arguments,
            observeElements: !(this.calleeValue != null ? this.calleeValue.template : void 0)
        });
        this.argumentExpressions.watch(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
            this.argumentsValue = value;
            this.evaluate();
        }, this));
    };
    _ref.deactivate = function () {
        CallExpression.super.prototype.deactivate.apply(this, arguments);
        this.calleeExpression.unwatch(this.calleeWatcher);
        this.argumentExpressions.unwatch(this.argumentWatcher);
        if (this.template != null) {
            this.template.unwatch(this.templateWatcher);
            delete this.template;
        }
    };
    _ref._evaluateInternal = function () {
        if (!(this.isActive && this.calleeValue != null && this.argumentsValue != null)) {
            return;
        }
        var value = void 0;
        if (this.calleeValue.template) {
            if (this.template != null) {
                this.template.unwatch(this.templateWatcher);
            }
            this.template = this.calleeValue.apply(this.thisArg, this.argumentsValue);
            this.template.watch(this.templateWatcher = this.templateWatcher != null ? this.templateWatcher : this.setValue.bind(this));
        } else {
            if (this.type === 'NewExpression') {
                value = ion.create(this.calleeValue, this.argumentsValue);
            } else {
                value = this.calleeValue.apply(this.thisArg, this.argumentsValue);
            }
            this.setValue(value);
        }
    };
    if (DEBUG) {
        _ref.evaluate = function () {
            try {
                this._evaluateInternal();
            } catch (e) {
                console.error(e.stack != null ? e.stack : e);
            }
        };
    } else {
        _ref.evaluate = function () {
            return this._evaluateInternal();
        };
    }
}
var CallExpression = ion.defineClass({
        name: 'CallExpression',
        properties: _ref
    }, DynamicExpression);
module.exports = CallExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/CallExpression',_ion_runtime_CallExpression_);
    else
      _ion_runtime_CallExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_CallExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./CallExpression.map
void (function(){var _ion_runtime_Context_ = function(module,exports,require){'use strict';
var ion = require('../'), Factory = require('./Factory'), Literal = require('./Literal');
var Context = ion.defineClass({
        name: 'Context',
        constructor: function Context(parent, output) {
            this.output = output;
            this.parent = parent;
            this.variables = {};
            this.root = (this.parent != null ? this.parent.root : void 0) != null ? this.parent.root : this;
        },
        properties: {
            newContext: function (output) {
                if (output == null)
                    output = this.output;
                return new Context(this, output);
            },
            createRuntime: function (node) {
                return Factory.createRuntime(this, node);
            },
            get: function (name) {
                var variable = this.getVariable(name);
                if (!(variable != null)) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                var value = variable.value;
                if (value === void 0) {
                    var watcher = function (a) {
                        if (a !== void 0) {
                            value = a;
                        }
                    };
                    variable.watch(watcher);
                    variable.unwatch(watcher);
                }
                return value;
            },
            getVariable: function (name) {
                var context = this, value;
                while (context != null) {
                    var variable = context.variables[name];
                    if (variable != null) {
                        return variable;
                    }
                    context = context.parent;
                }
                value = global[name];
                if (value === void 0) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                var cachedGlobals = this.root.globals = this.root.globals != null ? this.root.globals : {};
                return cachedGlobals[name] = cachedGlobals[name] != null ? cachedGlobals[name] : new Literal({ value: value });
            },
            setVariableFromAst: function (name, node) {
                if (name != null) {
                    this.setVariableExpression(name, this.createRuntime(node));
                }
            },
            setVariableLiteral: function (name, value) {
                if (name != null) {
                    this.setVariableExpression(name, new Literal({ value: value }));
                }
            },
            setVariableExpression: function (name, expression) {
                if (name != null) {
                    return this.variables[name] = expression;
                }
            }
        }
    });
module.exports = exports = Context;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Context',_ion_runtime_Context_);
    else
      _ion_runtime_Context_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Context_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Context.map
void (function(){var _ion_runtime_DynamicExpression_ = function(module,exports,require){'use strict';
var ion = require('../');
var DynamicExpression = ion.defineClass({
        name: 'DynamicExpression',
        properties: {
            isActive: false,
            activate: function () {
                this.isActive = true;
            },
            deactivate: function () {
                this.isActive = false;
            },
            watch: function (watcher) {
                var watchers = this._watchers = this._watchers != null ? this._watchers : [];
                if (watchers.length === 0) {
                    this.activate();
                }
                watchers.push(watcher);
                if (this.hasValue()) {
                    var value = this.getValue();
                    this._notifyWatcher(watcher, value);
                }
            },
            unwatch: function (watcher) {
                this._watchers.remove(watcher);
                if (this.hasValue()) {
                    this._notifyWatcher(watcher, void 0);
                }
                if (this._watchers.length === 0) {
                    this.deactivate();
                }
            },
            _notifyWatcher: function (watcher, value) {
                return watcher.call(this, value);
            },
            notify: function () {
                if (this._watchers != null) {
                    var value = this.getValue();
                    {
                        var _ref = this._watchers;
                        for (var _i = 0; _i < _ref.length; _i++) {
                            var watcher = _ref[_i];
                            this._notifyWatcher(watcher, value);
                        }
                    }
                }
                return;
            },
            hasValue: function () {
                return this.hasOwnProperty('value');
            },
            getValue: function () {
                return this.value;
            },
            setValue: function (value) {
                if (value !== this.value || !this.hasValue()) {
                    this.value = value;
                    this.notify();
                }
                return;
            }
        },
        test: function () {
            var d = new DynamicExpression();
            if (d.getValue() !== void 0) {
                throw 'd.getValue() != undefined';
            }
            var total = 10;
            var watcher = function (value) {
                if (value !== void 0) {
                    total += value;
                }
            };
            d.watch(watcher);
            if (!(total === 10))
                throw new Error('Assertion Failed: (total is 10)');
            d.setValue(10);
            if (!(d.getValue() === 10))
                throw new Error('Assertion Failed: (d.getValue() is 10)');
            if (!(total === 20))
                throw new Error('Assertion Failed: (total is 20)');
            d.setValue(20);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
            d.unwatch(watcher);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
            d.setValue(50);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
        }
    }, require('./Expression'));
module.exports = exports = DynamicExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/DynamicExpression',_ion_runtime_DynamicExpression_);
    else
      _ion_runtime_DynamicExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_DynamicExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./DynamicExpression.map
void (function(){var _ion_runtime_Expression_ = function(module,exports,require){'use strict';
var ion = require('../');
var Expression = ion.defineClass({
        name: 'Expression',
        properties: {
            watch: function (watcher) {
                throw new Error('not implemented');
            },
            unwatch: function (watcher) {
                throw new Error('not implemented');
            }
        }
    }, require('./Node'));
module.exports = exports = Expression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Expression',_ion_runtime_Expression_);
    else
      _ion_runtime_Expression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Expression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Expression.map
void (function(){var _ion_runtime_ExpressionStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var ExpressionStatement = ion.defineClass({
        name: 'ExpressionStatement',
        properties: {
            activate: function () {
                ExpressionStatement.super.prototype.activate.apply(this, arguments);
                this.runtimeExpression = this.runtimeExpression != null ? this.runtimeExpression : this.context.createRuntime(this.expression);
                this.runtimeExpression.watch(this.runtimeExpressionWatcher = this.runtimeExpressionWatcher != null ? this.runtimeExpressionWatcher : ion.bind(function (value) {
                    if (this.expressionValue !== value) {
                        this.expressionValue = value;
                        this._remove != null ? this._remove() : void 0;
                        this._remove = null;
                        if (this.context.output != null && value !== void 0) {
                            this._remove = ion.add(this.context.output, value);
                        }
                    }
                }, this));
            },
            deactivate: function () {
                ExpressionStatement.super.prototype.deactivate.apply(this, arguments);
                this.runtimeExpression.unwatch(this.runtimeExpressionWatcher);
            }
        }
    }, Statement);
module.exports = exports = ExpressionStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ExpressionStatement',_ion_runtime_ExpressionStatement_);
    else
      _ion_runtime_ExpressionStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ExpressionStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ExpressionStatement.map
void (function(){var _ion_runtime_Factory_ = function(module,exports,require){'use strict';
var ion = require('../');
var Literal = require('./Literal');
var Expression = require('./Expression');
var Factory = ion.defineClass({
        name: 'Factory',
        properties: {
            runtime: './OperationExpression',
            createRuntime: {
                writable: true,
                value: function (context, ast) {
                    var properties = ion.clone(ast);
                    properties.context = context;
                    properties.factory = this;
                    var type = require(this.runtime);
                    return new type(properties);
                }
            }
        }
    });
Factory;
var lookup = {
        type: {
            VariableDeclaration: ion.patch(new Factory(), { runtime: './VariableDeclaration' }),
            ThisExpression: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    return context.getVariable('this');
                }
            }),
            Identifier: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    return context.getVariable(ast.name);
                }
            }),
            Function: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    var value = ast.value;
                    if (ast.context) {
                        value = value(context);
                    }
                    return new Literal({ value: value });
                }
            }),
            Template: ion.patch(new Factory(), { runtime: './Template' }),
            Literal: ion.patch(new Factory(), { runtime: './Literal' }),
            Property: ion.patch(new Factory(), { runtime: './Property' }),
            IfStatement: ion.patch(new Factory(), { runtime: './IfStatement' }),
            BlockStatement: ion.patch(new Factory(), { runtime: './BlockStatement' }),
            ReturnStatement: ion.patch(new Factory(), { runtime: './ReturnStatement' }),
            ObjectExpression: ion.patch(new Factory(), { runtime: './ObjectExpression' }),
            ArrayExpression: ion.patch(new Factory(), { runtime: './ArrayExpression' }),
            ExpressionStatement: ion.patch(new Factory(), { runtime: './ExpressionStatement' }),
            ForOfStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            ForInStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            MemberExpression: ion.patch(new Factory(), { runtime: './MemberExpression' }),
            CallExpression: ion.patch(new Factory(), { runtime: './CallExpression' }),
            NewExpression: ion.patch(new Factory(), { runtime: './CallExpression' }),
            UnaryExpression: {
                operator: {
                    '!': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return !a;
                        }
                    }),
                    'typeof': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return typeof a;
                        }
                    }),
                    'void': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return void a;
                        }
                    }),
                    '-': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return -a;
                        }
                    }),
                    '+': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return +a;
                        }
                    }),
                    '~': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return ~a;
                        }
                    }),
                    '?': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return a != null;
                        }
                    })
                }
            },
            ConditionalExpression: ion.patch(new Factory(), {
                evaluate: function (test, consequent, alternate) {
                    return test ? consequent : alternate;
                }
            }),
            BinaryExpression: {
                operator: {
                    '*': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left * right;
                        }
                    }),
                    '/': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left / right;
                        }
                    }),
                    '%': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left % right;
                        }
                    }),
                    '+': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left + right;
                        }
                    }),
                    '-': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left - right;
                        }
                    }),
                    '&&': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left && right;
                        }
                    }),
                    '||': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left || right;
                        }
                    }),
                    '&': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left & right;
                        }
                    }),
                    '|': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left | right;
                        }
                    }),
                    '==': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left == right;
                        }
                    }),
                    '!=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left != right;
                        }
                    }),
                    '===': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left === right;
                        }
                    }),
                    '!==': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left !== right;
                        }
                    }),
                    '<': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left < right;
                        }
                    }),
                    '>': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left > right;
                        }
                    }),
                    '<=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left <= right;
                        }
                    }),
                    '>=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left >= right;
                        }
                    })
                }
            }
        }
    };
function getFactory(ast, step) {
    if (step == null)
        step = lookup;
    for (var key in step) {
        var values = step[key];
        var nodeValue = ast[key];
        var next = values[nodeValue];
        if (next != null) {
            if (next.constructor === Factory) {
                return next;
            }
            return getFactory(ast, next);
        }
    }
    return null;
}
var createRuntime = exports.createRuntime = function (context, ast) {
        if (typeof (ast != null ? ast.type : void 0) !== 'string') {
            ast = {
                type: 'Literal',
                value: ast
            };
        }
        var factory = getFactory(ast);
        if (!(factory != null)) {
            throw new Error('Factory not found for ast:\n' + JSON.stringify(ast, null, '  '));
        }
        return factory.createRuntime(context, ast);
    }, test = exports.test = function () {
        var factory = getFactory({
                type: 'BinaryExpression',
                operator: '>',
                left: {
                    type: 'Literal',
                    value: 1
                },
                right: {
                    type: 'Literal',
                    value: 2
                }
            });
        if (!(factory === lookup.type.BinaryExpression.operator['>']))
            throw new Error('Assertion Failed: (factory is lookup.type.BinaryExpression.operator[">"])');
        if (!(lookup.type.BinaryExpression.operator['>'] != null))
            throw new Error('Assertion Failed: (lookup.type.BinaryExpression.operator[">"]?)');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Factory',_ion_runtime_Factory_);
    else
      _ion_runtime_Factory_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Factory_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Factory.map
void (function(){var _ion_runtime_ForInOfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement'), DynamicExpression = require('./DynamicExpression');
var ForInOfStatement = ion.defineClass({
        name: 'ForInOfStatement',
        properties: {
            toKey: function (name) {
                if (this.type === 'ForOfStatement') {
                    return parseInt(name);
                } else {
                    return name;
                }
            },
            forEach: function (collection, callback) {
                if (this.type === 'ForOfStatement') {
                    for (var key = 0; key < collection.length; key++) {
                        var value = collection[key];
                        callback(key, value);
                    }
                } else {
                    for (var key in collection) {
                        var value = collection[key];
                        callback(key, value);
                    }
                }
            },
            activate: function () {
                ForInOfStatement.super.prototype.activate.apply(this, arguments);
                if (!(this.statements != null)) {
                    this.statements = {};
                    this.valueName = this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1].id.name : void 0;
                    this.keyName = this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0].id.name : void 0;
                }
                this.collectionExpression = this.collectionExpression != null ? this.collectionExpression : this.context.createRuntime(this.right);
                this.collectionExpression.watch(this.collectionWatcher = this.collectionWatcher != null ? this.collectionWatcher : ion.bind(function (collection) {
                    if (this.collection !== collection) {
                        if (this.collection != null) {
                            this.forEach(this.collection, ion.bind(function (key, value) {
                                this.removeItem(key, value);
                            }, this));
                            ion.unobserve(this.collection, this.collectionObserver);
                        }
                        this.collection = collection;
                        if (this.collection != null) {
                            this.forEach(this.collection, ion.bind(function (key, value) {
                                this.addItem(key, value);
                            }, this));
                            ion.observe(this.collection, this.collectionObserver = this.collectionObserver != null ? this.collectionObserver : this.applyChanges.bind(this));
                        }
                    }
                }, this));
            },
            deactivate: function () {
                ForInOfStatement.super.prototype.deactivate.apply(this, arguments);
                this.collectionExpression.unwatch(this.collectionWatcher);
            },
            addItem: function (key, value, activate) {
                if (activate == null)
                    activate = true;
                if (value !== void 0) {
                    var newContext = this.context.newContext();
                    if (this.valueName != null) {
                        newContext.setVariableExpression(this.valueName, new DynamicExpression({ value: value }));
                    }
                    if (this.keyName != null) {
                        newContext.setVariableExpression(this.keyName, new DynamicExpression({ value: key }));
                    }
                    var statement = newContext.createRuntime(this.body);
                    this.statements[key] = statement;
                    if (activate) {
                        statement.activate();
                    }
                    return statement;
                }
            },
            removeItem: function (key, value) {
                var statement = this.statements[key];
                if (statement != null) {
                    this.disposeStatement(statement);
                }
                delete this.statements[key];
                return statement;
            },
            disposeStatement: function (statement) {
                if (this.remove != null) {
                    var removeStatement = statement.context.createRuntime(this.remove);
                    removeStatement.activate();
                }
                statement.deactivate();
            },
            summarize: function (changes) {
                var ignoreProperty = ion.bind(function (name) {
                        if (!(name != null)) {
                            return true;
                        }
                        if (name[0] === '_') {
                            return true;
                        }
                        if (name === 'length' && this.type === 'ForOfStatement') {
                            return true;
                        }
                        return false;
                    }, this);
                var map = new Map();
                for (var _i = 0; _i < changes.length; _i++) {
                    var _ref = changes[_i];
                    var type = _ref.type;
                    var object = _ref.object;
                    var name = _ref.name;
                    var oldValue = _ref.oldValue;
                    if (!ignoreProperty(name)) {
                        if (!map.has(name)) {
                            map.set(name, {
                                type: type,
                                object: object,
                                name: name,
                                oldValue: oldValue
                            });
                        } else {
                            var change = map.get(name);
                            change.type = type;
                        }
                    }
                }
                var array = [];
                map.forEach(function (change, name, object) {
                    var newValue = change.object[name];
                    if (newValue !== change.oldValue) {
                        delete change.object;
                        array.push(change);
                    }
                });
                return array;
            },
            applyChanges: function (changes) {
                changes = this.summarize(changes);
                if (changes.length === 0) {
                    return;
                }
                var recyclableStatements = new Map();
                var getRecycleKey = ion.bind(function (key, value) {
                        return this.type === 'ForOfStatement' ? value : key;
                    }, this);
                var activateStatements = [];
                for (var _i2 = 0; _i2 < changes.length; _i2++) {
                    var _ref2 = changes[_i2];
                    var name = _ref2.name;
                    var oldValue = _ref2.oldValue;
                    var key = this.toKey(name);
                    if (oldValue !== void 0) {
                        var rkey = getRecycleKey(key, oldValue);
                        var statement = this.statements[key];
                        if (statement != null) {
                            delete this.statements[key];
                            recyclableStatements.set(rkey, statement);
                        }
                    }
                }
                for (var _i3 = 0; _i3 < changes.length; _i3++) {
                    var _ref3 = changes[_i3];
                    var name = _ref3.name;
                    var oldValue = _ref3.oldValue;
                    var newValue = this.collection[name];
                    var key = this.toKey(name);
                    if (newValue !== void 0) {
                        var rkey = getRecycleKey(key, newValue);
                        var statement = recyclableStatements.get(rkey);
                        if (statement != null) {
                            if (this.type === 'ForOfStatement') {
                                if (this.keyName != null) {
                                    statement.context.variables[this.keyName].setValue(key);
                                }
                            } else {
                                if (this.valueName != null) {
                                    statement.context.variables[this.valueName].setValue(newValue);
                                }
                            }
                            this.statements[key] = statement;
                            recyclableStatements.delete(rkey);
                        } else {
                            statement = this.addItem(key, newValue, false);
                            if (statement != null) {
                                activateStatements.push(statement);
                            }
                        }
                    }
                }
                recyclableStatements.forEach(ion.bind(function (statement) {
                    this.disposeStatement(statement);
                }, this));
                for (var _i4 = 0; _i4 < activateStatements.length; _i4++) {
                    var statement = activateStatements[_i4];
                    statement.activate();
                }
            }
        }
    }, Statement);
module.exports = exports = ForInOfStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ForInOfStatement',_ion_runtime_ForInOfStatement_);
    else
      _ion_runtime_ForInOfStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ForInOfStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ForInOfStatement.map
void (function(){var _ion_runtime_IfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var IfStatement = ion.defineClass({
        name: 'IfStatement',
        properties: {
            activate: function () {
                IfStatement.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.testExpression.watch(this.testExpressionWatcher = this.testExpressionWatcher != null ? this.testExpressionWatcher : ion.bind(function (value) {
                    if (value) {
                        if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                            this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                            delete this.alternateStatement;
                        }
                        this.consequentStatement = this.consequentStatement != null ? this.consequentStatement : this.context.createRuntime(this.consequent);
                        this.consequentStatement.activate();
                    } else {
                        if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                            this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                            delete this.consequentStatement;
                        }
                        if (this.alternate != null) {
                            this.alternateStatement = this.alternateStatement != null ? this.alternateStatement : this.context.createRuntime(this.alternate);
                            this.alternateStatement.activate();
                        }
                    }
                }, this));
            },
            deactivate: function () {
                IfStatement.super.prototype.deactivate.apply(this, arguments);
                this.testExpression.unwatch(this.testExpressionWatcher);
                if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                    this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                }
                if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                    this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                }
            }
        }
    }, Statement);
module.exports = exports = IfStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/IfStatement',_ion_runtime_IfStatement_);
    else
      _ion_runtime_IfStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_IfStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./IfStatement.map
void (function(){var _ion_runtime_index_ = function(module,exports,require){Object.defineProperty(exports, 'ArrayExpression', {get:function(){ return require('./ArrayExpression') }}) 
Object.defineProperty(exports, 'BlockStatement', {get:function(){ return require('./BlockStatement') }}) 
Object.defineProperty(exports, 'CallExpression', {get:function(){ return require('./CallExpression') }}) 
Object.defineProperty(exports, 'Context', {get:function(){ return require('./Context') }}) 
Object.defineProperty(exports, 'DynamicExpression', {get:function(){ return require('./DynamicExpression') }}) 
Object.defineProperty(exports, 'Expression', {get:function(){ return require('./Expression') }}) 
Object.defineProperty(exports, 'ExpressionStatement', {get:function(){ return require('./ExpressionStatement') }}) 
Object.defineProperty(exports, 'Factory', {get:function(){ return require('./Factory') }}) 
Object.defineProperty(exports, 'ForInOfStatement', {get:function(){ return require('./ForInOfStatement') }}) 
Object.defineProperty(exports, 'IfStatement', {get:function(){ return require('./IfStatement') }}) 
Object.defineProperty(exports, 'Literal', {get:function(){ return require('./Literal') }}) 
Object.defineProperty(exports, 'MemberExpression', {get:function(){ return require('./MemberExpression') }}) 
Object.defineProperty(exports, 'Node', {get:function(){ return require('./Node') }}) 
Object.defineProperty(exports, 'ObjectExpression', {get:function(){ return require('./ObjectExpression') }}) 
Object.defineProperty(exports, 'OperationExpression', {get:function(){ return require('./OperationExpression') }}) 
Object.defineProperty(exports, 'Property', {get:function(){ return require('./Property') }}) 
Object.defineProperty(exports, 'ReturnStatement', {get:function(){ return require('./ReturnStatement') }}) 
Object.defineProperty(exports, 'Statement', {get:function(){ return require('./Statement') }}) 
Object.defineProperty(exports, 'Template', {get:function(){ return require('./Template') }}) 
Object.defineProperty(exports, 'VariableDeclaration', {get:function(){ return require('./VariableDeclaration') }}) 
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/index',_ion_runtime_index_);
    else
      _ion_runtime_index_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_index_.call(this);
  }
}).call(this)
void (function(){var _ion_runtime_Literal_ = function(module,exports,require){'use strict';
var ion = require('../');
var Literal = ion.defineClass({
        name: 'Literal',
        properties: {
            watch: function (watcher) {
                watcher(this.value);
            },
            unwatch: function (watcher) {
                watcher(void 0);
            }
        }
    }, require('./Expression'));
module.exports = exports = Literal;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Literal',_ion_runtime_Literal_);
    else
      _ion_runtime_Literal_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Literal_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Literal.map
void (function(){var _ion_runtime_MemberExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var MemberExpression = ion.defineClass({
        name: 'MemberExpression',
        properties: {
            activate: function () {
                MemberExpression.super.prototype.activate.apply(this, arguments);
                this.objectExpression = this.objectExpression != null ? this.objectExpression : this.context.createRuntime(this.object);
                this.propertyExpression = this.propertyExpression != null ? this.propertyExpression : this.context.createRuntime(this.computed ? this.property : this.property.name);
                this.propertyExpression.watch(this.propertyWatcher = this.propertyWatcher != null ? this.propertyWatcher : ion.bind(function (propertyValue) {
                    this.propertyValue = propertyValue;
                    this.updateValue();
                }, this));
                this.objectExpression.watch(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : ion.bind(function (objectValue) {
                    this.objectValue = objectValue;
                    this.updateValue();
                }, this));
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.objectExpression.unwatch(this.objectWatcher);
                this.propertyExpression.unwatch(this.propertyWatcher);
            },
            updateValue: function () {
                var value = void 0;
                if (this.objectValue != null && this.propertyValue != null) {
                    value = this.objectValue[this.propertyValue];
                }
                this.setValue(value);
                if (this.observedObject !== this.objectValue || this.observedProperty !== this.propertyValue) {
                    this.observedObject = this.objectValue;
                    this.observedProperty = this.propertyValue;
                    this.objectObserver != null ? this.objectObserver() : void 0;
                    if (this.objectValue != null) {
                        this.objectObserver = ion.observe(this.objectValue, ion.bind(function (changes) {
                            this.updateValue();
                        }, this), this.propertyValue);
                    }
                }
            },
            setMemberValue: function (value) {
                if (this.objectValue != null && this.propertyValue != null) {
                    this.objectValue[this.propertyValue] = value;
                }
            }
        }
    }, DynamicExpression);
module.exports = exports = MemberExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/MemberExpression',_ion_runtime_MemberExpression_);
    else
      _ion_runtime_MemberExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_MemberExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./MemberExpression.map
void (function(){var _ion_runtime_Node_ = function(module,exports,require){'use strict';
var ion = require('../');
var Node = ion.defineClass({ name: 'Node' });
module.exports = exports = Node;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Node',_ion_runtime_Node_);
    else
      _ion_runtime_Node_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Node_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Node.map
void (function(){var _ion_runtime_ObjectExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ObjectExpression = ion.defineClass({
        name: 'ObjectExpression',
        properties: {
            setLeftValue: function (value) {
                this.value = value;
            },
            activate: function () {
                ObjectExpression.super.prototype.activate.apply(this, arguments);
                this.typeExpression = this.typeExpression != null ? this.typeExpression : this.context.createRuntime(this.objectType != null ? this.objectType : null);
                this.typeExpression.watch(this.typeWatcher = this.typeWatcher != null ? this.typeWatcher : ion.bind(function (type) {
                    var value;
                    if (!ion.is(this.value, type)) {
                        this.statements != null ? this.statements.deactivate() : void 0;
                        this.statements = null;
                        value = type != null ? type : {};
                    } else {
                        value = this.value;
                    }
                    if (value != null && !(this.statements != null)) {
                        var newContext = this.context.newContext(value);
                        this.statements = newContext.createRuntime({
                            type: 'BlockStatement',
                            body: this.properties
                        });
                        this.statements.activate();
                    }
                    this.setValue(value);
                }, this));
            },
            deactivate: function () {
                ObjectExpression.super.prototype.deactivate.apply(this, arguments);
                this.typeExpression.unwatch(this.typeWatcher);
            }
        }
    }, DynamicExpression);
module.exports = exports = ObjectExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ObjectExpression',_ion_runtime_ObjectExpression_);
    else
      _ion_runtime_ObjectExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ObjectExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ObjectExpression.map
void (function(){var _ion_runtime_OperationExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var OperationExpression = ion.defineClass({
        name: 'OperationExpression',
        constructor: function OperationExpression(properties) {
            OperationExpression.super.apply(this, arguments);
            if (!(this.args != null)) {
                if (this.type === 'BinaryExpression') {
                    this.args = [
                        this.left,
                        this.right
                    ];
                } else if (this.type === 'UnaryExpression') {
                    this.args = [this.argument];
                } else if (this.type === 'ConditionalExpression') {
                    this.args = [
                        this.test,
                        this.consequent,
                        this.alternate
                    ];
                }
            }
        },
        properties: {
            args: null,
            activate: function () {
                OperationExpression.super.prototype.activate.apply(this, arguments);
                this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
                    type: 'ArrayExpression',
                    elements: this.args,
                    observeElements: this.factory.observe
                });
                this.argumentExpressions.watch(this.watcher = this.watcher != null ? this.watcher : ion.bind(function (value) {
                    this.argumentValues = value;
                    this.evaluate();
                }, this));
            },
            deactivate: function () {
                OperationExpression.super.prototype.deactivate.apply(this, arguments);
                this.argumentExpressions.unwatch(this.watcher);
            },
            evaluate: function () {
                if (!(this.factory.evaluate != null)) {
                    throw new Error('evaluate method not defined for operation: ' + this.factory);
                }
                var value = this.factory.evaluate.apply(this.context, this.argumentValues);
                this.setValue(value);
            }
        }
    }, DynamicExpression);
module.exports = OperationExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/OperationExpression',_ion_runtime_OperationExpression_);
    else
      _ion_runtime_OperationExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_OperationExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./OperationExpression.map
void (function(){var _ion_runtime_Property_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var Property = ion.defineClass({
        name: 'Property',
        properties: {
            activate: function () {
                Property.super.prototype.activate.apply(this, arguments);
                this.keyExpression = this.keyExpression != null ? this.keyExpression : this.context.createRuntime(this.computed ? this.key : this.key.name != null ? this.key.name : this.key.value);
                this.valueExpression = this.valueExpression != null ? this.valueExpression : this.context.createRuntime(this.value);
                this.keyExpression.watch(this.keyWatcher = this.keyWatcher != null ? this.keyWatcher : ion.bind(function (key) {
                    if (key != null && this.valueExpression.setLeftValue != null) {
                        var currentValue = this.context.output ? this.context.output != null ? this.context.output[key] : void 0 : this.context.get(key);
                        if (currentValue != null) {
                            this.valueExpression.setLeftValue(currentValue);
                        }
                    }
                    this.keyValue = key;
                    this.setProperty();
                }, this));
                this.valueExpression.watch(this.valueWatcher = this.valueWatcher != null ? this.valueWatcher : ion.bind(function (value) {
                    this.valueValue = value;
                    this.setProperty();
                }, this));
            },
            deactivate: function () {
                Property.super.prototype.deactivate.apply(this, arguments);
                ion.unobserve(this.context.output, this.contextObserver, this.leftValue);
                this.keyExpression.unwatch(this.keyWatcher);
                this.valueExpression.unwatch(this.valueWatcher);
            },
            setProperty: function (key, value) {
                if (key == null)
                    key = this.keyValue;
                if (value == null)
                    value = this.valueValue;
                var explicitUndefined = this.value.operator === 'void';
                if (key != null && (value !== void 0 || explicitUndefined)) {
                    var currentValue = this.context.output != null ? this.context.output[key] : void 0;
                    if (explicitUndefined || currentValue !== value && this.context.output != null) {
                        this.context.output[key] = value;
                    }
                }
            }
        }
    }, Statement);
module.exports = exports = Property;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Property',_ion_runtime_Property_);
    else
      _ion_runtime_Property_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Property_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Property.map
void (function(){var _ion_runtime_ReturnStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var ReturnStatement = ion.defineClass({
        name: 'ReturnStatement',
        properties: {
            activate: function () {
                ReturnStatement.super.prototype.activate.apply(this, arguments);
                this.argumentExpression = this.argumentExpression != null ? this.argumentExpression : this.context.createRuntime(this.argument);
                this.argumentExpression.watch(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
                    return this.context.returnExpression.setValue(value);
                }, this));
            },
            deactivate: function () {
                ReturnStatement.super.prototype.deactivate.apply(this, arguments);
                this.argumentExpression.unwatch(this.argumentWatcher);
            }
        }
    }, Statement);
module.exports = exports = ReturnStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ReturnStatement',_ion_runtime_ReturnStatement_);
    else
      _ion_runtime_ReturnStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ReturnStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ReturnStatement.map
void (function(){var _ion_runtime_Statement_ = function(module,exports,require){'use strict';
var ion = require('../');
var Statement = ion.defineClass({
        name: 'Statement',
        properties: {
            isActive: false,
            activate: function () {
                this.isActive = true;
            },
            deactivate: function () {
                this.isActive = false;
            }
        }
    }, require('./Node'));
module.exports = exports = Statement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Statement',_ion_runtime_Statement_);
    else
      _ion_runtime_Statement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Statement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Statement.map
void (function(){var _ion_runtime_Template_ = function(module,exports,require){'use strict';
var ion = require('../'), BlockStatement = require('./BlockStatement'), DynamicExpression = require('./DynamicExpression'), noop = function () {
    };
var Template = ion.defineClass({
        name: 'Template',
        constructor: function Template() {
            Template.super.apply(this, arguments);
            this.context.returnExpression = new DynamicExpression();
        },
        properties: {
            watch: function (watcher) {
                if (watcher == null)
                    watcher = noop;
                if (!this.isActive) {
                    this.activate();
                }
                this.context.returnExpression.watch(watcher);
            },
            unwatch: function (watcher) {
                this.context.returnExpression.unwatch(watcher);
                if (!this.context.returnExpression.isActive) {
                    this.deactivate();
                }
            }
        }
    }, BlockStatement);
module.exports = exports = Template;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Template',_ion_runtime_Template_);
    else
      _ion_runtime_Template_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Template_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Template.map
void (function(){var _ion_runtime_VariableDeclaration_ = function(module,exports,require){'use strict';
var ion = require('../');
var Statement = require('./Statement');
var VariableDeclaration = ion.defineClass({
        name: 'VariableDeclaration',
        constructor: function VariableDeclaration() {
            VariableDeclaration.super.apply(this, arguments);
            {
                var _ref = this.declarations;
                for (var _i = 0; _i < _ref.length; _i++) {
                    var _ref2 = _ref[_i];
                    var name = _ref2.id.name;
                    var init = _ref2.init;
                    this.context.setVariableFromAst(name, init);
                }
            }
        }
    }, Statement);
module.exports = exports = VariableDeclaration;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/VariableDeclaration',_ion_runtime_VariableDeclaration_);
    else
      _ion_runtime_VariableDeclaration_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_VariableDeclaration_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./VariableDeclaration.map

void (function(){var _ion_test_index_ = function(module,exports,require){Object.defineProperty(exports, 'immediateTemplates', {get:function(){ return require('./immediateTemplates') }}) 
Object.defineProperty(exports, 'ionCompiler', {get:function(){ return require('./ionCompiler') }}) 
Object.defineProperty(exports, 'ionCompilerES5', {get:function(){ return require('./ionCompilerES5') }}) 
Object.defineProperty(exports, 'reactiveTemplates', {get:function(){ return require('./reactiveTemplates') }}) 
Object.defineProperty(exports, 'sourceSize', {get:function(){ return require('./sourceSize') }}) 
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/index',_ion_test_index_);
    else
      _ion_test_index_.call(this, module, exports, require);
  }
  else {
    _ion_test_index_.call(this);
  }
}).call(this)
void (function(){var _ion_test_ionCompiler_ = function(module,exports,require){var index, ion, tests;

ion = require('../');

index = require('../compiler');

tests = {
  "let x = 10": "'use strict';\nlet x = 10;",
  "for name, value of foo\n    console.log(name + value)": "'use strict';\nfor (let name in foo) {\n    let value = foo[name];\n    console.log(name + value);\n}",
  "for let name, value of {a:1,b:2,c:3}\n    console.log(name + value)": "'use strict';\n{\n    let _ref = {\n            a: 1,\n            b: 2,\n            c: 3\n        };\n    for (let name in _ref) {\n        let value = _ref[name];\n        console.log(name + value);\n    }\n}    ",
  "for let name in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "for name, index in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let index = _i;\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "let object =\n    x: 1\n    y: 2\n    foo:\n        z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        foo: { z: 3 }\n    };",
  "let array = []\n    1\n    2\n    3": "'use strict';\nlet array = [\n        1,\n        2,\n        3\n    ];",
  "let kids = []\n    {}\n        name: \"Alpha\"\n        age: 10\n    {}\n        name: \"Beta\"\n        age: 8": "'use strict';\nlet kids = [\n        {\n            name: 'Alpha',\n            age: 10\n        },\n        {\n            name: 'Beta',\n            age: 8\n        }\n    ];",
  "try\n    doSomething(1)\ncatch e\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    log(e);\n}",
  "try\n    doSomething(1)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} finally {\n    log(e);\n}",
  "try\n    doSomething(1)\ncatch e\n    console.error(e)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    console.error(e);\n} finally {\n    log(e);\n}",
  "for key, name of foo\n    if name is 'a'\n        break\n    else if name is 'b'\n        continue\n    else if name is 'c'\n        return\n    else if name is 'd'\n        throw new Error(\"D\")\n    else\n        return\n            x: 1\n            y: 2": "'use strict';\nfor (let key in foo) {\n    let name = foo[key];\n    if (name === 'a') {\n        break;\n    } else if (name === 'b') {\n        continue;\n    } else if (name === 'c') {\n        return;\n    } else if (name === 'd') {\n        throw new Error('D');\n    } else {\n        return {\n            x: 1,\n            y: 2\n        };\n    }\n}",
  "console.log(\"Hello {{name}}\")": "'use strict';\nconsole.log('Hello ' + name);",
  "console.log(\"{{name}}\")": "'use strict';\nconsole.log('' + name);",
  "console.log(\"{{ 1 }}{{ 2 }}\")": "'use strict';\nconsole.log('' + 1 + 2);",
  "return \"\"\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>' + title + '</title></head>\\n    <body>\\n    ' + body + '\\n    </body>\\n</html>';",
  "return ''\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>{{ title }}</title></head>\\n    <body>\\n    {{ body }}\\n    </body>\\n</html>';",
  "do -> x": "'use strict';\n(function () {\n    return x;\n}());",
  "do (x, y) => x + y": "'use strict';\nconst ion = require('ion');\nion.bind(function (x, y) {\n    return x + y;\n}, this)(x, y);",
  "const ion = import \"ion\"": "'use strict';\nconst ion = require('ion');",
  "export\n    secret: 97542": "'use strict';\nmodule.exports = exports = { secret: 97542 };",
  "export let x = 1, y = 2": "'use strict';\nlet x = exports.x = 1, y = exports.y = 2;",
  "export const\n    x = 1\n    y = 2\n    z = 3": "'use strict';\nconst x = exports.x = 1, y = exports.y = 2, z = exports.z = 3;",
  "let {x,y} = {x:1,y:2}": "'use strict';\nlet _ref = {\n        x: 1,\n        y: 2\n    };\nlet x = _ref.x;\nlet y = _ref.y;",
  "for key, {x:[a,b],y:{c:d}} of points\n    console.log(x, y)": "'use strict';\nfor (let key in points) {\n    let _ref = points[key];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "for {x:[a,b],y:{c:d}}, index in points\n    console.log(x, y)": "'use strict';\nfor (let _i = 0; _i < points.length; _i++) {\n    let index = _i;\n    let _ref = points[_i];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "foo ? bar": "'use strict';\nfoo != null ? foo : bar;",
  "foo ?? bar": "'use strict';\nfoo != void 0 ? foo : bar;",
  "let x\nx ?= y": "'use strict';\nlet x;\nx = x != null ? x : y;",
  "let x\nx ??= y": "'use strict';\nlet x;\nx = x != void 0 ? x : y;",
  "for const x, index in foo\n    log(x)": "'use strict';\nfor (let _i = 0; _i < foo.length; _i++) {\n    const index = _i;\n    const x = foo[_i];\n    log(x);\n}",
  "let x = 1, y = 2\n[x,y] = [y,x]": "'use strict';\nlet x = 1, y = 2;\nconst _ref = [\n        y,\n        x\n    ];\nx = _ref[0];\ny = _ref[1];",
  "a?.b": "'use strict';\na != null ? a.b : void 0;",
  "a?.b.c?.d": "'use strict';\na != null ? a.b.c != null ? a.b.c.d : void 0 : void 0;",
  "a?()": "'use strict';\na != null ? a() : void 0;",
  "a?.b?.c?()": "'use strict';\na != null ? a.b != null ? a.b.c != null ? a.b.c() : void 0 : void 0 : void 0;",
  "a?.b().c?()": "'use strict';\na != null ? a.b().c != null ? a.b().c() : void 0 : void 0;",
  "let y = (x) -> 2": "'use strict';\nlet y = function (x) {\n    return 2;\n};",
  "s?": "'use strict';\ns != null;",
  "# also test comments\nlet regex = /foo/": "'use strict';\nlet regex = /foo/;",
  "for let i = 0; i < 10; i++\n    console.log(i)": "'use strict';\nfor (let i = 0; i < 10; i++) {\n    console.log(i);\n}",
  "for key of object if key[0] isnt '_' for c in key\n    console.log(c)": "'use strict';\nfor (let key in object) {\n    if (key[0] !== '_') {\n        for (let _i = 0; _i < key.length; _i++) {\n            let c = key[_i];\n            console.log(c);\n        }\n    }\n}",
  "console.log([key for key of object if key is cool])": "'use strict';\nlet _ref = [];\nfor (let key in object) {\n    if (key === cool) {\n        _ref.push(key);\n    }\n}\nconsole.log(_ref);",
  "console.log(\n    1\n    2\n    {}\n        x: 1\n        y: 2\n)": "'use strict';\nconsole.log(1, 2, {\n    x: 1,\n    y: 2\n});",
  "let x = ->\n    try\n        foo()\n        bar()\n    catch e\n        baz()": "'use strict';\nlet x = function () {\n    try {\n        foo();\n        bar();\n    } catch (e) {\n        baz();\n    }\n};",
  "if foo\n    # bar": "'use strict';\nif (foo) {\n}",
  "let trim = (a = \"\") -> a.trim()": "'use strict';\nlet trim = function (a) {\n    if (a == null)\n        a = '';\n    return a.trim();\n};",
  "foo(\n    1\n    2\n)": "'use strict';\nfoo(1, 2);",
  "compile(\n    foo: 1\n    bar: 2\n    baz:\n        a: 1\n        b: 2\n)": "'use strict';\ncompile({\n    foo: 1,\n    bar: 2,\n    baz: {\n        a: 1,\n        b: 2\n    }\n});",
  "let array = [1,2,3]\n    4\n    5\n    6": "'use strict';\nlet array = [\n        1,\n        2,\n        3,\n        4,\n        5,\n        6\n    ];",
  "let point = new Point(10, 20)\n    z: 30": "'use strict';\nconst ion = require('ion');\nlet point = ion.patch(new Point(10, 20), { z: 30 });",
  "let object = {x:1, y:2}\n    z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        z: 3\n    };",
  "let origin = new Point\n    x: 1\n    y: 2": "'use strict';\nconst ion = require('ion');\nlet origin = ion.patch(new Point(), {\n        x: 1,\n        y: 2\n    });",
  "let origin = new Line\n    a: new Point\n        x: 0\n        y: 0\n    b: new Point\n        x: 10\n        y: 20": "'use strict';\nconst ion = require('ion');\nlet origin = ion.patch(new Line(), {\n        a: ion.patch(new Point(), {\n            x: 0,\n            y: 0\n        }),\n        b: ion.patch(new Point(), {\n            x: 10,\n            y: 20\n        })\n    });",
  "input:\n    # ignore this comment\n    x: 10\n    y: 20\n    z:\n        # also ignore this one\n        a: 1\n        b: 2\n    w: new Point\n        x: 0\n        y: 0": "'use strict';\nconst ion = require('ion');\n{\n    input.x = 10;\n    input.y = 20;\n    input.z = ion.patch(input.z, {\n        a: 1,\n        b: 2\n    });\n    input.w = ion.patch(new Point(), {\n        x: 0,\n        y: 0\n    });\n}",
  "let point = new Point\n    [x]: 1\n    [y]: 2": "'use strict';\nlet point = new Point();\n{\n    point[x] = 1;\n    point[y] = 2;\n}",
  "let self = @\nlet x = @x\nlet y = @.y\nlet z = this.z": "'use strict';\nlet self = this;\nlet x = this.x;\nlet y = this.y;\nlet z = this.z;",
  "let x = {}\n    [key]: value": "'use strict';\nlet x = {};\nx[key] = value;",
  "if foo\n    return {}\n        for key, value of object\n            [key]: value": "'use strict';\nif (foo) {\n    let _ref = {};\n    for (let key in object) {\n        let value = object[key];\n        _ref[key] = value;\n    }\n    return _ref;\n}",
  "for x, y, z of foo\n    log(foo)": {
    line: 1,
    column: 11
  },
  "export let x": {
    line: 1,
    column: 12
  },
  "export const x": {
    line: 1,
    column: 14
  },
  "export const x = 1\nexport {y:2}": {
    line: 2,
    column: 1
  },
  "const x = 1\nx = 2": {
    line: 2,
    column: 1
  },
  "const double = (x) ->\n    x *= 2\n    return x": "'use strict';\nconst double = function (x) {\n    x *= 2;\n    return x;\n};",
  "x = 1": {
    line: 1,
    column: 1
  },
  "let x = 1\nlet x = 2": {
    line: 2,
    column: 5
  },
  "let x = 1\nconst double = (x) ->\n    return x": "'use strict';\nlet x = 1;\nconst double = function (x) {\n    return x;\n};",
  "console.log(x)\nif a\n    let x = 1": {
    line: 1,
    column: 13
  },
  "if typeof a is 'string' and void a and delete a.b\n    log(a)": "'use strict';\nif (typeof a === 'string' && void a && delete a.b) {\n    log(a);\n}",
  "if 1\n    # 1\n    # 2\n    x = 12": {
    line: 4,
    column: 5
  },
  "export const\n    BlockStatement =\n        isBlock: true\n        newScope: tr ue": {
    line: 4,
    column: 22
  },
  "export class Foo extends import 'Bar'\n    constructor: (x,y) ->\n        @x = x\n        @y = y\n    properties:\n        x: 1\n        y: 2\n        getXY: -> [@x,@y]\n    isThisPropertyStatic: true": "'use strict';\nconst ion = require('ion');\nconst Foo = ion.defineClass({\n        name: 'Foo',\n        constructor: function Foo(x, y) {\n            this.x = x;\n            this.y = y;\n        },\n        properties: {\n            x: 1,\n            y: 2,\n            getXY: function () {\n                return [\n                    this.x,\n                    this.y\n                ];\n            }\n        },\n        isThisPropertyStatic: true\n    }, require('Bar'));\nmodule.exports = exports = Foo;",
  "const double(a) -> a * 2": "'use strict';\nfunction double(a) {\n    return a * 2;\n}",
  "const double(a) -> a * 2\ndouble = 12": {
    line: 2,
    column: 1
  },
  "let object =\n    const double(a) -> a * 2\n    if a\n        [key]: value\n    else\n        foo: double(2)": "'use strict';\nlet object = {};\n{\n    function double(a) {\n        return a * 2;\n    }\n    if (a) {\n        object[key] = value;\n    } else {\n        object.foo = double(2);\n    }\n}",
  "let items = []\n    for key, value of window\n        value": "'use strict';\nlet items = [];\nfor (let key in window) {\n    let value = window[key];\n    items.push(value);\n}",
  "let foo = div()\n    span()\n        'Hello'": "'use strict';\nconst ion = require('ion');\nlet foo = div();\nlet _ref = span();\nion.add(_ref, 'Hello');\nion.add(foo, _ref);",
  "const ion = import './'\nlet foo = div()\n    span()\n        'Hello'": "'use strict';\nconst ion = require('./');\nlet foo = div();\nlet _ref = span();\nion.add(_ref, 'Hello');\nion.add(foo, _ref);",
  "const translate({x,y}) ->\n    x++\n    y++\n    return {x,y}": "'use strict';\nfunction translate(_ref) {\n    let x = _ref.x;\n    let y = _ref.y;\n    x++;\n    y++;\n    return {\n        x: x,\n        y: y\n    };\n}",
  "let x = foo(\n    ''\n        multiline string literal\n    \"\"\n        multiline string template\n)": "'use strict';\nlet x = foo('multiline string literal', 'multiline string template');",
  "assert x is 2": "'use strict';\nif (!(x === 2))\n    throw new Error('Assertion Failed: (x is 2)');",
  "export class Point\n    constructor: ->\n        # call super with arguments object\n        super\n        # call super again with explicit arguments\n        super(width, height)\n        # calling twice is silly, but legal\n    properties:\n        x: 0\n        y: 0\n        superIdentifier: (x, y) -> super\n        superExplicit: (a, b) -> super(a, b)": "'use strict';\nconst ion = require('ion');\nconst Point = ion.defineClass({\n        name: 'Point',\n        constructor: function Point() {\n            Point.super.apply(this, arguments);\n            Point.super.call(this, width, height);\n        },\n        properties: {\n            x: 0,\n            y: 0,\n            superIdentifier: function (x, y) {\n                return Point.super.prototype.superIdentifier.apply(this, arguments);\n            },\n            superExplicit: function (a, b) {\n                return Point.super.prototype.superExplicit.call(this, a, b);\n            }\n        }\n    });\nmodule.exports = exports = Point;",
  "const spreadFunction1(a, b, ...c) ->\n    log(1)\nconst spreadFunction2(a, b, ...c, d, e) ->\n    log(2)\nconst spreadFunction3(a,b, ...c, {d,e}) ->\n    log(3)": "'use strict';\nfunction spreadFunction1(a, b, ___c) {\n    let c = Array.prototype.slice.call(arguments, 2);\n    log(1);\n}\nfunction spreadFunction2(a, b, ___c, d, e) {\n    let c = Array.prototype.slice.call(arguments, 2, arguments.length - 2);\n    d = arguments[arguments.length - 2];\n    e = arguments[arguments.length - 1];\n    log(2);\n}\nfunction spreadFunction3(a, b, ___c, _ref) {\n    let c = Array.prototype.slice.call(arguments, 2, arguments.length - 1);\n    _ref = arguments[arguments.length - 1];\n    let d = _ref.d;\n    let e = _ref.e;\n    log(3);\n}",
  "# default value for a should be set before b\nconst foo(a = 0, b = a) -> a + b": "'use strict';\nfunction foo(a, b) {\n    if (a == null)\n        a = 0;\n    if (b == null)\n        b = a;\n    return a + b;\n}",
  "export template ->\n    # cannot define classes in templates\n    class Poo": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot for loop in templates\n    for let i = 0; i < 10; i++\n        console.log(i)": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot export in templates\n    export x": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot try/catch in templates\n    try\n        return 0\n    catch e\n        return 1": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot throw errors in templates\n    throw new Error": {
    line: 3,
    column: 5
  },
  "export template ->\n    const x = 12\n    # cannot assign to const variables, make sure enforced within template\n    x = 10\n    return x": {
    line: 4,
    column: 5
  },
  "export template ->\n    let x = 12\n    # cannot assign to let variables either.\n    x = 12\n    return x": {
    line: 4,
    column: 5
  },
  "export template ->\n    let x = {y:10}\n    # cannot assign to anything really.\n    x.y = 12\n    return x.y": {
    line: 4,
    column: 5
  },
  "export template (a) ->\n    # cannot assign to parameters either\n    a = 10\n    return a": {
    line: 3,
    column: 5
  },
  "export class Foo\n    constructor: ->\n        # there was a problem with existential operators not processing within class definitions\n        if properties?\n            log(properties)": "'use strict';\nconst ion = require('ion');\nconst Foo = ion.defineClass({\n        name: 'Foo',\n        constructor: function Foo() {\n            if (properties != null) {\n                log(properties);\n            }\n        }\n    });\nmodule.exports = exports = Foo;",
  "const ctor = @@\nconst ctorName = @@name": "'use strict';\nconst ctor = this.constructor;\nconst ctorName = this.constructor.name;",
  "const inlineThrow() -> throw new Error('inline throw')": "'use strict';\nfunction inlineThrow() {\n    throw new Error('inline throw');\n}",
  "class DynamicExpression\n    watch: ->\n        let x = @x ?= []": "'use strict';\nconst ion = require('ion');\nconst DynamicExpression = ion.defineClass({\n        name: 'DynamicExpression',\n        watch: function () {\n            let x = this.x = this.x != null ? this.x : [];\n        }\n    });\nDynamicExpression;",
  "let a = new Point(\n    1\n    2\n)": "'use strict';\nlet a = new Point(1, 2);",
  "let x = [y for y in z]": "'use strict';\nlet _ref = [];\nfor (let _i = 0; _i < z.length; _i++) {\n    let y = z[_i];\n    _ref.push(y);\n}\nlet x = _ref;",
  "return\n    z: []\n        let items = [3,2,1]\n        for item in items\n            item * 2": "'use strict';\nlet _ref = [];\n{\n    let items = [\n            3,\n            2,\n            1\n        ];\n    for (let _i = 0; _i < items.length; _i++) {\n        let item = items[_i];\n        _ref.push(item * 2);\n    }\n}\nreturn { z: _ref };",
  "let x = `y == null`": "'use strict';\nlet x = y == null;",
  "# should get accurate error locations even from inline javascript expressions\nlet x = `y := null`": {
    line: 2,
    column: 13
  },
  "let x = 0 in Array\nlet y = \"foo\" instanceof String": "'use strict';\nlet x = 0 in Array;\nlet y = 'foo' instanceof String;",
  "let output\noutput :=\n    x: 1\n    y: 2": "'use strict';\nconst ion = require('ion');\nlet output;\noutput = ion.patch(output, {\n    x: 1,\n    y: 2\n});",
  "output:\n    for a in b\n        [c]: d": "'use strict';\nfor (let _i = 0; _i < b.length; _i++) {\n    let a = b[_i];\n    output[c] = d;\n}",
  "output: {}\n    x: 1": {
    line: 1,
    column: 9
  },
  "[output]:\n    x: 1": {
    line: 1,
    column: 2
  },
  "#\n#\n\n#": "'use strict';",
  "[a for a in b]\n[a for a in c]": "'use strict';\nlet _ref = [];\nfor (let _i = 0; _i < b.length; _i++) {\n    let a = b[_i];\n    _ref.push(a);\n}\n_ref;\nlet _ref2 = [];\nfor (let _i2 = 0; _i2 < c.length; _i2++) {\n    let a = c[_i2];\n    _ref2.push(a);\n}\n_ref2;",
  "let array = []\n    1, 0, 0\n    0, 1, 0\n    0, 0, 1": "'use strict';\nlet array = [\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n    ];",
  "import(foo).bar": "'use strict';\nrequire(foo).bar;",
  "let x = []\n    ->": "'use strict';\nlet x = [function () {\n        }];",
  "x:\n    delete: true": "'use strict';\nx.delete = true;",
  "return\n    style:\n        fontSize: \"0.7em\"\n    \"delete\"": "'use strict';\nconst ion = require('ion');\nlet _ref = {};\n{\n    _ref.style = ion.patch(_ref.style, { fontSize: '0.7em' });\n    ion.add(_ref, 'delete');\n}\nreturn _ref;",
  "content:\n    name: 'foo'\n    1\n    2": "'use strict';\nconst ion = require('ion');\n{\n    content.name = 'foo';\n    ion.add(content, 1);\n    ion.add(content, 2);\n}",
  "for name, file of directory\n    write(name, file)\nelse\n    delete(name)": "'use strict';\nfor (let name in directory) {\n    let file = directory[name];\n    write(name, file);\n}",
  "foo(\n    bar()\n    baz(\n        1\n        2\n    )\n)": "'use strict';\nfoo(bar(), baz(1, 2));",
  "\n            console.log('ion')": "'use strict';\nconsole.log('ion');"
};

if (global.window != null) {
  return;
}

exports.test = function() {
  var e, error, expected, input, key, loc, options, output, value;
  for (input in tests) {
    expected = tests[input];
    options = {
      target: 'es6'
    };
    if (expected === null) {
      loc = false;
      console.log('---------------------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        postprocess: false,
        loc: loc
      }, options)), null, '  '));
      console.log('-Postprocessed-------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        generate: false,
        loc: loc
      }, options)), null, '  '));
      console.log('---------------------------------------------------');
      console.log(index.compile(input, ion.patch({
        loc: loc
      }, options)));
    } else if (typeof expected === 'object') {
      error = null;
      try {
        index.compile(input, options);
      } catch (_error) {
        e = _error;
        error = e;
        for (key in expected) {
          value = expected[key];
          if (value !== e[key]) {
            throw new Error("\n" + (JSON.stringify(e)) + "\n!=\n" + (JSON.stringify(expected)));
          }
        }
      }
      if (error == null) {
        throw new Error("Expected an error: " + (JSON.stringify(expected)));
      }
    } else {
      output = index.compile(input, options);
      if (output.trim() !== expected.trim()) {
        console.log('-Output---------------------------------------------');
        console.log(output);
        throw new Error("\n" + output + "\n!=\n" + expected);
      }
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/ionCompiler',_ion_test_ionCompiler_);
    else
      _ion_test_ionCompiler_.call(this, module, exports, require);
  }
  else {
    _ion_test_ionCompiler_.call(this);
  }
}).call(this)
void (function(){var _ion_test_ionCompilerES5_ = function(module,exports,require){var index, ion, tests;

ion = require('../');

index = require('../compiler');

tests = {
  "let x = 10": "'use strict';\nvar x = 10;",
  "let x = 10\nif foo\n    let y = 20\nif bar\n    const y = 30": "'use strict';\nvar x = 10;\nif (foo) {\n    var y = 20;\n}\nif (bar) {\n    var y = 30;\n}",
  "export class StampFilter\n    stamp: (key, object) ->\n        for name, property of key.type.properties if property.stamp\n            log(name)": "'use strict';\nvar ion = require('ion');\nvar StampFilter = ion.defineClass({\n        name: 'StampFilter',\n        stamp: function (key, object) {\n            {\n                var _ref = key.type.properties;\n                for (var name in _ref) {\n                    var property = _ref[name];\n                    if (property.stamp) {\n                        log(name);\n                    }\n                }\n            }\n        }\n    });\nmodule.exports = exports = StampFilter;",
  "let element =\n    (body: 2)": "'use strict';\nvar ion = require('ion');\nvar element = {};\n{\n    var _body = 2;\n    element.body = _body;\n    ion.add(element, _body);\n}",
  "(foo: bar)\n    x: 1": {
    line: 1,
    column: 2
  }
};

if (global.window != null) {
  return;
}

exports.test = function() {
  var e, error, expected, input, key, options, output, value;
  for (input in tests) {
    expected = tests[input];
    options = {
      target: 'es5'
    };
    if (expected === null) {
      console.log('---------------------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        postprocess: false,
        loc: true
      }, options)), null, '  '));
      console.log('-Postprocessed-------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        generate: false,
        loc: true
      }, options)), null, '  '));
      console.log('---------------------------------------------------');
      console.log(index.compile(input, ion.patch({
        loc: true
      }, options)));
    } else if (typeof expected === 'object') {
      error = null;
      try {
        index.compile(input, options);
      } catch (_error) {
        e = _error;
        error = e;
        for (key in expected) {
          value = expected[key];
          if (value !== e[key]) {
            throw new Error("\n" + (JSON.stringify(e)) + "\n!=\n" + (JSON.stringify(expected)));
          }
        }
      }
      if (error == null) {
        throw new Error("Expected an error: " + (JSON.stringify(expected)));
      }
    } else {
      output = index.compile(input, options);
      if (output.trim() !== expected.trim()) {
        console.log('-Output---------------------------------------------');
        console.log(output);
        throw new Error("\n" + output + "\n!=\n" + expected);
      }
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/ionCompilerES5',_ion_test_ionCompilerES5_);
    else
      _ion_test_ionCompilerES5_.call(this, module, exports, require);
  }
  else {
    _ion_test_ionCompilerES5_.call(this);
  }
}).call(this)
void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var _ref4 = [];
{
    _ref4.push('this');
    var object = {
            x: 1,
            y: 2
        };
    _ref4.push(object);
    _ref4.push(ion.template(function () {
        return ion.createRuntime({
            type: 'Template',
            body: [{
                    type: 'ReturnStatement',
                    argument: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'MemberExpression',
                            computed: false,
                            object: { type: 'ThisExpression' },
                            property: {
                                type: 'Identifier',
                                name: 'x'
                            }
                        },
                        right: {
                            type: 'MemberExpression',
                            computed: false,
                            object: { type: 'ThisExpression' },
                            property: {
                                type: 'Identifier',
                                name: 'y'
                            }
                        }
                    }
                }],
            bound: false
        }, {
            this: this,
            object: object,
            ion: ion,
            _ref4: _ref4,
            templates: templates,
            _ref5: _ref5
        });
    }));
    _ref4.push(object);
    _ref4.push({ x: 10 });
    _ref4.push(12);
}
var templates = [
        [
            'regular expression',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'name'
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'replace'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: /a/g
                                    },
                                    {
                                        type: 'Literal',
                                        value: 'b'
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            { name: 'alpha' },
            {},
            'blphb'
        ],
        [
            'array comprehension for of',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ArrayExpression',
                                    elements: []
                                },
                                properties: [{
                                        type: 'ForInStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        body: {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Identifier',
                                                name: 'key'
                                            }
                                        }
                                    }]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                a: 1,
                b: 2
            },
            {
                b: void 0,
                c: 3
            },
            [
                'a',
                'c'
            ]
        ],
        [
            'imperative functions',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'double'
                                    },
                                    init: {
                                        type: 'Function',
                                        context: false,
                                        value: function double(a) {
                                            return a * 2;
                                        }
                                    }
                                }],
                            kind: 'const'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ObjectExpression',
                                    properties: []
                                },
                                properties: [{
                                        type: 'ForInStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    value: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'double'
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'value'
                                                            }]
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
                                        },
                                        remove: null
                                    }]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                z: 3,
                y: void 0
            },
            {
                x: 8,
                y: 4,
                z: 6
            }
        ],
        [
            'for else statements',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ObjectExpression',
                                    properties: []
                                },
                                properties: [{
                                        type: 'ForInStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
                                        },
                                        remove: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    value: {
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        prefix: true,
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 0
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
                                        }
                                    }]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                y: void 0,
                z: 3
            },
            {
                x: 4,
                z: 3
            }
        ],
        [
            'shared variables functions',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'factor'
                                    },
                                    init: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!=',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'properties'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'factor'
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null
                                            }
                                        },
                                        consequent: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'factor'
                                            }
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: 3
                                        }
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'multiply'
                                    },
                                    init: {
                                        type: 'Function',
                                        context: true,
                                        value: function (_context) {
                                            return function multiply(a) {
                                                var factor = _context.get('factor');
                                                return a * factor;
                                            };
                                        }
                                    }
                                }],
                            kind: 'const'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ObjectExpression',
                                    properties: []
                                },
                                properties: [{
                                        type: 'ForInStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'IfStatement',
                                                    test: {
                                                        type: 'BinaryExpression',
                                                        operator: '!==',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: 'factor'
                                                        }
                                                    },
                                                    consequent: {
                                                        type: 'BlockStatement',
                                                        body: [{
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'key'
                                                                },
                                                                value: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'multiply'
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'value'
                                                                        }]
                                                                },
                                                                kind: 'init',
                                                                computed: true
                                                            }]
                                                    }
                                                }]
                                        },
                                        remove: null
                                    }]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                y: void 0,
                z: 5,
                factor: 10
            },
            {
                x: 40,
                y: 6,
                z: 50
            }
        ],
        [
            'reactive destructured parameters',
            {},
            ion.template(function (_ref) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        computed: false
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'b'
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        computed: false
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    type: 'Identifier',
                                    name: 'a'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'b'
                                }
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    _ref: _ref,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                a: 1,
                b: 2
            },
            { a: 5 },
            7
        ],
        [
            'array comprehension for in',
            {},
            ion.template(function (_ref2) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'items'
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref2'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'items'
                                        },
                                        computed: false
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ArrayExpression',
                                    elements: []
                                },
                                properties: [{
                                        type: 'ForOfStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'i'
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'items'
                                        },
                                        body: {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'i'
                                                }
                                            }
                                        }
                                    }]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    _ref2: _ref2,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                items: [
                    1,
                    2,
                    3
                ]
            },
            { items: { 3: 4 } },
            [
                1,
                3,
                5,
                7
            ]
        ],
        [
            'changing object with function',
            {},
            ion.template(function (object) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'object'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'sum'
                                    }
                                },
                                arguments: []
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    object: object,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {
                sum: function () {
                    return this.x + this.y;
                },
                x: 1,
                y: 2
            },
            { x: 6 },
            8
        ],
        [
            'nested templates',
            {},
            function () {
                return ion.template(function (object) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'sum'
                                        },
                                        init: ion.template(function (_ref3) {
                                            return ion.createRuntime({
                                                type: 'Template',
                                                body: [
                                                    {
                                                        type: 'VariableDeclaration',
                                                        declarations: [{
                                                                type: 'VariableDeclarator',
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'a'
                                                                },
                                                                init: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: '_ref3'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'deep'
                                                                        },
                                                                        computed: false
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'a'
                                                                    },
                                                                    computed: false
                                                                }
                                                            }],
                                                        kind: 'let'
                                                    },
                                                    {
                                                        type: 'VariableDeclaration',
                                                        declarations: [{
                                                                type: 'VariableDeclarator',
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'b'
                                                                },
                                                                init: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: '_ref3'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'deep'
                                                                        },
                                                                        computed: false
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'b'
                                                                    },
                                                                    computed: false
                                                                }
                                                            }],
                                                        kind: 'let'
                                                    },
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'BinaryExpression',
                                                            operator: '+',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'a'
                                                            },
                                                            right: {
                                                                type: 'Identifier',
                                                                name: 'b'
                                                            }
                                                        }
                                                    }
                                                ],
                                                bound: false,
                                                name: {
                                                    type: 'Identifier',
                                                    name: 'sum'
                                                }
                                            }, {
                                                this: this,
                                                _ref3: _ref3,
                                                object: object,
                                                ion: ion,
                                                _ref4: _ref4,
                                                templates: templates,
                                                _ref5: _ref5
                                            });
                                        })
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'sum'
                                    },
                                    arguments: [{
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'object'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'one'
                                            }
                                        }]
                                }
                            }
                        ],
                        bound: false
                    }, {
                        this: this,
                        ion: ion,
                        object: object,
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    });
                });
            }(),
            {
                one: {
                    deep: {
                        a: 1,
                        b: 2
                    }
                }
            },
            { one: { deep: { a: 2 } } },
            4
        ],
        [
            'literal objects',
            {},
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'touch'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        kind: 'init'
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'touch-start'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        kind: 'init'
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                });
            }),
            {},
            {},
            {
                touch: 1,
                'touch-start': 2
            }
        ],
        _ref4,
        function () {
            var alpha = 100;
            var beta = 200;
            var charlie = 300;
            var next = 0;
            var nextId = function () {
                return next++;
            };
            return [
                'for in reuse values',
                {},
                ion.template(function (items) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ArrayExpression',
                                        elements: []
                                    },
                                    properties: [{
                                            type: 'ForOfStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'item'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'index'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'items'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'id'
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId'
                                                                        },
                                                                        arguments: []
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'number'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'item'
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'index'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'index'
                                                                    },
                                                                    kind: 'init'
                                                                }
                                                            ]
                                                        }
                                                    }]
                                            },
                                            remove: null
                                        }]
                                }
                            }],
                        bound: false
                    }, {
                        this: this,
                        items: items,
                        alpha: alpha,
                        beta: beta,
                        charlie: charlie,
                        next: next,
                        nextId: nextId,
                        ion: ion,
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    });
                }),
                [
                    alpha,
                    beta,
                    charlie
                ],
                {
                    0: alpha,
                    1: charlie,
                    2: void 0
                },
                [
                    {
                        id: 0,
                        number: alpha,
                        index: 0
                    },
                    {
                        id: 2,
                        number: charlie,
                        index: 1
                    }
                ]
            ];
        }(),
        function () {
            var next = 0;
            var nextId = function () {
                return next++;
            };
            return [
                'for of reuse keys',
                {},
                ion.template(function (items) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ArrayExpression',
                                        elements: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'items'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'id'
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId'
                                                                        },
                                                                        arguments: []
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'key'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'key'
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'value'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'value'
                                                                    },
                                                                    kind: 'init'
                                                                }
                                                            ]
                                                        }
                                                    }]
                                            },
                                            remove: null
                                        }]
                                }
                            }],
                        bound: false
                    }, {
                        this: this,
                        items: items,
                        next: next,
                        nextId: nextId,
                        ion: ion,
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    });
                }),
                {
                    alpha: 1,
                    beta: 2,
                    charlie: 3
                },
                {
                    beta: 3,
                    charlie: void 0
                },
                [
                    {
                        id: 0,
                        key: 'alpha',
                        value: 1
                    },
                    {
                        id: 1,
                        key: 'beta',
                        value: 3
                    }
                ]
            ];
        }()
    ];
var _ref5 = {};
for (var _i = 0; _i < templates.length; _i++) {
    var _ref6 = templates[_i];
    var name = _ref6[0];
    var thisArg = _ref6[1];
    var templateType = _ref6[2];
    var argument = _ref6[3];
    var patch = _ref6[4];
    var expected = _ref6[5];
    if (expected != null) {
        _ref5[name] = function (thisArg, templateType, argument, patch, expected) {
            return function (done) {
                var template = templateType.call(thisArg, argument);
                function checkIfDone(check) {
                    if (JSON.stringify(check) === JSON.stringify(expected)) {
                        template.deactivate();
                        done();
                    }
                }
                template.activate();
                template.watch(function (value) {
                    checkIfDone(value);
                    ion.observe(value, function (changes) {
                        checkIfDone(value);
                    });
                });
                ion.patch(argument, patch);
                ion.checkForChanges();
            };
        }(thisArg, templateType, argument, patch, expected);
    }
}
module.exports = exports = { test: _ref5 };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/reactiveTemplates',_ion_test_reactiveTemplates_);
    else
      _ion_test_reactiveTemplates_.call(this, module, exports, require);
  }
  else {
    _ion_test_reactiveTemplates_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./reactiveTemplates.map
void (function(){var _ion_test_sourceSize_ = function(module,exports,require){'use strict';
if (global.window) {
    return;
}
var fs = require('fs');
var np = require('path');
var total = 0;
var files = 0;
var printSize = function (fileOrDirectory) {
    var stats = fs.statSync(fileOrDirectory);
    if (stats.isDirectory()) {
        {
            var _ref = fs.readdirSync(fileOrDirectory);
            for (var _i = 0; _i < _ref.length; _i++) {
                var file = _ref[_i];
                printSize(np.join(fileOrDirectory, file));
            }
        }
    } else {
        if (fileOrDirectory.match(/\.css$/)) {
            return;
        }
        var content = fs.readFileSync(fileOrDirectory, 'utf8');
        var size = 0;
        {
            var _ref2 = content.split(/[\r\n]+/g);
            for (var _i2 = 0; _i2 < _ref2.length; _i2++) {
                var line = _ref2[_i2];
                var chars = line.trim();
                var comment = chars.match(/^(#|(\/\/))/);
                if (!comment) {
                    size += chars.length;
                }
            }
        }
        total += size;
        files++;
        console.log(fileOrDirectory + ' : ' + size);
    }
};
if (require.main === module) {
    var args = process.argv.slice(2);
    for (var _i3 = 0; _i3 < args.length; _i3++) {
        var arg = args[_i3];
        printSize(arg);
    }
    console.log('---------------------------------------');
    console.log('Total Files : ' + files);
    console.log('Total Bytes : ' + total);
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/sourceSize',_ion_test_sourceSize_);
    else
      _ion_test_sourceSize_.call(this, module, exports, require);
  }
  else {
    _ion_test_sourceSize_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./sourceSize.map
void (function(){var _ion_WEB_INF_index_ = function(module,exports,require){
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/WEB-INF/index',_ion_WEB_INF_index_);
    else
      _ion_WEB_INF_index_.call(this, module, exports, require);
  }
  else {
    _ion_WEB_INF_index_.call(this);
  }
}).call(this)
