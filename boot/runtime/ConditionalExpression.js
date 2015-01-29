void (function(){var _ion_runtime_ConditionalExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ConditionalExpression = ion.defineClass({
        name: 'ConditionalExpression',
        properties: {
            activate: function () {
                ConditionalExpression.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.testExpression.watchValue(this.testWatcher = this.testWatcher != null ? this.testWatcher : ion.bind(function (value) {
                    if (!this.hasOwnProperty('testValue') || Boolean(value) !== Boolean(this.testValue)) {
                        this.testValue = value;
                        if (value) {
                            this.alternateExpression != null ? this.alternateExpression.unwatchValue(this.alternateWatcher) : void 0;
                            this.alternateExpression = null;
                            this.consequentExpression = this.consequentExpression != null ? this.consequentExpression : this.context.createRuntime(this.consequent);
                            this.consequentExpression.watchValue(this.consequentWatcher = this.consequentWatcher != null ? this.consequentWatcher : ion.bind(function (value) {
                                if (this.testValue) {
                                    this.setValue(value);
                                }
                            }, this));
                        } else {
                            this.consequentExpression != null ? this.consequentExpression.unwatchValue(this.consequentWatcher) : void 0;
                            this.consequentExpression = null;
                            this.alternateExpression = this.alternateExpression != null ? this.alternateExpression : this.context.createRuntime(this.alternate);
                            this.alternateExpression.watchValue(this.alternateWatcher = this.alternateWatcher != null ? this.alternateWatcher : ion.bind(function (value) {
                                if (!this.testValue) {
                                    this.setValue(value);
                                }
                            }, this));
                        }
                    }
                }, this));
            },
            deactivate: function () {
                ConditionalExpression.super.prototype.deactivate.apply(this, arguments);
                this.testExpression.unwatchValue(this.testWatcher);
                this.consequentExpression != null ? this.consequentExpression.unwatchValue(this.consequentWatcher) : void 0;
                this.alternateExpression != null ? this.alternateExpression.unwatchValue(this.alternateWatcher) : void 0;
            }
        }
    }, DynamicExpression);
module.exports = ConditionalExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ConditionalExpression',_ion_runtime_ConditionalExpression_);
    else
      _ion_runtime_ConditionalExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ConditionalExpression_.call(this);
  }
}).call(this)
//# sourceMappingURL=./ConditionalExpression.map