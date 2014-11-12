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
//@ sourceMappingURL=./Object.map
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
//@ sourceMappingURL=./elements.map
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








void (function(){var _ion_compiler_astFunctions_ = function(module,exports,require){'use strict';
var ion = exports.ion = require('../'), addStatement = exports.addStatement = function (node, statement, index, offset) {
        var body = node.body;
        if (body.type === 'BlockStatement') {
            body = body.body;
        } else if (!Array.isArray(body)) {
            node.body = {
                type: 'BlockStatement',
                body: body = [node.body]
            };
        }
        if (!(index != null)) {
            index = 0;
        } else if (index.type != null) {
            index = body.indexOf(index) + (offset != null ? offset : 1);
        }
        index = Math.max(0, Math.min(index, body.length));
        body.splice(index, 0, statement);
    }, forEachDestructuringAssignment = exports.forEachDestructuringAssignment = function (pattern, expression, callback) {
        if (pattern.type === 'Identifier') {
            callback(pattern, expression);
        } else if (pattern.properties != null) {
            {
                var _ref = pattern.properties;
                for (var _i = 0; _i < _ref.length; _i++) {
                    var _ref3 = _ref[_i];
                    var key = _ref3.key;
                    var value = _ref3.value;
                    forEachDestructuringAssignment(value, {
                        type: 'MemberExpression',
                        object: expression,
                        property: key,
                        computed: key.type !== 'Identifier'
                    }, callback);
                }
            }
        } else if (pattern.elements != null) {
            {
                var _ref2 = pattern.elements;
                for (var _i2 = 0; _i2 < _ref2.length; _i2++) {
                    var index = _i2;
                    var value = _ref2[_i2];
                    forEachDestructuringAssignment(value, {
                        type: 'MemberExpression',
                        object: expression,
                        property: {
                            type: 'Literal',
                            value: index
                        },
                        computed: true
                    }, callback);
                }
            }
        }
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/astFunctions',_ion_compiler_astFunctions_);
    else
      _ion_compiler_astFunctions_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_astFunctions_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./astFunctions.map
void (function(){var _ion_compiler_common_ = function(module,exports,require){'use strict';
var ion = require('../'), lineDelimiter = '\n', isEmpty = function (s) {
        return !(s != null) || s.length === 0 || (s.trim != null ? s.trim().length : void 0) === 0;
    }, trimRight = function (s) {
        return s.replace(/[\s\xA0]+$/g, '');
    };
var indentToken = exports.indentToken = '{{{{', outdentToken = exports.outdentToken = '}}}}', splitLines = exports.splitLines = function (s) {
        return s.split(lineDelimiter);
    }, joinLines = exports.joinLines = function (array) {
        return array.join(lineDelimiter);
    }, getIndent = exports.getIndent = function (s, regex) {
        regex = regex != null ? regex : /^([ ]*)/;
        return (regex.exec(s) != null ? regex.exec(s)[1].length : void 0) != null ? regex.exec(s)[1].length : Number.MAX_VALUE;
    }, unindentString = exports.unindentString = function (s, sourceMapping) {
        var lines = splitLines(trimRight(s));
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
void (function(){var _ion_compiler_escodegen_index_ = function(module,exports,require){/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

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

/*global exports:true, generateStatement:true, generateExpression:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        isArray,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    estraverse = require('../estraverse');
    esutils = require('../esutils');

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportDeclaration: 'ExportDeclaration',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        Member: 17,
        Primary: 18
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false,
                parenthesizedComprehensionBlock: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g).test(str);
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
                +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex, result = '\\';

        switch (code) {
        case 0x08  /* \b */:
            result += 'b';
            break;
        case 0x0C  /* \f */:
            result += 'f';
            break;
        case 0x09  /* \t */:
            result += 't';
            break;
        default:
            hex = code.toString(16).toUpperCase();
            if (json || code > 0xFF) {
                result += 'u' + '0000'.slice(hex.length) + hex;
            } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
                result += '0';
            } else if (code === 0x000B  /* \v */) { // '\v'
                result += 'x0B';
            } else {
                result += 'x' + '00'.slice(hex.length) + hex;
            }
            break;
        }

        return result;
    }

    function escapeDisallowedCharacter(code) {
        var result = '\\';
        switch (code) {
        case 0x5C  /* \ */:
            result += '\\';
            break;
        case 0x0A  /* \n */:
            result += 'n';
            break;
        case 0x0D  /* \r */:
            result += 'r';
            break;
        case 0x2028:
            result += 'u2028';
            break;
        case 0x2029:
            result += 'u2029';
            break;
        default:
            throw new Error('Incorrectly classified character');
        }

        return result;
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                quote = '"';
                break;
            } else if (code === 0x22  /* " */) {
                quote = '\'';
                break;
            } else if (code === 0x5C  /* \ */) {
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                ++singleQuotes;
            } else if (code === 0x22  /* " */) {
                ++doubleQuotes;
            } else if (code === 0x2F  /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if ((json && code < 0x20  /* SP */) || !(json || escapeless || (code >= 0x20  /* SP */ && code <= 0x7E  /* ~ */))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i, iz, elem, result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }

    function noEmptySpace() {
        return (space) ? space : ' ';
    }

    function join(left, right) {
        var leftSource = toSourceNodeWhenNeeded(left).toString(),
            rightSource = toSourceNodeWhenNeeded(right).toString(),
            leftCharCode = leftSource.charCodeAt(leftSource.length - 1),
            rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
        esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode) ||
        leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
            return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase, result;
        previousBase = base;
        base += indent;
        result = fn.call(this, base);
        base = previousBase;
        return result;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return (str.length - 1) - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                return '//' + comment.value + '\n';
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            comment = stmt.leadingComments[0];
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                result.push('\n');
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
            }

            for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                comment = stmt.leadingComments[i];
                fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    fragment.push('\n');
                }
                result.push(addIndent(fragment));
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {
            tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                    // We assume target like following script
                    //
                    // var t = 20;  /**
                    //               * This is comment of t
                    //               */
                    if (i === 0) {
                        // first case
                        result = [result, indent];
                    } else {
                        result = [result, specialBase];
                    }
                    result.push(generateComment(comment, specialBase));
                } else {
                    result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result = [result, '\n'];
                }
            }
        }

        return result;
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function maybeBlock(stmt, semicolonOptional, functionBody) {
        var result, noLeadingComment;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, generateStatement(stmt, { functionBody: functionBody })];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [newline, addIndent(generateStatement(stmt, { semicolonOptional: semicolonOptional, functionBody: functionBody }))];
        });

        return result;
    }

    function maybeBlockSuffix(stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, option) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, option.precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, option.precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generatePattern(node, options) {
        var result;

        if (node.type === Syntax.Identifier) {
            result = generateIdentifier(node);
        } else {
            result = generateExpression(node, {
                precedence: options.precedence,
                allowIn: options.allowIn,
                allowCall: true
            });
        }

        return result;
    }

    function generateFunctionBody(node) {
        var result, i, len, expr, arrow;

        arrow = node.type === Syntax.ArrowFunctionExpression;

        if (arrow && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateIdentifier(node.params[0])];
        } else {
            result = ['('];
            for (i = 0, len = node.params.length; i < len; ++i) {
                result.push(generatePattern(node.params[i], {
                    precedence: Precedence.Assignment,
                    allowIn: true
                }));
                if (i + 1 < len) {
                    result.push(',' + space);
                }
            }
            result.push(')');
        }

        if (arrow) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = generateExpression(node.body, {
                precedence: Precedence.Assignment,
                allowIn: true,
                allowCall: true
            });
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(maybeBlock(node.body, false, true));
        }
        return result;
    }

    function generateIterationForStatement(operator, stmt, semicolonIsNotNeeded) {
        var result = ['for' + space + '('];
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(generateStatement(stmt.left.declarations[0], {
                        allowIn: false
                    }));
                });
            } else {
                result.push(generateExpression(stmt.left, {
                    precedence: Precedence.Call,
                    allowIn: true,
                    allowCall: true
                }));
            }

            result = join(result, operator);
            result = [join(
                result,
                generateExpression(stmt.right, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                })
            ), ')'];
        });
        result.push(maybeBlock(stmt.body, semicolonIsNotNeeded));
        return result;
    }

    function generateLiteral(expr) {
        var raw;
        if (expr.hasOwnProperty('raw') && parse && extra.raw) {
            try {
                raw = parse(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) {
                        return expr.raw;
                    }
                }
            } catch (e) {
                // not use raw property
            }
        }

        if (expr.value === null) {
            return 'null';
        }

        if (typeof expr.value === 'string') {
            return escapeString(expr.value);
        }

        if (typeof expr.value === 'number') {
            return generateNumber(expr.value);
        }

        if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false';
        }

        return generateRegExp(expr.value);
    }

    function generateExpression(expr, option) {
        var result,
            precedence,
            type,
            currentPrecedence,
            i,
            len,
            fragment,
            multiline,
            leftCharCode,
            leftSource,
            rightCharCode,
            allowIn,
            allowCall,
            allowUnparenthesizedNew,
            property,
            isGenerator;

        precedence = option.precedence;
        allowIn = option.allowIn;
        allowCall = option.allowCall;
        type = expr.type || option.type;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, option);
        }

        switch (type) {
        case Syntax.SequenceExpression:
            result = [];
            allowIn |= (Precedence.Sequence < precedence);
            for (i = 0, len = expr.expressions.length; i < len; ++i) {
                result.push(generateExpression(expr.expressions[i], {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                }));
                if (i + 1 < len) {
                    result.push(',' + space);
                }
            }
            result = parenthesize(result, Precedence.Sequence, precedence);
            break;

        case Syntax.AssignmentExpression:
            allowIn |= (Precedence.Assignment < precedence);
            result = parenthesize(
                [
                    generateExpression(expr.left, {
                        precedence: Precedence.Call,
                        allowIn: allowIn,
                        allowCall: true
                    }),
                    space + expr.operator + space,
                    generateExpression(expr.right, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    })
                ],
                Precedence.Assignment,
                precedence
            );
            break;

        case Syntax.ArrowFunctionExpression:
            allowIn |= (Precedence.ArrowFunction < precedence);
            result = parenthesize(generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
            break;

        case Syntax.ConditionalExpression:
            allowIn |= (Precedence.Conditional < precedence);
            result = parenthesize(
                [
                    generateExpression(expr.test, {
                        precedence: Precedence.LogicalOR,
                        allowIn: allowIn,
                        allowCall: true
                    }),
                    space + '?' + space,
                    generateExpression(expr.consequent, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    }),
                    space + ':' + space,
                    generateExpression(expr.alternate, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    })
                ],
                Precedence.Conditional,
                precedence
            );
            break;

        case Syntax.LogicalExpression:
        case Syntax.BinaryExpression:
            currentPrecedence = BinaryPrecedence[expr.operator];

            allowIn |= (currentPrecedence < precedence);

            fragment = generateExpression(expr.left, {
                precedence: currentPrecedence,
                allowIn: allowIn,
                allowCall: true
            });

            leftSource = fragment.toString();

            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPart(expr.operator.charCodeAt(0))) {
                result = [fragment, noEmptySpace(), expr.operator];
            } else {
                result = join(fragment, expr.operator);
            }

            fragment = generateExpression(expr.right, {
                precedence: currentPrecedence + 1,
                allowIn: allowIn,
                allowCall: true
            });

            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else {
                result = join(result, fragment);
            }

            if (expr.operator === 'in' && !allowIn) {
                result = ['(', result, ')'];
            } else {
                result = parenthesize(result, currentPrecedence, precedence);
            }

            break;

        case Syntax.CallExpression:
            result = [generateExpression(expr.callee, {
                precedence: Precedence.Call,
                allowIn: true,
                allowCall: true,
                allowUnparenthesizedNew: false
            })];

            result.push('(');
            for (i = 0, len = expr['arguments'].length; i < len; ++i) {
                result.push(generateExpression(expr['arguments'][i], {
                    precedence: Precedence.Assignment,
                    allowIn: true,
                    allowCall: true
                }));
                if (i + 1 < len) {
                    result.push(',' + space);
                }
            }
            result.push(')');

            if (!allowCall) {
                result = ['(', result, ')'];
            } else {
                result = parenthesize(result, Precedence.Call, precedence);
            }
            break;

        case Syntax.NewExpression:
            len = expr['arguments'].length;
            allowUnparenthesizedNew = option.allowUnparenthesizedNew === undefined || option.allowUnparenthesizedNew;

            result = join(
                'new',
                generateExpression(expr.callee, {
                    precedence: Precedence.New,
                    allowIn: true,
                    allowCall: false,
                    allowUnparenthesizedNew: allowUnparenthesizedNew && !parentheses && len === 0
                })
            );

            if (!allowUnparenthesizedNew || parentheses || len > 0) {
                result.push('(');
                for (i = 0; i < len; ++i) {
                    result.push(generateExpression(expr['arguments'][i], {
                        precedence: Precedence.Assignment,
                        allowIn: true,
                        allowCall: true
                    }));
                    if (i + 1 < len) {
                        result.push(',' + space);
                    }
                }
                result.push(')');
            }

            result = parenthesize(result, Precedence.New, precedence);
            break;

        case Syntax.MemberExpression:
            result = [generateExpression(expr.object, {
                precedence: Precedence.Call,
                allowIn: true,
                allowCall: allowCall,
                allowUnparenthesizedNew: false
            })];

            if (expr.computed) {
                result.push('[');
                result.push(generateExpression(expr.property, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: allowCall
                }));
                result.push(']');
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (
                            fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                            ) {
                        result.push('.');
                    }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
            }

            result = parenthesize(result, Precedence.Member, precedence);
            break;

        case Syntax.UnaryExpression:
            fragment = generateExpression(expr.argument, {
                precedence: Precedence.Unary,
                allowIn: true,
                allowCall: true
            });

            if (space === '') {
                result = join(expr.operator, fragment);
            } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                    // delete, void, typeof
                    // get `typeof []`, not `typeof[]`
                    result = join(result, fragment);
                } else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);

                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode))) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            }
            result = parenthesize(result, Precedence.Unary, precedence);
            break;

        case Syntax.YieldExpression:
            if (expr.delegate) {
                result = 'yield*';
            } else {
                result = 'yield';
            }
            if (expr.argument) {
                result = join(
                    result,
                    generateExpression(expr.argument, {
                        precedence: Precedence.Yield,
                        allowIn: true,
                        allowCall: true
                    })
                );
            }
            result = parenthesize(result, Precedence.Yield, precedence);
            break;

        case Syntax.UpdateExpression:
            if (expr.prefix) {
                result = parenthesize(
                    [
                        expr.operator,
                        generateExpression(expr.argument, {
                            precedence: Precedence.Unary,
                            allowIn: true,
                            allowCall: true
                        })
                    ],
                    Precedence.Unary,
                    precedence
                );
            } else {
                result = parenthesize(
                    [
                        generateExpression(expr.argument, {
                            precedence: Precedence.Postfix,
                            allowIn: true,
                            allowCall: true
                        }),
                        expr.operator
                    ],
                    Precedence.Postfix,
                    precedence
                );
            }
            break;

        case Syntax.FunctionExpression:
            isGenerator = expr.generator && !extra.moz.starlessGenerator;
            result = isGenerator ? 'function*' : 'function';

            if (expr.id) {
                result = [result, (isGenerator) ? space : noEmptySpace(),
                          generateIdentifier(expr.id),
                          generateFunctionBody(expr)];
            } else {
                result = [result + space, generateFunctionBody(expr)];
            }

            break;

        case Syntax.ArrayPattern:
        case Syntax.ArrayExpression:
            if (!expr.elements.length) {
                result = '[]';
                break;
            }
            multiline = expr.elements.length > 1;
            result = ['[', multiline ? newline : ''];
            withIndent(function (indent) {
                for (i = 0, len = expr.elements.length; i < len; ++i) {
                    if (!expr.elements[i]) {
                        if (multiline) {
                            result.push(indent);
                        }
                        if (i + 1 === len) {
                            result.push(',');
                        }
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(generateExpression(expr.elements[i], {
                            precedence: Precedence.Assignment,
                            allowIn: true,
                            allowCall: true
                        }));
                    }
                    if (i + 1 < len) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push(']');
            break;

        case Syntax.Property:
            if (expr.kind === 'get' || expr.kind === 'set') {
                result = [
                    expr.kind, noEmptySpace(),
                    generateExpression(expr.key, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    generateFunctionBody(expr.value)
                ];
            } else {
                if (expr.shorthand) {
                    result = generateExpression(expr.key, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    });
                } else if (expr.method) {
                    result = [];
                    if (expr.value.generator) {
                        result.push('*');
                    }
                    result.push(generateExpression(expr.key, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }));
                    result.push(generateFunctionBody(expr.value));
                } else {
                    result = [
                        generateExpression(expr.key, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        }),
                        ':' + space,
                        generateExpression(expr.value, {
                            precedence: Precedence.Assignment,
                            allowIn: true,
                            allowCall: true
                        })
                    ];
                }
            }
            break;

        case Syntax.ObjectExpression:
            if (!expr.properties.length) {
                result = '{}';
                break;
            }
            multiline = expr.properties.length > 1;

            withIndent(function () {
                fragment = generateExpression(expr.properties[0], {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true,
                    type: Syntax.Property
                });
            });

            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result = [ '{', space, fragment, space, '}' ];
                    break;
                }
            }

            withIndent(function (indent) {
                result = [ '{', newline, indent, fragment ];

                if (multiline) {
                    result.push(',' + newline);
                    for (i = 1, len = expr.properties.length; i < len; ++i) {
                        result.push(indent);
                        result.push(generateExpression(expr.properties[i], {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true,
                            type: Syntax.Property
                        }));
                        if (i + 1 < len) {
                            result.push(',' + newline);
                        }
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            break;

        case Syntax.ObjectPattern:
            if (!expr.properties.length) {
                result = '{}';
                break;
            }

            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                    multiline = true;
                }
            } else {
                for (i = 0, len = expr.properties.length; i < len; ++i) {
                    property = expr.properties[i];
                    if (!property.shorthand) {
                        multiline = true;
                        break;
                    }
                }
            }
            result = ['{', multiline ? newline : '' ];

            withIndent(function (indent) {
                for (i = 0, len = expr.properties.length; i < len; ++i) {
                    result.push(multiline ? indent : '');
                    result.push(generateExpression(expr.properties[i], {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }));
                    if (i + 1 < len) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });

            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push('}');
            break;

        case Syntax.ThisExpression:
            result = 'this';
            break;

        case Syntax.Identifier:
            result = generateIdentifier(expr);
            break;

        case Syntax.Literal:
            result = generateLiteral(expr);
            break;

        case Syntax.GeneratorExpression:
        case Syntax.ComprehensionExpression:
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6
            result = (type === Syntax.GeneratorExpression) ? ['('] : ['['];

            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = generateExpression(expr.body, {
                    precedence: Precedence.Assignment,
                    allowIn: true,
                    allowCall: true
                });

                result.push(fragment);
            }

            if (expr.blocks) {
                withIndent(function () {
                    for (i = 0, len = expr.blocks.length; i < len; ++i) {
                        fragment = generateExpression(expr.blocks[i], {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        });

                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                            result = join(result, fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                });
            }

            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = generateExpression(expr.filter, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                });
                if (extra.moz.parenthesizedComprehensionBlock) {
                    result = join(result, [ '(', fragment, ')' ]);
                } else {
                    result = join(result, fragment);
                }
            }

            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = generateExpression(expr.body, {
                    precedence: Precedence.Assignment,
                    allowIn: true,
                    allowCall: true
                });

                result = join(result, fragment);
            }

            result.push((type === Syntax.GeneratorExpression) ? ')' : ']');
            break;

        case Syntax.ComprehensionBlock:
            if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                    expr.left.kind, noEmptySpace(),
                    generateStatement(expr.left.declarations[0], {
                        allowIn: false
                    })
                ];
            } else {
                fragment = generateExpression(expr.left, {
                    precedence: Precedence.Call,
                    allowIn: true,
                    allowCall: true
                });
            }

            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, generateExpression(expr.right, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
            }));

            if (extra.moz.parenthesizedComprehensionBlock) {
                result = [ 'for' + space + '(', fragment, ')' ];
            } else {
                result = join('for' + space, fragment);
            }
            break;

        default:
            throw new Error('Unknown expression type: ' + expr.type);
        }

        if (extra.comment) {
            result = addComments(expr,result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    }

    function generateStatement(stmt, option) {
        var i,
            len,
            result,
            node,
            specifier,
            allowIn,
            functionBody,
            directiveContext,
            fragment,
            semicolon,
            isGenerator;

        allowIn = true;
        semicolon = ';';
        functionBody = false;
        directiveContext = false;
        if (option) {
            allowIn = option.allowIn === undefined || option.allowIn;
            if (!semicolons && option.semicolonOptional === true) {
                semicolon = '';
            }
            functionBody = option.functionBody;
            directiveContext = option.directiveContext;
        }

        switch (stmt.type) {
        case Syntax.BlockStatement:
            result = ['{', newline];

            withIndent(function () {
                for (i = 0, len = stmt.body.length; i < len; ++i) {
                    fragment = addIndent(generateStatement(stmt.body[i], {
                        semicolonOptional: i === len - 1,
                        directiveContext: functionBody
                    }));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });

            result.push(addIndent('}'));
            break;

        case Syntax.BreakStatement:
            if (stmt.label) {
                result = 'break ' + stmt.label.name + semicolon;
            } else {
                result = 'break' + semicolon;
            }
            break;

        case Syntax.ContinueStatement:
            if (stmt.label) {
                result = 'continue ' + stmt.label.name + semicolon;
            } else {
                result = 'continue' + semicolon;
            }
            break;

        case Syntax.DirectiveStatement:
            if (extra.raw && stmt.raw) {
                result = stmt.raw + semicolon;
            } else {
                result = escapeDirective(stmt.directive) + semicolon;
            }
            break;

        case Syntax.DoWhileStatement:
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            result = join('do', maybeBlock(stmt.body));
            result = maybeBlockSuffix(stmt.body, result);
            result = join(result, [
                'while' + space + '(',
                generateExpression(stmt.test, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                }),
                ')' + semicolon
            ]);
            break;

        case Syntax.CatchClause:
            withIndent(function () {
                var guard;

                result = [
                    'catch' + space + '(',
                    generateExpression(stmt.param, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    ')'
                ];

                if (stmt.guard) {
                    guard = generateExpression(stmt.guard, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    });

                    result.splice(2, 0, ' if ', guard);
                }
            });
            result.push(maybeBlock(stmt.body));
            break;

        case Syntax.DebuggerStatement:
            result = 'debugger' + semicolon;
            break;

        case Syntax.EmptyStatement:
            result = ';';
            break;

        case Syntax.ExportDeclaration:
            result = 'export ';
            if (stmt.declaration) {
                // FunctionDeclaration or VariableDeclaration
                result = [result, generateStatement(stmt.declaration, { semicolonOptional: semicolon === '' })];
                break;
            }
            break;

        case Syntax.ExpressionStatement:
            result = [generateExpression(stmt.expression, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
            })];
            // 12.4 '{', 'function' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charAt(0) === '{' ||  // ObjectExpression
                    (fragment.slice(0, 8) === 'function' && '* ('.indexOf(fragment.charAt(8)) >= 0) ||  // function or generator
                    (directive && directiveContext && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
                result = ['(', result, ')' + semicolon];
            } else {
                result.push(semicolon);
            }
            break;

        case Syntax.ImportDeclaration:
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            //
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) {
                // import ModuleSpecifier ;
                result = [
                    'import',
                    space,
                    generateLiteral(stmt.source)
                ];
            } else {
                // import ImportClause FromClause ;
                if (stmt.kind === 'default') {
                    // import ... from "...";
                    result = [
                        'import',
                        noEmptySpace(),
                        stmt.specifiers[0].id.name,
                        noEmptySpace()
                    ];
                } else {
                    // stmt.kind === 'named'
                    result = [
                        'import',
                        space,
                        '{',
                    ];

                    if (stmt.specifiers.length === 1) {
                        // import { ... } from "...";
                        specifier = stmt.specifiers[0];
                        result.push(space + specifier.id.name);
                        if (specifier.name) {
                            result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                        }
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function (indent) {
                            var i, iz;
                            result.push(newline);
                            for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                                specifier = stmt.specifiers[i];
                                result.push(indent + specifier.id.name);
                                if (specifier.name) {
                                    result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                                }

                                if (i + 1 < iz) {
                                    result.push(',' + newline);
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                            result.push(newline);
                        }
                        result.push(base + '}' + space);
                    }
                }

                result.push('from' + space);
                result.push(generateLiteral(stmt.source));
            }
            result.push(semicolon);
            break;

        case Syntax.VariableDeclarator:
            if (stmt.init) {
                result = [
                    generateExpression(stmt.id, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    }),
                    space,
                    '=',
                    space,
                    generateExpression(stmt.init, {
                        precedence: Precedence.Assignment,
                        allowIn: allowIn,
                        allowCall: true
                    })
                ];
            } else {
                result = generatePattern(stmt.id, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn
                });
            }
            break;

        case Syntax.VariableDeclaration:
            result = [stmt.kind];
            // special path for
            // var x = function () {
            // };
            if (stmt.declarations.length === 1 && stmt.declarations[0].init &&
                    stmt.declarations[0].init.type === Syntax.FunctionExpression) {
                result.push(noEmptySpace());
                result.push(generateStatement(stmt.declarations[0], {
                    allowIn: allowIn
                }));
            } else {
                // VariableDeclarator is typed as Statement,
                // but joined with comma (not LineTerminator).
                // So if comment is attached to target node, we should specialize.
                withIndent(function () {
                    node = stmt.declarations[0];
                    if (extra.comment && node.leadingComments) {
                        result.push('\n');
                        result.push(addIndent(generateStatement(node, {
                            allowIn: allowIn
                        })));
                    } else {
                        result.push(noEmptySpace());
                        result.push(generateStatement(node, {
                            allowIn: allowIn
                        }));
                    }

                    for (i = 1, len = stmt.declarations.length; i < len; ++i) {
                        node = stmt.declarations[i];
                        if (extra.comment && node.leadingComments) {
                            result.push(',' + newline);
                            result.push(addIndent(generateStatement(node, {
                                allowIn: allowIn
                            })));
                        } else {
                            result.push(',' + space);
                            result.push(generateStatement(node, {
                                allowIn: allowIn
                            }));
                        }
                    }
                });
            }
            result.push(semicolon);
            break;

        case Syntax.ThrowStatement:
            result = [join(
                'throw',
                generateExpression(stmt.argument, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                })
            ), semicolon];
            break;

        case Syntax.TryStatement:
            result = ['try', maybeBlock(stmt.block)];
            result = maybeBlockSuffix(stmt.block, result);

            if (stmt.handlers) {
                // old interface
                for (i = 0, len = stmt.handlers.length; i < len; ++i) {
                    result = join(result, generateStatement(stmt.handlers[i]));
                    if (stmt.finalizer || i + 1 !== len) {
                        result = maybeBlockSuffix(stmt.handlers[i].body, result);
                    }
                }
            } else {
                stmt.guardedHandlers = stmt.guardedHandlers || [];

                for (i = 0, len = stmt.guardedHandlers.length; i < len; ++i) {
                    result = join(result, generateStatement(stmt.guardedHandlers[i]));
                    if (stmt.finalizer || i + 1 !== len) {
                        result = maybeBlockSuffix(stmt.guardedHandlers[i].body, result);
                    }
                }

                // new interface
                if (stmt.handler) {
                    if (isArray(stmt.handler)) {
                        for (i = 0, len = stmt.handler.length; i < len; ++i) {
                            result = join(result, generateStatement(stmt.handler[i]));
                            if (stmt.finalizer || i + 1 !== len) {
                                result = maybeBlockSuffix(stmt.handler[i].body, result);
                            }
                        }
                    } else {
                        result = join(result, generateStatement(stmt.handler));
                        if (stmt.finalizer) {
                            result = maybeBlockSuffix(stmt.handler.body, result);
                        }
                    }
                }
            }
            if (stmt.finalizer) {
                result = join(result, ['finally', maybeBlock(stmt.finalizer)]);
            }
            break;

        case Syntax.SwitchStatement:
            withIndent(function () {
                result = [
                    'switch' + space + '(',
                    generateExpression(stmt.discriminant, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                for (i = 0, len = stmt.cases.length; i < len; ++i) {
                    fragment = addIndent(generateStatement(stmt.cases[i], {semicolonOptional: i === len - 1}));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            }
            result.push(addIndent('}'));
            break;

        case Syntax.SwitchCase:
            withIndent(function () {
                if (stmt.test) {
                    result = [
                        join('case', generateExpression(stmt.test, {
                            precedence: Precedence.Sequence,
                            allowIn: true,
                            allowCall: true
                        })),
                        ':'
                    ];
                } else {
                    result = ['default:'];
                }

                i = 0;
                len = stmt.consequent.length;
                if (len && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = maybeBlock(stmt.consequent[0]);
                    result.push(fragment);
                    i = 1;
                }

                if (i !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }

                for (; i < len; ++i) {
                    fragment = addIndent(generateStatement(stmt.consequent[i], {semicolonOptional: i === len - 1 && semicolon === ''}));
                    result.push(fragment);
                    if (i + 1 !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });
            break;

        case Syntax.IfStatement:
            withIndent(function () {
                result = [
                    'if' + space + '(',
                    generateExpression(stmt.test, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    ')'
                ];
            });
            if (stmt.alternate) {
                result.push(maybeBlock(stmt.consequent));
                result = maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                    result = join(result, ['else ', generateStatement(stmt.alternate, {semicolonOptional: semicolon === ''})]);
                } else {
                    result = join(result, join('else', maybeBlock(stmt.alternate, semicolon === '')));
                }
            } else {
                result.push(maybeBlock(stmt.consequent, semicolon === ''));
            }
            break;

        case Syntax.ForStatement:
            withIndent(function () {
                result = ['for' + space + '('];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) {
                        result.push(generateStatement(stmt.init, {allowIn: false}));
                    } else {
                        result.push(generateExpression(stmt.init, {
                            precedence: Precedence.Sequence,
                            allowIn: false,
                            allowCall: true
                        }));
                        result.push(';');
                    }
                } else {
                    result.push(';');
                }

                if (stmt.test) {
                    result.push(space);
                    result.push(generateExpression(stmt.test, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }));
                    result.push(';');
                } else {
                    result.push(';');
                }

                if (stmt.update) {
                    result.push(space);
                    result.push(generateExpression(stmt.update, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }));
                    result.push(')');
                } else {
                    result.push(')');
                }
            });

            result.push(maybeBlock(stmt.body, semicolon === ''));
            break;

        case Syntax.ForInStatement:
            result = generateIterationForStatement('in', stmt, semicolon === '');
            break;

        case Syntax.ForOfStatement:
            result = generateIterationForStatement('of', stmt, semicolon === '');
            break;

        case Syntax.LabeledStatement:
            result = [stmt.label.name + ':', maybeBlock(stmt.body, semicolon === '')];
            break;

        case Syntax.Program:
            len = stmt.body.length;
            result = [safeConcatenation && len > 0 ? '\n' : ''];
            for (i = 0; i < len; ++i) {
                fragment = addIndent(
                    generateStatement(stmt.body[i], {
                        semicolonOptional: !safeConcatenation && i === len - 1,
                        directiveContext: true
                    })
                );
                result.push(fragment);
                if (i + 1 < len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
            break;

        case Syntax.FunctionDeclaration:
            isGenerator = stmt.generator && !extra.moz.starlessGenerator;
            result = [
                (isGenerator ? 'function*' : 'function'),
                (isGenerator ? space : noEmptySpace()),
                generateIdentifier(stmt.id),
                generateFunctionBody(stmt)
            ];
            break;

        case Syntax.ReturnStatement:
            if (stmt.argument) {
                result = [join(
                    'return',
                    generateExpression(stmt.argument, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    })
                ), semicolon];
            } else {
                result = ['return' + semicolon];
            }
            break;

        case Syntax.WhileStatement:
            withIndent(function () {
                result = [
                    'while' + space + '(',
                    generateExpression(stmt.test, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    ')'
                ];
            });
            result.push(maybeBlock(stmt.body, semicolon === ''));
            break;

        case Syntax.WithStatement:
            withIndent(function () {
                result = [
                    'with' + space + '(',
                    generateExpression(stmt.object, {
                        precedence: Precedence.Sequence,
                        allowIn: true,
                        allowCall: true
                    }),
                    ')'
                ];
            });
            result.push(maybeBlock(stmt.body, semicolon === ''));
            break;

        default:
            throw new Error('Unknown statement type: ' + stmt.type);
        }

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        extra = options;

        if (sourceMap) {
            if (!global.window) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = require('source-map').SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        switch (node.type) {
        case Syntax.BlockStatement:
        case Syntax.BreakStatement:
        case Syntax.CatchClause:
        case Syntax.ContinueStatement:
        case Syntax.DirectiveStatement:
        case Syntax.DoWhileStatement:
        case Syntax.DebuggerStatement:
        case Syntax.EmptyStatement:
        case Syntax.ExpressionStatement:
        case Syntax.ForStatement:
        case Syntax.ForInStatement:
        case Syntax.ForOfStatement:
        case Syntax.FunctionDeclaration:
        case Syntax.IfStatement:
        case Syntax.LabeledStatement:
        case Syntax.Program:
        case Syntax.ReturnStatement:
        case Syntax.SwitchStatement:
        case Syntax.SwitchCase:
        case Syntax.ThrowStatement:
        case Syntax.TryStatement:
        case Syntax.VariableDeclaration:
        case Syntax.VariableDeclarator:
        case Syntax.WhileStatement:
        case Syntax.WithStatement:
            result = generateStatement(node);
            break;

        case Syntax.AssignmentExpression:
        case Syntax.ArrayExpression:
        case Syntax.ArrayPattern:
        case Syntax.BinaryExpression:
        case Syntax.CallExpression:
        case Syntax.ConditionalExpression:
        case Syntax.FunctionExpression:
        case Syntax.Identifier:
        case Syntax.Literal:
        case Syntax.LogicalExpression:
        case Syntax.MemberExpression:
        case Syntax.NewExpression:
        case Syntax.ObjectExpression:
        case Syntax.ObjectPattern:
        case Syntax.Property:
        case Syntax.SequenceExpression:
        case Syntax.ThisExpression:
        case Syntax.UnaryExpression:
        case Syntax.UpdateExpression:
        case Syntax.YieldExpression:

            result = generateExpression(node, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
            });
            break;

        default:
            throw new Error('Unknown node type: ' + node.type);
        }

        if (!sourceMap) {
            pair = {code: result.toString(), map: null};
            return options.sourceMapWithCode ? pair : pair.code;
        }


        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap,
                                      options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
}());
/* vim: set sw=4 ts=4 et tw=80 : */
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/escodegen/index',_ion_compiler_escodegen_index_);
    else
      _ion_compiler_escodegen_index_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_escodegen_index_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_estraverse_index_ = function(module,exports,require){/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

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
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true, define:true*/
(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // and plain browser loading,
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.estraverse = {}));
    }
}(this, function (exports) {
    'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        BREAK,
        SKIP;

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    function ignoreJSHintError() { }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'defaults', 'rest', 'body'],
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'body', 'superClass'],
        ClassExpression: ['id', 'body', 'superClass'],
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'defaults', 'rest', 'body'],
        FunctionExpression: ['id', 'params', 'defaults', 'rest', 'body'],
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MethodDefinition: ['key', 'value'],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handlers', 'handler', 'guardedHandlers', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
    };

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = element.wrap || node.type;
                candidates = VisitorKeys[nodeType];

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (!isArray(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                        continue;
                    }

                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if ((nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === candidates[current]) {
                            element = new Element(candidate[current2], [key, current2], 'Property', null);
                        } else {
                            element = new Element(candidate[current2], [key, current2], null, null);
                        }
                        worklist.push(element);
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = element.wrap || node.type;
            candidates = VisitorKeys[nodeType];

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (!isArray(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                    continue;
                }

                current2 = candidate.length;
                while ((current2 -= 1) >= 0) {
                    if (!candidate[current2]) {
                        continue;
                    }
                    if (nodeType === Syntax.ObjectExpression && 'properties' === candidates[current]) {
                        element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                    } else {
                        element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                    }
                    worklist.push(element);
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = '1.5.1-dev';
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
}));
/* vim: set sw=4 ts=4 et tw=80 : */
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/estraverse/index',_ion_compiler_estraverse_index_);
    else
      _ion_compiler_estraverse_index_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_estraverse_index_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_esutils_code_ = function(module,exports,require){/*
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

    var Regex;

    // See `tools/generate-identifier-regex.js`.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    function isDecimalDigit(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    function isHexDigit(ch) {
        return isDecimalDigit(ch) || (97 <= ch && ch <= 102) || (65 <= ch && ch <= 70);
    }

    function isOctalDigit(ch) {
        return (ch >= 48 && ch <= 55);   // 0..7
    }

    // 7.2 White Space

    function isWhiteSpace(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch >= 48 && ch <= 57) ||         // 0..9
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStart: isIdentifierStart,
        isIdentifierPart: isIdentifierPart
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/esutils/code',_ion_compiler_esutils_code_);
    else
      _ion_compiler_esutils_code_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_esutils_code_.call(this);
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
        options.id = options.id != null ? options.id : 'unknown';
        options.loc = options.loc != null ? options.loc : true;
        options.target = options.target != null ? options.target : 'es5';
        var preprocessor = require('./preprocessor'), parser = require('./parser'), postprocessor = require('./postprocessor'), escodegen = require('./escodegen');
        var sourceMapping = {}, result = preprocessor.preprocess(content, sourceMapping), sourceMap = null, preprocessed = result, sourceLocationsFixed = false;
        try {
            result = parser.parse(result, options);
            if (options.loc) {
                result.loc.source = content;
            }
            result = preprocessor.fixSourceLocations(result, sourceMapping);
            sourceLocationsFixed = true;
            if (options.postprocess !== false) {
                result = postprocessor.postprocess(result, options);
                if ((options != null ? options.generate : void 0) !== false) {
                    var generateOptions = {};
                    {
                        generateOptions.sourceMapWithCode = true;
                        if (!(global.window != null)) {
                            generateOptions.sourceMap = options.sourceMap != null ? options.sourceMap : options.id;
                        }
                        generateOptions.sourceContent = content;
                        generateOptions.verbatim = 'verbatim';
                    }
                    var output = escodegen.generate(result, generateOptions);
                    result = output.code;
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
//@ sourceMappingURL=./index.map
void (function(){var _ion_compiler_nodes_ = function(module,exports,require){'use strict';
var ion = require('../');
var BlockStatement = exports.BlockStatement = {
        isBlock: true,
        newScope: true
    }, Program = exports.Program = {
        isBlock: true,
        newScope: true,
        reactive: false
    }, FunctionExpression = exports.FunctionExpression = {
        isFunction: true,
        paramKind: 'let',
        newScope: true,
        shadow: true,
        reactive: false
    }, FunctionDeclaration = exports.FunctionDeclaration = FunctionExpression, Template = exports.Template = {
        isFunction: true,
        paramKind: 'const',
        newScope: true,
        shadow: true,
        reactive: true
    }, ForStatement = exports.ForStatement = {
        newScope: true,
        allowedInReactive: false
    }, ForInStatement = exports.ForInStatement = { newScope: true }, ForOfStatement = exports.ForOfStatement = { newScope: true }, ExportStatement = exports.ExportStatement = { allowedInReactive: false }, ClassExpression = exports.ClassExpression = { allowedInReactive: false }, ThrowStatement = exports.ThrowStatement = { allowedInReactive: false }, TryStatement = exports.TryStatement = { allowedInReactive: false };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/nodes',_ion_compiler_nodes_);
    else
      _ion_compiler_nodes_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_nodes_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./nodes.map
void (function(){var _ion_compiler_parser_ = function(module,exports,require){module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { Program: peg$parseProgram },
        peg$startRuleFunction  = peg$parseProgram,

        peg$c0 = peg$FAILED,
        peg$c1 = function(start, body, end) { return node("Program", {body:body}, start, end) },
        peg$c2 = function(a) { return a.body },
        peg$c3 = [],
        peg$c4 = null,
        peg$c5 = ",",
        peg$c6 = { type: "literal", value: ",", description: "\",\"" },
        peg$c7 = function(a) { return a },
        peg$c8 = function(start, value, end) { return node('ExportStatement', {value:value}, start, end) },
        peg$c9 = function(start, argument, end) { return node("ReturnStatement", {argument:argument}, start, end) },
        peg$c10 = function(start, argument, end) { return node("ThrowStatement", {argument:argument}, start, end) },
        peg$c11 = function(start, end) { return node("BreakStatement", {}, start, end) },
        peg$c12 = function(start, end) { return node("ContinueStatement", {}, start, end) },
        peg$c13 = function(a) {return {expression:a, text:text()}},
        peg$c14 = function(start, properties, end) { return node('AssertStatement', properties, start, end) },
        peg$c15 = function(start, expression, end) { return node("ExpressionStatement", {expression:expression}, start, end) },
        peg$c16 = void 0,
        peg$c17 = function(start, f, end) { return node("ActivateStatement", {argument: f}, start, end) },
        peg$c18 = function(a) {return a},
        peg$c19 = function(start, test, consequent, alternate, end) { return node("IfStatement", {test:test, consequent:consequent, alternate:alternate}, start, end) },
        peg$c20 = function(start, block, handler, finalizer, end) { return node("TryStatement", {block:block, handler:handler, finalizer:finalizer}, start, end) },
        peg$c21 = function(start, block, finalizer, end) { return node("TryStatement", {block:block, finalizer:finalizer}, start, end) },
        peg$c22 = function(start, param, body, end) { return node("CatchClause", {param:param, guard:null, body:body}, start, end) },
        peg$c23 = function(start, test, body, end) { return node("WhileStatement", {test:test, body:body}, start, end)},
        peg$c24 = function() { return "ForOfStatement" },
        peg$c25 = function() { return "ForInStatement" },
        peg$c26 = function(test) { return test },
        peg$c27 = function(left, type, right, test, inner) { return {type:type, left:left, right:right, test:test || undefined, inner: inner || undefined} },
        peg$c28 = function(start, a, end) { return node("BlockStatement", {body:a.body}, start, end) },
        peg$c29 = function(start, head, body, remove, end) {
                head = clone(head)
                head.body = body
                head.remove = remove
                return node(head.type, head, start, end)
            },
        peg$c30 = ";",
        peg$c31 = { type: "literal", value: ";", description: "\";\"" },
        peg$c32 = function(start, init, test, update, body, end) { return node("ForStatement", {init:init, test:test, update:update, body:body}, start, end) },
        peg$c33 = "[",
        peg$c34 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c35 = "]",
        peg$c36 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c37 = function(start, value, comprehension, end) {
                // value must be defined AFTER comprehension so that it reflects the actual order of usage.
                // This is important for the checkVariableDeclarations processor.
                return node("ArrayExpression", {comprehension:comprehension, value:value}, start, end)
            },
        peg$c38 = function(start, body, end) { return node("BlockStatement", {body:body}, start, end) },
        peg$c39 = function(start, name, _extends, properties, end) {
                if (name == null)
                    name = {name:null,computed:false}
                return node("ClassExpression", {name:name.name, computed:name.computed, 'extends':_extends || [], properties:(properties != null ? properties.body : [])}, start, end)
            },
        peg$c40 = function(name) { return {name:name,computed:false} },
        peg$c41 = function(name) { return {name:name,computed:true} },
        peg$c42 = function(baseClasses) { return baseClasses },
        peg$c43 = ".",
        peg$c44 = { type: "literal", value: ".", description: "\".\"" },
        peg$c45 = function(head, tail) { return [head].concat(tail) },
        peg$c46 = function(key) { return {key:key} },
        peg$c47 = function(key) { return {key:key, computed: true} },
        peg$c48 = "(",
        peg$c49 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c50 = ")",
        peg$c51 = { type: "literal", value: ")", description: "\")\"" },
        peg$c52 = function(start, declaration, properties, end) {
                declaration = clone(declaration)
                if (properties != null)
                    declaration.value = node("ObjectExpression", {objectType:declaration.value,properties:properties.body}, start, end)
                declaration.add = true
                return declaration
            },
        peg$c53 = ":",
        peg$c54 = { type: "literal", value: ":", description: "\":\"" },
        peg$c55 = function(start, left, value, end) { return node("Property", { key: left.key, value:value, kind: 'init', computed:left.computed }, start, end) },
        peg$c56 = function(start, kind, declarations, end) { return node("VariableDeclaration", {declarations:declarations, kind:kind != null ? kind : "let"}, start, end) },
        peg$c57 = function(declarations) { return declarations },
        peg$c58 = function(start, func, end) { return node("VariableDeclarator", {id:func.id,init:func}, start, end) },
        peg$c59 = function(start, pattern, init, end) { return node("VariableDeclarator", {id:pattern,init:init}, start, end) },
        peg$c60 = "=",
        peg$c61 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c62 = function(pattern) { /* due to packrat parsing, you MUST clone before modifying anything. */ pattern = clone(pattern); pattern.type = "ObjectPattern"; return pattern },
        peg$c63 = function(pattern) { /* due to packrat parsing, you MUST clone before modifying anything. */ pattern = clone(pattern); pattern.type = "ArrayPattern"; return pattern },
        peg$c64 = "...",
        peg$c65 = { type: "literal", value: "...", description: "\"...\"" },
        peg$c66 = function(start, e, end) { return node("SpreadExpression", {expression:e}, start, end) },
        peg$c67 = function(arg) { return arg },
        peg$c68 = function(property) { return property },
        peg$c69 = function(start, properties, end) { return [node("ObjectExpression", {properties:properties}, start, end)] },
        peg$c70 = function(start, callee, args, end) {
                if (callee.type === 'NewExpression' && callee.arguments == null)
                    return node("NewExpression", {callee: callee.callee, arguments: args}, start, end)
                return node("CallExpression", {callee: callee, arguments: args}, start, end)
            },
        peg$c71 = "+=",
        peg$c72 = { type: "literal", value: "+=", description: "\"+=\"" },
        peg$c73 = "-=",
        peg$c74 = { type: "literal", value: "-=", description: "\"-=\"" },
        peg$c75 = "*=",
        peg$c76 = { type: "literal", value: "*=", description: "\"*=\"" },
        peg$c77 = "/=",
        peg$c78 = { type: "literal", value: "/=", description: "\"/=\"" },
        peg$c79 = "%=",
        peg$c80 = { type: "literal", value: "%=", description: "\"%=\"" },
        peg$c81 = "<<=",
        peg$c82 = { type: "literal", value: "<<=", description: "\"<<=\"" },
        peg$c83 = ">>=",
        peg$c84 = { type: "literal", value: ">>=", description: "\">>=\"" },
        peg$c85 = ">>>=",
        peg$c86 = { type: "literal", value: ">>>=", description: "\">>>=\"" },
        peg$c87 = "^=",
        peg$c88 = { type: "literal", value: "^=", description: "\"^=\"" },
        peg$c89 = "&=",
        peg$c90 = { type: "literal", value: "&=", description: "\"&=\"" },
        peg$c91 = "??=",
        peg$c92 = { type: "literal", value: "??=", description: "\"??=\"" },
        peg$c93 = "?=",
        peg$c94 = { type: "literal", value: "?=", description: "\"?=\"" },
        peg$c95 = ":=",
        peg$c96 = { type: "literal", value: ":=", description: "\":=\"" },
        peg$c97 = function(start, left, op, right, end) { return node("AssignmentExpression", {operator:op, left:left, right:right}, start, end) },
        peg$c98 = "?",
        peg$c99 = { type: "literal", value: "?", description: "\"?\"" },
        peg$c100 = function(start, test, consequent, alternate, end) { return node('ConditionalExpression', {test:test,consequent:consequent,alternate:alternate}, start, end) },
        peg$c101 = "??",
        peg$c102 = { type: "literal", value: "??", description: "\"??\"" },
        peg$c103 = function(start, head, tail) { return leftAssociateBinaryExpressions(start, head, tail) },
        peg$c104 = "|",
        peg$c105 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c106 = "^",
        peg$c107 = { type: "literal", value: "^", description: "\"^\"" },
        peg$c108 = "&",
        peg$c109 = { type: "literal", value: "&", description: "\"&\"" },
        peg$c110 = "<=",
        peg$c111 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c112 = ">=",
        peg$c113 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c114 = "<",
        peg$c115 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c116 = ">",
        peg$c117 = { type: "literal", value: ">", description: "\">\"" },
        peg$c118 = ">>>",
        peg$c119 = { type: "literal", value: ">>>", description: "\">>>\"" },
        peg$c120 = ">>",
        peg$c121 = { type: "literal", value: ">>", description: "\">>\"" },
        peg$c122 = "<<",
        peg$c123 = { type: "literal", value: "<<", description: "\"<<\"" },
        peg$c124 = "+",
        peg$c125 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c126 = "-",
        peg$c127 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c128 = "*",
        peg$c129 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c130 = "/",
        peg$c131 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c132 = "%",
        peg$c133 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c134 = function(start, op, arg, end) { return node('UnaryExpression', {operator:op, argument:arg}, start, end) },
        peg$c135 = { type: "other", description: "unaryOperator" },
        peg$c136 = "~",
        peg$c137 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c138 = "++",
        peg$c139 = { type: "literal", value: "++", description: "\"++\"" },
        peg$c140 = "--",
        peg$c141 = { type: "literal", value: "--", description: "\"--\"" },
        peg$c142 = function(start, op, arg, end) { return node('UpdateExpression', {operator:op, argument:arg, prefix:true}, start, end) },
        peg$c143 = function(start, arg, op, end) { return node('UpdateExpression', {operator:op, argument:arg, prefix:false}, start, end) },
        peg$c144 = function(start, arg, op, end) { return node('UnaryExpression', {operator:op, argument:arg}, start, end) },
        peg$c145 = function(start, head, tail) { return leftAssociateCallsOrMembers(start, head, tail) },
        peg$c146 = function() {return true},
        peg$c147 = function(existential, args, end) { return ["callee", node("CallExpression", {callee:null, arguments:args, existential:existential || undefined}), end] },
        peg$c148 = function(existential, property, end) { return ["object", node("MemberExpression", {computed:true, object:null, property:property, existential:existential || undefined}), end] },
        peg$c149 = function(existential, property, end) { return ["object", node("MemberExpression", {computed:false, object:null, property:property, existential:existential || undefined}), end] },
        peg$c150 = function(a) { return a ? a : [] },
        peg$c151 = function(c) {return c},
        peg$c152 = function(a, b) { return [a].concat(b) },
        peg$c153 = function(start, callee, args, end) { return node("NewExpression", {callee:callee,arguments:args || null}, start, end) },
        peg$c154 = function(start, name, end) { return node('ImportExpression', {name:name}, start, end) },
        peg$c155 = function(start, f, end) {
                var args;
                if (f.params != null)
                    args = f.params.map(function(x){ return x.name != null ? clone(x) : error("do parameters must be Identifiers") })
                else
                    args = []
                return node("CallExpression", {callee:f,arguments:args}, start, end)
            },
        peg$c156 = "->",
        peg$c157 = { type: "literal", value: "->", description: "\"->\"" },
        peg$c158 = function() { return false },
        peg$c159 = "=>",
        peg$c160 = { type: "literal", value: "=>", description: "\"=>\"" },
        peg$c161 = function() { return true },
        peg$c162 = function(start, template, id, params, bound, body, end) {
                if (params == null) params = []
                paramPatterns = params.map(function(x) { return x[0] })
                paramDefaults = params.map(function(x) { return x[1] })
                // convert expression closures to return statements in a block
                if (body == null)
                    body = node('BlockStatement', {body:[]})
                else if (body.type === 'ThrowStatement')
                    body = node('BlockStatement', {body:[body]})
                else if (body.type !== 'BlockStatement')
                    body = node('BlockStatement', {body:[node('ReturnStatement', {argument:body})]})
                return node('FunctionExpression', {id:id, params:paramPatterns, defaults:paramDefaults, body:body, bound:bound, template:template ? true : undefined}, start, end)
            },
        peg$c163 = function(params) { return params != null ? params : [] },
        peg$c164 = function(param, init) { return [param,init] },
        peg$c165 = { type: "other", description: "primaryExpression" },
        peg$c166 = "`",
        peg$c167 = { type: "literal", value: "`", description: "\"`\"" },
        peg$c168 = { type: "any", description: "any character" },
        peg$c169 = function(start, a, end) { return node("JavascriptExpression", {text:text().slice(1, -1)}, start, end) },
        peg$c170 = function(start, elements, end) { return node("ArrayExpression", {elements:elements || []}, start, end) },
        peg$c171 = function(item) {return item},
        peg$c172 = "{",
        peg$c173 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c174 = "}",
        peg$c175 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c176 = function(start, assignments, end) { return node("ObjectExpression", {properties:assignments || []}, start, end) },
        peg$c177 = function(start, key, end) { return node("Property", { key: key, value:clone(key), kind: 'init'}, start, end) },
        peg$c178 = function(start, type, properties, end) { return node("ObjectExpression", {objectType:type,properties:properties.body}, start, end) },
        peg$c179 = function(start, properties, end) { return node("ObjectExpression", {properties:properties.body}, start, end) },
        peg$c180 = { type: "other", description: "group" },
        peg$c181 = function(expression) { return expression },
        peg$c182 = function(value) { return value },
        peg$c183 = function(start, name, end) { return node("Identifier", {name:name}, start, end) },
        peg$c184 = { type: "other", description: "this" },
        peg$c185 = "@@",
        peg$c186 = { type: "literal", value: "@@", description: "\"@@\"" },
        peg$c187 = function(start, property, end) { return thisExpression(start, end, "constructor", property) },
        peg$c188 = "@",
        peg$c189 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c190 = function(start, property, end) { return thisExpression(start, end, property) },
        peg$c191 = function(start, end) { return thisExpression(start, end, "constructor") },
        peg$c192 = function(start, end) { return thisExpression(start, end) },
        peg$c193 = { type: "other", description: "literal" },
        peg$c194 = function(start, value, end) { return node('Literal', {value:value}, start, end) },
        peg$c195 = function(start, end) { return node('UnaryExpression', {operator:'void', prefix:true, argument:node('Literal', {value:0}, start, end)}, start, end) },
        peg$c196 = function() { return {line:line(),column:column()-1} },
        peg$c197 = function() { return offset() },
        peg$c198 = function(a, b) { return new RegExp(a, b) },
        peg$c199 = "\\",
        peg$c200 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c201 = /^[^\/]/,
        peg$c202 = { type: "class", value: "[^\\/]", description: "[^\\/]" },
        peg$c203 = /^[gimy]/,
        peg$c204 = { type: "class", value: "[gimy]", description: "[gimy]" },
        peg$c205 = "'",
        peg$c206 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c207 = /^['\\\/bfnrt]/,
        peg$c208 = { type: "class", value: "['\\\\\\/bfnrt]", description: "['\\\\\\/bfnrt]" },
        peg$c209 = "u",
        peg$c210 = { type: "literal", value: "u", description: "\"u\"" },
        peg$c211 = /^[^'\\\r\n]/,
        peg$c212 = { type: "class", value: "[^'\\\\\\r\\n]", description: "[^'\\\\\\r\\n]" },
        peg$c213 = function(content) { return eval(text()) },
        peg$c214 = "\"",
        peg$c215 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c216 = /^["\\\/bfnrt]/,
        peg$c217 = { type: "class", value: "[\"\\\\\\/bfnrt]", description: "[\"\\\\\\/bfnrt]" },
        peg$c218 = /^[^"\\\r\n]/,
        peg$c219 = { type: "class", value: "[^\"\\\\\\r\\n]", description: "[^\"\\\\\\r\\n]" },
        peg$c220 = function(content) { return JSON.parse(text()) },
        peg$c221 = "\"\"",
        peg$c222 = { type: "literal", value: "\"\"", description: "\"\\\"\\\"\"" },
        peg$c223 = function(start, content, end) { return concatenate(unindent(content)) },
        peg$c224 = function(a) { return Array.prototype.concat.apply([], a) },
        peg$c225 = "{{",
        peg$c226 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c227 = function() { return text() },
        peg$c228 = "''",
        peg$c229 = { type: "literal", value: "''", description: "\"''\"" },
        peg$c230 = "}}",
        peg$c231 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c232 = function(a) { return concatenate(a) },
        peg$c233 = function() { return JSON.parse('"' + text() + '"') },
        peg$c234 = /^[+\-]/,
        peg$c235 = { type: "class", value: "[+\\-]", description: "[+\\-]" },
        peg$c236 = /^[eE]/,
        peg$c237 = { type: "class", value: "[eE]", description: "[eE]" },
        peg$c238 = function() { return parseFloat(text()) },
        peg$c239 = function() { return parseInt(text()) },
        peg$c240 = /^[0-9]/,
        peg$c241 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c242 = "0",
        peg$c243 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c244 = "0x",
        peg$c245 = { type: "literal", value: "0x", description: "\"0x\"" },
        peg$c246 = function() { return parseInt(text(), 16) },
        peg$c247 = /^[0-9a-fA-F]/,
        peg$c248 = { type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]" },
        peg$c249 = { type: "other", description: "identifier" },
        peg$c250 = { type: "other", description: "identifierName" },
        peg$c251 = /^[$_]/,
        peg$c252 = { type: "class", value: "[$_]", description: "[$_]" },
        peg$c253 = "\\u",
        peg$c254 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c255 = function(h0, h1, h2, h3) { return String.fromCharCode(parseInt(h0 + h1 + h2 + h3, 16)); },
        peg$c256 = /^[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uFF21-\uFF3Aa-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D62-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7C\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2D00-\u2D25\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D61\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA717-\uA71F\uA770\uA788\uA9CF\uAA70\uAADD\uFF70\uFF9E\uFF9F\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BC0-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u2135-\u2138\u2D30-\u2D65\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400\u4DB5\u4E00\u9FCB\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]/,
        peg$c257 = { type: "class", value: "[A-Z\\xC0-\\xD6\\xD8-\\xDE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017B\\u017D\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019C\\u019D\\u019F\\u01A0\\u01A2\\u01A4\\u01A6\\u01A7\\u01A9\\u01AC\\u01AE\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A\\u023B\\u023D\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u0386\\u0388-\\u038A\\u038C\\u038E\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0531-\\u0556\\u10A0-\\u10C5\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uFF21-\\uFF3Aa-z\\xAA\\xB5\\xBA\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0561-\\u0587\\u1D00-\\u1D2B\\u1D62-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6\\u1FC7\\u1FD0-\\u1FD3\\u1FD6\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6\\u1FF7\\u210A\\u210E\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73\\u2C74\\u2C76-\\u2C7C\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3\\u2CE4\\u2CEC\\u2CEE\\u2D00-\\u2D25\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7FA\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5\\u06E6\\u07F4\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D61\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA717-\\uA71F\\uA770\\uA788\\uA9CF\\uAA70\\uAADD\\uFF70\\uFF9E\\uFF9F\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E45\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10D0-\\u10FA\\u1100-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BC0-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u2135-\\u2138\\u2D30-\\u2D65\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FCB\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB\\uAADC\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA2D\\uFA30-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC\\u16EE-\\u16F0\\u2160-\\u2182\\u2185-\\u2188\\u3007\\u3021-\\u3029\\u3038-\\u303A\\uA6E6-\\uA6EF]", description: "[A-Z\\xC0-\\xD6\\xD8-\\xDE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017B\\u017D\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019C\\u019D\\u019F\\u01A0\\u01A2\\u01A4\\u01A6\\u01A7\\u01A9\\u01AC\\u01AE\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A\\u023B\\u023D\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u0386\\u0388-\\u038A\\u038C\\u038E\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0531-\\u0556\\u10A0-\\u10C5\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uFF21-\\uFF3Aa-z\\xAA\\xB5\\xBA\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0561-\\u0587\\u1D00-\\u1D2B\\u1D62-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6\\u1FC7\\u1FD0-\\u1FD3\\u1FD6\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6\\u1FF7\\u210A\\u210E\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73\\u2C74\\u2C76-\\u2C7C\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3\\u2CE4\\u2CEC\\u2CEE\\u2D00-\\u2D25\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7FA\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5\\u06E6\\u07F4\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D61\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA717-\\uA71F\\uA770\\uA788\\uA9CF\\uAA70\\uAADD\\uFF70\\uFF9E\\uFF9F\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E45\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10D0-\\u10FA\\u1100-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BC0-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u2135-\\u2138\\u2D30-\\u2D65\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FCB\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB\\uAADC\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA2D\\uFA30-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC\\u16EE-\\u16F0\\u2160-\\u2182\\u2185-\\u2188\\u3007\\u3021-\\u3029\\u3038-\\u303A\\uA6E6-\\uA6EF]" },
        peg$c258 = "\uD82C",
        peg$c259 = { type: "literal", value: "\uD82C", description: "\"\\uD82C\"" },
        peg$c260 = /^[\uDC00\uDC01]/,
        peg$c261 = { type: "class", value: "[\\uDC00\\uDC01]", description: "[\\uDC00\\uDC01]" },
        peg$c262 = "\uD808",
        peg$c263 = { type: "literal", value: "\uD808", description: "\"\\uD808\"" },
        peg$c264 = /^[\uDC00-\uDF6E]/,
        peg$c265 = { type: "class", value: "[\\uDC00-\\uDF6E]", description: "[\\uDC00-\\uDF6E]" },
        peg$c266 = "\uD869",
        peg$c267 = { type: "literal", value: "\uD869", description: "\"\\uD869\"" },
        peg$c268 = /^[\uDED6\uDF00]/,
        peg$c269 = { type: "class", value: "[\\uDED6\\uDF00]", description: "[\\uDED6\\uDF00]" },
        peg$c270 = "\uD809",
        peg$c271 = { type: "literal", value: "\uD809", description: "\"\\uD809\"" },
        peg$c272 = /^[\uDC00-\uDC62]/,
        peg$c273 = { type: "class", value: "[\\uDC00-\\uDC62]", description: "[\\uDC00-\\uDC62]" },
        peg$c274 = "\uD835",
        peg$c275 = { type: "literal", value: "\uD835", description: "\"\\uD835\"" },
        peg$c276 = /^[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]/,
        peg$c277 = { type: "class", value: "[\\uDC00-\\uDC19\\uDC34-\\uDC4D\\uDC68-\\uDC81\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB5\\uDCD0-\\uDCE9\\uDD04\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD38\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD6C-\\uDD85\\uDDA0-\\uDDB9\\uDDD4-\\uDDED\\uDE08-\\uDE21\\uDE3C-\\uDE55\\uDE70-\\uDE89\\uDEA8-\\uDEC0\\uDEE2-\\uDEFA\\uDF1C-\\uDF34\\uDF56-\\uDF6E\\uDF90-\\uDFA8\\uDFCA\\uDC1A-\\uDC33\\uDC4E-\\uDC54\\uDC56-\\uDC67\\uDC82-\\uDC9B\\uDCB6-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDCCF\\uDCEA-\\uDD03\\uDD1E-\\uDD37\\uDD52-\\uDD6B\\uDD86-\\uDD9F\\uDDBA-\\uDDD3\\uDDEE-\\uDE07\\uDE22-\\uDE3B\\uDE56-\\uDE6F\\uDE8A-\\uDEA5\\uDEC2-\\uDEDA\\uDEDC-\\uDEE1\\uDEFC-\\uDF14\\uDF16-\\uDF1B\\uDF36-\\uDF4E\\uDF50-\\uDF55\\uDF70-\\uDF88\\uDF8A-\\uDF8F\\uDFAA-\\uDFC2\\uDFC4-\\uDFC9\\uDFCB]", description: "[\\uDC00-\\uDC19\\uDC34-\\uDC4D\\uDC68-\\uDC81\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB5\\uDCD0-\\uDCE9\\uDD04\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD38\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD6C-\\uDD85\\uDDA0-\\uDDB9\\uDDD4-\\uDDED\\uDE08-\\uDE21\\uDE3C-\\uDE55\\uDE70-\\uDE89\\uDEA8-\\uDEC0\\uDEE2-\\uDEFA\\uDF1C-\\uDF34\\uDF56-\\uDF6E\\uDF90-\\uDFA8\\uDFCA\\uDC1A-\\uDC33\\uDC4E-\\uDC54\\uDC56-\\uDC67\\uDC82-\\uDC9B\\uDCB6-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDCCF\\uDCEA-\\uDD03\\uDD1E-\\uDD37\\uDD52-\\uDD6B\\uDD86-\\uDD9F\\uDDBA-\\uDDD3\\uDDEE-\\uDE07\\uDE22-\\uDE3B\\uDE56-\\uDE6F\\uDE8A-\\uDEA5\\uDEC2-\\uDEDA\\uDEDC-\\uDEE1\\uDEFC-\\uDF14\\uDF16-\\uDF1B\\uDF36-\\uDF4E\\uDF50-\\uDF55\\uDF70-\\uDF88\\uDF8A-\\uDF8F\\uDFAA-\\uDFC2\\uDFC4-\\uDFC9\\uDFCB]" },
        peg$c278 = "\uD804",
        peg$c279 = { type: "literal", value: "\uD804", description: "\"\\uD804\"" },
        peg$c280 = /^[\uDC03-\uDC37\uDC83-\uDCAF]/,
        peg$c281 = { type: "class", value: "[\\uDC03-\\uDC37\\uDC83-\\uDCAF]", description: "[\\uDC03-\\uDC37\\uDC83-\\uDCAF]" },
        peg$c282 = "\uD800",
        peg$c283 = { type: "literal", value: "\uD800", description: "\"\\uD800\"" },
        peg$c284 = /^[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1E\uDF30-\uDF40\uDF42-\uDF49\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]/,
        peg$c285 = { type: "class", value: "[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1E\\uDF30-\\uDF40\\uDF42-\\uDF49\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDD40-\\uDD74\\uDF41\\uDF4A\\uDFD1-\\uDFD5]", description: "[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1E\\uDF30-\\uDF40\\uDF42-\\uDF49\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDD40-\\uDD74\\uDF41\\uDF4A\\uDFD1-\\uDFD5]" },
        peg$c286 = "\uD80C",
        peg$c287 = { type: "literal", value: "\uD80C", description: "\"\\uD80C\"" },
        peg$c288 = /^[\uDC00-\uDFFF]/,
        peg$c289 = { type: "class", value: "[\\uDC00-\\uDFFF]", description: "[\\uDC00-\\uDFFF]" },
        peg$c290 = "\uD801",
        peg$c291 = { type: "literal", value: "\uD801", description: "\"\\uD801\"" },
        peg$c292 = /^[\uDC00-\uDC9D]/,
        peg$c293 = { type: "class", value: "[\\uDC00-\\uDC9D]", description: "[\\uDC00-\\uDC9D]" },
        peg$c294 = "\uD86E",
        peg$c295 = { type: "literal", value: "\uD86E", description: "\"\\uD86E\"" },
        peg$c296 = /^[\uDC1D]/,
        peg$c297 = { type: "class", value: "[\\uDC1D]", description: "[\\uDC1D]" },
        peg$c298 = "\uD803",
        peg$c299 = { type: "literal", value: "\uD803", description: "\"\\uD803\"" },
        peg$c300 = /^[\uDC00-\uDC48]/,
        peg$c301 = { type: "class", value: "[\\uDC00-\\uDC48]", description: "[\\uDC00-\\uDC48]" },
        peg$c302 = "\uD840",
        peg$c303 = { type: "literal", value: "\uD840", description: "\"\\uD840\"" },
        peg$c304 = /^[\uDC00]/,
        peg$c305 = { type: "class", value: "[\\uDC00]", description: "[\\uDC00]" },
        peg$c306 = "\uD87E",
        peg$c307 = { type: "literal", value: "\uD87E", description: "\"\\uD87E\"" },
        peg$c308 = /^[\uDC00-\uDE1D]/,
        peg$c309 = { type: "class", value: "[\\uDC00-\\uDE1D]", description: "[\\uDC00-\\uDE1D]" },
        peg$c310 = "\uD86D",
        peg$c311 = { type: "literal", value: "\uD86D", description: "\"\\uD86D\"" },
        peg$c312 = /^[\uDF34\uDF40]/,
        peg$c313 = { type: "class", value: "[\\uDF34\\uDF40]", description: "[\\uDF34\\uDF40]" },
        peg$c314 = "\uD81A",
        peg$c315 = { type: "literal", value: "\uD81A", description: "\"\\uD81A\"" },
        peg$c316 = /^[\uDC00-\uDE38]/,
        peg$c317 = { type: "class", value: "[\\uDC00-\\uDE38]", description: "[\\uDC00-\\uDE38]" },
        peg$c318 = "\uD802",
        peg$c319 = { type: "literal", value: "\uD802", description: "\"\\uD802\"" },
        peg$c320 = /^[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDD00-\uDD15\uDD20-\uDD39\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72]/,
        peg$c321 = { type: "class", value: "[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72]", description: "[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72]" },
        peg$c322 = "\uD80D",
        peg$c323 = { type: "literal", value: "\uD80D", description: "\"\\uD80D\"" },
        peg$c324 = /^[\uDC00-\uDC2E]/,
        peg$c325 = { type: "class", value: "[\\uDC00-\\uDC2E]", description: "[\\uDC00-\\uDC2E]" },
        peg$c326 = /^[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0900-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F\uA67C\uA67D\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BE-\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0D02\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2\u0DF3\u0F3E\u0F3F\u0F7F\u102B\u102C\u1031\u1038\u103B\u103C\u1056\u1057\u1062-\u1064\u1067-\u106D\u1083\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u19B0-\u19C0\u19C8\u19C9\u1A19-\u1A1B\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF2\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BD-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAA7B\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC]/,
        peg$c327 = { type: "class", value: "[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u0900-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1BE6\\u1BE8\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26\\u0903\\u093B\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u094F\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1BE7\\u1BEA-\\u1BEC\\u1BEE\\u1BF2\\u1BF3\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]", description: "[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u0900-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1BE6\\u1BE8\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26\\u0903\\u093B\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u094F\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1BE7\\u1BEA-\\u1BEC\\u1BEE\\u1BF2\\u1BF3\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]" },
        peg$c328 = "\uDB40",
        peg$c329 = { type: "literal", value: "\uDB40", description: "\"\\uDB40\"" },
        peg$c330 = /^[\uDD00-\uDDEF]/,
        peg$c331 = { type: "class", value: "[\\uDD00-\\uDDEF]", description: "[\\uDD00-\\uDDEF]" },
        peg$c332 = "\uD834",
        peg$c333 = { type: "literal", value: "\uD834", description: "\"\\uD834\"" },
        peg$c334 = /^[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDD65\uDD66\uDD6D-\uDD72]/,
        peg$c335 = { type: "class", value: "[\\uDD67-\\uDD69\\uDD7B-\\uDD82\\uDD85-\\uDD8B\\uDDAA-\\uDDAD\\uDE42-\\uDE44\\uDD65\\uDD66\\uDD6D-\\uDD72]", description: "[\\uDD67-\\uDD69\\uDD7B-\\uDD82\\uDD85-\\uDD8B\\uDDAA-\\uDDAD\\uDE42-\\uDE44\\uDD65\\uDD66\\uDD6D-\\uDD72]" },
        peg$c336 = /^[\uDC01\uDC38-\uDC46\uDC80\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8]/,
        peg$c337 = { type: "class", value: "[\\uDC01\\uDC38-\\uDC46\\uDC80\\uDC81\\uDCB3-\\uDCB6\\uDCB9\\uDCBA\\uDC00\\uDC02\\uDC82\\uDCB0-\\uDCB2\\uDCB7\\uDCB8]", description: "[\\uDC01\\uDC38-\\uDC46\\uDC80\\uDC81\\uDCB3-\\uDCB6\\uDCB9\\uDCBA\\uDC00\\uDC02\\uDC82\\uDCB0-\\uDCB2\\uDCB7\\uDCB8]" },
        peg$c338 = /^[\uDDFD]/,
        peg$c339 = { type: "class", value: "[\\uDDFD]", description: "[\\uDDFD]" },
        peg$c340 = /^[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F]/,
        peg$c341 = { type: "class", value: "[\\uDE01-\\uDE03\\uDE05\\uDE06\\uDE0C-\\uDE0F\\uDE38-\\uDE3A\\uDE3F]", description: "[\\uDE01-\\uDE03\\uDE05\\uDE06\\uDE0C-\\uDE0F\\uDE38-\\uDE3A\\uDE3F]" },
        peg$c342 = /^[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/,
        peg$c343 = { type: "class", value: "[0-9\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]", description: "[0-9\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]" },
        peg$c344 = /^[\uDFCE-\uDFFF]/,
        peg$c345 = { type: "class", value: "[\\uDFCE-\\uDFFF]", description: "[\\uDFCE-\\uDFFF]" },
        peg$c346 = /^[\uDC66-\uDC6F]/,
        peg$c347 = { type: "class", value: "[\\uDC66-\\uDC6F]", description: "[\\uDC66-\\uDC6F]" },
        peg$c348 = /^[\uDCA0-\uDCA9]/,
        peg$c349 = { type: "class", value: "[\\uDCA0-\\uDCA9]", description: "[\\uDCA0-\\uDCA9]" },
        peg$c350 = /^[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,
        peg$c351 = { type: "class", value: "[_\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]", description: "[_\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]" },
        peg$c352 = "\u200C",
        peg$c353 = { type: "literal", value: "\u200C", description: "\"\\u200C\"" },
        peg$c354 = "\u200D",
        peg$c355 = { type: "literal", value: "\u200D", description: "\"\\u200D\"" },
        peg$c356 = "true",
        peg$c357 = { type: "literal", value: "true", description: "\"true\"" },
        peg$c358 = "false",
        peg$c359 = { type: "literal", value: "false", description: "\"false\"" },
        peg$c360 = "new",
        peg$c361 = { type: "literal", value: "new", description: "\"new\"" },
        peg$c362 = "this",
        peg$c363 = { type: "literal", value: "this", description: "\"this\"" },
        peg$c364 = "null",
        peg$c365 = { type: "literal", value: "null", description: "\"null\"" },
        peg$c366 = function() { return null },
        peg$c367 = "undefined",
        peg$c368 = { type: "literal", value: "undefined", description: "\"undefined\"" },
        peg$c369 = function() { return undefined },
        peg$c370 = "and",
        peg$c371 = { type: "literal", value: "and", description: "\"and\"" },
        peg$c372 = function() { return "&&" },
        peg$c373 = "or",
        peg$c374 = { type: "literal", value: "or", description: "\"or\"" },
        peg$c375 = function() { return "||" },
        peg$c376 = "is",
        peg$c377 = { type: "literal", value: "is", description: "\"is\"" },
        peg$c378 = function() { return "===" },
        peg$c379 = "isnt",
        peg$c380 = { type: "literal", value: "isnt", description: "\"isnt\"" },
        peg$c381 = function() { return "!==" },
        peg$c382 = "not",
        peg$c383 = { type: "literal", value: "not", description: "\"not\"" },
        peg$c384 = function() { return "!" },
        peg$c385 = "typeof",
        peg$c386 = { type: "literal", value: "typeof", description: "\"typeof\"" },
        peg$c387 = function() { return "typeof"},
        peg$c388 = "void",
        peg$c389 = { type: "literal", value: "void", description: "\"void\"" },
        peg$c390 = function() { return "void"},
        peg$c391 = "delete",
        peg$c392 = { type: "literal", value: "delete", description: "\"delete\"" },
        peg$c393 = function() { return "delete"},
        peg$c394 = "var",
        peg$c395 = { type: "literal", value: "var", description: "\"var\"" },
        peg$c396 = "const",
        peg$c397 = { type: "literal", value: "const", description: "\"const\"" },
        peg$c398 = function() { return "const" },
        peg$c399 = "let",
        peg$c400 = { type: "literal", value: "let", description: "\"let\"" },
        peg$c401 = function() { return "let" },
        peg$c402 = "in",
        peg$c403 = { type: "literal", value: "in", description: "\"in\"" },
        peg$c404 = function() { return "in" },
        peg$c405 = "instanceof",
        peg$c406 = { type: "literal", value: "instanceof", description: "\"instanceof\"" },
        peg$c407 = function() { return "instanceof" },
        peg$c408 = "while",
        peg$c409 = { type: "literal", value: "while", description: "\"while\"" },
        peg$c410 = "for",
        peg$c411 = { type: "literal", value: "for", description: "\"for\"" },
        peg$c412 = "of",
        peg$c413 = { type: "literal", value: "of", description: "\"of\"" },
        peg$c414 = "if",
        peg$c415 = { type: "literal", value: "if", description: "\"if\"" },
        peg$c416 = "else",
        peg$c417 = { type: "literal", value: "else", description: "\"else\"" },
        peg$c418 = "return",
        peg$c419 = { type: "literal", value: "return", description: "\"return\"" },
        peg$c420 = "try",
        peg$c421 = { type: "literal", value: "try", description: "\"try\"" },
        peg$c422 = "catch",
        peg$c423 = { type: "literal", value: "catch", description: "\"catch\"" },
        peg$c424 = "finally",
        peg$c425 = { type: "literal", value: "finally", description: "\"finally\"" },
        peg$c426 = "throw",
        peg$c427 = { type: "literal", value: "throw", description: "\"throw\"" },
        peg$c428 = "break",
        peg$c429 = { type: "literal", value: "break", description: "\"break\"" },
        peg$c430 = "continue",
        peg$c431 = { type: "literal", value: "continue", description: "\"continue\"" },
        peg$c432 = "do",
        peg$c433 = { type: "literal", value: "do", description: "\"do\"" },
        peg$c434 = "import",
        peg$c435 = { type: "literal", value: "import", description: "\"import\"" },
        peg$c436 = "export",
        peg$c437 = { type: "literal", value: "export", description: "\"export\"" },
        peg$c438 = "class",
        peg$c439 = { type: "literal", value: "class", description: "\"class\"" },
        peg$c440 = "extends",
        peg$c441 = { type: "literal", value: "extends", description: "\"extends\"" },
        peg$c442 = "assert",
        peg$c443 = { type: "literal", value: "assert", description: "\"assert\"" },
        peg$c444 = "template",
        peg$c445 = { type: "literal", value: "template", description: "\"template\"" },
        peg$c446 = "activate",
        peg$c447 = { type: "literal", value: "activate", description: "\"activate\"" },
        peg$c448 = { type: "other", description: "INDENT" },
        peg$c449 = "{{{{",
        peg$c450 = { type: "literal", value: "{{{{", description: "\"{{{{\"" },
        peg$c451 = { type: "other", description: "OUTDENT" },
        peg$c452 = "}}}}",
        peg$c453 = { type: "literal", value: "}}}}", description: "\"}}}}\"" },
        peg$c454 = { type: "other", description: "space" },
        peg$c455 = " ",
        peg$c456 = { type: "literal", value: " ", description: "\" \"" },
        peg$c457 = "#",
        peg$c458 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c459 = "\n",
        peg$c460 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c461 = { type: "other", description: "end of line" },
        peg$c462 = "\r",
        peg$c463 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c464 = { type: "other", description: "end of file" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$cache = {},
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parseProgram() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 0,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseProgramStatements();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c1(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseProgramStatements() {
      var s0, s1;

      var key    = peg$currPos * 177 + 1,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseBlockStatement();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = [];
        s1 = peg$parseStatement();
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parseStatement();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseStatement() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 2,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAssertStatement();
          if (s3 === peg$FAILED) {
            s3 = peg$parseExportStatement();
            if (s3 === peg$FAILED) {
              s3 = peg$parseVariableDeclaration();
              if (s3 === peg$FAILED) {
                s3 = peg$parsePropertyDeclaration();
                if (s3 === peg$FAILED) {
                  s3 = peg$parseAddPropertyDeclaration();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parseIterationStatement();
                    if (s3 === peg$FAILED) {
                      s3 = peg$parseIfStatement();
                      if (s3 === peg$FAILED) {
                        s3 = peg$parseReturnStatement();
                        if (s3 === peg$FAILED) {
                          s3 = peg$parseBreakStatement();
                          if (s3 === peg$FAILED) {
                            s3 = peg$parseContinueStatement();
                            if (s3 === peg$FAILED) {
                              s3 = peg$parseThrowStatement();
                              if (s3 === peg$FAILED) {
                                s3 = peg$parseTryStatement();
                                if (s3 === peg$FAILED) {
                                  s3 = peg$parseActivateStatement();
                                  if (s3 === peg$FAILED) {
                                    s3 = peg$parseExpressionStatement();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeol();
            if (s4 === peg$FAILED) {
              s4 = peg$currPos;
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c5;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c6); }
                }
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c7(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseExportStatement() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 3,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexport();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseVariableDeclaration();
            if (s4 === peg$FAILED) {
              s4 = peg$parseRightHandSideExpression();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c8(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseReturnStatement() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 4,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsereturn();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseRightHandSideExpression();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c9(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseThrowStatement() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 5,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsethrow();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseRightHandSideExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c10(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBreakStatement() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 6,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsebreak();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c11(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseContinueStatement() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 7,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecontinue();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c12(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseAssertStatement() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 8,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseassert();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parseExpression();
            if (s5 !== peg$FAILED) {
              peg$reportedPos = s4;
              s5 = peg$c13(s5);
            }
            s4 = s5;
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c14(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseExpressionStatement() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 9,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseExpression();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c15(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseActivateStatement() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 10,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseactivate();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parsetemplate();
            peg$silentFails--;
            if (s5 !== peg$FAILED) {
              peg$currPos = s4;
              s4 = peg$c16;
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseFunctionExpression();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestart();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c17(s1, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseIfStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      var key    = peg$currPos * 177 + 11,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseif();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseAssignmentExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseBlockStatement();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseeol();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseelse();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseIfStatement();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parseBlockStatement();
                        }
                        if (s11 !== peg$FAILED) {
                          peg$reportedPos = s6;
                          s7 = peg$c18(s11);
                          s6 = s7;
                        } else {
                          peg$currPos = s6;
                          s6 = peg$c0;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$c0;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$c0;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$c0;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$c0;
                }
                if (s6 === peg$FAILED) {
                  s6 = peg$c4;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c19(s1, s4, s5, s6, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseTryStatement() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 12,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetry();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseBlockStatement();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecatchClause();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsefinallyClause();
              if (s5 === peg$FAILED) {
                s5 = peg$c4;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestart();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c20(s1, s3, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsetry();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseBlockStatement();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsefinallyClause();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c21(s1, s3, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsefinallyClause() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 13,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefinally();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseBlockStatement();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c7(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecatchClause() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      var key    = peg$currPos * 177 + 14,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeol();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecatch();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseIdentifier();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseBlockStatement();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsestart();
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c22(s1, s6, s7, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseIterationStatement() {
      var s0;

      var key    = peg$currPos * 177 + 15,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseWhileStatement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseForInOfStatement();
        if (s0 === peg$FAILED) {
          s0 = peg$parseForStatement();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseWhileStatement() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 16,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhile();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseAssignmentExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseBlockStatement();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestart();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c23(s1, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseForInOfHead() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

      var key    = peg$currPos * 177 + 17,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsefor();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseVariableDeclarationKindOptional();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parsein();
              if (s6 !== peg$FAILED) {
                peg$reportedPos = s5;
                s6 = peg$c24();
              }
              s5 = s6;
              if (s5 === peg$FAILED) {
                s5 = peg$currPos;
                s6 = peg$parseof();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s5;
                  s6 = peg$c25();
                }
                s5 = s6;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseAssignmentExpression();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;
                      s10 = peg$parseif();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse_();
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parseAssignmentExpression();
                          if (s12 !== peg$FAILED) {
                            peg$reportedPos = s9;
                            s10 = peg$c26(s12);
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$c0;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$c0;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$c0;
                      }
                      if (s9 === peg$FAILED) {
                        s9 = peg$c4;
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parseForInOfHead();
                          if (s11 === peg$FAILED) {
                            s11 = peg$c4;
                          }
                          if (s11 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c27(s3, s5, s7, s9, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseForInOfElseStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 18,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseelse();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseBlockStatement();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c28(s3, s6, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseForInOfStatement() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 19,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseForInOfHead();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseBlockStatement();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseForInOfElseStatement();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c29(s1, s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseForStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;

      var key    = peg$currPos * 177 + 20,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsefor();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseVariableDeclaration();
            if (s4 === peg$FAILED) {
              s4 = peg$parseAssignmentExpression();
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 59) {
                  s6 = peg$c30;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c31); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseAssignmentExpression();
                    if (s8 === peg$FAILED) {
                      s8 = peg$c4;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 59) {
                          s10 = peg$c30;
                          peg$currPos++;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c31); }
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parse_();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parseAssignmentExpression();
                            if (s12 === peg$FAILED) {
                              s12 = peg$c4;
                            }
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parseBlockStatement();
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parsestart();
                                if (s14 !== peg$FAILED) {
                                  peg$reportedPos = s0;
                                  s1 = peg$c32(s1, s4, s8, s12, s13, s14);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$c0;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$c0;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$c0;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseArrayComprehension() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 21,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c33;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseAssignmentExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseForInOfHead();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s8 = peg$c35;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c36); }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsestart();
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c37(s1, s4, s6, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBlockStatement() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 22,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseindent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeol();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseStatement();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseStatement();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseoutdent();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c38(s3, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseClassExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      var key    = peg$currPos * 177 + 23,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseclass();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseclassName();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseclassExtends();
                if (s6 === peg$FAILED) {
                  s6 = peg$c4;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseBlockStatement();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c4;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsestart();
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c39(s1, s4, s6, s7, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseclassName() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 24,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseIdentifier();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c40(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c33;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseAssignmentExpression();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s5 = peg$c35;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c41(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseclassExtends() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 25,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseextends();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseelementList();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c42(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsepath() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 26,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseIdentifier();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c43;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c44); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseIdentifier();
          if (s5 !== peg$FAILED) {
            peg$reportedPos = s3;
            s4 = peg$c18(s5);
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
              s4 = peg$c43;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c44); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseIdentifier();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c18(s5);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsepropertyLeft() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 27,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsepath();
      if (s1 === peg$FAILED) {
        s1 = peg$parseIdentifierName();
        if (s1 === peg$FAILED) {
          s1 = peg$parseStringOrNumberLiteral();
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c46(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c33;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseAssignmentExpression();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s5 = peg$c35;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c47(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseAddPropertyDeclaration() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      var key    = peg$currPos * 177 + 28,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c48;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsePropertyDeclaration();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s6 = peg$c50;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c51); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseBlockStatement();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c4;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsestart();
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c52(s1, s4, s7, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsePropertyDeclaration() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 29,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepropertyLeft();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c53;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c54); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseRightHandSideExpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c55(s1, s2, s6, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseVariableDeclaration() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 30,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsevariableKind();
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = peg$c16;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseVariableDeclarationKindOptional();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c7(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseVariableDeclarationKindOptional() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 31,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevariableKind();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsevariableDeclaratorList();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c56(s1, s2, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevariableKind() {
      var s0;

      var key    = peg$currPos * 177 + 32,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parselet();
      if (s0 === peg$FAILED) {
        s0 = peg$parseconst();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevariableDeclaratorList() {
      var s0;

      var key    = peg$currPos * 177 + 33,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsemultilineVariableDeclaratorList();
      if (s0 === peg$FAILED) {
        s0 = peg$parseinlineVariableDeclaratorList();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseinlineVariableDeclaratorList() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 34,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseVariableDeclarator();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseVariableDeclarator();
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c18(s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c5;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseVariableDeclarator();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s3;
                  s4 = peg$c18(s7);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineVariableDeclaratorList() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 35,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseindent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeol();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseVariableDeclarator();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseeol();
              if (s7 === peg$FAILED) {
                s7 = peg$c4;
              }
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s4;
                s5 = peg$c7(s6);
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseVariableDeclarator();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeol();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c4;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s4;
                    s5 = peg$c7(s6);
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseoutdent();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c57(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseVariableDeclarator() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 36,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseIdentifier();
        peg$silentFails--;
        if (s3 !== peg$FAILED) {
          peg$currPos = s2;
          s2 = peg$c16;
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseFunctionExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestart();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c58(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsePattern();
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsevariableInitializer();
              if (s4 === peg$FAILED) {
                s4 = peg$c4;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c59(s1, s2, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevariableInitializer() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 37,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c60;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseRightHandSideExpression();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c7(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsePattern() {
      var s0;

      var key    = peg$currPos * 177 + 38,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseIdentifier();
      if (s0 === peg$FAILED) {
        s0 = peg$parseObjectPattern();
        if (s0 === peg$FAILED) {
          s0 = peg$parseArrayPattern();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseObjectPattern() {
      var s0, s1;

      var key    = peg$currPos * 177 + 39,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseObjectLiteral();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c62(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseArrayPattern() {
      var s0, s1;

      var key    = peg$currPos * 177 + 40,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseArrayLiteral();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c63(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseSpreadPattern() {
      var s0;

      var key    = peg$currPos * 177 + 41,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseSpreadIdentifier();
      if (s0 === peg$FAILED) {
        s0 = peg$parsePattern();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsespread() {
      var s0;

      var key    = peg$currPos * 177 + 42,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (input.substr(peg$currPos, 3) === peg$c64) {
        s0 = peg$c64;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseSpreadExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 43,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespread();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseAssignmentExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c66(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseAssignmentExpression();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseSpreadIdentifier() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 44,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespread();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseIdentifier();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c66(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseIdentifier();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseRightHandSideExpression() {
      var s0;

      var key    = peg$currPos * 177 + 45,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseImpliedObjectExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseExpression();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseExpression() {
      var s0;

      var key    = peg$currPos * 177 + 46,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseMultilineExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseAssignmentExpression();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMultilineExpression() {
      var s0;

      var key    = peg$currPos * 177 + 47,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseClassExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseMultilineStringTemplate();
        if (s0 === peg$FAILED) {
          s0 = peg$parseMultilineStringLiteral();
          if (s0 === peg$FAILED) {
            s0 = peg$parseTypedObjectExpression();
            if (s0 === peg$FAILED) {
              s0 = peg$parseMultilineCallExpression();
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineCallArguments() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 48,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = [];
      s1 = peg$currPos;
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseExpression();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseeol();
          if (s4 !== peg$FAILED) {
            peg$reportedPos = s1;
            s2 = peg$c67(s3);
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$currPos;
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseExpression();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseeol();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s1;
                s2 = peg$c67(s3);
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$c0;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        }
      } else {
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsePropertyDeclaration();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseeol();
              if (s6 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c68(s5);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsePropertyDeclaration();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseeol();
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s3;
                    s4 = peg$c68(s5);
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            }
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsestart();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c69(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMultilineCallExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      var key    = peg$currPos * 177 + 49,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseAssignmentExpression();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c48;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c49); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseindent();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeol();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemultilineCallArguments();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseoutdent();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseeol();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s11 = peg$c50;
                            peg$currPos++;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c51); }
                          }
                          if (s11 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c70(s1, s2, s6, s7);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseAssignmentExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 50,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseConditionalOrDefaultExpression();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c60;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c61); }
            }
            if (s4 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c71) {
                s4 = peg$c71;
                peg$currPos += 2;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c72); }
              }
              if (s4 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c73) {
                  s4 = peg$c73;
                  peg$currPos += 2;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c74); }
                }
                if (s4 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c75) {
                    s4 = peg$c75;
                    peg$currPos += 2;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c76); }
                  }
                  if (s4 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c77) {
                      s4 = peg$c77;
                      peg$currPos += 2;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c78); }
                    }
                    if (s4 === peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c79) {
                        s4 = peg$c79;
                        peg$currPos += 2;
                      } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c80); }
                      }
                      if (s4 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c81) {
                          s4 = peg$c81;
                          peg$currPos += 3;
                        } else {
                          s4 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c82); }
                        }
                        if (s4 === peg$FAILED) {
                          if (input.substr(peg$currPos, 3) === peg$c83) {
                            s4 = peg$c83;
                            peg$currPos += 3;
                          } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c84); }
                          }
                          if (s4 === peg$FAILED) {
                            if (input.substr(peg$currPos, 4) === peg$c85) {
                              s4 = peg$c85;
                              peg$currPos += 4;
                            } else {
                              s4 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c86); }
                            }
                            if (s4 === peg$FAILED) {
                              if (input.substr(peg$currPos, 2) === peg$c77) {
                                s4 = peg$c77;
                                peg$currPos += 2;
                              } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c78); }
                              }
                              if (s4 === peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c87) {
                                  s4 = peg$c87;
                                  peg$currPos += 2;
                                } else {
                                  s4 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c88); }
                                }
                                if (s4 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 2) === peg$c89) {
                                    s4 = peg$c89;
                                    peg$currPos += 2;
                                  } else {
                                    s4 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c90); }
                                  }
                                  if (s4 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 3) === peg$c91) {
                                      s4 = peg$c91;
                                      peg$currPos += 3;
                                    } else {
                                      s4 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c92); }
                                    }
                                    if (s4 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 2) === peg$c93) {
                                        s4 = peg$c93;
                                        peg$currPos += 2;
                                      } else {
                                        s4 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c94); }
                                      }
                                      if (s4 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 2) === peg$c95) {
                                          s4 = peg$c95;
                                          peg$currPos += 2;
                                        } else {
                                          s4 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c96); }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseRightHandSideExpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c97(s1, s2, s4, s6, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseConditionalOrDefaultExpression();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseConditionalOrDefaultExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      var key    = peg$currPos * 177 + 51,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseLogicalOrExpression();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 63) {
              s4 = peg$c98;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c99); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseConditionalOrDefaultExpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s8 = peg$c53;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c54); }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseConditionalOrDefaultExpression();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsestart();
                          if (s11 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c100(s1, s2, s6, s10, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseLogicalOrExpression();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c101) {
                s6 = peg$c101;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c102); }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 63) {
                  s6 = peg$c98;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c99); }
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseLogicalOrExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c101) {
                  s6 = peg$c101;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c102); }
                }
                if (s6 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 63) {
                    s6 = peg$c98;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c99); }
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseLogicalOrExpression();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsestart();
                      if (s9 !== peg$FAILED) {
                        s5 = [s5, s6, s7, s8, s9];
                        s4 = s5;
                      } else {
                        peg$currPos = s4;
                        s4 = peg$c0;
                      }
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c103(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseLogicalOrExpression();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseLogicalOrExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 52,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseLogicalAndExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseor();
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseLogicalAndExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseor();
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseLogicalAndExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseLogicalAndExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 53,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBitwiseOrExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseand();
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseBitwiseOrExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseand();
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseBitwiseOrExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBitwiseOrExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 54,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBitwiseXorExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 124) {
              s6 = peg$c104;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c105); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseBitwiseXorExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s6 = peg$c104;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c105); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseBitwiseXorExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBitwiseXorExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 55,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBitwiseAndExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 94) {
              s6 = peg$c106;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c107); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseBitwiseAndExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 94) {
                s6 = peg$c106;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c107); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseBitwiseAndExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBitwiseAndExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 56,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseEqualityExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 38) {
              s6 = peg$c108;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c109); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseEqualityExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 38) {
                s6 = peg$c108;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c109); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseEqualityExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseEqualityExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 57,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseRelationalExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseis();
            if (s6 === peg$FAILED) {
              s6 = peg$parseisnt();
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseRelationalExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseis();
              if (s6 === peg$FAILED) {
                s6 = peg$parseisnt();
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseRelationalExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseRelationalExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 58,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBitwiseShiftExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c110) {
              s6 = peg$c110;
              peg$currPos += 2;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c111); }
            }
            if (s6 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c112) {
                s6 = peg$c112;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c113); }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 60) {
                  s6 = peg$c114;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c115); }
                }
                if (s6 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 62) {
                    s6 = peg$c116;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c117); }
                  }
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsein();
                    if (s6 === peg$FAILED) {
                      s6 = peg$parseinstanceof();
                    }
                  }
                }
              }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseBitwiseShiftExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c110) {
                s6 = peg$c110;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c111); }
              }
              if (s6 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c112) {
                  s6 = peg$c112;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c113); }
                }
                if (s6 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 60) {
                    s6 = peg$c114;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c115); }
                  }
                  if (s6 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 62) {
                      s6 = peg$c116;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c117); }
                    }
                    if (s6 === peg$FAILED) {
                      s6 = peg$parsein();
                      if (s6 === peg$FAILED) {
                        s6 = peg$parseinstanceof();
                      }
                    }
                  }
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseBitwiseShiftExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseBitwiseShiftExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 59,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseAdditiveExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c118) {
              s6 = peg$c118;
              peg$currPos += 3;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c119); }
            }
            if (s6 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c120) {
                s6 = peg$c120;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c121); }
              }
              if (s6 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c122) {
                  s6 = peg$c122;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c123); }
                }
              }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseAdditiveExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c118) {
                s6 = peg$c118;
                peg$currPos += 3;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c119); }
              }
              if (s6 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c120) {
                  s6 = peg$c120;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c121); }
                }
                if (s6 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c122) {
                    s6 = peg$c122;
                    peg$currPos += 2;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c123); }
                  }
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseAdditiveExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseAdditiveExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 60,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseMultiplicativeExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 43) {
              s6 = peg$c124;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c125); }
            }
            if (s6 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s6 = peg$c126;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c127); }
              }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseMultiplicativeExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 43) {
                s6 = peg$c124;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c125); }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                  s6 = peg$c126;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c127); }
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseMultiplicativeExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMultiplicativeExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 177 + 61,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseUnaryExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
              s6 = peg$c128;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c129); }
            }
            if (s6 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 47) {
                s6 = peg$c130;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c131); }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 37) {
                  s6 = peg$c132;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c133); }
                }
              }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseUnaryExpression();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsestart();
                  if (s9 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8, s9];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 42) {
                s6 = peg$c128;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c129); }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 47) {
                  s6 = peg$c130;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c131); }
                }
                if (s6 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 37) {
                    s6 = peg$c132;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c133); }
                  }
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseUnaryExpression();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsestart();
                    if (s9 !== peg$FAILED) {
                      s5 = [s5, s6, s7, s8, s9];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c103(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseUnaryExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 62,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseunaryOperator();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseUpdateExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c134(s1, s2, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseUpdateExpression();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunaryOperator() {
      var s0, s1;

      var key    = peg$currPos * 177 + 63,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$parsenot();
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 45) {
          s0 = peg$c126;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c127); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 43) {
            s0 = peg$c124;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c125); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 126) {
              s0 = peg$c136;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c137); }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parsetypeof();
              if (s0 === peg$FAILED) {
                s0 = peg$parsevoid();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsedelete();
                }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c135); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseUpdateExpression() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 64,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c138) {
          s2 = peg$c138;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c139); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c140) {
            s2 = peg$c140;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c141); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseCallExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestart();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c142(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseCallExpression();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c138) {
                s4 = peg$c138;
                peg$currPos += 2;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c139); }
              }
              if (s4 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c140) {
                  s4 = peg$c140;
                  peg$currPos += 2;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c141); }
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c143(s1, s3, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsestart();
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseCallExpression();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 63) {
                  s4 = peg$c98;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c99); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$currPos;
                  peg$silentFails++;
                  if (input.charCodeAt(peg$currPos) === 46) {
                    s6 = peg$c43;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c44); }
                  }
                  peg$silentFails--;
                  if (s6 === peg$FAILED) {
                    s5 = peg$c16;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsestart();
                    if (s6 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c144(s1, s3, s4, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseCallExpression();
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseCallExpression() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 65,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseMemberExpression();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsetailCall();
          if (s4 === peg$FAILED) {
            s4 = peg$parsetailMember();
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsetailCall();
            if (s4 === peg$FAILED) {
              s4 = peg$parsetailMember();
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c145(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetailCall() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 66,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 63) {
          s3 = peg$c98;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c99); }
        }
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s2;
          s3 = peg$c146();
        }
        s2 = s3;
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsearguments();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestart();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c147(s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetailMember() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      var key    = peg$currPos * 177 + 67,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 63) {
          s3 = peg$c98;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c99); }
        }
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s2;
          s3 = peg$c146();
        }
        s2 = s3;
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 91) {
            s3 = peg$c33;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c34); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseAssignmentExpression();
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s7 = peg$c35;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c36); }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsestart();
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c148(s2, s5, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 63) {
            s3 = peg$c98;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c99); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s2;
            s3 = peg$c146();
          }
          s2 = s3;
          if (s2 === peg$FAILED) {
            s2 = peg$c4;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c43;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c44); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseIdentifierName();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsestart();
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c149(s2, s5, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsearguments() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 68,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c48;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseargumentList();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s3 = peg$c50;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c51); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c150(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseargumentList() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 69,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseAssignmentExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseAssignmentExpression();
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c151(s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c5;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseAssignmentExpression();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s3;
                  s4 = peg$c151(s7);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c152(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMemberExpression() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 70,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseDoExpression();
        if (s2 === peg$FAILED) {
          s2 = peg$parseImportExpression();
          if (s2 === peg$FAILED) {
            s2 = peg$parseFunctionExpression();
            if (s2 === peg$FAILED) {
              s2 = peg$parseNewExpression();
              if (s2 === peg$FAILED) {
                s2 = peg$parsePrimaryExpression();
              }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsetailMember();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsetailMember();
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c145(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseNewExpression() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 71,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenew();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseMemberExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsearguments();
              if (s5 === peg$FAILED) {
                s5 = peg$c4;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsestart();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c153(s1, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseImportExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 72,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseimport();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseGroupExpression();
            if (s4 === peg$FAILED) {
              s4 = peg$parseAssignmentExpression();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c154(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseDoExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 73,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedo();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseExpression();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c155(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseFunctionExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      var key    = peg$currPos * 177 + 74,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetemplate();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseIdentifier();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseformalParameterList();
                if (s6 === peg$FAILED) {
                  s6 = peg$c4;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c156) {
                      s9 = peg$c156;
                      peg$currPos += 2;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c157); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$reportedPos = s8;
                      s9 = peg$c158();
                    }
                    s8 = s9;
                    if (s8 === peg$FAILED) {
                      s8 = peg$currPos;
                      if (input.substr(peg$currPos, 2) === peg$c159) {
                        s9 = peg$c159;
                        peg$currPos += 2;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c160); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s8;
                        s9 = peg$c161();
                      }
                      s8 = s9;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseAssignmentExpression();
                        if (s10 === peg$FAILED) {
                          s10 = peg$parseThrowStatement();
                          if (s10 === peg$FAILED) {
                            s10 = peg$parseBlockStatement();
                          }
                        }
                        if (s10 === peg$FAILED) {
                          s10 = peg$c4;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsestart();
                          if (s11 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c162(s1, s2, s4, s6, s8, s10, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseformalParameterList() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 75,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c48;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseformalParameters();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c50;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c51); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c163(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseformalParameters() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 76,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseformalParameter();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseformalParameter();
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c7(s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c5;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseformalParameter();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s3;
                  s4 = peg$c7(s7);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseformalParameter() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 77,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseSpreadPattern();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseformalParameterInitializer();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c164(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseformalParameterInitializer() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 78,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c60;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAssignmentExpression();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c7(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsePrimaryExpression() {
      var s0, s1;

      var key    = peg$currPos * 177 + 79,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$parseThisExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseIdentifier();
        if (s0 === peg$FAILED) {
          s0 = peg$parseLiteral();
          if (s0 === peg$FAILED) {
            s0 = peg$parseArrayLiteral();
            if (s0 === peg$FAILED) {
              s0 = peg$parseArrayComprehension();
              if (s0 === peg$FAILED) {
                s0 = peg$parseObjectLiteral();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseGroupExpression();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseJavascriptExpression();
                  }
                }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c165); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseJavascriptExpression() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 80,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 96) {
          s2 = peg$c166;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c167); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 96) {
            s6 = peg$c166;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c167); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c16;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c168); }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 96) {
                s6 = peg$c166;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c167); }
              }
              peg$silentFails--;
              if (s6 === peg$FAILED) {
                s5 = peg$c16;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c168); }
                }
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 96) {
              s4 = peg$c166;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c167); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c169(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseArrayLiteral() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 81,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c33;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseelementList();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s6 = peg$c35;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c170(s1, s4, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseelementList() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 82,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseAssignmentExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseAssignmentExpression();
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c171(s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c5;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseAssignmentExpression();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s3;
                  s4 = peg$c171(s7);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseObjectLiteral() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 83,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c172;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c173); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsepropertyAssignmentList();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c174;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c175); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsestart();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c176(s1, s4, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsepropertyAssignmentList() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 84,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsepropertyAssignment();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c5;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsepropertyAssignment();
              if (s7 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c171(s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c5;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsepropertyAssignment();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s3;
                  s4 = peg$c171(s7);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsepropertyAssignment() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 85,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsePropertyDeclaration();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseIdentifierName();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsestart();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c177(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseTypedObjectExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 86,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c48;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAssignmentExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseBlockStatement();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c178(s1, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseImpliedObjectExpression() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 87,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseBlockStatement();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c179(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseGroupExpression() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 88,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c48;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAssignmentExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c50;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c51); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c181(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c180); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseIdentifier() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 89,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsereserved();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c16;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIdentifierName();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c182(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseIdentifierName() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 90,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseidentifierName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestart();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c183(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseThisExpression() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 91,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c185) {
          s2 = peg$c185;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c186); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdentifierName();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestart();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c187(s1, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 64) {
            s2 = peg$c188;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c189); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseIdentifierName();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsestart();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c190(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsestart();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c185) {
              s2 = peg$c185;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c186); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsestart();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c191(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsestart();
            if (s1 !== peg$FAILED) {
              s2 = peg$parsethis();
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 64) {
                  s2 = peg$c188;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c189); }
                }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parsestart();
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c192(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c184); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseStringOrNumberLiteral() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 92,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsesimpleString();
      if (s2 === peg$FAILED) {
        s2 = peg$parsenumber();
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = peg$c16;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseLiteral();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c182(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseLiteral() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 93,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$parseStringTemplate();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsestart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 === peg$FAILED) {
            s2 = peg$parsesimpleString();
            if (s2 === peg$FAILED) {
              s2 = peg$parseboolean();
              if (s2 === peg$FAILED) {
                s2 = peg$parseregex();
                if (s2 === peg$FAILED) {
                  s2 = peg$parsenull();
                }
              }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsestart();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c194(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsestart();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseundefined();
            if (s2 !== peg$FAILED) {
              s3 = peg$parsestart();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c195(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c193); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestart() {
      var s0, s1;

      var key    = peg$currPos * 177 + 94,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      peg$reportedPos = peg$currPos;
      s1 = peg$c146();
      if (s1) {
        s1 = peg$c16;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c196();
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1;

      var key    = peg$currPos * 177 + 95,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      peg$reportedPos = peg$currPos;
      s1 = peg$c146();
      if (s1) {
        s1 = peg$c16;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c197();
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseboolean() {
      var s0;

      var key    = peg$currPos * 177 + 96,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsetrue();
      if (s0 === peg$FAILED) {
        s0 = peg$parsefalse();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseregex() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 97,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c130;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c131); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseregexBody();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s3 = peg$c130;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c131); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseregexOptions();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c198(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseregexBody() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 98,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s3 = peg$c199;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c200); }
      }
      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c168); }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 === peg$FAILED) {
        if (peg$c201.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c202); }
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 92) {
          s3 = peg$c199;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c200); }
        }
        if (s3 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c168); }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          if (peg$c201.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c202); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseregexOptions() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 99,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      if (peg$c203.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c204); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c203.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c204); }
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsesimpleString() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      var key    = peg$currPos * 177 + 100,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c205;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c206); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 92) {
          s4 = peg$c199;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c200); }
        }
        if (s4 !== peg$FAILED) {
          if (peg$c207.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c208); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 117) {
              s6 = peg$c209;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c210); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsehexDigit();
              if (s7 !== peg$FAILED) {
                s8 = peg$parsehexDigit();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsehexDigit();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parsehexDigit();
                    if (s10 !== peg$FAILED) {
                      s6 = [s6, s7, s8, s9, s10];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$c0;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 === peg$FAILED) {
          if (peg$c211.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c212); }
          }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s4 = peg$c199;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c200); }
          }
          if (s4 !== peg$FAILED) {
            if (peg$c207.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c208); }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 117) {
                s6 = peg$c209;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c210); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsehexDigit();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsehexDigit();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsehexDigit();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsehexDigit();
                      if (s10 !== peg$FAILED) {
                        s6 = [s6, s7, s8, s9, s10];
                        s5 = s6;
                      } else {
                        peg$currPos = s5;
                        s5 = peg$c0;
                      }
                    } else {
                      peg$currPos = s5;
                      s5 = peg$c0;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            if (peg$c211.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c212); }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c205;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c206); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c213(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s1 = peg$c214;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c215); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s4 = peg$c199;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c200); }
          }
          if (s4 !== peg$FAILED) {
            if (peg$c216.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c217); }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 117) {
                s6 = peg$c209;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c210); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsehexDigit();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsehexDigit();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsehexDigit();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsehexDigit();
                      if (s10 !== peg$FAILED) {
                        s6 = [s6, s7, s8, s9, s10];
                        s5 = s6;
                      } else {
                        peg$currPos = s5;
                        s5 = peg$c0;
                      }
                    } else {
                      peg$currPos = s5;
                      s5 = peg$c0;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            if (peg$c218.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c219); }
            }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 92) {
              s4 = peg$c199;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c200); }
            }
            if (s4 !== peg$FAILED) {
              if (peg$c216.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c217); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 117) {
                  s6 = peg$c209;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c210); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsehexDigit();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsehexDigit();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsehexDigit();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsehexDigit();
                        if (s10 !== peg$FAILED) {
                          s6 = [s6, s7, s8, s9, s10];
                          s5 = s6;
                        } else {
                          peg$currPos = s5;
                          s5 = peg$c0;
                        }
                      } else {
                        peg$currPos = s5;
                        s5 = peg$c0;
                      }
                    } else {
                      peg$currPos = s5;
                      s5 = peg$c0;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
            if (s3 === peg$FAILED) {
              if (peg$c218.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c219); }
              }
            }
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c214;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c215); }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c220(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMultilineStringTemplate() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 101,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c221) {
          s2 = peg$c221;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c222); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeol();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsemultilineStringTemplateContent();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c223(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineStringTemplateContent() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 102,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseindent();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsemultilineStringTemplateLine();
        if (s3 === peg$FAILED) {
          s3 = peg$parsemultilineStringTemplateContent();
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsemultilineStringTemplateLine();
          if (s3 === peg$FAILED) {
            s3 = peg$parsemultilineStringTemplateContent();
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseoutdent();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c224(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineStringTemplateLine() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 103,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseindent();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c16;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseoutdent();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsestringInterpolation();
          if (s3 === peg$FAILED) {
            s3 = peg$parsemultilineStringTemplatePart();
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c7(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineStringTemplatePart() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 104,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c225) {
          s5 = peg$c225;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c226); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c16;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$currPos;
          peg$silentFails++;
          s6 = peg$parseeol();
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c16;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c168); }
            }
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 2) === peg$c225) {
              s5 = peg$c225;
              peg$currPos += 2;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c226); }
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = peg$c16;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              peg$silentFails++;
              s6 = peg$parseeol();
              peg$silentFails--;
              if (s6 === peg$FAILED) {
                s5 = peg$c16;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c168); }
                }
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c227();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseMultilineStringLiteral() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 105,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsestart();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c228) {
          s2 = peg$c228;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c229); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeol();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsemultilineStringLiteralContent();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestart();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c223(s1, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineStringLiteralContent() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 106,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseindent();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsemultilineStringLiteralLine();
        if (s3 === peg$FAILED) {
          s3 = peg$parsemultilineStringLiteralContent();
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsemultilineStringLiteralLine();
          if (s3 === peg$FAILED) {
            s3 = peg$parsemultilineStringLiteralContent();
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseoutdent();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c224(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemultilineStringLiteralLine() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 107,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseindent();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c16;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseoutdent();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeol();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$currPos;
            peg$silentFails++;
            s7 = peg$parseeol();
            peg$silentFails--;
            if (s7 === peg$FAILED) {
              s6 = peg$c16;
            } else {
              peg$currPos = s6;
              s6 = peg$c0;
            }
            if (s6 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c168); }
              }
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$currPos;
                s6 = peg$currPos;
                peg$silentFails++;
                s7 = peg$parseeol();
                peg$silentFails--;
                if (s7 === peg$FAILED) {
                  s6 = peg$c16;
                } else {
                  peg$currPos = s6;
                  s6 = peg$c0;
                }
                if (s6 !== peg$FAILED) {
                  if (input.length > peg$currPos) {
                    s7 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c168); }
                  }
                  if (s7 !== peg$FAILED) {
                    s6 = [s6, s7];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c227();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestringInterpolation() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 108,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c225) {
        s1 = peg$c225;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c226); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAssignmentExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c230) {
                s5 = peg$c230;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c231); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c181(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseStringTemplate() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 109,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c214;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c215); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsestringTemplateChars();
        if (s3 === peg$FAILED) {
          s3 = peg$parsestringInterpolation();
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsestringTemplateChars();
          if (s3 === peg$FAILED) {
            s3 = peg$parsestringInterpolation();
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c214;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c215); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c232(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestringTemplateChars() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 110,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsestringTemplateChar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsestringTemplateChar();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c233();
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestringTemplateChar() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 111,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c199;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c200); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c216.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c217); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 117) {
          s1 = peg$c209;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c210); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsehexDigit();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsehexDigit();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsehexDigit();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsehexDigit();
                if (s5 !== peg$FAILED) {
                  s1 = [s1, s2, s3, s4, s5];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c225) {
          s2 = peg$c225;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c226); }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c16;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (peg$c218.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c219); }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenumber() {
      var s0;

      var key    = peg$currPos * 177 + 112,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsedecimal();
      if (s0 === peg$FAILED) {
        s0 = peg$parsehexInteger();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedecimal() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 113,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (peg$c234.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c235); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsedecimalInteger();
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s5 = peg$c43;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c44); }
          }
          if (s5 !== peg$FAILED) {
            s6 = [];
            s7 = peg$parsedecimalDigit();
            if (s7 !== peg$FAILED) {
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parsedecimalDigit();
              }
            } else {
              s6 = peg$c0;
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 === peg$FAILED) {
            s4 = peg$c4;
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c43;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c44); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedecimalDigit();
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parsedecimalDigit();
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (peg$c236.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c237); }
          }
          if (s4 !== peg$FAILED) {
            if (peg$c234.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c235); }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$c4;
            }
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parsedecimalDigit();
              if (s7 !== peg$FAILED) {
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsedecimalDigit();
                }
              } else {
                s6 = peg$c0;
              }
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseidentifierPart();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = peg$c16;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c238();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 114,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (peg$c234.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c235); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedecimalInteger();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseidentifierPart();
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c16;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c239();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedecimalDigit() {
      var s0;

      var key    = peg$currPos * 177 + 115,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c240.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c241); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenonzeroDigit() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 116,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 48) {
        s2 = peg$c242;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c243); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c16;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedecimalDigit();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedecimalInteger() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 117,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (input.charCodeAt(peg$currPos) === 48) {
        s0 = peg$c242;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c243); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsenonzeroDigit();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsedecimalDigit();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsedecimalDigit();
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsehexInteger() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 118,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c244) {
        s1 = peg$c244;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c245); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsehexDigit();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsehexDigit();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c246();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      var key    = peg$currPos * 177 + 119,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c247.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c248); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseidentifier() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 120,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parsereserved();
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = peg$c16;
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseidentifierName();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c249); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseidentifierName() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 177 + 121,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseidentifierStart();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseidentifierPart();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseidentifierPart();
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c250); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseidentifierStart() {
      var s0;

      var key    = peg$currPos * 177 + 122,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseunicodeLetter();
      if (s0 === peg$FAILED) {
        if (peg$c251.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c252); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseunicodeEscapeSequence();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseidentifierPart() {
      var s0;

      var key    = peg$currPos * 177 + 123,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseidentifierStart();
      if (s0 === peg$FAILED) {
        s0 = peg$parseunicodeCombiningMark();
        if (s0 === peg$FAILED) {
          s0 = peg$parseunicodeDigit();
          if (s0 === peg$FAILED) {
            s0 = peg$parseunicodeConnectorPunctuation();
            if (s0 === peg$FAILED) {
              s0 = peg$parsezwnj();
              if (s0 === peg$FAILED) {
                s0 = peg$parsezwj();
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunicodeEscapeSequence() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 177 + 124,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c253) {
        s1 = peg$c253;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c254); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsehexDigit();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsehexDigit();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsehexDigit();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsehexDigit();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c255(s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunicodeLetter() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 125,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c256.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c257); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 55340) {
          s1 = peg$c258;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c259); }
        }
        if (s1 !== peg$FAILED) {
          if (peg$c260.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c261); }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 55304) {
            s1 = peg$c262;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c263); }
          }
          if (s1 !== peg$FAILED) {
            if (peg$c264.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c265); }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 55401) {
              s1 = peg$c266;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c267); }
            }
            if (s1 !== peg$FAILED) {
              if (peg$c268.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c269); }
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 55305) {
                s1 = peg$c270;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c271); }
              }
              if (s1 !== peg$FAILED) {
                if (peg$c272.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c273); }
                }
                if (s2 !== peg$FAILED) {
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 55349) {
                  s1 = peg$c274;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c275); }
                }
                if (s1 !== peg$FAILED) {
                  if (peg$c276.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c277); }
                  }
                  if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 55300) {
                    s1 = peg$c278;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c279); }
                  }
                  if (s1 !== peg$FAILED) {
                    if (peg$c280.test(input.charAt(peg$currPos))) {
                      s2 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c281); }
                    }
                    if (s2 !== peg$FAILED) {
                      s1 = [s1, s2];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 55296) {
                      s1 = peg$c282;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c283); }
                    }
                    if (s1 !== peg$FAILED) {
                      if (peg$c284.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c285); }
                      }
                      if (s2 !== peg$FAILED) {
                        s1 = [s1, s2];
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 55308) {
                        s1 = peg$c286;
                        peg$currPos++;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c287); }
                      }
                      if (s1 !== peg$FAILED) {
                        if (peg$c288.test(input.charAt(peg$currPos))) {
                          s2 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s2 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c289); }
                        }
                        if (s2 !== peg$FAILED) {
                          s1 = [s1, s2];
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 55297) {
                          s1 = peg$c290;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c291); }
                        }
                        if (s1 !== peg$FAILED) {
                          if (peg$c292.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                          } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c293); }
                          }
                          if (s2 !== peg$FAILED) {
                            s1 = [s1, s2];
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                        if (s0 === peg$FAILED) {
                          s0 = peg$currPos;
                          if (input.charCodeAt(peg$currPos) === 55406) {
                            s1 = peg$c294;
                            peg$currPos++;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c295); }
                          }
                          if (s1 !== peg$FAILED) {
                            if (peg$c296.test(input.charAt(peg$currPos))) {
                              s2 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s2 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c297); }
                            }
                            if (s2 !== peg$FAILED) {
                              s1 = [s1, s2];
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$c0;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                          if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 55299) {
                              s1 = peg$c298;
                              peg$currPos++;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c299); }
                            }
                            if (s1 !== peg$FAILED) {
                              if (peg$c300.test(input.charAt(peg$currPos))) {
                                s2 = input.charAt(peg$currPos);
                                peg$currPos++;
                              } else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c301); }
                              }
                              if (s2 !== peg$FAILED) {
                                s1 = [s1, s2];
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$c0;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$c0;
                            }
                            if (s0 === peg$FAILED) {
                              s0 = peg$currPos;
                              if (input.charCodeAt(peg$currPos) === 55360) {
                                s1 = peg$c302;
                                peg$currPos++;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c303); }
                              }
                              if (s1 !== peg$FAILED) {
                                if (peg$c304.test(input.charAt(peg$currPos))) {
                                  s2 = input.charAt(peg$currPos);
                                  peg$currPos++;
                                } else {
                                  s2 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c305); }
                                }
                                if (s2 !== peg$FAILED) {
                                  s1 = [s1, s2];
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$c0;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$c0;
                              }
                              if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 55422) {
                                  s1 = peg$c306;
                                  peg$currPos++;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c307); }
                                }
                                if (s1 !== peg$FAILED) {
                                  if (peg$c308.test(input.charAt(peg$currPos))) {
                                    s2 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                  } else {
                                    s2 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c309); }
                                  }
                                  if (s2 !== peg$FAILED) {
                                    s1 = [s1, s2];
                                    s0 = s1;
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$c0;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$c0;
                                }
                                if (s0 === peg$FAILED) {
                                  s0 = peg$currPos;
                                  if (input.charCodeAt(peg$currPos) === 55405) {
                                    s1 = peg$c310;
                                    peg$currPos++;
                                  } else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c311); }
                                  }
                                  if (s1 !== peg$FAILED) {
                                    if (peg$c312.test(input.charAt(peg$currPos))) {
                                      s2 = input.charAt(peg$currPos);
                                      peg$currPos++;
                                    } else {
                                      s2 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c313); }
                                    }
                                    if (s2 !== peg$FAILED) {
                                      s1 = [s1, s2];
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$c0;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$c0;
                                  }
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$currPos;
                                    if (input.charCodeAt(peg$currPos) === 55322) {
                                      s1 = peg$c314;
                                      peg$currPos++;
                                    } else {
                                      s1 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c315); }
                                    }
                                    if (s1 !== peg$FAILED) {
                                      if (peg$c316.test(input.charAt(peg$currPos))) {
                                        s2 = input.charAt(peg$currPos);
                                        peg$currPos++;
                                      } else {
                                        s2 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c317); }
                                      }
                                      if (s2 !== peg$FAILED) {
                                        s1 = [s1, s2];
                                        s0 = s1;
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$c0;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$c0;
                                    }
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$currPos;
                                      if (input.charCodeAt(peg$currPos) === 55298) {
                                        s1 = peg$c318;
                                        peg$currPos++;
                                      } else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c319); }
                                      }
                                      if (s1 !== peg$FAILED) {
                                        if (peg$c320.test(input.charAt(peg$currPos))) {
                                          s2 = input.charAt(peg$currPos);
                                          peg$currPos++;
                                        } else {
                                          s2 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c321); }
                                        }
                                        if (s2 !== peg$FAILED) {
                                          s1 = [s1, s2];
                                          s0 = s1;
                                        } else {
                                          peg$currPos = s0;
                                          s0 = peg$c0;
                                        }
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$c0;
                                      }
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 55309) {
                                          s1 = peg$c322;
                                          peg$currPos++;
                                        } else {
                                          s1 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c323); }
                                        }
                                        if (s1 !== peg$FAILED) {
                                          if (peg$c324.test(input.charAt(peg$currPos))) {
                                            s2 = input.charAt(peg$currPos);
                                            peg$currPos++;
                                          } else {
                                            s2 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c325); }
                                          }
                                          if (s2 !== peg$FAILED) {
                                            s1 = [s1, s2];
                                            s0 = s1;
                                          } else {
                                            peg$currPos = s0;
                                            s0 = peg$c0;
                                          }
                                        } else {
                                          peg$currPos = s0;
                                          s0 = peg$c0;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunicodeCombiningMark() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 126,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c326.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c327); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 56128) {
          s1 = peg$c328;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c329); }
        }
        if (s1 !== peg$FAILED) {
          if (peg$c330.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c331); }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 55348) {
            s1 = peg$c332;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c333); }
          }
          if (s1 !== peg$FAILED) {
            if (peg$c334.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c335); }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 55300) {
              s1 = peg$c278;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c279); }
            }
            if (s1 !== peg$FAILED) {
              if (peg$c336.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c337); }
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 55296) {
                s1 = peg$c282;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c283); }
              }
              if (s1 !== peg$FAILED) {
                if (peg$c338.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c339); }
                }
                if (s2 !== peg$FAILED) {
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 55298) {
                  s1 = peg$c318;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c319); }
                }
                if (s1 !== peg$FAILED) {
                  if (peg$c340.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c341); }
                  }
                  if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunicodeDigit() {
      var s0, s1, s2;

      var key    = peg$currPos * 177 + 127,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c342.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c343); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 55349) {
          s1 = peg$c274;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c275); }
        }
        if (s1 !== peg$FAILED) {
          if (peg$c344.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c345); }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 55300) {
            s1 = peg$c278;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c279); }
          }
          if (s1 !== peg$FAILED) {
            if (peg$c346.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c347); }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 55297) {
              s1 = peg$c290;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c291); }
            }
            if (s1 !== peg$FAILED) {
              if (peg$c348.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c349); }
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunicodeConnectorPunctuation() {
      var s0;

      var key    = peg$currPos * 177 + 128,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (peg$c350.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c351); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsezwnj() {
      var s0;

      var key    = peg$currPos * 177 + 129,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (input.charCodeAt(peg$currPos) === 8204) {
        s0 = peg$c352;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c353); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsezwj() {
      var s0;

      var key    = peg$currPos * 177 + 130,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      if (input.charCodeAt(peg$currPos) === 8205) {
        s0 = peg$c354;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c355); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsereserved() {
      var s0;

      var key    = peg$currPos * 177 + 131,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsenull();
      if (s0 === peg$FAILED) {
        s0 = peg$parseundefined();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetypeof();
          if (s0 === peg$FAILED) {
            s0 = peg$parsevoid();
            if (s0 === peg$FAILED) {
              s0 = peg$parsedelete();
              if (s0 === peg$FAILED) {
                s0 = peg$parsenew();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsetrue();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsefalse();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsevar();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseconst();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parselet();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parsewhile();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parsefor();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parsein();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parseof();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parseif();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parseelse();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parsereturn();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parsetry();
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parsecatch();
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parsefinally();
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parsethrow();
                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$parsebreak();
                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$parsecontinue();
                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$parsedo();
                                                      if (s0 === peg$FAILED) {
                                                        s0 = peg$parseimport();
                                                        if (s0 === peg$FAILED) {
                                                          s0 = peg$parseexport();
                                                          if (s0 === peg$FAILED) {
                                                            s0 = peg$parseclass();
                                                            if (s0 === peg$FAILED) {
                                                              s0 = peg$parseextends();
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetrue() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 132,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c356) {
        s1 = peg$c356;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c357); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c161();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsefalse() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 133,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c358) {
        s1 = peg$c358;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c359); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c158();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenew() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 134,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c360) {
        s1 = peg$c360;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c361); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsethis() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 135,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c362) {
        s1 = peg$c362;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c363); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenull() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 136,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c364) {
        s1 = peg$c364;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c365); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c366();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseundefined() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 137,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c367) {
        s1 = peg$c367;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c368); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c369();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseand() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 138,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c370) {
        s1 = peg$c370;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c371); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c372();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseor() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 139,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c373) {
        s1 = peg$c373;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c374); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c375();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseis() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 140,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c376) {
        s1 = peg$c376;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c377); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c378();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseisnt() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 141,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c379) {
        s1 = peg$c379;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c380); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c381();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenot() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 142,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c382) {
        s1 = peg$c382;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c383); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c384();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetypeof() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 143,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c385) {
        s1 = peg$c385;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c386); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c387();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevoid() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 144,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c388) {
        s1 = peg$c388;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c389); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c390();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedelete() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 145,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c391) {
        s1 = peg$c391;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c392); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c393();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevar() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 146,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c394) {
        s1 = peg$c394;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c395); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseconst() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 147,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c396) {
        s1 = peg$c396;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c397); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c398();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parselet() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 148,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c399) {
        s1 = peg$c399;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c400); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c401();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsein() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 149,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c402) {
        s1 = peg$c402;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c403); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c404();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseinstanceof() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 150,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c405) {
        s1 = peg$c405;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c406); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c407();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsewhile() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 151,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c408) {
        s1 = peg$c408;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c409); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsefor() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 152,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c410) {
        s1 = peg$c410;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c411); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseof() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 153,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c412) {
        s1 = peg$c412;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c413); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseif() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 154,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c414) {
        s1 = peg$c414;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c415); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseelse() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 155,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c416) {
        s1 = peg$c416;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c417); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsereturn() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 156,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c418) {
        s1 = peg$c418;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c419); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetry() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 157,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c420) {
        s1 = peg$c420;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c421); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecatch() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 158,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c422) {
        s1 = peg$c422;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c423); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsefinally() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 159,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c424) {
        s1 = peg$c424;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c425); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsethrow() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 160,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c426) {
        s1 = peg$c426;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c427); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsebreak() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 161,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c428) {
        s1 = peg$c428;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c429); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecontinue() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 162,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c430) {
        s1 = peg$c430;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c431); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedo() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 163,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c432) {
        s1 = peg$c432;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c433); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseimport() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 164,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c434) {
        s1 = peg$c434;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c435); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseexport() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 165,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c436) {
        s1 = peg$c436;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c437); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseclass() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 166,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c438) {
        s1 = peg$c438;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c439); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseextends() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 167,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c440) {
        s1 = peg$c440;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c441); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseassert() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 168,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c442) {
        s1 = peg$c442;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c443); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetemplate() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 169,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c444) {
        s1 = peg$c444;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c445); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseactivate() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 170,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c446) {
        s1 = peg$c446;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c447); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseidentifierPart();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c16;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseindent() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 171,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c449) {
            s3 = peg$c449;
            peg$currPos += 4;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c450); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c448); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseoutdent() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 177 + 172,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseeol();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c452) {
            s3 = peg$c452;
            peg$currPos += 4;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c453); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c451); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      var key    = peg$currPos * 177 + 173,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c455;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c456); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (input.charCodeAt(peg$currPos) === 32) {
          s1 = peg$c455;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c456); }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c454); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 177 + 174,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 35) {
          s2 = peg$c457;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c458); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 10) {
            s6 = peg$c459;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c460); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c16;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c168); }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 10) {
                s6 = peg$c459;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c460); }
              }
              peg$silentFails--;
              if (s6 === peg$FAILED) {
                s5 = peg$c16;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c168); }
                }
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseeol() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 177 + 175,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomment();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeof();
          if (s3 === peg$FAILED) {
            s3 = [];
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 13) {
              s5 = peg$c462;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c463); }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$c4;
            }
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s6 = peg$c459;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c460); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsecomment();
                if (s7 === peg$FAILED) {
                  s7 = peg$c4;
                }
                if (s7 !== peg$FAILED) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 13) {
                  s5 = peg$c462;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c463); }
                }
                if (s5 === peg$FAILED) {
                  s5 = peg$c4;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 10) {
                    s6 = peg$c459;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c460); }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsecomment();
                    if (s7 === peg$FAILED) {
                      s7 = peg$c4;
                    }
                    if (s7 !== peg$FAILED) {
                      s5 = [s5, s6, s7];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              }
            } else {
              s3 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c461); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseeof() {
      var s0, s1;

      var key    = peg$currPos * 177 + 176,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      peg$silentFails++;
      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c168); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = peg$c16;
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c464); }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }


        var common = require("./common");
        var primitive = {string:true,number:true,boolean:true,function:true}
        function clone(object) {
            if (object === undefined || object === null || object.constructor === RegExp || primitive[typeof object])
                return object
            var copy = Array.isArray(object) ? [] : {}
            for (key in object) {
                var value = object[key]
                copy[key] = clone(value)
            }
            return copy
        }
        function node(type, properties, start, end) {
            var node = {type:type}
            if (properties != null) {
                for (var key in properties) {
                    node[key] = properties[key]
                }
            }
            setLoc(node, start, end)
            return node
        }
        function setLoc(node, start, end) {
            if (options.loc) {
                if (start != null) {
                    node.loc = {start:start}
                    if (end != null)
                        node.loc.end = end
                }
            }
        }
        function thisExpression(start, end, property) {
            var thisExpression = node("ThisExpression", null, start, end);
            for (var i = 2; i < arguments.length; i++) {
                var property = arguments[i]
                if (typeof property === 'string')
                    property = {type:'Identifier', name:property}
                thisExpression = node("MemberExpression", {object:thisExpression,property:property}, start, end);
            }
            return thisExpression;
        }
        function binaryExpression(op, left, right, start, end) {
            return node("BinaryExpression", {operator:op, left:left, right:right}, start, end)
        }
        function leftAssociateBinaryExpressions(start, head, tail) {
            var result = head
            for (var i = 0; i < tail.length; i++)
                result = binaryExpression(tail[i][1], result, tail[i][3], start, tail[i][4])
            return result
        }
        function leftAssociateCallsOrMembers(start, head, tail) {
            var result = head
            for (var i = 0; i < tail.length; i++) {
                var next = tail[i][1]
                setLoc(next, start, tail[i][2])
                next[tail[i][0]] = result
                result = next
            }
            return result
        }
        function unindent(content) {
            //  content consists of strings and/or Expressions
            //  strings that start lines should start with \n
            var minIndent = common.getMinIndent(content, /\n([ ]+)/)
            var replacement = "\n"
            var find = replacement
            var i, line;
            for (i = 0; i < minIndent; i++) {
                find += " "
            }
            for (i = 0; i < content.length; i++) {
                line = content[i]
                if (typeof line === 'string')
                    content[i] = line.replace(find, replacement)
            }

            //  trim the starting /n
            if (typeof content[0] === 'string' && content[0][0] === '\n')
                content[0] = content[0].substring(1)

            // console.log('===============================================')
            // console.log(content)
            // console.log('===============================================')

            joinAdjacentStrings(content)

            // console.log(content)
            // console.log('===============================================')
            return content
        }
        function joinAdjacentStrings(content) {
            for (var i = 1; i < content.length;) {
                var left = content[i - 1]
                var right = content[i]
                if (typeof left === 'string' && typeof right === 'string')
                    content.splice(i - 1, 2, left + right)
                else
                    i++
            }
        }
        function toNode(value) {
            return value.type != null ? value : node("Literal", {value:value})
        }
        function concatenate(content) {
            if (typeof content[0] !== 'string')
                content.unshift("")
            var result = toNode(content.shift())
            while (content.length > 0) {
                var right = toNode(content.shift())
                result = node("BinaryExpression", {operator:"+", left:result, right:right})
            }
            return result
        }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})()
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/parser',_ion_compiler_parser_);
    else
      _ion_compiler_parser_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_parser_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_postprocessor_ = function(module,exports,require){var activateStatements, addPropertyDeclaration, addStatement, addUseStrictAndRequireIon, arrayComprehensionsToES5, assertStatements, basicTraverse, block, callFunctionBindForFatArrows, checkVariableDeclarations, classExpressions, convertForInToForLength, createForInLoopValueVariable, createTemplateFunctionClone, createTemplateRuntime, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals, destructuringAssignments, ensureIonVariable, existentialExpression, extractForLoopRightVariable, extractForLoopsInnerAndTest, extractReactiveForPatterns, falseExpression, forEachDestructuringAssignment, functionDeclarations, functionParameterDefaultValuesToES5, getExternalIdentifiers, getPathExpression, getReferenceIdentifiers, ion, ionExpression, isAncestorObjectExpression, isFunctionNode, isPattern, isReferenceNode, isSimpleObjectExpression, isSuperExpression, javascriptExpressions, letAndConstToVar, namedFunctionsAndNewArguments, nodeToLiteral, nodejsModules, nodes, nullExpression, patchAssignmentExpression, propertyStatements, removeLocationInfo, setNodeOutputValues, spreadExpressions, superExpressions, thisExpression, traverse, trueExpression, typedObjectExpressions, undefinedExpression, validateTemplateNodes, variableDeclarationExpressions, wrapTemplateInnerFunctions, _ref;

traverse = require('./traverseAst').traverse;

basicTraverse = require('./traverse').traverse;

_ref = require('./astFunctions'), addStatement = _ref.addStatement, forEachDestructuringAssignment = _ref.forEachDestructuringAssignment;

nodes = require('./nodes');

ion = require('../');

undefinedExpression = Object.freeze({
  type: 'UnaryExpression',
  argument: {
    type: 'Literal',
    value: 0
  },
  operator: 'void',
  prefix: true
});

nullExpression = Object.freeze({
  type: 'Literal',
  value: null
});

trueExpression = Object.freeze({
  type: 'Literal',
  value: true
});

falseExpression = Object.freeze({
  type: 'Literal',
  value: false
});

ionExpression = Object.freeze({
  type: 'Identifier',
  name: 'ion'
});

thisExpression = Object.freeze({
  type: 'ThisExpression'
});

isPattern = function(node) {
  return (node.properties != null) || (node.elements != null);
};

getPathExpression = function(path) {
  var i, result, step, steps, _i, _len;
  steps = path.split('.');
  if (steps[0] === 'this') {
    result = {
      type: 'ThisExpression'
    };
  } else {
    result = {
      type: 'Identifier',
      name: steps[0]
    };
  }
  for (i = _i = 0, _len = steps.length; _i < _len; i = ++_i) {
    step = steps[i];
    if (i > 0) {
      result = {
        type: 'MemberExpression',
        object: result,
        property: {
          type: 'Identifier',
          name: step
        }
      };
    }
  }
  return result;
};

isFunctionNode = function(node) {
  var _ref1, _ref2;
  return (_ref1 = (_ref2 = nodes[node != null ? node.type : void 0]) != null ? _ref2.isFunction : void 0) != null ? _ref1 : false;
};

nodeToLiteral = function(object) {
  var item, key, node, value;
  node = null;
  if ((object != null ? object.toLiteral : void 0) != null) {
    node = object != null ? object.toLiteral() : void 0;
  } else if (Array.isArray(object)) {
    node = {
      type: 'ArrayExpression',
      elements: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = object.length; _i < _len; _i++) {
          item = object[_i];
          _results.push(nodeToLiteral(item));
        }
        return _results;
      })()
    };
  } else if ((object != null ? object.constructor : void 0) === Object) {
    node = {
      type: 'ObjectExpression',
      properties: []
    };
    for (key in object) {
      value = object[key];
      if (value !== void 0) {
        node.properties.push({
          key: {
            type: 'Identifier',
            name: key
          },
          value: nodeToLiteral(value),
          kind: 'init'
        });
      }
    }
  } else {
    node = {
      type: 'Literal',
      value: object
    };
  }
  return node;
};

