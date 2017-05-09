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
                            name: 'packageJson',
                            loc: {
                                start: {
                                    line: 14,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 14,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                    name: 'JSON',
                                    loc: {
                                        start: {
                                            line: 14,
                                            column: 22,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 14,
                                            column: 26,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'parse',
                                    loc: {
                                        start: {
                                            line: 14,
                                            column: 27,
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
                                                name: 'File',
                                                loc: {
                                                    start: {
                                                        line: 14,
                                                        column: 37,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 14,
                                                        column: 41,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Literal',
                                                    value: 'package.json'
                                                }],
                                            loc: {
                                                start: {
                                                    line: 14,
                                                    column: 33,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 14,
                                                    column: 57,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'read',
                                            loc: {
                                                start: {
                                                    line: 14,
                                                    column: 58,
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
                            name: 'input',
                            loc: {
                                start: {
                                    line: 15,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 15,
                                    column: 13,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 15,
                                        column: 20,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 15,
                                        column: 29,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            line: 15,
                                                            column: 30,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 15,
                                                            column: 41,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories',
                                                    loc: {
                                                        start: {
                                                            line: 15,
                                                            column: 42,
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
                                                name: 'src',
                                                loc: {
                                                    start: {
                                                        line: 15,
                                                        column: 54,
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
                                                name: 'packageJson',
                                                loc: {
                                                    start: {
                                                        line: 15,
                                                        column: 30,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 15,
                                                        column: 41,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories',
                                                loc: {
                                                    start: {
                                                        line: 15,
                                                        column: 42,
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
                                            name: 'src',
                                            loc: {
                                                start: {
                                                    line: 15,
                                                    column: 54,
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
                                }],
                            loc: {
                                start: {
                                    line: 15,
                                    column: 16,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 15,
                                    column: 66,
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
                            name: 'output',
                            loc: {
                                start: {
                                    line: 16,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 16,
                                    column: 14,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 16,
                                        column: 21,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 16,
                                        column: 30,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            line: 16,
                                                            column: 31,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 16,
                                                            column: 42,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'directories',
                                                    loc: {
                                                        start: {
                                                            line: 16,
                                                            column: 43,
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
                                                name: 'www',
                                                loc: {
                                                    start: {
                                                        line: 16,
                                                        column: 55,
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
                                                name: 'packageJson',
                                                loc: {
                                                    start: {
                                                        line: 16,
                                                        column: 31,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 16,
                                                        column: 42,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'directories',
                                                loc: {
                                                    start: {
                                                        line: 16,
                                                        column: 43,
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
                                            name: 'www',
                                            loc: {
                                                start: {
                                                    line: 16,
                                                    column: 55,
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
                                }],
                            loc: {
                                start: {
                                    line: 16,
                                    column: 17,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 16,
                                    column: 69,
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
                            name: 'clientOutput',
                            loc: {
                                start: {
                                    line: 17,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 17,
                                    column: 20,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                            line: 17,
                                            column: 23,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 17,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'getDirectory',
                                    loc: {
                                        start: {
                                            line: 17,
                                            column: 30,
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
                                    name: 'clientJsDir',
                                    loc: {
                                        start: {
                                            line: 17,
                                            column: 43,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 17,
                                            column: 54,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
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
                            name: 'serverOutput',
                            loc: {
                                start: {
                                    line: 18,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 18,
                                    column: 20,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                            line: 18,
                                            column: 23,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 18,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'getDirectory',
                                    loc: {
                                        start: {
                                            line: 18,
                                            column: 30,
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
                                    name: 'serverJsDir',
                                    loc: {
                                        start: {
                                            line: 18,
                                            column: 43,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 18,
                                            column: 54,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
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
                            name: 'nodepaths',
                            loc: {
                                start: {
                                    line: 19,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 19,
                                    column: 17,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                kind: 'const',
                order: '0'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'glassPages',
                            loc: {
                                start: {
                                    line: 23,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 23,
                                    column: 18,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 23,
                                        column: 25,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 23,
                                        column: 34,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Literal',
                                    value: '../glass-pages/dist'
                                }],
                            loc: {
                                start: {
                                    line: 23,
                                    column: 21,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 23,
                                    column: 57,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                        name: 'glassPages',
                        loc: {
                            start: {
                                line: 24,
                                column: 7,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 24,
                                column: 17,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'exists',
                        loc: {
                            start: {
                                line: 24,
                                column: 18,
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
                                        name: 'javaDirectory',
                                        loc: {
                                            start: {
                                                line: 25,
                                                column: 12,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 25,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
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
                                                name: 'input',
                                                loc: {
                                                    start: {
                                                        line: 25,
                                                        column: 28,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 25,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'getDirectory',
                                                loc: {
                                                    start: {
                                                        line: 25,
                                                        column: 34,
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
                                                name: 'serverJavaDir',
                                                loc: {
                                                    start: {
                                                        line: 25,
                                                        column: 47,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 25,
                                                        column: 60,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
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
                            kind: 'let',
                            order: '0'
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
                                            name: 'key',
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 12,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 15,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                                    line: 26,
                                                    column: 17,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 23,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                        name: 'glassPages',
                                        loc: {
                                            start: {
                                                line: 26,
                                                column: 27,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 26,
                                                column: 37,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'search',
                                        loc: {
                                            start: {
                                                line: 26,
                                                column: 38,
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
                                                    name: 'target',
                                                    loc: {
                                                        start: {
                                                            line: 27,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 27,
                                                            column: 22,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            name: 'javaDirectory',
                                                            loc: {
                                                                start: {
                                                                    line: 27,
                                                                    column: 25,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 27,
                                                                    column: 38,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'getFile',
                                                            loc: {
                                                                start: {
                                                                    line: 27,
                                                                    column: 39,
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
                                                            name: 'key',
                                                            loc: {
                                                                start: {
                                                                    line: 27,
                                                                    column: 47,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 27,
                                                                    column: 50,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
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
                                        kind: 'let',
                                        order: '0'
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
                                                    name: 'target',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 28,
                                                            column: 21,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'modified',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 22,
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
                                                    name: 'source',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 33,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 28,
                                                            column: 39,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'modified',
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 40,
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
                                                                name: 'target',
                                                                loc: {
                                                                    start: {
                                                                        line: 29,
                                                                        column: 16,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 29,
                                                                        column: 22,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'copyFrom',
                                                                loc: {
                                                                    start: {
                                                                        line: 29,
                                                                        column: 23,
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
                                                                name: 'source',
                                                                loc: {
                                                                    start: {
                                                                        line: 29,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 29,
                                                                        column: 38,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
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
                                                            column: 39,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    },
                                                    order: '0'
                                                }]
                                        },
                                        alternate: null,
                                        order: '1'
                                    }
                                ]
                            },
                            remove: null,
                            order: '1'
                        }
                    ]
                },
                alternate: null,
                order: '2'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'copyModules',
                            loc: {
                                start: {
                                    line: 31,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 31,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                                                                name: 'moduleName',
                                                                loc: {
                                                                    start: {
                                                                        line: 32,
                                                                        column: 12,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 32,
                                                                        column: 22,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            init: null
                                                        }],
                                                    kind: 'let'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'modules',
                                                    loc: {
                                                        start: {
                                                            line: 32,
                                                            column: 26,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 32,
                                                            column: 33,
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
                                                                            name: 'nodepath',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 33,
                                                                                    column: 16,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 33,
                                                                                    column: 24,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        init: null
                                                                    }],
                                                                kind: 'let'
                                                            },
                                                            right: {
                                                                type: 'Identifier',
                                                                name: 'nodepaths',
                                                                loc: {
                                                                    start: {
                                                                        line: 33,
                                                                        column: 28,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 33,
                                                                        column: 37,
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
                                                                                    name: 'directory',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 34,
                                                                                            column: 20,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 34,
                                                                                            column: 29,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                                                line: 34,
                                                                                                column: 36,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 34,
                                                                                                column: 45,
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
                                                                                                    name: 'np',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 34,
                                                                                                            column: 46,
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
                                                                                                },
                                                                                                property: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'join',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 34,
                                                                                                            column: 49,
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
                                                                                                    name: 'nodepath',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 34,
                                                                                                            column: 54,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 34,
                                                                                                            column: 62,
                                                                                                            fixed: true,
                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    type: 'BinaryExpression',
                                                                                                    operator: '+',
                                                                                                    left: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'moduleName',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 34,
                                                                                                                column: 64,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 34,
                                                                                                                column: 74,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            }
                                                                                                        }
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
                                                                                        }],
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 34,
                                                                                            column: 32,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 34,
                                                                                            column: 85,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }],
                                                                        kind: 'let',
                                                                        order: '0'
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
                                                                                        name: 'key',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 35,
                                                                                                column: 20,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 35,
                                                                                                column: 23,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                                                line: 35,
                                                                                                column: 25,
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
                                                                                    name: 'directory',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 35,
                                                                                            column: 35,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        },
                                                                                        end: {
                                                                                            line: 35,
                                                                                            column: 44,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    }
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'search',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 35,
                                                                                            column: 45,
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
                                                                                            name: 'concat',
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 35,
                                                                                                    column: 79,
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
                                                                                                        name: 'packageJson',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 35,
                                                                                                                column: 86,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 35,
                                                                                                                column: 97,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'build',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 35,
                                                                                                                column: 98,
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
                                                                                                    name: 'client',
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 35,
                                                                                                            column: 104,
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
                                                                                                name: 'exclude',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 35,
                                                                                                        column: 111,
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
                                                                                                name: 'target',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 36,
                                                                                                        column: 24,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 36,
                                                                                                        column: 30,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                                                        name: 'outputDirectory',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 36,
                                                                                                                column: 33,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 36,
                                                                                                                column: 48,
                                                                                                                fixed: true,
                                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'getFile',
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 36,
                                                                                                                column: 49,
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
                                                                                                                    name: 'source',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 36,
                                                                                                                            column: 57,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 36,
                                                                                                                            column: 63,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                property: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'path',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 36,
                                                                                                                            column: 64,
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
                                                                                                                name: 'substring',
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 36,
                                                                                                                        column: 69,
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
                                                                                                                    name: 'nodepath',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 36,
                                                                                                                            column: 79,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                        },
                                                                                                                        end: {
                                                                                                                            line: 36,
                                                                                                                            column: 87,
                                                                                                                            fixed: true,
                                                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                property: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'length',
                                                                                                                    loc: {
                                                                                                                        start: {
                                                                                                                            line: 36,
                                                                                                                            column: 88,
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
                                                                                    kind: 'let',
                                                                                    order: '0'
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
                                                                                                name: 'target',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 37,
                                                                                                        column: 23,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 37,
                                                                                                        column: 29,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'modified',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 37,
                                                                                                        column: 30,
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
                                                                                                name: 'source',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 37,
                                                                                                        column: 41,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 37,
                                                                                                        column: 47,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'modified',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 37,
                                                                                                        column: 48,
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
                                                                                                            name: 'target',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 38,
                                                                                                                    column: 24,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 38,
                                                                                                                    column: 30,
                                                                                                                    fixed: true,
                                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        property: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'copyFrom',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 38,
                                                                                                                    column: 31,
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
                                                                                                            name: 'source',
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 38,
                                                                                                                    column: 40,
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
                                                                                                        column: 47,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                },
                                                                                                order: '0'
                                                                                            }]
                                                                                    },
                                                                                    alternate: null,
                                                                                    order: '1'
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
                                                                                                name: 'target',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 40,
                                                                                                        column: 20,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 40,
                                                                                                        column: 26,
                                                                                                        fixed: true,
                                                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'delete',
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 40,
                                                                                                        column: 27,
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
                                                                                            column: 35,
                                                                                            fixed: true,
                                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                                        }
                                                                                    },
                                                                                    order: '0'
                                                                                }]
                                                                        },
                                                                        order: '1'
                                                                    }
                                                                ]
                                                            },
                                                            remove: null,
                                                            order: '0'
                                                        }]
                                                },
                                                remove: null,
                                                order: '0'
                                            }],
                                        bound: false,
                                        name: {
                                            type: 'Identifier',
                                            name: 'copyModules',
                                            loc: {
                                                start: {
                                                    line: 31,
                                                    column: 8,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 31,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
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
                kind: 'let',
                order: '3'
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'copyModules',
                        loc: {
                            start: {
                                line: 42,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 42,
                                column: 15,
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
                                                line: 42,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 42,
                                                column: 27,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'build',
                                        loc: {
                                            start: {
                                                line: 42,
                                                column: 28,
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
                                    name: 'client',
                                    loc: {
                                        start: {
                                            line: 42,
                                            column: 34,
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
                                name: 'modules',
                                loc: {
                                    start: {
                                        line: 42,
                                        column: 41,
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
                            name: 'clientOutput',
                            loc: {
                                start: {
                                    line: 42,
                                    column: 50,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 42,
                                    column: 62,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                },
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
                },
                order: '4'
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'copyModules',
                        loc: {
                            start: {
                                line: 43,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 43,
                                column: 15,
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
                                                line: 43,
                                                column: 16,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 43,
                                                column: 27,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'build',
                                        loc: {
                                            start: {
                                                line: 43,
                                                column: 28,
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
                                    name: 'server',
                                    loc: {
                                        start: {
                                            line: 43,
                                            column: 34,
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
                                name: 'modules',
                                loc: {
                                    start: {
                                        line: 43,
                                        column: 41,
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
                            name: 'serverOutput',
                            loc: {
                                start: {
                                    line: 43,
                                    column: 50,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 43,
                                    column: 62,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
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
                },
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
                },
                order: '5'
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'ModuleBuilder',
                        loc: {
                            start: {
                                line: 46,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 46,
                                column: 17,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    arguments: [{
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'directories',
                                        loc: {
                                            start: {
                                                line: 47,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 47,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'src',
                                                    loc: {
                                                        start: {
                                                            line: 48,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 48,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'input',
                                                        loc: {
                                                            start: {
                                                                line: 48,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 48,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: '/js'
                                                    }
                                                },
                                                kind: 'init',
                                                order: '0'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'lib',
                                                    loc: {
                                                        start: {
                                                            line: 49,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 49,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            type: 'Identifier',
                                                            name: 'output',
                                                            loc: {
                                                                start: {
                                                                    line: 49,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 49,
                                                                    column: 22,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: '/'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'clientJsDir',
                                                        loc: {
                                                            start: {
                                                                line: 49,
                                                                column: 31,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 49,
                                                                column: 42,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                order: '1'
                                            }
                                        ]
                                    },
                                    kind: 'init',
                                    order: '0'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'build',
                                        loc: {
                                            start: {
                                                line: 50,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 50,
                                                column: 13,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'exclude',
                                                    loc: {
                                                        start: {
                                                            line: 51,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 51,
                                                            column: 19,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
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
                                                                name: 'packageJson',
                                                                loc: {
                                                                    start: {
                                                                        line: 51,
                                                                        column: 21,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 51,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'build',
                                                                loc: {
                                                                    start: {
                                                                        line: 51,
                                                                        column: 33,
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
                                                            name: 'client',
                                                            loc: {
                                                                start: {
                                                                    line: 51,
                                                                    column: 39,
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
                                                        name: 'exclude',
                                                        loc: {
                                                            start: {
                                                                line: 51,
                                                                column: 46,
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
                                                kind: 'init',
                                                order: '0'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'test',
                                                    loc: {
                                                        start: {
                                                            line: 52,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 52,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: false
                                                },
                                                kind: 'init',
                                                order: '1'
                                            }
                                        ]
                                    },
                                    kind: 'init',
                                    order: '1'
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
                },
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
                },
                order: '6'
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'ModuleBuilder',
                        loc: {
                            start: {
                                line: 56,
                                column: 4,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            },
                            end: {
                                line: 56,
                                column: 17,
                                fixed: true,
                                source: 'ion/builder/WebsiteBuilder.ion'
                            }
                        }
                    },
                    arguments: [{
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'directories',
                                        loc: {
                                            start: {
                                                line: 57,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 57,
                                                column: 19,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'src',
                                                    loc: {
                                                        start: {
                                                            line: 58,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 58,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'input',
                                                        loc: {
                                                            start: {
                                                                line: 58,
                                                                column: 16,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 58,
                                                                column: 21,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: '/js'
                                                    }
                                                },
                                                kind: 'init',
                                                order: '0'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'lib',
                                                    loc: {
                                                        start: {
                                                            line: 59,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 59,
                                                            column: 15,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            type: 'Identifier',
                                                            name: 'output',
                                                            loc: {
                                                                start: {
                                                                    line: 59,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 59,
                                                                    column: 22,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: '/'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'serverJsDir',
                                                        loc: {
                                                            start: {
                                                                line: 59,
                                                                column: 31,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 59,
                                                                column: 42,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                order: '1'
                                            }
                                        ]
                                    },
                                    kind: 'init',
                                    order: '0'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'build',
                                        loc: {
                                            start: {
                                                line: 60,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 60,
                                                column: 13,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'exclude',
                                                    loc: {
                                                        start: {
                                                            line: 61,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 61,
                                                            column: 19,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
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
                                                                name: 'packageJson',
                                                                loc: {
                                                                    start: {
                                                                        line: 61,
                                                                        column: 21,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 61,
                                                                        column: 32,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'build',
                                                                loc: {
                                                                    start: {
                                                                        line: 61,
                                                                        column: 33,
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
                                                            name: 'server',
                                                            loc: {
                                                                start: {
                                                                    line: 61,
                                                                    column: 39,
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
                                                        name: 'exclude',
                                                        loc: {
                                                            start: {
                                                                line: 61,
                                                                column: 46,
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
                                                kind: 'init',
                                                order: '0'
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'test',
                                                    loc: {
                                                        start: {
                                                            line: 62,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 62,
                                                            column: 16,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: true
                                                },
                                                kind: 'init',
                                                order: '1'
                                            }
                                        ]
                                    },
                                    kind: 'init',
                                    order: '1'
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
                },
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
                },
                order: '7'
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
                                        line: 66,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 66,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 66,
                                        column: 14,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 66,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                    line: 66,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 66,
                                    column: 27,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'search',
                            loc: {
                                start: {
                                    line: 66,
                                    column: 28,
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
                                    name: 'file',
                                    loc: {
                                        start: {
                                            line: 67,
                                            column: 11,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 67,
                                            column: 15,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'isFile',
                                    loc: {
                                        start: {
                                            line: 67,
                                            column: 16,
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
                                                    name: 'output',
                                                    loc: {
                                                        start: {
                                                            line: 68,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 68,
                                                            column: 18,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'write',
                                                    loc: {
                                                        start: {
                                                            line: 68,
                                                            column: 19,
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
                                                    name: 'path',
                                                    loc: {
                                                        start: {
                                                            line: 68,
                                                            column: 25,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 68,
                                                            column: 29,
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
                                                            name: 'file',
                                                            loc: {
                                                                start: {
                                                                    line: 68,
                                                                    column: 31,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 68,
                                                                    column: 35,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                }
                                                            }
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'read',
                                                            loc: {
                                                                start: {
                                                                    line: 68,
                                                                    column: 36,
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
                                                column: 53,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        },
                                        order: '0'
                                    }]
                            },
                            alternate: null,
                            order: '0'
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
                                        name: 'output',
                                        loc: {
                                            start: {
                                                line: 70,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 70,
                                                column: 14,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'delete',
                                        loc: {
                                            start: {
                                                line: 70,
                                                column: 15,
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
                                        name: 'path',
                                        loc: {
                                            start: {
                                                line: 70,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 70,
                                                column: 26,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    column: 27,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            },
                            order: '0'
                        }]
                },
                order: '8'
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
                                        line: 73,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 73,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 73,
                                        column: 14,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 73,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                    line: 73,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 73,
                                    column: 27,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'search',
                            loc: {
                                start: {
                                    line: 73,
                                    column: 28,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 74,
                                                column: 12,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 74,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
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
                                                        line: 74,
                                                        column: 25,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 74,
                                                        column: 32,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'changeExtension',
                                                loc: {
                                                    start: {
                                                        line: 74,
                                                        column: 33,
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
                                                name: 'path',
                                                loc: {
                                                    start: {
                                                        line: 74,
                                                        column: 49,
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
                            kind: 'let',
                            order: '0'
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
                                                line: 75,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 75,
                                                column: 14,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'write',
                                        loc: {
                                            start: {
                                                line: 75,
                                                column: 15,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 75,
                                                column: 21,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 75,
                                                column: 31,
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
                                                name: 'builder',
                                                loc: {
                                                    start: {
                                                        line: 75,
                                                        column: 33,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 75,
                                                        column: 40,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'compileIon',
                                                loc: {
                                                    start: {
                                                        line: 75,
                                                        column: 41,
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
                                                name: 'file',
                                                loc: {
                                                    start: {
                                                        line: 75,
                                                        column: 52,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 75,
                                                        column: 56,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
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
                                    column: 58,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            },
                            order: '1'
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
                                        name: 'output',
                                        loc: {
                                            start: {
                                                line: 77,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 77,
                                                column: 14,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'delete',
                                        loc: {
                                            start: {
                                                line: 77,
                                                column: 15,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 77,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 77,
                                                column: 32,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    column: 33,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            },
                            order: '0'
                        }]
                },
                order: '9'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'pageOutput',
                            loc: {
                                start: {
                                    line: 80,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 80,
                                    column: 18,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                            line: 80,
                                            column: 21,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        },
                                        end: {
                                            line: 80,
                                            column: 27,
                                            fixed: true,
                                            source: 'ion/builder/WebsiteBuilder.ion'
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'getDirectory',
                                    loc: {
                                        start: {
                                            line: 80,
                                            column: 28,
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
                kind: 'let',
                order: ':'
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
                                        line: 81,
                                        column: 8,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 81,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                        line: 81,
                                        column: 14,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
                                    },
                                    end: {
                                        line: 81,
                                        column: 18,
                                        fixed: true,
                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                                    line: 81,
                                    column: 22,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 81,
                                    column: 27,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'search',
                            loc: {
                                start: {
                                    line: 81,
                                    column: 28,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 82,
                                                column: 12,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 82,
                                                column: 22,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
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
                                                        line: 82,
                                                        column: 25,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 82,
                                                        column: 32,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'changeExtension',
                                                loc: {
                                                    start: {
                                                        line: 82,
                                                        column: 33,
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
                                                name: 'path',
                                                loc: {
                                                    start: {
                                                        line: 82,
                                                        column: 49,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 82,
                                                        column: 53,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                            kind: 'let',
                            order: '0'
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
                                        name: 'pageOutput',
                                        loc: {
                                            start: {
                                                line: 83,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 83,
                                                column: 18,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'write',
                                        loc: {
                                            start: {
                                                line: 83,
                                                column: 19,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 83,
                                                column: 25,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 83,
                                                column: 35,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                                                name: 'path',
                                                                loc: {
                                                                    start: {
                                                                        line: 83,
                                                                        column: 50,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 83,
                                                                        column: 54,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'replace',
                                                                loc: {
                                                                    start: {
                                                                        line: 83,
                                                                        column: 55,
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
                                                        name: 'builder',
                                                        loc: {
                                                            start: {
                                                                line: 83,
                                                                column: 88,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 83,
                                                                column: 95,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'compileIon',
                                                        loc: {
                                                            start: {
                                                                line: 83,
                                                                column: 96,
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
                                                        name: 'file',
                                                        loc: {
                                                            start: {
                                                                line: 83,
                                                                column: 107,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 83,
                                                                column: 111,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
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
                                    column: 119,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            },
                            order: '1'
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
                                        name: 'pageOutput',
                                        loc: {
                                            start: {
                                                line: 85,
                                                column: 8,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 85,
                                                column: 18,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'delete',
                                        loc: {
                                            start: {
                                                line: 85,
                                                column: 19,
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
                                        name: 'targetPath',
                                        loc: {
                                            start: {
                                                line: 85,
                                                column: 26,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 85,
                                                column: 36,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            }
                                        }
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
                                    column: 37,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            },
                            order: '0'
                        }]
                },
                order: ';'
            },
            {
                type: 'VariableDeclaration',
                declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'files',
                            loc: {
                                start: {
                                    line: 88,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 88,
                                    column: 13,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                    type: 'ForOfStatement',
                                    left: {
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'manifestFilename',
                                                    loc: {
                                                        start: {
                                                            line: 89,
                                                            column: 12,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 89,
                                                            column: 28,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        }
                                                    }
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
                                                name: 'packageJson',
                                                loc: {
                                                    start: {
                                                        line: 89,
                                                        column: 32,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    },
                                                    end: {
                                                        line: 89,
                                                        column: 43,
                                                        fixed: true,
                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'build',
                                                loc: {
                                                    start: {
                                                        line: 89,
                                                        column: 44,
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
                                            name: 'manifests',
                                            loc: {
                                                start: {
                                                    line: 89,
                                                    column: 50,
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
                                                            name: 'manifestFile',
                                                            loc: {
                                                                start: {
                                                                    line: 90,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 90,
                                                                    column: 28,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                    name: 'clientOutput',
                                                                    loc: {
                                                                        start: {
                                                                            line: 90,
                                                                            column: 31,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 90,
                                                                            column: 43,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'getFile',
                                                                    loc: {
                                                                        start: {
                                                                            line: 90,
                                                                            column: 44,
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
                                                                    name: 'manifestFilename',
                                                                    loc: {
                                                                        start: {
                                                                            line: 90,
                                                                            column: 52,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 90,
                                                                            column: 68,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
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
                                                kind: 'let',
                                                order: '0'
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
                                                                    line: 91,
                                                                    column: 16,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                },
                                                                end: {
                                                                    line: 91,
                                                                    column: 24,
                                                                    fixed: true,
                                                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                    name: 'JSON',
                                                                    loc: {
                                                                        start: {
                                                                            line: 91,
                                                                            column: 27,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        },
                                                                        end: {
                                                                            line: 91,
                                                                            column: 31,
                                                                            fixed: true,
                                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                                        }
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'parse',
                                                                    loc: {
                                                                        start: {
                                                                            line: 91,
                                                                            column: 32,
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
                                                                            name: 'manifestFile',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 91,
                                                                                    column: 38,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                },
                                                                                end: {
                                                                                    line: 91,
                                                                                    column: 50,
                                                                                    fixed: true,
                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                }
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'read',
                                                                            loc: {
                                                                                start: {
                                                                                    line: 91,
                                                                                    column: 51,
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
                                                kind: 'let',
                                                order: '1'
                                            },
                                            {
                                                type: 'ForOfStatement',
                                                left: {
                                                    type: 'VariableDeclaration',
                                                    declarations: [{
                                                            type: 'VariableDeclarator',
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'jsfile',
                                                                loc: {
                                                                    start: {
                                                                        line: 92,
                                                                        column: 16,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 92,
                                                                        column: 22,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
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
                                                        name: 'manifest',
                                                        loc: {
                                                            start: {
                                                                line: 92,
                                                                column: 26,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            },
                                                            end: {
                                                                line: 92,
                                                                column: 34,
                                                                fixed: true,
                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                            }
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'files',
                                                        loc: {
                                                            start: {
                                                                line: 92,
                                                                column: 35,
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
                                                                        name: 'jspath',
                                                                        loc: {
                                                                            start: {
                                                                                line: 93,
                                                                                column: 20,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                            },
                                                                            end: {
                                                                                line: 93,
                                                                                column: 26,
                                                                                fixed: true,
                                                                                source: 'ion/builder/WebsiteBuilder.ion'
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
                                                                                                line: 93,
                                                                                                column: 29,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 93,
                                                                                                column: 31,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'join',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 93,
                                                                                                column: 32,
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
                                                                                            name: 'manifestFile',
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 93,
                                                                                                    column: 37,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                },
                                                                                                end: {
                                                                                                    line: 93,
                                                                                                    column: 49,
                                                                                                    fixed: true,
                                                                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'directoryName',
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 93,
                                                                                                    column: 50,
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
                                                                                        name: 'jsfile',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 93,
                                                                                                column: 65,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 93,
                                                                                                column: 71,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
                                                                                        }
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
                                                                                name: 'substring',
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 93,
                                                                                        column: 73,
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
                                                                                        name: 'output',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 93,
                                                                                                column: 83,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            },
                                                                                            end: {
                                                                                                line: 93,
                                                                                                column: 89,
                                                                                                fixed: true,
                                                                                                source: 'ion/builder/WebsiteBuilder.ion'
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'path',
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 93,
                                                                                                column: 90,
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
                                                                                    name: 'length',
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 93,
                                                                                            column: 95,
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
                                                            kind: 'let',
                                                            order: '0'
                                                        },
                                                        {
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'jspath',
                                                                loc: {
                                                                    start: {
                                                                        line: 94,
                                                                        column: 17,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 94,
                                                                        column: 23,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: true
                                                            },
                                                            kind: 'init',
                                                            computed: true,
                                                            order: '1'
                                                        }
                                                    ]
                                                },
                                                remove: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'jspath',
                                                                loc: {
                                                                    start: {
                                                                        line: 96,
                                                                        column: 17,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 96,
                                                                        column: 23,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: false
                                                            },
                                                            kind: 'init',
                                                            computed: true,
                                                            order: '0'
                                                        }]
                                                },
                                                order: '2'
                                            }
                                        ]
                                    },
                                    remove: null,
                                    order: '0'
                                }]
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
                            name: 'scripts',
                            loc: {
                                start: {
                                    line: 97,
                                    column: 8,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 97,
                                    column: 15,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
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
                                        declarations: [
                                            {
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'key',
                                                    loc: {
                                                        start: {
                                                            line: 97,
                                                            column: 27,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 97,
                                                            column: 30,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                                            line: 97,
                                                            column: 32,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 97,
                                                            column: 37,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
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
                                        name: 'files',
                                        loc: {
                                            start: {
                                                line: 97,
                                                column: 41,
                                                fixed: true,
                                                source: 'ion/builder/WebsiteBuilder.ion'
                                            },
                                            end: {
                                                line: 97,
                                                column: 46,
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
                                                    type: 'Identifier',
                                                    name: 'value',
                                                    loc: {
                                                        start: {
                                                            line: 97,
                                                            column: 50,
                                                            fixed: true,
                                                            source: 'ion/builder/WebsiteBuilder.ion'
                                                        },
                                                        end: {
                                                            line: 97,
                                                            column: 55,
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
                                                                type: 'Identifier',
                                                                name: 'key',
                                                                loc: {
                                                                    start: {
                                                                        line: 97,
                                                                        column: 19,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
                                                                    },
                                                                    end: {
                                                                        line: 97,
                                                                        column: 22,
                                                                        fixed: true,
                                                                        source: 'ion/builder/WebsiteBuilder.ion'
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
                order: '='
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
                                    line: 98,
                                    column: 4,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                },
                                end: {
                                    line: 98,
                                    column: 10,
                                    fixed: true,
                                    source: 'ion/builder/WebsiteBuilder.ion'
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'write',
                            loc: {
                                start: {
                                    line: 98,
                                    column: 11,
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
                                            name: 'JSON',
                                            loc: {
                                                start: {
                                                    line: 101,
                                                    column: 15,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 101,
                                                    column: 19,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'stringify',
                                            loc: {
                                                start: {
                                                    line: 101,
                                                    column: 20,
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
                                            name: 'scripts',
                                            loc: {
                                                start: {
                                                    line: 101,
                                                    column: 30,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                },
                                                end: {
                                                    line: 101,
                                                    column: 37,
                                                    fixed: true,
                                                    source: 'ion/builder/WebsiteBuilder.ion'
                                                }
                                            }
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
                },
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
                },
                order: '>'
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