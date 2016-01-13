void (function(){var _ion_runtime_ConditionalExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ConditionalExpression = ion.defineClass({
        name: 'ConditionalExpression',
        properties: {
            activate: function () {
                ConditionalExpression.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.unobserveTest = this.testExpression.observe(this.testObserver = this.testObserver != null ? this.testObserver : ion.bind(function (value) {
                    if (!this.hasOwnProperty('testValue') || Boolean(value) !== Boolean(this.testValue)) {
                        this.testValue = value;
                        this.unobserveExpression != null ? this.unobserveExpression() : void 0;
                        if (value) {
                            this.unobserveExpression = this.context.createRuntime(this.consequent).observe(this.consequentObserver = this.consequentObserver != null ? this.consequentObserver : ion.bind(function (value) {
                                if (this.testValue) {
                                    this.setValue(value);
                                }
                            }, this));
                        } else {
                            this.unobserveExpression = this.context.createRuntime(this.alternate).observe(this.alternateObserver = this.alternateObserver != null ? this.alternateObserver : ion.bind(function (value) {
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
                this.unobserveTest();
                this.unobserveExpression != null ? this.unobserveExpression() : void 0;
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