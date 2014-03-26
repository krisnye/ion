'use strict';
const ion = require('../'), DynamicExpression = require('./DynamicExpression');
const MemberExpression = ion.defineClass({
        id: 'MemberExpression',
        properties: {
            activate: function () {
                MemberExpression.super.prototype.activate.apply(this, arguments);
                this.objectExpression = this.objectExpression != null ? this.objectExpression : this.context.createRuntime(this.object);
                this.objectExpression.watch(this.objectWatcher = this.objectWatcher != null ? this.objectWatcher : function (objectValue) {
                    this.objectValue = objectValue;
                    this.updateValue();
                }.bind(this));
                this.propertyExpression = this.propertyExpression != null ? this.propertyExpression : this.context.createRuntime(this.computed ? this.property : this.property.name);
                this.propertyExpression.watch(this.propertyWatcher = this.propertyWatcher != null ? this.propertyWatcher : function (propertyValue) {
                    this.propertyValue = propertyValue;
                    this.updateValue();
                }.bind(this));
            },
            deactivate: function () {
                MemberExpression.super.prototype.deactivate.apply(this, arguments);
                this.objectExpression.unwatch(this.objectWatcher);
                this.propertyExpression.unwatch(this.propertyWatcher);
            },
            updateValue: function () {
                let value = void 0;
                if (this.objectValue != null && this.propertyValue != null) {
                    value = ion.get(this.objectValue, this.propertyValue);
                }
                this.setValue(value);
            },
            setMemberValue: function (value) {
                if (this.objectValue != null && this.propertyValue != null) {
                    ion.set(this.objectValue, this.propertyValue, value);
                }
            }
        }
    }, DynamicExpression);
module.exports = exports = MemberExpression;