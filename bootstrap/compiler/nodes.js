'use strict';
const getVariablesFromStatements = function (statements) {
    if (!(statements != null)) {
        return [];
    }
    let _ref = [];
    for (let _i = 0; _i < statements.length; _i++) {
        let s = statements[_i];
        if (s.type === 'VariableDeclaration') {
            _ref.push(s);
        }
    }
    return _ref;
};
const BlockStatement = exports.BlockStatement = {
        isBlock: true,
        newScope: true
    };
const Program = exports.Program = {
        isBlock: true,
        newScope: true,
        reactive: false
    };
const FunctionExpression = exports.FunctionExpression = {
        newScope: true,
        shadow: true
    };
const Template = exports.Template = {
        newScope: true,
        shadow: true,
        reactive: true
    };
const ForInStatement = exports.ForInStatement = { newScope: true };
const ForOfStatement = exports.ForOfStatement = ForInStatement;