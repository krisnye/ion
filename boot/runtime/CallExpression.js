void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression'), ArrayExpression = require('./ArrayExpression');
var _ref = {};
{
    _ref.args = null;
    _ref.activate = function () {
        CallExpression.super.prototype.activate.apply(this, arguments);
        this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
        this.calleeExpression.watch(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : ion.bind(function (value) {
            this.calleeValue = value;
            var thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
            if (thisArg !== this.thisArg) {
                ion.unobserve(this.thisarg, this.thisObserver);
                this.thisArg = thisArg;
                if (!(this.calleeValue != null ? this.calleeValue.template : void 0)) {
                    ion.observe(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function (changes) {
                        this.evaluate();
                    }, this));
                }
            }
            this.evaluate();
        }, this));
        this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
            type: 'ArrayExpression',
            elements: this.arguments,
            observeElements: !(this.calleeValue != null ? this.calleeValue.template : void 0)
        });
        this.argumentExpressions.watch(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
            this.argumentsValue = value;
            this.evaluate();
        }, this));
    };
    _ref.deactivate = function () {
        CallExpression.super.prototype.deactivate.apply(this, arguments);
        this.calleeExpression.unwatch(this.calleeWatcher);
        this.argumentExpressions.unwatch(this.argumentWatcher);
        if (this.template != null) {
            this.template.unwatch(this.templateWatcher);
            delete this.template;
        }
    };
    _ref._evaluateInternal = function () {
        if (!(this.isActive && this.calleeValue != null && this.argumentsValue != null)) {
            return;
        }
        var value = void 0;
        if (this.calleeValue.template) {
            if (this.template != null) {
                this.template.unwatch(this.templateWatcher);
            }
            this.template = this.calleeValue.apply(this.thisArg, this.argumentsValue);
            this.template.watch(this.templateWatcher = this.templateWatcher != null ? this.templateWatcher : this.setValue.bind(this));
        } else {
            if (this.type === 'NewExpression') {
                value = ion.create(this.calleeValue, this.argumentsValue);
            } else {
                value = this.calleeValue.apply(this.thisArg, this.argumentsValue);
            }
            this.setValue(value);
        }
    };
    if (DEBUG) {
        _ref.evaluate = function () {
            try {
                this._evaluateInternal();
            } catch (e) {
                console.error(e.stack != null ? e.stack : e);
            }
        };
    } else {
        _ref.evaluate = function () {
            return this._evaluateInternal();
        };
    }
}
var CallExpression = ion.defineClass({
        name: 'CallExpression',
        properties: _ref
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
//@ sourceMappingURL=./CallExpression.map