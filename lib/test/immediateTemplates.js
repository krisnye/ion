void (function(){var _ion_test_immediateTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var templates = [
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    init: {
                                        type: 'Literal',
                                        value: 1
                                    }
                                },
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'b'
                                    },
                                    init: {
                                        type: 'Literal',
                                        value: 2
                                    }
                                },
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'c'
                                    },
                                    init: {
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
                            kind: 'const',
                            order: '0'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            order: '1'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            3
        ],
        [
            ion.template(function (rows) {
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
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'item'
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'rows'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'IfStatement',
                                                    test: {
                                                        type: 'UnaryExpression',
                                                        operator: '?',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'item'
                                                        }
                                                    },
                                                    consequent: {
                                                        type: 'BlockStatement',
                                                        body: [{
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'item'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'toString'
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 18,
                                                                                column: 24,
                                                                                fixed: true,
                                                                                source: 'ion/test/immediateTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 18,
                                                                                column: 37,
                                                                                fixed: true,
                                                                                source: 'ion/test/immediateTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [],
                                                                    loc: {
                                                                        start: {
                                                                            line: 18,
                                                                            column: 24,
                                                                            fixed: true,
                                                                            source: 'ion/test/immediateTemplates.ion'
                                                                        },
                                                                        end: {
                                                                            line: 18,
                                                                            column: 39,
                                                                            fixed: true,
                                                                            source: 'ion/test/immediateTemplates.ion'
                                                                        }
                                                                    }
                                                                },
                                                                order: '0'
                                                            }]
                                                    },
                                                    alternate: {
                                                        type: 'BlockStatement',
                                                        body: [{
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    type: 'Literal',
                                                                    value: '<null>'
                                                                },
                                                                order: '0'
                                                            }]
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        remove: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        argument: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'rows'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'length'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 23,
                                                                    column: 25,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 23,
                                                                    column: 36,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        order: '0'
                                    }]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    rows: rows,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [[
                    1,
                    null,
                    2,
                    3,
                    null,
                    4
                ]],
            [
                '1',
                '<null>',
                '2',
                '3',
                '<null>',
                '4'
            ]
        ],
        [
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
                                            name: 'a'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        kind: 'init',
                                        order: '0'
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        kind: 'init',
                                        order: '1'
                                    }
                                ]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            {
                a: 1,
                b: 2
            }
        ],
        [
            ion.template(function () {
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
                                properties: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        order: '0'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        order: '1'
                                    }
                                ]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'Literal',
                                        value: 1
                                    }
                                }],
                            kind: 'let',
                            order: '0'
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
                                        type: 'Literal',
                                        value: 2
                                    }
                                }],
                            kind: 'let',
                            order: '1'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ArrayExpression',
                                    elements: []
                                },
                                properties: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        order: '0'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        order: '1'
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '>',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'Literal',
                                                        value: 10
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        alternate: {
                                            type: 'IfStatement',
                                            test: {
                                                type: 'BinaryExpression',
                                                operator: '>',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                }
                                            },
                                            consequent: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'Literal',
                                                            value: 20
                                                        },
                                                        order: '0'
                                                    }]
                                            },
                                            alternate: null
                                        },
                                        order: '2'
                                    }
                                ]
                            },
                            order: '2'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                1,
                2,
                20
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Literal',
                                                value: 1
                                            },
                                            {
                                                type: 'Literal',
                                                value: 2
                                            },
                                            {
                                                type: 'Literal',
                                                value: 3
                                            }
                                        ]
                                    }
                                }],
                            kind: 'let',
                            order: '0'
                        },
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    init: {
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'item'
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'index'
                                                        }
                                                    }
                                                },
                                                order: '0'
                                            }]
                                    }
                                }],
                            kind: 'let',
                            order: '1'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            order: '2'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                1,
                3,
                5
            ]
        ],
        [
            ion.template(function () {
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
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                kind: 'init',
                                                order: '0'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 2
                                                },
                                                kind: 'init',
                                                order: '1'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 3
                                                },
                                                kind: 'init',
                                                order: '2'
                                            }
                                        ]
                                    }
                                }],
                            kind: 'let',
                            order: '0'
                        },
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    init: {
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        }
                                                    }
                                                },
                                                order: '0'
                                            }]
                                    }
                                }],
                            kind: 'let',
                            order: '1'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            order: '2'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                'a1',
                'b2',
                'c3'
            ]
        ],
        [
            ion.template(function () {
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
                                        name: 'object'
                                    },
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [{
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                value: {
                                                    type: 'ObjectExpression',
                                                    properties: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'b'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: 1
                                                            },
                                                            kind: 'init',
                                                            order: '0'
                                                        }]
                                                },
                                                kind: 'init',
                                                order: '0'
                                            }]
                                    }
                                }],
                            kind: 'let',
                            order: '0'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'object'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    existential: true,
                                    loc: {
                                        start: {
                                            line: 74,
                                            column: 19,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 74,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'b'
                                },
                                existential: true,
                                loc: {
                                    start: {
                                        line: 74,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 74,
                                        column: 31,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    }
                                }
                            },
                            order: '1'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'Literal',
                                    value: false
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: 1
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2
                                }
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            2
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'BinaryExpression',
                                    operator: '!=',
                                    left: {
                                        type: 'Literal',
                                        value: null
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: null
                                    }
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: null
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2
                                }
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            2
        ],
        [
            ion.template(function () {
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
                                        type: 'Literal',
                                        value: null
                                    }
                                }],
                            kind: 'let',
                            order: '0'
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
                                        type: 'Literal',
                                        value: 2
                                    }
                                }],
                            kind: 'let',
                            order: '1'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'UnaryExpression',
                                        operator: '?',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a'
                                        }
                                    },
                                    {
                                        type: 'UnaryExpression',
                                        operator: '?',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                ]
                            },
                            order: '2'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                false,
                true
            ]
        ],
        [
            ion.template(function () {
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
                                        name: 'Math'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'min'
                                    },
                                    loc: {
                                        start: {
                                            line: 93,
                                            column: 20,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 93,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 1
                                    },
                                    {
                                        type: 'Literal',
                                        value: 2
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 93,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 93,
                                        column: 34,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    }
                                }
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            1
        ],
        [
            ion.template(function () {
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
                                            name: 'Math'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'min'
                                        },
                                        loc: {
                                            start: {
                                                line: 97,
                                                column: 20,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 97,
                                                column: 28,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'call'
                                    },
                                    loc: {
                                        start: {
                                            line: 97,
                                            column: 20,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 97,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: null
                                    },
                                    {
                                        type: 'Literal',
                                        value: 1
                                    },
                                    {
                                        type: 'Literal',
                                        value: 2
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 97,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 97,
                                        column: 45,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    }
                                }
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'NewExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'Date'
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 2011
                                    },
                                    {
                                        type: 'Literal',
                                        value: 10
                                    },
                                    {
                                        type: 'Literal',
                                        value: 5
                                    }
                                ]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            new Date(2011, 10, 5)
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: /foo/
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            /foo/
        ],
        [
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
                                            name: 'x'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        kind: 'init',
                                        order: '0'
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        kind: 'init',
                                        order: '1'
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                        value: {
                                            type: 'ObjectExpression',
                                            objectType: {
                                                type: 'ArrayExpression',
                                                elements: []
                                            },
                                            properties: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'items'
                                                            },
                                                            init: {
                                                                type: 'ArrayExpression',
                                                                elements: [
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 3
                                                                    },
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 2
                                                                    },
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 1
                                                                    }
                                                                ]
                                                            }
                                                        }],
                                                    kind: 'let',
                                                    order: '0'
                                                },
                                                {
                                                    type: 'ForOfStatement',
                                                    left: {
                                                        type: 'VariableDeclaration',
                                                        declarations: [{
                                                                type: 'VariableDeclarator',
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'item'
                                                                },
                                                                init: null
                                                            }],
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
                                                                    type: 'BinaryExpression',
                                                                    operator: '*',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'item'
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 2
                                                                    }
                                                                },
                                                                order: '0'
                                                            }]
                                                    },
                                                    remove: null,
                                                    order: '1'
                                                }
                                            ]
                                        },
                                        kind: 'init',
                                        order: '2'
                                    }
                                ]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            {
                x: 1,
                y: 2,
                z: [
                    6,
                    4,
                    2
                ]
            }
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!=',
                                            left: {
                                                type: 'Literal',
                                                value: null
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null
                                            }
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: null
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    },
                                    {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!=',
                                            left: {
                                                type: 'UnaryExpression',
                                                operator: 'void',
                                                prefix: true,
                                                argument: {
                                                    type: 'Literal',
                                                    value: 0
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null
                                            }
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: 'void',
                                            prefix: true,
                                            argument: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: 2
                                        }
                                    }
                                ]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
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
                            kind: 'let',
                            order: '0'
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
                            kind: 'let',
                            order: '1'
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
                            },
                            order: '2'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    _ref: _ref,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [{
                    a: 1,
                    b: 2
                }],
            3
        ],
        [
            ion.template(function (type) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'NewExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'type'
                                    },
                                    arguments: []
                                },
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'position'
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
                                                        type: 'Literal',
                                                        value: 10
                                                    },
                                                    kind: 'init',
                                                    order: '0'
                                                }]
                                        },
                                        kind: 'init',
                                        order: '0'
                                    }]
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    type: type,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [function () {
                    this.position = {
                        x: 1,
                        y: 2
                    };
                }],
            {
                position: {
                    x: 10,
                    y: 2
                }
            }
        ],
        [
            ion.template(function (input, output) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'output'
                            },
                            value: {
                                type: 'ObjectExpression',
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'e'
                                        },
                                        value: {
                                            type: 'BinaryExpression',
                                            operator: '+',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'input'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 139,
                                                        column: 19,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 139,
                                                        column: 26,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'input'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 139,
                                                        column: 29,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 139,
                                                        column: 36,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    }
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        order: '0'
                                    }]
                            },
                            kind: 'init',
                            order: '0'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'output'
                            },
                            order: '1'
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    input: input,
                    output: output,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [
                {
                    a: 1,
                    b: 2
                },
                {
                    c: 3,
                    d: 4
                }
            ],
            {
                c: 3,
                d: 4,
                e: 3
            }
        ],
        [
            ion.template(function () {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'ion'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'patch'
                                },
                                loc: {
                                    start: {
                                        line: 146,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 146,
                                        column: 29,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    }
                                }
                            },
                            order: '0'
                        }],
                    bound: false
                }, {
                    this: this,
                    ion: ion,
                    templates: templates,
                    test: test
                }, null);
            }),
            [],
            ion.patch
        ]
    ];
