void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref;
_ref = require('./');
var DynamicExpression = _ref.DynamicExpression;
var ArrayExpression = _ref.ArrayExpression;
var Factory = _ref.Factory;
var CallExpression = ion.defineClass({
        name: 'CallExpression',
        properties: {
            args: null,
            activate: function () {
                CallExpression.super.prototype.activate.apply(this, arguments);
                this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
                this.unobserveCallee = this.calleeExpression.observe(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : ion.bind(function (value) {
                    if (this.isActive && !(value != null) && !this.existential && (this.loc != null ? this.loc.start.source : void 0) != null) {
                        console.warn('Function is ' + value + ' (' + Factory.toCode(this.callee) + ') (' + this.loc.start.source + ':' + this.loc.start.line + ':' + (this.loc.start.column + 1) + ')');
                    }
                    this.calleeValue = value;
                    this.queueEvaluate();
                }, this));
                this.unobserveCalleeObject = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.observe(this.thisWatcher = this.thisWatcher != null ? this.thisWatcher : ion.bind(function (thisArg) {
                    if (thisArg !== this.thisArg) {
                        this.unobserveThis != null ? this.unobserveThis() : void 0;
                        this.unobserveThis = null;
                        this.thisArg = thisArg;
                        if (!(this.calleeValue != null ? this.calleeValue.template : void 0)) {
                            if (this.calleeExpression.objectExpression.deep) {
                                this.unobserveThis = ion.patch.watch(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function (patch) {
                                    this.queueEvaluate();
                                }, this));
                            } else {
                                this.unobserveThis = ion.observe(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function () {
                                    this.queueEvaluate();
                                }, this));
                            }
                        }
                        this.queueEvaluate();
                    }
                }, this)) : void 0;
                this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
                    type: 'ArrayExpression',
                    elements: this.arguments,
                    observeElements: !(this.calleeValue != null ? this.calleeValue.template : void 0)
                });
                this.unobserveArguments = this.argumentExpressions.observe(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
                    this.argumentsValue = value;
                    this.queueEvaluate();
                }, this));
            },
            deactivate: function () {
                CallExpression.super.prototype.deactivate.apply(this, arguments);
                this.cancelQueuedEvaluate != null ? this.cancelQueuedEvaluate() : void 0;
                this.unobserveCallee();
                this.unobserveArguments();
                this.unobserveCalleeObject != null ? this.unobserveCalleeObject() : void 0;
                this.unobserveThis != null ? this.unobserveThis() : void 0;
                this.unobserveTemplate != null ? this.unobserveTemplate() : void 0;
            },
            queueEvaluate: function () {
                if (!(this.hasEvaluated != null)) {
                    this.evaluate();
                } else if (!(this.cancelQueuedEvaluate != null)) {
                    this.cancelQueuedEvaluate = ion.nextCheck(this.boundEvaluate = this.boundEvaluate != null ? this.boundEvaluate : this.evaluate.bind(this));
                }
            },
            evaluate: function () {
                this.cancelQueuedEvaluate = null;
                if (!(this.isActive && this.calleeValue != null && this.argumentsValue != null && (this.thisArg != null || !(this.calleeExpression.objectExpression != null)))) {
                    return;
                }
                this.hasEvaluated = true;
                var value = void 0;
                if (this.unobserveTemplate != null && this.lastCalleeValue === this.calleeValue && this.lastThisArg === this.thisArg) {
                    {
                        var _ref2 = this.argumentsValue;
                        for (var _i = 0; _i < _ref2.length; _i++) {
                            var index = _i;
                            var arg = _ref2[_i];
                            if (this.lastArgumentsValue[index] !== arg) {
                                this.lastArgumentsValue[index] = arg;
                            }
                        }
                    }
                    return;
                }
                this.lastCalleeValue = this.calleeValue;
                this.lastArgumentsValue = this.argumentsValue;
                this.lastThisArg = this.thisArg;
                this.unobserveTemplate != null ? this.unobserveTemplate() : void 0;
                this.unobserveTemplate = null;
                try {
                    if (this.calleeValue.template) {
                        this.template = this.calleeValue.apply(this.thisArg, this.argumentsValue);
                        this.unobserveTemplate = this.template.observe(this.templateWatcher = this.templateWatcher != null ? this.templateWatcher : this.setValue.bind(this));
                    } else {
                        if (this.type === 'NewExpression') {
                            value = ion.create(this.calleeValue, this.argumentsValue);
                        } else {
                            value = this.calleeValue.apply(this.thisArg, this.argumentsValue);
                        }
                        this.setValue(value);
                    }
                } catch (e) {
                    var start = this.loc.start;
                    console.error('Call Error at ' + start.source + ' (line:' + start.line + ',column:' + start.column + ')');
                    console.error(e);
                    throw e;
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
//# sourceMappingURL=./CallExpression.map