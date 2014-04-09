index = require '../compiler'

tests =
    "let x = 10": """
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
    for let name, value of {a:1,b:2,c:3}
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
    for let name in ["a","b","c"]
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
    let object =
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
    let array = []
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
    let kids = []
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
        if (name === 'a') {
            break;
        } else if (name === 'b') {
            continue;
        } else if (name === 'c') {
            return;
        } else if (name === 'd') {
            throw new Error('D');
        } else {
            return {
                x: 1,
                y: 2
            };
        }
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
    export let x = 1, y = 2
    """: """
    'use strict';
    let x = exports.x = 1, y = exports.y = 2;
    """
    """
    export const
        x = 1
        y = 2
        z = 3
    """: """
    'use strict';
    const x = exports.x = 1, y = exports.y = 2, z = exports.z = 3;
    """
    """
    let {x,y} = {x:1,y:2}
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
    let x
    x ?= y
    """: """
    'use strict';
    let x;
    x = x != null ? x : y;
    """
    """
    let x
    x ??= y
    """: """
    'use strict';
    let x;
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
    let x = 1, y = 2
    [x,y] = [y,x]
    """: """
    'use strict';
    let x = 1, y = 2;
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
    let y = (x) -> 2
    """: """
    'use strict';
    let y = function (x) {
        return 2;
    };
    """
    """
    s?
    """: """
    'use strict';
    s != null;
    """
    """
    # also test comments
    let regex = /foo/
    """: """
    'use strict';
    let regex = /foo/;
    """
    """
    for let i = 0; i < 10; i++
        console.log(i)
    """: """
    'use strict';
    for (let i = 0; i < 10; i++) {
        console.log(i);
    }
    """
    """
    for key of object if key[0] isnt '_' for c in key
        console.log(c)
    """: """
    'use strict';
    for (let key in object) {
        if (key[0] !== '_') {
            for (let _i = 0; _i < key.length; _i++) {
                let c = key[_i];
                console.log(c);
            }
        }
    }
    """
    """
    console.log([key for key of object if key is cool])
    """: """
    'use strict';
    let _ref = [];
    for (let key in object) {
        if (key === cool) {
            _ref.push(key);
        }
    }
    console.log(_ref);
    """
    """
    (console.log)
        1
        2
        {}
            x: 1
            y: 2
    """: """
    'use strict';
    console.log(1, 2, {
        x: 1,
        y: 2
    });
    """
    """
    let x = ->
        try
            foo()
            bar()
        catch e
            baz()
    """: """
    'use strict';
    let x = function () {
        try {
            foo();
            bar();
        } catch (e) {
            baz();
        }
    };
    """
    # empty comment block statement
    """
    if foo
        # bar
    """: """
    'use strict';
    if (foo) {
    }
    """
    # function parameter default values
    """
    let trim = (a = "") -> a.trim()
    """: """
    'use strict';
    let trim = function (a) {
        if (a == null)
            a = '';
        return a.trim();
    };
    """
    # function call with single property names
    """
    (foo)
        1
        2
    """: """
    'use strict';
    foo(1, 2);
    """
    """
    (compile)
        foo: 1
        bar: 2
        baz:
            a: 1
            b: 2
    """: """
    'use strict';
    compile({
        foo: 1,
        bar: 2,
        baz: {
            a: 1,
            b: 2
        }
    });
    """
    """
    let array = [1,2,3]
        4
        5
        6
    """: """
    'use strict';
    let array = [
            1,
            2,
            3,
            4,
            5,
            6
        ];
    """
    """
    let point = new Point(10, 20)
        z: 30
    """: """
    'use strict';
    let point = new Point(10, 20);
    {
        point.z = 30;
    }
    """
    """
    let object = {x:1, y:2}
        z: 3
    """: """
    'use strict';
    let object = {
            x: 1,
            y: 2
        };
    {
        object.z = 3;
    }
    """
    """
    let origin = Point
        x: 1
        y: 2
    """: """
    'use strict';
    let origin = new Point();
    {
        origin.x = 1;
        origin.y = 2;
    }
    """
    """
    let origin = Line
        a: Point
            x: 0
            y: 0
        b: Point
            x: 10
            y: 20
    """: """
    'use strict';
    let origin = new Line();
    {
        let _ref = new Point();
        {
            _ref.x = 0;
            _ref.y = 0;
        }
        origin.a = ion.patch(origin.a, _ref);
        let _ref2 = new Point();
        {
            _ref2.x = 10;
            _ref2.y = 20;
        }
        origin.b = ion.patch(origin.b, _ref2);
    }
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
    const ion = require('ion');
    let _ref = new Point();
    {
        _ref.x = 0;
        _ref.y = 0;
    }
    ion.patch(input, {
        x: 10,
        y: 20,
        z: {
            a: 1,
            b: 2
        },
        w: _ref
    });
    """
    """
    let point = Point
        [x]: 1
        [y]: 2
    """: """
    'use strict';
    let point = new Point();
    {
        point[x] = 1;
        point[y] = 2;
    }
    """
    """
    let self = @
    let x = @x
    let y = @.y
    let z = this.z
    """: """
    'use strict';
    let self = this;
    let x = this.x;
    let y = this.y;
    let z = this.z;
    """
    """
    let x = {}
        [key]: value
    """: """
    'use strict';
    let x = {};
    {
        x[key] = value;
    }
    """
    """
    if foo
        return {}
            for key, value of object
                [key]: value
    """: """
    'use strict';
    if (foo) {
        let _ref = {};
        {
            for (let key in object) {
                let value = object[key];
                _ref[key] = value;
            }
        }
        return _ref;
    }
    """
    # test for syntax errors
    """
    for x, y, z of foo
        log(foo)
    """: {line:1, column:11}
    """
    export let x
    """: {line:1, column:12}
    """
    export const x
    """: {line:1, column:14}
    """
    export const x = 1
    export {y:2}
    """: {line:2,column:1}
    """
    const x = 1
    x = 2
    """: {line:2, column:1}
    """
    const double = (x) ->
        x *= 2
        return x
    """: """
    'use strict';
    const double = function (x) {
        x *= 2;
        return x;
    };
    """
    """
    x = 1
    """: {line:1, column:1}
    """
    let x = 1
    let x = 2
    """: {line:2, column:5}
    # make sure we allow variable shadowing
    """
    let x = 1
    const double = (x) ->
        return x
    """: """
    'use strict';
    let x = 1;
    const double = function (x) {
        return x;
    };
    """
    """
    console.log(x)
    if a
        let x = 1
    """: {line:1, column:13}
    """
    if typeof a is 'string' and void a and delete a.b
        log(a)
    """: """
    'use strict';
    if (typeof a === 'string' && void a && delete a.b) {
        log(a);
    }
    """
    # testing error correct location with comments and indents
    """
    if 1
        # 1
        # 2
        x = 12
    """: {line:4, column:5}
    # testing parsing error correct location
    """
    export const
        BlockStatement =
            isBlock: true
            newScope: tr ue
    """: {line:4, column:22}
    """
    export class Foo extends import 'Bar'
        constructor: (x,y) ->
            @x = x
            @y = y
        properties:
            x: 1
            y: 2
            getXY: -> [@x,@y]
        isThisPropertyStatic: true
    """: """
    'use strict';
    const ion = require('ion');
    const Foo = ion.defineClass({
            id: 'Foo',
            constructor: function Foo(x, y) {
                this.x = x;
                this.y = y;
            },
            properties: {
                x: 1,
                y: 2,
                getXY: function () {
                    return [
                        this.x,
                        this.y
                    ];
                }
            },
            isThisPropertyStatic: true
        }, require('Bar'));
    module.exports = exports = Foo;
    """
    """
    double(a) -> a * 2
    """: """
    'use strict';
    function double(a) {
        return a * 2;
    }
    """
    """
    double(a) -> a * 2
    double = 12
    """: {line:2, column: 1}
    """
    let object =
        double(a) -> a * 2
        if a
            [key]: value
        else
            foo: double(2)
    """: """
    'use strict';
    let object = {};
    {
        function double(a) {
            return a * 2;
        }
        if (a) {
            object[key] = value;
        } else {
            object.foo = double(2);
        }
    }
    """
    """
    let items = []
        for key, value of window
            value
    """: """
    'use strict';
    let items = [];
    {
        for (let key in window) {
            let value = window[key];
            items.push(value);
        }
    }
    """
    """
    let foo = div
        span
            'Hello'
    """: """
    'use strict';
    const ion = require('ion');
    let foo = new div();
    {
        let _ref = new span();
        {
            ion.add(_ref, 'Hello');
        }
        ion.add(foo, _ref);
    }
    """
    # we don't auto import ion if the user already declares an ion variable
    """
    const ion = import './'
    let foo = div
        span
            'Hello'
    """: """
    'use strict';
    const ion = require('./');
    let foo = new div();
    {
        let _ref = new span();
        {
            ion.add(_ref, 'Hello');
        }
        ion.add(foo, _ref);
    }
    """
    """
    translate({x,y}) ->
        x++
        y++
        return {x,y}
    """: """
    'use strict';
    function translate(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        x++;
        y++;
        return {
            x: x,
            y: y
        };
    }
    """
    """
    let x = (foo)
        ''
            multiline string literal
        ""
            multiline string template
    """: """
    'use strict';
    let x = foo('multiline string literal', 'multiline string template');
    """
    """
    assert x is 2
    """: """
    'use strict';
    if (!(x === 2))
        throw new Error('Assertion Failed: (x is 2)');
    """
    """
    export class Point
        constructor: ->
            # call super with arguments object
            super
            # call super again with explicit arguments
            super(width, height)
            # calling twice is silly, but legal
        properties:
            x: 0
            y: 0
            superIdentifier: (x, y) -> super
            superExplicit: (a, b) -> super(a, b)
    """: """
    'use strict';
    const ion = require('ion');
    const Point = ion.defineClass({
            id: 'Point',
            constructor: function Point() {
                Point.super.apply(this, arguments);
                Point.super.call(this, width, height);
            },
            properties: {
                x: 0,
                y: 0,
                superIdentifier: function (x, y) {
                    return Point.super.prototype.superIdentifier.apply(this, arguments);
                },
                superExplicit: function (a, b) {
                    return Point.super.prototype.superExplicit.call(this, a, b);
                }
            }
        });
    module.exports = exports = Point;
    """
    """
    spreadFunction1(a, b, ...c) ->
        log(1)
    spreadFunction2(a, b, ...c, d, e) ->
        log(2)
    spreadFunction3(a,b, ...c, {d,e}) ->
        log(3)
    """: """
    'use strict';
    function spreadFunction1(a, b, ___c) {
        let c = Array.prototype.slice.call(arguments, 2);
        log(1);
    }
    function spreadFunction2(a, b, ___c, d, e) {
        let c = Array.prototype.slice.call(arguments, 2, arguments.length - 2);
        d = arguments[arguments.length - 2];
        e = arguments[arguments.length - 1];
        log(2);
    }
    function spreadFunction3(a, b, ___c, _ref) {
        let c = Array.prototype.slice.call(arguments, 2, arguments.length - 1);
        _ref = arguments[arguments.length - 1];
        let d = _ref.d;
        let e = _ref.e;
        log(3);
    }
    """
    """
    # default value for a should be set before b
    foo(a = 0, b = a) -> a + b
    """: """
    'use strict';
    function foo(a, b) {
        if (a == null)
            a = 0;
        if (b == null)
            b = a;
        return a + b;
    }
    """
    """
    export template ->
        # cannot define classes in templates
        class Poo
    """: {line: 3, column: 5}
    """
    export template ->
        # cannot for loop in templates
        for let i = 0; i < 10; i++
            console.log(i)
    """: {line: 3, column: 5}
    """
    export template ->
        # cannot export in templates
        export x
    """: {line: 3, column: 5}
    """
    export template ->
        # cannot try/catch in templates
        try
            return 0
        catch e
            return 1
    """: {line: 3, column: 5}
    """
    export template ->
        # cannot throw errors in templates
        throw new Error
    """: {line: 3, column: 5}
    """
    # cannot use => syntax in templates
    export template => 0
    """: {line: 2, column: 8}
    """
    export template ->
        const x = 12
        # cannot assign to const variables, make sure enforced within template
        x = 10
        return x
    """: {line: 4, column: 5}
    """
    export template ->
        let x = 12
        # cannot assign to let variables either.
        x = 12
        return x
    """: {line: 4, column: 5}
    """
    export template ->
        let x = {y:10}
        # cannot assign to anything really.
        x.y = 12
        return x.y
    """: {line: 4, column: 5}
    """
    export template (a) ->
        # cannot assign to parameters either
        a = 10
        return a
    """: {line: 3, column: 5}
    """
    export class Foo
        constructor: ->
            # there was a problem with existential operators not processing within class definitions
            if properties?
                log(properties)
    """: """
    'use strict';
    const ion = require('ion');
    const Foo = ion.defineClass({
            id: 'Foo',
            constructor: function Foo() {
                if (properties != null) {
                    log(properties);
                }
            }
        });
    module.exports = exports = Foo;
    """
    """
    const ctor = @@
    const ctorName = @@name
    """: """
    'use strict';
    const ctor = this.constructor;
    const ctorName = this.constructor.name;
    """
    """
    inlineThrow() -> throw new Error('inline throw')
    """: """
    'use strict';
    function inlineThrow() {
        throw new Error('inline throw');
    }
    """
    """
    class DynamicExpression
        watch: ->
            let x = @x ?= []
    """: """
    'use strict';
    const ion = require('ion');
    const DynamicExpression = ion.defineClass({
            id: 'DynamicExpression',
            watch: function () {
                let x = this.x = this.x != null ? this.x : [];
            }
        });
    DynamicExpression;
    """
    """
    let a = (new Point)
        1
        2
    """: """
    'use strict';
    let a = new Point(1, 2);
    """
    """
    let x = [y for y in z]
    """: """
    'use strict';
    let _ref = [];
    for (let _i = 0; _i < z.length; _i++) {
        let y = z[_i];
        _ref.push(y);
    }
    let x = _ref;
    """
    """
    return
        z: []
            let items = [3,2,1]
            for item in items
                item * 2
    """: """
    'use strict';
    let _ref = [];
    {
        let items = [
                3,
                2,
                1
            ];
        for (let _i = 0; _i < items.length; _i++) {
            let item = items[_i];
            _ref.push(item * 2);
        }
    }
    return { z: _ref };
    """
    """
    let x = `y == null`
    """: """
    'use strict';
    let x = y == null;
    """
    """
    # should get accurate error locations even from inline javascript expressions
    let x = `y := null`
    """: {line: 2, column: 13}
    """
    let x = 0 in Array
    let y = "foo" instanceof String
    """: """
    'use strict';
    let x = 0 in Array;
    let y = 'foo' instanceof String;
    """
    """
    const output = {}
    output:
        x: 1
        y: 2
    """: """
    'use strict';
    const ion = require('ion');
    const output = {};
    ion.patch(output, {
        x: 1,
        y: 2
    });
    """
    """
    output:
        for a in b
            [c]: d
    """: """
    'use strict';
    const ion = require('ion');
    let _ref = {};
    {
        for (let _i = 0; _i < b.length; _i++) {
            let a = b[_i];
            _ref[c] = d;
        }
    }
    ion.patch(output, _ref);
    """
    """
    output: {}
        x: 1
    """: {line: 1, column: 9}
    """
    [output]:
        x: 1
    """: {line: 1, column: 2}
    """
    #
    #

    #
    """: """
    'use strict';
    """

if global.window?
    return

exports.test = ->
    for input, expected of tests
        if expected is null
            console.log '---------------------------------------------------'
            # console.log JSON.stringify index.compile(input, {postprocess:false}), null, '  '
            # console.log '-Postprocessed-------------------------------------'
            # console.log JSON.stringify index.compile(input, {generate:false}), null, '  '
            console.log '---------------------------------------------------'
            console.log index.compile input, {loc:false}
        else if typeof expected is 'object'
            # expected to throw an error
            error = null
            try
                index.compile input
            catch e
                error = e
                # check equivalent fields
                for key, value of expected
                    if value isnt e[key]
                        throw new Error "\n#{JSON.stringify e}\n!=\n#{JSON.stringify expected}"
            if not error?
                throw new Error "Expected an error: #{JSON.stringify expected}"
        else
            output = index.compile input
            if output.trim() isnt expected.trim()
                console.log '-Output---------------------------------------------'
                console.log output
                throw new Error "\n#{output}\n!=\n#{expected}"
    return