block = function(node) {
  if (node.type !== 'BlockStatement') {
    node = {
      type: 'BlockStatement',
      body: [node]
    };
  }
  return node;
};

extractReactiveForPatterns = function(node, context) {
  var declarator, index, ref, _i, _len, _ref1, _results;
  if (!context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement' || node.type === 'ForInStatement') {
    _ref1 = node.left.declarations;
    _results = [];
    for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
      declarator = _ref1[index];
      if (!(isPattern(declarator.id))) {
        continue;
      }
      ref = context.getNewInternalIdentifier();
      context.addStatement({
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: declarator.id,
            init: ref
          }
        ]
      });
      _results.push(declarator.id = ref);
    }
    return _results;
  }
};

extractForLoopRightVariable = function(node, context) {
  var ref, right;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement' || (node.type === 'ForInStatement' && node.left.declarations.length > 1)) {
    if (node.left.declarations.length > 2) {
      throw context.error("too many declarations", node.left.declarations[2]);
    }
    right = node.right;
    if (right.type !== "Identifier") {
      ref = context.getNewInternalIdentifier();
      node.right = ref;
      return context.replace({
        type: "BlockStatement",
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: ref,
                init: right
              }
            ],
            kind: node.left.kind
          }, node
        ]
      });
    }
  }
};

