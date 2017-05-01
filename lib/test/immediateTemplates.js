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
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 7,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 7,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                        name: 'b',
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 8,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                        name: 'c',
                                        loc: {
                                            start: {
                                                line: 9,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 9,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 21,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                name: 'c',
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 10,
                                        column: 20,
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
                                                        name: 'item',
                                                        loc: {
                                                            start: {
                                                                line: 16,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 16,
                                                                column: 24,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            }
                                                        }
                                                    },
                                                    init: null
                                                }],
                                            kind: 'let'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'rows',
                                            loc: {
                                                start: {
                                                    line: 16,
                                                    column: 28,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 16,
                                                    column: 32,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                                            name: 'item',
                                                            loc: {
                                                                start: {
                                                                    line: 17,
                                                                    column: 23,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 17,
                                                                    column: 27,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
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
                                                                            name: 'item',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 18,
                                                                                    column: 24,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 18,
                                                                                    column: 28,
                                                                                    fixed: true,
                                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'toString',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 18,
                                                                                    column: 29,
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
                                                                loc: {
                                                                    start: {
                                                                        line: 20,
                                                                        column: 24,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 20,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    }
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
                                                                name: 'rows',
                                                                loc: {
                                                                    start: {
                                                                        line: 23,
                                                                        column: 25,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 23,
                                                                        column: 29,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'length',
                                                                loc: {
                                                                    start: {
                                                                        line: 23,
                                                                        column: 30,
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
                                                    loc: {
                                                        start: {
                                                            line: 23,
                                                            column: 20,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 23,
                                                            column: 36,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
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
                                            name: 'a',
                                            loc: {
                                                start: {
                                                    line: 34,
                                                    column: 21,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 34,
                                                    column: 22,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
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
                                            type: 'Identifier',
                                            name: 'b',
                                            loc: {
                                                start: {
                                                    line: 34,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 34,
                                                    column: 26,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                        loc: {
                                            start: {
                                                line: 40,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 40,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        },
                                        order: '0'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 2
                                        },
                                        loc: {
                                            start: {
                                                line: 41,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 41,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
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
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 46,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 46,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                        name: 'b',
                                        loc: {
                                            start: {
                                                line: 47,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 47,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                            name: 'a',
                                            loc: {
                                                start: {
                                                    line: 49,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 49,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 49,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 49,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        },
                                        order: '0'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'b',
                                            loc: {
                                                start: {
                                                    line: 50,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 50,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 50,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 50,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
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
                                                name: 'a',
                                                loc: {
                                                    start: {
                                                        line: 51,
                                                        column: 19,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 51,
                                                        column: 20,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b',
                                                loc: {
                                                    start: {
                                                        line: 51,
                                                        column: 23,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    },
                                                    end: {
                                                        line: 51,
                                                        column: 24,
                                                        fixed: true,
                                                        source: 'ion/test/immediateTemplates.ion'
                                                    }
                                                }
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
                                                    loc: {
                                                        start: {
                                                            line: 52,
                                                            column: 20,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 52,
                                                            column: 22,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
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
                                                    name: 'b',
                                                    loc: {
                                                        start: {
                                                            line: 53,
                                                            column: 24,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 53,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    loc: {
                                                        start: {
                                                            line: 53,
                                                            column: 28,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 53,
                                                            column: 29,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
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
                                                        loc: {
                                                            start: {
                                                                line: 54,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 54,
                                                                column: 22,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            }
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
                                        name: 'items',
                                        loc: {
                                            start: {
                                                line: 59,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 59,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                        name: 'x',
                                        loc: {
                                            start: {
                                                line: 60,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 60,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                                                name: 'item',
                                                                loc: {
                                                                    start: {
                                                                        line: 60,
                                                                        column: 38,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 60,
                                                                        column: 42,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
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
                                                                        line: 60,
                                                                        column: 44,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 60,
                                                                        column: 49,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
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
                                                            line: 60,
                                                            column: 53,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 60,
                                                            column: 58,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
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
                                                            name: 'item',
                                                            loc: {
                                                                start: {
                                                                    line: 60,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 60,
                                                                    column: 25,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'index',
                                                            loc: {
                                                                start: {
                                                                    line: 60,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 60,
                                                                    column: 33,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
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
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 61,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 61,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
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
                                        name: 'items',
                                        loc: {
                                            start: {
                                                line: 66,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 66,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    loc: {
                                                        start: {
                                                            line: 66,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 66,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
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
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    loc: {
                                                        start: {
                                                            line: 66,
                                                            column: 29,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 66,
                                                            column: 30,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
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
                                                    name: 'c',
                                                    loc: {
                                                        start: {
                                                            line: 66,
                                                            column: 33,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 66,
                                                            column: 34,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
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
                                        name: 'x',
                                        loc: {
                                            start: {
                                                line: 67,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 67,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                                                name: 'key',
                                                                loc: {
                                                                    start: {
                                                                        line: 67,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 67,
                                                                        column: 40,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
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
                                                                        line: 67,
                                                                        column: 42,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 67,
                                                                        column: 47,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
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
                                                            line: 67,
                                                            column: 51,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 67,
                                                            column: 56,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
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
                                                            name: 'key',
                                                            loc: {
                                                                start: {
                                                                    line: 67,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 67,
                                                                    column: 24,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'value',
                                                            loc: {
                                                                start: {
                                                                    line: 67,
                                                                    column: 27,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                },
                                                                end: {
                                                                    line: 67,
                                                                    column: 32,
                                                                    fixed: true,
                                                                    source: 'ion/test/immediateTemplates.ion'
                                                                }
                                                            }
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
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 68,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 68,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
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
                                        name: 'object',
                                        loc: {
                                            start: {
                                                line: 73,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 73,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [{
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    loc: {
                                                        start: {
                                                            line: 73,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 73,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'ObjectExpression',
                                                    properties: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                loc: {
                                                                    start: {
                                                                        line: 73,
                                                                        column: 29,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 73,
                                                                        column: 30,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    }
                                                                }
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
                                        name: 'object',
                                        loc: {
                                            start: {
                                                line: 74,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 74,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 74,
                                                column: 27,
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
                                    name: 'b',
                                    loc: {
                                        start: {
                                            line: 74,
                                            column: 30,
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
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 87,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 87,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                        name: 'b',
                                        loc: {
                                            start: {
                                                line: 88,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 88,
                                                column: 17,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
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
                                            name: 'a',
                                            loc: {
                                                start: {
                                                    line: 89,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 89,
                                                    column: 21,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        type: 'UnaryExpression',
                                        operator: '?',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b',
                                            loc: {
                                                start: {
                                                    line: 89,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 89,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                        name: 'Math',
                                        loc: {
                                            start: {
                                                line: 93,
                                                column: 20,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 93,
                                                column: 24,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'min',
                                        loc: {
                                            start: {
                                                line: 93,
                                                column: 25,
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
                                            name: 'Math',
                                            loc: {
                                                start: {
                                                    line: 97,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 97,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'min',
                                            loc: {
                                                start: {
                                                    line: 97,
                                                    column: 25,
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
                                        name: 'call',
                                        loc: {
                                            start: {
                                                line: 97,
                                                column: 29,
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
                                    name: 'Date',
                                    loc: {
                                        start: {
                                            line: 101,
                                            column: 24,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 101,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
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
                                ],
                                loc: {
                                    start: {
                                        line: 101,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 101,
                                        column: 41,
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
                                            name: 'x',
                                            loc: {
                                                start: {
                                                    line: 111,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 111,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
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
                                            type: 'Identifier',
                                            name: 'y',
                                            loc: {
                                                start: {
                                                    line: 112,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 112,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                            name: 'z',
                                            loc: {
                                                start: {
                                                    line: 113,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 113,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
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
                                                                name: 'items',
                                                                loc: {
                                                                    start: {
                                                                        line: 114,
                                                                        column: 24,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 114,
                                                                        column: 29,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    }
                                                                }
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
                                                                    name: 'item',
                                                                    loc: {
                                                                        start: {
                                                                            line: 115,
                                                                            column: 24,
                                                                            fixed: true,
                                                                            source: 'ion/test/immediateTemplates.ion'
                                                                        },
                                                                        end: {
                                                                            line: 115,
                                                                            column: 28,
                                                                            fixed: true,
                                                                            source: 'ion/test/immediateTemplates.ion'
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
                                                                line: 115,
                                                                column: 32,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 115,
                                                                column: 37,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            }
                                                        }
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
                                                                        name: 'item',
                                                                        loc: {
                                                                            start: {
                                                                                line: 116,
                                                                                column: 24,
                                                                                fixed: true,
                                                                                source: 'ion/test/immediateTemplates.ion'
                                                                            },
                                                                            end: {
                                                                                line: 116,
                                                                                column: 28,
                                                                                fixed: true,
                                                                                source: 'ion/test/immediateTemplates.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 2
                                                                    }
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 116,
                                                                        column: 24,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
                                                                    },
                                                                    end: {
                                                                        line: 116,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/test/immediateTemplates.ion'
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
                                        name: 'a',
                                        loc: {
                                            start: {
                                                line: 124,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 124,
                                                column: 20,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
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
                                                    line: 124,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 124,
                                                    column: 20,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
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
                                                line: 124,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 124,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
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
                                                    line: 124,
                                                    column: 21,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 124,
                                                    column: 22,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
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
                                            line: 124,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 124,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'b',
                                    loc: {
                                        start: {
                                            line: 124,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 124,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
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
                                        name: 'type',
                                        loc: {
                                            start: {
                                                line: 129,
                                                column: 23,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            },
                                            end: {
                                                line: 129,
                                                column: 27,
                                                fixed: true,
                                                source: 'ion/test/immediateTemplates.ion'
                                            }
                                        }
                                    },
                                    arguments: [],
                                    loc: {
                                        start: {
                                            line: 129,
                                            column: 19,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 129,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'position',
                                            loc: {
                                                start: {
                                                    line: 130,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 130,
                                                    column: 24,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'ObjectExpression',
                                            properties: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        loc: {
                                                            start: {
                                                                line: 131,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            },
                                                            end: {
                                                                line: 131,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/test/immediateTemplates.ion'
                                                            }
                                                        }
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
                                name: 'output',
                                loc: {
                                    start: {
                                        line: 138,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 138,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    }
                                }
                            },
                            value: {
                                type: 'ObjectExpression',
                                properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'e',
                                            loc: {
                                                start: {
                                                    line: 139,
                                                    column: 16,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                },
                                                end: {
                                                    line: 139,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/test/immediateTemplates.ion'
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'BinaryExpression',
                                            operator: '+',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'input',
                                                    loc: {
                                                        start: {
                                                            line: 139,
                                                            column: 19,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 139,
                                                            column: 24,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    loc: {
                                                        start: {
                                                            line: 139,
                                                            column: 25,
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
                                                    name: 'input',
                                                    loc: {
                                                        start: {
                                                            line: 139,
                                                            column: 29,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        },
                                                        end: {
                                                            line: 139,
                                                            column: 34,
                                                            fixed: true,
                                                            source: 'ion/test/immediateTemplates.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    loc: {
                                                        start: {
                                                            line: 139,
                                                            column: 35,
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
                                name: 'output',
                                loc: {
                                    start: {
                                        line: 140,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/test/immediateTemplates.ion'
                                    },
                                    end: {
                                        line: 140,
                                        column: 25,
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
                                    name: 'ion',
                                    loc: {
                                        start: {
                                            line: 146,
                                            column: 20,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        },
                                        end: {
                                            line: 146,
                                            column: 23,
                                            fixed: true,
                                            source: 'ion/test/immediateTemplates.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'patch',
                                    loc: {
                                        start: {
                                            line: 146,
                                            column: 24,
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