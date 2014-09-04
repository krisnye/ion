void (function(){var _ion_builder_ModuleBuilder_ = function(module,exports,require){'use strict';
var ion = require('../'), np = require('path'), File = require('./File'), Directory = require('./Directory'), builder = require('./'), utility = require('./utility'), compilers = {
        '.coffee': { compile: builder.compileCoffeeScript },
        '.pegjs': { compile: builder.compilePegjs },
        '.js': { compile: builder.shimJavascript },
        '.ion': {
            compile: builder.compileIon,
            compileWithSourceMap: builder.compileIonWithSourceMap
        }
    };
module.exports = exports = ion.template(function (packagePatch) {
    return ion.createRuntime({
        type: 'Template',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'packageJson'
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
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
                            },
                            arguments: [
                                {
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
                                            name: 'parse'
                                        }
                                    },
                                    arguments: [{
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'NewExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'File'
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: 'package.json'
                                                        }]
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'read'
                                                }
                                            },
                                            arguments: []
                                        }]
                                },
                                {
                                    type: 'ConditionalExpression',
                                    test: {
                                        type: 'BinaryExpression',
                                        operator: '!=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'packagePatch'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: null
                                        }
                                    },
                                    consequent: {
                                        type: 'Identifier',
                                        name: 'packagePatch'
                                    },
                                    alternate: {
                                        type: 'ObjectExpression',
                                        properties: []
                                    }
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
                            name: 'input'
                        },
                        init: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'Directory'
                            },
                            arguments: [{
                                    type: 'ConditionalExpression',
                                    test: {
                                        type: 'BinaryExpression',
                                        operator: '!=',
                                        left: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'packageJson'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories'
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'src'
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
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'packageJson'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories'
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'src'
                                        }
                                    },
                                    alternate: {
                                        type: 'Literal',
                                        value: 'src'
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
                            name: 'output'
                        },
                        init: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'Directory'
                            },
                            arguments: [{
                                    type: 'ConditionalExpression',
                                    test: {
                                        type: 'BinaryExpression',
                                        operator: '!=',
                                        left: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'packageJson'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories'
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'lib'
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
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'packageJson'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories'
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'lib'
                                        }
                                    },
                                    alternate: {
                                        type: 'Literal',
                                        value: 'lib'
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
                                        name: 'packageJson'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'name'
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
                                    name: 'packageJson'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'name'
                                }
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
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'extensions'
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'Object'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'keys'
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'compilers'
                                }]
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
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'extensions'
                        },
                        {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'packageJson'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'build'
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'exclude'
                            }
                        }
                    ]
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'IfStatement',
                            test: {
                                type: 'UnaryExpression',
                                operator: '!',
                                argument: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'source'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'isDirectory'
                                    }
                                }
                            },
                            consequent: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'compiler'
                                                },
                                                init: {
                                                    type: 'MemberExpression',
                                                    computed: true,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'compilers'
                                                    },
                                                    property: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'source'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'getExtension'
                                                            }
                                                        },
                                                        arguments: []
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
                                        type: 'IfStatement',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '?',
                                            argument: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'compiler'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'compileWithSourceMap'
                                                }
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'mapPath'
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
                                                                        value: '.map'
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
                                                                name: 'mapName'
                                                            },
                                                            init: {
                                                                type: 'MemberExpression',
                                                                computed: true,
                                                                object: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'CallExpression',
                                                                            callee: {
                                                                                type: 'MemberExpression',
                                                                                computed: false,
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'mapPath'
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'split'
                                                                                }
                                                                            },
                                                                            arguments: [{
                                                                                    type: 'Literal',
                                                                                    value: /[\/\\]/g
                                                                                }]
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'slice'
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'UnaryExpression',
                                                                            operator: '-',
                                                                            argument: {
                                                                                type: 'Literal',
                                                                                value: 1
                                                                            }
                                                                        }]
                                                                },
                                                                property: {
                                                                    type: 'Literal',
                                                                    value: 0
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
                                                                name: '_ref'
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'compiler'
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'compileWithSourceMap'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'source'
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'packageJson'
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
                                                                name: 'code'
                                                            },
                                                            init: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: '_ref'
                                                                },
                                                                property: {
                                                                    type: 'Literal',
                                                                    value: 0
                                                                },
                                                                computed: true
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
                                                                name: 'map'
                                                            },
                                                            init: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: '_ref'
                                                                },
                                                                property: {
                                                                    type: 'Literal',
                                                                    value: 1
                                                                },
                                                                computed: true
                                                            }
                                                        }],
                                                    kind: 'let'
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
                                                                name: 'output'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'targetPath'
                                                            },
                                                            {
                                                                type: 'BinaryExpression',
                                                                operator: '+',
                                                                left: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '+',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'code'
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: '\n//@ sourceMappingURL=./'
                                                                    }
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'mapName'
                                                                }
                                                            }
                                                        ]
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
                                                                name: 'output'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'mapPath'
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'map'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        alternate: {
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
                                                                name: 'output'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'targetPath'
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'compiler'
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'compile'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'source'
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'packageJson'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }]
                                        }
                                    }
                                ]
                            },
                            alternate: null
                        }]
                },
                remove: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
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
                                        name: 'delete'
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'targetPath'
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
                                        name: 'output'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'delete'
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'mapPath'
                                    }]
                            }
                        }
                    ]
                }
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
                                name: 'file'
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
                    arguments: [
                        {
                            type: 'Literal',
                            value: null
                        },
                        {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'extensions'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'concat'
                                }
                            },
                            arguments: [{
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'packageJson'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'build'
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'exclude'
                                    }
                                }]
                        }
                    ]
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'IfStatement',
                            test: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'file'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'isDirectory'
                                }
                            },
                            consequent: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'isInputFile'
                                                },
                                                init: {
                                                    type: 'BinaryExpression',
                                                    operator: '||',
                                                    left: {
                                                        type: 'BinaryExpression',
                                                        operator: '||',
                                                        left: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
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
                                                                        name: 'getFile'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'BinaryExpression',
                                                                        operator: '+',
                                                                        left: {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        },
                                                                        right: {
                                                                            type: 'Literal',
                                                                            value: '/index.js'
                                                                        }
                                                                    }]
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists'
                                                            }
                                                        },
                                                        right: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
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
                                                                        name: 'getFile'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'BinaryExpression',
                                                                        operator: '+',
                                                                        left: {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        },
                                                                        right: {
                                                                            type: 'Literal',
                                                                            value: '/index.ion'
                                                                        }
                                                                    }]
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists'
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
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
                                                                    name: 'getFile'
                                                                }
                                                            },
                                                            arguments: [{
                                                                    type: 'BinaryExpression',
                                                                    operator: '+',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'path'
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: '/index.coffee'
                                                                    }
                                                                }]
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'exists'
                                                        }
                                                    }
                                                }
                                            }],
                                        kind: 'let'
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'isInputFile'
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'indexDirectory'
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
                                                                        name: 'getDirectory'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'path'
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
                                                                name: 'indexName'
                                                            },
                                                            init: {
                                                                type: 'Literal',
                                                                value: 'index.js'
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
                                                                name: 'indexFile'
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'indexDirectory'
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'getFile'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'indexName'
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
                                                                name: 'lines'
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
                                                                                        name: 'childFile'
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
                                                                                    name: 'indexDirectory'
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
                                                                                    value: null
                                                                                },
                                                                                {
                                                                                    type: 'ObjectExpression',
                                                                                    properties: [{
                                                                                            type: 'Property',
                                                                                            key: {
                                                                                                type: 'Identifier',
                                                                                                name: 'recursive'
                                                                                            },
                                                                                            value: {
                                                                                                type: 'Literal',
                                                                                                value: false
                                                                                            },
                                                                                            kind: 'init'
                                                                                        }]
                                                                                }
                                                                            ]
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
                                                                                            type: 'Identifier',
                                                                                            name: 'indexName'
                                                                                        }
                                                                                    },
                                                                                    consequent: {
                                                                                        type: 'BlockStatement',
                                                                                        body: [
                                                                                            {
                                                                                                type: 'VariableDeclaration',
                                                                                                declarations: [{
                                                                                                        type: 'VariableDeclarator',
                                                                                                        id: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name'
                                                                                                        },
                                                                                                        init: {
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
                                                                                                                    name: 'substring'
                                                                                                                }
                                                                                                            },
                                                                                                            arguments: [
                                                                                                                {
                                                                                                                    type: 'Literal',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
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
                                                                                                                            name: 'lastIndexOf'
                                                                                                                        }
                                                                                                                    },
                                                                                                                    arguments: [{
                                                                                                                            type: 'Literal',
                                                                                                                            value: '.js'
                                                                                                                        }]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    }],
                                                                                                kind: 'let'
                                                                                            },
                                                                                            {
                                                                                                type: 'ExpressionStatement',
                                                                                                expression: {
                                                                                                    type: 'BinaryExpression',
                                                                                                    operator: '+',
                                                                                                    left: {
                                                                                                        type: 'BinaryExpression',
                                                                                                        operator: '+',
                                                                                                        left: {
                                                                                                            type: 'BinaryExpression',
                                                                                                            operator: '+',
                                                                                                            left: {
                                                                                                                type: 'BinaryExpression',
                                                                                                                operator: '+',
                                                                                                                left: {
                                                                                                                    type: 'Literal',
                                                                                                                    value: 'exports[\''
                                                                                                                },
                                                                                                                right: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'name'
                                                                                                                }
                                                                                                            },
                                                                                                            right: {
                                                                                                                type: 'Literal',
                                                                                                                value: '\'] = require(\'./'
                                                                                                            }
                                                                                                        },
                                                                                                        right: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name'
                                                                                                        }
                                                                                                    },
                                                                                                    right: {
                                                                                                        type: 'Literal',
                                                                                                        value: '\')'
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    alternate: null
                                                                                }]
                                                                        },
                                                                        remove: null
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
                                                                name: 'indexModuleId'
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'MemberExpression',
                                                                            computed: false,
                                                                            object: {
                                                                                type: 'Identifier',
                                                                                name: 'np'
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'join'
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
                                                                            },
                                                                            {
                                                                                type: 'Literal',
                                                                                value: 'index'
                                                                            }
                                                                        ]
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'replace'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Literal',
                                                                        value: /\\/g
                                                                    },
                                                                    {
                                                                        type: 'Literal',
                                                                        value: '/'
                                                                    }
                                                                ]
                                                            }
                                                        }],
                                                    kind: 'let'
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
                                                                name: 'indexFile'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [{
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
                                                                        name: 'addBrowserShim'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'MemberExpression',
                                                                            computed: false,
                                                                            object: {
                                                                                type: 'Identifier',
                                                                                name: 'lines'
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'join'
                                                                            }
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Literal',
                                                                                value: '\n'
                                                                            }]
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'indexModuleId'
                                                                    }
                                                                ]
                                                            }]
                                                    }
                                                }
                                            ]
                                        },
                                        alternate: null
                                    }
                                ]
                            },
                            alternate: null
                        }]
                },
                remove: null
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
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Literal',
                                            value: /^_/
                                        },
                                        {
                                            type: 'Literal',
                                            value: 'node_modules'
                                        }
                                    ]
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
                            name: 'manifest'
                        },
                        init: {
                            type: 'ObjectExpression',
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
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'manifestFile'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'write'
                        }
                    },
                    arguments: [{
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
                                },
                                {
                                    type: 'Identifier',
                                    name: 'sortedFiles'
                                }
                            ]
                        }]
                }
            },
            {
                type: 'IfStatement',
                test: {
                    type: 'UnaryExpression',
                    operator: '?',
                    argument: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'packageJson'
                            },
                            property: {
                                type: 'Identifier',
                                name: 'build'
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'merge'
                        }
                    }
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'mergedArray'
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
                                                                name: 'index'
                                                            },
                                                            init: null
                                                        },
                                                        {
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'name'
                                                            },
                                                            init: null
                                                        }
                                                    ],
                                                    kind: 'let'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'sortedFiles'
                                                },
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'index'
                                                            },
                                                            value: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: true,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'outputFiles'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'name'
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'read'
                                                                    }
                                                                },
                                                                arguments: []
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
                                                                name: 'index'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: ''
                                                            },
                                                            kind: 'init',
                                                            computed: true
                                                        }]
                                                }
                                            }]
                                    }
                                }],
                            kind: 'let'
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
                                        name: 'output'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'write'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'packageJson'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'build'
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'merge'
                                        }
                                    },
                                    {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'mergedArray'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'join'
                                            }
                                        },
                                        arguments: [{
                                                type: 'Literal',
                                                value: '\n'
                                            }]
                                    }
                                ]
                            }
                        }
                    ]
                },
                alternate: null
            },
            {
                type: 'IfStatement',
                test: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'packageJson'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'build'
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'package'
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
                                        name: 'output'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'write'
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 'package.json'
                                    },
                                    {
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
                                                type: 'CallExpression',
                                                callee: {
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
                                                },
                                                arguments: [
                                                    {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'ion'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'clone'
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'packageJson'
                                                            }]
                                                    },
                                                    {
                                                        type: 'ObjectExpression',
                                                        properties: [{
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'main'
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
                                                                kind: 'init'
                                                            }]
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'Literal',
                                                value: null
                                            },
                                            {
                                                type: 'Literal',
                                                value: '    '
                                            }
                                        ]
                                    }
                                ]
                            }
                        }]
                },
                alternate: null
            },
            {
                type: 'IfStatement',
                test: {
                    type: 'BinaryExpression',
                    operator: '!==',
                    left: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'packageJson'
                            },
                            property: {
                                type: 'Identifier',
                                name: 'build'
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'test'
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: false
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
                        }]
                },
                alternate: null
            }
        ],
        bound: false
    }, {
        this: this,
        ion: ion,
        packagePatch: packagePatch,
        np: np,
        File: File,
        Directory: Directory,
        builder: builder,
        utility: utility,
        compilers: compilers
    });
});
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/ModuleBuilder',_ion_builder_ModuleBuilder_);
    else
      _ion_builder_ModuleBuilder_.call(this, module, exports, require);
  }
  else {
    _ion_builder_ModuleBuilder_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ModuleBuilder.map