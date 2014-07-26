void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var _ref9 = [];
{
    _ref9.push('this');
    var object = {
            x: 1,
            y: 2
        };
    _ref9.push(object);
    _ref9.push(ion.template(function () {
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
            object: object,
            ion: ion,
            _ref9: _ref9,
            templates: templates,
            _ref12: _ref12
        });
    }));
    _ref9.push(object);
    _ref9.push({ x: 10 });
    _ref9.push(12);
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
                    properties: properties,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                    properties: properties,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                for (var key in properties) {
                    var value = properties[key];
                    var value = properties[key];
                    _ref6[key] = double(value);
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
                                        },
                                        remove: null
                                    }]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
                });
            }),
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                z: 3,
                y: void 0
            },
            {
                x: 8,
                y: 4,
                z: 6
            }
        ],
        [
            'for else statements',
            {},
            ion.template(function (properties) {
                var _ref7 = {};
                for (var key in properties) {
                    var value = properties[key];
                    var value = properties[key];
                    _ref7[key] = value;
                }
                return _ref7;
            }, function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
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
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
                                        },
                                        remove: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'key'
                                                    },
                                                    value: {
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        prefix: true,
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 0
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
                                        }
                                    }]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
                });
            }),
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                y: void 0,
                z: 3
            },
            {
                x: 4,
                z: 3
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
                var _ref8 = {};
                for (var key in properties) {
                    var value = properties[key];
                    var value = properties[key];
                    if (key !== 'factor') {
                        _ref8[key] = multiply(value);
                    }
                }
                return _ref8;
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
                                        },
                                        remove: null
                                    }]
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                y: 6,
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
                    _ref: _ref,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                    _ref2: _ref2,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                    object: object,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                            _ref3: _ref3,
                            sum: sum,
                            ion: ion,
                            _ref9: _ref9,
                            templates: templates,
                            _ref12: _ref12
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
                        object: object,
                        sum: sum,
                        ion: ion,
                        _ref9: _ref9,
                        templates: templates,
                        _ref12: _ref12
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
                object.x = object.y;
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
                    object: object,
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
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
                    ion: ion,
                    _ref9: _ref9,
                    templates: templates,
                    _ref12: _ref12
                });
            }),
            {},
            {},
            {
                touch: 1,
                'touch-start': 2
            }
        ],
        _ref9,
        function () {
            var Type = function () {
            };
            var alpha = ion.patch(new Type(), { name: 'alpha' });
            var beta = ion.patch(new Type(), { name: 'beta' });
            var charlie = ion.patch(new Type(), { name: 'charlie' });
            var next = 0;
            var nextId = function () {
                return next++;
            };
            return [
                'for in reuse values',
                {},
                ion.template(function (items) {
                    var _ref10 = [];
                    for (var _i2 = 0; _i2 < items.length; _i2++) {
                        var index = _i2;
                        var item = items[_i2];
                        _ref10.push({
                            id: nextId(),
                            name: item.name,
                            index: index
                        });
                    }
                    return _ref10;
                }, function (items) {
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
                                            type: 'ForOfStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'item'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'index'
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
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'id'
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId'
                                                                        },
                                                                        arguments: []
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'name'
                                                                    },
                                                                    value: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'item'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'name'
                                                                        }
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'index'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'index'
                                                                    },
                                                                    kind: 'init'
                                                                }
                                                            ]
                                                        }
                                                    }]
                                            },
                                            remove: null
                                        }]
                                }
                            }],
                        bound: false
                    }, {
                        this: this,
                        items: items,
                        Type: Type,
                        alpha: alpha,
                        beta: beta,
                        charlie: charlie,
                        next: next,
                        nextId: nextId,
                        ion: ion,
                        _ref9: _ref9,
                        templates: templates,
                        _ref12: _ref12
                    });
                }),
                [
                    alpha,
                    beta,
                    charlie
                ],
                {
                    0: alpha,
                    1: charlie,
                    2: void 0
                },
                [
                    {
                        id: 0,
                        name: 'alpha',
                        index: 0
                    },
                    {
                        id: 2,
                        name: 'charlie',
                        index: 1
                    }
                ]
            ];
        }(),
        function () {
            var next = 0;
            var nextId = function () {
                return next++;
            };
            return [
                'for of reuse keys',
                {},
                ion.template(function (items) {
                    var _ref11 = [];
                    for (var key in items) {
                        var value = items[key];
                        var value = items[key];
                        _ref11.push({
                            id: nextId(),
                            key: key,
                            value: value
                        });
                    }
                    return _ref11;
                }, function (items) {
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
                                                name: 'items'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'id'
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId'
                                                                        },
                                                                        arguments: []
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'key'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'key'
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'value'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'value'
                                                                    },
                                                                    kind: 'init'
                                                                }
                                                            ]
                                                        }
                                                    }]
                                            },
                                            remove: null
                                        }]
                                }
                            }],
                        bound: false
                    }, {
                        this: this,
                        items: items,
                        next: next,
                        nextId: nextId,
                        ion: ion,
                        _ref9: _ref9,
                        templates: templates,
                        _ref12: _ref12
                    });
                }),
                {
                    alpha: 1,
                    beta: 2,
                    charlie: 3
                },
                {
                    beta: 3,
                    charlie: void 0
                },
                [
                    {
                        id: 0,
                        key: 'alpha',
                        value: 1
                    },
                    {
                        id: 1,
                        key: 'beta',
                        value: 3
                    }
                ]
            ];
        }()
    ];
var _ref12 = {};
for (var _i3 = 0; _i3 < templates.length; _i3++) {
    var _ref13 = templates[_i3];
    var name = _ref13[0];
    var thisArg = _ref13[1];
    var templateType = _ref13[2];
    var argument = _ref13[3];
    var patch = _ref13[4];
    var expected = _ref13[5];
    if (expected != null) {
        _ref12[name] = function (thisArg, templateType, argument, patch, expected) {
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
module.exports = exports = { test: _ref12 };
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