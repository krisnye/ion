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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        properties: properties,
                        ion: ion,
                        templates: templates,
                        _ref7: _ref7
                    });
                }
                let _ref3 = [];
                for (let key in properties)
                    _ref3.push(key);
                return _ref3;
            },
            {
                a: 1,
                b: 2
            },
            {
                b: void 0,
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        properties: properties,
                        ion: ion,
                        templates: templates,
                        _ref7: _ref7
                    });
                }
                function double(a) {
                    return a * 2;
                }
                let _ref5 = {};
                {
                    for (let key in properties) {
                        let value = properties[key];
                        _ref5[key] = double(value);
                    }
                }
                return _ref5;
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        properties: properties,
                        ion: ion,
                        templates: templates,
                        _ref7: _ref7
                    });
                }
                let factor = properties.factor != null ? properties.factor : 3;
                function multiply(a) {
                    return a * factor;
                }
                let _ref6 = {};
                {
                    for (let key in properties) {
                        let value = properties[key];
                        if (key !== 'factor') {
                            _ref6[key] = multiply(value);
                        }
                    }
                }
                return _ref6;
            },
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                y: void 0,
                z: 5,
                factor: 10
            },
            {
                x: 40,
                z: 50
            }
        ],
        [
            'reactive destructured parameters',
            function _template4(_ref) {
                if (this != null && this.constructor === _template4) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        init: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: '_ref'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            computed: false
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        init: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: '_ref'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            computed: false
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    operator: '+',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'b'
                                    }
                                }
                            }
                        ]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        _ref: _ref,
                        ion: ion,
                        templates: templates,
                        _ref7: _ref7
                    });
                }
                let a = _ref.a;
                let b = _ref.b;
                return a + b;
            },
            {
                a: 1,
                b: 2
            },
            { a: 5 },
            7
        ],
        [
            'array comprehensions',
            function _template5(_ref2) {
                if (this != null && this.constructor === _template5) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'items'
                                        },
                                        init: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: '_ref2'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'items'
                                            },
                                            computed: false
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ArrayExpression',
                                        elements: []
                                    },
                                    properties: [{
                                            type: 'ForOfStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'x'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'i'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'items'
                                            },
                                            body: {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'i'
                                                    }
                                                }
                                            }
                                        }]
                                }
                            }
                        ]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        _ref2: _ref2,
                        ion: ion,
                        templates: templates,
                        _ref7: _ref7
                    });
                }
                let items = _ref2.items;
                let _ref4 = [];
                for (let _i = 0; _i < items.length; _i++) {
                    let i = _i;
                    let x = items[_i];
                    _ref4.push(x + i);
                }
                return _ref4;
            },
            {
                items: [
                    1,
                    2,
                    3
                ]
            },
            { items: { 3: 4 } },
            [
                1,
                3,
                5,
                7
            ]
        ]
    ];
let _ref7 = {};
{
    for (let _i2 = 0; _i2 < templates.length; _i2++) {
        let _ref8 = templates[_i2];
        let name = _ref8[0];
        let templateType = _ref8[1];
        let argument = _ref8[2];
        let patch = _ref8[3];
        let expected = _ref8[4];
        if (expected != null) {
            _ref7[name] = function (templateType, argument, patch, expected) {
                return function (done) {
                    let template = new templateType(argument);
                    function checkIfDone(check) {
                        if (JSON.stringify(check) === JSON.stringify(expected)) {
                            template.deactivate();
                            done();
                        }
                    }
                    template.activate();
                    template.watch(function (value) {
                        checkIfDone(value);
                        ion.observe(value, function (changes) {
                            checkIfDone(value);
                        });
                    });
                    ion.patch(argument, patch);
                };
            }(templateType, argument, patch, expected);
        }
    }
}
module.exports = exports = { test: _ref7 };
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