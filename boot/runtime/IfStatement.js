'use strict';
const ion = require('../'), Statement = require('./Statement');
const IfStatement = ion.defineClass({
        id: 'IfStatement',
        properties: {
            activate: function () {
                IfStatement.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.testExpression.watch(this.testExpressionWatcher = this.testExpressionWatcher != null ? this.testExpressionWatcher : function (value) {
                    if (value) {
                        this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                        this.consequentStatement = this.consequentStatement != null ? this.consequentStatement : this.context.createRuntime(this.consequent);
                        this.consequentStatement.activate();
                    } else if (this.alternate != null) {
                        this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                        this.alternateStatement = this.alternateStatement != null ? this.alternateStatement : this.context.createRuntime(this.alternate);
                        this.alternateStatement.activate();
                    }
                }.bind(this));
            },
            deactivate: function () {
                IfStatement.super.prototype.deactivate.apply(this, arguments);
                this.testExpression.unwatch(this.testExpressionWatcher);
            }
        }
    }, Statement);
module.exports = exports = IfStatement;