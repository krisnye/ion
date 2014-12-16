void (function(){var _ion_builder_ModuleBuilder_ = function(module,exports,require){'use strict';
if (global.window) {
    return;
}
var ion = require('../'), np = require('path'), File = require('./File'), Directory = require('./Directory'), builder = require('./'), utility = require('./utility'), createDebugScript = function (manifest, moduleName) {
        var scripts = [];
        {
            var _ref2 = manifest.files;
            for (var _i = 0; _i < _ref2.length; _i++) {
                var file = _ref2[_i];
                scripts.push('/bower_components/' + moduleName + '/lib/' + file);
            }
        }
        return '(function(files){\n    for (var i = 0; i < files.length; i++) {\n        document.writeln("<script src=\'" + files[i] + "\'></script>")\n    }\n})(' + JSON.stringify(scripts) + ');';
    }, compilers = {
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
                                },
                                loc: {
                                    start: {
                                        line: 35,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 35,
                                        column: 31,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                line: 35,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 35,
                                                column: 42,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
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
                                                        line: 35,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 35,
                                                        column: 72,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            loc: {
                                                start: {
                                                    line: 35,
                                                    column: 43,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 35,
                                                    column: 74,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 35,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 35,
                                            column: 75,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                    line: 35,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 35,
                                    column: 95,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                        line: 36,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 36,
                                                        column: 53,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'src'
                                            },
                                            loc: {
                                                start: {
                                                    line: 36,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 36,
                                                    column: 57,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                    line: 36,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 36,
                                                    column: 53,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'src'
                                        },
                                        loc: {
                                            start: {
                                                line: 36,
                                                column: 30,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 36,
                                                column: 57,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 37,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 37,
                                                        column: 54,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'lib'
                                            },
                                            loc: {
                                                start: {
                                                    line: 37,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 37,
                                                    column: 58,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                    line: 37,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 37,
                                                    column: 54,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'lib'
                                        },
                                        loc: {
                                            start: {
                                                line: 37,
                                                column: 31,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 37,
                                                column: 58,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 38,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 38,
                                            column: 37,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                    type: 'Identifier',
                                    name: 'packageJson'
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'name'
                                },
                                loc: {
                                    start: {
                                        line: 38,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 38,
                                        column: 37,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
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
                                },
                                loc: {
                                    start: {
                                        line: 41,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 41,
                                        column: 32,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'compilers'
                                }],
                            loc: {
                                start: {
                                    line: 41,
                                    column: 21,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 41,
                                    column: 43,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                        },
                        loc: {
                            start: {
                                line: 42,
                                column: 24,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 42,
                                column: 36,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
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
                                },
                                loc: {
                                    start: {
                                        line: 42,
                                        column: 49,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 42,
                                        column: 66,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                    column: 49,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 42,
                                    column: 74,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 42,
                            column: 24,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        },
                        end: {
                            line: 42,
                            column: 75,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        }
                    }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 43,
                                            column: 15,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 43,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 44,
                                                                    column: 37,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 44,
                                                                    column: 56,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        loc: {
                                                            start: {
                                                                line: 44,
                                                                column: 37,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 44,
                                                                column: 58,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 44,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 44,
                                                            column: 59,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                line: 45,
                                                                column: 29,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 45,
                                                                column: 52,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
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
                                                            line: 45,
                                                            column: 29,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 45,
                                                            column: 65,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 48,
                                                        column: 15,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 48,
                                                        column: 44,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 49,
                                                                            column: 30,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 53,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                        value: '.map'
                                                                    }
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 49,
                                                                        column: 30,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 49,
                                                                        column: 67,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 50,
                                                                                        column: 30,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 50,
                                                                                        column: 43,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            arguments: [{
                                                                                    type: 'Literal',
                                                                                    value: /[\/\\]/g
                                                                                }],
                                                                            loc: {
                                                                                start: {
                                                                                    line: 50,
                                                                                    column: 30,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 50,
                                                                                    column: 54,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'slice'
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 50,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 50,
                                                                                column: 60,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'UnaryExpression',
                                                                            operator: '-',
                                                                            argument: {
                                                                                type: 'Literal',
                                                                                value: 1
                                                                            }
                                                                        }],
                                                                    loc: {
                                                                        start: {
                                                                            line: 50,
                                                                            column: 30,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 50,
                                                                            column: 64,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Literal',
                                                                    value: 0
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 50,
                                                                        column: 30,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 50,
                                                                        column: 67,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 51,
                                                                            column: 33,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 51,
                                                                            column: 62,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
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
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 51,
                                                                        column: 33,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 51,
                                                                        column: 83,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 52,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 52,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                        type: 'Identifier',
                                                                        name: 'code'
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: '\n//# sourceMappingURL=./'
                                                                    }
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'mapName'
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 52,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 52,
                                                                column: 86,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 53,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 53,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
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
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 53,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 53,
                                                                column: 42,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 55,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 55,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                        name: 'compiler'
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'compile'
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 55,
                                                                            column: 41,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 55,
                                                                            column: 57,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
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
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 55,
                                                                        column: 41,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 55,
                                                                        column: 78,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 55,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 55,
                                                                column: 79,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 57,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 57,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'targetPath'
                                    }],
                                loc: {
                                    start: {
                                        line: 57,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 57,
                                        column: 33,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 58,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 58,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [{
                                        type: 'Identifier',
                                        name: 'mapPath'
                                    }],
                                loc: {
                                    start: {
                                        line: 58,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 58,
                                        column: 30,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
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
                            name: 'potentialIndexDirectories'
                        },
                        init: {
                            type: 'ObjectExpression',
                            objectType: {
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
                                            line: 61,
                                            column: 36,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 61,
                                            column: 48,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 61,
                                                    column: 55,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 61,
                                                    column: 72,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                        name: 'packageJson'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'build'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 61,
                                                            column: 73,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 61,
                                                            column: 90,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                        column: 73,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 61,
                                                        column: 98,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            }],
                                        loc: {
                                            start: {
                                                line: 61,
                                                column: 55,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 61,
                                                column: 99,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 61,
                                        column: 36,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 61,
                                        column: 100,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: '.'
                                    },
                                    value: {
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 62,
                                                    column: 15,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 62,
                                                    column: 28,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        arguments: [{
                                                type: 'Literal',
                                                value: '.'
                                            }],
                                        loc: {
                                            start: {
                                                line: 62,
                                                column: 15,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 62,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: true
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
                    type: 'Identifier',
                    name: 'potentialIndexDirectories'
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
                                },
                                loc: {
                                    start: {
                                        line: 64,
                                        column: 11,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 64,
                                        column: 27,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 66,
                                                                            column: 30,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 66,
                                                                            column: 43,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
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
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 66,
                                                                        column: 30,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 66,
                                                                        column: 63,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 66,
                                                                    column: 30,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 66,
                                                                    column: 70,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 66,
                                                                            column: 74,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 66,
                                                                            column: 87,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
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
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 66,
                                                                        column: 74,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 66,
                                                                        column: 108,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 66,
                                                                    column: 74,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 66,
                                                                    column: 115,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
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
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 66,
                                                                        column: 119,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 66,
                                                                        column: 132,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
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
                                                                }],
                                                            loc: {
                                                                start: {
                                                                    line: 66,
                                                                    column: 119,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 66,
                                                                    column: 156,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'exists'
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 66,
                                                                column: 119,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 66,
                                                                column: 163,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 69,
                                                                            column: 37,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 69,
                                                                            column: 56,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'path'
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 69,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 69,
                                                                        column: 62,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 71,
                                                                            column: 32,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 71,
                                                                            column: 54,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'indexName'
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 71,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 71,
                                                                        column: 65,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                name: 'lines'
                                                            },
                                                            init: {
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
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 74,
                                                                                        column: 42,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 74,
                                                                                        column: 63,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
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
                                                                            ],
                                                                            loc: {
                                                                                start: {
                                                                                    line: 74,
                                                                                    column: 42,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 74,
                                                                                    column: 95,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
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
                                                                                                                },
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 76,
                                                                                                                        column: 39,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 76,
                                                                                                                        column: 52,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
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
                                                                                                                        },
                                                                                                                        loc: {
                                                                                                                            start: {
                                                                                                                                line: 76,
                                                                                                                                column: 56,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            },
                                                                                                                            end: {
                                                                                                                                line: 76,
                                                                                                                                column: 71,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    arguments: [{
                                                                                                                            type: 'Literal',
                                                                                                                            value: '.js'
                                                                                                                        }],
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 76,
                                                                                                                            column: 56,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 76,
                                                                                                                            column: 78,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            ],
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 76,
                                                                                                                    column: 39,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 76,
                                                                                                                    column: 79,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                                                    name: 'key'
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
                                                                                                                    value: 'Object.defineProperty(exports, \''
                                                                                                                },
                                                                                                                right: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'name'
                                                                                                                }
                                                                                                            },
                                                                                                            right: {
                                                                                                                type: 'Literal',
                                                                                                                value: '\', {get:function(){ return require(\'./'
                                                                                                            }
                                                                                                        },
                                                                                                        right: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name'
                                                                                                        }
                                                                                                    },
                                                                                                    right: {
                                                                                                        type: 'Literal',
                                                                                                        value: '\') }, enumerable: true}) '
                                                                                                    }
                                                                                                },
                                                                                                kind: 'init',
                                                                                                computed: true
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
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 79,
                                                                                    column: 36,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 79,
                                                                                    column: 43,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
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
                                                                        ],
                                                                        loc: {
                                                                            start: {
                                                                                line: 79,
                                                                                column: 36,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 79,
                                                                                column: 70,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'replace'
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 79,
                                                                            column: 36,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 79,
                                                                            column: 78,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
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
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 79,
                                                                        column: 36,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 79,
                                                                        column: 90,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                name: 'indexDirectory'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'write'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 80,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 80,
                                                                    column: 36,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'indexName'
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
                                                                        name: 'addBrowserShim'
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 80,
                                                                            column: 48,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 80,
                                                                            column: 70,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                                            name: 'lines'
                                                                                        },
                                                                                        body: {
                                                                                            type: 'ExpressionStatement',
                                                                                            expression: {
                                                                                                type: 'Identifier',
                                                                                                name: 'value'
                                                                                            }
                                                                                        }
                                                                                    }]
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'join'
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 80,
                                                                                    column: 71,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 80,
                                                                                    column: 107,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Literal',
                                                                                value: '\n'
                                                                            }],
                                                                        loc: {
                                                                            start: {
                                                                                line: 80,
                                                                                column: 71,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 80,
                                                                                column: 113,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'indexModuleId'
                                                                    }
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 80,
                                                                        column: 48,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 80,
                                                                        column: 129,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 80,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 80,
                                                                column: 130,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                },
                                loc: {
                                    start: {
                                        line: 84,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 84,
                                        column: 35,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
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
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'concat'
                                        },
                                        loc: {
                                            start: {
                                                line: 84,
                                                column: 43,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 84,
                                                column: 72,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
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
                                                    name: 'Object'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'keys'
                                                },
                                                loc: {
                                                    start: {
                                                        line: 84,
                                                        column: 73,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 84,
                                                        column: 84,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
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
                                                                    name: 'build'
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 84,
                                                                        column: 85,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 84,
                                                                        column: 102,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'merge'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 84,
                                                                    column: 85,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 84,
                                                                    column: 108,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                name: 'build'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 84,
                                                                    column: 85,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 84,
                                                                    column: 102,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'merge'
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 84,
                                                                column: 85,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 84,
                                                                column: 108,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    alternate: {
                                                        type: 'ObjectExpression',
                                                        properties: []
                                                    }
                                                }],
                                            loc: {
                                                start: {
                                                    line: 84,
                                                    column: 73,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 84,
                                                    column: 114,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 84,
                                            column: 43,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 84,
                                            column: 115,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                }
                            ],
                            loc: {
                                start: {
                                    line: 84,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 84,
                                    column: 116,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 85,
                                                                column: 45,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 85,
                                                                column: 57,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: 'require.js'
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 85,
                                                            column: 45,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 85,
                                                            column: 71,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                },
                                loc: {
                                    start: {
                                        line: 86,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 86,
                                        column: 32,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
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
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 86,
                                                                                column: 68,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 86,
                                                                                column: 85,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'key'
                                                                        }],
                                                                    loc: {
                                                                        start: {
                                                                            line: 86,
                                                                            column: 68,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 86,
                                                                            column: 90,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
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
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 86,
                                                                                column: 95,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 86,
                                                                                column: 106,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'key'
                                                                        }],
                                                                    loc: {
                                                                        start: {
                                                                            line: 86,
                                                                            column: 95,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 86,
                                                                            column: 111,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
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
                                }],
                            loc: {
                                start: {
                                    line: 86,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 86,
                                    column: 117,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                },
                                loc: {
                                    start: {
                                        line: 88,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 88,
                                        column: 37,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'manifestFileName'
                                }],
                            loc: {
                                start: {
                                    line: 88,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 88,
                                    column: 55,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                },
                                                loc: {
                                                    start: {
                                                        line: 90,
                                                        column: 18,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 90,
                                                        column: 26,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply'
                                            },
                                            loc: {
                                                start: {
                                                    line: 90,
                                                    column: 18,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 90,
                                                    column: 32,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
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
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 90,
                                                                        column: 40,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 90,
                                                                        column: 53,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }]
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 90,
                                                column: 18,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 90,
                                                column: 85,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 91,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 91,
                                                                    column: 37,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'path'
                                                            }],
                                                        loc: {
                                                            start: {
                                                                line: 91,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 91,
                                                                column: 43,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                            name: 'output'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'write'
                        },
                        loc: {
                            start: {
                                line: 92,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 92,
                                column: 16,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'manifestFileName'
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
                                },
                                loc: {
                                    start: {
                                        line: 92,
                                        column: 35,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 92,
                                        column: 49,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
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
                            ],
                            loc: {
                                start: {
                                    line: 92,
                                    column: 35,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 92,
                                    column: 84,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 92,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        },
                        end: {
                            line: 92,
                            column: 85,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        }
                    }
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
                        },
                        loc: {
                            start: {
                                line: 94,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 94,
                                column: 16,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            value: '_debug.js'
                        },
                        {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'createDebugScript'
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'manifest'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'moduleName'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'sortedFiles'
                                }
                            ],
                            loc: {
                                start: {
                                    line: 94,
                                    column: 30,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 94,
                                    column: 82,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 94,
                            column: 4,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        },
                        end: {
                            line: 94,
                            column: 83,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        }
                    }
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
                            },
                            loc: {
                                start: {
                                    line: 97,
                                    column: 7,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 97,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'merge'
                        },
                        loc: {
                            start: {
                                line: 97,
                                column: 7,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 97,
                                column: 30,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
                        }
                    }
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'ForInStatement',
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'mergeFile'
                                        },
                                        init: null
                                    },
                                    {
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'options'
                                        },
                                        init: null
                                    }
                                ],
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
                                            line: 98,
                                            column: 34,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 98,
                                            column: 51,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'merge'
                                },
                                loc: {
                                    start: {
                                        line: 98,
                                        column: 34,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 98,
                                        column: 57,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                body: [
                                                                    {
                                                                        type: 'VariableDeclaration',
                                                                        declarations: [{
                                                                                type: 'VariableDeclarator',
                                                                                id: {
                                                                                    type: 'Identifier',
                                                                                    name: 'content'
                                                                                },
                                                                                init: {
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
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 101,
                                                                                                    column: 34,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 101,
                                                                                                    column: 51,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'read'
                                                                                        },
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 101,
                                                                                                column: 34,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 101,
                                                                                                column: 56,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    arguments: [],
                                                                                    existential: true,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 101,
                                                                                            column: 34,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 101,
                                                                                            column: 59,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                            operator: '&&',
                                                                            left: {
                                                                                type: 'BinaryExpression',
                                                                                operator: '&&',
                                                                                left: {
                                                                                    type: 'UnaryExpression',
                                                                                    operator: '?',
                                                                                    argument: {
                                                                                        type: 'Identifier',
                                                                                        name: 'content'
                                                                                    }
                                                                                },
                                                                                right: {
                                                                                    type: 'UnaryExpression',
                                                                                    operator: '!',
                                                                                    argument: {
                                                                                        type: 'CallExpression',
                                                                                        callee: {
                                                                                            type: 'MemberExpression',
                                                                                            computed: false,
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'content'
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'startsWith'
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 102,
                                                                                                    column: 40,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 102,
                                                                                                    column: 58,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        arguments: [{
                                                                                                type: 'Literal',
                                                                                                value: '#'
                                                                                            }],
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 102,
                                                                                                column: 40,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 102,
                                                                                                column: 63,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            },
                                                                            right: {
                                                                                type: 'UnaryExpression',
                                                                                operator: '!',
                                                                                argument: {
                                                                                    type: 'CallExpression',
                                                                                    callee: {
                                                                                        type: 'MemberExpression',
                                                                                        computed: false,
                                                                                        object: {
                                                                                            type: 'Identifier',
                                                                                            name: 'utility'
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'isMatch'
                                                                                        },
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 102,
                                                                                                column: 72,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 102,
                                                                                                column: 87,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    arguments: [
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            name: 'name'
                                                                                        },
                                                                                        {
                                                                                            type: 'MemberExpression',
                                                                                            computed: false,
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'options'
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'exclude'
                                                                                            },
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 102,
                                                                                                    column: 94,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 102,
                                                                                                    column: 109,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            type: 'Literal',
                                                                                            value: false
                                                                                        }
                                                                                    ],
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 102,
                                                                                            column: 72,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 102,
                                                                                            column: 117,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        consequent: {
                                                                            type: 'BlockStatement',
                                                                            body: [{
                                                                                    type: 'Property',
                                                                                    key: {
                                                                                        type: 'Identifier',
                                                                                        name: 'index'
                                                                                    },
                                                                                    value: {
                                                                                        type: 'Identifier',
                                                                                        name: 'content'
                                                                                    },
                                                                                    kind: 'init',
                                                                                    computed: true
                                                                                }]
                                                                        },
                                                                        alternate: {
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
                                                                    }
                                                                ]
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
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'merged'
                                                },
                                                init: {
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
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 110,
                                                                column: 25,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 110,
                                                                column: 41,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: '\n'
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 110,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 110,
                                                            column: 47,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
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
                                                name: 'options'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'compress'
                                            },
                                            loc: {
                                                start: {
                                                    line: 111,
                                                    column: 15,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 111,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                name: 'minified'
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'require'
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Literal',
                                                                                value: 'uglify-js'
                                                                            }],
                                                                        loc: {
                                                                            start: {
                                                                                line: 112,
                                                                                column: 31,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 112,
                                                                                column: 51,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'minify'
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 112,
                                                                            column: 31,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 112,
                                                                            column: 58,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'merged'
                                                                    },
                                                                    {
                                                                        type: 'ObjectExpression',
                                                                        properties: [{
                                                                                type: 'Property',
                                                                                key: {
                                                                                    type: 'Identifier',
                                                                                    name: 'fromString'
                                                                                },
                                                                                value: {
                                                                                    type: 'Literal',
                                                                                    value: true
                                                                                },
                                                                                kind: 'init'
                                                                            }]
                                                                    }
                                                                ],
                                                                loc: {
                                                                    start: {
                                                                        line: 112,
                                                                        column: 31,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 112,
                                                                        column: 85,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
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
                                                                    line: 113,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 113,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'mergeFile'
                                                            },
                                                            {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'minified'
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'code'
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 113,
                                                                        column: 40,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 113,
                                                                        column: 53,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 113,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 113,
                                                                column: 54,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 115,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 115,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'mergeFile'
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'merged'
                                                            }
                                                        ],
                                                        loc: {
                                                            start: {
                                                                line: 115,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 115,
                                                                column: 47,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
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
                            },
                            loc: {
                                start: {
                                    line: 118,
                                    column: 7,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 118,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'package'
                        },
                        loc: {
                            start: {
                                line: 118,
                                column: 7,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 118,
                                column: 32,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
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
                                        name: 'output'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'write'
                                    },
                                    loc: {
                                        start: {
                                            line: 119,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 119,
                                            column: 20,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
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
                                            },
                                            loc: {
                                                start: {
                                                    line: 119,
                                                    column: 37,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 119,
                                                    column: 51,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                        name: 'ion'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'patch'
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 119,
                                                            column: 52,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 119,
                                                            column: 61,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                name: 'ion'
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'clone'
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 119,
                                                                    column: 62,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 119,
                                                                    column: 71,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'packageJson'
                                                            }],
                                                        loc: {
                                                            start: {
                                                                line: 119,
                                                                column: 62,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 119,
                                                                column: 84,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
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
                                                ],
                                                loc: {
                                                    start: {
                                                        line: 119,
                                                        column: 52,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 119,
                                                        column: 103,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Literal',
                                                value: null
                                            },
                                            {
                                                type: 'Literal',
                                                value: '    '
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 119,
                                                column: 37,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 119,
                                                column: 118,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 119,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 119,
                                        column: 119,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
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
                            },
                            loc: {
                                start: {
                                    line: 126,
                                    column: 7,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 126,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'test'
                        },
                        loc: {
                            start: {
                                line: 126,
                                column: 7,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 126,
                                column: 29,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
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
                                    },
                                    loc: {
                                        start: {
                                            line: 127,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 127,
                                            column: 24,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
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
                                        },
                                        loc: {
                                            start: {
                                                line: 127,
                                                column: 39,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 127,
                                                column: 60,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 127,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 127,
                                        column: 61,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            }
                        }]
                },
                alternate: null
            }
        ],
        bound: false
    }, {
        this: this,
        require: require,
        ion: ion,
        packagePatch: packagePatch,
        np: np,
        File: File,
        Directory: Directory,
        builder: builder,
        utility: utility,
        createDebugScript: createDebugScript,
        compilers: compilers
    }, null);
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
//# sourceMappingURL=./ModuleBuilder.map