void (function(){var _ion_runtime_MemberExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var MemberExpression = ion.defineClass({
        name: 'MemberExpression',
        properties: {
            activate: function () {
                MemberExpression.super.prototype.activate.apply(this, arguments);
                this.objectExpression = this.objectExpression != null ? this.objectExpression : this.context.createRuntime(this.object);
                this.propertyExpression = this.propertyExpression != null ? this.propertyExpression : this.context.createRuntime(this.computed ? this.property : this.property.name);
                this.propertyExpression.watch(this.propertyWatcher = this.propertyWatcher != null ? this.propertyWatcher : ion.bind(function (propertyValue) {
                    this.propertyValue = propertyValue;
                    this.updateValue();
                }, this));
                this.objectExpression.watch(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : ion.bind(function (objectValue) {
                    this.objectValue = objectValue;
                    this.updateValue();
                }, this));
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.objectExpression.unwatch(this.objectWatcher);
                this.propertyExpression.unwatch(this.propertyWatcher);
            },
            updateValue: function () {
                var value = void 0;
                if (this.objectValue != null && this.propertyValue != null) {
                    value = this.objectValue[this.propertyValue];
                }
                this.setValue(value);
                if (this.observedObject !== this.objectValue || this.observedProperty !== this.propertyValue) {
                    this.observedObject = this.objectValue;
                    this.observedProperty = this.propertyValue;
                    this.objectObserver != null ? this.objectObserver() : void 0;
                    if (this.objectValue != null) {
                        this.objectObserver = ion.observe(this.objectValue, ion.bind(function (changes) {
                            this.updateValue();
                        }, this), this.propertyValue);
                    }
                }
            },
            setMemberValue: function (value) {
                if (this.objectValue != null && this.propertyValue != null) {
                    this.objectValue[this.propertyValue] = value;
                }
            }
        }
    }, DynamicExpression);
module.exports = exports = MemberExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/MemberExpression',_ion_runtime_MemberExpression_);
    else
      _ion_runtime_MemberExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_MemberExpression_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./MemberExpression.map