createForInLoopValueVariable = function(node, context) {
  var valueDeclarator;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForInStatement' && node.left.declarations.length > 1) {
    valueDeclarator = node.left.declarations[1];
    return context.addVariable({
      id: valueDeclarator.id,
      init: {
        type: 'MemberExpression',
        computed: true,
        object: node.right,
        property: node.left.declarations[0].id
      }
    });
  }
};

convertForInToForLength = function(node, context) {
  var loopIndex, userIndex, _ref1;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement') {
    userIndex = (_ref1 = node.left.declarations[1]) != null ? _ref1.id : void 0;
    loopIndex = context.getNewInternalIdentifier("_i");
    addStatement(node, {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: node.left.declarations[0].id,
          init: {
            type: "MemberExpression",
            object: node.right,
            property: loopIndex,
            computed: true
          }
        }
      ],
      kind: node.left.kind
    });
    if (userIndex != null) {
      addStatement(node, {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: userIndex,
            init: loopIndex
          }
        ],
        kind: node.left.kind
      });
    }
    return context.replace({
      type: 'ForStatement',
      init: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: loopIndex,
            init: {
              type: "Literal",
              value: 0
            }
          }
        ],
        kind: 'let'
      },
      test: {
        type: "BinaryExpression",
        operator: "<",
        left: loopIndex,
        right: {
          type: "MemberExpression",
          object: node.right,
          property: {
            type: "Identifier",
            name: "length"
          },
          computed: false
        }
      },
      update: {
        type: "UpdateExpression",
        operator: "++",
        argument: loopIndex,
        prefix: false
      },
      body: node.body
    });
  }
};

