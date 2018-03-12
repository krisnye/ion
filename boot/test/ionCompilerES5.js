void (function(){var _ion_test_ionCompilerES5_ = function(module,exports,require){var index, ion, tests;

ion = require('../');

index = require('../compiler');

tests = {
  "let x = 10": "'use strict';\nvar x = 10;",
  "let x = 10\nif foo\n    let y = 20\nif bar\n    const y = 30": "'use strict';\nvar x = 10;\nif (foo) {\n    var y = 20;\n}\nif (bar) {\n    var y = 30;\n}",
  "export class StampFilter\n    stamp: (key, object) ->\n        for name, property of key.type.properties if property.stamp\n            log(name)": "'use strict';\nvar ion = require('ion');\nvar StampFilter = ion.defineClass({\n        name: 'StampFilter',\n        stamp: function (key, object) {\n            {\n                var _ref = key.type.properties;\n                for (var name in _ref) {\n                    var property = _ref[name];\n                    if (property.stamp) {\n                        log(name);\n                    }\n                }\n            }\n        }\n    });\nmodule.exports = exports = StampFilter;",
  "let foo = bar(\n    1\n    2\n)\n.toString(\n    \"12\"\n)\n.split(' ')": "'use strict';\nvar foo = bar(1, 2).toString('12').split(' ');",
  // """
  // template -> alpha ? beta
  // """: null
  "\"\"\n    foo\n    bar #baz": "'use strict';\n'foo\\nbar #baz';",
  "let object =\n    x: 10\n    property visible:\n        get: -> true\n    y: 20": "'use strict';\nvar object = Object.defineProperties({\n        x: 10,\n        y: 20\n    }, {\n        visible: {\n            get: function () {\n                return true;\n            }\n        }\n    });",
  // """
  // template foo() ->
  // """: null
  "return {a:b ? c}\n    d": "'use strict';\nvar ion = require('ion');\nvar _ref = { a: b != null ? b : c };\nion.add(_ref, d);\nreturn _ref;",
  // """
  // template ->
  //     return []
  //         if alpha
  //             alpha
  //         "Beta"
  //         "Charlie"
  //         for x in delta
  //             x
  //             y
  //             z
  // """: null
  "template (model) ->\n    return (e) ->\n        let {listModel} = model\n": "'use strict';\nvar ion = require('ion');\nion.template(function (model) {\n    return ion.createRuntime({\n        type: 'Template',\n        id: null,\n        body: [{\n                type: 'ReturnStatement',\n                argument: {\n                    type: 'Function',\n                    context: true,\n                    value: function (_context) {\n                        return function (e) {\n                            var model = _context.get('model');\n                            var _ref = model;\n                            var listModel = _ref.listModel;\n                        };\n                    }\n                },\n                order: '0'\n            }],\n        bound: false\n    }, {\n        this: this,\n        model: model\n    }, null);\n});",
  // """
  // JSON.stringify(deep object)
  // """: null
  "foo:\n    a: 1": {
    line: 1,
    column: 1
  },
  "style.sheets:\n    [module.id]: \"\"": {
    line: 1,
    column: 1
  }
};

// TODO: Fix this bug in the parser.
// """
// for let i = 0; i < 100; i += 10
//     i
// """: null

// """
// template -> {a:1,b:[2,3]}
// """: """
// 'use strict';
// var ion = require('ion');
// ion.template(function () {
//     return ion.createRuntime({
//         type: 'Template',
//         id: null,
//         body: [{
//                 type: 'ReturnStatement',
//                 argument: {
//                     type: 'Literal',
//                     value: {
//                         a: 1,
//                         b: [
//                             2,
//                             3
//                         ]
//                     }
//                 },
//                 order: '0'
//             }],
//         bound: false
//     }, { this: this }, null);
// });
// """
// """
// let input = PaperInput()
//     "iron-select"(e) ->
//         console.log('select', e)
// """: null    
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
      index.compile(input, ion.patch({
        loc: false,
        source: 'ionCompilerES5.js',
        debug: true
      }, options));
    } else if (typeof expected === 'object') {
      // expected to throw an error
      error = null;
      try {
        index.compile(input, options);
      } catch (error1) {
        e = error1;
        error = e;
// check equivalent fields
        for (key in expected) {
          value = expected[key];
          if (value !== e[key]) {
            throw new Error(`\n${JSON.stringify(e)}\n!=\n${JSON.stringify(expected)}`);
          }
        }
      }
      if (error == null) {
        throw new Error(`Expected an error: ${JSON.stringify(expected)}`);
      }
    } else {
      output = index.compile(input, options);
      if (output.trim() !== expected.trim()) {
        console.log('-Output---------------------------------------------');
        console.log(output);
        throw new Error(`\n${output}\n!=\n${expected}`);
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