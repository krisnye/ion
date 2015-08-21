void (function(){var _ion_runtime_MemberExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref;
_ref = require('./');
var DynamicExpression = _ref.DynamicExpression;
var Factory = _ref.Factory;
var MemberExpression = ion.defineClass({
        name: 'MemberExpression',
        properties: {
            activate: function () {
                MemberExpression.super.prototype.activate.apply(this, arguments);
                this.objectExpression = this.objectExpression != null ? this.objectExpression : this.context.createRuntime(this.object);
                this.propertyExpression = this.propertyExpression != null ? this.propertyExpression : this.context.createRuntime(this.computed ? this.property : this.property.name);
                this.unobserveProperty = this.propertyExpression.observe(this.propertyWatcher = this.propertyWatcher != null ? this.propertyWatcher : ion.bind(function (propertyValue) {
                    this.propertyValue = propertyValue;
                    this.queueUpdate();
                }, this));
                this.unobserveObject = this.objectExpression.observe(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : ion.bind(function (objectValue) {
                    this.objectValue = objectValue;
                    this.queueUpdate();
                }, this));
                this.updateValue(true);
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.unobserveObject != null ? this.unobserveObject() : void 0;
                this.unobserveObject = null;
                this.unobserveProperty != null ? this.unobserveProperty() : void 0;
                this.unobserveProperty = null;
                this.unobserveObjectValue != null ? this.unobserveObjectValue() : void 0;
                this.unobserveObjectValue = null;
            },
            queueUpdate: function () {
                ion.nextTick(this.updateValue.bind(this));
            },
            updateValue: function (force) {
                var value = void 0;
                if (this.objectValue != null) {
                    if (this.propertyValue != null) {
                        value = this.objectValue[this.propertyValue];
                    }
                } else if (this.isActive && !this.existential && (this.loc != null ? this.loc.start != null ? this.loc.start.source : void 0 : void 0) != null && this.hasOwnProperty('objectValue') && this.hasOwnProperty('propertyValue')) {
                    console.warn('Cannot read ' + Factory.toCode(this.property) + ' property of ' + this.objectValue + ' (' + Factory.toCode(this.object) + ') (' + this.loc.start.source + ':' + this.loc.start.line + ':' + (this.loc.start.column + 1) + ')');
                }
                this.setValue(value);
                if (this.observedObject !== this.objectValue || this.observedProperty !== this.propertyValue) {
                    this.observedObject = this.objectValue;
                    this.observedProperty = this.propertyValue;
                    this.unobserveObjectValue != null ? this.unobserveObjectValue() : void 0;
                    this.unobserveObjectValue = null;
                    if (this.objectValue != null) {
                        this.unobserveObjectValue = ion.observe(this.objectValue, ion.bind(function (changes) {
                            this.queueUpdate();
                        }, this), { property: this.propertyValue });
                    }
                }
            },
            setMemberValue: function (value) {
                if (this.objectValue != null && this.propertyValue != null) {
                    this.objectValue[this.propertyValue] = value;
                }
            }
        },
        test: function () {
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
//# sourceMappingURL=./MemberExpression.map