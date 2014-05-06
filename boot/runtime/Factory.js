void (function(){var _ion_runtime_Factory_ = function(module,exports,require){'use strict';
var ion = require('../');
var Literal = require('./Literal');
var Factory = ion.defineClass({
        name: 'Factory',
        properties: {
            runtime: './OperationExpression',
            createRuntime: {
                writable: true,
                value: function (context, ast) {
                    var properties = ion.clone(ast);
                    properties.context = context;
                    properties.factory = this;
                    var type = require(this.runtime);
                    return new type(properties);
                }
            }
        }
    });
Factory;
var _ref = new Factory();
{
    _ref.runtime = './VariableDeclaration';
}
var _ref2 = new Factory();
{
    _ref2.createRuntime = function (context, ast) {
        return context.getVariableExpression(ast.name);
    };
}
var _ref3 = new Factory();
{
    _ref3.createRuntime = function (context, ast) {
        var value = ast.value;
        if (ast.context) {
            value = value(context);
        }
        return new Literal({ value: value });
    };
}
var _ref4 = new Factory();
{
    _ref4.runtime = './Template';
}
var _ref5 = new Factory();
{
    _ref5.runtime = './Literal';
}
var _ref6 = new Factory();
{
    _ref6.runtime = './Property';
}
var _ref7 = new Factory();
{
    _ref7.runtime = './IfStatement';
}
var _ref8 = new Factory();
{
    _ref8.runtime = './BlockStatement';
}
var _ref9 = new Factory();
{
    _ref9.runtime = './ReturnStatement';
}
var _ref10 = new Factory();
{
    _ref10.runtime = './ObjectExpression';
}
var _ref11 = new Factory();
{
    _ref11.runtime = './ArrayExpression';
}
var _ref12 = new Factory();
{
    _ref12.runtime = './ExpressionStatement';
}
var _ref13 = new Factory();
{
    _ref13.runtime = './ForInOfStatement';
}
var _ref14 = new Factory();
{
    _ref14.runtime = './ForInOfStatement';
}
var _ref15 = new Factory();
{
    _ref15.runtime = './MemberExpression';
}
var _ref16 = new Factory();
{
    _ref16.runtime = './CallExpression';
}
var _ref17 = new Factory();
{
    _ref17.runtime = './CallExpression';
}
var _ref18 = new Factory();
{
    _ref18.evaluate = function (a) {
        return !a;
    };
}
var _ref19 = new Factory();
{
    _ref19.evaluate = function (a) {
        return typeof a;
    };
}
var _ref20 = new Factory();
{
    _ref20.evaluate = function (a) {
        return void a;
    };
}
var _ref21 = new Factory();
{
    _ref21.evaluate = function (a) {
        return -a;
    };
}
var _ref22 = new Factory();
{
    _ref22.evaluate = function (a) {
        return +a;
    };
}
var _ref23 = new Factory();
{
    _ref23.evaluate = function (a) {
        return ~a;
    };
}
var _ref24 = new Factory();
{
    _ref24.evaluate = function (a) {
        return a != null;
    };
}
var _ref25 = new Factory();
{
    _ref25.evaluate = function (test, consequent, alternate) {
        return test ? consequent : alternate;
    };
}
var _ref26 = new Factory();
{
    _ref26.evaluate = function (left, right) {
        return left * right;
    };
}
var _ref27 = new Factory();
{
    _ref27.evaluate = function (left, right) {
        return left / right;
    };
}
var _ref28 = new Factory();
{
    _ref28.evaluate = function (left, right) {
        return left % right;
    };
}
var _ref29 = new Factory();
{
    _ref29.evaluate = function (left, right) {
        return left + right;
    };
}
var _ref30 = new Factory();
{
    _ref30.evaluate = function (left, right) {
        return left - right;
    };
}
var _ref31 = new Factory();
{
    _ref31.evaluate = function (left, right) {
        return left && right;
    };
}
var _ref32 = new Factory();
{
    _ref32.evaluate = function (left, right) {
        return left || right;
    };
}
var _ref33 = new Factory();
{
    _ref33.evaluate = function (left, right) {
        return left & right;
    };
}
var _ref34 = new Factory();
{
    _ref34.evaluate = function (left, right) {
        return left | right;
    };
}
var _ref35 = new Factory();
{
    _ref35.evaluate = function (left, right) {
        return left == right;
    };
}
var _ref36 = new Factory();
{
    _ref36.evaluate = function (left, right) {
        return left != right;
    };
}
var _ref37 = new Factory();
{
    _ref37.evaluate = function (left, right) {
        return left === right;
    };
}
var _ref38 = new Factory();
{
    _ref38.evaluate = function (left, right) {
        return left !== right;
    };
}
var _ref39 = new Factory();
{
    _ref39.evaluate = function (left, right) {
        return left < right;
    };
}
var _ref40 = new Factory();
{
    _ref40.evaluate = function (left, right) {
        return left > right;
    };
}
var _ref41 = new Factory();
{
    _ref41.evaluate = function (left, right) {
        return left <= right;
    };
}
var _ref42 = new Factory();
{
    _ref42.evaluate = function (left, right) {
        return left >= right;
    };
}
var lookup = {
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
    for (var key in step) {
        var values = step[key];
        var nodeValue = ast[key];
        var next = values[nodeValue];
        if (next != null) {
            if (next.constructor === Factory) {
                return next;
            }
            return getFactory(ast, next);
        }
    }
    return null;
}
var createRuntime = exports.createRuntime = function (context, ast) {
        if (typeof (ast != null ? ast.type : void 0) !== 'string') {
            ast = {
                type: 'Literal',
                value: ast
            };
        }
        var factory = getFactory(ast);
        if (!(factory != null)) {
            throw new Error('Factory not found for ast:\n' + JSON.stringify(ast, null, '  '));
        }
        return factory.createRuntime(context, ast);
    }, test = exports.test = function () {
        var factory = getFactory({
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
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Factory',_ion_runtime_Factory_);
    else
      _ion_runtime_Factory_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Factory_.call(this);
  }
}).call(this)