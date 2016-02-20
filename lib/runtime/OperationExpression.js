void (function(){var _ion_runtime_OperationExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var OperationExpression = ion.defineClass({
        name: 'OperationExpression',
        constructor: function OperationExpression(properties) {
            OperationExpression.super.apply(this, arguments);
            if (!(this.args != null)) {
                if (this.type === 'BinaryExpression') {
                    this.args = [
                        this.left,
                        this.right
                    ];
                } else if (this.type === 'UnaryExpression') {
                    this.args = [this.argument];
                } else if (this.type === 'ConditionalExpression') {
                    this.args = [
                        this.test,
                        this.consequent,
                        this.alternate
                    ];
                }
            }
        },
        properties: {
            args: null,
            activate: function () {
                OperationExpression.super.prototype.activate.apply(this, arguments);
                this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
                    type: 'ArrayExpression',
                    elements: this.args,
                    observeElements: this.factory.observe
                });
                this.unobserve = this.argumentExpressions.observe(this.observer = this.observer != null ? this.observer : ion.bind(function (value) {
                    this.argumentValues = value;
                    this.evaluate();
                }, this));
            },
            deactivate: function () {
                OperationExpression.super.prototype.deactivate.apply(this, arguments);
                this.unobserve();
            },
            evaluate: function () {
                if (!(this.factory.evaluate != null)) {
                    throw new Error('evaluate method not defined for operation: ' + this.factory);
                }
                var value = this.factory.evaluate.apply(this.context, this.argumentValues);
                this.setValue(value);
            }
        }
    }, DynamicExpression);
module.exports = OperationExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/OperationExpression',_ion_runtime_OperationExpression_);
    else
      _ion_runtime_OperationExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_OperationExpression_.call(this);
  }
}).call(this)