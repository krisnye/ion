var Template = require("C:\\Projects\\riot\\lib\\runtime\\Template.js");
var ast = {
    "op": "block",
    "args": [
        {
            "op": "var",
            "args": [
                "input",
                {
                    "op": "call",
                    "args": [
                        {
                            "op": "output",
                            "args": [
                                0
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "output",
                                    "args": [
                                        0
                                    ]
                                },
                                "getDirectory"
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
                            "op": "output",
                            "args": [
                                0
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "output",
                                    "args": [
                                        0
                                    ]
                                },
                                "getDirectory"
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
                            "op": "ref",
                            "args": [
                                "input"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "ref",
                                    "args": [
                                        "input"
                                    ]
                                },
                                "search"
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
                                            "op": "ref",
                                            "args": [
                                                "output"
                                            ]
                                        },
                                        {
                                            "op": "member",
                                            "args": [
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "output"
                                                    ]
                                                },
                                                "getFile"
                                            ]
                                        },
                                        {
                                            "op": "call",
                                            "args": [
                                                null,
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "changeExtension"
                                                    ]
                                                },
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
                                        null,
                                        {
                                            "op": "ref",
                                            "args": [
                                                "compileCoffeeScript"
                                            ]
                                        },
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
                            "op": "ref",
                            "args": [
                                "input"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "ref",
                                    "args": [
                                        "input"
                                    ]
                                },
                                "search"
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
                                            "op": "ref",
                                            "args": [
                                                "output"
                                            ]
                                        },
                                        {
                                            "op": "member",
                                            "args": [
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "output"
                                                    ]
                                                },
                                                "getFile"
                                            ]
                                        },
                                        {
                                            "op": "call",
                                            "args": [
                                                null,
                                                {
                                                    "op": "ref",
                                                    "args": [
                                                        "changeExtension"
                                                    ]
                                                },
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
                                        null,
                                        {
                                            "op": "ref",
                                            "args": [
                                                "compilePegjs"
                                            ]
                                        },
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
                            "op": "ref",
                            "args": [
                                "output"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "ref",
                                    "args": [
                                        "output"
                                    ]
                                },
                                "search"
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
                            "op": "ref",
                            "args": [
                                "output"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "ref",
                                    "args": [
                                        "output"
                                    ]
                                },
                                "getFile"
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
                            "op": "ref",
                            "args": [
                                "JSON"
                            ]
                        },
                        {
                            "op": "member",
                            "args": [
                                {
                                    "op": "ref",
                                    "args": [
                                        "JSON"
                                    ]
                                },
                                "stringify"
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
                                                                    "op": "ref",
                                                                    "args": [
                                                                        "key"
                                                                    ]
                                                                },
                                                                {
                                                                    "op": "member",
                                                                    "args": [
                                                                        {
                                                                            "op": "ref",
                                                                            "args": [
                                                                                "key"
                                                                            ]
                                                                        },
                                                                        "replace"
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
                        null,
                        {
                            "op": "ref",
                            "args": [
                                "runTests"
                            ]
                        },
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
    "id": "./build.riot"
};
module.exports = function(input, output, variables) {
    if (variables == null) variables = {};
    if (variables.module == null) variables.module = module;
    if (variables.require == null) variables.require = require;
    return new Template(ast, input, output, variables);
}