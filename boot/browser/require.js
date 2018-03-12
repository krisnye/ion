//!browser
(function() {
  var ensureLoaded, getCompiledCode, loaded, modules, normalize, require, resolve, used;
  // define global if needed.
  if (this.global == null) {
    this.global = (function() {
      return this;
    })();
  }
  // require already exists.
  if (this.require != null) {
    return;
  }
  used = {};
  // This provides the require function in the browser
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
    used[path] = true; // mark as used
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
    var id, results1;
    results1 = [];
    for (id in modules) {
      results1.push(require(id));
    }
    return results1;
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
  // this may cache compiled files in session for performance.
  getCompiledCode = function(scriptElement) {
    var compiledCode, compiler, source;
    source = scriptElement.innerHTML;
    // check session storage if we've already compiled this script.
    compiledCode = sessionStorage.getItem(source);
    if (compiledCode == null) {
      console.log('checking source code, didnt find it, so compiling');
      compiler = require('ion/compiler');
      compiledCode = compiler.compile(source);
      sessionStorage.setItem(source, compiledCode);
    }
    return compiledCode;
  };
  require.compileScripts = function() {
    var compiledCode, compiledWrapper, ion, j, len, ref, removeLastResult, result, scriptElement, template;
    ion = require('ion');
    ref = document.querySelectorAll("script[type=ion]");
    for (j = 0, len = ref.length; j < len; j++) {
      scriptElement = ref[j];
      // we wrap all ion scripts to avoid global variable leaks
      compiledCode = getCompiledCode(scriptElement);
      compiledWrapper = eval(`(function(){ ${compiledCode} })`);
      // 'this' is the scriptElement within the scripts scope instead of the window
      result = compiledWrapper.call(scriptElement);
      if (result != null) {
        if (typeof result.template) {
          template = result.call(scriptElement);
          removeLastResult = null;
          template.observe(function(templateResult) {
            var container;
            if (typeof removeLastResult === "function") {
              removeLastResult();
            }
            removeLastResult = null;
            if (templateResult != null) {
              container = scriptElement.parentElement;
              if (global.Polymer) {
                container = Polymer.dom(container);
              }
              container.appendChild(templateResult);
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
  // since this is the only code guaranteed to run on loading, we also try to compile script tags here.
  if (global.window != null) {
    loaded = false;
    ensureLoaded = function() {
      if (!loaded) {
        loaded = true;
        return require.compileScripts();
      }
    };
    window.addEventListener('load', ensureLoaded);
    return window.addEventListener('WebComponentsReady', ensureLoaded);
  }
})();
