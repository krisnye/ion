void (function(){var _ion_builder_WebsiteBuilder_ = function(module,exports,require){'use strict';
if (global.window) {
    return;
}
var ion = require('../'), File = require('./File'), Directory = require('./Directory'), builder = require('./'), utility = require('./utility'), ModuleBuilder = require('./ModuleBuilder'), clientJsDir = 'js', serverJsDir = 'WEB-INF/js', serverJavaDir = 'WEB-INF/java', np = require('path'), fs = require('fs');
module.exports = exports = ion.template(function (packagePatch) {
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
                    },
                    {
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
                    },
                    {
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
                                                name: 'www'
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
                                            name: 'www'
                                        }
                                    },
                                    alternate: {
                                        type: 'Literal',
                                        value: 'debug'
                                    }
                                }]
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'clientOutput'
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
                                    name: 'clientJsDir'
                                }]
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'serverOutput'
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
                                    name: 'serverJsDir'
                                }]
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'nodepaths'
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'ArrayExpression',
                                    elements: [{
                                            type: 'Literal',
                                            value: 'node_modules'
                                        }]
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'concat'
                                }
                            },
                            arguments: [{
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'process'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'env'
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'NODE_PATH'
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'split'
                                        }
                                    },
                                    arguments: [{
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'np'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'delimiter'
                                            }
                                        }]
                                }]
                        }
                    }
                ],
                kind: 'const'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'glassPages'
                        },
                        init: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'Directory'
                            },
                            arguments: [{
                                    type: 'Literal',
                                    value: '../glass-pages/dist'
                                }]
                        }
                    }],
                kind: 'let'
            },
            {
                type: 'IfStatement',
                test: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Identifier',
                        name: 'glassPages'
                    },
                    property: {
                        type: 'Identifier',
                        name: 'exists'
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
                                        name: 'javaDirectory'
                                    },
                                    init: {
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
                                                name: 'getDirectory'
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'serverJavaDir'
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
                                            name: 'key'
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
                                        name: 'glassPages'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'search'
                                    }
                                },
                                arguments: []
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
                                                    name: 'target'
                                                },
                                                init: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'javaDirectory'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'getFile'
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        }]
                                                }
                                            }],
                                        kind: 'let'
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '<',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'target'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'modified'
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'source'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'modified'
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
                                                                name: 'target'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'copyFrom'
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'source'
                                                            }]
                                                    }
                                                }]
                                        },
                                        alternate: null
                                    }
                                ]
                            },
                            remove: null
                        }
                    ]
                },
                alternate: null
            },
            {
                type: 'ForOfStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'moduleName'
                            },
                            init: null
                        }],
                    kind: 'let'
                },
                right: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
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
                            name: 'client'
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'modules'
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'ForOfStatement',
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'nodepath'
                                        },
                                        init: null
                                    }],
                                kind: 'let'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'nodepaths'
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
                                                    name: 'directory'
                                                },
                                                init: {
                                                    type: 'NewExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'Directory'
                                                    },
                                                    arguments: [{
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
                                                                    name: 'nodepath'
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'moduleName'
                                                                }
                                                            ]
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
                                                        name: 'key'
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
                                                    name: 'directory'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'search'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'ArrayExpression',
                                                    elements: [
                                                        {
                                                            type: 'Literal',
                                                            value: '.js'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            value: '.map'
                                                        }
                                                    ]
                                                },
                                                {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'ArrayExpression',
                                                            elements: [{
                                                                    type: 'Literal',
                                                                    value: 'node_modules'
                                                                }]
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
                                                                    name: 'client'
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'clientOutput'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'source'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'substring'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'nodepath'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'length'
                                                                        }
                                                                    }]
                                                            },
                                                            {
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
                                                                        name: 'read'
                                                                    }
                                                                },
                                                                arguments: []
                                                            }
                                                        ]
                                                    }
                                                }]
                                        },
                                        remove: null
                                    }
                                ]
                            },
                            remove: null
                        }]
                },
                remove: null
            },
            {
                type: 'ForOfStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'moduleName'
                            },
                            init: null
                        }],
                    kind: 'let'
                },
                right: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
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
                            name: 'server'
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'modules'
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'ForOfStatement',
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'nodepath'
                                        },
                                        init: null
                                    }],
                                kind: 'let'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'nodepaths'
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
                                                    name: 'directory'
                                                },
                                                init: {
                                                    type: 'NewExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'Directory'
                                                    },
                                                    arguments: [{
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
                                                                    name: 'nodepath'
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'moduleName'
                                                                }
                                                            ]
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
                                                        name: 'key'
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
                                                    name: 'directory'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'search'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'ArrayExpression',
                                                    elements: [
                                                        {
                                                            type: 'Literal',
                                                            value: '.js'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            value: '.map'
                                                        }
                                                    ]
                                                },
                                                {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'ArrayExpression',
                                                            elements: [{
                                                                    type: 'Literal',
                                                                    value: 'node_modules'
                                                                }]
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
                                                                    name: 'server'
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
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'serverOutput'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'source'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'path'
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'substring'
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'nodepath'
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'length'
                                                                        }
                                                                    }]
                                                            },
                                                            {
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
                                                                        name: 'read'
                                                                    }
                                                                },
                                                                arguments: []
                                                            }
                                                        ]
                                                    }
                                                }]
                                        },
                                        remove: null
                                    }
                                ]
                            },
                            remove: null
                        }]
                },
                remove: null
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'ModuleBuilder'
                    },
                    arguments: [{
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'directories'
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'src'
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'input'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: '/js'
                                                    }
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'lib'
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'output'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: '/'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'clientJsDir'
                                                    }
                                                },
                                                kind: 'init'
                                            }
                                        ]
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'build'
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'exclude'
                                                },
                                                value: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
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
                                                            name: 'client'
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'exclude'
                                                    }
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'test'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: false
                                                },
                                                kind: 'init'
                                            }
                                        ]
                                    },
                                    kind: 'init'
                                }
                            ]
                        }]
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'ModuleBuilder'
                    },
                    arguments: [{
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'directories'
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'src'
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'input'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: '/js'
                                                    }
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'lib'
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'BinaryExpression',
                                                        operator: '+',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'output'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: '/'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'serverJsDir'
                                                    }
                                                },
                                                kind: 'init'
                                            }
                                        ]
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'build'
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'exclude'
                                                },
                                                value: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
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
                                                            name: 'server'
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'exclude'
                                                    }
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'test'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: true
                                                },
                                                kind: 'init'
                                            }
                                        ]
                                    },
                                    kind: 'init'
                                }
                            ]
                        }]
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
                            type: 'ArrayExpression',
                            elements: [
                                {
                                    type: 'Literal',
                                    value: '.ionpage'
                                },
                                {
                                    type: 'Literal',
                                    value: '.coffeepage'
                                },
                                {
                                    type: 'Literal',
                                    value: '.coffee'
                                },
                                {
                                    type: 'Literal',
                                    value: '.java'
                                },
                                {
                                    type: 'Literal',
                                    value: '.class'
                                },
                                {
                                    type: 'Literal',
                                    value: '.jar'
                                },
                                {
                                    type: 'Literal',
                                    value: '.ion'
                                }
                            ]
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
                                    name: 'isFile'
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
                                                    type: 'Identifier',
                                                    name: 'path'
                                                },
                                                {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'file'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'read'
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: null
                                                        }]
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: null
                                                }
                                            ]
                                        }
                                    }]
                            },
                            alternate: null
                        }]
                },
                remove: {
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
                                        name: 'delete'
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'path'
                                    }]
                            }
                        }]
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
                            value: '.ion'
                        },
                        {
                            type: 'Literal',
                            value: 'js'
                        }
                    ]
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
                                                name: 'builder'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'compileIon'
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'file'
                                            }]
                                    }
                                ]
                            }
                        }
                    ]
                },
                remove: {
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
                                        name: 'delete'
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'targetPath'
                                    }]
                            }
                        }]
                }
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'pageOutput'
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
                                    type: 'Literal',
                                    value: 'WEB-INF/pages'
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
                    arguments: [{
                            type: 'Literal',
                            value: '.ionpage'
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
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'pageOutput'
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
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Literal',
                                                        value: '(function '
                                                    },
                                                    right: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'path'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'replace'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Literal',
                                                                value: /[\.\/\\]/g
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                value: '_'
                                                            }
                                                        ]
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: '(){ '
                                                }
                                            },
                                            right: {
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
                                                        name: 'compileIon'
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'file'
                                                    }]
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: ' })'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                remove: {
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
                                        name: 'pageOutput'
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
                        }]
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
                    arguments: [{
                            type: 'Literal',
                            value: '.coffeepage'
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
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'pageOutput'
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
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Literal',
                                                        value: '(function '
                                                    },
                                                    right: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'path'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'replace'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Literal',
                                                                value: /[\.\/\\]/g
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                value: '_'
                                                            }
                                                        ]
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: '(){ '
                                                }
                                            },
                                            right: {
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
                                                        name: 'compileCoffeeScript'
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'file'
                                                    }]
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: ' })'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                remove: {
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
                                        name: 'pageOutput'
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
                        }]
                }
            }
        ],
        bound: false
    }, {
        this: this,
        ion: ion,
        packagePatch: packagePatch,
        File: File,
        Directory: Directory,
        builder: builder,
        utility: utility,
        ModuleBuilder: ModuleBuilder,
        clientJsDir: clientJsDir,
        serverJsDir: serverJsDir,
        serverJavaDir: serverJavaDir,
        np: np,
        fs: fs
    });
});
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/WebsiteBuilder',_ion_builder_WebsiteBuilder_);
    else
      _ion_builder_WebsiteBuilder_.call(this, module, exports, require);
  }
  else {
    _ion_builder_WebsiteBuilder_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./WebsiteBuilder.map