callFunctionBindForFatArrows = function(node, context) {
  if (node.type === 'FunctionExpression' && node.bound) {
    delete node.bound;
    ensureIonVariable(context);
    return context.replace({
      type: "CallExpression",
      callee: getPathExpression('ion.bind'),
      "arguments": [node, thisExpression]
    });
  }
};

nodejsModules = function(node, context) {
  var declarator, _i, _ref1, _results;
  if (node.type === 'ImportExpression') {
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: 'require'
    };
    node["arguments"] = [node.name];
    return delete node.name;
  } else if (node.type === 'ExportStatement') {
    if (node.value.type === 'VariableDeclaration') {
      context.exports = true;
      context.replace(node.value);
      _ref1 = node.value.declarations;
      _results = [];
      for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
        declarator = _ref1[_i];
        if (declarator.init == null) {
          throw context.error("Export variables must have an init value", declarator);
        }
        _results.push(declarator.init = {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'exports'
            },
            property: declarator.id
          },
          right: declarator.init
        });
      }
      return _results;
    } else {
      if (context.exports) {
        throw context.error("default export must be first");
      }
      return context.replace({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'module'
            },
            property: {
              type: 'Identifier',
              name: 'exports'
            }
          },
          right: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'exports'
            },
            right: node.value
          }
        }
      });
    }
  }
};

