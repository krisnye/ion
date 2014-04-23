void (function(){var _ion_builder_WebsiteBuilder_ = function(module,exports,require){'use strict';
const ion = require('ion'), File = require('./File'), Directory = require('./Directory'), builder = require('./'), utility = require('./utility'), ModuleBuilder = require('./ModuleBuilder'), clientJsDir = 'js', serverJsDir = 'WEB-INF/js', serverJavaDir = 'WEB-INF/java';
module.exports = exports = ion.template(function _template(packagePatch) {
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
                                name: 'nodepath'
                            },
                            init: {
                                type: 'Literal',
                                value: 'node_modules/'
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
                                }
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
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'nodepath'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'moduleName'
                                                    }
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
                                            type: 'Literal',
                                            value: '.js'
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
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'clientOutput'
                                            },
                                            value: {
                                                type: 'ObjectExpression',
                                                properties: [{
                                                        type: 'Property',
                                                        key: {
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
                                                        value: {
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
                                                        },
                                                        kind: 'init',
                                                        computed: true
                                                    }]
                                            },
                                            kind: 'init'
                                        }]
                                }
                            }
                        ]
                    }
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
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'nodepath'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'moduleName'
                                                    }
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
                                            type: 'Literal',
                                            value: '.js'
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
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'serverOutput'
                                            },
                                            value: {
                                                type: 'ObjectExpression',
                                                properties: [{
                                                        type: 'Property',
                                                        key: {
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
                                                        value: {
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
                                                        },
                                                        kind: 'init',
                                                        computed: true
                                                    }]
                                            },
                                            kind: 'init'
                                        }]
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
                                            properties: [{
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
                                                }]
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
                                            properties: [{
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
                                                }]
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
                                                    name: 'output'
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
                                                name: 'key'
                                            },
                                            value: {
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
                                            },
                                            kind: 'init',
                                            computed: true
                                        }]
                                },
                                kind: 'init'
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
                                                    name: 'key'
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
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'pageOutput'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'targetPath'
                                            },
                                            value: {
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
                                                                        name: 'key'
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
                                                                name: 'source'
                                                            }]
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: ' })'
                                                }
                                            },
                                            kind: 'init',
                                            computed: true
                                        }]
                                },
                                kind: 'init'
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
                                                    name: 'key'
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
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'pageOutput'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'targetPath'
                                            },
                                            value: {
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
                                                                        name: 'key'
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
                                                                name: 'source'
                                                            }]
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: ' })'
                                                }
                                            },
                                            kind: 'init',
                                            computed: true
                                        }]
                                },
                                kind: 'init'
                            }
                        ]
                    }
                }
            ]
        }, {
            require: require,
            module: module,
            exports: exports,
            packagePatch: packagePatch,
            ion: ion,
            File: File,
            Directory: Directory,
            builder: builder,
            utility: utility,
            ModuleBuilder: ModuleBuilder,
            clientJsDir: clientJsDir,
            serverJsDir: serverJsDir,
            serverJavaDir: serverJavaDir
        });
    }
    const packageJson = ion.patch(JSON.parse(new File('package.json').read()), packagePatch != null ? packagePatch : {}), input = new Directory(packageJson.directories.src != null ? packageJson.directories.src : 'src'), output = new Directory(packageJson.directories.www != null ? packageJson.directories.www : 'debug'), clientOutput = output.getDirectory(clientJsDir), serverOutput = output.getDirectory(serverJsDir), nodepath = 'node_modules/';
    let glassPages = new Directory('../glass-pages/dist');
    if (glassPages.exists) {
        let javaDirectory = input.getDirectory(serverJavaDir);
        {
            let _ref = glassPages.search();
            for (let key in _ref) {
                let source = _ref[key];
                let target = javaDirectory.getFile(key);
                if (target.modified < source.modified) {
                    target.copyFrom(source);
                }
            }
        }
    }
    {
        let _ref2 = packageJson.build.client.modules;
        for (let _i = 0; _i < _ref2.length; _i++) {
            let moduleName = _ref2[_i];
            let directory = new Directory(nodepath + moduleName);
            {
                let _ref3 = directory.search('.js', ['node_modules'].concat(packageJson.build.client.exclude));
                for (let key in _ref3) {
                    let source = _ref3[key];
                    let _ref9 = {};
                    {
                        _ref9[source.path.substring(nodepath.length)] = source.read();
                    }
                    ion.patch(clientOutput, _ref9);
                }
            }
        }
    }
    {
        let _ref4 = packageJson.build.server.modules;
        for (let _i2 = 0; _i2 < _ref4.length; _i2++) {
            let moduleName = _ref4[_i2];
            let directory = new Directory(nodepath + moduleName);
            {
                let _ref5 = directory.search('.js', ['node_modules'].concat(packageJson.build.server.exclude));
                for (let key in _ref5) {
                    let source = _ref5[key];
                    let _ref10 = {};
                    {
                        _ref10[source.path.substring(nodepath.length)] = source.read();
                    }
                    ion.patch(serverOutput, _ref10);
                }
            }
        }
    }
    ModuleBuilder({
        directories: {
            src: input + '/js',
            lib: output + '/' + clientJsDir
        },
        build: { test: false }
    });
    ModuleBuilder({
        directories: {
            src: input + '/js',
            lib: output + '/' + serverJsDir
        },
        build: { test: true }
    });
    {
        let _ref6 = input.search(null, [
                '.coffeepage',
                '.coffee',
                '.java',
                '.class',
                '.jar',
                '.ion'
            ]);
        for (let key in _ref6) {
            let source = _ref6[key];
            let target = output.getFile(key);
            let _ref11 = {};
            {
                _ref11[key] = source.read();
            }
            ion.patch(output, _ref11);
        }
    }
    let pageOutput = output.getDirectory('WEB-INF/pages');
    {
        let _ref7 = input.search('.ionpage');
        for (let key in _ref7) {
            let source = _ref7[key];
            let targetPath = builder.changeExtension(key, '.js');
            let _ref12 = {};
            {
                _ref12[targetPath] = '(function ' + key.replace(/[\.\/\\]/g, '_') + '(){ ' + builder.compileIon(source) + ' })';
            }
            ion.patch(pageOutput, _ref12);
        }
    }
    {
        let _ref8 = input.search('.coffeepage');
        for (let key in _ref8) {
            let source = _ref8[key];
            let targetPath = builder.changeExtension(key, '.js');
            let _ref13 = {};
            {
                _ref13[targetPath] = '(function ' + key.replace(/[\.\/\\]/g, '_') + '(){ ' + builder.compileCoffeeScript(source) + ' })';
            }
            ion.patch(pageOutput, _ref13);
        }
    }
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