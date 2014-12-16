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
                                },
                                loc: {
                                    start: {
                                        line: 20,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 20,
                                        column: 31,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
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
                                        },
                                        loc: {
                                            start: {
                                                line: 20,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 20,
                                                column: 42,
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
                                                        line: 20,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 20,
                                                        column: 72,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            loc: {
                                                start: {
                                                    line: 20,
                                                    column: 43,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 20,
                                                    column: 74,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 20,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 20,
                                            column: 75,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
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
                            ],
                            loc: {
                                start: {
                                    line: 20,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 20,
                                    column: 95,
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
                                                        line: 21,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 21,
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
                                                    line: 21,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 21,
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
                                                    line: 21,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 21,
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
                                                line: 21,
                                                column: 30,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 21,
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
                                                        line: 22,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 22,
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
                                                    line: 22,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 22,
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
                                                    line: 22,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 22,
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
                                                line: 22,
                                                column: 31,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 22,
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
                                        line: 23,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 23,
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
                                    line: 23,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 23,
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
                                        line: 24,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 24,
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
                                    line: 24,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 24,
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
                                },
                                loc: {
                                    start: {
                                        line: 25,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 25,
                                        column: 43,
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
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'process'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'env'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 25,
                                                        column: 44,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 25,
                                                        column: 55,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'NODE_PATH'
                                            },
                                            loc: {
                                                start: {
                                                    line: 25,
                                                    column: 44,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 25,
                                                    column: 65,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'split'
                                        },
                                        loc: {
                                            start: {
                                                line: 25,
                                                column: 44,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 25,
                                                column: 71,
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
                                                name: 'np'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'delimiter'
                                            },
                                            loc: {
                                                start: {
                                                    line: 25,
                                                    column: 72,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 25,
                                                    column: 84,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 25,
                                            column: 44,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 25,
                                            column: 85,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                }],
                            loc: {
                                start: {
                                    line: 25,
                                    column: 20,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 25,
                                    column: 86,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                            line: 30,
                            column: 7,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 30,
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
                                                    line: 31,
                                                    column: 28,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 31,
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
                                                line: 31,
                                                column: 28,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 31,
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
                                            line: 32,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 32,
                                            column: 44,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 32,
                                        column: 27,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 32,
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
                                                                line: 33,
                                                                column: 25,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 33,
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
                                                            line: 33,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 33,
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
                                                        line: 34,
                                                        column: 15,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 34,
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
                                                        line: 34,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 34,
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
                                                                    line: 35,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 35,
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
                                                                line: 35,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 35,
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
                            },
                            loc: {
                                start: {
                                    line: 38,
                                    column: 22,
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
                        property: {
                            type: 'Identifier',
                            name: 'client'
                        },
                        loc: {
                            start: {
                                line: 38,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 38,
                                column: 46,
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
                            line: 38,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 38,
                            column: 54,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
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
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 40,
                                                                        column: 42,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 40,
                                                                        column: 49,
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
                                                                    type: 'Identifier',
                                                                    name: 'moduleName'
                                                                }
                                                            ],
                                                            loc: {
                                                                start: {
                                                                    line: 40,
                                                                    column: 42,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 40,
                                                                    column: 71,
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
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'console'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'log'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 41,
                                                        column: 12,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 41,
                                                        column: 23,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [{
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Literal',
                                                        value: 'checking client directory: '
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'directory'
                                                    }
                                                }],
                                            loc: {
                                                start: {
                                                    line: 41,
                                                    column: 12,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 41,
                                                    column: 66,
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
                                                        line: 42,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 42,
                                                        column: 47,
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
                                                                line: 42,
                                                                column: 64,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 42,
                                                                column: 73,
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
                                                                            line: 42,
                                                                            column: 74,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 42,
                                                                            column: 91,
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
                                                                        column: 74,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 42,
                                                                        column: 98,
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
                                                                    line: 42,
                                                                    column: 74,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 42,
                                                                    column: 106,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 42,
                                                            column: 64,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 42,
                                                            column: 107,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                }
                                            ],
                                            loc: {
                                                start: {
                                                    line: 42,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 42,
                                                    column: 108,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
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
                                                                    column: 34,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
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
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 43,
                                                                                column: 35,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 43,
                                                                                column: 46,
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
                                                                            line: 43,
                                                                            column: 35,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 43,
                                                                            column: 56,
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
                                                                                line: 43,
                                                                                column: 57,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 43,
                                                                                column: 72,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            }
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 43,
                                                                        column: 35,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 43,
                                                                        column: 73,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 43,
                                                                            column: 75,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 43,
                                                                            column: 86,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [],
                                                                loc: {
                                                                    start: {
                                                                        line: 43,
                                                                        column: 75,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 43,
                                                                        column: 88,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 43,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 43,
                                                                column: 89,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
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
                            },
                            loc: {
                                start: {
                                    line: 44,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 44,
                                    column: 39,
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
                                line: 44,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 44,
                                column: 46,
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
                            line: 44,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 44,
                            column: 54,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        }
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
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 46,
                                                                        column: 42,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 46,
                                                                        column: 49,
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
                                                                    type: 'Identifier',
                                                                    name: 'moduleName'
                                                                }
                                                            ],
                                                            loc: {
                                                                start: {
                                                                    line: 46,
                                                                    column: 42,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 46,
                                                                    column: 71,
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
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'console'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'log'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 47,
                                                        column: 12,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 47,
                                                        column: 23,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [{
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Literal',
                                                        value: 'checking server directory: '
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'directory'
                                                    }
                                                }],
                                            loc: {
                                                start: {
                                                    line: 47,
                                                    column: 12,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 47,
                                                    column: 66,
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
                                                        line: 48,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 48,
                                                        column: 47,
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
                                                                line: 48,
                                                                column: 64,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 48,
                                                                column: 73,
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
                                                                            line: 48,
                                                                            column: 74,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 48,
                                                                            column: 91,
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
                                                                        line: 48,
                                                                        column: 74,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 48,
                                                                        column: 98,
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
                                                                    line: 48,
                                                                    column: 74,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 48,
                                                                    column: 106,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 48,
                                                            column: 64,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 48,
                                                            column: 107,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                }
                                            ],
                                            loc: {
                                                start: {
                                                    line: 48,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 48,
                                                    column: 108,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 49,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 49,
                                                                    column: 34,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
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
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 49,
                                                                                column: 35,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 49,
                                                                                column: 46,
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
                                                                            line: 49,
                                                                            column: 35,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 56,
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
                                                                                line: 49,
                                                                                column: 57,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 49,
                                                                                column: 72,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            }
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 49,
                                                                        column: 35,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 49,
                                                                        column: 73,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 49,
                                                                            column: 75,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 86,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [],
                                                                loc: {
                                                                    start: {
                                                                        line: 49,
                                                                        column: 75,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 49,
                                                                        column: 88,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 49,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 49,
                                                                column: 89,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 57,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 57,
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
                                                                line: 57,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 57,
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
                                                            line: 57,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 57,
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
                            line: 52,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 59,
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
                                                                    line: 67,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 67,
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
                                                                line: 67,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 67,
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
                                                            line: 67,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 67,
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
                            line: 62,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 69,
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
                                line: 72,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 72,
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
                            line: 72,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 72,
                            column: 110,
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
                                        line: 73,
                                        column: 11,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 73,
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
                                                        line: 74,
                                                        column: 12,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 74,
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
                                                                line: 74,
                                                                column: 31,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 74,
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
                                                            line: 74,
                                                            column: 31,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 74,
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
                                                    line: 74,
                                                    column: 12,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 74,
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
                                            line: 76,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 76,
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
                                        line: 76,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 76,
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
                                line: 79,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 79,
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
                            line: 79,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 79,
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
                                                    line: 80,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 80,
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
                                                line: 80,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 80,
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
                                            line: 81,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 81,
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
                                                    line: 81,
                                                    column: 33,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 81,
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
                                                line: 81,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 81,
                                                column: 57,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 81,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 81,
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
                                            line: 83,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 83,
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
                                        line: 83,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 83,
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
                                        line: 86,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 86,
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
                                    line: 86,
                                    column: 21,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 86,
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
                                line: 87,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 87,
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
                            line: 87,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 87,
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
                                                    line: 88,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 88,
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
                                                line: 88,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 88,
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
                                            line: 89,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 89,
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
                                                                    line: 89,
                                                                    column: 50,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 89,
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
                                                                line: 89,
                                                                column: 50,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 89,
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
                                                            line: 89,
                                                            column: 88,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 89,
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
                                                        line: 89,
                                                        column: 88,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 89,
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
                                        line: 89,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 89,
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
                                            line: 91,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 91,
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
                                        line: 91,
                                        column: 8,
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
                                line: 95,
                                column: 22,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 95,
                                column: 34,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    arguments: [{
                            type: 'Literal',
                            value: '.coffeepage'
                        }],
                    loc: {
                        start: {
                            line: 95,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/WebsiteBuilder.ion'
                        },
                        end: {
                            line: 95,
                            column: 49,
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
                                                    line: 96,
                                                    column: 25,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 96,
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
                                                line: 96,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 96,
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
                                            line: 97,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 97,
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
                                                                    line: 97,
                                                                    column: 50,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 97,
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
                                                                line: 97,
                                                                column: 50,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 97,
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
                                                        name: 'compileCoffeeScript'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 97,
                                                            column: 88,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 97,
                                                            column: 115,
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
                                                        line: 97,
                                                        column: 88,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 97,
                                                        column: 121,
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
                                        line: 97,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 97,
                                        column: 128,
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
                                            line: 99,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 99,
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
                                        line: 99,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 99,
                                        column: 37,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
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