destructuringAssignments = function(node, context) {
  var count, declarator, expression, index, pattern, statement, statements, tempId, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2;
  if (isFunctionNode(node)) {
    _ref1 = node.params;
    for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
      pattern = _ref1[index];
      if (!(isPattern(pattern))) {
        continue;
      }
      tempId = context.getNewInternalIdentifier();
      node.params[index] = tempId;
      statements = [];
      forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return statements.unshift({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: id,
              init: expression
            }
          ],
          kind: 'let'
        });
      });
      for (_j = 0, _len1 = statements.length; _j < _len1; _j++) {
        statement = statements[_j];
        context.addStatement(statement);
      }
    }
  }
  if (node.type === 'VariableDeclaration' && context.isParentBlock()) {
    _ref2 = node.declarations;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      declarator = _ref2[_k];
      if (!(isPattern(declarator.id))) {
        continue;
      }
      pattern = declarator.id;
      tempId = context.getNewInternalIdentifier();
      declarator.id = tempId;
      count = 0;
      forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return context.addStatement({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: id,
              init: expression
            }
          ],
          kind: 'let'
        }, ++count);
      });
    }
  }
  if (node.type === 'ExpressionStatement' && node.expression.operator === '=') {
    expression = node.expression;
    pattern = expression.left;
    if (isPattern(pattern)) {
      tempId = context.getNewInternalIdentifier();
      context.replace({
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: tempId,
            init: expression.right
          }
        ],
        kind: 'const'
      });
      count = 0;
      return forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return context.addStatement({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: id,
            right: expression
          }
        }, ++count);
      });
    }
  }
};

