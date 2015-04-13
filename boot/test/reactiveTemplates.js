void (function(){var _ion_test_reactiveTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var _ref4 = [];
{
    _ref4.push('this');
    var object = {
            x: 1,
            y: 2
        };
    _ref4.push(object);
    _ref4.push(ion.template(function () {
        return ion.createRuntime({
            type: 'Template',
            id: null,
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
                            },
                            loc: {
                                start: {
                                    line: 99,
                                    column: 20,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                },
                                end: {
                                    line: 99,
                                    column: 26,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                }
                            }
                        },
                        right: {
                            type: 'MemberExpression',
                            computed: false,
                            object: { type: 'ThisExpression' },
                            property: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            loc: {
                                start: {
                                    line: 99,
                                    column: 29,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                },
                                end: {
                                    line: 99,
                                    column: 35,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                }
                            }
                        }
                    }
                }],
            bound: false
        }, {
            this: this,
            object: object,
            ion: ion,
            _ref4: _ref4,
            templates: templates,
            _ref5: _ref5
        }, null);
    }));
    _ref4.push(object);
    _ref4.push({ x: 10 });
    _ref4.push(12);
}
var templates = [
        [
            'regular expression',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                                        },
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 8,
                                                column: 34,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'replace'
                                    },
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 19,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 8,
                                            column: 42,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
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
                                ],
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 8,
                                        column: 53,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    properties: properties,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
            }),
            { name: 'alpha' },
            {},
            'blphb'
        ],
        [
            'array comprehension for of',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
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
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                                                            }],
                                                        loc: {
                                                            start: {
                                                                line: 27,
                                                                column: 27,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 27,
                                                                column: 40,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
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
            'shared variables functions',
            {},
            ion.template(function (properties) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 35,
                                                        column: 25,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 35,
                                                        column: 42,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 35,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 35,
                                                    column: 42,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
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
                                                                        }],
                                                                    loc: {
                                                                        start: {
                                                                            line: 39,
                                                                            column: 27,
                                                                            fixed: true,
                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                        },
                                                                        end: {
                                                                            line: 39,
                                                                            column: 42,
                                                                            fixed: true,
                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                        }
                                                                    }
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
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
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
            }),
            {
                a: 1,
                b: 2
            },
            { a: 5 },
            7
        ],
        [
            'array comprehension for in',
            {},
            ion.template(function (_ref2) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
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
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                                    },
                                    loc: {
                                        start: {
                                            line: 60,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 60,
                                            column: 39,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 60,
                                        column: 29,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 60,
                                        column: 41,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    object: object,
                    ion: ion,
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
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
                return ion.template(function (object) {
                    return ion.createRuntime({
                        type: 'Template',
                        id: null,
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
                                            type: 'Literal',
                                            value: 2
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
                                            name: 'sum'
                                        },
                                        init: {
                                            type: 'Function',
                                            context: true,
                                            value: function (_ps) {
                                                return ion.template(function (_ref3) {
                                                    return ion.createRuntime({
                                                        type: 'Template',
                                                        id: null,
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
                                                                    operator: '*',
                                                                    left: {
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
                                                                    },
                                                                    right: {
                                                                        type: 'Identifier',
                                                                        name: 'factor'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        bound: false,
                                                        name: {
                                                            type: 'Identifier',
                                                            name: 'sum'
                                                        },
                                                        scope: {
                                                            type: 'Identifier',
                                                            name: '_ps'
                                                        }
                                                    }, {
                                                        this: this,
                                                        _ref3: _ref3,
                                                        _ps: _ps,
                                                        object: object,
                                                        ion: ion,
                                                        _ref4: _ref4,
                                                        templates: templates,
                                                        _ref5: _ref5
                                                    }, _ps);
                                                });
                                            }
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 76,
                                                    column: 27,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 76,
                                                    column: 37,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 76,
                                            column: 23,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 76,
                                            column: 38,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                }
                            }
                        ],
                        bound: false
                    }, {
                        this: this,
                        ion: ion,
                        object: object,
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    }, null);
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
            8
        ],
        [
            'literal objects',
            {},
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
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
                    _ref4: _ref4,
                    templates: templates,
                    _ref5: _ref5
                }, null);
            }),
            {},
            {},
            {
                touch: 1,
                'touch-start': 2
            }
        ],
        _ref4,
        function () {
            var alpha = 100;
            var beta = 200;
            var charlie = 300;
            var next = 0;
            var nextId = function () {
                return next++;
            };
            return [
                'for in reuse values',
                {},
                ion.template(function (items) {
                    return ion.createRuntime({
                        type: 'Template',
                        id: null,
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
                                                                        arguments: [],
                                                                        loc: {
                                                                            start: {
                                                                                line: 116,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 116,
                                                                                column: 38,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'number'
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'item'
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
                        alpha: alpha,
                        beta: beta,
                        charlie: charlie,
                        next: next,
                        nextId: nextId,
                        ion: ion,
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    }, null);
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
                        number: alpha,
                        index: 0
                    },
                    {
                        id: 2,
                        number: charlie,
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
                    return ion.createRuntime({
                        type: 'Template',
                        id: null,
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
                                                                        arguments: [],
                                                                        loc: {
                                                                            start: {
                                                                                line: 130,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 130,
                                                                                column: 38,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
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
                        _ref4: _ref4,
                        templates: templates,
                        _ref5: _ref5
                    }, null);
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
var _ref5 = {};
{
    var lowestBefore = Number.MAX_SAFE_INTEGER;
    var totalComplete = 0;
    for (var _i = 0; _i < templates.length; _i++) {
        var _ref6 = templates[_i];
        var name = _ref6[0];
        var thisArg = _ref6[1];
        var templateType = _ref6[2];
        var argument = _ref6[3];
        var patch = _ref6[4];
        var expected = _ref6[5];
        if (expected != null) {
            _ref5[name] = function (thisArg, templateType, argument, patch, expected) {
                return function (done) {
                    var beforeCount = ion.observe.count != null ? ion.observe.count : 0;
                    var template = templateType.call(thisArg, argument);
                    var finished = function () {
                        unobserve();
                        unobserveValue != null ? unobserveValue() : void 0;
                        var afterCount = ion.observe.count != null ? ion.observe.count : 0;
                        totalComplete++;
                        lowestBefore = Math.min(beforeCount, lowestBefore);
                        if (totalComplete === templates.length && afterCount > lowestBefore) {
                            done('ion.observe memory leak detected, beforeCount: ' + lowestBefore + ', afterCount: ' + afterCount);
                        } else {
                            done();
                        }
                    };
                    function checkIfDone(check) {
                        if (JSON.stringify(check) === JSON.stringify(expected)) {
                            if (unobserve != null) {
                                finished();
                            } else {
                                setTimeout(finished, 0);
                            }
                        }
                    }
                    template.activate();
                    var watchCount = ion.observe.count != null ? ion.observe.count : 0;
                    var unobserveValue;
                    var unobserve = template.observe(function (value) {
                            checkIfDone(value);
                            unobserveValue != null ? unobserveValue() : void 0;
                            unobserveValue = ion.observe(value, function (changes) {
                                checkIfDone(value);
                            });
                        });
                    ion.patch(argument, patch);
                    ion.checkForChanges();
                };
            }(thisArg, templateType, argument, patch, expected);
        }
    }
}
module.exports = exports = { test: _ref5 };
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
//# sourceMappingURL=./reactiveTemplates.map