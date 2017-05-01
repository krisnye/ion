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
  command = "node " + __filename + " " + manifestFile;
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