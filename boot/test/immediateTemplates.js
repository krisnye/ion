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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
                }
                let a = 1;
                let b = 2;
                let _ref4 = [];
                {
                    _ref4.push(a);
                    _ref4.push(b);
                    if (a > b) {
                        _ref4.push(10);
                    } else if (b > a) {
                        _ref4.push(20);
                    }
                }
                return _ref4;
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
                }
                let items = [
                        1,
                        2,
                        3
                    ];
                let _ref2 = [];
                for (let _i = 0; _i < items.length; _i++) {
                    let index = _i;
                    let item = items[_i];
                    _ref2.push(item + index);
                }
                let x = _ref2;
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
                }
                let items = {
                        a: 1,
                        b: 2,
                        c: 3
                    };
                let _ref3 = [];
                for (let key in items) {
                    let value = items[key];
                    _ref3.push(key + value);
                }
                let x = _ref3;
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
                }
                let _ref5 = [];
                {
                    let items = [
                            3,
                            2,
                            1
                        ];
                    for (let _i2 = 0; _i2 < items.length; _i2++) {
                        let item = items[_i2];
                        _ref5.push(item * 2);
                    }
                }
                return {
                    x: 1,
                    y: 2,
                    z: _ref5
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
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
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
        ],
        [
            function _template17(_ref) {
                if (this != null && this.constructor === _template17) {
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
                        test: test
                    });
                }
                let a = _ref.a;
                let b = _ref.b;
                return a + b;
            },
            [{
                    a: 1,
                    b: 2
                }],
            3
        ],
        [
            function _template18(type) {
                if (this != null && this.constructor === _template18) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'Identifier',
                                        name: 'type'
                                    },
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'position'
                                            },
                                            value: {
                                                type: 'ObjectExpression',
                                                objectType: null,
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
                                                        kind: 'init'
                                                    }]
                                            },
                                            kind: 'init'
                                        }]
                                }
                            }]
                    }, {
                        require: require,
                        module: module,
                        exports: exports,
                        type: type,
                        ion: ion,
                        templates: templates,
                        test: test
                    });
                }
                let _ref6 = new type();
                if (_ref6.position == null)
                    _ref6.position = {};
                _ref6.position.x = 10;
                return _ref6;
            },
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
        ]
    ];
const test = exports.test = function () {
        for (let _i3 = 0; _i3 < templates.length; _i3++) {
            let _ref7 = templates[_i3];
            let templateType = _ref7[0];
            let args = _ref7[1];
            let expected = _ref7[2];
            if (expected != null) {
                let template = ion.create(templateType, args);
                template.activate();
                let reactiveResult = null;
                template.watch(function (value) {
                    return reactiveResult = value;
                });
                try {
                    if (!(JSON.stringify(reactiveResult) === JSON.stringify(expected)))
                        throw new Error('Assertion Failed: (JSON.stringify(reactiveResult) is JSON.stringify(expected))');
                } catch (e) {
                    console.log(JSON.stringify(reactiveResult), JSON.stringify(expected));
                    throw e;
                }
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