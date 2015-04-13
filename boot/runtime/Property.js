void (function(){var _ion_runtime_Property_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var Property = ion.defineClass({
        name: 'Property',
        properties: {
            activate: function () {
                Property.super.prototype.activate.apply(this, arguments);
                this.keyExpression = this.keyExpression != null ? this.keyExpression : this.context.createRuntime(this.computed ? this.key : this.key.name != null ? this.key.name : this.key.value);
                this.valueExpression = this.valueExpression != null ? this.valueExpression : this.context.createRuntime(this.value);
                this.unobserveKey = this.keyExpression.observe(this.keyWatcher = this.keyWatcher != null ? this.keyWatcher : ion.bind(function (key) {
                    if (key != null && this.valueExpression.setLeftValue != null) {
                        var currentValue = this.context.output ? this.context.output != null ? this.context.output[key] : void 0 : this.context.get(key);
                        if (currentValue != null) {
                            this.valueExpression.setLeftValue(currentValue);
                        }
                    }
                    this.keyValue = key;
                    this.setProperty();
                }, this));
                this.unobserveValue = this.valueExpression.observe(this.valueWatcher = this.valueWatcher != null ? this.valueWatcher : ion.bind(function (value) {
                    this.valueValue = value;
                    this.setProperty();
                }, this));
            },
            deactivate: function () {
                Property.super.prototype.deactivate.apply(this, arguments);
                this.unobserveKey();
                this.unobserveValue();
            },
            setProperty: function (key, value) {
                if (key == null)
                    key = this.keyValue;
                if (value == null)
                    value = this.valueValue;
                if (this.hasOwnProperty('keyValue') && this.hasOwnProperty('valueValue')) {
                    if (key != null && this.context.output != null) {
                        var currentValue = this.context.output[key];
                        if (currentValue !== value && (value !== void 0 || this.valueExpression.operator === 'void')) {
                            this.context.output[key] = value;
                        }
                    }
                }
            }
        }
    }, Statement);
module.exports = exports = Property;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Property',_ion_runtime_Property_);
    else
      _ion_runtime_Property_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Property_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Property.map