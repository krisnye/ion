void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var templates = [
        [
            'array comprehension',
            ion.template(function _template(properties) {
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
                        _ref8: _ref8
                    });
                }
                var _ref4 = [];
                for (var key in properties)
                    _ref4.push(key);
                return _ref4;
            }),
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
            ion.template(function _template2(properties) {
                if (this != null && this.constructor === _template2) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
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
                                    }],
                                kind: 'const'
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
                        _ref8: _ref8
                    });
                }
                function double(a) {
                    return a * 2;
                }
                var _ref6 = {};
                {
                    for (var key in properties) {
                        var value = properties[key];
                        _ref6[key] = double(value);
                    }
                }
                return _ref6;
            }),
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
            ion.template(function _template3(properties) {
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
                                                    var factor = _context.get('factor');
                                                    return a * factor;
                                                };
                                            }
                                        }
                                    }],
                                kind: 'const'
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
                        _ref8: _ref8
                    });
                }
                var factor = properties.factor != null ? properties.factor : 3;
                function multiply(a) {
                    return a * factor;
                }
                var _ref7 = {};
                {
                    for (var key in properties) {
                        var value = properties[key];
                        if (key !== 'factor') {
                            _ref7[key] = multiply(value);
                        }
                    }
                }
                return _ref7;
            }),
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
            ion.template(function _template4(_ref) {
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
                        _ref8: _ref8
                    });
                }
                var a = _ref.a;
                var b = _ref.b;
                return a + b;
            }),
            {
                a: 1,
                b: 2
            },
            { a: 5 },
            7
        ],
        [
            'array comprehensions',
            ion.template(function _template5(_ref2) {
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
                        _ref8: _ref8
                    });
                }
                var items = _ref2.items;
                var _ref5 = [];
                for (var _i = 0; _i < items.length; _i++) {
                    var i = _i;
                    var x = items[_i];
                    _ref5.push(x + i);
                }
                return _ref5;
            }),
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
        ],
        [
            'changing object with function',
            ion.template(function _template6(object) {
                if (this != null && this.constructor === _template6) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'object'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'sum'
                                        }
                                    },
                                    arguments: []
                                }
                            }]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        object: object,
                        ion: ion,
                        templates: templates,
                        _ref8: _ref8
                    });
                }
                return object.sum();
            }),
            {
                sum: function () {
                    return this.x + this.y;
                },
                x: 1,
                y: 2
            },
            { x: 6 },
            8
        ],
        [
            'nested templates',
            function () {
                var sum = ion.template(function _template7(_ref3) {
                        if (this != null && this.constructor === _template7) {
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
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_ref3'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'deep'
                                                        },
                                                        computed: false
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
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_ref3'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'deep'
                                                        },
                                                        computed: false
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
                                ],
                                name: {
                                    type: 'Identifier',
                                    name: 'sum'
                                }
                            }, {
                                require: require,
                                module: module,
                                exports: exports,
                                _ref3: _ref3,
                                sum: sum,
                                ion: ion,
                                templates: templates,
                                _ref8: _ref8
                            });
                        }
                        var a = _ref3.deep.a;
                        var b = _ref3.deep.b;
                        return a + b;
                    });
                return ion.template(function _template8(object) {
                    if (this != null && this.constructor === _template8) {
                        return ion.createRuntime({
                            type: 'Template',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'sum'
                                        },
                                        arguments: [{
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'object'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'one'
                                                }
                                            }]
                                    }
                                }]
                        }, {
                            require: require,
                            module: module,
                            exports: exports,
                            object: object,
                            sum: sum,
                            ion: ion,
                            templates: templates,
                            _ref8: _ref8
                        });
                    }
                    return sum(object.one);
                });
            }(),
            {
                one: {
                    deep: {
                        a: 1,
                        b: 2
                    }
                }
            },
            { one: { deep: { a: 2 } } },
            4
        ],
        [
            'bidirectional properties',
            ion.template(function _template9(object) {
                if (this != null && this.constructor === _template9) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'object'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x'
                                            },
                                            value: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'object'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            },
                                            kind: 'init',
                                            bi: true
                                        }]
                                },
                                kind: 'init'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'object'
                                }
                            }
                        ]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        object: object,
                        ion: ion,
                        templates: templates,
                        _ref8: _ref8
                    });
                }
                ion.patch(object, { x: object.y });
                return object;
            }),
            {
                x: 1,
                y: 2
            },
            { x: 3 },
            {
                x: 3,
                y: 3
            }
        ],
        [
            'literal objects',
            ion.template(function _template10() {
                if (this != null && this.constructor === _template10) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'touch'
                                            },
                                            value: {
                                                type: 'Literal',
                                                value: 1
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Literal',
                                                value: 'touch-start'
                                            },
                                            value: {
                                                type: 'Literal',
                                                value: 2
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                }
                            }]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        _ref8: _ref8
                    });
                }
                return {
                    touch: 1,
                    'touch-start': 2
                };
            }),
            {},
            {},
            {
                touch: 1,
                'touch-start': 2
            }
        ]
    ];
var _ref8 = {};
{
    for (var _i2 = 0; _i2 < templates.length; _i2++) {
        var _ref9 = templates[_i2];
        var name = _ref9[0];
        var templateType = _ref9[1];
        var argument = _ref9[2];
        var patch = _ref9[3];
        var expected = _ref9[4];
        if (expected != null) {
            _ref8[name] = function (templateType, argument, patch, expected) {
                return function (done) {
                    var template = new templateType(argument);
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
module.exports = exports = { test: _ref8 };
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