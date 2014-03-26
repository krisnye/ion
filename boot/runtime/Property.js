'use strict';
const ion = require('../'), Statement = require('./Statement');
const Property = ion.defineClass({
        id: 'Property',
        properties: {
            activate: function () {
                Property.super.prototype.activate.apply(this, arguments);
                this.keyExpression = this.keyExpression != null ? this.keyExpression : this.context.createRuntime(this.computed ? this.key : this.key.name);
                this.keyExpression.watch(this.keyWatcher = this.keyWatcher != null ? this.keyWatcher : function (key) {
                    this.keyValue = key;
                    this._assign();
                }.bind(this));
                this.valueExpression = this.valueExpression != null ? this.valueExpression : this.context.createRuntime(this.value);
                this.valueExpression.watch(this.valueWatcher = this.valueWatcher != null ? this.valueWatcher : function (value) {
                    this.valueValue = value;
                    this._assign();
                }.bind(this));
            },
            deactivate: function () {
                Property.super.prototype.deactivate.apply(this, arguments);
                this.keyExpression.unwatch(this.keyWatcher);
                this.valueExpression.unwatch(this.valueWatcher);
            },
            _assign: function () {
                if (this.keyValue != null && this.valueValue !== void 0) {
                    let currentValue = ion.get(this.context.output, this.keyValue);
                    if (currentValue !== this.valueValue) {
                        ion.set(this.context.output, this.keyValue, this.valueValue);
                    }
                }
            }
        }
    }, Statement);
module.exports = exports = Property;