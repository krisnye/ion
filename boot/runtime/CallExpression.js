void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
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
                    let thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
                    if (thisArg !== this.thisArg) {
                        ion.unobserve(this.thisarg, this.thisObserver);
                        this.thisArg = thisArg;
                        ion.observe(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : function (changes) {
                            this.evaluate();
                        }.bind(this));
                    }
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
                        value = this.calleeValue.apply(this.thisArg, this.argumentsValue);
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
      require.register('ion/runtime/CallExpression',_ion_runtime_CallExpression_);
    else
      _ion_runtime_CallExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_CallExpression_.call(this);
  }
}).call(this)