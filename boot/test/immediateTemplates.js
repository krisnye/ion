void (function(){var _ion_test_immediateTemplates_ = function(module,exports,require){'use strict';
const ion = require('../');
const templates = [
        [
            function _template() {
                if (this != null && this.constructor === _template) {
                    return ion.createRuntime({
                        type: 'Template',
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
                                kind: 'const'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'c'
                                }
                            }
                        ]
                    }, {});
                }
                const a = 1, b = 2, c = a + b;
                return c;
            },
            [],
            3
        ],
        [
            function _template2() {
                if (this != null && this.constructor === _template2) {
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
                                                name: 'a'
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
                                                type: 'Identifier',
                                                name: 'b'
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
                    }, {});
                }
                return {
                    a: 1,
                    b: 2
                };
            },
            [],
            {
                a: 1,
                b: 2
            }
        ],
        [
            function _template3() {
                if (this != null && this.constructor === _template3) {
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
                                    properties: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Literal',
                                                value: 1
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Literal',
                                                value: 2
                                            }
                                        }
                                    ]
                                }
                            }]
                    }, {});
                }
                return [
                    1,
                    2
                ];
            },
            [],
            [
                1,
                2
            ]
        ],
        [
            function _template4() {
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
                                            type: 'Literal',
                                            value: 1
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
                                            type: 'Literal',
                                            value: 2
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
                                    properties: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Identifier',
                                                name: 'a'
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Identifier',
                                                name: 'b'
                                            }
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
                                                        }
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
                                                            }
                                                        }]
                                                },
                                                alternate: null
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }, {});
                }
                let a = 1;
                let b = 2;
                let _ref3 = [];
                {
                    _ref3.push(a);
                    _ref3.push(b);
                    if (a > b) {
                        _ref3.push(10);
                    } else if (b > a) {
                        _ref3.push(20);
                    }
                }
                return _ref3;
            },
            [],
            [
                1,
                2,
                20
            ]
        ],
        [
            function _template5() {
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
                                kind: 'let'
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
                                                    }
                                                }]
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'x'
                                }
                            }
                        ]
                    }, {});
                }
                let items = [
                        1,
                        2,
                        3
                    ];
                let _ref = [];
                for (let _i = 0; _i < items.length; _i++) {
                    let index = _i;
                    let item = items[_i];
                    _ref.push(item + index);
                }
                let x = _ref;
                return x;
            },
            [],
            [
                1,
                3,
                5
            ]
        ],
        [
            function _template6() {
                if (this != null && this.constructor === _template6) {
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
                                                    kind: 'init'
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
                                                    kind: 'init'
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
                                                    kind: 'init'
                                                }
                                            ]
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
                                                    }
                                                }]
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'x'
                                }
                            }
                        ]
                    }, {});
                }
                let items = {
                        a: 1,
                        b: 2,
                        c: 3
                    };
                let _ref2 = [];
                for (let key in items) {
                    let value = items[key];
                    _ref2.push(key + value);
                }
                let x = _ref2;
                return x;
            },
            [],
            [
                'a1',
                'b2',
                'c3'
            ]
        ],
        [
            function _template7() {
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
                                                                kind: 'init'
                                                            }]
                                                    },
                                                    kind: 'init'
                                                }]
                                        }
                                    }],
                                kind: 'let'
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
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'b'
                                    }
                                }
                            }
                        ]
                    }, {});
                }
                let object = { a: { b: 1 } };
                return object.a.b;
            },
            [],
            1
        ],
        [
            function _template8() {
                if (this != null && this.constructor === _template8) {
                    return ion.createRuntime({
                        type: 'Template',
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
                                }
                            }]
                    }, {});
                }
                return false ? 1 : 2;
            },
            [],
            2
        ],
        [
            function _template9() {
                if (this != null && this.constructor === _template9) {
                    return ion.createRuntime({
                        type: 'Template',
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
                                }
                            }]
                    }, {});
                }
                return null != null ? null : 2;
            },
            [],
            2
        ],
        [
            function _template10() {
                if (this != null && this.constructor === _template10) {
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
                                            type: 'Literal',
                                            value: null
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
                                            type: 'Literal',
                                            value: 2
                                        }
                                    }],
                                kind: 'let'
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
                                }
                            }
                        ]
                    }, {});
                }
                let a = null;
                let b = 2;
                return [
                    a != null,
                    b != null
                ];
            },
            [],
            [
                false,
                true
            ]
        ],
        [
            function _template11() {
                if (this != null && this.constructor === _template11) {
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
                                            name: 'Math'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'min'
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
                                    ]
                                }
                            }]
                    }, {});
                }
                return Math.min(1, 2);
            },
            [],
            1
        ],
        [
            function _template12() {
                if (this != null && this.constructor === _template12) {
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
                                                name: 'Math'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'min'
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'call'
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
                                    ]
                                }
                            }]
                    }, {});
                }
                return Math.min.call(null, 1, 2);
            },
            [],
            1
        ],
        [
            function _template13() {
                if (this != null && this.constructor === _template13) {
                    return ion.createRuntime({
                        type: 'Template',
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
                                }
                            }]
                    }, {});
                }
                return new Date(2011, 10, 5);
            },
            [],
            new Date(2011, 10, 5)
        ],
        [
            function _template14() {
                if (this != null && this.constructor === _template14) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: /foo/
                                }
                            }]
                    }, {});
                }
                return /foo/;
            },
            [],
            /foo/
        ],
        [
            function _template15() {
                if (this != null && this.constructor === _template15) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: null,
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
                                            kind: 'init'
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
                                            kind: 'init'
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
                                                        kind: 'let'
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
                                                                    }
                                                                }]
                                                        }
                                                    }
                                                ]
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                }
                            }]
                    }, {});
                }
                let _ref4 = [];
                {
                    let items = [
                            3,
                            2,
                            1
                        ];
                    for (let _i2 = 0; _i2 < items.length; _i2++) {
                        let item = items[_i2];
                        _ref4.push(item * 2);
                    }
                }
                return {
                    x: 1,
                    y: 2,
                    z: _ref4
                };
            },
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
            function _template16() {
                if (this != null && this.constructor === _template16) {
                    return ion.createRuntime({
                        type: 'Template',
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
                                }
                            }]
                    }, {});
                }
                return [
                    null != null ? null : 1,
                    void 0 != null ? void 0 : 2
                ];
            },
            [],
            [
                1,
                2
            ]
        ]
    ];
const test = exports.test = function () {
        for (let _i3 = 0; _i3 < templates.length; _i3++) {
            let _ref5 = templates[_i3];
            let templateType = _ref5[0];
            let args = _ref5[1];
            let expected = _ref5[2];
            if (expected != null) {
                let template = ion.create(templateType, args);
                template.activate();
                let reactiveResult = null;
                template.watch(function (value) {
                    return reactiveResult = value;
                });
                if (!(JSON.stringify(reactiveResult) === JSON.stringify(expected)))
                    throw new Error('Assertion Failed: (JSON.stringify(reactiveResult) is JSON.stringify(expected))');
                template.deactivate();
                if (!(reactiveResult === void 0))
                    throw new Error('Assertion Failed: (reactiveResult is undefined)');
                let imperativeResult = templateType.apply(null, args);
                if (!(JSON.stringify(imperativeResult) === JSON.stringify(expected)))
                    throw new Error('Assertion Failed: (JSON.stringify(imperativeResult) is JSON.stringify(expected))');
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