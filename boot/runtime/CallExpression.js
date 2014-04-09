void (function(){var _runtime_CallExpression_ = function(module,exports,require){'use strict';
const ion = require('../'), DynamicExpression = require('./DynamicExpression'), ArrayExpression = require('./ArrayExpression');
const CallExpression = ion.defineClass({
        id: 'CallExpression',
        properties: {
            args: null,
            activate: function () {
                CallExpression.super.prototype.activate.apply(this, arguments);
                this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
                this.calleeExpression.watch(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : function (value) {
                    this.calleeValue = value;
                    this.evaluate();
                }.bind(this));
                this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
                    type: 'ArrayExpression',
                    elements: this.arguments,
                    observeElements: true
                });
                this.argumentExpressions.watch(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : function (value) {
                    this.argumentsValue = value;
                    this.evaluate();
                }.bind(this));
            },
            deactivate: function () {
                CallExpression.super.prototype.deactivate.apply(this, arguments);
                this.calleeExpression.unwatch(this.calleeWatcher);
                this.argumentExpressions.unwatch(this.argumentWatcher);
            },
            evaluate: function () {
                let value = void 0;
                if (this.calleeValue != null && this.argumentsValue != null) {
                    if (this.type === 'NewExpression') {
                        value = ion.create(this.calleeValue, this.argumentsValue);
                    } else {
                        let thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
                        value = this.calleeValue.apply(thisArg, this.argumentsValue);
                    }
                }
                this.setValue(value);
            }
        }
    }, DynamicExpression);
module.exports = CallExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('runtime/CallExpression',_runtime_CallExpression_);
    else
      _runtime_CallExpression_.call(this, module, exports, require);
  }
  else {
    _runtime_CallExpression_.call(this);
  }
}).call(this)