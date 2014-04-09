(function(){var _ion_test_templateParams_ = function(module,exports,require){'use strict';
const ion = require('ion');
const firstTemplate = function _template(a, b) {
    if (this != null && this.constructor === _template) {
        return ion.createRuntime({
            type: 'Template',
            body: [{
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
                }],
            name: {
                type: 'Identifier',
                name: 'firstTemplate'
            }
        }, {
            require: require,
            module: module,
            exports: exports,
            a: a,
            b: b,
            firstTemplate: firstTemplate,
            test: test
        });
    }
    return a + b;
};
const test = exports.test = function () {
        let template = new firstTemplate(1, 2);
        template.activate();
        let result = null;
        template.watch(function (value) {
            return result = value;
        });
        if (!(result === 3))
            throw new Error('Assertion Failed: (result is 3)');
        template.deactivate();
        if (!(result === void 0))
            throw new Error('Assertion Failed: (result is undefined)');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/templateParams',_ion_test_templateParams_);
    else
      _ion_test_templateParams_.call(this, module, exports, require);
  }
  else {
    _ion_test_templateParams_.call(this);
  }
}).call(this)