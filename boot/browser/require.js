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
        _results.push(template.observe(function(templateResult) {
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
  window.addEventListener((global.Polymer ? 'polymer-ready' : 'load'), function(e) {
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