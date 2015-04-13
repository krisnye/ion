void (function(){var _ion_runtime_MemberExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref = require('./');
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
                    this.updateValue();
                }, this));
                this.unobserveObject = this.objectExpression.observe(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : ion.bind(function (objectValue) {
                    this.objectValue = objectValue;
                    this.updateValue();
                }, this));
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.unobserveObject();
                this.unobserveProperty();
                this.unobserveObjectValue != null ? this.unobserveObjectValue() : void 0;
            },
            updateValue: function () {
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
                    if (this.objectValue != null) {
                        this.unobserveObjectValue = ion.observe(this.objectValue, ion.bind(function (changes) {
                            this.updateValue();
                        }, this), {
                            property: this.propertyValue,
                            priority: this.context.depth
                        });
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