var test = exports.test = function () {
        for (var _i = 0; _i < templates.length; _i++) {
            var index = _i;
            var _ref2 = templates[_i];
            var templateType = _ref2[0];
            var args = _ref2[1];
            var expected = _ref2[2];
            if (expected != null) {
                var template = templateType.apply(this, args);
                var reactiveResult = null;
                var beforeCount = ion.observe.count != null ? ion.observe.count : 0;
                var unobserve = template.observe(function (value) {
                        return reactiveResult = value;
                    });
                var watchCount = ion.observe.count != null ? ion.observe.count : 0;
                try {
                    if (!(reactiveResult === expected || JSON.stringify(reactiveResult) === JSON.stringify(expected)))
                        throw new Error('Assertion Failed: (reactiveResult is expected or JSON.stringify(reactiveResult) is JSON.stringify(expected))');
                } catch (e) {
                    console.log(reactiveResult, '!==', expected);
                    throw e;
                }
                unobserve();
                var afterCount = ion.observe.count != null ? ion.observe.count : 0;
                if (afterCount !== beforeCount) {
                    throw new Error('Template observe leak in template ' + index + '.  Before: ' + beforeCount + ', After: ' + afterCount);
                }
            }
        }
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/immediateTemplates',_ion_test_immediateTemplates_);
    else
      _ion_test_immediateTemplates_.call(this, module, exports, require);
  }
  else {
    _ion_test_immediateTemplates_.call(this);
  }
}).call(this)