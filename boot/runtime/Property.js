void (function(){var _ion_runtime_Property_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var Property = ion.defineClass({
        name: 'Property',
        properties: {
            activate: function () {
                Property.super.prototype.activate.apply(this, arguments);
                this.keyExpression = this.keyExpression != null ? this.keyExpression : this.context.createRuntime(this.computed ? this.key : this.key.name != null ? this.key.name : this.key.value);
                this.valueExpression = this.valueExpression != null ? this.valueExpression : this.context.createRuntime(this.value);
                this.keyExpression.watch(this.keyWatcher = this.keyWatcher != null ? this.keyWatcher : ion.bind(function (key) {
                    if (key != null && this.valueExpression.setLeftValue != null) {
                        var currentValue = this.context.output ? ion.get(this.context.output, key) : this.context.get(key);
                        if (currentValue != null) {
                            this.valueExpression.setLeftValue(currentValue);
                        }
                    }
                    this.restoreProperty();
                    this.keyValue = key;
                    this.setProperty();
                }, this));
                this.valueExpression.watch(this.valueWatcher = this.valueWatcher != null ? this.valueWatcher : ion.bind(function (value) {
                    this.valueValue = value;
                    this.setProperty();
                }, this));
                if (this.bi) {
                    ion.observe(this.context.output, this.contextObserver = this.contextObserver != null ? this.contextObserver : ion.bind(function () {
                        var value = ion.get(this.context.output, this.keyValue);
                        if (value !== void 0) {
                            this.valueExpression.setMemberValue(value);
                        }
                    }, this), this.keyValue);
                }
            },
            deactivate: function () {
                Property.super.prototype.deactivate.apply(this, arguments);
                this.restoreProperty();
                ion.unobserve(this.context.output, this.contextObserver, this.leftValue);
                this.keyExpression.unwatch(this.keyWatcher);
                this.valueExpression.unwatch(this.valueWatcher);
            },
            restoreProperty: function () {
                if (this.originalKey != null) {
                    ion.set(this.context.output, this.originalKey, this.originalValue);
                    this.originalKey = void 0;
                    this.originalValue = void 0;
                }
            },
            setProperty: function (key, value) {
                if (key == null)
                    key = this.keyValue;
                if (value == null)
                    value = this.valueValue;
                var explicitUndefined = this.value.operator === 'void';
                if (key != null && (value !== void 0 || explicitUndefined)) {
                    var currentValue = ion.get(this.context.output, key);
                    if (explicitUndefined || currentValue !== value) {
                        this.originalKey = this.originalKey != null ? this.originalKey : key;
                        this.originalValue = this.originalValue != null ? this.originalValue : currentValue;
                        ion.set(this.context.output, key, value, !explicitUndefined);
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
//@ sourceMappingURL=./Property.map