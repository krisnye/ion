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