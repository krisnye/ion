'use strict';
const getVariablesFromStatements = function (statements) {
    if (!(statements != null))
        return [];
    let _ref = [];
    for (let _i = 0; _i < statements.length; _i++) {
        let s = statements[_i];
        if (s.type === 'VariableDeclaration')
            _ref.push(s);
    }
    return _ref;
};
const BlockStatement = exports.BlockStatement = {
        isBlock: true,
        newScope: true,
        getVariables: function (node) {
            return getVariablesFromStatements(node.body);
        }
    };
const Program = exports.Program = BlockStatement;
const ForInStatement = exports.ForInStatement = {
        newScope: true,
        getVariables: function (node) {
            return [node.left].concat(getVariablesFromStatements(node.body));
        }
    };
const FunctionExpression = exports.FunctionExpression = {
        newScope: true,
        getVariables: function (node) {
            return node.params;
        }
    };