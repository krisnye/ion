void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
const ion = require('../');
const templates = [
        [
            'array comprehension',
            function _template(properties) {
                if (this != null && this.constructor === _template) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ArrayExpression',
                                        elements: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [{
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    }],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            body: {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'key'
                                                }
                                            }
                                        }]
                                }
                            }]
                    }, { properties: properties });
                }
                let _ref = [];
                for (let key in properties)
                    _ref.push(key);
                return _ref;
            },
            {
                a: 1,
                b: 2
            },
            {
                b: null,
                c: 3
            },
            [
                'a',
                'c'
            ]
        ],
        [
            'imperative functions',
            function _template2(properties) {
                if (this != null && this.constructor === _template2) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                kind: 'const',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'double'
                                        },
                                        init: {
                                            type: 'Function',
                                            context: false,
                                            value: function double(a) {
                                                return a * 2;
                                            }
                                        }
                                    }]
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ObjectExpression',
                                        properties: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        value: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'double'
                                                            },
                                                            arguments: [{
                                                                    type: 'Identifier',
                                                                    name: 'value'
                                                                }]
                                                        },
                                                        kind: 'init',
                                                        computed: true
                                                    }]
                                            }
                                        }]
                                }
                            }
                        ]
                    }, { properties: properties });
                }
                function double(a) {
                    return a * 2;
                }
                let _ref2 = {};
                for (let key in properties) {
                    let value = properties[key];
                    _ref2[key] = double(value);
                }
                return _ref2;
            },
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                z: 3
            },
            {
                y: 4,
                x: 8,
                z: 6
            }
        ],
        [
            'shared variables functions',
            function _template3(properties) {
                if (this != null && this.constructor === _template3) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'factor'
                                        },
                                        init: {
                                            type: 'ConditionalExpression',
                                            test: {
                                                type: 'BinaryExpression',
                                                operator: '!=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'properties'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'factor'
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: null
                                                }
                                            },
                                            consequent: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'properties'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'factor'
                                                }
                                            },
                                            alternate: {
                                                type: 'Literal',
                                                value: 3
                                            }
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'VariableDeclaration',
                                kind: 'const',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'multiply'
                                        },
                                        init: {
                                            type: 'Function',
                                            context: true,
                                            value: function (_context) {
                                                return function multiply(a) {
                                                    const factor = _context.get('factor');
                                                    return a * factor;
                                                };
                                            }
                                        }
                                    }]
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ObjectExpression',
                                        properties: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'IfStatement',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            operator: '!==',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'key'
                                                            },
                                                            right: {
                                                                type: 'Literal',
                                                                value: 'factor'
                                                            }
                                                        },
                                                        consequent: {
                                                            type: 'BlockStatement',
                                                            body: [{
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'key'
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'multiply'
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Identifier',
                                                                                name: 'value'
                                                                            }]
                                                                    },
                                                                    kind: 'init',
                                                                    computed: true
                                                                }]
                                                        }
                                                    }]
                                            }
                                        }]
                                }
                            }
                        ]
                    }, { properties: properties });
                }
                let factor = properties.factor != null ? properties.factor : 3;
                function multiply(a) {
                    return a * factor;
                }
                let _ref3 = {};
                for (let key in properties) {
                    let value = properties[key];
                    if (key !== 'factor') {
                        _ref3[key] = multiply(value);
                    }
                }
                return _ref3;
            },
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                y: null,
                z: 5,
                factor: 10
            },
            {
                x: 40,
                z: 50
            }
        ]
    ];
let _ref4 = {};
for (let _i = 0; _i < templates.length; _i++) {
    let _ref5 = templates[_i];
    let name = _ref5[0];
    let templateType = _ref5[1];
    let argument = _ref5[2];
    let patch = _ref5[3];
    let expected = _ref5[4];
    if (expected != null) {
        _ref4[name] = function (templateType, argument, patch, expected) {
            return function (done) {
                let template = new templateType(argument);
                template.activate();
                template.watch(function (value) {
                    ion.observe(value, function (changes) {
                        if (JSON.stringify(value) === JSON.stringify(expected)) {
                            template.deactivate();
                            done();
                        }
                    });
                });
                ion.patch(argument, patch);
            };
        }(templateType, argument, patch, expected);
    }
}
module.exports = exports = { test: _ref4 };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/reactiveTemplates',_ion_test_reactiveTemplates_);
    else
      _ion_test_reactiveTemplates_.call(this, module, exports, require);
  }
  else {
    _ion_test_reactiveTemplates_.call(this);
  }
}).call(this)