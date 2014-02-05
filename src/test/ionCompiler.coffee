index = require '../compiler'

tests =
    "var x = 10": "let x = 10;"
    """
    for name, value of foo
        name + value
    """: """
    for (name in foo) {
        let value = foo[name];
        name + value;
    }
    """

exports.test = ->
    for input, expected of tests
        output = index.compile input
        throw new Error "#{output} != #{expected}" unless output is expected
    console.log output
