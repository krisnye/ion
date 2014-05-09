void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var _ref8 = [];
{
    _ref8.push('this');
    var object = {
            x: 1,
            y: 2
        };
    _ref8.push(object);
    _ref8.push(ion.template(function () {
        return this.x + this.y;
    }, function () {
        return ion.createRuntime({
            type: 'Template',
            body: [{
                    type: 'ReturnStatement',
                    argument: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'MemberExpression',
                            computed: false,
                            object: { type: 'ThisExpression' },
                            property: {
                                type: 'Identifier',
                                name: 'x'
                            }
                        },
                        right: {
                            type: 'MemberExpression',
                            computed: false,
                            object: { type: 'ThisExpression' },
                            property: {
                                type: 'Identifier',
                                name: 'y'
                            }
                        }
                    }
                }],
            bound: false
        }, {
            this: this,
            require: require,
            module: module,
            exports: exports,
            object: object,
            ion: ion,
            _ref8: _ref8,
            templates: templates,
            _ref9: _ref9
        });
    }));
    _ref8.push(object);
    _ref8.push({ x: 10 });
    _ref8.push(12);
}
var templates = [
        [
            'regular expression',
            {},
            ion.template(function (properties) {
                return properties.name.replace(/a/g, 'b');
            }, function (properties) {
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
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'properties'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'name'
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'replace'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: /a/g
                                    },
                                    {
                                        type: 'Literal',
                                        value: 'b'
                                    }
                                ]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    properties: properties,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
            }),
            { name: 'alpha' },
            {},
            'blphb'
        ],
        [
            'array comprehension',
            {},
            ion.template(function (properties) {
                var _ref4 = [];
                for (var key in properties)
                    _ref4.push(key);
                return _ref4;
            }, function (properties) {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    properties: properties,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function (properties) {
                function double(a) {
                    return a * 2;
                }
                var _ref6 = {};
                {
                    for (var key in properties) {
                        var value = properties[key];
                        var value = properties[key];
                        _ref6[key] = double(value);
                    }
                }
                return _ref6;
            }, function (properties) {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    properties: properties,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function (properties) {
                var factor = properties.factor != null ? properties.factor : 3;
                function multiply(a) {
                    return a * factor;
                }
                var _ref7 = {};
                {
                    for (var key in properties) {
                        var value = properties[key];
                        var value = properties[key];
                        if (key !== 'factor') {
                            _ref7[key] = multiply(value);
                        }
                    }
                }
                return _ref7;
            }, function (properties) {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    properties: properties,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function (_ref) {
                var a = _ref.a;
                var b = _ref.b;
                return a + b;
            }, function (_ref) {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    _ref: _ref,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function (_ref2) {
                var items = _ref2.items;
                var _ref5 = [];
                for (var _i = 0; _i < items.length; _i++) {
                    var i = _i;
                    var x = items[_i];
                    _ref5.push(x + i);
                }
                return _ref5;
            }, function (_ref2) {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    _ref2: _ref2,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function (object) {
                return object.sum();
            }, function (object) {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    object: object,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            function () {
                var sum = ion.template(function (_ref3) {
                        var a = _ref3.deep.a;
                        var b = _ref3.deep.b;
                        return a + b;
                    }, function (_ref3) {
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
                            bound: false,
                            name: {
                                type: 'Identifier',
                                name: 'sum'
                            }
                        }, {
                            this: this,
                            require: require,
                            module: module,
                            exports: exports,
                            _ref3: _ref3,
                            sum: sum,
                            ion: ion,
                            _ref8: _ref8,
                            templates: templates,
                            _ref9: _ref9
                        });
                    });
                return ion.template(function (object) {
                    return sum(object.one);
                }, function (object) {
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
                            }],
                        bound: false
                    }, {
                        this: this,
                        require: require,
                        module: module,
                        exports: exports,
                        object: object,
                        sum: sum,
                        ion: ion,
                        _ref8: _ref8,
                        templates: templates,
                        _ref9: _ref9
                    });
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
            {},
            ion.template(function (object) {
                ion.patch(object, { x: object.y });
                return object;
            }, function (object) {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    object: object,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
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
            {},
            ion.template(function () {
                return {
                    touch: 1,
                    'touch-start': 2
                };
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    _ref8: _ref8,
                    templates: templates,
                    _ref9: _ref9
                });
            }),
            {},
            {},
            {
                touch: 1,
                'touch-start': 2
            }
        ],
        _ref8
    ];
var _ref9 = {};
{
    for (var _i2 = 0; _i2 < templates.length; _i2++) {
        var _ref10 = templates[_i2];
        var name = _ref10[0];
        var thisArg = _ref10[1];
        var templateType = _ref10[2];
        var argument = _ref10[3];
        var patch = _ref10[4];
        var expected = _ref10[5];
        if (expected != null) {
            _ref9[name] = function (thisArg, templateType, argument, patch, expected) {
                return function (done) {
                    var template = templateType.template.call(thisArg, argument);
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
            }(thisArg, templateType, argument, patch, expected);
        }
    }
}
module.exports = exports = { test: _ref9 };
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
//@ sourceMappingURL=./reactiveTemplates.map