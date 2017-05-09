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
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 99,
                                        column: 25,
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
                                name: 'y',
                                loc: {
                                    start: {
                                        line: 99,
                                        column: 34,
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
                    },
                    order: '0'
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
                                            name: 'properties',
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 29,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'name',
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 30,
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
                                        name: 'replace',
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 35,
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
                            },
                            order: '0'
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
                                                        name: 'key',
                                                        loc: {
                                                            start: {
                                                                line: 16,
                                                                column: 28,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 16,
                                                                column: 31,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties',
                                            loc: {
                                                start: {
                                                    line: 16,
                                                    column: 35,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 16,
                                                    column: 45,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Identifier',
                                                name: 'key',
                                                loc: {
                                                    start: {
                                                        line: 16,
                                                        column: 20,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 16,
                                                        column: 23,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            }
                                        },
                                        order: '0'
                                    }]
                            },
                            order: '0'
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
                                        name: 'double',
                                        loc: {
                                            start: {
                                                line: 24,
                                                column: 18,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 24,
                                                column: 24,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'Function',
                                        context: false,
                                        value: function double(a) {
                                            return a * 2;
                                        }
                                    }
                                }],
                            kind: 'const',
                            order: '0'
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
                                                        name: 'key',
                                                        loc: {
                                                            start: {
                                                                line: 26,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 26,
                                                                column: 23,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'value',
                                                        loc: {
                                                            start: {
                                                                line: 26,
                                                                column: 25,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 26,
                                                                column: 30,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'properties',
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 34,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 44,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'key',
                                                        loc: {
                                                            start: {
                                                                line: 27,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 27,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'double',
                                                            loc: {
                                                                start: {
                                                                    line: 27,
                                                                    column: 27,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 27,
                                                                    column: 33,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'value',
                                                                loc: {
                                                                    start: {
                                                                        line: 27,
                                                                        column: 34,
                                                                        fixed: true,
                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 27,
                                                                        column: 39,
                                                                        fixed: true,
                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                    }
                                                                }
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
                                                    computed: true,
                                                    order: '0'
                                                }]
                                        },
                                        remove: null,
                                        order: '0'
                                    }]
                            },
                            order: '1'
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
                z: 6
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
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 46,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 46,
                                                column: 20,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'a',
                                            loc: {
                                                start: {
                                                    line: 46,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 46,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
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
                                        name: 'b',
                                        loc: {
                                            start: {
                                                line: 46,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 46,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'b',
                                            loc: {
                                                start: {
                                                    line: 46,
                                                    column: 21,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 46,
                                                    column: 22,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
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
                                    name: 'a',
                                    loc: {
                                        start: {
                                            line: 46,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 46,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'b',
                                    loc: {
                                        start: {
                                            line: 46,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 46,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
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
                                        name: 'items',
                                        loc: {
                                            start: {
                                                line: 53,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 53,
                                                column: 24,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: '_ref2'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'items',
                                            loc: {
                                                start: {
                                                    line: 53,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 53,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        computed: false
                                    }
                                }],
                            kind: 'let',
                            order: '0'
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
                                                        name: 'x',
                                                        loc: {
                                                            start: {
                                                                line: 53,
                                                                column: 41,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 53,
                                                                column: 42,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                },
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        loc: {
                                                            start: {
                                                                line: 53,
                                                                column: 44,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 53,
                                                                column: 45,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }
                                            ],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'items',
                                            loc: {
                                                start: {
                                                    line: 53,
                                                    column: 49,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 53,
                                                    column: 54,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    loc: {
                                                        start: {
                                                            line: 53,
                                                            column: 31,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 53,
                                                            column: 32,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    loc: {
                                                        start: {
                                                            line: 53,
                                                            column: 35,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 53,
                                                            column: 36,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        order: '0'
                                    }]
                            },
                            order: '1'
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
                                        name: 'object',
                                        loc: {
                                            start: {
                                                line: 60,
                                                column: 29,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 60,
                                                column: 35,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'sum',
                                        loc: {
                                            start: {
                                                line: 60,
                                                column: 36,
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
                            },
                            order: '0'
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
                                            name: 'factor',
                                            loc: {
                                                start: {
                                                    line: 73,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 73,
                                                    column: 26,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        init: {
                                            type: 'Literal',
                                            value: 2
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
                                            name: 'sum',
                                            loc: {
                                                start: {
                                                    line: 74,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 74,
                                                    column: 23,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
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
                                                                            name: 'a',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 74,
                                                                                    column: 43,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 74,
                                                                                    column: 44,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
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
                                                                                    name: 'deep',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 74,
                                                                                            column: 37,
                                                                                            fixed: true,
                                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 74,
                                                                                            column: 41,
                                                                                            fixed: true,
                                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                computed: false
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'a',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 74,
                                                                                        column: 43,
                                                                                        fixed: true,
                                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 74,
                                                                                        column: 44,
                                                                                        fixed: true,
                                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                                    }
                                                                                }
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
                                                                            name: 'b',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 74,
                                                                                    column: 45,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 74,
                                                                                    column: 46,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
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
                                                                                    name: 'deep',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 74,
                                                                                            column: 37,
                                                                                            fixed: true,
                                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 74,
                                                                                            column: 41,
                                                                                            fixed: true,
                                                                                            source: 'ion/test/reactiveTemplates.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                computed: false
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'b',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 74,
                                                                                        column: 45,
                                                                                        fixed: true,
                                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 74,
                                                                                        column: 46,
                                                                                        fixed: true,
                                                                                        source: 'ion/test/reactiveTemplates.ion'
                                                                                    }
                                                                                }
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
                                                                    operator: '*',
                                                                    left: {
                                                                        type: 'BinaryExpression',
                                                                        operator: '+',
                                                                        left: {
                                                                            type: 'Identifier',
                                                                            name: 'a',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 75,
                                                                                    column: 28,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 75,
                                                                                    column: 29,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        right: {
                                                                            type: 'Identifier',
                                                                            name: 'b',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 75,
                                                                                    column: 32,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 75,
                                                                                    column: 33,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Identifier',
                                                                        name: 'factor',
                                                                        loc: {
                                                                            start: {
                                                                                line: 75,
                                                                                column: 37,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 75,
                                                                                column: 43,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                order: '2'
                                                            }
                                                        ],
                                                        bound: false,
                                                        name: {
                                                            type: 'Identifier',
                                                            name: 'sum',
                                                            loc: {
                                                                start: {
                                                                    line: 74,
                                                                    column: 20,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 74,
                                                                    column: 23,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
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
                                kind: 'let',
                                order: '1'
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'sum',
                                        loc: {
                                            start: {
                                                line: 76,
                                                column: 23,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 76,
                                                column: 26,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    arguments: [{
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'object',
                                                loc: {
                                                    start: {
                                                        line: 76,
                                                        column: 27,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 76,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'one',
                                                loc: {
                                                    start: {
                                                        line: 76,
                                                        column: 34,
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
                                },
                                order: '2'
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
                                            name: 'touch',
                                            loc: {
                                                start: {
                                                    line: 91,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 91,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
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
                                            type: 'Literal',
                                            value: 'touch-start'
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
        [
            'correct ordering of array items',
            {},
            ion.template(function (object) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'ObjectExpression',
                                objectType: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Literal',
                                            value: 1
                                        },
                                        {
                                            type: 'Literal',
                                            value: 2
                                        }
                                    ]
                                },
                                properties: [
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'object',
                                                loc: {
                                                    start: {
                                                        line: 108,
                                                        column: 19,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 108,
                                                        column: 25,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'a',
                                                loc: {
                                                    start: {
                                                        line: 108,
                                                        column: 26,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 108,
                                                        column: 27,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 108,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 108,
                                                    column: 27,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'Literal',
                                                        value: 'Alpha'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 109,
                                                            column: 20,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 109,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        alternate: null,
                                        order: '0'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 'Beta'
                                        },
                                        loc: {
                                            start: {
                                                line: 110,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 110,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        },
                                        order: '1'
                                    },
                                    {
                                        type: 'ForInStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'key',
                                                        loc: {
                                                            start: {
                                                                line: 111,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 111,
                                                                column: 23,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'object',
                                                loc: {
                                                    start: {
                                                        line: 111,
                                                        column: 27,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 111,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'keys',
                                                loc: {
                                                    start: {
                                                        line: 111,
                                                        column: 34,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 111,
                                                        column: 38,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 111,
                                                    column: 27,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 111,
                                                    column: 38,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'Identifier',
                                                        name: 'key',
                                                        loc: {
                                                            start: {
                                                                line: 112,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 112,
                                                                column: 23,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 112,
                                                            column: 20,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 112,
                                                            column: 23,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        remove: null,
                                        order: '2'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 'Charlie'
                                        },
                                        loc: {
                                            start: {
                                                line: 113,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 113,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        },
                                        order: '3'
                                    },
                                    {
                                        type: 'ForOfStatement',
                                        left: {
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'item',
                                                        loc: {
                                                            start: {
                                                                line: 114,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 114,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'object',
                                                loc: {
                                                    start: {
                                                        line: 114,
                                                        column: 28,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 114,
                                                        column: 34,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'items',
                                                loc: {
                                                    start: {
                                                        line: 114,
                                                        column: 35,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 114,
                                                        column: 40,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 114,
                                                    column: 28,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 114,
                                                    column: 40,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'Identifier',
                                                        name: 'item',
                                                        loc: {
                                                            start: {
                                                                line: 115,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 115,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 115,
                                                            column: 20,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 115,
                                                            column: 24,
                                                            fixed: true,
                                                            source: 'ion/test/reactiveTemplates.ion'
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        remove: null,
                                        order: '4'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 'Delta'
                                        },
                                        loc: {
                                            start: {
                                                line: 116,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 116,
                                                column: 23,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        },
                                        order: '5'
                                    }
                                ]
                            },
                            order: '0'
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
                a: false,
                keys: {
                    c: 1,
                    b: 2,
                    a: 3
                },
                items: [
                    3,
                    2,
                    1
                ]
            },
            {
                a: true,
                keys: {
                    c: void 0,
                    d: 4,
                    aa: 1
                },
                items: { 0: 4 }
            },
            [
                1,
                2,
                'Alpha',
                'Beta',
                'b',
                'a',
                'd',
                'aa',
                'Charlie',
                4,
                2,
                1,
                'Delta'
            ]
        ],
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
                                                            name: 'item',
                                                            loc: {
                                                                start: {
                                                                    line: 142,
                                                                    column: 24,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 142,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'index',
                                                            loc: {
                                                                start: {
                                                                    line: 142,
                                                                    column: 30,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 142,
                                                                    column: 35,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'items',
                                                loc: {
                                                    start: {
                                                        line: 142,
                                                        column: 39,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 142,
                                                        column: 44,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
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
                                                                        name: 'id',
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 26,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 28,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 143,
                                                                                    column: 30,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 143,
                                                                                    column: 36,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [],
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 38,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '0'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'number',
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 40,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 46,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'item',
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 48,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 52,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '1'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'index',
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 54,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 59,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'index',
                                                                        loc: {
                                                                            start: {
                                                                                line: 143,
                                                                                column: 61,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 143,
                                                                                column: 66,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '2'
                                                                }
                                                            ]
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 143,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 143,
                                                                column: 68,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        },
                                                        order: '0'
                                                    }]
                                            },
                                            remove: null,
                                            order: '0'
                                        }]
                                },
                                order: '0'
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
                    0: charlie,
                    1: alpha,
                    2: void 0
                },
                [
                    {
                        id: 2,
                        number: charlie,
                        index: 0
                    },
                    {
                        id: 0,
                        number: alpha,
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
                                                            name: 'key',
                                                            loc: {
                                                                start: {
                                                                    line: 156,
                                                                    column: 24,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 156,
                                                                    column: 27,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'value',
                                                            loc: {
                                                                start: {
                                                                    line: 156,
                                                                    column: 29,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 156,
                                                                    column: 34,
                                                                    fixed: true,
                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'items',
                                                loc: {
                                                    start: {
                                                        line: 156,
                                                        column: 38,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 156,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/test/reactiveTemplates.ion'
                                                    }
                                                }
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
                                                                        name: 'id',
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 26,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 28,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'nextId',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 157,
                                                                                    column: 30,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 157,
                                                                                    column: 36,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/reactiveTemplates.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [],
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 38,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '0'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'key',
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 40,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 43,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'key',
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 45,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 48,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '1'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'value',
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 50,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 55,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'value',
                                                                        loc: {
                                                                            start: {
                                                                                line: 157,
                                                                                column: 57,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 157,
                                                                                column: 62,
                                                                                fixed: true,
                                                                                source: 'ion/test/reactiveTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    order: '2'
                                                                }
                                                            ]
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 157,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 157,
                                                                column: 64,
                                                                fixed: true,
                                                                source: 'ion/test/reactiveTemplates.ion'
                                                            }
                                                        },
                                                        order: '0'
                                                    }]
                                            },
                                            remove: null,
                                            order: '0'
                                        }]
                                },
                                order: '0'
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
        }(),
        [
            'deep args',
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
                                        name: 'JSON',
                                        loc: {
                                            start: {
                                                line: 164,
                                                column: 29,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 164,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'stringify',
                                        loc: {
                                            start: {
                                                line: 164,
                                                column: 34,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 164,
                                                column: 43,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 164,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 164,
                                            column: 43,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'object',
                                        loc: {
                                            start: {
                                                line: 164,
                                                column: 49,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 164,
                                                column: 55,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        },
                                        deep: true
                                    }],
                                loc: {
                                    start: {
                                        line: 164,
                                        column: 29,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 164,
                                        column: 56,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            },
                            order: '0'
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
            { z: { b: 2 } },
            { z: { b: 20 } },
            '{"z":{"b":20}}'
        ],
        [
            'undo statement',
            {},
            ion.template(function (object) {
                return ion.createRuntime({
                    type: 'Template',
                    id: null,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Function',
                                    context: true,
                                    value: function (_context) {
                                        return function () {
                                            var object = _context.get('object');
                                            return object.total = object.total != null ? object.total : 0;
                                        };
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 199,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 199,
                                        column: 35,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 199,
                                    column: 12,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                },
                                end: {
                                    line: 199,
                                    column: 35,
                                    fixed: true,
                                    source: 'ion/test/reactiveTemplates.ion'
                                }
                            },
                            order: '0'
                        },
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'items',
                                        loc: {
                                            start: {
                                                line: 200,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 200,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'object',
                                            loc: {
                                                start: {
                                                    line: 200,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 200,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'items',
                                            loc: {
                                                start: {
                                                    line: 200,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 200,
                                                    column: 36,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 200,
                                                column: 24,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 200,
                                                column: 36,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        }
                                    }
                                }],
                            kind: 'let',
                            order: '1'
                        },
                        {
                            type: 'ForOfStatement',
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'item',
                                            loc: {
                                                start: {
                                                    line: 201,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 201,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        init: null
                                    }],
                                kind: 'let'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'items',
                                loc: {
                                    start: {
                                        line: 201,
                                        column: 24,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 201,
                                        column: 29,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            },
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'ion'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'bind'
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Function',
                                                        context: true,
                                                        value: function (_context2) {
                                                            return function () {
                                                                var object = _context2.get('object'), item = _context2.get('item');
                                                                object.total += item;
                                                            };
                                                        }
                                                    },
                                                    { type: 'ThisExpression' }
                                                ]
                                            },
                                            arguments: [],
                                            loc: {
                                                start: {
                                                    line: 202,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                },
                                                end: {
                                                    line: 204,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/reactiveTemplates.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 202,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            },
                                            end: {
                                                line: 204,
                                                column: 20,
                                                fixed: true,
                                                source: 'ion/test/reactiveTemplates.ion'
                                            }
                                        },
                                        order: '0'
                                    },
                                    {
                                        type: 'UndoStatement',
                                        callee: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'ion'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'bind'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Function',
                                                    context: true,
                                                    value: function (_context3) {
                                                        return function () {
                                                            var object = _context3.get('object'), item = _context3.get('item');
                                                            object.total -= item;
                                                        };
                                                    }
                                                },
                                                { type: 'ThisExpression' }
                                            ]
                                        },
                                        order: '1'
                                    }
                                ]
                            },
                            remove: null,
                            order: '2'
                        },
                        {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'object',
                                    loc: {
                                        start: {
                                            line: 206,
                                            column: 19,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 206,
                                            column: 25,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'total',
                                    loc: {
                                        start: {
                                            line: 206,
                                            column: 26,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        },
                                        end: {
                                            line: 206,
                                            column: 31,
                                            fixed: true,
                                            source: 'ion/test/reactiveTemplates.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 206,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    },
                                    end: {
                                        line: 206,
                                        column: 31,
                                        fixed: true,
                                        source: 'ion/test/reactiveTemplates.ion'
                                    }
                                }
                            },
                            order: '3'
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
            }),
            {
                items: [
                    1,
                    2,
                    3
                ]
            },
            { items: { 2: 4 } },
            7
        ]
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
            _ref5[name] = function (thisArg, templateType, argument, patch, expected, name) {
                return function (done) {
                    var beforeCount = ion.observe.count != null ? ion.observe.count : 0;
                    var template = templateType.call(thisArg, argument);
                    var finished = function () {
                        unobserveValue != null ? unobserveValue() : void 0;
                        unobserveValue = null;
                        unobserve();
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
                    var unobserveValue;
                    var unobserve = template.observe(function (value) {
                            unobserveValue != null ? unobserveValue() : void 0;
                            unobserveValue = ion.observe(value, function (changes) {
                                checkIfDone(value);
                            });
                            checkIfDone(value);
                        });
                    ion.patch(argument, patch);
                    ion.sync();
                };
            }(thisArg, templateType, argument, patch, expected, name);
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