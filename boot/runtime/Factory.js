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
var lookup = {
        type: {
            VariableDeclaration: ion.patch(new Factory(), { runtime: './VariableDeclaration' }),
            ThisExpression: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    return context.getVariableExpression('this');
                }
            }),
            Identifier: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    return context.getVariableExpression(ast.name);
                }
            }),
            Function: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    var value = ast.value;
                    if (ast.context) {
                        value = value(context);
                    }
                    return new Literal({ value: value });
                }
            }),
            Template: ion.patch(new Factory(), { runtime: './Template' }),
            Literal: ion.patch(new Factory(), { runtime: './Literal' }),
            Property: ion.patch(new Factory(), { runtime: './Property' }),
            IfStatement: ion.patch(new Factory(), { runtime: './IfStatement' }),
            BlockStatement: ion.patch(new Factory(), { runtime: './BlockStatement' }),
            ReturnStatement: ion.patch(new Factory(), { runtime: './ReturnStatement' }),
            ObjectExpression: ion.patch(new Factory(), { runtime: './ObjectExpression' }),
            ArrayExpression: ion.patch(new Factory(), { runtime: './ArrayExpression' }),
            ExpressionStatement: ion.patch(new Factory(), { runtime: './ExpressionStatement' }),
            ForOfStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            ForInStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            MemberExpression: ion.patch(new Factory(), { runtime: './MemberExpression' }),
            CallExpression: ion.patch(new Factory(), { runtime: './CallExpression' }),
            NewExpression: ion.patch(new Factory(), { runtime: './CallExpression' }),
            UnaryExpression: {
                operator: {
                    '!': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return !a;
                        }
                    }),
                    'typeof': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return typeof a;
                        }
                    }),
                    'void': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return void a;
                        }
                    }),
                    '-': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return -a;
                        }
                    }),
                    '+': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return +a;
                        }
                    }),
                    '~': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return ~a;
                        }
                    }),
                    '?': ion.patch(new Factory(), {
                        evaluate: function (a) {
                            return a != null;
                        }
                    })
                }
            },
            ConditionalExpression: ion.patch(new Factory(), {
                evaluate: function (test, consequent, alternate) {
                    return test ? consequent : alternate;
                }
            }),
            BinaryExpression: {
                operator: {
                    '*': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left * right;
                        }
                    }),
                    '/': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left / right;
                        }
                    }),
                    '%': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left % right;
                        }
                    }),
                    '+': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left + right;
                        }
                    }),
                    '-': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left - right;
                        }
                    }),
                    '&&': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left && right;
                        }
                    }),
                    '||': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left || right;
                        }
                    }),
                    '&': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left & right;
                        }
                    }),
                    '|': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left | right;
                        }
                    }),
                    '==': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left == right;
                        }
                    }),
                    '!=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left != right;
                        }
                    }),
                    '===': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left === right;
                        }
                    }),
                    '!==': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left !== right;
                        }
                    }),
                    '<': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left < right;
                        }
                    }),
                    '>': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left > right;
                        }
                    }),
                    '<=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left <= right;
                        }
                    }),
                    '>=': ion.patch(new Factory(), {
                        evaluate: function (left, right) {
                            return left >= right;
                        }
                    })
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
//@ sourceMappingURL=./Factory.map