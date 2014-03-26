'use strict';
const ion = require('../');
const Literal = require('./Literal');
const Factory = ion.defineClass({
        id: 'Factory',
        properties: {
            runtime: './OperationExpression',
            createRuntime: {
                writable: true,
                value: function (context, ast) {
                    let properties = ion.clone(ast);
                    properties.context = context;
                    properties.factory = this;
                    let type = require(this.runtime);
                    return new type(properties);
                }
            }
        }
    });
Factory;
let _ref = new Factory();
_ref.runtime = './VariableDeclaration';
let _ref2 = new Factory();
_ref2.createRuntime = function (context, ast) {
    return context.getVariableExpression(ast.name);
};
let _ref3 = new Factory();
_ref3.createRuntime = function (context, ast) {
    let value = ast.value;
    if (ast.context) {
        value = value(context);
    }
    return new Literal({ value: value });
};
let _ref4 = new Factory();
_ref4.runtime = './Template';
let _ref5 = new Factory();
_ref5.runtime = './Literal';
let _ref6 = new Factory();
_ref6.runtime = './Property';
let _ref7 = new Factory();
_ref7.runtime = './IfStatement';
let _ref8 = new Factory();
_ref8.runtime = './BlockStatement';
let _ref9 = new Factory();
_ref9.runtime = './ReturnStatement';
let _ref10 = new Factory();
_ref10.runtime = './ObjectExpression';
let _ref11 = new Factory();
_ref11.runtime = './ArrayExpression';
let _ref12 = new Factory();
_ref12.runtime = './ExpressionStatement';
let _ref13 = new Factory();
_ref13.runtime = './ForInOfStatement';
let _ref14 = new Factory();
_ref14.runtime = './ForInOfStatement';
let _ref15 = new Factory();
_ref15.runtime = './MemberExpression';
let _ref16 = new Factory();
_ref16.runtime = './CallExpression';
let _ref17 = new Factory();
_ref17.runtime = './CallExpression';
let _ref18 = new Factory();
_ref18.evaluate = function (a) {
    return !a;
};
let _ref19 = new Factory();
_ref19.evaluate = function (a) {
    return typeof a;
};
let _ref20 = new Factory();
_ref20.evaluate = function (a) {
    return void a;
};
let _ref21 = new Factory();
_ref21.evaluate = function (a) {
    return -a;
};
let _ref22 = new Factory();
_ref22.evaluate = function (a) {
    return +a;
};
let _ref23 = new Factory();
_ref23.evaluate = function (a) {
    return ~a;
};
let _ref24 = new Factory();
_ref24.evaluate = function (a) {
    return a != null;
};
let _ref25 = new Factory();
_ref25.evaluate = function (test, consequent, alternate) {
    return test ? consequent : alternate;
};
let _ref26 = new Factory();
_ref26.evaluate = function (left, right) {
    return left * right;
};
let _ref27 = new Factory();
_ref27.evaluate = function (left, right) {
    return left / right;
};
let _ref28 = new Factory();
_ref28.evaluate = function (left, right) {
    return left % right;
};
let _ref29 = new Factory();
_ref29.evaluate = function (left, right) {
    return left + right;
};
let _ref30 = new Factory();
_ref30.evaluate = function (left, right) {
    return left - right;
};
let _ref31 = new Factory();
_ref31.evaluate = function (left, right) {
    return left && right;
};
let _ref32 = new Factory();
_ref32.evaluate = function (left, right) {
    return left || right;
};
let _ref33 = new Factory();
_ref33.evaluate = function (left, right) {
    return left & right;
};
let _ref34 = new Factory();
_ref34.evaluate = function (left, right) {
    return left | right;
};
let _ref35 = new Factory();
_ref35.evaluate = function (left, right) {
    return left == right;
};
let _ref36 = new Factory();
_ref36.evaluate = function (left, right) {
    return left != right;
};
let _ref37 = new Factory();
_ref37.evaluate = function (left, right) {
    return left === right;
};
let _ref38 = new Factory();
_ref38.evaluate = function (left, right) {
    return left !== right;
};
let _ref39 = new Factory();
_ref39.evaluate = function (left, right) {
    return left < right;
};
let _ref40 = new Factory();
_ref40.evaluate = function (left, right) {
    return left > right;
};
let _ref41 = new Factory();
_ref41.evaluate = function (left, right) {
    return left <= right;
};
let _ref42 = new Factory();
_ref42.evaluate = function (left, right) {
    return left >= right;
};
const lookup = {
        type: {
            VariableDeclaration: _ref,
            Identifier: _ref2,
            Function: _ref3,
            Template: _ref4,
            Literal: _ref5,
            Property: _ref6,
            IfStatement: _ref7,
            BlockStatement: _ref8,
            ReturnStatement: _ref9,
            ObjectExpression: _ref10,
            ArrayExpression: _ref11,
            ExpressionStatement: _ref12,
            ForOfStatement: _ref13,
            ForInStatement: _ref14,
            MemberExpression: _ref15,
            CallExpression: _ref16,
            NewExpression: _ref17,
            UnaryExpression: {
                operator: {
                    '!': _ref18,
                    'typeof': _ref19,
                    'void': _ref20,
                    '-': _ref21,
                    '+': _ref22,
                    '~': _ref23,
                    '?': _ref24
                }
            },
            ConditionalExpression: _ref25,
            BinaryExpression: {
                operator: {
                    '*': _ref26,
                    '/': _ref27,
                    '%': _ref28,
                    '+': _ref29,
                    '-': _ref30,
                    '&&': _ref31,
                    '||': _ref32,
                    '&': _ref33,
                    '|': _ref34,
                    '==': _ref35,
                    '!=': _ref36,
                    '===': _ref37,
                    '!==': _ref38,
                    '<': _ref39,
                    '>': _ref40,
                    '<=': _ref41,
                    '>=': _ref42
                }
            }
        }
    };
function getFactory(ast, step) {
    if (step == null)
        step = lookup;
    for (let key in step) {
        let values = step[key];
        let nodeValue = ast[key];
        let next = values[nodeValue];
        if (next != null) {
            if (next.constructor === Factory) {
                return next;
            }
            return getFactory(ast, next);
        }
    }
    return null;
}
const createRuntime = exports.createRuntime = function (context, ast) {
        if (typeof (ast != null ? ast.type : void 0) !== 'string') {
            ast = {
                type: 'Literal',
                value: ast
            };
        }
        let factory = getFactory(ast);
        if (!(factory != null)) {
            throw new Error('Factory not found for ast:\n' + JSON.stringify(ast, null, '  '));
        }
        return factory.createRuntime(context, ast);
    }, test = exports.test = function () {
        let factory = getFactory({
                type: 'BinaryExpression',
                operator: '>',
                left: {
                    type: 'Literal',
                    value: 1
                },
                right: {
                    type: 'Literal',
                    value: 2
                }
            });
        if (!(factory === lookup.type.BinaryExpression.operator['>']))
            throw new Error('Assertion Failed: (factory is lookup.type.BinaryExpression.operator[">"])');
        if (!(lookup.type.BinaryExpression.operator['>'] != null))
            throw new Error('Assertion Failed: (lookup.type.BinaryExpression.operator[">"]?)');
    };