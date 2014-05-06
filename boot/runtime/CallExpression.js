void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression'), ArrayExpression = require('./ArrayExpression');
var CallExpression = ion.defineClass({
        name: 'CallExpression',
        properties: {
            args: null,
            activate: function () {
                CallExpression.super.prototype.activate.apply(this, arguments);
                this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
                this.calleeExpression.watch(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : function (value) {
                    this.calleeValue = value;
                    var thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
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
                    observeElements: !(this.calleeValue != null ? this.calleeValue.template : void 0)
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
                if (this.template != null) {
                    this.template.unwatch(this.templateWatcher);
                    this.template.deactivate();
                    delete this.template;
                }
            },
            evaluate: function () {
                var value = void 0;
                if (this.calleeValue != null && this.argumentsValue != null) {
                    try {
                        if (this.calleeValue.template) {
                            if (this.template != null) {
                                this.template.unwatch(this.templateWatcher);
                            }
                            this.template = ion.create(this.calleeValue, this.argumentsValue);
                            this.template.activate();
                            this.template.watch(this.templateWatcher = this.templateWatcher != null ? this.templateWatcher : this.setValue.bind(this));
                        } else {
                            if (this.type === 'NewExpression') {
                                value = ion.create(this.calleeValue, this.argumentsValue);
                            } else {
                                value = this.calleeValue.apply(this.thisArg, this.argumentsValue);
                            }
                            this.setValue(value);
                        }
                    } catch (e) {
                        console.error(e.stack != null ? e.stack : e);
                    }
                }
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