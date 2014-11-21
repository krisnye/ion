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
void (function(){var _ion_Object_ = function(module,exports,require){'use strict';
var ion = require('./');
var typeKey = '$';
var _ref2 = {};
{
    _ref2[typeKey] = ion.patch(_ref2[typeKey], {
        visible: false,
        type: 'string'
    });
    _ref2.toJSON = function () {
        var properties = {};
        if (this.constructor.id != null) {
            properties[this.constructor.typeKey] = this.constructor.id;
        }
        {
            var _ref = this;
            for (var key in _ref) {
                var value = _ref[key];
                if (this.hasOwnProperty(key)) {
                    properties[key] = value;
                }
            }
        }
        return properties;
    };
}
var Object = ion.defineClass({
        name: 'Object',
        constructor: function Object(properties) {
            if (properties != null) {
                for (var key in properties) {
                    var value = properties[key];
                    var value = properties[key];
                    this[key] = value;
                }
            }
        },
        typeKey: typeKey,
        is: function (object) {
            return object != null ? object.constructor.types != null ? object.constructor.types.has != null ? object.constructor.types.has(this) : void 0 : void 0 : void 0;
        },
        properties: _ref2,
        test: function () {
            var object = new Object();
            if (!Object.is(object))
                throw new Error('Assertion Failed: (Object.is(object))');
        }
    }, null);
module.exports = exports = Object;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/Object',_ion_Object_);
    else
      _ion_Object_.call(this, module, exports, require);
  }
  else {
    _ion_Object_.call(this);
  }
}).call(this)
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
void (function(){var _ion_WEB_INF_java_index_ = function(module,exports,require){
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/WEB-INF/java/index',_ion_WEB_INF_java_index_);
    else
      _ion_WEB_INF_java_index_.call(this, module, exports, require);
  }
  else {
    _ion_WEB_INF_java_index_.call(this);
  }
}).call(this)
void (function(){var _ion_browser_elements_ = function(module,exports,require){'use strict';
var ion = require('../');
var changeHandler = function change() {
    ion.checkForChanges();
};
var changeElements = {
        input: true,
        select: true,
        textarea: true
    };
var elements = [
        'div',
        'span',
        'input',
        'textarea',
        'a',
        'br',
        'img',
        'button',
        'caption',
        'fieldset',
        'form',
        'frame',
        'frameset',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'legend',
        'menu',
        'option',
        'select',
        'script',
        'pre',
        'table',
        'tbody',
        'td',
        'tr',
        'thead',
        'canvas',
        'head',
        'meta',
        'body',
        'script',
        'section',
        'header',
        'footer',
        'article',
        'ul',
        'ol',
        'li',
        'label',
        'strong'
    ];
var _ref = {};
for (var _i = 0; _i < elements.length; _i++) {
    var name = elements[_i];
    _ref[name] = function (name) {
        return function (attributes) {
            var element = document.createElement(name);
            if (changeElements[name]) {
                ion.add(element, changeHandler);
            }
            if (attributes != null) {
                for (var key in attributes) {
                    var value = attributes[key];
                    element.setAttribute(key, value);
                }
            }
            return element;
        };
    }(name);
}
module.exports = exports = _ref;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/elements',_ion_browser_elements_);
    else
      _ion_browser_elements_.call(this, module, exports, require);
  }
  else {
    _ion_browser_elements_.call(this);
  }
}).call(this)
void (function(){var _ion_browser_index_ = function(module,exports,require){Object.defineProperty(exports, 'elements', {get:function(){ return require('./elements') }, enumerable: true}) 
Object.defineProperty(exports, 'require', {get:function(){ return require('./require') }, enumerable: true}) 
Object.defineProperty(exports, 'tester', {get:function(){ return require('./tester') }, enumerable: true}) 
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
  var array, duration, e, error, expectedCallbacks, getIncompleteCallbacks, handler, inc, key, module, moduleId, name, timeout, waitingForFinishTimeout, warning, _i, _len;
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
    timeout = (function(_this) {
      return function() {
        var _j, _len1;
        inc = getIncompleteCallbacks();
        for (_j = 0, _len1 = inc.length; _j < _len1; _j++) {
          name = inc[_j];
          callback(name, error, warning);
        }
        return callback();
      };
    })(this);
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






















void (function(){var _ion_es6_Array_ = function(module,exports,require){'use strict';
if (!(Array.prototype.add != null)) {
    Object.defineProperty(Array.prototype, 'add', { value: Array.prototype.push });
}
if (!(Array.prototype.remove != null)) {
    Object.defineProperty(Array.prototype, 'remove', {
        value: function () {
            for (var _i = 0; _i < arguments.length; _i++) {
                var item = arguments[_i];
                var index = this.lastIndexOf(item);
                if (index >= 0) {
                    this.splice(index, 1);
                }
            }
        }
    });
}
if (!(Array.prototype.contains != null)) {
    Object.defineProperty(Array.prototype, 'contains', {
        value: function (item) {
            return this.indexOf(item) >= 0;
        }
    });
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Array',_ion_es6_Array_);
    else
      _ion_es6_Array_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Array_.call(this);
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
void (function(){var _ion_index_ = function(module,exports,require){'use strict';
var ion = null;
require('./es6');
global.DEBUG = global.DEBUG != null ? global.DEBUG : false;
var primitive = {
        string: true,
        number: true,
        boolean: true,
        function: true
    }, isPrimitive = function (object) {
        return !(object != null) || primitive[typeof object] || false;
    }, normalizeProperty = function (property, name) {
        if (typeof property === 'function') {
            property = {
                writable: false,
                value: property
            };
        } else if (isPrimitive(property) || Array.isArray(property)) {
            property = { value: property };
        }
        if (!(property.get != null) && !(property.set != null) && !property.hasOwnProperty('value')) {
            property.value = void 0;
        }
        if (property.hasOwnProperty('value')) {
            property.writable = property.writable != null ? property.writable : true;
        }
        property.name = name;
        return property;
    }, normalizeProperties = function (properties) {
        if (properties == null)
            properties = {};
        for (var name in properties) {
            var property = properties[name];
            properties[name] = normalizeProperty(property, name);
        }
        return properties;
    }, variableArgConstructs = [
        function (type, a) {
            return new type();
        },
        function (type, a) {
            return new type(a[0]);
        },
        function (type, a) {
            return new type(a[0], a[1]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
        }
    ], nodeObserveShim = (Object.observe != null ? Object.observe.checkForChanges : void 0) ? Object : require('./es6/Object.observe').createShim(), isObjectObservable = function () {
        var Node = global.Node != null ? global.Node : function () {
            };
        var NodeList = global.NodeList != null ? global.NodeList : function () {
            };
        return function (a) {
            if (a instanceof Node || a instanceof NodeList) {
                return false;
            }
            return true;
        };
    }();
var patch = exports.patch = function () {
        var mergePatch = require('./mergePatch');
        var patch = function (object, patch) {
            return mergePatch.merge(object, patch);
        };
        for (var key in mergePatch) {
            var value = mergePatch[key];
            patch[key] = value;
        }
        return patch;
    }(), create = exports.create = function (type, args) {
        return variableArgConstructs[args.length](type, args);
    }, template = exports.template = function (fn, template) {
        fn.template = template != null ? template : true;
        return fn;
    }, createRuntime = exports.createRuntime = function (ast, args) {
        var Context = require('./runtime/Context');
        var context = new Context();
        if (args != null) {
            for (var name in args) {
                var value = args[name];
                context.setVariableLiteral(name, value);
            }
        }
        return context.createRuntime(ast);
    }, nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    }, clone = exports.clone = function (object, deep) {
        if (deep == null)
            deep = false;
        if (Array.isArray(object)) {
            var _ref = [];
            for (var _i = 0; _i < object.length; _i++) {
                var item = object[_i];
                _ref.push(deep ? clone(item, deep) : item);
            }
            return _ref;
        } else if ((object != null ? object.constructor : void 0) === Object) {
            var _ref2 = {};
            for (var key in object) {
                var value = object[key];
                _ref2[key] = deep ? clone(value, deep) : value;
            }
            return _ref2;
        } else {
            return object;
        }
    }, observe = exports.observe = function (object, observer, property) {
        if (object === global || object === console) {
            return;
        }
        if (!isObjectObservable(object)) {
            if (!(property != null)) {
                return;
            }
            nodeObserveShim.observe(object, observer, property);
        } else if (object != null && observer != null && Object.observe != null && typeof object === 'object') {
            if (DEBUG) {
                observer.tryWrapper = observer.tryWrapper != null ? observer.tryWrapper : function (changes) {
                    try {
                        observer(changes);
                    } catch (error) {
                        console.error('Exception in Object.observe callback', error);
                    }
                };
            }
            Object.observe(object, observer.tryWrapper != null ? observer.tryWrapper : observer);
            object.addEventListener != null ? object.addEventListener('change', observer) : void 0;
        }
        object != null ? object.onObserved != null ? object.onObserved(observer, property) : void 0 : void 0;
    }, unobserve = exports.unobserve = function (object, observer, property) {
        if (!isObjectObservable(object)) {
            if (!(property != null)) {
                return;
            }
            nodeObserveShim.unobserve(object, observer, property);
        } else if (object != null && observer != null && Object.unobserve != null && typeof object === 'object') {
            Object.unobserve(object, observer.tryWrapper != null ? observer.tryWrapper : observer);
            object.removeEventListener != null ? object.removeEventListener('change', observer) : void 0;
        }
        object != null ? object.unObserved != null ? object.unObserved(observer, property) : void 0 : void 0;
    }, checkForChanges = exports.checkForChanges = function () {
        if (Object.observe.checkForChanges != null) {
            Object.observe.checkForChanges();
        } else {
            nodeObserveShim.observe.checkForChanges();
        }
    }, bind = exports.bind = function (fn, thisArg) {
        var newFn = fn.bind(thisArg);
        if ((fn.name != null ? fn.name.length : void 0) > 0) {
            newFn.id = fn.id != null ? fn.id : fn.name;
        }
        return newFn;
    }, add = exports.add = function (container, item) {
        var remove;
        if (typeof item === 'function' && ((item.name != null ? item.name.length : void 0) > 0 || item.id != null) && typeof container.addEventListener === 'function') {
            var name = item.id != null ? item.id : item.name;
            var capture = false;
            var captureSuffix = '_capture';
            if (name.endsWith(captureSuffix)) {
                capture = true;
                name = name.substring(0, name.length - captureSuffix.length);
            }
            if ((Object.observe != null ? Object.observe.checkForChanges : void 0) != null) {
                var originalItem = item;
                item = function () {
                    originalItem.apply(this, arguments);
                    Object.observe.checkForChanges();
                };
            }
            container.addEventListener(name, item, capture);
            remove = function () {
                container.removeEventListener(name, item);
            };
        } else if (container.nodeType === 1) {
            if (typeof item !== 'string' && !(item.nodeType != null)) {
                item = JSON.stringify(item);
            }
            if (typeof item === 'string') {
                item = document.createTextNode(item);
            }
            container.appendChild(item);
            remove = function () {
                if (item.parentNode === container) {
                    container.removeChild(item);
                }
            };
        } else {
            if (container.push != null) {
                container.push(item);
            } else {
                container.add(item);
            }
            remove = function () {
                if (container.lastIndexOf != null && container.removeAt != null) {
                    var index = container.lastIndexOf(item);
                    if (index >= 0) {
                        container.removeAt(index);
                    }
                } else if (typeof container.remove === 'function') {
                    container.remove(item);
                } else if (Array.isArray(container)) {
                    var index = container.lastIndexOf(item);
                    if (index >= 0) {
                        container.splice(index, 1);
                    }
                }
            };
        }
        item != null ? item.onAdded != null ? item.onAdded(container) : void 0 : void 0;
        return function () {
            remove();
            item != null ? item.onRemoved != null ? item.onRemoved(container) : void 0 : void 0;
        };
    }, defineProperties = exports.defineProperties = function (object, properties) {
        return Object.defineProperties(object, normalizeProperties(properties));
    }, defineClass = exports.defineClass = function (___definitions) {
        var definitions = Array.prototype.slice.call(arguments, 0);
        var classDefinition = definitions[0];
        if (definitions[1] === void 0) {
            definitions[1] = require('./Object');
        }
        classDefinition.super = definitions[1];
        var name = classDefinition.name != null ? classDefinition.name : classDefinition.id != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i) != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i)[1] : void 0 : void 0;
        if (!(name != null)) {
            throw new Error('missing name property');
        }
        var classFunction;
        if (classDefinition.hasOwnProperty('constructor')) {
            classFunction = classDefinition.constructor;
        } else if (classDefinition.super != null) {
            classFunction = eval('(function ' + name + '() { ' + name + '.super.apply(this, arguments); })');
        } else {
            classFunction = eval('(function ' + name + '() {})');
        }
        var canSetClassProperty = function (key) {
            if (key === 'name') {
                return false;
            }
            var descriptor = Object.getOwnPropertyDescriptor(classFunction, key);
            return !(descriptor != null) || descriptor.writable || !(descriptor.get != null);
        };
        var types = new Set();
        types.add(classFunction);
        for (var i = definitions.length - 1; i >= 0; i--) {
            var definition = definitions[i];
            if (definition != null) {
                types.add(definition);
                for (var key in definition) {
                    var value = definition[key];
                    if (key !== 'test' || i === 0) {
                        if (canSetClassProperty(key)) {
                            classFunction[key] = patch(classFunction[key], value);
                        }
                    }
                }
            }
        }
        classFunction.types = types;
        if (classFunction.properties != null) {
            defineProperties(classFunction.prototype, classFunction.properties);
        }
        return classFunction;
    }, is = exports.is = function (instance, type) {
        if (!(instance != null)) {
            return false;
        }
        if (!(type != null)) {
            return true;
        }
        if (typeof type === 'function') {
            if (typeof instance.is === 'function') {
                return instance.is(type);
            }
            return instance instanceof type;
        } else {
            return instance === type;
        }
    }, makeReactive = exports.makeReactive = function (object, activate) {
        var observeCount = 0;
        var deactivate = null;
        return Object.defineProperties(object, {
            onObserved: {
                value: function () {
                    observeCount++;
                    if (observeCount === 1) {
                        deactivate = activate.call(object);
                    }
                }
            },
            unObserved: {
                value: function () {
                    observeCount--;
                    if (observeCount === 0) {
                        deactivate != null ? deactivate() : void 0;
                    }
                }
            }
        });
    }, serialize = exports.serialize = function (object) {
        return JSON.stringify(object);
    }, deserialize = exports.deserialize = function () {
        var extractType = function (object) {
            var typeKey = require('ion/Object').typeKey;
            var typeName = object[typeKey];
            if (!(typeName != null)) {
                return Object;
            }
            var type = require(typeName);
            if (!type.serializable) {
                throw new Error('Type is not serializable: ' + typeName);
            }
            delete object[typeKey];
            return type;
        };
        var deserialize = function (object) {
            if (typeof object === 'string') {
                object = JSON.parse(object);
            }
            var typeKey = require('ion/Object').typeKey;
            var typeName = object[typeKey];
            if (typeName != null) {
                var type = require(typeName);
                if (!type.serializable) {
                    throw new Error('Type is not serializable: ' + typeName);
                }
                var typedObject = new type();
                for (var key in object) {
                    var value = object[key];
                    if (key !== typeKey) {
                        typedObject[key] = object[key];
                    }
                }
                return typedObject;
            } else {
                return object;
            }
        };
        deserialize.extractType = extractType;
        return deserialize;
    }(), test = exports.test = {
        defineClass: function () {
            var Foo = defineClass({
                    id: 'Foo',
                    constructor: function (number) {
                        this.number = number;
                    },
                    properties: {
                        getValue: function () {
                            return this.number;
                        }
                    }
                });
            if (!(new Foo(2).getValue() === 2))
                throw new Error('Assertion Failed: (new Foo(2).getValue() is 2)');
        },
        defineProperties: {
            'should allow primitive values': function () {
                var object = {};
                var result = defineProperties(object, {
                        f: function () {
                            return 'function';
                        },
                        i: 2,
                        b: true,
                        a: [],
                        s: 'hello'
                    });
                if (!(object === result))
                    throw new Error('Assertion Failed: (object is result)');
                if (!(typeof object.f === 'function'))
                    throw new Error('Assertion Failed: (typeof object.f is \'function\')');
                if (!(object.f() === 'function'))
                    throw new Error('Assertion Failed: (object.f() is \'function\')');
                if (!(object.i === 2))
                    throw new Error('Assertion Failed: (object.i is 2)');
                if (!(object.b === true))
                    throw new Error('Assertion Failed: (object.b is true)');
                if (!Array.isArray(object.a))
                    throw new Error('Assertion Failed: (Array.isArray(object.a))');
                if (!(object.s === 'hello'))
                    throw new Error('Assertion Failed: (object.s is \'hello\')');
            }
        }
    };
if (global.window != null) {
    global.window.addEventListener('resize', checkForChanges);
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/index',_ion_index_);
    else
      _ion_index_.call(this, module, exports, require);
  }
  else {
    _ion_index_.call(this);
  }
}).call(this)
void (function(){var _ion_mergePatch_ = function(module,exports,require){'use strict';
var ion = require('./'), isObject = function (a) {
        return a != null && typeof a === 'object';
    }, deleteValue = null;
var merge = exports.merge = function (target, values, options) {
        var deleteNull = (options != null ? options.deleteNull : void 0) != null ? options.deleteNull : true;
        if ((values != null ? values.constructor : void 0) !== Object) {
            return values;
        }
        if (!isObject(target)) {
            if ((options != null ? options.factory : void 0) != null) {
                target = options.factory(values);
            } else {
                target = {};
            }
        }
        for (var key in values) {
            var value = values[key];
            if (deleteNull && value === deleteValue) {
                delete target[key];
            } else {
                var newValue = merge(target[key], value, options);
                target[key] = newValue;
            }
        }
        return target;
    }, combine = exports.combine = function (patch1, patch2) {
        return merge(patch1, patch2, { deleteNull: false });
    }, watch = exports.watch = function (object, handler, callInitial) {
        if (callInitial == null)
            callInitial = true;
        if (!isObject(object)) {
            throw new Error('Cannot watch: #{object}');
        }
        var subWatchers = {};
        var pendingPatch = null;
        var processPatch = function (patchValues) {
            for (var name in patchValues) {
                subWatchers[name] != null ? subWatchers[name]() : void 0;
                var value = object[name];
                if (isObject(value)) {
                    (function (name) {
                        var subHandler = function (patch) {
                            var basePatch = {};
                            basePatch[name] = patch;
                            queuePatch(basePatch);
                        };
                        subWatchers[name] = watch(value, subHandler, false);
                    }(name));
                }
            }
        };
        var pendingTimeout = null;
        var queuePatch = function (patch) {
            if (!callInitial) {
                handler(patch);
            } else {
                pendingPatch = combine(pendingPatch, patch);
                processPatch(pendingPatch);
                pendingTimeout = pendingTimeout != null ? pendingTimeout : setTimeout(function () {
                    handler(pendingPatch);
                    pendingPatch = null;
                    pendingTimeout = null;
                }, 0);
            }
        };
        var watcher = function (changes) {
            var patch = {};
            for (var _i = 0; _i < changes.length; _i++) {
                var change = changes[_i];
                if (change.name[0] !== '_') {
                    patch = patch != null ? patch : {};
                    patch[change.name] = object[change.name] != null ? object[change.name] : deleteValue;
                }
            }
            if (patch != null) {
                queuePatch(patch);
            }
        };
        if (DEBUG) {
            var innerWatcher = watcher;
            watcher = function (changes) {
                try {
                    innerWatcher(changes);
                } catch (e) {
                    console.error(e);
                }
            };
        }
        processPatch(object);
        ion.observe(object, watcher);
        return function () {
            ion.unobserve(object, watcher);
            for (var key in subWatchers) {
                var value = subWatchers[key];
                value();
            }
        };
    }, diff = exports.diff = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return void 0;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return newValue != null ? newValue : null;
        }
        var patch = void 0;
        for (var name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                var propertyDiff = diff(oldValue[name], newValue[name]);
                if (propertyDiff !== void 0) {
                    patch = patch != null ? patch : {};
                    patch[name] = propertyDiff;
                }
            }
        }
        for (var name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                patch = patch != null ? patch : {};
                patch[name] = newValue[name];
            }
        }
        return patch;
    }, isChange = exports.isChange = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return false;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return true;
        }
        for (var name in newValue) {
            if (newValue[name] === null && !oldValue.hasOwnProperty(name)) {
                continue;
            }
            if (isChange(oldValue[name], newValue[name])) {
                return true;
            }
        }
        return false;
    }, test = exports.test = function () {
        var equal = function (a, b) {
            return !isChange(a, b) && !isChange(b, a);
        };
        return {
            merge: function () {
                if (!equal({
                        a: {
                            b: 2,
                            c: 3
                        },
                        d: 4
                    }, merge({ a: { b: 2 } }, {
                        a: { c: 3 },
                        d: 4
                    })))
                    throw new Error('Assertion Failed: (equal({a:{b:2,c:3},d:4}, merge({a:{b:2}}, {a:{c:3},d:4})))');
                if (!equal({ b: 2 }, merge(null, { b: 2 })))
                    throw new Error('Assertion Failed: (equal({b:2}, merge(null, {b:2})))');
                if (!equal({
                        a: 1,
                        b: 2
                    }, merge({
                        a: 1,
                        b: 2,
                        c: 3
                    }, { c: void 0 })))
                    throw new Error('Assertion Failed: (equal({a:1,b:2}, merge({a:1,b:2,c:3}, {c:undefined})))');
                var double = function (x) {
                    return x * 2;
                };
                if (!equal({ a: double }, merge({}, { a: double })))
                    throw new Error('Assertion Failed: (equal({a:double}, merge({},{a:double})))');
            },
            isChange: function () {
                if (!isChange({ a: 1 }, null))
                    throw new Error('Assertion Failed: (isChange({a:1}, null))');
                if (!!isChange(null, null))
                    throw new Error('Assertion Failed: (not isChange(null, null))');
                if (!isChange(void 0, null))
                    throw new Error('Assertion Failed: (isChange(undefined, null))');
                if (!isChange(null, void 0))
                    throw new Error('Assertion Failed: (isChange(null, undefined))');
                if (!!isChange({ a: 1 }, { a: 1 }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {a:1}))');
                if (!!isChange({
                        a: {
                            b: 2,
                            c: 3
                        }
                    }, { a: { b: 2 } }))
                    throw new Error('Assertion Failed: (not isChange({a:{b:2,c:3}}, {a:{b:2}}))');
                if (!isChange({ a: { b: 2 } }, { a: { b: 3 } }))
                    throw new Error('Assertion Failed: (isChange({a:{b:2}}, {a:{b:3}}))');
                if (!!isChange({ a: 1 }, { b: null }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {b:null}))');
            },
            diff: function () {
                if (!equal({ b: 2 }, diff({ a: 1 }, {
                        a: 1,
                        b: 2
                    })))
                    throw new Error('Assertion Failed: (equal({b:2}, diff({a:1}, {a:1,b:2})))');
                if (!equal({
                        a: {
                            b: 3,
                            c: null
                        }
                    }, diff({
                        a: {
                            b: 2,
                            c: 4
                        }
                    }, { a: { b: 3 } })))
                    throw new Error('Assertion Failed: (equal({a:{b:3,c:null}}, diff({a:{b:2,c:4}}, {a:{b:3}})))');
                if (!equal({ a: 1 }, diff(null, { a: 1 })))
                    throw new Error('Assertion Failed: (equal({a:1}, diff(null, {a:1})))');
                if (!equal({ c: { d: { f: 4 } } }, diff({
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 2
                            }
                        }
                    }, {
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 4
                            }
                        }
                    })))
                    throw new Error('Assertion Failed: (equal({c:{d:{f:4}}}, diff({a:1,b:2,c:{d:{e:1,f:2}}}, {a:1,b:2,c:{d:{e:1,f:4}}})))');
                if (!equal(null, diff({ a: 1 }, void 0)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, undefined)))');
                if (!equal(null, diff({ a: 1 }, null)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, null)))');
                if (!equal(void 0, diff({ a: { b: 2 } }, { a: { b: 2 } })))
                    throw new Error('Assertion Failed: (equal(undefined, diff({a:{b:2}}, {a:{b:2}})))');
            },
            observe: function (done) {
                if (!(Object.observe != null)) {
                    return done(null, 'Object.observe missing.');
                }
                var source = {
                        name: 'Kris',
                        age: 41,
                        children: {
                            Sadera: {
                                grandchildren: {
                                    One: 1,
                                    Two: 2
                                }
                            },
                            Orion: {},
                            Third: {}
                        }
                    };
                var target = ion.clone(source, true);
                var unwatch = watch(source, function (patch) {
                        target = merge(target, patch);
                        if (equal(source, target)) {
                            done();
                            unwatch();
                        }
                    });
                {
                    source.name = 'Fred';
                    source.children = ion.patch(source.children, {
                        Orion: {
                            a: 1,
                            b: 2,
                            c: 12
                        },
                        Sadera: { grandchildren: { three: 3 } }
                    });
                }
                delete source.children.Third;
                ion.checkForChanges();
            }
        };
    }();
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/mergePatch',_ion_mergePatch_);
    else
      _ion_mergePatch_.call(this, module, exports, require);
  }
  else {
    _ion_mergePatch_.call(this);
  }
}).call(this)
void (function(){var _ion_runtime_ArrayExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ArrayExpression = ion.defineClass({
        name: 'ArrayExpression',
        constructor: function ArrayExpression() {
            ArrayExpression.super.apply(this, arguments);
            if (!(this.elements != null)) {
                throw new Error('elements is required');
            }
            if (!(this.context != null)) {
                throw new Error('context is required');
            }
        },
        properties: {
            observeElements: false,
            notifyIfActive: function () {
                if (this.isActive) {
                    this.notify();
                }
            },
            setArgumentValue: function (key, value) {
                if (this.argumentValues[key] !== value) {
                    if (this.observeElements) {
                        ion.unobserve(this.argumentValues[key], this.itemObserver);
                    }
                    this.argumentValues[key] = value;
                    if (this.observeElements) {
                        ion.observe(value, this.itemObserver = this.itemObserver != null ? this.itemObserver : ion.bind(function () {
                            this.notifyIfActive();
                        }, this));
                    }
                    this.notifyIfActive();
                }
            },
            activate: function () {
                if (!(this.argumentValues != null)) {
                    var _ref = [];
                    {
                        var _ref2 = this.elements;
                        for (var _i = 0; _i < _ref2.length; _i++) {
                            var item = _ref2[_i];
                            _ref.push(this.context.createRuntime(item));
                        }
                    }
                    this.expressions = _ref;
                    this.argumentValues = [];
                    this.expressionWatchers = [];
                    for (var key = 0; key < this.expressions.length; key++) {
                        this.expressionWatchers[key] = this.setArgumentValue.bind(this, key);
                    }
                }
                {
                    var _ref3 = this.expressions;
                    for (var _i2 = 0; _i2 < _ref3.length; _i2++) {
                        var key = _i2;
                        var expression = _ref3[_i2];
                        expression.watch(this.expressionWatchers[key]);
                    }
                }
                ArrayExpression.super.prototype.activate.apply(this, arguments);
                this.setValue(this.argumentValues);
            },
            deactivate: function () {
                {
                    var _ref4 = this.expressions;
                    for (var _i3 = 0; _i3 < _ref4.length; _i3++) {
                        var key = _i3;
                        var expression = _ref4[_i3];
                        expression.unwatch(this.expressionWatchers[key]);
                    }
                }
                ArrayExpression.super.prototype.deactivate.apply(this, arguments);
            }
        },
        test: function () {
            var Context = require('./Context');
            var e = new ArrayExpression({
                    context: new Context(),
                    elements: [
                        {
                            type: 'Literal',
                            value: 1
                        },
                        {
                            type: 'Literal',
                            value: 2
                        }
                    ]
                });
            var result = void 0;
            function watcher(value) {
                result = value;
            }
            e.watch(watcher);
            if (!(JSON.stringify(result) === '[1,2]'))
                throw new Error('Assertion Failed: (JSON.stringify(result) is "[1,2]")');
        }
    }, DynamicExpression);
module.exports = exports = ArrayExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ArrayExpression',_ion_runtime_ArrayExpression_);
    else
      _ion_runtime_ArrayExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ArrayExpression_.call(this);
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
void (function(){var _ion_runtime_index_ = function(module,exports,require){Object.defineProperty(exports, 'ArrayExpression', {get:function(){ return require('./ArrayExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'BlockStatement', {get:function(){ return require('./BlockStatement') }, enumerable: true}) 
Object.defineProperty(exports, 'CallExpression', {get:function(){ return require('./CallExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'Context', {get:function(){ return require('./Context') }, enumerable: true}) 
Object.defineProperty(exports, 'DynamicExpression', {get:function(){ return require('./DynamicExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'Expression', {get:function(){ return require('./Expression') }, enumerable: true}) 
Object.defineProperty(exports, 'ExpressionStatement', {get:function(){ return require('./ExpressionStatement') }, enumerable: true}) 
Object.defineProperty(exports, 'Factory', {get:function(){ return require('./Factory') }, enumerable: true}) 
Object.defineProperty(exports, 'ForInOfStatement', {get:function(){ return require('./ForInOfStatement') }, enumerable: true}) 
Object.defineProperty(exports, 'IfStatement', {get:function(){ return require('./IfStatement') }, enumerable: true}) 
Object.defineProperty(exports, 'Literal', {get:function(){ return require('./Literal') }, enumerable: true}) 
Object.defineProperty(exports, 'MemberExpression', {get:function(){ return require('./MemberExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'Node', {get:function(){ return require('./Node') }, enumerable: true}) 
Object.defineProperty(exports, 'ObjectExpression', {get:function(){ return require('./ObjectExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'OperationExpression', {get:function(){ return require('./OperationExpression') }, enumerable: true}) 
Object.defineProperty(exports, 'Property', {get:function(){ return require('./Property') }, enumerable: true}) 
Object.defineProperty(exports, 'ReturnStatement', {get:function(){ return require('./ReturnStatement') }, enumerable: true}) 
Object.defineProperty(exports, 'Statement', {get:function(){ return require('./Statement') }, enumerable: true}) 
Object.defineProperty(exports, 'Template', {get:function(){ return require('./Template') }, enumerable: true}) 
Object.defineProperty(exports, 'VariableDeclaration', {get:function(){ return require('./VariableDeclaration') }, enumerable: true}) 
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





