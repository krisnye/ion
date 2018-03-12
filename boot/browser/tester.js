void (function(){var _ion_browser_tester_ = function(module,exports,require){var args, file, i, len, manifest, manifestFile, moduleId, modules, np, ref, runTest, runTests, spawnTests, utility;

runTest = function(name, test, callback) {
  var e, expectedCallbacks, key, result, value;
  expectedCallbacks = [];
  if (typeof test === 'object') {
    for (key in test) {
      value = test[key];
      expectedCallbacks = expectedCallbacks.concat(runTest(name + ' ' + key, value, callback));
    }
  } else if (typeof test === 'function') {
    // make sure this is a valid test function
    if (/^\s*function\s*[a-zA-Z_0-9]*\s*\(\s*(done)?\s*\)/.test(test.toString())) {
      expectedCallbacks.push(name);
      try {
        if (test.length === 1) {
          // asynchronous callback
          test(function(error, warning) {
            return callback(name, error, warning);
          });
        } else {
          result = test();
          callback(name, null, result);
        }
      } catch (error1) {
        e = error1;
        callback(name, e, null);
      }
    }
  }
  return expectedCallbacks;
};

exports.spawnTests = spawnTests = function(manifestFile) {
  var command;
  // command = "node#{if process.platform is 'win32' then '.cmd' else ''} #{__filename} #{manifestFile}"
  command = `node ${__filename} ${manifestFile // The windows user ought to have node in their path. Using node.cmd is yucky.
}`;
  require('../builder/utility').spawn(command);
};

exports.runTests = runTests = function(moduleIds, callback) {
  var array, duration, e, error, expectedCallbacks, getIncompleteCallbacks, handler, i, inc, key, len, module, moduleId, name, timeout, waitingForFinishTimeout, warning;
  if (!moduleIds) {
    throw new Error("moduleIds is required");
  }
  if (callback == null) {
    callback = exports.createCallback();
  }
  expectedCallbacks = {}; // name = false or true if called back
  waitingForFinishTimeout = null;
  handler = function(name, error, warning) {
    var inc;
    expectedCallbacks[name] = true;
    callback(name, error, warning);
    // maybe we are waiting for this final callback
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
      for (i = 0, len = array.length; i < len; i++) {
        name = array[i];
        if (expectedCallbacks[name] == null) {
          expectedCallbacks[name] = false;
        }
      }
    } catch (error1) {
      e = error1;
      handler(moduleId, e, null);
    }
  }
  getIncompleteCallbacks = function() {
    var value;
    return (function() {
      var results;
      results = [];
      for (name in expectedCallbacks) {
        value = expectedCallbacks[name];
        if (!value) {
          results.push(name);
        }
      }
      return results;
    })();
  };
  inc = getIncompleteCallbacks();
  if (inc.length === 0) {
    // we're done
    return callback();
  } else {
    // we have to wait for completion, but not too long
    // say... 1 second
    duration = 1000;
    error = `Timed out after ${duration} ms`;
    warning = void 0;
    timeout = () => {
      var j, len1;
      inc = getIncompleteCallbacks();
// send a timeout error for each incomplete
      for (j = 0, len1 = inc.length; j < len1; j++) {
        name = inc[j];
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

exports.createCallback = function(options, html = global.window != null) {
  var beep, blue, endColor, endLine, fails, green, log, plain, red, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, start, tests;
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
  red = (ref = options.red) != null ? ref : '\u001b[31m';
  green = (ref1 = options.green) != null ? ref1 : '\u001b[32m';
  blue = (ref2 = options.blue) != null ? ref2 : '\u001b[36m';
  endColor = (ref3 = options.endColor) != null ? ref3 : '\u001b[0m';
  plain = (ref4 = options.plain) != null ? ref4 : '';
  beep = (ref5 = options.beep) != null ? ref5 : '\u0007';
  log = (ref6 = options.log) != null ? ref6 : function(x) {
    return console.log(x);
  };
  endLine = (ref7 = options.endLine) != null ? ref7 : '';
  tests = 0;
  fails = 0;
  start = null;
  return function(name, error, result) {
    var color, finish, passed, ref10, ref8, ref9, time, title;
    if (start == null) {
      start = new Date().getTime();
    }
    if (name != null) {
      tests++;
      if (error != null) {
        fails++;
      }
      color = error != null ? red : result != null ? blue : null;
      if (color != null) {
        return log(color + name + ": " + ((ref8 = (ref9 = (ref10 = error != null ? error.stack : void 0) != null ? ref10 : error) != null ? ref9 : result) != null ? ref8 : "") + endColor + endLine);
      } else {
        return process.stdout.write('.');
      }
    } else {
      finish = new Date().getTime();
      time = finish - start;
      passed = tests - fails;
      log(endLine);
      color = passed === tests ? green : red + beep;
      log(color + (title = `${passed}/${tests} Passed (${time} ms).`) + endColor + endLine);
      if (global.document) {
        document.title = title;
      }
      return log(endLine);
    }
  };
};

// unit test ourselves!
exports.test = function() {
  var assert, tests;
  assert = {
    equal: function(a, b) {
      if (!a == b) {
        throw new Error(`${a} != ${b}`);
      }
    }
  };
  tests = {
    alpha: function() {
      throw "Failure";
    },
    beta: function() {}, // no value, passes
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
  // create a moduleid to name object
  modules = {};
  ref = manifest.files;
  for (i = 0, len = ref.length; i < len; i++) {
    file = ref[i];
    moduleId = np.join(process.cwd(), np.dirname(manifestFile), file);
    modules[file] = moduleId;
  }
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