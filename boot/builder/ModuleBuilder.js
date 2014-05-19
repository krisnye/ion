void (function(){var _ion_builder_ModuleBuilder_ = function(module,exports,require){'use strict';
var ion = require('../'), File = require('./File'), Directory = require('./Directory'), builder = require('./'), compilers = {
        '.coffee': { compile: builder.compileCoffeeScript },
        '.pegjs': { compile: builder.compilePegjs },
        '.js': { compile: builder.shimJavascript },
        '.ion': {
            compile: builder.compileIon,
            compileWithSourceMap: builder.compileIonWithSourceMap
        }
    };
module.exports = exports = ion.template(function (packagePatch) {
    var packageJson = ion.patch(JSON.parse(new File('package.json').read()), packagePatch != null ? packagePatch : {});
    var input = new Directory(packageJson.directories.src != null ? packageJson.directories.src : 'src');
    var output = new Directory(packageJson.directories.lib != null ? packageJson.directories.lib : 'lib');
    var moduleName = packageJson.name != null ? packageJson.name : '';
    var _ref2 = [];
    for (var key in outputFiles) {
        if (key.endsWith('require.js')) {
            _ref2.push(key);
        }
    }
    var _ref3 = [];
    for (var key in outputFiles) {
        if (!builder.isPrivate(key) && top.indexOf(key) < 0) {
            _ref3.push(key);
        }
    }
    var _ref4 = [];
    for (var path in outputFiles) {
        var file = outputFiles[path];
        _ref4.push(file.modified);
    }
    var _ref5 = [];
    for (var _i = 0; _i < sortedFiles.length; _i++) {
        var path = sortedFiles[_i];
        _ref5.push(builder.normalizePath(path));
    }
    var _ref8 = {};
    {
        var extensions = Object.keys(compilers);
        {
            var _ref7 = input.search(extensions, packageJson.build.exclude);
            for (var path in _ref7) {
                var source = _ref7[path];
                var compiler = compilers[source.getExtension()];
                var targetPath = builder.changeExtension(path, '.js');
                if (compiler.compileWithSourceMap != null) {
                    var mapPath = builder.changeExtension(path, '.map');
                    var mapName = mapPath.split(/[\/\\]/g).slice(-1)[0];
                    var _ref = compiler.compileWithSourceMap(source, packageJson);
                    var code = _ref[0];
                    var map = _ref[1];
                    _ref8[targetPath] = code + '\n//@ sourceMappingURL=./' + mapName;
                    _ref8[mapPath] = map;
                } else {
                    _ref8[targetPath] = compiler.compile(source, packageJson);
                }
            }
        }
        var outputFiles = output.search('.js', [
                /^_/,
                'node_modules'
            ]);
        var top = _ref2;
        var sortedFiles = top.concat(_ref3);
        var manifestFileName = 'manifest.json';
        var manifest = {
                modified: Math.max.apply(null, _ref4),
                files: _ref5
            };
        _ref8[manifestFileName] = JSON.stringify(manifest, null, '  ', sortedFiles);
        if (packageJson.build.merge != null) {
            var _ref6 = [];
            for (var _i2 = 0; _i2 < sortedFiles.length; _i2++) {
                var name = sortedFiles[_i2];
                ion.add(_ref8, _ref6.push(outputFiles[name].read()));
            }
            _ref8[packageJson.build.merge] = _ref6.join('\n');
        }
        if (packageJson.build.package) {
            _ref8['package.json'] = JSON.stringify(ion.patch(ion.clone(packageJson), { main: void 0 }), null, '    ');
        }
        if (packageJson.build.test !== false) {
            var manifestFile = output.getFile(manifestFileName);
            ion.add(_ref8, builder.runTests(manifestFile, manifestFile.modified));
        }
    }
    ion.patch(output, _ref8);
}, function (packagePatch) {
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
                type: 'Property',
                key: {
                    type: 'Identifier',
                    name: 'output'
                },
                value: {
                    type: 'ObjectExpression',
                    properties: [
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
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'mapPath'
                                                    },
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'map'
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }
                                            ]
                                        },
                                        alternate: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'targetPath'
                                                    },
                                                    value: {
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
                                                    },
                                                    kind: 'init',
                                                    computed: true
                                                }]
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
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'sortedFiles'
                                    }
                                ]
                            },
                            kind: 'init',
                            computed: true
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
                                body: [{
                                        type: 'Property',
                                        key: {
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
                                        value: {
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
                                                            type: 'ForOfStatement',
                                                            left: {
                                                                type: 'VariableDeclaration',
                                                                declarations: [{
                                                                        type: 'VariableDeclarator',
                                                                        id: {
                                                                            type: 'Identifier',
                                                                            name: 'name'
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
                                                                }
                                                            }
                                                        }]
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
                                        kind: 'init',
                                        computed: true
                                    }]
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
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'package.json'
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
                                        },
                                        kind: 'init',
                                        computed: true
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
                            alternate: null
                        }
                    ]
                },
                kind: 'init'
            }
        ],
        bound: false
    }, {
        this: this,
        require: require,
        module: module,
        exports: exports,
        ion: ion,
        packagePatch: packagePatch,
        File: File,
        Directory: Directory,
        builder: builder,
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