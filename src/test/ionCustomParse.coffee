
tests =
    "{x,y} = a":
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "=",
                        "left": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init"
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init"
                                }
                            ]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }
                }
            ]
        }
    """
    var i = 0
    while i++ < 10
        console.log(i)
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 0
                            }
                        }
                    ],
                    "kind": "let"
                },
                {
                    "type": "WhileStatement",
                    "test": {
                        "type": "BinaryExpression",
                        "operator": "<",
                        "left": {
                            "type": "UpdateExpression",
                            "operator": "++",
                            "argument": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "prefix": false
                        },
                        "right": {
                            "type": "Literal",
                            "value": 10
                        }
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "console"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "log"
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "i"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    """
    for x of foo
        log(x)
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "value": null,
                    "right": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "log"
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    """
    for x, {y,z} of foo
        log(x, y, z)
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "value": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init"
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "z"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "z"
                                },
                                "kind": "init"
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "log"
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "z"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    """
    for {x,y} in foo
        log(x, y)
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForOfStatement",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init"
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init"
                            }
                        ]
                    },
                    "index": null,
                    "right": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "log"
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    """
    for {x,y}, i in foo
        log(x, y)
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForOfStatement",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init"
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init"
                            }
                        ]
                    },
                    "index": {
                        "type": "Identifier",
                        "name": "i"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "log"
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    """
    if a
        a()
    else if b
        b()
    else
        c()
    """:
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": {
                        "type": "IfStatement",
                        "test": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "consequent": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "arguments": []
                            }
                        },
                        "alternate": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "c"
                                },
                                "arguments": []
                            }
                        }
                    }
                }
            ]
        }

exports.test = ->
    ion = require '../compiler'

    options = {loc:false}

    for text, expected of tests
        ionResult = ion.parse text, options
        if JSON.stringify(expected) isnt JSON.stringify(ionResult)
            console.log '-Expected--------------------------------------------'
            console.log JSON.stringify expected, null, '    '
            console.log '-Ion-------------------------------------------------'
            console.log JSON.stringify ionResult, null, '    '
            throw new Error "ion.parse(#{text}) was not expected value: (#{JSON.stringify expected})"
    return
