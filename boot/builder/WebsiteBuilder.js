void (function(){var _ion_builder_WebsiteBuilder_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref, _ref2, clientJsDir = 'js', serverJsDir = 'WEB-INF/js', serverJavaDir = 'WEB-INF/java', np = require('path'), fs = require('fs');
_ref = ion;
var builder = _ref.builder;
_ref2 = builder;
var File = _ref2.File;
var Directory = _ref2.Directory;
var utility = _ref2.utility;
var ModuleBuilder = _ref2.ModuleBuilder;
module.exports = exports = ion.template(function () {
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
                            name: 'packageJson'
                        },
                        init: {
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
                                },
                                loc: {
                                    start: {
                                        line: 14,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 14,
                                        column: 32,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
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
                                        },
                                        loc: {
                                            start: {
                                                line: 14,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 14,
                                                column: 62,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    arguments: [],
                                    loc: {
                                        start: {
                                            line: 14,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 14,
                                            column: 64,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                }],
                            loc: {
                                start: {
                                    line: 14,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 14,
                                    column: 65,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 15,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 15,
                                                        column: 53,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'src'
                                            },
                                            loc: {
                                                start: {
                                                    line: 15,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 15,
                                                    column: 57,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 15,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 15,
                                                    column: 53,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'src'
                                        },
                                        loc: {
                                            start: {
                                                line: 15,
                                                column: 30,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 15,
                                                column: 57,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 16,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 16,
                                                        column: 54,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'www'
                                            },
                                            loc: {
                                                start: {
                                                    line: 16,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 16,
                                                    column: 58,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 16,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 16,
                                                    column: 54,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'www'
                                        },
                                        loc: {
                                            start: {
                                                line: 16,
                                                column: 31,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 16,
                                                column: 58,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
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
                                },
                                loc: {
                                    start: {
                                        line: 17,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 17,
                                        column: 42,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'clientJsDir'
                                }],
                            loc: {
                                start: {
                                    line: 17,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 17,
                                    column: 55,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                                },
                                loc: {
                                    start: {
                                        line: 18,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 18,
                                        column: 42,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'serverJsDir'
                                }],
                            loc: {
                                start: {
                                    line: 18,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 18,
                                    column: 55,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'nodepaths'
                        },
                        init: {
                            type: 'ArrayExpression',
                            elements: [{
                                    type: 'Literal',
                                    value: 'node_modules'
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
                    },
                    loc: {
                        start: {
                            line: 24,
                            column: 7,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 24,
                            column: 24,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 25,
                                                    column: 28,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 25,
                                                    column: 46,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'serverJavaDir'
                                            }],
                                        loc: {
                                            start: {
                                                line: 25,
                                                column: 28,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 25,
                                                column: 61,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 26,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 26,
                                            column: 44,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 26,
                                        column: 27,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 26,
                                        column: 46,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
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
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 27,
                                                                column: 25,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 27,
                                                                column: 46,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 27,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 27,
                                                            column: 51,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 15,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 48,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                name: 'target'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'copyFrom'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 29,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 29,
                                                                    column: 31,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'source'
                                                            }],
                                                        loc: {
                                                            start: {
                                                                line: 29,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 29,
                                                                column: 39,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
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
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'copyModules'
                        },
                        init: {
                            type: 'Function',
                            context: true,
                            value: function (_ps) {
                                return ion.template(function (modules, outputDirectory) {
                                    return ion.createRuntime({
                                        type: 'Template',
                                        id: null,
                                        body: [{
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
                                                    type: 'Identifier',
                                                    name: 'modules'
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
                                                                                                },
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 34,
                                                                                                        column: 46,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 34,
                                                                                                        column: 53,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            arguments: [
                                                                                                {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'nodepath'
                                                                                                },
                                                                                                {
                                                                                                    type: 'BinaryExpression',
                                                                                                    operator: '+',
                                                                                                    left: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'moduleName'
                                                                                                    },
                                                                                                    right: {
                                                                                                        type: 'Literal',
                                                                                                        value: '/lib'
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 34,
                                                                                                    column: 46,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 34,
                                                                                                    column: 84,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                }
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
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 35,
                                                                                        column: 35,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 35,
                                                                                        column: 51,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    }
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
                                                                                        },
                                                                                        {
                                                                                            type: 'Literal',
                                                                                            value: '.json'
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
                                                                                            elements: []
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'concat'
                                                                                        },
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 35,
                                                                                                column: 76,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 35,
                                                                                                column: 85,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
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
                                                                                                    },
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 35,
                                                                                                            column: 86,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 35,
                                                                                                            column: 103,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                property: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'client'
                                                                                                },
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 35,
                                                                                                        column: 86,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 35,
                                                                                                        column: 110,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'exclude'
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 35,
                                                                                                    column: 86,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 35,
                                                                                                    column: 118,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        }],
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 35,
                                                                                            column: 76,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 35,
                                                                                            column: 119,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ],
                                                                            loc: {
                                                                                start: {
                                                                                    line: 35,
                                                                                    column: 35,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 35,
                                                                                    column: 120,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                }
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
                                                                                                name: 'target'
                                                                                            },
                                                                                            init: {
                                                                                                type: 'CallExpression',
                                                                                                callee: {
                                                                                                    type: 'MemberExpression',
                                                                                                    computed: false,
                                                                                                    object: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'outputDirectory'
                                                                                                    },
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'getFile'
                                                                                                    },
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 36,
                                                                                                            column: 33,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 36,
                                                                                                            column: 56,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        }
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
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'source'
                                                                                                                },
                                                                                                                property: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'path'
                                                                                                                },
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 36,
                                                                                                                        column: 57,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 36,
                                                                                                                        column: 68,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            property: {
                                                                                                                type: 'Identifier',
                                                                                                                name: 'substring'
                                                                                                            },
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 36,
                                                                                                                    column: 57,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 36,
                                                                                                                    column: 78,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                }
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
                                                                                                                },
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 36,
                                                                                                                        column: 79,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 36,
                                                                                                                        column: 94,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            }],
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 36,
                                                                                                                column: 57,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 36,
                                                                                                                column: 95,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    }],
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 36,
                                                                                                        column: 33,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 36,
                                                                                                        column: 96,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
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
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 37,
                                                                                                    column: 23,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 37,
                                                                                                    column: 38,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                }
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
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 37,
                                                                                                    column: 41,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 37,
                                                                                                    column: 56,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                                                            name: 'target'
                                                                                                        },
                                                                                                        property: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'copyFrom'
                                                                                                        },
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 38,
                                                                                                                column: 24,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 38,
                                                                                                                column: 39,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    arguments: [{
                                                                                                            type: 'Identifier',
                                                                                                            name: 'source'
                                                                                                        }],
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 38,
                                                                                                            column: 24,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 38,
                                                                                                            column: 47,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }]
                                                                                    },
                                                                                    alternate: null
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
                                                                                                name: 'target'
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'delete'
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 40,
                                                                                                    column: 20,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 40,
                                                                                                    column: 33,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        arguments: [],
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 40,
                                                                                                column: 20,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 40,
                                                                                                column: 35,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }]
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            remove: null
                                                        }]
                                                },
                                                remove: null
                                            }],
                                        bound: false,
                                        name: {
                                            type: 'Identifier',
                                            name: 'copyModules'
                                        },
                                        scope: {
                                            type: 'Identifier',
                                            name: '_ps'
                                        }
                                    }, {
                                        this: this,
                                        modules: modules,
                                        outputDirectory: outputDirectory,
                                        _ps: _ps,
                                        ion: ion,
                                        _ref: _ref,
                                        _ref2: _ref2,
                                        clientJsDir: clientJsDir,
                                        serverJsDir: serverJsDir,
                                        serverJavaDir: serverJavaDir,
                                        np: np,
                                        fs: fs,
                                        builder: builder,
                                        File: File,
                                        Directory: Directory,
                                        utility: utility,
                                        ModuleBuilder: ModuleBuilder
                                    }, _ps);
                                });
                            }
                        }
                    }],
                kind: 'let'
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'copyModules'
                    },
                    arguments: [
                        {
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
                                    },
                                    loc: {
                                        start: {
                                            line: 42,
                                            column: 16,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 42,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'client'
                                },
                                loc: {
                                    start: {
                                        line: 42,
                                        column: 16,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 42,
                                        column: 40,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'modules'
                            },
                            loc: {
                                start: {
                                    line: 42,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 42,
                                    column: 48,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'clientOutput'
                        }
                    ],
                    loc: {
                        start: {
                            line: 42,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 42,
                            column: 63,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'copyModules'
                    },
                    arguments: [
                        {
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
                                    },
                                    loc: {
                                        start: {
                                            line: 43,
                                            column: 16,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 43,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'server'
                                },
                                loc: {
                                    start: {
                                        line: 43,
                                        column: 16,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 43,
                                        column: 40,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'modules'
                            },
                            loc: {
                                start: {
                                    line: 43,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 43,
                                    column: 48,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'serverOutput'
                        }
                    ],
                    loc: {
                        start: {
                            line: 43,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 43,
                            column: 63,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 51,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 51,
                                                                    column: 38,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'client'
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 51,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 51,
                                                                column: 45,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'exclude'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 51,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 51,
                                                            column: 53,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
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
                        }],
                    loc: {
                        start: {
                            line: 46,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 53,
                            column: 5,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 61,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 61,
                                                                    column: 38,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'server'
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 61,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 61,
                                                                column: 45,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'exclude'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 61,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 61,
                                                            column: 53,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
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
                        }],
                    loc: {
                        start: {
                            line: 56,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 63,
                            column: 5,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
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
                        },
                        loc: {
                            start: {
                                line: 66,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 66,
                                column: 34,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
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
                                    value: '.js'
                                },
                                {
                                    type: 'Literal',
                                    value: '.DS_Store'
                                },
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
                    ],
                    loc: {
                        start: {
                            line: 66,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 66,
                            column: 130,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
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
                                },
                                loc: {
                                    start: {
                                        line: 67,
                                        column: 11,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 67,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                                    name: 'output'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'write'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 68,
                                                        column: 12,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 68,
                                                        column: 24,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
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
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 68,
                                                                column: 31,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 68,
                                                                column: 40,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: null
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 68,
                                                            column: 31,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 68,
                                                            column: 46,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: null
                                                }
                                            ],
                                            loc: {
                                                start: {
                                                    line: 68,
                                                    column: 12,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 68,
                                                    column: 53,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 70,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 70,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'path'
                                    }],
                                loc: {
                                    start: {
                                        line: 70,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 70,
                                        column: 27,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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
                        },
                        loc: {
                            start: {
                                line: 73,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 73,
                                column: 34,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
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
                    ],
                    loc: {
                        start: {
                            line: 73,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 73,
                            column: 48,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 74,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 74,
                                                    column: 48,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
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
                                        ],
                                        loc: {
                                            start: {
                                                line: 74,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 74,
                                                column: 61,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 75,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 75,
                                            column: 20,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 75,
                                                    column: 33,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 75,
                                                    column: 51,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'file'
                                            }],
                                        loc: {
                                            start: {
                                                line: 75,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 75,
                                                column: 57,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 75,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 75,
                                        column: 58,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 77,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 77,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'targetPath'
                                    }],
                                loc: {
                                    start: {
                                        line: 77,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 77,
                                        column: 33,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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
                                },
                                loc: {
                                    start: {
                                        line: 80,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 80,
                                        column: 40,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Literal',
                                    value: 'WEB-INF/pages'
                                }],
                            loc: {
                                start: {
                                    line: 80,
                                    column: 21,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 80,
                                    column: 57,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                        },
                        loc: {
                            start: {
                                line: 81,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 81,
                                column: 34,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    arguments: [{
                            type: 'Literal',
                            value: '.ionpage'
                        }],
                    loc: {
                        start: {
                            line: 81,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 81,
                            column: 46,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 82,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 82,
                                                    column: 48,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
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
                                        ],
                                        loc: {
                                            start: {
                                                line: 82,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 82,
                                                column: 61,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 83,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 83,
                                            column: 24,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 83,
                                                                    column: 50,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 83,
                                                                    column: 62,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
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
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 83,
                                                                column: 50,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 83,
                                                                column: 80,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
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
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 83,
                                                            column: 88,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 83,
                                                            column: 106,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'file'
                                                    }],
                                                loc: {
                                                    start: {
                                                        line: 83,
                                                        column: 88,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 83,
                                                        column: 112,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: ' })'
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 83,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 83,
                                        column: 119,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 85,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 85,
                                            column: 25,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'targetPath'
                                    }],
                                loc: {
                                    start: {
                                        line: 85,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 85,
                                        column: 37,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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
                            name: 'files'
                        },
                        init: {
                            type: 'ObjectExpression',
                            objectType: {
                                type: 'ObjectExpression',
                                properties: []
                            },
                            properties: [{
                                    type: 'ForOfStatement',
                                    left: {
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'manifestFilename'
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
                                                type: 'Identifier',
                                                name: 'packageJson'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'build'
                                            },
                                            loc: {
                                                start: {
                                                    line: 89,
                                                    column: 32,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 89,
                                                    column: 49,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'manifests'
                                        },
                                        loc: {
                                            start: {
                                                line: 89,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 89,
                                                column: 59,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
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
                                                            name: 'manifestFile'
                                                        },
                                                        init: {
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
                                                                    name: 'getFile'
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 90,
                                                                        column: 31,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 90,
                                                                        column: 51,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            arguments: [{
                                                                    type: 'Identifier',
                                                                    name: 'manifestFilename'
                                                                }],
                                                            loc: {
                                                                start: {
                                                                    line: 90,
                                                                    column: 31,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 90,
                                                                    column: 69,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
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
                                                            name: 'manifest'
                                                        },
                                                        init: {
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
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 91,
                                                                        column: 27,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 91,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            arguments: [{
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
                                                                            name: 'read'
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 91,
                                                                                column: 38,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 91,
                                                                                column: 55,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [],
                                                                    loc: {
                                                                        start: {
                                                                            line: 91,
                                                                            column: 38,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 91,
                                                                            column: 57,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
                                                                }],
                                                            loc: {
                                                                start: {
                                                                    line: 91,
                                                                    column: 27,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 91,
                                                                    column: 58,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
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
                                                                name: 'jsfile'
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
                                                        name: 'manifest'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'files'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 92,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 92,
                                                            column: 40,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
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
                                                                        name: 'jspath'
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
                                                                                    },
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 93,
                                                                                            column: 29,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 93,
                                                                                            column: 36,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                arguments: [
                                                                                    {
                                                                                        type: 'MemberExpression',
                                                                                        computed: false,
                                                                                        object: {
                                                                                            type: 'Identifier',
                                                                                            name: 'manifestFile'
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'directoryName'
                                                                                        },
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 93,
                                                                                                column: 37,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 93,
                                                                                                column: 63,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        name: 'jsfile'
                                                                                    }
                                                                                ],
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 93,
                                                                                        column: 29,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 93,
                                                                                        column: 72,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'substring'
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 93,
                                                                                    column: 29,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 93,
                                                                                    column: 82,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                }
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
                                                                                        name: 'output'
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'path'
                                                                                    },
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 93,
                                                                                            column: 83,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 93,
                                                                                            column: 94,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'length'
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 93,
                                                                                        column: 83,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 93,
                                                                                        column: 101,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                    }
                                                                                }
                                                                            }],
                                                                        loc: {
                                                                            start: {
                                                                                line: 93,
                                                                                column: 29,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 93,
                                                                                column: 102,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            }
                                                                        }
                                                                    }
                                                                }],
                                                            kind: 'let'
                                                        },
                                                        {
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'jspath'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: true
                                                            },
                                                            kind: 'init',
                                                            computed: true
                                                        }
                                                    ]
                                                },
                                                remove: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'jspath'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: false
                                                            },
                                                            kind: 'init',
                                                            computed: true
                                                        }]
                                                }
                                            }
                                        ]
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
                            name: 'scripts'
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
                                        name: 'files'
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'Identifier',
                                                    name: 'value'
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
                        },
                        loc: {
                            start: {
                                line: 98,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 98,
                                column: 16,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            value: 'scripts.js'
                        },
                        {
                            type: 'BinaryExpression',
                            operator: '+',
                            left: {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    type: 'Literal',
                                    value: '('
                                },
                                right: {
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
                                        },
                                        loc: {
                                            start: {
                                                line: 101,
                                                column: 15,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 101,
                                                column: 29,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    arguments: [{
                                            type: 'Identifier',
                                            name: 'scripts'
                                        }],
                                    loc: {
                                        start: {
                                            line: 101,
                                            column: 15,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 101,
                                            column: 38,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: '\n.forEach(function(a) {\n    document.writeln("<script src=\'" + a + "\'></script>")\n}));'
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 98,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 106,
                            column: 5,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
                    }
                }
            }
        ],
        bound: false
    }, {
        this: this,
        ion: ion,
        _ref: _ref,
        _ref2: _ref2,
        clientJsDir: clientJsDir,
        serverJsDir: serverJsDir,
        serverJavaDir: serverJavaDir,
        np: np,
        fs: fs,
        builder: builder,
        File: File,
        Directory: Directory,
        utility: utility,
        ModuleBuilder: ModuleBuilder
    }, null);
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
//# sourceMappingURL=./WebsiteBuilder.map