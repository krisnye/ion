void (function(){var _builder_ModuleBuilder_ = function(module,exports,require){'use strict';
const ion = require('ion');
const File = require('./File'), Directory = require('./Directory'), builder = require('./'), compilers = [
        {
            extension: '.coffee',
            compile: builder.compileCoffeeScript
        },
        {
            extension: '.pegjs',
            compile: builder.compilePegjs
        },
        {
            extension: '.js',
            compile: builder.shimJavascript
        },
        {
            extension: '.ion',
            compile: builder.compileIon
        }
    ];
module.exports = exports = function _template(inputName, outputName, options) {
    if (this != null && this.constructor === _template) {
        return ion.createRuntime({
            type: 'Template',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'input'
                            },
                            init: {
                                type: 'NewExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'Directory'
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'inputName'
                                    }]
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
                                name: 'output'
                            },
                            init: {
                                type: 'NewExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'Directory'
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'outputName'
                                    }]
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
                                name: 'moduleName'
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
                                            name: 'options'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'name'
                                        },
                                        existential: true
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
                                        name: 'options'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'name'
                                    },
                                    existential: true
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: ''
                                }
                            }
                        }],
                    kind: 'let'
                },
                {
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'output'
                    },
                    value: {
                        type: 'ObjectExpression',
                        objectType: null,
                        properties: [
                            {
                                type: 'ForOfStatement',
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '_ref6'
                                            },
                                            init: null
                                        }],
                                    kind: 'let'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'compilers'
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: '_ref9'
                                                    },
                                                    init: {
                                                        type: 'Identifier',
                                                        name: '_ref6'
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'extension'
                                                    },
                                                    init: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_ref9'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'extension'
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
                                                        name: 'compile'
                                                    },
                                                    init: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_ref9'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'compile'
                                                        },
                                                        computed: false
                                                    }
                                                }],
                                            kind: 'let'
                                        },
                                        {
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'path'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'source'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'input'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'search'
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'extension'
                                                    }]
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'VariableDeclaration',
                                                        declarations: [{
                                                                type: 'VariableDeclarator',
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'targetPath'
                                                                },
                                                                init: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'builder'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'changeExtension'
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        },
                                                                        {
                                                                            type: 'Literal',
                                                                            value: '.js'
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
                                                                    name: 'moduleId'
                                                                },
                                                                init: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'builder'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'getModuleId'
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'moduleName'
                                                                        },
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        }
                                                                    ]
                                                                }
                                                            }],
                                                        kind: 'let'
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'targetPath'
                                                        },
                                                        value: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'compile'
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'source'
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'moduleId'
                                                                }
                                                            ]
                                                        },
                                                        kind: 'init',
                                                        computed: true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'outputFiles'
                                        },
                                        init: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'output'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'search'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: '.js'
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: /^_/
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
                                            name: 'top'
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
                                                        name: 'outputFiles'
                                                    },
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [{
                                                                type: 'IfStatement',
                                                                test: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'key'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'endsWith'
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Literal',
                                                                            value: 'require.js'
                                                                        }]
                                                                },
                                                                consequent: {
                                                                    type: 'BlockStatement',
                                                                    body: [{
                                                                            type: 'ExpressionStatement',
                                                                            expression: {
                                                                                type: 'Identifier',
                                                                                name: 'key'
                                                                            }
                                                                        }]
                                                                }
                                                            }]
                                                    }
                                                }]
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
                                            name: 'sortedFiles'
                                        },
                                        init: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'top'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'concat'
                                                }
                                            },
                                            arguments: [{
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
                                                                name: 'outputFiles'
                                                            },
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [{
                                                                        type: 'IfStatement',
                                                                        test: {
                                                                            type: 'BinaryExpression',
                                                                            operator: '&&',
                                                                            left: {
                                                                                type: 'UnaryExpression',
                                                                                operator: '!',
                                                                                argument: {
                                                                                    type: 'CallExpression',
                                                                                    callee: {
                                                                                        type: 'MemberExpression',
                                                                                        computed: false,
                                                                                        object: {
                                                                                            type: 'Identifier',
                                                                                            name: 'builder'
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'isPrivate'
                                                                                        }
                                                                                    },
                                                                                    arguments: [{
                                                                                            type: 'Identifier',
                                                                                            name: 'key'
                                                                                        }]
                                                                                }
                                                                            },
                                                                            right: {
                                                                                type: 'BinaryExpression',
                                                                                operator: '<',
                                                                                left: {
                                                                                    type: 'CallExpression',
                                                                                    callee: {
                                                                                        type: 'MemberExpression',
                                                                                        computed: false,
                                                                                        object: {
                                                                                            type: 'Identifier',
                                                                                            name: 'top'
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'indexOf'
                                                                                        }
                                                                                    },
                                                                                    arguments: [{
                                                                                            type: 'Identifier',
                                                                                            name: 'key'
                                                                                        }]
                                                                                },
                                                                                right: {
                                                                                    type: 'Literal',
                                                                                    value: 0
                                                                                }
                                                                            }
                                                                        },
                                                                        consequent: {
                                                                            type: 'BlockStatement',
                                                                            body: [{
                                                                                    type: 'ExpressionStatement',
                                                                                    expression: {
                                                                                        type: 'Identifier',
                                                                                        name: 'key'
                                                                                    }
                                                                                }]
                                                                        }
                                                                    }]
                                                            }
                                                        }]
                                                }]
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
                                            name: 'manifestFileName'
                                        },
                                        init: {
                                            type: 'Literal',
                                            value: 'manifest.json'
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
                                            name: 'manifest'
                                        },
                                        init: {
                                            type: 'ObjectExpression',
                                            objectType: null,
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'modified'
                                                    },
                                                    value: {
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
                                                                    name: 'max'
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Literal',
                                                                value: null
                                                            },
                                                            {
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
                                                                                        name: 'path'
                                                                                    },
                                                                                    init: null
                                                                                },
                                                                                {
                                                                                    type: 'VariableDeclarator',
                                                                                    id: {
                                                                                        type: 'Identifier',
                                                                                        name: 'file'
                                                                                    },
                                                                                    init: null
                                                                                }
                                                                            ],
                                                                            kind: 'let'
                                                                        },
                                                                        right: {
                                                                            type: 'Identifier',
                                                                            name: 'outputFiles'
                                                                        },
                                                                        body: {
                                                                            type: 'ExpressionStatement',
                                                                            expression: {
                                                                                type: 'MemberExpression',
                                                                                computed: false,
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'file'
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'modified'
                                                                                }
                                                                            }
                                                                        }
                                                                    }]
                                                            }
                                                        ]
                                                    },
                                                    kind: 'init'
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'files'
                                                    },
                                                    value: {
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
                                                                                name: 'path'
                                                                            },
                                                                            init: null
                                                                        }],
                                                                    kind: 'let'
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'sortedFiles'
                                                                },
                                                                body: {
                                                                    type: 'ExpressionStatement',
                                                                    expression: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'MemberExpression',
                                                                            computed: false,
                                                                            object: {
                                                                                type: 'Identifier',
                                                                                name: 'builder'
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'normalizePath'
                                                                            }
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Identifier',
                                                                                name: 'path'
                                                                            }]
                                                                    }
                                                                }
                                                            }]
                                                    },
                                                    kind: 'init'
                                                }
                                            ]
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'manifestFileName'
                                },
                                value: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'JSON'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'stringify'
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'manifest'
                                        },
                                        {
                                            type: 'Literal',
                                            value: null
                                        },
                                        {
                                            type: 'Literal',
                                            value: '  '
                                        }
                                    ]
                                },
                                kind: 'init',
                                computed: true
                            },
                            {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'manifestFile'
                                        },
                                        init: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'output'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'getFile'
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Identifier',
                                                    name: 'manifestFileName'
                                                }]
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
                                            name: 'minifiedFiles'
                                        },
                                        init: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'builder'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'minifyFromManifest'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'manifestFile'
                                                },
                                                {
                                                    type: 'ObjectExpression',
                                                    properties: []
                                                }
                                            ]
                                        }
                                    }],
                                kind: 'let'
                            },
                            {
                                type: 'ForInStatement',
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'path'
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'content'
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'let'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'minifiedFiles'
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'path'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'content'
                                            },
                                            kind: 'init',
                                            computed: true
                                        }]
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'builder'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'runTests'
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'manifestFile'
                                        },
                                        {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'manifestFile'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'modified'
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    kind: 'init'
                }
            ]
        }, {
            require: require,
            module: module,
            exports: exports,
            inputName: inputName,
            outputName: outputName,
            options: options,
            File: File,
            Directory: Directory,
            builder: builder,
            compilers: compilers
        });
    }
    let input = new Directory(inputName);
    let output = new Directory(outputName);
    let moduleName = (options != null ? options.name : void 0) != null ? options.name : '';
    let _ref = [];
    for (let key in outputFiles) {
        if (key.endsWith('require.js')) {
            _ref.push(key);
        }
    }
    let _ref2 = [];
    for (let key in outputFiles) {
        if (!builder.isPrivate(key) && top.indexOf(key) < 0) {
            _ref2.push(key);
        }
    }
    let _ref3 = [];
    for (let path in outputFiles) {
        let file = outputFiles[path];
        _ref3.push(file.modified);
    }
    let _ref4 = [];
    for (let _i = 0; _i < sortedFiles.length; _i++) {
        let path = sortedFiles[_i];
        _ref4.push(builder.normalizePath(path));
    }
    let _ref7 = {};
    {
        for (let _i2 = 0; _i2 < compilers.length; _i2++) {
            let _ref8 = compilers[_i2];
            let extension = _ref8.extension;
            let compile = _ref8.compile;
            {
                let _ref5 = input.search(extension);
                for (let path in _ref5) {
                    let source = _ref5[path];
                    let targetPath = builder.changeExtension(path, '.js');
                    let moduleId = builder.getModuleId(moduleName, path);
                    _ref7[targetPath] = compile(source, moduleId);
                }
            }
        }
        let outputFiles = output.search('.js', /^_/);
        let top = _ref;
        let sortedFiles = top.concat(_ref2);
        let manifestFileName = 'manifest.json';
        let manifest = {
                modified: Math.max.apply(null, _ref3),
                files: _ref4
            };
        _ref7[manifestFileName] = JSON.stringify(manifest, null, '  ');
        let manifestFile = output.getFile(manifestFileName);
        let minifiedFiles = builder.minifyFromManifest(manifestFile, {});
        for (let path in minifiedFiles) {
            let content = minifiedFiles[path];
            _ref7[path] = content;
        }
        ion.add(_ref7, builder.runTests(manifestFile, manifestFile.modified));
    }
    ion.patch(output, _ref7);
};
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('builder/ModuleBuilder',_builder_ModuleBuilder_);
    else
      _builder_ModuleBuilder_.call(this, module, exports, require);
  }
  else {
    _builder_ModuleBuilder_.call(this);
  }
}).call(this)