defaultOperatorsToConditionals = function(node, context) {
  if (node.type === 'BinaryExpression' && (node.operator === '??' || node.operator === '?')) {
    return context.replace({
      type: 'ConditionalExpression',
      test: {
        type: 'BinaryExpression',
        operator: '!=',
        left: node.left,
        right: node.operator === '??' ? undefinedExpression : nullExpression
      },
      consequent: node.left,
      alternate: node.right
    });
  }
};

defaultAssignmentsToDefaultOperators = function(node, context) {
  if (node.type === 'AssignmentExpression' && (node.operator === '?=' || node.operator === '??=')) {
    node.right = {
      type: 'BinaryExpression',
      operator: node.operator === '?=' ? '?' : '??',
      left: node.left,
      right: node.right
    };
    return node.operator = '=';
  }
};

existentialExpression = function(node, context) {
  var existentialChild, existentialChildObject, getExistentialDescendantObject, _ref1;
  if (node.type === 'UnaryExpression' && node.operator === '?') {
    context.replace({
      type: 'BinaryExpression',
      operator: '!=',
      left: node.argument,
      right: nullExpression
    });
  }
  if (node.type === 'MemberExpression' || node.type === 'CallExpression') {
    getExistentialDescendantObject = function(check) {
      var result, _ref1;
      result = null;
      if (check.type === 'MemberExpression' || check.type === 'CallExpression') {
        result = getExistentialDescendantObject((_ref1 = check.object) != null ? _ref1 : check.callee);
        if (check.existential) {
          if (result == null) {
            result = check;
          }
        }
      }
      return result;
    };
    existentialChild = getExistentialDescendantObject(node);
    if (existentialChild != null) {
      existentialChildObject = (_ref1 = existentialChild.object) != null ? _ref1 : existentialChild.callee;
      delete existentialChild.existential;
      return context.replace({
        type: 'ConditionalExpression',
        test: {
          type: 'BinaryExpression',
          operator: '!=',
          left: existentialChildObject,
          right: nullExpression
        },
        consequent: node,
        alternate: undefinedExpression
      });
    }
  }
};

ensureIonVariable = function(context, required) {
  if (required == null) {
    required = true;
  }
  return context.ancestorNodes[0].requiresIon = required;
};

