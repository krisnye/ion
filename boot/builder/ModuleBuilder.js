void (function(){var _ion_builder_ModuleBuilder_ = function(module,exports,require){'use strict';
const ion = require('ion');
const File = require('./File'), Directory = require('./Directory'), builder = require('./');
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
                                value: '.coffee'
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
                                                    name: 'name'
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'key'
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
                                    name: 'output'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    objectType: null,
                                    properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'target'
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'path'
                                                }
                                            },
                                            value: {
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
            inputName: inputName,
            outputName: outputName,
            options: options,
            File: File,
            Directory: Directory,
            builder: builder
        });
    }
    let input = new Directory(inputName);
    let output = new Directory(outputName);
    {
        let _ref = input.search('.coffee');
        for (let path in _ref) {
            let file = _ref[path];
            let target = output.getFile(builder.changeExtension(key, '.js'));
            let moduleId = builder.getModuleId(name, key);
            if (output == null)
                output = {};
            output[target.path] = builder.compileCoffeeScript(source, moduleId);
        }
    }
};
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