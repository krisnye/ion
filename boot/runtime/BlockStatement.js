'use strict';
const ion = require('ion');
const Statement = require('./Statement');
const BlockStatement = ion.defineClass({
        id: 'BlockStatement',
        properties: {
            activate: function () {
                BlockStatement.super.prototype.activate.apply(this, arguments);
                if (!(this.statements != null)) {
                    let _ref = [];
                    {
                        let _ref2 = this.body;
                        for (let _i = 0; _i < _ref2.length; _i++) {
                            let s = _ref2[_i];
                            _ref.push(this.context.createRuntime(s));
                        }
                    }
                    this.statements = _ref;
                }
                {
                    let _ref = this.statements;
                    for (let _i = 0; _i < _ref.length; _i++) {
                        let statement = _ref[_i];
                        statement.activate();
                    }
                }
            },
            deactivate: function () {
                BlockStatement.super.prototype.deactivate.apply(this, arguments);
                for (let i = this.statements.length - 1; i >= 0; i--) {
                    let statement = this.statements[i];
                    statement.deactivate();
                }
            }
        }
    }, Statement);
module.exports = exports = BlockStatement;