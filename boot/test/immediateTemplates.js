void (function(){var _ion_test_immediateTemplates_ = function(module,exports,require){'use strict';
var ion = require('../');
var templates = [
        [
            ion.template(function () {
                var a = 1, b = 2, c = a + b;
                return c;
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            3
        ],
        [
            ion.template(function () {
                return {
                    a: 1,
                    b: 2
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            {
                a: 1,
                b: 2
            }
        ],
        [
            ion.template(function () {
                return [
                    1,
                    2
                ];
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
            ion.template(function () {
                var a = 1;
                var b = 2;
                var _ref4 = [];
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
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                var items = [
                        1,
                        2,
                        3
                    ];
                var _ref2 = [];
                for (var _i = 0; _i < items.length; _i++) {
                    var index = _i;
                    var item = items[_i];
                    _ref2.push(item + index);
                }
                var x = _ref2;
                return x;
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                var items = {
                        a: 1,
                        b: 2,
                        c: 3
                    };
                var _ref3 = [];
                for (var key in items) {
                    var value = items[key];
                    _ref3.push(key + value);
                }
                var x = _ref3;
                return x;
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                var object = { a: { b: 1 } };
                return object.a.b;
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return false ? 1 : 2;
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            2
        ],
        [
            ion.template(function () {
                return null != null ? null : 2;
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            2
        ],
        [
            ion.template(function () {
                var a = null;
                var b = 2;
                return [
                    a != null,
                    b != null
                ];
            }, function () {
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
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                false,
                true
            ]
        ],
        [
            ion.template(function () {
                return Math.min(1, 2);
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return Math.min.call(null, 1, 2);
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            1
        ],
        [
            ion.template(function () {
                return new Date(2011, 10, 5);
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            new Date(2011, 10, 5)
        ],
        [
            ion.template(function () {
                return /foo/;
            }, function () {
                return ion.createRuntime({
                    type: 'Template',
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: /foo/
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            /foo/
        ],
        [
            ion.template(function () {
                var _ref5 = [];
                {
                    var items = [
                            3,
                            2,
                            1
                        ];
                    for (var _i2 = 0; _i2 < items.length; _i2++) {
                        var item = items[_i2];
                        _ref5.push(item * 2);
                    }
                }
                return {
                    x: 1,
                    y: 2,
                    z: _ref5
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                return [
                    null != null ? null : 1,
                    void 0 != null ? void 0 : 2
                ];
            }, function () {
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
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            [
                1,
                2
            ]
        ],
        [
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
                    templates: templates,
                    test: test
                });
            }),
            [{
                    a: 1,
                    b: 2
                }],
            3
        ],
        [
            ion.template(function (type) {
                return ion.patch(new type(), { position: { x: 10 } });
            }, function (type) {
                return ion.createRuntime({
                    type: 'Template',
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
                                                    kind: 'init'
                                                }]
                                        },
                                        kind: 'init'
                                    }]
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    type: type,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                ion.patch(output, { e: input.a + input.b });
                return output;
            }, function (input, output) {
                return ion.createRuntime({
                    type: 'Template',
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
                                                }
                                            }
                                        },
                                        kind: 'init'
                                    }]
                            },
                            kind: 'init'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'output'
                            }
                        }
                    ],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    input: input,
                    output: output,
                    ion: ion,
                    templates: templates,
                    test: test
                });
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
                return ion.patch;
            }, function () {
                return ion.createRuntime({
                    type: 'Template',
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
                                }
                            }
                        }],
                    bound: false
                }, {
                    this: this,
                    require: require,
                    module: module,
                    exports: exports,
                    ion: ion,
                    templates: templates,
                    test: test
                });
            }),
            [],
            ion.patch
        ]
    ];
var test = exports.test = function () {
        for (var _i3 = 0; _i3 < templates.length; _i3++) {
            var _ref6 = templates[_i3];
            var templateType = _ref6[0];
            var args = _ref6[1];
            var expected = _ref6[2];
            if (expected != null) {
                var template = templateType.template.apply(this, args);
                template.activate();
                var reactiveResult = null;
                template.watch(function (value) {
                    return reactiveResult = value;
                });
                try {
                    if (!(reactiveResult === expected || JSON.stringify(reactiveResult) === JSON.stringify(expected)))
                        throw new Error('Assertion Failed: (reactiveResult is expected or JSON.stringify(reactiveResult) is JSON.stringify(expected))');
                } catch (e) {
                    console.log(reactiveResult, '!==', expected);
                    throw e;
                }
                template.deactivate();
                if (!(reactiveResult === void 0))
                    throw new Error('Assertion Failed: (reactiveResult is undefined)');
                var imperativeResult = templateType.apply(null, args);
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
//@ sourceMappingURL=./immediateTemplates.map