addUseStrictAndRequireIon = {
  enter: function(node, context) {
    var d, _i, _len, _ref1, _ref2, _results;
    if (node.type === 'VariableDeclaration' && ((_ref1 = context.parentNode()) != null ? _ref1.type : void 0) === 'Program') {
      _ref2 = node.declarations;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        d = _ref2[_i];
        if (!(d.id.name === 'ion')) {
          continue;
        }
        ensureIonVariable(context, false);
        break;
      }
      return _results;
    }
  },
  exit: function(node, context) {
    if (node.type === 'Program') {
      if (node.requiresIon) {
        delete node.requiresIon;
        context.addVariable({
          offset: Number.MIN_VALUE,
          kind: 'const',
          id: ionExpression,
          init: {
            type: 'ImportExpression',
            name: {
              type: 'Literal',
              value: 'ion'
            }
          }
        });
      }
      return node.body.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'Literal',
          value: 'use strict'
        }
      });
    }
  }
};

extractForLoopsInnerAndTest = function(node, context) {
  if (node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
    if (node.inner != null) {
      node.inner.body = node.body;
      node.body = node.inner;
      delete node.inner;
    }
    if (node.test != null) {
      node.body = block({
        type: 'IfStatement',
        test: node.test,
        consequent: block(node.body)
      });
      return delete node.test;
    }
  }
};

arrayComprehensionsToES5 = function(node, context) {
  var forStatement, tempId;
  if (node.type === 'ArrayExpression' && (node.value != null) && (node.comprehension != null)) {
    if (context.reactive) {
      forStatement = node.comprehension;
      forStatement.body = {
        type: 'ExpressionStatement',
        expression: node.value
      };
      return context.replace({
        type: 'ObjectExpression',
        objectType: {
          type: 'ArrayExpression',
          elements: []
        },
        properties: [forStatement]
      });
    } else {
      tempId = context.addVariable({
        offset: 0,
        init: {
          type: 'ArrayExpression',
          elements: []
        }
      });
      forStatement = node.comprehension;
      forStatement.body = {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: tempId,
            property: {
              type: 'Identifier',
              name: 'push'
            }
          },
          "arguments": [node.value]
        }
      };
      context.addStatement(0, forStatement);
      return context.replace(tempId);
    }
  }
};

functionParameterDefaultValuesToES5 = function(node, context) {
  var defaultValue, index, param, _i, _ref1, _ref2, _results;
  if (context.reactive) {
    return;
  }
  if (isFunctionNode(node) && (node.params != null) && (node.defaults != null)) {
    _ref1 = node.params;
    _results = [];
    for (index = _i = _ref1.length - 1; _i >= 0; index = _i += -1) {
      param = _ref1[index];
      defaultValue = (_ref2 = node.defaults) != null ? _ref2[index] : void 0;
      if (defaultValue != null) {
        context.addStatement({
          type: 'IfStatement',
          test: {
            type: 'BinaryExpression',
            operator: '==',
            left: param,
            right: nullExpression
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: param,
              right: defaultValue
            }
          }
        });
        _results.push(node.defaults[index] = void 0);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

isSimpleObjectExpression = function(node) {
  var isArray, isSimple, property, _i, _len, _ref1, _ref2;
  if (node.type !== 'ObjectExpression') {
    return false;
  }
  isArray = ((_ref1 = node.objectType) != null ? _ref1.type : void 0) === "ArrayExpression";
  isSimple = true;
  if (node.properties != null) {
    _ref2 = node.properties;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      property = _ref2[_i];
      if (isArray) {
        if (property.type !== 'ExpressionStatement') {
          isSimple = false;
          break;
        }
      } else {
        if (property.type !== 'Property' || property.computed) {
          isSimple = false;
          break;
        }
      }
    }
  }
  return isSimple;
};

typedObjectExpressions = function(node, context) {
  var addPosition, element, elements, expressionStatement, getExistingObjectIdIfTempVarNotNeeded, grandNode, initialValue, isArray, isSimple, objectId, objectType, parentNode, statements, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ObjectExpression' && node.simple !== true) {
    isArray = ((_ref1 = node.objectType) != null ? _ref1.type : void 0) === "ArrayExpression";
    isSimple = isSimpleObjectExpression(node);
    if (isSimple) {
      if (isArray) {
        elements = [];
        if (node.objectType != null) {
          _ref2 = node.objectType.elements;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            element = _ref2[_i];
            elements.push(element);
          }
        }
        _ref3 = node.properties;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          expressionStatement = _ref3[_j];
          elements.push(expressionStatement.expression);
        }
        context.replace({
          type: "ArrayExpression",
          elements: elements
        });
        return;
      }
      if ((node.objectType == null) || (node.objectType.type === 'ObjectExpression' && node.objectType.properties.length === 0)) {
        delete node.objectType;
        Object.defineProperty(node, 'simple', {
          value: true
        });
        return;
      }
      objectType = node.objectType;
      delete node.objectType;
      if (isSimpleObjectExpression(objectType)) {
        node.properties = objectType.properties.concat(node.properties);
        Object.defineProperty(node, 'simple', {
          value: true
        });
        return;
      } else {
        ensureIonVariable(context);
        context.replace({
          type: 'CallExpression',
          callee: getPathExpression('ion.patch'),
          "arguments": [objectType, node]
        });
        return;
      }
    }
    if (node.objectType == null) {
      initialValue = {
        type: 'ObjectExpression',
        properties: []
      };
    } else {
      initialValue = node.objectType;
    }
    parentNode = context.parentNode();
    grandNode = context.ancestorNodes[context.ancestorNodes.length - 2];
    addPosition = 0;
    getExistingObjectIdIfTempVarNotNeeded = function(node, parentNode, grandNode) {
      if (parentNode.type === 'VariableDeclarator') {
        return parentNode.id;
      }
      if (parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier' && (grandNode != null ? grandNode.type : void 0) === 'ExpressionStatement') {
        return parentNode.left;
      }
      return null;
    };
    objectId = getExistingObjectIdIfTempVarNotNeeded(node, parentNode, grandNode);
    if (objectId != null) {
      context.replace(initialValue);
      addPosition = 1;
    } else {
      objectId = context.addVariable({
        offset: 0,
        init: initialValue
      });
      context.replace(objectId);
    }
    statements = [];
    setNodeOutputValues(context, node.properties, objectId, statements, isArray);
    if (statements.length === 1) {
      return context.addStatement(statements[0], addPosition);
    } else {
      return context.addStatement({
        type: 'BlockStatement',
        body: statements
      }, addPosition);
    }
  }
};

setNodeOutputValues = function(context, nodes, outputId, statements, isArray) {
  var subnodeEnter, subnodeExit;
  if (statements == null) {
    statements = [];
  }
  subnodeEnter = function(subnode, subcontext) {
    if (subcontext.outputStack == null) {
      subcontext.outputStack = [outputId];
    }
    if (subnode.type === 'ObjectExpression' || subnode.type === 'ArrayExpression') {
      return subcontext.skip();
    }
    if (subnode.type === 'Property') {
      subnode.output = subcontext.outputStack[subcontext.outputStack.length - 1];
      subcontext.outputStack.push({
        type: 'MemberExpression',
        object: subnode.output,
        property: subnode.key,
        computed: subnode.computed || subnode.key.type !== 'Identifier'
      });
    } else if (isFunctionNode(subnode)) {
      subcontext.skip();
    } else if (subnode.type === 'ExpressionStatement') {
      if (!isArray) {
        ensureIonVariable(context);
      }
      subnode = subcontext.replace({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: isArray ? outputId : ionExpression,
            property: {
              type: 'Identifier',
              name: isArray ? 'push' : 'add'
            }
          },
          "arguments": isArray ? [subnode.expression] : [outputId, subnode.expression]
        }
      });
      subcontext.skip();
    }
    if (subcontext.parentNode() == null) {
      return statements.push(subnode);
    }
  };
  subnodeExit = function(subnode, subcontext) {
    if (subnode.type === 'Property') {
      return subcontext.outputStack.pop();
    }
  };
  traverse(nodes, subnodeEnter, subnodeExit);
  return statements;
};

propertyStatements = function(node, context) {
  var left, parent, right, statements;
  if (context.reactive) {
    return;
  }
  parent = context.parentNode();
  if (node.type === 'Property' && !(parent.type === 'ObjectExpression' || parent.type === 'ObjectPattern')) {
    if (node.output != null) {
      if (node.value.type === 'ObjectExpression') {
        left = {
          type: 'MemberExpression',
          object: node.output,
          property: node.key,
          computed: node.computed
        };
        if (node.value.type === 'ObjectExpression' && (node.value.objectType == null)) {
          ensureIonVariable(context);
          right = {
            type: 'CallExpression',
            callee: getPathExpression('ion.patch'),
            "arguments": [ion.clone(left, true), node.value]
          };
        } else {
          right = node.value;
        }
        return context.replace({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: left,
            right: right
          }
        });
      } else {
        return context.replace({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: node.output,
              property: node.key,
              computed: node.computed
            },
            right: node.value
          }
        });
      }
    } else {
      if (node.computed) {
        throw context.error("dynamic property expression invalid here", node.key);
      }
      if (node.value.objectType != null) {
        throw context.error("type not allowed on set expression", node.value);
      }
      statements = [];
      setNodeOutputValues(context, node.value.properties, node.key, statements);
      if (statements.length === 1) {
        return context.replace(statements[0]);
      } else {
        return context.replace({
          type: 'BlockStatement',
          body: statements
        });
      }
    }
  }
};

patchAssignmentExpression = function(node, context) {
  if (node.type === 'AssignmentExpression' && node.operator === ':=') {
    ensureIonVariable(context);
    return context.replace({
      type: 'AssignmentExpression',
      operator: '=',
      left: node.left,
      right: {
        type: 'CallExpression',
        callee: getPathExpression('ion.patch'),
        "arguments": [ion.clone(node.left, true), node.right]
      }
    });
  }
};

classExpressions = function(node, context) {
  var classExpression, hasIdentifierName, name, properties, property, _base, _i, _len;
  if (node.type === 'ClassExpression') {
    ensureIonVariable(context);
    properties = node.properties;
    hasIdentifierName = (node.name != null) && !node.computed;
    if (node.name != null) {
      name = hasIdentifierName ? {
        type: 'Literal',
        value: node.name.name
      } : node.name;
      properties = [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: 'name'
          },
          value: name
        }
      ].concat(properties);
    }
    if (hasIdentifierName) {
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        property = properties[_i];
        if (property.key.name === 'constructor') {
          if ((_base = property.value).id == null) {
            _base.id = node.name;
          }
        }
      }
    }
    classExpression = {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: ionExpression,
        property: {
          type: 'Identifier',
          name: 'defineClass'
        }
      },
      "arguments": [
        {
          type: 'ObjectExpression',
          properties: properties
        }
      ].concat(node["extends"])
    };
    if (hasIdentifierName) {
      context.addVariable({
        id: node.name,
        kind: 'const',
        init: classExpression,
        offset: 0
      });
      return context.replace(node.name);
    } else {
      return context.replace(classExpression);
    }
  }
};

checkVariableDeclarations = {
  enter: function(node, context) {
    var key, parent, variable, _base;
    if (node.type === 'AssignmentExpression') {
      if (node.left.type === 'Identifier') {
        variable = context.getVariableInfo(node.left.name);
        if (variable == null) {
          throw context.error("cannot assign to undeclared variable " + node.left.name);
        }
        if (variable.kind === 'const') {
          throw context.error("cannot assign to a const", node.left);
        }
      }
      if (context.reactive) {
        throw context.error("cannot assign within templates", node);
      }
    }
    if (node.type === 'Identifier') {
      key = context.key();
      parent = context.parentNode();
      if (!(parent.type === 'MemberExpression' && key === 'property' || parent.type === 'Property' && key === 'key')) {
        return ((_base = context.scope()).usage != null ? _base.usage : _base.usage = {})[node.name] = node;
      }
    }
  },
  variable: function(variable, context) {
    var checkScope, existing, scope, shadow, used, _i, _j, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
    scope = context.scope();
    existing = context.getVariableInfo(variable.name);
    if (existing != null) {
      shadow = false;
      _ref1 = context.scopeStack;
      for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
        checkScope = _ref1[_i];
        if (checkScope === (existing != null ? existing.scope : void 0)) {
          break;
        }
        if ((_ref2 = nodes[checkScope.node.type]) != null ? _ref2.shadow : void 0) {
          shadow = true;
          break;
        }
      }
      if (!shadow) {
        throw context.error("Cannot redeclare variable " + variable.name, variable.node);
      }
    }
    _ref3 = context.scopeStack;
    _results = [];
    for (_j = _ref3.length - 1; _j >= 0; _j += -1) {
      checkScope = _ref3[_j];
      used = (_ref4 = checkScope.usage) != null ? _ref4[variable.name] : void 0;
      if (used != null) {
        throw context.error("Cannot use variable '" + variable.name + "' before declaration", used);
      }
      if ((_ref5 = nodes[checkScope.node.type]) != null ? _ref5.shadow : void 0) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

isAncestorObjectExpression = function(context) {
  var ancestor, _i, _ref1;
  _ref1 = context.ancestorNodes;
  for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
    ancestor = _ref1[_i];
    if (ancestor.type === 'ObjectExpression') {
      return true;
    }
    if (isFunctionNode(ancestor)) {
      return false;
    }
  }
  return false;
};

namedFunctionsAndNewArguments = function(node, context) {
  var _base, _base1, _ref1;
  if (context.reactive) {
    return;
  }
  if (node.type === 'NewExpression') {
    if (node["arguments"] == null) {
      node["arguments"] = [];
    }
  }
  if (node.type === 'VariableDeclarator' && ((_ref1 = node.init) != null ? _ref1.type : void 0) === 'FunctionExpression') {
    if ((_base = node.init).name == null) {
      _base.name = node.id;
    }
  }
  if (node.type === 'Property' && node.value.type === 'FunctionExpression' && node.key.type === 'Identifier') {
    if (node.key.name !== 'constructor') {
      return (_base1 = node.value).name != null ? _base1.name : _base1.name = node.key;
    }
  }
};

assertStatements = function(node, context) {
  if (node.type === 'AssertStatement') {
    return context.replace({
      type: 'IfStatement',
      test: {
        type: 'UnaryExpression',
        prefix: true,
        operator: '!',
        argument: node.expression
      },
      consequent: {
        type: 'ThrowStatement',
        argument: {
          type: 'NewExpression',
          callee: {
            type: 'Identifier',
            name: 'Error'
          },
          "arguments": [
            {
              type: 'Literal',
              value: "Assertion Failed: (" + node.text + ")"
            }
          ]
        }
      }
    });
  }
};

isSuperExpression = function(node, context) {
  var parentNode;
  parentNode = context.parentNode();
  if (node.type === 'Identifier' && node.name === 'super' && parentNode.type !== 'CallExpression' && parentNode.type !== 'MemberExpression') {
    return true;
  }
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'super') {
    return true;
  }
  return false;
};

superExpressions = function(node, context) {
  var applyOrCall, args, classNode, functionNode, functionProperty, isConstructor, superFunction, _ref1, _ref2;
  if (isSuperExpression(node, context)) {
    classNode = context.getAncestor(function(node) {
      return node.type === 'ClassExpression';
    });
    functionNode = context.getAncestor(isFunctionNode);
    functionProperty = context.ancestorNodes[context.ancestorNodes.indexOf(functionNode) - 1];
    isConstructor = (functionProperty != null ? (_ref1 = functionProperty.key) != null ? _ref1.name : void 0 : void 0) === 'constructor';
    if ((classNode == null) || !(((functionNode != null ? functionNode.name : void 0) != null) || isConstructor)) {
      throw context.error("super can only be used within named class functions", node);
    }
    args = [
      {
        type: 'ThisExpression'
      }
    ];
    if (node.type === 'Identifier') {
      args.push({
        type: 'Identifier',
        name: 'arguments'
      });
      applyOrCall = 'apply';
    } else {
      args = args.concat(node["arguments"]);
      applyOrCall = 'call';
    }
    superFunction = getPathExpression("" + classNode.name.name + ".super");
    if (!isConstructor) {
      superFunction = {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: superFunction,
          property: {
            type: 'Identifier',
            name: 'prototype'
          }
        },
        property: (_ref2 = functionNode.name) != null ? _ref2 : 'constructor'
      };
    }
    return context.replace({
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: superFunction,
        property: {
          type: 'Identifier',
          name: applyOrCall
        }
      },
      "arguments": args
    });
  }
};

spreadExpressions = function(node, context) {
  var args, finalParameters, getOffsetFromArgumentsLength, index, param, spread, spreadIndex, _i, _len, _ref1;
  if (isFunctionNode(node)) {
    spread = null;
    spreadIndex = null;
    _ref1 = node.params;
    for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
      param = _ref1[index];
      if (param.type === 'SpreadExpression') {
        spread = param;
        spreadIndex = index;
        break;
      }
    }
    if (spread != null) {
      node.params[spreadIndex] = {
        type: 'Identifier',
        name: "___" + spread.expression.name
      };
      args = [
        {
          type: 'Identifier',
          name: 'arguments'
        }, {
          type: 'Literal',
          value: spreadIndex
        }
      ];
      finalParameters = node.params.length - 1 - spreadIndex;
      if (finalParameters > 0) {
        getOffsetFromArgumentsLength = function(offset) {
          return {
            type: 'BinaryExpression',
            operator: '-',
            left: getPathExpression('arguments.length'),
            right: {
              type: 'Literal',
              value: offset
            }
          };
        };
        args.push(getOffsetFromArgumentsLength(finalParameters));
        index = node.params.length - 1;
        while (index > spreadIndex) {
          param = node.params[index--];
          context.addStatement({
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: param,
              right: {
                type: 'MemberExpression',
                computed: true,
                object: getPathExpression('arguments'),
                property: getOffsetFromArgumentsLength(node.params.length - 1 - index)
              }
            }
          });
        }
      }
      return context.addVariable({
        id: spread.expression,
        init: {
          type: 'CallExpression',
          callee: getPathExpression('Array.prototype.slice.call'),
          "arguments": args
        }
      });
    }
  }
};

validateTemplateNodes = function(node, context) {
  var _ref1;
  if (context.reactive) {
    if (((_ref1 = nodes[node.type]) != null ? _ref1.allowedInReactive : void 0) === false) {
      throw context.error(node.type + " not allowed in templates", node);
    }
  }
};

removeLocationInfo = function(node) {
  return traverse(node, function(node) {
    if (node.loc != null) {
      delete node.loc;
    }
    return node;
  });
};

isReferenceNode = function(node, context) {
  var parentNode;
  if (node.type !== 'Identifier') {
    return false;
  }
  parentNode = context.parentNode();
  if (isFunctionNode(parentNode)) {
    return false;
  }
  if ((parentNode != null ? parentNode.type : void 0) === 'VariableDeclarator') {
    return false;
  }
  if ((parentNode != null ? parentNode.type : void 0) === 'MemberExpression' && !(parentNode != null ? parentNode.computed : void 0) && context.key() === 'property') {
    return false;
  }
  if ((parentNode != null ? parentNode.type : void 0) === 'Property' && context.key() === 'key') {
    return false;
  }
  return true;
};

getReferenceIdentifiers = function(node, callback) {
  var results;
  results = {};
  if (callback == null) {
    callback = function(node) {
      return results[node.name] = node;
    };
  }
  traverse(node, function(node, context) {
    if (isReferenceNode(node, context)) {
      return callback(node, context);
    }
  });
  return results;
};

getExternalIdentifiers = function(node, callback) {
  getReferenceIdentifiers(node, function(node, context) {
    if (context.getVariableInfo(node.name) != null) {
      return;
    }
    return callback(node, context);
  });
};

wrapTemplateInnerFunctions = function(node, context) {
  var contextId, id, name, requiresWrapper, variables;
  if (context.parentReactive()) {
    if (node.type === 'FunctionExpression' && (node.toLiteral == null)) {
      variables = {};
      getExternalIdentifiers(node, function(id) {
        var _ref1, _ref2;
        if (id.name === 'ion' || (id.name !== ((_ref1 = node.id) != null ? _ref1.name : void 0) && (((_ref2 = context.scope()) != null ? _ref2.variables[id.name] : void 0) != null))) {
          return variables[id.name] = id;
        }
      });
      requiresWrapper = Object.keys(variables).length > 0;
      if (requiresWrapper) {
        contextId = context.getNewInternalIdentifier('_context');
        node.body.body.unshift({
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: (function() {
            var _results;
            _results = [];
            for (name in variables) {
              id = variables[name];
              _results.push({
                type: 'VariableDeclarator',
                id: id,
                init: {
                  type: 'CallExpression',
                  callee: getPathExpression("" + contextId.name + ".get"),
                  "arguments": [
                    {
                      type: 'Literal',
                      value: id.name
                    }
                  ]
                }
              });
            }
            return _results;
          })()
        });
        node = {
          type: 'FunctionExpression',
          params: [contextId],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: node
              }
            ]
          }
        };
      }
      node.toLiteral = function() {
        return this;
      };
      return context.replace({
        type: 'Function',
        context: requiresWrapper,
        value: node
      });
    }
  }
};

createTemplateFunctionClone = function(node, context) {
  if (isFunctionNode(node) && node.template === true) {
    delete node.template;
    node.type = 'Template';
    ensureIonVariable(context);
    return context.replace({
      type: 'CallExpression',
      callee: getPathExpression('ion.template'),
      "arguments": [node],
      toLiteral: function() {
        return this;
      }
    });
  }
};

createTemplateRuntime = function(node, context) {
  var args, id, key, name, params, referenceIds, template, value, variables, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
  if (node.type === 'Template') {
    template = removeLocationInfo(node);
    args = {
      type: 'ObjectExpression',
      properties: []
    };
    variables = {
      "this": thisExpression
    };
    referenceIds = getReferenceIdentifiers(node);
    _ref1 = ['require', 'module', 'exports', 'ion'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      name = _ref1[_i];
      if (referenceIds[name] != null) {
        variables[name] = {
          type: 'Identifier',
          name: name
        };
      }
    }
    _ref2 = template.params;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      id = _ref2[_j];
      variables[id.name] = id;
    }
    _ref3 = context.scope().variables;
    for (key in _ref3) {
      value = _ref3[key];
      id = value.id;
      variables[id.name] = id;
    }
    for (key in variables) {
      id = variables[key];
      args.properties.push({
        key: id,
        value: id,
        kind: 'init'
      });
    }
    params = template.params;
    template.body = template.body.body;
    delete template.id;
    delete template.params;
    delete template.defaults;
    return context.replace({
      type: 'FunctionExpression',
      params: params,
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'CallExpression',
              callee: getPathExpression('ion.createRuntime'),
              "arguments": [nodeToLiteral(template), args]
            }
          }
        ]
      }
    });
  }
};

javascriptExpressions = function(node, context) {
  var e, errorNode, esprima, expression, message, program, _ref1, _ref2;
  if (node.type === 'JavascriptExpression') {
    try {
      esprima = require('esprima');
    } catch (_error) {
      e = _error;
      node.type = 'VerbatimExpression';
      node.verbatim = node.text;
      return;
    }
    try {
      program = esprima.parse(node.text);
      expression = program.body[0].expression;
      return context.replace(expression);
    } catch (_error) {
      e = _error;
      errorNode = ion.clone(node, true);
      if ((_ref1 = errorNode.loc) != null) {
        _ref1.start.line += e.lineNumber - 1;
      }
      if ((_ref2 = errorNode.loc) != null) {
        _ref2.start.column += e.column - 1 + "`".length;
      }
      message = e.message.substring(e.message.indexOf(':') + 1).trim();
      throw context.error(message, errorNode);
    }
  }
};

functionDeclarations = function(node, context) {
  var func, _ref1, _ref2;
  if (node.type === 'VariableDeclaration' && node.kind === 'const' && node.declarations.length === 1 && ((_ref1 = node.declarations[0].init) != null ? _ref1.type : void 0) === 'FunctionExpression' && ((_ref2 = node.declarations[0].init.id) != null ? _ref2.name : void 0) === node.declarations[0].id.name) {
    func = node.declarations[0].init;
    func.type = 'FunctionDeclaration';
    context.replace(func);
  }
  if (node.type === 'ExpressionStatement' && node.expression.type === 'FunctionExpression') {
    throw context.error('Function Expression is a noop', node);
  }
};

letAndConstToVar = function(node, context) {
  if (node.type === 'VariableDeclaration' && node.kind !== 'var') {
    return node.kind = 'var';
  }
};

