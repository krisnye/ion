(function(){var _ion_test_ionVsEsprima_ = function(module,exports,require){var tests;

tests = ["x", "x.y", "1 + 2 + 3", "1 + 2 * 3", "new foo.Bar()[3].x * 3", "a ? b : c ? d : e", "[]", "[1,2,null,foo]", "const x = 2", "const x = 2\nlog(x)", "if (true)\n    x", "if (true)\n    x()\nelse\n    y()", "if (true)\n    x()\nelse if (a)\n    y()", "if (true)\n    x()\nelse if (a)\n    y()\nelse\n    z()"];

exports.test = function() {
  var esprima, esprimaResult, index, ion, ionResult, options, test, _i, _len;
  esprima = require('esprima');
  ion = require('../compiler');
  for (index = _i = 0, _len = tests.length; _i < _len; index = ++_i) {
    test = tests[index];
    options = {
      loc: test.indexOf('\n') < 0,
      raw: false,
      postprocess: false
    };
    esprimaResult = esprima.parse(test, options);
    ionResult = ion.parse(test, options);
    if (JSON.stringify(esprimaResult) !== JSON.stringify(ionResult)) {
      console.log('-Esprima---------------------------------------------');
      console.log(JSON.stringify(esprimaResult, null, '  '));
      console.log('-Ion-------------------------------------------------');
      console.log(JSON.stringify(ionResult, null, '  '));
      throw new Error("ion.parse(" + test + ") was different from esprima.parse(" + ")");
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/ionVsEsprima',_ion_test_ionVsEsprima_);
    else
      _ion_test_ionVsEsprima_.call(this, module, exports, require);
  }
  else {
    _ion_test_ionVsEsprima_.call(this);
  }
}).call(this)