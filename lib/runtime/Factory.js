void (function(){var _ion_runtime_Factory_ = function(module,exports,require){'use strict';
var ion = require('../');
var Literal = require('./Literal');
var Expression = require('./Expression');
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
                    return ion.patch(new type(properties), { ast: ast });
                }
            },
            canCache: {
                writable: true,
                value: function (ast) {
                    return false;
                }
            },
            toCode: {
                writable: true,
                value: function (ast) {
                    if (ast.type === 'BinaryExpression') {
                        return toCode(ast.left) + ast.operator + toCode(ast.right);
                    }
                    return '(' + JSON.stringify(ast) + ')';
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
                    var expression = context.getVariable('this');
                    if (ast.deep) {
                        expression.deep = true;
                    }
                    return expression;
                },
                toCode: function (ast) {
                    return 'this';
                }
            }),
            Identifier: ion.patch(new Factory(), {
                createRuntime: function (context, ast) {
                    var expression = context.getVariable(ast.name);
                    if (ast.deep) {
                        expression.deep = true;
                    }
                    return expression;
                },
                canCache: function (ast) {
                    return true;
                },
                toCode: function (ast) {
                    return ast.name;
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
            Literal: ion.patch(new Factory(), {
                runtime: './Literal',
                canCache: function (ast) {
                    return true;
                },
                toCode: function (ast) {
                    return JSON.stringify(ast.value);
                }
            }),
            Property: ion.patch(new Factory(), { runtime: './Property' }),
            IfStatement: ion.patch(new Factory(), { runtime: './IfStatement' }),
            BlockStatement: ion.patch(new Factory(), { runtime: './BlockStatement' }),
            ReturnStatement: ion.patch(new Factory(), { runtime: './ReturnStatement' }),
            ObjectExpression: ion.patch(new Factory(), { runtime: './ObjectExpression' }),
            ArrayExpression: ion.patch(new Factory(), { runtime: './ArrayExpression' }),
            ExpressionStatement: ion.patch(new Factory(), { runtime: './ExpressionStatement' }),
            ForOfStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            ForInStatement: ion.patch(new Factory(), { runtime: './ForInOfStatement' }),
            MemberExpression: ion.patch(new Factory(), {
                runtime: './MemberExpression',
                canCache: function (ast) {
                    return canCache(ast.object) && canCache(ast.property);
                },
                toCode: function (ast) {
                    if (ast.computed) {
                        return '' + toCode(ast.object) + '[' + toCode(ast.property) + ']';
                    } else {
                        return '' + toCode(ast.object) + '.' + toCode(ast.property);
                    }
                }
            }),
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
            ConditionalExpression: ion.patch(new Factory(), { runtime: './ConditionalExpression' }),
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
var canCache = exports.canCache = function (ast) {
        if (ast != null) {
            var factory = getFactory(ast);
            if (factory != null) {
                return factory.canCache(ast);
            }
        }
        return false;
    }, toCode = exports.toCode = function (ast) {
        if (ast != null) {
            var code = ast._toCode;
            if (!(code != null)) {
                var factory = getFactory(ast);
                if (factory != null) {
                    code = factory.toCode(ast);
                }
                if (code != null && typeof ast === 'object') {
                    Object.defineProperty(ast, '_toCode', { value: code });
                }
            }
            return code;
        }
        return JSON.stringify(ast);
    }, createRuntime = exports.createRuntime = function (context, ast) {
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