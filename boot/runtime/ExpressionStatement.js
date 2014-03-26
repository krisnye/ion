'use strict';
const ion = require('../'), Statement = require('./Statement');
const ExpressionStatement = ion.defineClass({
        id: 'ExpressionStatement',
        properties: {
            activate: function () {
                ExpressionStatement.super.prototype.activate.apply(this, arguments);
                this.runtimeExpression = this.runtimeExpression != null ? this.runtimeExpression : this.context.createRuntime(this.expression);
                this.runtimeExpression.watch(this.runtimeExpressionWatcher = this.runtimeExpressionWatcher != null ? this.runtimeExpressionWatcher : function (value) {
                    if (this.expressionValue !== value) {
                        this.expressionValue = value;
                        this._remove != null ? this._remove() : void 0;
                        this._remove = null;
                        if (this.context.output != null && value !== void 0) {
                            this._remove = ion.add(this.context.output, value);
                        }
                    }
                }.bind(this));
            },
            deactivate: function () {
                ExpressionStatement.super.prototype.deactivate.apply(this, arguments);
                this.runtimeExpression.unwatch(this.runtimeExpressionWatcher);
            }
        }
    }, Statement);
module.exports = exports = ExpressionStatement;