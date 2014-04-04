void (function(){var _ion_runtime_Property_ = function(module,exports,require){'use strict';
const ion = require('../'), Statement = require('./Statement');
const Property = ion.defineClass({
        id: 'Property',
        properties: {
            activate: function () {
                Property.super.prototype.activate.apply(this, arguments);
                this.keyExpression = this.keyExpression != null ? this.keyExpression : this.context.createRuntime(this.computed ? this.key : this.key.name);
                this.valueExpression = this.valueExpression != null ? this.valueExpression : this.context.createRuntime(this.value);
                this.keyExpression.watch(this.keyWatcher = this.keyWatcher != null ? this.keyWatcher : function (key) {
                    if (key != null && this.valueExpression.setLeftValue != null) {
                        let currentValue = ion.get(this.context.output, key);
                        if (currentValue != null) {
                            this.valueExpression.setLeftValue(currentValue);
                        }
                    }
                    this.restoreProperty();
                    this.keyValue = key;
                    this.setProperty();
                }.bind(this));
                this.valueExpression.watch(this.valueWatcher = this.valueWatcher != null ? this.valueWatcher : function (value) {
                    this.valueValue = value;
                    this.setProperty();
                }.bind(this));
            },
            deactivate: function () {
                Property.super.prototype.deactivate.apply(this, arguments);
                this.restoreProperty();
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
                if (key != null && value !== void 0) {
                    let currentValue = ion.get(this.context.output, key);
                    if (currentValue !== value) {
                        this.originalKey = this.originalKey != null ? this.originalKey : key;
                        this.originalValue = this.originalValue != null ? this.originalValue : currentValue;
                        ion.set(this.context.output, key, value);
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