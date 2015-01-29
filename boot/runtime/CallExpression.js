void (function(){var _ion_runtime_CallExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref = require('./');
var DynamicExpression = _ref.DynamicExpression;
var ArrayExpression = _ref.ArrayExpression;
var Factory = _ref.Factory;
var _ref2 = {};
{
    _ref2.args = null;
    _ref2.activate = function () {
        CallExpression.super.prototype.activate.apply(this, arguments);
        this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
        this.calleeExpression.watchValue(this.calleeWatcher = this.calleeWatcher != null ? this.calleeWatcher : ion.bind(function (value) {
            if (this.isActive && !(value != null) && !this.existential && (this.loc != null ? this.loc.start.source : void 0) != null) {
                console.warn('Function is ' + value + ' (' + Factory.toCode(this.callee) + ') (' + this.loc.start.source + ':' + this.loc.start.line + ':' + (this.loc.start.column + 1) + ')');
            }
            this.calleeValue = value;
            var thisArg = this.calleeExpression.objectExpression != null ? this.calleeExpression.objectExpression.value : void 0;
            if (thisArg !== this.thisArg) {
                ion.unobserve(this.thisarg, this.thisObserver);
                this.unwatch != null ? this.unwatch() : void 0;
                this.thisArg = thisArg;
                if (!(this.calleeValue != null ? this.calleeValue.template : void 0)) {
                    var deep = Array.isArray(thisArg);
                    if (deep) {
                        this.unwatch = ion.patch.watch(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function (patch) {
                            this.evaluate();
                        }, this));
                    } else {
                        ion.observe(thisArg, this.thisObserver = this.thisObserver != null ? this.thisObserver : ion.bind(function () {
                            this.evaluate();
                        }, this));
                    }
                }
            }
            this.evaluate();
        }, this));
        this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
            type: 'ArrayExpression',
            elements: this.arguments,
            observeElements: !(this.calleeValue != null ? this.calleeValue.template : void 0)
        });
        this.argumentExpressions.watchValue(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
            this.argumentsValue = value;
            this.evaluate();
        }, this));
    };
    _ref2.deactivate = function () {
        CallExpression.super.prototype.deactivate.apply(this, arguments);
        this.calleeExpression.unwatchValue(this.calleeWatcher);
        this.argumentExpressions.unwatchValue(this.argumentWatcher);
        if (this.template != null) {
            this.template.unwatchValue(this.templateWatcher);
            delete this.template;
        }
    };
    _ref2._evaluateInternal = function () {
        if (!(this.isActive && this.calleeValue != null && this.argumentsValue != null)) {
            return;
        }
        var value = void 0;
        if (this.calleeValue.template) {
            if (this.template != null) {
                this.template.unwatchValue(this.templateWatcher);
            }
            this.template = this.calleeValue.apply(this.thisArg, this.argumentsValue);
            this.template.watchValue(this.templateWatcher = this.templateWatcher != null ? this.templateWatcher : this.setValue.bind(this));
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
        _ref2.evaluate = function () {
            try {
                this._evaluateInternal();
            } catch (e) {
                console.error(e.stack != null ? e.stack : e);
            }
        };
    } else {
        _ref2.evaluate = function () {
            return this._evaluateInternal();
        };
    }
}
var CallExpression = ion.defineClass({
        name: 'CallExpression',
        properties: _ref2
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