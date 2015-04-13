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
            setArgumentValue: function (key, expression, value) {
                if (this.argumentValues[key] !== value) {
                    this.unobserveExpressionValues[key] != null ? this.unobserveExpressionValues[key]() : void 0;
                    this.argumentValues[key] = value;
                    if (this.observeElements) {
                        if (value != null) {
                            this.itemObserver = this.itemObserver != null ? this.itemObserver : ion.bind(function () {
                                this.notifyIfActive();
                            }, this);
                            var priority = this.context.depth;
                            this.unobserveExpressionValues[key] = expression.deep ? ion.patch.watch(value, this.itemObserver) : ion.observe(value, this.itemObserver, { priority: priority });
                        }
                    }
                    this.notifyIfActive();
                }
            },
            activate: function () {
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
                this.unobserveExpressionValues = [];
                this.unobserveExpressions = [];
                {
                    var _ref3 = this.expressions;
                    for (var _i2 = 0; _i2 < _ref3.length; _i2++) {
                        var key = _i2;
                        var expression = _ref3[_i2];
                        this.unobserveExpressions.push(expression.observe(this.setArgumentValue.bind(this, key, expression)));
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
                        this.unobserveExpressionValues[key] != null ? this.unobserveExpressionValues[key]() : void 0;
                    }
                }
                {
                    var _ref5 = this.unobserveExpressions;
                    for (var _i4 = 0; _i4 < _ref5.length; _i4++) {
                        var unobserve = _ref5[_i4];
                        unobserve();
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
            var unobserve = e.observe(watcher);
            if (!(JSON.stringify(result) === '[1,2]'))
                throw new Error('Assertion Failed: (JSON.stringify(result) is "[1,2]")');
            unobserve();
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
//# sourceMappingURL=./ArrayExpression.map