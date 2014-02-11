index = require '../compiler'

tests =
    "var x = 10": "let x = 10;"
    """
    for name, value of foo
        console.log(name + value)
    """: """
    for (let name in foo) {
        let value = foo[name];
        console.log(name + value);
    }
    """
    """
    for var name, value of {a:1,b:2,c:3}
        console.log(name + value)
    """: """
    {
        let _ref = {
                a: 1,
                b: 2,
                c: 3
            };
        for (let name in _ref) {
            let value = _ref[name];
            console.log(name + value);
        }
    }    
    """
    """
    for var name in ["a","b","c"]
        console.log(name)
    """: """
    {
        let _ref = [
                'a',
                'b',
                'c'
            ];
        for (let _i = 0; _i < _ref.length; _i++) {
            let name = _ref[_i];
            console.log(name);
        }
    }
    """
    """
    for name, index in ["a","b","c"]
        console.log(name)
    """: """
    {
        let _ref = [
                'a',
                'b',
                'c'
            ];
        for (let index = 0; index < _ref.length; index++) {
            let name = _ref[index];
            console.log(name);
        }
    }
    """
    """
    var object =
        x: 1
        y: 2
        foo:
            z: 3
    """:"""
    let object = {
            x: 1,
            y: 2,
            foo: { z: 3 }
        };
        """
    """
    var array = []
        1
        2
        3
    """:"""
    let array = [
            1,
            2,
            3
        ];
    """
    """
    var kids = []
        {}
            name: "Alpha"
            age: 10
        {}
            name: "Beta"
            age: 8
    """:"""
    let kids = [
            {
                name: 'Alpha',
                age: 10
            },
            {
                name: 'Beta',
                age: 8
            }
        ];
    """
    """
    try
        doSomething(1)
    catch e
        log(e)
    """:"""
    try {
        doSomething(1);
    } catch (e) {
        log(e);
    }
    """
    """
    try
        doSomething(1)
    finally
        log(e)
    """:"""
    try {
        doSomething(1);
    } finally {
        log(e);
    }
    """
    """
    try
        doSomething(1)
    catch e
        console.error(e)
    finally
        log(e)
    """:"""
    try {
        doSomething(1);
    } catch (e) {
        console.error(e);
    } finally {
        log(e);
    }
    """
    """
    for key, name of foo
        if name is 'a'
            break
        else if name is 'b'
            continue
        else if name is 'c'
            return
        else if name is 'd'
            throw new Error("D")
        else
            return
                x: 1
                y: 2
    """:"""
    for (let key in foo) {
        let name = foo[key];
        if (name === 'a')
            break;
        else if (name === 'b')
            continue;
        else if (name === 'c')
            return;
        else if (name === 'd')
            throw new Error('D');
        else
            return {
                x: 1,
                y: 2
            };
    }
    """
    """
    console.log("Hello {{name}}")
    """:"""
    console.log('Hello ' + name);
    """
    """
    console.log("{{name}}")
    """:"""
    console.log('' + name);
    """
    """
    console.log("{{ 1 }}{{ 2 }}")
    """:"""
    console.log('' + 1 + 2);
    """
    """
    return ""
        <html>
            <head><title>{{ title }}</title></head>
            <body>
            {{ body }}
            </body>
        </html>
    """:"""
    return '<html>\\n    <head><title>' + title + '</title></head>\\n    <body>\\n    ' + body + '\\n    </body>\\n</html>';
    """
    """
    return ''
        <html>
            <head><title>{{ title }}</title></head>
            <body>
            {{ body }}
            </body>
        </html>
    """:"""
    return '<html>\\n    <head><title>{{ title }}</title></head>\\n    <body>\\n    {{ body }}\\n    </body>\\n</html>';
    """
    """
    do -> x
    """: """
    (function () {
        return x;
    }());
    """
    """
    do (x, y) => x + y
    """: """
    (function (x, y) {
        return x + y;
    }.bind(this)(x, y));
    """
    """
    const ion = import "ion"
    """: """
    const ion = require('ion');
    """
    """
    export
        secret: 97542
    """: """
    module.exports = exports = { secret: 97542 };
    """
    """
    export var x = 1, y = 2
    """: """
    let x = 1, y = 2;
    exports.x = x;
    exports.y = y;
    """
    """
    export const
        x = 1
        y = 2
        z = 3
    """: """
    const x = 1, y = 2, z = 3;
    exports.x = x;
    exports.y = y;
    exports.z = z;
    """

exports.test = ->
    for input, expected of tests
        if expected is null
            console.log '---------------------------------------------------'
            console.log JSON.stringify index.parse(input), null, '  '
            console.log '-Postprocessed------------------------------------'
            console.log JSON.stringify index.compile(input, {generate:false}), null, '  '
            console.log '---------------------------------------------------'
            try
                console.log index.compile input
            catch e
                console.log e.message
        else
            try
                output = index.compile input
                if output.trim() isnt expected.trim()
                    console.log '-Output---------------------------------------------'
                    console.log output
                    throw new Error "\n#{output}\n!=\n#{expected}"
            catch e
                console.log '-Error----------------------------------------------'
                console.log JSON.stringify e
                throw e
    return
