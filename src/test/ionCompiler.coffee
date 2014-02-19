index = require '../compiler'

tests =
    "var x = 10": """
    'use strict';
    let x = 10;
    """
    """
    for name, value of foo
        console.log(name + value)
    """: """
    'use strict';
    for (let name in foo) {
        let value = foo[name];
        console.log(name + value);
    }
    """
    """
    for var name, value of {a:1,b:2,c:3}
        console.log(name + value)
    """: """
    'use strict';
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
    'use strict';
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
    'use strict';
    {
        let _ref = [
                'a',
                'b',
                'c'
            ];
        for (let _i = 0; _i < _ref.length; _i++) {
            let index = _i;
            let name = _ref[_i];
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
    console.log('Hello ' + name);
    """
    """
    console.log("{{name}}")
    """: """
    'use strict';
    console.log('' + name);
    """
    """
    console.log("{{ 1 }}{{ 2 }}")
    """: """
    'use strict';
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
    """: """
    'use strict';
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
    """: """
    'use strict';
    return '<html>\\n    <head><title>{{ title }}</title></head>\\n    <body>\\n    {{ body }}\\n    </body>\\n</html>';
    """
    """
    do -> x
    """: """
    'use strict';
    (function () {
        return x;
    }());
    """
    """
    do (x, y) => x + y
    """: """
    'use strict';
    (function (x, y) {
        return x + y;
    }.bind(this)(x, y));
    """
    """
    const ion = import "ion"
    """: """
    'use strict';
    const ion = require('ion');
    """
    """
    export
        secret: 97542
    """: """
    'use strict';
    module.exports = exports = { secret: 97542 };
    """
    """
    export var x = 1, y = 2
    """: """
    'use strict';
    let x = exports.x = 1;
    let y = exports.y = 2;
    """
    """
    export const
        x = 1
        y = 2
        z = 3
    """: """
    'use strict';
    const x = exports.x = 1;
    const y = exports.y = 2;
    const z = exports.z = 3;
    """
    """
    var {x,y} = {x:1,y:2}
    """: """
    'use strict';
    let _ref = {
            x: 1,
            y: 2
        };
    let x = _ref.x;
    let y = _ref.y;
    """
    """
    for key, {x:[a,b],y:{c:d}} of points
        console.log(x, y)
    """: """
    'use strict';
    for (let key in points) {
        let _ref = points[key];
        let a = _ref.x[0];
        let b = _ref.x[1];
        let d = _ref.y.c;
        console.log(x, y);
    }
    """
    """
    for {x:[a,b],y:{c:d}}, index in points
        console.log(x, y)
    """: """
    'use strict';
    for (let _i = 0; _i < points.length; _i++) {
        let index = _i;
        let _ref = points[_i];
        let a = _ref.x[0];
        let b = _ref.x[1];
        let d = _ref.y.c;
        console.log(x, y);
    }
    """
    """
    foo ? bar
    """: """
    'use strict';
    foo != null ? foo : bar;
    """
    """
    foo ?? bar
    """: """
    'use strict';
    foo != void 0 ? foo : bar;
    """
    """
    x ?= y
    """: """
    'use strict';
    x = x != null ? x : y;
    """
    """
    x ??= y
    """: """
    'use strict';
    x = x != void 0 ? x : y;
    """
    """
    for const x, index in foo
        log(x)
    """: """
    'use strict';
    for (let _i = 0; _i < foo.length; _i++) {
        const index = _i;
        const x = foo[_i];
        log(x);
    }
    """
    """
    [x,y] = [y,x]
    """: """
    'use strict';
    const _ref = [
            y,
            x
        ];
    x = _ref[0];
    y = _ref[1];
    """
    """
    a?.b
    """: """
    'use strict';
    a != null ? a.b : void 0;
    """
    """
    a?.b.c?.d
    """: """
    'use strict';
    a != null ? a.b.c != null ? a.b.c.d : void 0 : void 0;
    """
    """
    a?()
    """: """
    'use strict';
    a != null ? a() : void 0;
    """
    """
    a?.b?.c?()
    """: """
    'use strict';
    a != null ? a.b != null ? a.b.c != null ? a.b.c() : void 0 : void 0 : void 0;
    """
    """
    a?.b().c?()
    """: """
    'use strict';
    a != null ? a.b().c != null ? a.b().c() : void 0 : void 0;
    """
    """
    (x) -> 2
    """: """
    'use strict';
    (function (x) {
        return 2;
    });
    """
    """
    s?
    """: """
    'use strict';
    s != null;
    """
    """
    origin = Point
        x: 0
        y: 0
    """: """
    'use strict';
    origin = new Point();
    origin.x = 0;
    origin.y = 0;
    """
    """
    origin = Line
        a: Point
            x: 0
            y: 0
        b: Point
            x: 10
            y: 20
    """: """
    'use strict';
    origin = new Line();
    origin.a = new Point();
    origin.a.x = 0;
    origin.a.y = 0;
    origin.b = new Point();
    origin.b.x = 10;
    origin.b.y = 20;
    """
    """
    input:
        # ignore this comment
        x: 10
        y: 20
        z:
            # also ignore this one
            a: 1
            b: 2
        w: Point
            x: 0
            y: 0
    """: """
    'use strict';
    input.x = 10;
    input.y = 20;
    input.z.a = 1;
    input.z.b = 2;
    input.w = new Point();
    input.w.x = 0;
    input.w.y = 0;
    """
    """
    # also test comments
    var regex = /foo/
    """: """
    'use strict';
    let regex = /foo/;
    """
    """
    for var i = 0; i < 10; i++
        console.log(i)
    """: """
    'use strict';
    for (let i = 0; i < 10; i++)
        console.log(i);
    """

exports.test = ->
    for input, expected of tests
        if expected is null
            console.log '---------------------------------------------------'
            console.log JSON.stringify index.compile(input, {postprocess:false}), null, '  '
            console.log '-Postprocessed------------------------------------'
            console.log JSON.stringify index.compile(input, {generate:false}), null, '  '
            console.log '---------------------------------------------------'
            try
                console.log index.compile input
            catch e
                console.log e.message
        else
            output = index.compile input
            if output.trim() isnt expected.trim()
                console.log '-Output---------------------------------------------'
                console.log output
                throw new Error "\n#{output}\n!=\n#{expected}"

    return
