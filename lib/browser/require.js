(function() {
  var modules, normalize, require, resolve, used;
  if (this.global == null) {
    this.global = (function() {
      return this;
    })();
  }
  if (this.require != null) {
    return;
  }
  used = {};
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
    used[path] = true;
    return m.exports;
  };
  modules = {};
  require.getUnusedIds = function() {
    var key, results;
    results = [];
    for (key in modules) {
      if (!used[key]) {
        results.push(key);
      }
    }
    return results;
  };
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
    var compiledWrapper, compiler, ion, removeLastResult, result, scriptElement, template, _i, _len, _ref;
    ion = require('ion');
    compiler = require('ion/compiler');
    _ref = document.querySelectorAll("script[type=ion]");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scriptElement = _ref[_i];
      compiledWrapper = eval("(function(){ " + (compiler.compile(scriptElement.innerHTML)) + " })");
      result = compiledWrapper.call(scriptElement);
      if (result != null) {
        if (typeof result.template) {
          template = result.call(scriptElement);
          removeLastResult = null;
          template.observe(function(templateResult) {
            if (typeof removeLastResult === "function") {
              removeLastResult();
            }
            removeLastResult = null;
            if (templateResult != null) {
              scriptElement.parentElement.appendChild(templateResult);
              return removeLastResult = function() {
                return scriptElement.parentElement.removeChild(templateResult);
              };
            }
          });
        } else {
          scriptElement.parentElement.appendChild(document.createTextNode(result));
        }
      }
    }
    return ion.sync();
  };
  if (typeof module === "undefined") {
    this.require = require;
  } else {
    module.exports = require;
  }
  if (global.window != null) {
    return window.addEventListener('load', function(e) {
      return require.compileScripts();
    });
  }
})();
