var Template = require("C:\\Projects\\ion\\lib\\runtime\\Template.js");
var ast = {
    "op": "block",
    "args": [
        {
            "op": "var",
            "args": [
                "packageFile",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 1",
                                        {
                                            "op": "output",
                                            "args": [
                                                0
                                            ]
                                        }
                                    ]
                                },
                                "getFile"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 1"
                            ]
                        },
                        "package.json"
                    ]
                }
            ]
        },
        {
            "op": "var",
            "args": [
                "package",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 2",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "JSON"
                                            ]
                                        }
                                    ]
                                },
                                "parse"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 2"
                            ]
                        },
                        {
                            "op": "call",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "var",
                                            "args": [
                                                "% 3",
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "packageFile"
                                                    ]
                                                }
                                            ]
                                        },
                                        "read"
                                    ]
                                },
                                {
                                    "op": "ref",
                                    "args": [
                                        "% 3"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "var",
            "args": [
                "input",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 4",
                                        {
                                            "op": "output",
                                            "args": [
                                                0
                                            ]
                                        }
                                    ]
                                },
                                "getDirectory"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 4"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "input",
                                    "args": []
                                },
                                "input"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "var",
            "args": [
                "output",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 5",
                                        {
                                            "op": "output",
                                            "args": [
                                                0
                                            ]
                                        }
                                    ]
                                },
                                "getDirectory"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 5"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "input",
                                    "args": []
                                },
                                "output"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "for",
            "args": [
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 6",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "input"
                                            ]
                                        }
                                    ]
                                },
                                "search"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 6"
                            ]
                        },
                        ".coffee"
                    ]
                },
                {
                    "op": "block",
                    "args": [
                        {
                            "op": "var",
                            "args": [
                                "source",
                                {
                                    "op": "input",
                                    "args": [
                                        0
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "target",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "member",
                                            "args": [
                                                {
                                                    "op": "var",
                                                    "args": [
                                                        "% 7",
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "output"
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "getFile"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "% 7"
                                            ]
                                        },
                                        {
                                            "op": "call",
                                            "args": [
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "changeExtension"
                                                    ]
                                                },
                                                null,
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "key"
                                                    ]
                                                },
                                                ".js"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "moduleId",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "normalizePath"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "+",
                                            "args": [
                                                {
                                                    "op": "member",
                                                    "args": [
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "package"
                                                            ]
                                                        },
                                                        "name"
                                                    ]
                                                },
                                                {
                                                    "op": "+",
                                                    "args": [
                                                        "/",
                                                        {
                                                            "op": "call",
                                                            "args": [
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "changeExtension"
                                                                    ]
                                                                },
                                                                null,
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "key"
                                                                    ]
                                                                },
                                                                ""
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "set",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        "path"
                                    ]
                                },
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "compileCoffeeScript"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "ref",
                                            "args": [
                                                "source"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "moduleId"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "packageFile"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "for",
            "args": [
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 8",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "input"
                                            ]
                                        }
                                    ]
                                },
                                "search"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 8"
                            ]
                        },
                        ".pegjs"
                    ]
                },
                {
                    "op": "block",
                    "args": [
                        {
                            "op": "var",
                            "args": [
                                "source",
                                {
                                    "op": "input",
                                    "args": [
                                        0
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "target",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "member",
                                            "args": [
                                                {
                                                    "op": "var",
                                                    "args": [
                                                        "% 9",
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "output"
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "getFile"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "% 9"
                                            ]
                                        },
                                        {
                                            "op": "call",
                                            "args": [
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "changeExtension"
                                                    ]
                                                },
                                                null,
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "key"
                                                    ]
                                                },
                                                ".js"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "moduleId",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "normalizePath"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "+",
                                            "args": [
                                                {
                                                    "op": "member",
                                                    "args": [
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "package"
                                                            ]
                                                        },
                                                        "name"
                                                    ]
                                                },
                                                {
                                                    "op": "+",
                                                    "args": [
                                                        "/",
                                                        {
                                                            "op": "call",
                                                            "args": [
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "changeExtension"
                                                                    ]
                                                                },
                                                                null,
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "key"
                                                                    ]
                                                                },
                                                                ""
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "set",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        "path"
                                    ]
                                },
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "compilePegjs"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "ref",
                                            "args": [
                                                "source"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "moduleId"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "packageFile"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "for",
            "args": [
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 10",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "input"
                                            ]
                                        }
                                    ]
                                },
                                "search"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 10"
                            ]
                        },
                        ".js"
                    ]
                },
                {
                    "op": "block",
                    "args": [
                        {
                            "op": "var",
                            "args": [
                                "source",
                                {
                                    "op": "input",
                                    "args": [
                                        0
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "target",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "member",
                                            "args": [
                                                {
                                                    "op": "var",
                                                    "args": [
                                                        "% 11",
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "output"
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "getFile"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "% 11"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "key"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "var",
                            "args": [
                                "moduleId",
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "normalizePath"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "+",
                                            "args": [
                                                {
                                                    "op": "member",
                                                    "args": [
                                                        {
                                                            "op": "ref",
                                                            "args": [
                                                                "package"
                                                            ]
                                                        },
                                                        "name"
                                                    ]
                                                },
                                                {
                                                    "op": "+",
                                                    "args": [
                                                        "/",
                                                        {
                                                            "op": "call",
                                                            "args": [
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "changeExtension"
                                                                    ]
                                                                },
                                                                null,
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "key"
                                                                    ]
                                                                },
                                                                ""
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "set",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        "path"
                                    ]
                                },
                                {
                                    "op": "call",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "copyJavascript"
                                            ]
                                        },
                                        null,
                                        {
                                            "op": "ref",
                                            "args": [
                                                "source"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "target"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "moduleId"
                                            ]
                                        },
                                        {
                                            "op": "ref",
                                            "args": [
                                                "packageFile"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "op": "var",
            "args": [
                "outputFiles",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 12",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "output"
                                            ]
                                        }
                                    ]
                                },
                                "search"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 12"
                            ]
                        },
                        ".js"
                    ]
                }
            ]
        },
        {
            "op": "var",
            "args": [
                "manifest",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 13",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "output"
                                            ]
                                        }
                                    ]
                                },
                                "getFile"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 13"
                            ]
                        },
                        "manifest.json"
                    ]
                }
            ]
        },
        {
            "op": "set",
            "args": [
                {
                    "op": "member",
                    "args": [
                        {
                            "op": "ref",
                            "args": [
                                "manifest"
                            ]
                        },
                        "path"
                    ]
                },
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "var",
                                    "args": [
                                        "% 14",
                                        {
                                            "op": "ref",
                                            "args": [
                                                "JSON"
                                            ]
                                        }
                                    ]
                                },
                                "stringify"
                            ]
                        },
                        {
                            "op": "ref",
                            "args": [
                                "% 14"
                            ]
                        },
                        {
                            "op": "object",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "global",
                                            "args": []
                                        },
                                        "Array"
                                    ]
                                },
                                {
                                    "op": "for",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "outputFiles"
                                            ]
                                        },
                                        {
                                            "op": "add",
                                            "args": [
                                                {
                                                    "op": "local",
                                                    "args": [
                                                        {
                                                            "op": "input",
                                                            "args": [
                                                                0
                                                            ]
                                                        },
                                                        {
                                                            "op": "call",
                                                            "args": [
                                                                {
                                                                    "op": "member",
                                                                    "args": [
                                                                        {
                                                                            "op": "var",
                                                                            "args": [
                                                                                "% 15",
                                                                                {
                                                                                    "op": "ref",
                                                                                    "args": [
                                                                                        "key"
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        "replace"
                                                                    ]
                                                                },
                                                                {
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "% 15"
                                                                    ]
                                                                },
                                                                {
                                                                    "op": "regex",
                                                                    "args": [
                                                                        "\\\\",
                                                                        "g"
                                                                    ]
                                                                },
                                                                "/"
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "op": "null",
                            "args": []
                        },
                        "    "
                    ]
                }
            ]
        },
        {
            "op": "add",
            "args": [
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "ref",
                            "args": [
                                "runTests"
                            ]
                        },
                        null,
                        {
                            "op": "ref",
                            "args": [
                                "manifest"
                            ]
                        },
                        {
                            "op": "object",
                            "args": [
                                {
                                    "op": "member",
                                    "args": [
                                        {
                                            "op": "global",
                                            "args": []
                                        },
                                        "Array"
                                    ]
                                },
                                {
                                    "op": "for",
                                    "args": [
                                        {
                                            "op": "ref",
                                            "args": [
                                                "outputFiles"
                                            ]
                                        },
                                        {
                                            "op": "add",
                                            "args": [
                                                {
                                                    "op": "member",
                                                    "args": [
                                                        {
                                                            "op": "input",
                                                            "args": [
                                                                0
                                                            ]
                                                        },
                                                        "modified"
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                1
            ]
        }
    ],
    "id": "./build.ion"
};
module.exports = function(input, output, variables) {
    if (variables == null) variables = {};
    if (variables.module == null) variables.module = module;
    if (variables.require == null) variables.require = require;
    return new Template(ast, input, output, variables);
}