activateStatements = function(node, context) {
  if (node.type === 'ActivateStatement') {
    return context.replace({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'CallExpression',
            callee: node.argument,
            "arguments": []
          },
          property: {
            type: 'Identifier',
            name: 'watch'
          }
        },
        "arguments": []
      }
    });
  }
};

variableDeclarationExpressions = function(node, context) {
  if (node.type === 'VariableDeclarationExpression') {
    context.addStatement(0, {
      type: 'VariableDeclaration',
      declarations: node.declarations,
      kind: node.kind
    });
    return context.replace(node.declarations[0].id);
  }
};

addPropertyDeclaration = function(node, context) {
  var parentNode, temp, tempId, _ref1;
  if (node.type === 'Property' && node.add) {
    parentNode = context.parentNode();
    if (!(parentNode.type === 'ObjectExpression')) {
      throw context.error("property assignment only valid within ObjectExpression", node);
    }
    temp = context.getVariable({
      prefix: "_" + ((_ref1 = node.key.name) != null ? _ref1 : "value"),
      init: node.value
    });
    tempId = temp.declarations[0].id;
    context.replace(temp);
    context.insertAfter({
      type: 'ExpressionStatement',
      expression: tempId
    });
    return context.insertAfter({
      type: 'Property',
      key: node.key,
      value: tempId
    });
  }
};

exports.postprocess = function(program, options) {
  var enter, exit, previousContext, steps, traversal, variable, _i, _len;
  steps = [[namedFunctionsAndNewArguments, superExpressions, activateStatements, addPropertyDeclaration], [destructuringAssignments, callFunctionBindForFatArrows], [createTemplateFunctionClone], [javascriptExpressions, arrayComprehensionsToES5, variableDeclarationExpressions, checkVariableDeclarations], [extractForLoopsInnerAndTest, extractForLoopRightVariable], [extractReactiveForPatterns, validateTemplateNodes, classExpressions], [createForInLoopValueVariable, convertForInToForLength, typedObjectExpressions, propertyStatements, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals, wrapTemplateInnerFunctions, nodejsModules, destructuringAssignments], [existentialExpression, createTemplateRuntime, functionParameterDefaultValuesToES5, patchAssignmentExpression], [addUseStrictAndRequireIon], [nodejsModules, spreadExpressions, assertStatements, functionDeclarations]];
  if ((options != null ? options.target : void 0) === 'es5') {
    steps.push([letAndConstToVar]);
  }
  previousContext = null;
  for (_i = 0, _len = steps.length; _i < _len; _i++) {
    traversal = steps[_i];
    enter = function(node, context) {
      var handler, step, _j, _len1, _ref1, _results;
      previousContext = context;
      if (context.options == null) {
        context.options = options;
      }
      _results = [];
      for (_j = 0, _len1 = traversal.length; _j < _len1; _j++) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.enter) != null ? _ref1 : (typeof step === 'function' ? step : null);
        if (handler != null) {
          handler(node, context);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    exit = function(node, context) {
      var handler, step, _j, _ref1, _results;
      _results = [];
      for (_j = traversal.length - 1; _j >= 0; _j += -1) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.exit) != null ? _ref1 : null;
        if (handler != null) {
          handler(node, context);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    variable = function(node, context, kind, name) {
      var handler, step, _j, _len1, _ref1, _results;
      _results = [];
      for (_j = 0, _len1 = traversal.length; _j < _len1; _j++) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.variable) != null ? _ref1 : null;
        if (handler != null) {
          handler(node, context, kind, name);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    traverse(program, enter, exit, variable, previousContext);
  }
  return program;
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/postprocessor',_ion_compiler_postprocessor_);
    else
      _ion_compiler_postprocessor_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_postprocessor_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_preprocessor_ = function(module,exports,require){var common, fixSourceLocation, fixSourceLocations, getSpace, preprocess;

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
  var baseIndent, comment, indent, indentStack, index, isEmpty, isMarkdownCommented, line, lines, nonCommentCount, outdent, output, totalIndent, writeLine, _i, _len;
  isMarkdownCommented = false;
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
  if (nonCommentCount === 0) {
    return "";
  } else {
    return common.unindentString(common.joinLines(output), sourceMapping);
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
void (function(){var _ion_compiler_traverse_ = function(module,exports,require){exports.traverse = function(graph, enterCallback, exitCallback) {
  var context, removed, result, skip, traverseNode;
  result = graph;
  skip = false;
  removed = 0;
  context = {
    path: [],
    ancestors: [],
    skip: function() {
      return skip = true;
    },
    key: function() {
      return this.path[this.path.length - 1];
    },
    parent: function() {
      return this.ancestors[this.ancestors.length - 1];
    },
    remove: function(node) {
      var index, parent;
      if (node == null) {
        throw new Error("You must specify the node to remove");
      }
      parent = this.parent();
      if (Array.isArray(parent)) {
        index = parent.indexOf(node);
        parent.splice(index, 1);
        return removed++;
      } else {
        return delete parent[this.key()];
      }
    },
    insertAfter: function(node) {
      var parent;
      parent = this.parent();
      if (!Array.isArray(parent)) {
        throw new Error("Parent must be an array");
      }
      return parent.splice(Number(this.key()) + 1, 0, node);
    },
    replace: function(value) {
      var parent;
      if (value === void 0) {
        throw new Error("You must specify a replacement value");
      }
      parent = this.parent();
      if (parent != null) {
        return parent[this.key()] = value;
      } else {
        return result = value;
      }
    },
    previous: function() {
      var _ref;
      return (_ref = this.parent()) != null ? _ref[this.key() - 1] : void 0;
    },
    next: function() {
      var _ref;
      return (_ref = this.parent()) != null ? _ref[this.key() + 1] : void 0;
    },
    current: function() {
      var parent;
      parent = this.parent();
      if (parent != null) {
        return parent[this.key()];
      } else {
        return result;
      }
    }
  };
  traverseNode = function(node) {
    var index, key, newNode, value;
    if ((node != null) && typeof node === 'object') {
      if (typeof enterCallback === "function") {
        enterCallback(node, context);
      }
      if (skip) {
        skip = false;
      } else {
        while (node !== (newNode = context.current())) {
          if (typeof exitCallback === "function") {
            exitCallback(node, context);
          }
          node = newNode;
          if (node != null) {
            if (typeof enterCallback === "function") {
              enterCallback(node, context);
            }
          } else {
            break;
          }
        }
        if ((node != null) && typeof node === 'object') {
          context.ancestors.push(node);
          if (Array.isArray(node)) {
            index = 0;
            while (index < node.length) {
              value = node[index];
              context.path.push(index);
              traverseNode(value);
              context.path.pop();
              index++;
              if (removed > 0) {
                index -= removed;
                removed = 0;
              }
            }
          } else {
            for (key in node) {
              value = node[key];
              context.path.push(key);
              traverseNode(value);
              context.path.pop();
            }
          }
          context.ancestors.pop();
        }
      }
      if (node != null) {
        return typeof exitCallback === "function" ? exitCallback(node, context) : void 0;
      }
    }
  };
  traverseNode(graph);
  return result;
};

exports.test = function() {
  var graph;
  graph = {
    id: 'root',
    alpha: 1,
    beta: {
      id: 'beta',
      charlie: 2,
      delta: 3
    },
    echo: {
      id: 'echo',
      foxtrot: 1
    }
  };
  if (graph !== exports.traverse(graph, function() {})) {
    throw new Error("traverse should have returned graph");
  }
  if (2 !== exports.traverse(graph, function(node, context) {
    return context.replace(2);
  })) {
    throw new Error("traverse should have returned 2");
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/traverse',_ion_compiler_traverse_);
    else
      _ion_compiler_traverse_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_traverse_.call(this);
  }
}).call(this)
void (function(){var _ion_compiler_traverseAst_ = function(module,exports,require){var addStatement, basicTraverse, nodes, trackVariableDeclaration, trackVariableDeclarations;

basicTraverse = require('./traverse');

nodes = require('./nodes');

addStatement = require("./astFunctions").addStatement;

trackVariableDeclaration = function(context, node, kind, name) {
  var scope, variable;
  if (name == null) {
    name = node.name;
  }
  scope = context.scope();
  if (scope == null) {
    return;
  }
  variable = {
    kind: kind,
    id: {
      type: 'Identifier',
      name: name
    },
    name: name,
    node: node,
    scope: scope
  };
  if (typeof context.variableCallback === "function") {
    context.variableCallback(variable, context);
  }
  return scope.variables[name] = variable;
};

trackVariableDeclarations = function(context, node, kind) {
  var declarator, item, _i, _j, _len, _len1, _ref, _results, _results1;
  if (kind == null) {
    kind = 'let';
  }
  if (Array.isArray(node)) {
    _results = [];
    for (_i = 0, _len = node.length; _i < _len; _i++) {
      item = node[_i];
      _results.push(trackVariableDeclarations(context, item, kind));
    }
    return _results;
  } else {
    if (node.type === 'FunctionDeclaration') {
      kind = 'const';
      if (node.id != null) {
        return trackVariableDeclarations(context, node.id, kind);
      }
    } else if (node.type === 'VariableDeclaration') {
      kind = node.kind;
      _ref = node.declarations;
      _results1 = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        declarator = _ref[_j];
        _results1.push(trackVariableDeclarations(context, declarator.id, kind));
      }
      return _results1;
    } else if (node.type === "Identifier") {
      return trackVariableDeclaration(context, node, kind);
    } else if (node.type === "ObjectPattern") {
      return basicTraverse.traverse(node, function(child, newContext) {
        var name, _ref1;
        if ((child.key != null) && (child.value != null)) {
          name = (_ref1 = child.key.value) != null ? _ref1 : child.key.name;
          trackVariableDeclaration(context, child, kind, name);
          return newContext.skip();
        }
      });
    } else if (node.type === "ArrayPattern") {
      return basicTraverse.traverse(node, function(child, newContext) {
        if (child.type === 'Identifier') {
          trackVariableDeclaration(context, child, kind);
          return newContext.skip();
        }
      });
    }
  }
};

exports.traverse = function(program, enterCallback, exitCallback, variableCallback, previousContext) {
  var ourEnter, ourExit;
  ourEnter = function(node, context) {
    var nodeInfo, _ref, _ref1, _ref2;
    if (context.variableCallback == null) {
      context.variableCallback = variableCallback;
    }
    if (context.scopeStack == null) {
      context.scopeStack = [];
    }
    if (context.scope == null) {
      context.scope = function() {
        return this.scopeStack[this.scopeStack.length - 1];
      };
    }
    if (context.ancestorNodes == null) {
      context.ancestorNodes = [];
    }
    if (context.getAncestor == null) {
      context.getAncestor = function(predicate) {
        var ancestor, _i, _ref;
        _ref = this.ancestorNodes;
        for (_i = _ref.length - 1; _i >= 0; _i += -1) {
          ancestor = _ref[_i];
          if (predicate(ancestor)) {
            return ancestor;
          }
        }
        return null;
      };
    }
    if (context.rootNode == null) {
      context.rootNode = function() {
        return this.ancestorNodes[0];
      };
    }
    if (context.parentNode == null) {
      context.parentNode = function() {
        return this.ancestorNodes[this.ancestorNodes.length - 1];
      };
    }
    if (context.parentScope == null) {
      context.parentScope = function() {
        return this.scopeStack[this.scopeStack.length - 2];
      };
    }
    if (context.parentReactive == null) {
      context.parentReactive = function() {
        return this._reactiveStack[this._reactiveStack.length - 1];
      };
    }
    if (context.isParentBlock == null) {
      context.isParentBlock = function() {
        var _ref, _ref1, _ref2;
        return (_ref = (_ref1 = nodes[(_ref2 = this.parentNode()) != null ? _ref2.type : void 0]) != null ? _ref1.isBlock : void 0) != null ? _ref : false;
      };
    }
    if (context.getVariableInfo == null) {
      context.getVariableInfo = function(id) {
        return this.scope().variables[id];
      };
    }
    if (context._variableCounts == null) {
      context._variableCounts = (_ref = previousContext != null ? previousContext._variableCounts : void 0) != null ? _ref : {};
    }
    if (context.getNewInternalIdentifier == null) {
      context.getNewInternalIdentifier = function(prefix) {
        var count, counts, name;
        if (prefix == null) {
          prefix = '_ref';
        }
        counts = this._variableCounts;
        count = counts[prefix] != null ? counts[prefix] : counts[prefix] = 1;
        counts[prefix]++;
        name = count === 1 ? prefix : prefix + count;
        return {
          type: 'Identifier',
          name: name
        };
      };
    }
    if (context.getAncestorChildOf == null) {
      context.getAncestorChildOf = function(ancestor) {
        var index, _ref1;
        index = this.ancestorNodes.indexOf(ancestor);
        if (index >= 0) {
          return (_ref1 = this.ancestorNodes[index + 1]) != null ? _ref1 : this.current();
        } else {
          return void 0;
        }
      };
    }
    if (context.getSharedVariableId == null) {
      context.getSharedVariableId = function(name) {
        var _ref1, _ref2;
        return (_ref1 = (_ref2 = this.getVariableInfo(name)) != null ? _ref2.id : void 0) != null ? _ref1 : this.addVariable({
          id: name,
          offset: Number.MIN_VALUE
        });
      };
    }
    if (context.addStatement == null) {
      context.addStatement = function(statement, offset, addToNode) {
        var _ref1;
        if (typeof statement === 'number') {
          _ref1 = [offset, statement], statement = _ref1[0], offset = _ref1[1];
        }
        if (addToNode == null) {
          addToNode = this.scope().node;
        }
        trackVariableDeclarations(context, statement);
        return addStatement(addToNode, statement, this.getAncestorChildOf(addToNode), offset);
      };
    }
    if (context.addVariable == null) {
      context.addVariable = function(options) {
        var variable;
        variable = this.getVariable(options);
        this.addStatement(variable, options.offset);
        return variable.declarations[0].id;
      };
    }
    if (context.getVariable == null) {
      context.getVariable = function(options) {
        var variable;
        if (options == null) {
          options = {};
        }
        if (typeof options.id === 'string') {
          options.id = {
            type: 'Identifier',
            name: options.id
          };
        }
        if (options.id == null) {
          options.id = this.getNewInternalIdentifier(options.prefix);
        }
        if (options.kind == null) {
          options.kind = 'let';
        }
        variable = {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: options.id,
              init: options.init
            }
          ],
          kind: options.kind
        };
        return variable;
      };
    }
    context.error = function(message, node) {
      var e, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      if (node == null) {
        node = this.current();
      }
      e = new Error(message);
      e.line = (_ref1 = node.loc) != null ? (_ref2 = _ref1.start) != null ? _ref2.line : void 0 : void 0;
      e.column = ((_ref3 = node.loc) != null ? (_ref4 = _ref3.start) != null ? _ref4.column : void 0 : void 0) + 1;
      e.lineEnd = (_ref5 = node.loc) != null ? (_ref6 = _ref5.end) != null ? _ref6.line : void 0 : void 0;
      e.columnEnd = ((_ref7 = node.loc) != null ? (_ref8 = _ref7.end) != null ? _ref8.column : void 0 : void 0) + 1;
      return e;
    };
    if (node.type != null) {
      nodeInfo = nodes[node.type];
      if ((nodeInfo != null ? nodeInfo.reactive : void 0) != null) {
        (context._reactiveStack != null ? context._reactiveStack : context._reactiveStack = []).push(context.reactive);
        context.reactive = nodeInfo.reactive;
      }
      if (nodeInfo != null ? nodeInfo.newScope : void 0) {
        context.scopeStack.push({
          variables: Object.create((_ref1 = (_ref2 = context.scope()) != null ? _ref2.variables : void 0) != null ? _ref1 : {}),
          node: node
        });
      }
      if (Array.isArray(node.body)) {
        trackVariableDeclarations(context, node.body);
      }
      if (nodeInfo != null ? nodeInfo.isFunction : void 0) {
        trackVariableDeclarations(context, node.params, nodeInfo.paramKind);
      } else if (node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
        trackVariableDeclarations(context, node.left);
      } else if (node.type === 'ObjectExpression') {
        trackVariableDeclarations(context, node.properties);
      }
      if (typeof enterCallback === "function") {
        enterCallback(node, context);
      }
      return context.ancestorNodes.push(node);
    }
  };
  ourExit = function(node, context) {
    var nodeInfo;
    if (node.type != null) {
      nodeInfo = nodes[node.type];
      if ((nodeInfo != null ? nodeInfo.reactive : void 0) != null) {
        context.reactive = context._reactiveStack.pop();
      }
      context.ancestorNodes.pop();
      if (typeof exitCallback === "function") {
        exitCallback(node, context);
      }
      if (nodeInfo != null ? nodeInfo.newScope : void 0) {
        return context.scopeStack.pop();
      }
    }
  };
  return basicTraverse.traverse(program, ourEnter, ourExit);
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/traverseAst',_ion_compiler_traverseAst_);
    else
      _ion_compiler_traverseAst_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_traverseAst_.call(this);
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
//@ sourceMappingURL=./Array.map
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
//@ sourceMappingURL=./index.map
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
//@ sourceMappingURL=./mergePatch.map
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
//@ sourceMappingURL=./ArrayExpression.map
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
void (function(){var _ion_test_immediateTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var templates = [
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    init: {
                                        type: 'Literal',
                                        value: 1
                                    }
                                },
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'b'
                                    },
                                    init: {
                                        type: 'Literal',
                                        value: 2
                                    }
                                },
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'c'
                                    },
                                    init: {
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
                            kind: 'const'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'c'
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            3
        ],
        [
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
                                            name: 'a'
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
                                            type: 'Identifier',
                                            name: 'b'
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
                    templates: templates,
                    test: test
                });
            }),
            [],
            {
                a: 1,
                b: 2
            }
        ],
        [
            ion.template(function () {
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
                                properties: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 2
                                        }
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'Literal',
                                        value: 1
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
                                        type: 'Literal',
                                        value: 2
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
                                properties: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'a'
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '>',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'Literal',
                                                        value: 10
                                                    }
                                                }]
                                        },
                                        alternate: {
                                            type: 'IfStatement',
                                            test: {
                                                type: 'BinaryExpression',
                                                operator: '>',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                }
                                            },
                                            consequent: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'Literal',
                                                            value: 20
                                                        }
                                                    }]
                                            },
                                            alternate: null
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                2,
                20
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Literal',
                                                value: 1
                                            },
                                            {
                                                type: 'Literal',
                                                value: 2
                                            },
                                            {
                                                type: 'Literal',
                                                value: 3
                                            }
                                        ]
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
                                        name: 'x'
                                    },
                                    init: {
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'item'
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'index'
                                                        }
                                                    }
                                                }
                                            }]
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                3,
                5
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a'
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
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 2
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 3
                                                },
                                                kind: 'init'
                                            }
                                        ]
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
                                        name: 'x'
                                    },
                                    init: {
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        }
                                                    }
                                                }
                                            }]
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                'a1',
                'b2',
                'c3'
            ]
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'object'
                                    },
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [{
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                value: {
                                                    type: 'ObjectExpression',
                                                    properties: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'b'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: 1
                                                            },
                                                            kind: 'init'
                                                        }]
                                                },
                                                kind: 'init'
                                            }]
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'object'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'a'
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'b'
                                }
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'Literal',
                                    value: false
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: 1
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            2
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'BinaryExpression',
                                    operator: '!=',
                                    left: {
                                        type: 'Literal',
                                        value: null
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: null
                                    }
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: null
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            2
        ],
        [
            ion.template(function () {
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
                                        type: 'Literal',
                                        value: null
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
                                        type: 'Literal',
                                        value: 2
                                    }
                                }],
                            kind: 'let'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'UnaryExpression',
                                        operator: '?',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a'
                                        }
                                    },
                                    {
                                        type: 'UnaryExpression',
                                        operator: '?',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                false,
                true
            ]
        ],
        [
            ion.template(function () {
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
                                        name: 'Math'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'min'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 1
                                    },
                                    {
                                        type: 'Literal',
                                        value: 2
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
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
                                            name: 'Math'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'min'
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'call'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: null
                                    },
                                    {
                                        type: 'Literal',
                                        value: 1
                                    },
                                    {
                                        type: 'Literal',
                                        value: 2
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'NewExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'Date'
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 2011
                                    },
                                    {
                                        type: 'Literal',
                                        value: 10
                                    },
                                    {
                                        type: 'Literal',
                                        value: 5
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            new Date(2011, 10, 5)
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: /foo/
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            /foo/
        ],
        [
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
                                            name: 'x'
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
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        kind: 'init'
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                        value: {
                                            type: 'ObjectExpression',
                                            objectType: {
                                                type: 'ArrayExpression',
                                                elements: []
                                            },
                                            properties: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'items'
                                                            },
                                                            init: {
                                                                type: 'ArrayExpression',
                                                                elements: [
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 3
                                                                    },
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 2
                                                                    },
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 1
                                                                    }
                                                                ]
                                                            }
                                                        }],
                                                    kind: 'let'
                                                },
                                                {
                                                    type: 'ForOfStatement',
                                                    left: {
                                                        type: 'VariableDeclaration',
                                                        declarations: [{
                                                                type: 'VariableDeclarator',
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'item'
                                                                },
                                                                init: null
                                                            }],
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
                                                                    type: 'BinaryExpression',
                                                                    operator: '*',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'item'
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 2
                                                                    }
                                                                }
                                                            }]
                                                    },
                                                    remove: null
                                                }
                                            ]
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
                    templates: templates,
                    test: test
                });
            }),
            [],
            {
                x: 1,
                y: 2,
                z: [
                    6,
                    4,
                    2
                ]
            }
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!=',
                                            left: {
                                                type: 'Literal',
                                                value: null
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null
                                            }
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: null
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    },
                                    {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!=',
                                            left: {
                                                type: 'UnaryExpression',
                                                operator: 'void',
                                                prefix: true,
                                                argument: {
                                                    type: 'Literal',
                                                    value: 0
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null
                                            }
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: 'void',
                                            prefix: true,
                                            argument: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: 2
                                        }
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
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
                    templates: templates,
                    test: test
                });
            }),
            [{
                    a: 1,
                    b: 2
                }],
            3
        ],
        [
            ion.template(function (type) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'NewExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'type'
                                    },
                                    arguments: []
                                },
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'position'
                                        },
                                        value: {
                                            type: 'ObjectExpression',
                                            properties: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 10
                                                    },
                                                    kind: 'init'
                                                }]
                                        },
                                        kind: 'init'
                                    }]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    type: type,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [function () {
                    this.position = {
                        x: 1,
                        y: 2
                    };
                }],
            {
                position: {
                    x: 10,
                    y: 2
                }
            }
        ],
        [
            ion.template(function (input, output) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'output'
                            },
                            value: {
                                type: 'ObjectExpression',
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'e'
                                        },
                                        value: {
                                            type: 'BinaryExpression',
                                            operator: '+',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'input'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'input'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                }
                                            }
                                        },
                                        kind: 'init'
                                    }]
                            },
                            kind: 'init'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'output'
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    input: input,
                    output: output,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [
                {
                    a: 1,
                    b: 2
                },
                {
                    c: 3,
                    d: 4
                }
            ],
            {
                c: 3,
                d: 4,
                e: 3
            }
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'ion'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'patch'
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            ion.patch
        ]
    ];
var test = exports.test = function () {
        for (var _i = 0; _i < templates.length; _i++) {
            var _ref2 = templates[_i];
            var templateType = _ref2[0];
            var args = _ref2[1];
            var expected = _ref2[2];
            if (expected != null) {
                var template = templateType.apply(this, args);
                var reactiveResult = null;
                var watcher = function (value) {
                    return reactiveResult = value;
                };
                template.watch(watcher);
                try {
                    if (!(reactiveResult === expected || JSON.stringify(reactiveResult) === JSON.stringify(expected)))
                        throw new Error('Assertion Failed: (reactiveResult is expected or JSON.stringify(reactiveResult) is JSON.stringify(expected))');
                } catch (e) {
                    console.log(reactiveResult, '!==', expected);
                    throw e;
                }
                template.unwatch(watcher);
                if (!(reactiveResult === void 0))
                    throw new Error('Assertion Failed: (reactiveResult is undefined)');
            }
        }
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/immediateTemplates',_ion_test_immediateTemplates_);
    else
      _ion_test_immediateTemplates_.call(this, module, exports, require);
  }
  else {
    _ion_test_immediateTemplates_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./immediateTemplates.map
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