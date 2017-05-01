void (function(){var _ion_builder_ModuleBuilder_ = function(module,exports,require){'use strict';
if (global.window) {
    return;
}
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
        id: null,
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'packageJson',
                            loc: {
                                start: {
                                    line: 26,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 26,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'ion',
                                    loc: {
                                        start: {
                                            line: 26,
                                            column: 22,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 26,
                                            column: 25,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'patch',
                                    loc: {
                                        start: {
                                            line: 26,
                                            column: 26,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 26,
                                            column: 31,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 26,
                                        column: 22,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 26,
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
                                            name: 'JSON',
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 32,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 36,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'parse',
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 37,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 42,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 26,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 26,
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
                                                        name: 'File',
                                                        loc: {
                                                            start: {
                                                                line: 26,
                                                                column: 47,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 26,
                                                                column: 51,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [{
                                                            type: 'Literal',
                                                            value: 'package.json'
                                                        }],
                                                    loc: {
                                                        start: {
                                                            line: 26,
                                                            column: 43,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 26,
                                                            column: 67,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'read',
                                                    loc: {
                                                        start: {
                                                            line: 26,
                                                            column: 68,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 26,
                                                            column: 72,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 26,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 26,
                                                        column: 72,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 43,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 74,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 26,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 26,
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
                                            name: 'packagePatch',
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 77,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 89,
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
                                        type: 'Identifier',
                                        name: 'packagePatch',
                                        loc: {
                                            start: {
                                                line: 26,
                                                column: 77,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 26,
                                                column: 89,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    alternate: {
                                        type: 'ObjectExpression',
                                        properties: []
                                    }
                                }
                            ],
                            loc: {
                                start: {
                                    line: 26,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 26,
                                    column: 95,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
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
                            name: 'input',
                            loc: {
                                start: {
                                    line: 27,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 27,
                                    column: 13,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'Directory',
                                loc: {
                                    start: {
                                        line: 27,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 27,
                                        column: 29,
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
                                                    name: 'packageJson',
                                                    loc: {
                                                        start: {
                                                            line: 27,
                                                            column: 30,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 27,
                                                            column: 41,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories',
                                                    loc: {
                                                        start: {
                                                            line: 27,
                                                            column: 42,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 27,
                                                            column: 53,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 27,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 27,
                                                        column: 53,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'src',
                                                loc: {
                                                    start: {
                                                        line: 27,
                                                        column: 54,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 27,
                                                        column: 57,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 27,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 27,
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
                                                name: 'packageJson',
                                                loc: {
                                                    start: {
                                                        line: 27,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 27,
                                                        column: 41,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories',
                                                loc: {
                                                    start: {
                                                        line: 27,
                                                        column: 42,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 27,
                                                        column: 53,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 27,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 27,
                                                    column: 53,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'src',
                                            loc: {
                                                start: {
                                                    line: 27,
                                                    column: 54,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 27,
                                                    column: 57,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 27,
                                                column: 30,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 27,
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
                                }],
                            loc: {
                                start: {
                                    line: 27,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 27,
                                    column: 66,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: '1'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'output',
                            loc: {
                                start: {
                                    line: 28,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 28,
                                    column: 14,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'Directory',
                                loc: {
                                    start: {
                                        line: 28,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 28,
                                        column: 30,
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
                                                    name: 'packageJson',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 31,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 28,
                                                            column: 42,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 43,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 28,
                                                            column: 54,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 54,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'lib',
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 55,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 58,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 28,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 28,
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
                                                name: 'packageJson',
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 42,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories',
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 54,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 28,
                                                    column: 31,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 28,
                                                    column: 54,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'lib',
                                            loc: {
                                                start: {
                                                    line: 28,
                                                    column: 55,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 28,
                                                    column: 58,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 28,
                                                column: 31,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 28,
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
                                }],
                            loc: {
                                start: {
                                    line: 28,
                                    column: 17,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 28,
                                    column: 67,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: '2'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'moduleName',
                            loc: {
                                start: {
                                    line: 29,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 29,
                                    column: 18,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
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
                                        name: 'packageJson',
                                        loc: {
                                            start: {
                                                line: 29,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 29,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'name',
                                        loc: {
                                            start: {
                                                line: 29,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 29,
                                                column: 37,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 29,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 29,
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
                                    name: 'packageJson',
                                    loc: {
                                        start: {
                                            line: 29,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 29,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'name',
                                    loc: {
                                        start: {
                                            line: 29,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 29,
                                            column: 37,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 29,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 29,
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
                kind: 'let',
                order: '3'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'extensions',
                            loc: {
                                start: {
                                    line: 32,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 32,
                                    column: 18,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'Object',
                                    loc: {
                                        start: {
                                            line: 32,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 32,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'keys',
                                    loc: {
                                        start: {
                                            line: 32,
                                            column: 28,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 32,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 32,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 32,
                                        column: 32,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'compilers',
                                    loc: {
                                        start: {
                                            line: 32,
                                            column: 33,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 32,
                                            column: 42,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                }],
                            loc: {
                                start: {
                                    line: 32,
                                    column: 21,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 32,
                                    column: 43,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: '4'
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
                                name: 'path',
                                loc: {
                                    start: {
                                        line: 33,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 33,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            init: null
                        },
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'source',
                                loc: {
                                    start: {
                                        line: 33,
                                        column: 14,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 33,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
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
                            name: 'input',
                            loc: {
                                start: {
                                    line: 33,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 33,
                                    column: 29,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'search',
                            loc: {
                                start: {
                                    line: 33,
                                    column: 30,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 33,
                                    column: 36,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 33,
                                column: 24,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 33,
                                column: 36,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'extensions',
                            loc: {
                                start: {
                                    line: 33,
                                    column: 37,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 33,
                                    column: 47,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'packageJson',
                                    loc: {
                                        start: {
                                            line: 33,
                                            column: 49,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 33,
                                            column: 60,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'build',
                                    loc: {
                                        start: {
                                            line: 33,
                                            column: 61,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 33,
                                            column: 66,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 33,
                                        column: 49,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 33,
                                        column: 66,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'exclude',
                                loc: {
                                    start: {
                                        line: 33,
                                        column: 67,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 33,
                                        column: 74,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 33,
                                    column: 49,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 33,
                                    column: 74,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 33,
                            column: 24,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        },
                        end: {
                            line: 33,
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
                                        name: 'source',
                                        loc: {
                                            start: {
                                                line: 34,
                                                column: 15,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 34,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'isDirectory',
                                        loc: {
                                            start: {
                                                line: 34,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 34,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 34,
                                            column: 15,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 34,
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
                                                    name: 'compiler',
                                                    loc: {
                                                        start: {
                                                            line: 35,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 35,
                                                            column: 24,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                init: {
                                                    type: 'MemberExpression',
                                                    computed: true,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'compilers',
                                                        loc: {
                                                            start: {
                                                                line: 35,
                                                                column: 27,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 35,
                                                                column: 36,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'source',
                                                                loc: {
                                                                    start: {
                                                                        line: 35,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 35,
                                                                        column: 43,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'getExtension',
                                                                loc: {
                                                                    start: {
                                                                        line: 35,
                                                                        column: 44,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 35,
                                                                        column: 56,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 35,
                                                                    column: 37,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 35,
                                                                    column: 56,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        loc: {
                                                            start: {
                                                                line: 35,
                                                                column: 37,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 35,
                                                                column: 58,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 35,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 35,
                                                            column: 59,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
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
                                                    name: 'targetPath',
                                                    loc: {
                                                        start: {
                                                            line: 36,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 36,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                init: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'builder',
                                                            loc: {
                                                                start: {
                                                                    line: 36,
                                                                    column: 29,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 36,
                                                                    column: 36,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'changeExtension',
                                                            loc: {
                                                                start: {
                                                                    line: 36,
                                                                    column: 37,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 36,
                                                                    column: 52,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 36,
                                                                column: 29,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 36,
                                                                column: 52,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'path',
                                                            loc: {
                                                                start: {
                                                                    line: 36,
                                                                    column: 53,
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
                                                        {
                                                            type: 'Literal',
                                                            value: '.js'
                                                        }
                                                    ],
                                                    loc: {
                                                        start: {
                                                            line: 36,
                                                            column: 29,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 36,
                                                            column: 65,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                }
                                            }],
                                        kind: 'let',
                                        order: '1'
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'source',
                                                loc: {
                                                    start: {
                                                        line: 46,
                                                        column: 15,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 46,
                                                        column: 21,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'exists',
                                                loc: {
                                                    start: {
                                                        line: 46,
                                                        column: 22,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 46,
                                                        column: 28,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 46,
                                                    column: 15,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 46,
                                                    column: 28,
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
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        argument: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'output',
                                                                    loc: {
                                                                        start: {
                                                                            line: 47,
                                                                            column: 21,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 47,
                                                                            column: 27,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'write',
                                                                    loc: {
                                                                        start: {
                                                                            line: 47,
                                                                            column: 28,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 47,
                                                                            column: 33,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 47,
                                                                        column: 21,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 47,
                                                                        column: 33,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'targetPath',
                                                                    loc: {
                                                                        start: {
                                                                            line: 47,
                                                                            column: 34,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 47,
                                                                            column: 44,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                            name: 'compiler',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 47,
                                                                                    column: 46,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 47,
                                                                                    column: 54,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'compile',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 47,
                                                                                    column: 55,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 47,
                                                                                    column: 62,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 47,
                                                                                column: 46,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 47,
                                                                                column: 62,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'source',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 47,
                                                                                    column: 63,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 47,
                                                                                    column: 69,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'packageJson',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 47,
                                                                                    column: 71,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 47,
                                                                                    column: 82,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    loc: {
                                                                        start: {
                                                                            line: 47,
                                                                            column: 46,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 47,
                                                                            column: 83,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            loc: {
                                                                start: {
                                                                    line: 47,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 47,
                                                                    column: 84,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 47,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 47,
                                                            column: 84,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        argument: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'output',
                                                                    loc: {
                                                                        start: {
                                                                            line: 49,
                                                                            column: 21,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 27,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'delete',
                                                                    loc: {
                                                                        start: {
                                                                            line: 49,
                                                                            column: 28,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 34,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 49,
                                                                        column: 21,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 49,
                                                                        column: 34,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            arguments: [{
                                                                    type: 'Identifier',
                                                                    name: 'targetPath',
                                                                    loc: {
                                                                        start: {
                                                                            line: 49,
                                                                            column: 35,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 49,
                                                                            column: 45,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                }],
                                                            loc: {
                                                                start: {
                                                                    line: 49,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 49,
                                                                    column: 46,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 49,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 49,
                                                            column: 46,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        order: '2'
                                    }
                                ]
                            },
                            alternate: null,
                            order: '0'
                        }]
                },
                remove: null,
                order: '5'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'potentialIndexDirectories',
                            loc: {
                                start: {
                                    line: 52,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 52,
                                    column: 33,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
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
                                        name: 'input',
                                        loc: {
                                            start: {
                                                line: 52,
                                                column: 36,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 52,
                                                column: 41,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'search',
                                        loc: {
                                            start: {
                                                line: 52,
                                                column: 42,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 52,
                                                column: 48,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 52,
                                            column: 36,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 52,
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
                                                name: 'extensions',
                                                loc: {
                                                    start: {
                                                        line: 52,
                                                        column: 55,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 52,
                                                        column: 65,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'concat',
                                                loc: {
                                                    start: {
                                                        line: 52,
                                                        column: 66,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 52,
                                                        column: 72,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 52,
                                                    column: 55,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 52,
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
                                                        name: 'packageJson',
                                                        loc: {
                                                            start: {
                                                                line: 52,
                                                                column: 73,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 52,
                                                                column: 84,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'build',
                                                        loc: {
                                                            start: {
                                                                line: 52,
                                                                column: 85,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 52,
                                                                column: 90,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 52,
                                                            column: 73,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 52,
                                                            column: 90,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'exclude',
                                                    loc: {
                                                        start: {
                                                            line: 52,
                                                            column: 91,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 52,
                                                            column: 98,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 52,
                                                        column: 73,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 52,
                                                        column: 98,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            }],
                                        loc: {
                                            start: {
                                                line: 52,
                                                column: 55,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 52,
                                                column: 99,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 52,
                                        column: 36,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 52,
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
                                                name: 'input',
                                                loc: {
                                                    start: {
                                                        line: 53,
                                                        column: 15,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 53,
                                                        column: 20,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'getFile',
                                                loc: {
                                                    start: {
                                                        line: 53,
                                                        column: 21,
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
                                            loc: {
                                                start: {
                                                    line: 53,
                                                    column: 15,
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
                                        arguments: [{
                                                type: 'Literal',
                                                value: '.'
                                            }],
                                        loc: {
                                            start: {
                                                line: 53,
                                                column: 15,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 53,
                                                column: 33,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: true,
                                    order: '0'
                                }]
                        }
                    }],
                kind: 'let',
                order: '6'
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
                                name: 'path',
                                loc: {
                                    start: {
                                        line: 54,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 54,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            init: null
                        },
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'file',
                                loc: {
                                    start: {
                                        line: 54,
                                        column: 14,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 54,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
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
                    name: 'potentialIndexDirectories',
                    loc: {
                        start: {
                            line: 54,
                            column: 22,
                            fixed: true,
                            source: 'ion/builder/ModuleBuilder.ion'
                        },
                        end: {
                            line: 54,
                            column: 47,
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
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'file',
                                    loc: {
                                        start: {
                                            line: 55,
                                            column: 11,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 55,
                                            column: 15,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'isDirectory',
                                    loc: {
                                        start: {
                                            line: 55,
                                            column: 16,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 55,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 55,
                                        column: 11,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 55,
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
                                                    name: 'isInputFile',
                                                    loc: {
                                                        start: {
                                                            line: 57,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 57,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
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
                                                                        name: 'input',
                                                                        loc: {
                                                                            start: {
                                                                                line: 57,
                                                                                column: 30,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 57,
                                                                                column: 35,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'getFile',
                                                                        loc: {
                                                                            start: {
                                                                                line: 57,
                                                                                column: 36,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 57,
                                                                                column: 43,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 57,
                                                                            column: 30,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 57,
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
                                                                            name: 'path',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 57,
                                                                                    column: 44,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 57,
                                                                                    column: 48,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        right: {
                                                                            type: 'Literal',
                                                                            value: '/index.js'
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 57,
                                                                        column: 30,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 57,
                                                                        column: 63,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists',
                                                                loc: {
                                                                    start: {
                                                                        line: 57,
                                                                        column: 64,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 57,
                                                                        column: 70,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 57,
                                                                    column: 30,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 57,
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
                                                                        name: 'input',
                                                                        loc: {
                                                                            start: {
                                                                                line: 57,
                                                                                column: 74,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 57,
                                                                                column: 79,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'getFile',
                                                                        loc: {
                                                                            start: {
                                                                                line: 57,
                                                                                column: 80,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 57,
                                                                                column: 87,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 57,
                                                                            column: 74,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 57,
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
                                                                            name: 'path',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 57,
                                                                                    column: 88,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 57,
                                                                                    column: 92,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        right: {
                                                                            type: 'Literal',
                                                                            value: '/index.ion'
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 57,
                                                                        column: 74,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 57,
                                                                        column: 108,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'exists',
                                                                loc: {
                                                                    start: {
                                                                        line: 57,
                                                                        column: 109,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 57,
                                                                        column: 115,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 57,
                                                                    column: 74,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 57,
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
                                                                    name: 'input',
                                                                    loc: {
                                                                        start: {
                                                                            line: 57,
                                                                            column: 119,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 57,
                                                                            column: 124,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'getFile',
                                                                    loc: {
                                                                        start: {
                                                                            line: 57,
                                                                            column: 125,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 57,
                                                                            column: 132,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 57,
                                                                        column: 119,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 57,
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
                                                                        name: 'path',
                                                                        loc: {
                                                                            start: {
                                                                                line: 57,
                                                                                column: 133,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 57,
                                                                                column: 137,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: '/index.coffee'
                                                                    }
                                                                }],
                                                            loc: {
                                                                start: {
                                                                    line: 57,
                                                                    column: 119,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 57,
                                                                    column: 156,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'exists',
                                                            loc: {
                                                                start: {
                                                                    line: 57,
                                                                    column: 157,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 57,
                                                                    column: 163,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 57,
                                                                column: 119,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 57,
                                                                column: 163,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    }
                                                }
                                            }],
                                        kind: 'let',
                                        order: '0'
                                    },
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'isInputFile',
                                                loc: {
                                                    start: {
                                                        line: 58,
                                                        column: 19,
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
                                                                name: 'indexDirectory',
                                                                loc: {
                                                                    start: {
                                                                        line: 60,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 60,
                                                                        column: 34,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'output',
                                                                        loc: {
                                                                            start: {
                                                                                line: 60,
                                                                                column: 37,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 60,
                                                                                column: 43,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'getDirectory',
                                                                        loc: {
                                                                            start: {
                                                                                line: 60,
                                                                                column: 44,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 60,
                                                                                column: 56,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 60,
                                                                            column: 37,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 60,
                                                                            column: 56,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'path',
                                                                        loc: {
                                                                            start: {
                                                                                line: 60,
                                                                                column: 57,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 60,
                                                                                column: 61,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 60,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 60,
                                                                        column: 62,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
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
                                                                name: 'indexName',
                                                                loc: {
                                                                    start: {
                                                                        line: 61,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 61,
                                                                        column: 29,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            init: {
                                                                type: 'Literal',
                                                                value: 'index.js'
                                                            }
                                                        }],
                                                    kind: 'let',
                                                    order: '1'
                                                },
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'indexFile',
                                                                loc: {
                                                                    start: {
                                                                        line: 62,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 62,
                                                                        column: 29,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            init: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'indexDirectory',
                                                                        loc: {
                                                                            start: {
                                                                                line: 62,
                                                                                column: 32,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 62,
                                                                                column: 46,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'getFile',
                                                                        loc: {
                                                                            start: {
                                                                                line: 62,
                                                                                column: 47,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 62,
                                                                                column: 54,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 62,
                                                                            column: 32,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 62,
                                                                            column: 54,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'indexName',
                                                                        loc: {
                                                                            start: {
                                                                                line: 62,
                                                                                column: 55,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 62,
                                                                                column: 64,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    }],
                                                                loc: {
                                                                    start: {
                                                                        line: 62,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 62,
                                                                        column: 65,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        }],
                                                    kind: 'let',
                                                    order: '2'
                                                },
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'lines',
                                                                loc: {
                                                                    start: {
                                                                        line: 64,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 64,
                                                                        column: 25,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
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
                                                                                        name: 'key',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 65,
                                                                                                column: 24,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 65,
                                                                                                column: 27,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    init: null
                                                                                },
                                                                                {
                                                                                    type: 'VariableDeclarator',
                                                                                    id: {
                                                                                        type: 'Identifier',
                                                                                        name: 'childFile',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 65,
                                                                                                column: 29,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 65,
                                                                                                column: 38,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
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
                                                                                    name: 'indexDirectory',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 65,
                                                                                            column: 42,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 65,
                                                                                            column: 56,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'search',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 65,
                                                                                            column: 57,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 65,
                                                                                            column: 63,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 65,
                                                                                        column: 42,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 65,
                                                                                        column: 63,
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
                                                                                    type: 'Literal',
                                                                                    value: null
                                                                                },
                                                                                {
                                                                                    type: 'ObjectExpression',
                                                                                    properties: [{
                                                                                            type: 'Property',
                                                                                            key: {
                                                                                                type: 'Identifier',
                                                                                                name: 'recursive',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 65,
                                                                                                        column: 77,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 65,
                                                                                                        column: 86,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            value: {
                                                                                                type: 'Literal',
                                                                                                value: false
                                                                                            },
                                                                                            kind: 'init',
                                                                                            order: '0'
                                                                                        }]
                                                                                }
                                                                            ],
                                                                            loc: {
                                                                                start: {
                                                                                    line: 65,
                                                                                    column: 42,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 65,
                                                                                    column: 94,
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
                                                                                        operator: '&&',
                                                                                        left: {
                                                                                            type: 'BinaryExpression',
                                                                                            operator: '!==',
                                                                                            left: {
                                                                                                type: 'Identifier',
                                                                                                name: 'key',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 66,
                                                                                                        column: 27,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 66,
                                                                                                        column: 30,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            right: {
                                                                                                type: 'Identifier',
                                                                                                name: 'indexName',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 66,
                                                                                                        column: 36,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 66,
                                                                                                        column: 45,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        right: {
                                                                                            type: 'BinaryExpression',
                                                                                            operator: '||',
                                                                                            left: {
                                                                                                type: 'CallExpression',
                                                                                                callee: {
                                                                                                    type: 'MemberExpression',
                                                                                                    computed: false,
                                                                                                    object: {
                                                                                                        type: 'MemberExpression',
                                                                                                        computed: false,
                                                                                                        object: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'childFile',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 66,
                                                                                                                    column: 51,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 66,
                                                                                                                    column: 60,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        property: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'path',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 66,
                                                                                                                    column: 61,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 66,
                                                                                                                    column: 65,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 66,
                                                                                                                column: 51,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 66,
                                                                                                                column: 65,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'endsWith',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 66,
                                                                                                                column: 66,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 66,
                                                                                                                column: 74,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 66,
                                                                                                            column: 51,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 66,
                                                                                                            column: 74,
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
                                                                                                        line: 66,
                                                                                                        column: 51,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 66,
                                                                                                        column: 81,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            right: {
                                                                                                type: 'MemberExpression',
                                                                                                computed: false,
                                                                                                object: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'childFile',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 66,
                                                                                                            column: 85,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 66,
                                                                                                            column: 94,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                property: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'isDirectory',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 66,
                                                                                                            column: 95,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 66,
                                                                                                            column: 106,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 66,
                                                                                                        column: 85,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 66,
                                                                                                        column: 106,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
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
                                                                                                            name: 'name',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 67,
                                                                                                                    column: 32,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 67,
                                                                                                                    column: 36,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        init: {
                                                                                                            type: 'ConditionalExpression',
                                                                                                            test: {
                                                                                                                type: 'MemberExpression',
                                                                                                                computed: false,
                                                                                                                object: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'childFile',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 67,
                                                                                                                            column: 39,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 67,
                                                                                                                            column: 48,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                property: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'isDirectory',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 67,
                                                                                                                            column: 49,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 67,
                                                                                                                            column: 60,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 67,
                                                                                                                        column: 39,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 67,
                                                                                                                        column: 60,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            consequent: {
                                                                                                                type: 'Identifier',
                                                                                                                name: 'key',
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 67,
                                                                                                                        column: 63,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 67,
                                                                                                                        column: 66,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            alternate: {
                                                                                                                type: 'CallExpression',
                                                                                                                callee: {
                                                                                                                    type: 'MemberExpression',
                                                                                                                    computed: false,
                                                                                                                    object: {
                                                                                                                        type: 'Identifier',
                                                                                                                        name: 'key',
                                                                                                                        loc: {
                                                                                                                            start: {
                                                                                                                                line: 67,
                                                                                                                                column: 69,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            },
                                                                                                                            end: {
                                                                                                                                line: 67,
                                                                                                                                column: 72,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    property: {
                                                                                                                        type: 'Identifier',
                                                                                                                        name: 'substring',
                                                                                                                        loc: {
                                                                                                                            start: {
                                                                                                                                line: 67,
                                                                                                                                column: 73,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            },
                                                                                                                            end: {
                                                                                                                                line: 67,
                                                                                                                                column: 82,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    },
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 67,
                                                                                                                            column: 69,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 67,
                                                                                                                            column: 82,
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
                                                                                                                                name: 'key',
                                                                                                                                loc: {
                                                                                                                                    start: {
                                                                                                                                        line: 67,
                                                                                                                                        column: 86,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    },
                                                                                                                                    end: {
                                                                                                                                        line: 67,
                                                                                                                                        column: 89,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            },
                                                                                                                            property: {
                                                                                                                                type: 'Identifier',
                                                                                                                                name: 'lastIndexOf',
                                                                                                                                loc: {
                                                                                                                                    start: {
                                                                                                                                        line: 67,
                                                                                                                                        column: 90,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    },
                                                                                                                                    end: {
                                                                                                                                        line: 67,
                                                                                                                                        column: 101,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            },
                                                                                                                            loc: {
                                                                                                                                start: {
                                                                                                                                    line: 67,
                                                                                                                                    column: 86,
                                                                                                                                    fixed: true,
                                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                },
                                                                                                                                end: {
                                                                                                                                    line: 67,
                                                                                                                                    column: 101,
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
                                                                                                                                line: 67,
                                                                                                                                column: 86,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            },
                                                                                                                            end: {
                                                                                                                                line: 67,
                                                                                                                                column: 108,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                ],
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 67,
                                                                                                                        column: 69,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 67,
                                                                                                                        column: 109,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }],
                                                                                                kind: 'let',
                                                                                                order: '0'
                                                                                            },
                                                                                            {
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
                                                                                                                    name: 'name',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 68,
                                                                                                                            column: 35,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 68,
                                                                                                                            column: 39,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                property: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'startsWith',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 68,
                                                                                                                            column: 40,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 68,
                                                                                                                            column: 50,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 68,
                                                                                                                        column: 35,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 68,
                                                                                                                        column: 50,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            arguments: [{
                                                                                                                    type: 'Literal',
                                                                                                                    value: '_'
                                                                                                                }],
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 68,
                                                                                                                    column: 35,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 68,
                                                                                                                    column: 55,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    right: {
                                                                                                        type: 'BinaryExpression',
                                                                                                        operator: '!==',
                                                                                                        left: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 68,
                                                                                                                    column: 60,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 68,
                                                                                                                    column: 64,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        right: {
                                                                                                            type: 'Literal',
                                                                                                            value: ''
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                consequent: {
                                                                                                    type: 'BlockStatement',
                                                                                                    body: [{
                                                                                                            type: 'Property',
                                                                                                            key: {
                                                                                                                type: 'Identifier',
                                                                                                                name: 'key',
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 69,
                                                                                                                        column: 33,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 69,
                                                                                                                        column: 36,
                                                                                                                        fixed: true,
                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                    }
                                                                                                                }
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
                                                                                                                                name: 'name',
                                                                                                                                loc: {
                                                                                                                                    start: {
                                                                                                                                        line: 69,
                                                                                                                                        column: 74,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    },
                                                                                                                                    end: {
                                                                                                                                        line: 69,
                                                                                                                                        column: 78,
                                                                                                                                        fixed: true,
                                                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        },
                                                                                                                        right: {
                                                                                                                            type: 'Literal',
                                                                                                                            value: '\', {get:function(){ return require(\'./'
                                                                                                                        }
                                                                                                                    },
                                                                                                                    right: {
                                                                                                                        type: 'Identifier',
                                                                                                                        name: 'name',
                                                                                                                        loc: {
                                                                                                                            start: {
                                                                                                                                line: 69,
                                                                                                                                column: 120,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            },
                                                                                                                            end: {
                                                                                                                                line: 69,
                                                                                                                                column: 124,
                                                                                                                                fixed: true,
                                                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                right: {
                                                                                                                    type: 'Literal',
                                                                                                                    value: '\') }, enumerable: true}) '
                                                                                                                }
                                                                                                            },
                                                                                                            kind: 'init',
                                                                                                            computed: true,
                                                                                                            order: '0'
                                                                                                        }]
                                                                                                },
                                                                                                alternate: null,
                                                                                                order: '1'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    alternate: null,
                                                                                    order: '0'
                                                                                }]
                                                                        },
                                                                        remove: null,
                                                                        order: '0'
                                                                    }]
                                                            }
                                                        }],
                                                    kind: 'let',
                                                    order: '3'
                                                },
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'indexModuleId',
                                                                loc: {
                                                                    start: {
                                                                        line: 71,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 71,
                                                                        column: 33,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
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
                                                                                name: 'np',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 71,
                                                                                        column: 36,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 71,
                                                                                        column: 38,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'join',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 71,
                                                                                        column: 39,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 71,
                                                                                        column: 43,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 71,
                                                                                    column: 36,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 71,
                                                                                    column: 43,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [
                                                                            {
                                                                                type: 'Identifier',
                                                                                name: 'moduleName',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 71,
                                                                                        column: 44,
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
                                                                            {
                                                                                type: 'Identifier',
                                                                                name: 'path',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 71,
                                                                                        column: 56,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 71,
                                                                                        column: 60,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            {
                                                                                type: 'Literal',
                                                                                value: 'index'
                                                                            }
                                                                        ],
                                                                        loc: {
                                                                            start: {
                                                                                line: 71,
                                                                                column: 36,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 71,
                                                                                column: 70,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'replace',
                                                                        loc: {
                                                                            start: {
                                                                                line: 71,
                                                                                column: 71,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 71,
                                                                                column: 78,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    loc: {
                                                                        start: {
                                                                            line: 71,
                                                                            column: 36,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 71,
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
                                                                        line: 71,
                                                                        column: 36,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 71,
                                                                        column: 90,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }
                                                        }],
                                                    kind: 'let',
                                                    order: '4'
                                                },
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'UnaryExpression',
                                                        operator: 'void',
                                                        argument: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'indexDirectory',
                                                                    loc: {
                                                                        start: {
                                                                            line: 72,
                                                                            column: 21,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 72,
                                                                            column: 35,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'write',
                                                                    loc: {
                                                                        start: {
                                                                            line: 72,
                                                                            column: 36,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 72,
                                                                            column: 41,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                loc: {
                                                                    start: {
                                                                        line: 72,
                                                                        column: 21,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 72,
                                                                        column: 41,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'indexName',
                                                                    loc: {
                                                                        start: {
                                                                            line: 72,
                                                                            column: 42,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 72,
                                                                            column: 51,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                                                            name: 'builder',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 72,
                                                                                    column: 53,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 72,
                                                                                    column: 60,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'addBrowserShim',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 72,
                                                                                    column: 61,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 72,
                                                                                    column: 75,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        loc: {
                                                                            start: {
                                                                                line: 72,
                                                                                column: 53,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 72,
                                                                                column: 75,
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
                                                                                                            name: 'key',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 72,
                                                                                                                    column: 87,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 72,
                                                                                                                    column: 90,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                                                                    line: 72,
                                                                                                                    column: 92,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 72,
                                                                                                                    column: 97,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                                                                name: 'lines',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 72,
                                                                                                        column: 101,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 72,
                                                                                                        column: 106,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            body: {
                                                                                                type: 'ExpressionStatement',
                                                                                                expression: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'value',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 72,
                                                                                                            column: 77,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 72,
                                                                                                            column: 82,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            order: '0'
                                                                                        }]
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'join',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 72,
                                                                                            column: 108,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 72,
                                                                                            column: 112,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 72,
                                                                                        column: 76,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 72,
                                                                                        column: 112,
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
                                                                                    line: 72,
                                                                                    column: 76,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 72,
                                                                                    column: 118,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'indexModuleId',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 72,
                                                                                    column: 120,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 72,
                                                                                    column: 133,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    loc: {
                                                                        start: {
                                                                            line: 72,
                                                                            column: 53,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 72,
                                                                            column: 134,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            loc: {
                                                                start: {
                                                                    line: 72,
                                                                    column: 21,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 72,
                                                                    column: 135,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 72,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 72,
                                                            column: 135,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    },
                                                    order: '5'
                                                }
                                            ]
                                        },
                                        alternate: null,
                                        order: '1'
                                    }
                                ]
                            },
                            alternate: null,
                            order: '0'
                        }]
                },
                remove: null,
                order: '7'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'rawFiles',
                            loc: {
                                start: {
                                    line: 76,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 76,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'output',
                                    loc: {
                                        start: {
                                            line: 76,
                                            column: 19,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 76,
                                            column: 25,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'search',
                                    loc: {
                                        start: {
                                            line: 76,
                                            column: 26,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 76,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 76,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 76,
                                        column: 32,
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
                                            name: 'concat',
                                            loc: {
                                                start: {
                                                    line: 76,
                                                    column: 63,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 76,
                                                    column: 69,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 76,
                                                column: 40,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 76,
                                                column: 69,
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
                                                    name: 'packageJson',
                                                    loc: {
                                                        start: {
                                                            line: 76,
                                                            column: 70,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 76,
                                                            column: 81,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'build',
                                                    loc: {
                                                        start: {
                                                            line: 76,
                                                            column: 82,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 76,
                                                            column: 87,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 76,
                                                        column: 70,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 76,
                                                        column: 87,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'exclude',
                                                loc: {
                                                    start: {
                                                        line: 76,
                                                        column: 88,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 76,
                                                        column: 95,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 76,
                                                    column: 70,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 76,
                                                    column: 95,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        }],
                                    loc: {
                                        start: {
                                            line: 76,
                                            column: 40,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 76,
                                            column: 96,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                }
                            ],
                            loc: {
                                start: {
                                    line: 76,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 76,
                                    column: 97,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: '8'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'outputFiles',
                            loc: {
                                start: {
                                    line: 77,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 77,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
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
                                                    name: 'key',
                                                    loc: {
                                                        start: {
                                                            line: 78,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 78,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                init: null
                                            },
                                            {
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'file',
                                                    loc: {
                                                        start: {
                                                            line: 78,
                                                            column: 17,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 78,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
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
                                        name: 'rawFiles',
                                        loc: {
                                            start: {
                                                line: 78,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 78,
                                                column: 33,
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
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'file',
                                                        loc: {
                                                            start: {
                                                                line: 79,
                                                                column: 15,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 79,
                                                                column: 19,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'exists',
                                                        loc: {
                                                            start: {
                                                                line: 79,
                                                                column: 20,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 79,
                                                                column: 26,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 79,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 79,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'key',
                                                                loc: {
                                                                    start: {
                                                                        line: 80,
                                                                        column: 17,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 80,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Identifier',
                                                                name: 'file',
                                                                loc: {
                                                                    start: {
                                                                        line: 80,
                                                                        column: 23,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 80,
                                                                        column: 27,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            kind: 'init',
                                                            computed: true,
                                                            order: '0'
                                                        }]
                                                },
                                                alternate: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'key',
                                                                loc: {
                                                                    start: {
                                                                        line: 82,
                                                                        column: 17,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 82,
                                                                        column: 20,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: null
                                                            },
                                                            kind: 'init',
                                                            computed: true,
                                                            order: '0'
                                                        }]
                                                },
                                                order: '0'
                                            }]
                                    },
                                    remove: null,
                                    order: '0'
                                }]
                        }
                    }],
                kind: 'let',
                order: '9'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'top',
                            loc: {
                                start: {
                                    line: 83,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 83,
                                    column: 11,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'key',
                                                    loc: {
                                                        start: {
                                                            line: 83,
                                                            column: 23,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 83,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                init: null
                                            }],
                                        kind: 'let'
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'outputFiles',
                                        loc: {
                                            start: {
                                                line: 83,
                                                column: 30,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 83,
                                                column: 41,
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
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'key',
                                                            loc: {
                                                                start: {
                                                                    line: 83,
                                                                    column: 45,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 83,
                                                                    column: 48,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'endsWith',
                                                            loc: {
                                                                start: {
                                                                    line: 83,
                                                                    column: 49,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 83,
                                                                    column: 57,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        loc: {
                                                            start: {
                                                                line: 83,
                                                                column: 45,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 83,
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
                                                            line: 83,
                                                            column: 45,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 83,
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
                                                                name: 'key',
                                                                loc: {
                                                                    start: {
                                                                        line: 83,
                                                                        column: 15,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 83,
                                                                        column: 18,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            order: '0'
                                                        }]
                                                },
                                                order: '0'
                                            }]
                                    },
                                    order: '0'
                                }]
                        }
                    }],
                kind: 'let',
                order: ':'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'sortedFiles',
                            loc: {
                                start: {
                                    line: 84,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 84,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'top',
                                    loc: {
                                        start: {
                                            line: 84,
                                            column: 22,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 84,
                                            column: 25,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'concat',
                                    loc: {
                                        start: {
                                            line: 84,
                                            column: 26,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 84,
                                            column: 32,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
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
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key',
                                                            loc: {
                                                                start: {
                                                                    line: 84,
                                                                    column: 42,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 84,
                                                                    column: 45,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'file',
                                                            loc: {
                                                                start: {
                                                                    line: 84,
                                                                    column: 47,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 84,
                                                                    column: 51,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                                name: 'outputFiles',
                                                loc: {
                                                    start: {
                                                        line: 84,
                                                        column: 55,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 84,
                                                        column: 66,
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
                                                            operator: '&&',
                                                            left: {
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
                                                                                name: 'builder',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 74,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 84,
                                                                                        column: 81,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'isPrivate',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 82,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 84,
                                                                                        column: 91,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 84,
                                                                                    column: 74,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 84,
                                                                                    column: 91,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Identifier',
                                                                                name: 'key',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 92,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 84,
                                                                                        column: 95,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            }],
                                                                        loc: {
                                                                            start: {
                                                                                line: 84,
                                                                                column: 74,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 84,
                                                                                column: 96,
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
                                                                                name: 'top',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 101,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 84,
                                                                                        column: 104,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'indexOf',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 105,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    },
                                                                                    end: {
                                                                                        line: 84,
                                                                                        column: 112,
                                                                                        fixed: true,
                                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                                    }
                                                                                }
                                                                            },
                                                                            loc: {
                                                                                start: {
                                                                                    line: 84,
                                                                                    column: 101,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 84,
                                                                                    column: 112,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Identifier',
                                                                                name: 'key',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 84,
                                                                                        column: 113,
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
                                                                            }],
                                                                        loc: {
                                                                            start: {
                                                                                line: 84,
                                                                                column: 101,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 84,
                                                                                column: 117,
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
                                                            right: {
                                                                type: 'UnaryExpression',
                                                                operator: '?',
                                                                argument: {
                                                                    type: 'Identifier',
                                                                    name: 'file',
                                                                    loc: {
                                                                        start: {
                                                                            line: 84,
                                                                            column: 126,
                                                                            fixed: true,
                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 84,
                                                                            column: 130,
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
                                                                    type: 'ExpressionStatement',
                                                                    expression: {
                                                                        type: 'Identifier',
                                                                        name: 'key',
                                                                        loc: {
                                                                            start: {
                                                                                line: 84,
                                                                                column: 34,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 84,
                                                                                column: 37,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    order: '0'
                                                                }]
                                                        },
                                                        order: '0'
                                                    }]
                                            },
                                            order: '0'
                                        }]
                                }],
                            loc: {
                                start: {
                                    line: 84,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 84,
                                    column: 133,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: ';'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'manifestFileName',
                            loc: {
                                start: {
                                    line: 85,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 85,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: 'manifest.json'
                        }
                    }],
                kind: 'let',
                order: '<'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'manifestFile',
                            loc: {
                                start: {
                                    line: 86,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 86,
                                    column: 20,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        init: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'output',
                                    loc: {
                                        start: {
                                            line: 86,
                                            column: 23,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 86,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'getFile',
                                    loc: {
                                        start: {
                                            line: 86,
                                            column: 30,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 86,
                                            column: 37,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 86,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 86,
                                        column: 37,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'manifestFileName',
                                    loc: {
                                        start: {
                                            line: 86,
                                            column: 38,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 86,
                                            column: 54,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                }],
                            loc: {
                                start: {
                                    line: 86,
                                    column: 23,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 86,
                                    column: 55,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    }],
                kind: 'let',
                order: '='
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'manifest',
                            loc: {
                                start: {
                                    line: 87,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 87,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                        name: 'modified',
                                        loc: {
                                            start: {
                                                line: 88,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 88,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
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
                                                    name: 'Math',
                                                    loc: {
                                                        start: {
                                                            line: 88,
                                                            column: 18,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 88,
                                                            column: 22,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'max',
                                                    loc: {
                                                        start: {
                                                            line: 88,
                                                            column: 23,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 88,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 88,
                                                        column: 18,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 88,
                                                        column: 26,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                loc: {
                                                    start: {
                                                        line: 88,
                                                        column: 27,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 88,
                                                        column: 32,
                                                        fixed: true,
                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 88,
                                                    column: 18,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 88,
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
                                                                        name: 'path',
                                                                        loc: {
                                                                            start: {
                                                                                line: 88,
                                                                                column: 58,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 88,
                                                                                column: 62,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            }
                                                                        }
                                                                    },
                                                                    init: null
                                                                },
                                                                {
                                                                    type: 'VariableDeclarator',
                                                                    id: {
                                                                        type: 'Identifier',
                                                                        name: 'file',
                                                                        loc: {
                                                                            start: {
                                                                                line: 88,
                                                                                column: 64,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 88,
                                                                                column: 68,
                                                                                fixed: true,
                                                                                source: 'ion/builder/ModuleBuilder.ion'
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
                                                            name: 'outputFiles',
                                                            loc: {
                                                                start: {
                                                                    line: 88,
                                                                    column: 72,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 88,
                                                                    column: 83,
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
                                                                        operator: '?',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'file',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 88,
                                                                                    column: 87,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 88,
                                                                                    column: 91,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    consequent: {
                                                                        type: 'BlockStatement',
                                                                        body: [{
                                                                                type: 'ExpressionStatement',
                                                                                expression: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'Identifier',
                                                                                        name: 'file',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 88,
                                                                                                column: 40,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 88,
                                                                                                column: 44,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'modified',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 88,
                                                                                                column: 45,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 88,
                                                                                                column: 53,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 88,
                                                                                            column: 40,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 88,
                                                                                            column: 53,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                order: '0'
                                                                            }]
                                                                    },
                                                                    order: '0'
                                                                }]
                                                        },
                                                        order: '0'
                                                    }]
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 88,
                                                column: 18,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 88,
                                                column: 94,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    order: '0'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'files',
                                        loc: {
                                            start: {
                                                line: 89,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 89,
                                                column: 13,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
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
                                                                name: 'path',
                                                                loc: {
                                                                    start: {
                                                                        line: 89,
                                                                        column: 48,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 89,
                                                                        column: 52,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            init: null
                                                        }],
                                                    kind: 'let'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'sortedFiles',
                                                    loc: {
                                                        start: {
                                                            line: 89,
                                                            column: 56,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 89,
                                                            column: 67,
                                                            fixed: true,
                                                            source: 'ion/builder/ModuleBuilder.ion'
                                                        }
                                                    }
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
                                                                name: 'builder',
                                                                loc: {
                                                                    start: {
                                                                        line: 89,
                                                                        column: 16,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 89,
                                                                        column: 23,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'normalizePath',
                                                                loc: {
                                                                    start: {
                                                                        line: 89,
                                                                        column: 24,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 89,
                                                                        column: 37,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            loc: {
                                                                start: {
                                                                    line: 89,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 89,
                                                                    column: 37,
                                                                    fixed: true,
                                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'path',
                                                                loc: {
                                                                    start: {
                                                                        line: 89,
                                                                        column: 38,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 89,
                                                                        column: 42,
                                                                        fixed: true,
                                                                        source: 'ion/builder/ModuleBuilder.ion'
                                                                    }
                                                                }
                                                            }],
                                                        loc: {
                                                            start: {
                                                                line: 89,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 89,
                                                                column: 43,
                                                                fixed: true,
                                                                source: 'ion/builder/ModuleBuilder.ion'
                                                            }
                                                        }
                                                    }
                                                },
                                                order: '0'
                                            }]
                                    },
                                    kind: 'init',
                                    order: '1'
                                }
                            ]
                        }
                    }],
                kind: 'let',
                order: '>'
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
                            name: 'output',
                            loc: {
                                start: {
                                    line: 90,
                                    column: 4,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 90,
                                    column: 10,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'write',
                            loc: {
                                start: {
                                    line: 90,
                                    column: 11,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 90,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 90,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 90,
                                column: 16,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'manifestFileName',
                            loc: {
                                start: {
                                    line: 90,
                                    column: 17,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 90,
                                    column: 33,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
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
                                    name: 'JSON',
                                    loc: {
                                        start: {
                                            line: 90,
                                            column: 35,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 90,
                                            column: 39,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'stringify',
                                    loc: {
                                        start: {
                                            line: 90,
                                            column: 40,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 90,
                                            column: 49,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 90,
                                        column: 35,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 90,
                                        column: 49,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'manifest',
                                    loc: {
                                        start: {
                                            line: 90,
                                            column: 50,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 90,
                                            column: 58,
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
                                    value: '  '
                                },
                                {
                                    type: 'Identifier',
                                    name: 'sortedFiles',
                                    loc: {
                                        start: {
                                            line: 90,
                                            column: 72,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 90,
                                            column: 83,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                }
                            ],
                            loc: {
                                start: {
                                    line: 90,
                                    column: 35,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 90,
                                    column: 84,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 90,
                            column: 4,
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
                loc: {
                    start: {
                        line: 90,
                        column: 4,
                        fixed: true,
                        source: 'ion/builder/ModuleBuilder.ion'
                    },
                    end: {
                        line: 90,
                        column: 85,
                        fixed: true,
                        source: 'ion/builder/ModuleBuilder.ion'
                    }
                },
                order: '?'
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
                                name: 'packageJson',
                                loc: {
                                    start: {
                                        line: 93,
                                        column: 7,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 93,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'build',
                                loc: {
                                    start: {
                                        line: 93,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 93,
                                        column: 24,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 93,
                                    column: 7,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 93,
                                    column: 24,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'test',
                            loc: {
                                start: {
                                    line: 93,
                                    column: 25,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 93,
                                    column: 29,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 93,
                                column: 7,
                                fixed: true,
                                source: 'ion/builder/ModuleBuilder.ion'
                            },
                            end: {
                                line: 93,
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
                                        name: 'builder',
                                        loc: {
                                            start: {
                                                line: 94,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 94,
                                                column: 15,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'runTests',
                                        loc: {
                                            start: {
                                                line: 94,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 94,
                                                column: 24,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 94,
                                            column: 8,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        },
                                        end: {
                                            line: 94,
                                            column: 24,
                                            fixed: true,
                                            source: 'ion/builder/ModuleBuilder.ion'
                                        }
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Identifier',
                                        name: 'manifestFile',
                                        loc: {
                                            start: {
                                                line: 94,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 94,
                                                column: 37,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    },
                                    {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'manifestFile',
                                            loc: {
                                                start: {
                                                    line: 94,
                                                    column: 39,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 94,
                                                    column: 51,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'modified',
                                            loc: {
                                                start: {
                                                    line: 94,
                                                    column: 52,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                },
                                                end: {
                                                    line: 94,
                                                    column: 60,
                                                    fixed: true,
                                                    source: 'ion/builder/ModuleBuilder.ion'
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 94,
                                                column: 39,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            },
                                            end: {
                                                line: 94,
                                                column: 60,
                                                fixed: true,
                                                source: 'ion/builder/ModuleBuilder.ion'
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 94,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    },
                                    end: {
                                        line: 94,
                                        column: 61,
                                        fixed: true,
                                        source: 'ion/builder/ModuleBuilder.ion'
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 94,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                },
                                end: {
                                    line: 94,
                                    column: 61,
                                    fixed: true,
                                    source: 'ion/builder/ModuleBuilder.ion'
                                }
                            },
                            order: '0'
                        }]
                },
                alternate: null,
                order: '@'
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