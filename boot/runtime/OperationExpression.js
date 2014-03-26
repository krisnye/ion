'use strict';
const ion = require('ion');
const DynamicExpression = require('./DynamicExpression');
const OperationExpression = ion.defineClass({
        id: 'OperationExpression',
        constructor: function OperationExpression(properties) {
            OperationExpression.super.apply(this, arguments);
            if (!(this.args != null)) {
                if (this.type === 'BinaryExpression') {
                    this.args = [
                        this.left,
                        this.right
                    ];
                } else if (this.type === 'UnaryExpression') {
                    this.args = [this.argument];
                } else if (this.type === 'ConditionalExpression') {
                    this.args = [
                        this.test,
                        this.consequent,
                        this.alternate
                    ];
                }
            }
        },
        properties: {
            args: null,
            activate: function () {
                OperationExpression.super.prototype.activate.apply(this, arguments);
                this.argumentExpressions = this.argumentExpressions != null ? this.argumentExpressions : this.context.createRuntime({
                    type: 'ArrayExpression',
                    elements: this.args,
                    observeElements: this.factory.observe
                });
                this.argumentExpressions.watch(this.watcher = this.watcher != null ? this.watcher : function (value) {
                    this.argumentValues = value;
                    this.evaluate();
                }.bind(this));
            },
            deactivate: function () {
                OperationExpression.super.prototype.deactivate.apply(this, arguments);
                this.argumentExpressions.unwatch(this.watcher);
            },
            evaluate: function () {
                if (!(this.factory.evaluate != null)) {
                    throw new Error('evaluate method not defined for operation: ' + this.factory);
                }
                let value = this.factory.evaluate.apply(this.context, this.argumentValues);
                this.setValue(value);
            }
        }
    }, DynamicExpression);
module.exports = OperationExpression;