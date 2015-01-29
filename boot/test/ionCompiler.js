void (function(){var _ion_test_ionCompiler_ = function(module,exports,require){var index, ion, tests;

ion = require('../');

index = require('../compiler');

tests = {
  "let x = 10": "'use strict';\nlet x = 10;",
  "for name, value of foo\n    console.log(name + value)": "'use strict';\nfor (let name in foo) {\n    let value = foo[name];\n    console.log(name + value);\n}",
  "for let name, value of {a:1,b:2,c:3}\n    console.log(name + value)": "'use strict';\n{\n    let _ref = {\n            a: 1,\n            b: 2,\n            c: 3\n        };\n    for (let name in _ref) {\n        let value = _ref[name];\n        console.log(name + value);\n    }\n}    ",
  "for let name in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "for name, index in [\"a\",\"b\",\"c\"]\n    console.log(name)": "'use strict';\n{\n    let _ref = [\n            'a',\n            'b',\n            'c'\n        ];\n    for (let _i = 0; _i < _ref.length; _i++) {\n        let index = _i;\n        let name = _ref[_i];\n        console.log(name);\n    }\n}",
  "let object =\n    x: 1\n    y: 2\n    foo:\n        z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        foo: { z: 3 }\n    };",
  "let array = []\n    1\n    2\n    3": "'use strict';\nlet array = [\n        1,\n        2,\n        3\n    ];",
  "let kids = []\n    {}\n        name: \"Alpha\"\n        age: 10\n    {}\n        name: \"Beta\"\n        age: 8": "'use strict';\nlet kids = [\n        {\n            name: 'Alpha',\n            age: 10\n        },\n        {\n            name: 'Beta',\n            age: 8\n        }\n    ];",
  "try\n    doSomething(1)\ncatch e\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    log(e);\n}",
  "try\n    doSomething(1)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} finally {\n    log(e);\n}",
  "try\n    doSomething(1)\ncatch e\n    console.error(e)\nfinally\n    log(e)": "'use strict';\ntry {\n    doSomething(1);\n} catch (e) {\n    console.error(e);\n} finally {\n    log(e);\n}",
  "for key, name of foo\n    if name is 'a'\n        break\n    else if name is 'b'\n        continue\n    else if name is 'c'\n        return\n    else if name is 'd'\n        throw new Error(\"D\")\n    else\n        return\n            x: 1\n            y: 2": "'use strict';\nfor (let key in foo) {\n    let name = foo[key];\n    if (name === 'a') {\n        break;\n    } else if (name === 'b') {\n        continue;\n    } else if (name === 'c') {\n        return;\n    } else if (name === 'd') {\n        throw new Error('D');\n    } else {\n        return {\n            x: 1,\n            y: 2\n        };\n    }\n}",
  "console.log(\"Hello {{name}}\")": "'use strict';\nconsole.log('Hello ' + name);",
  "console.log(\"{{name}}\")": "'use strict';\nconsole.log('' + name);",
  "console.log(\"{{ 1 }}{{ 2 }}\")": "'use strict';\nconsole.log('' + 1 + 2);",
  "return \"\"\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>' + title + '</title></head>\\n    <body>\\n    ' + body + '\\n    </body>\\n</html>';",
  "return ''\n    <html>\n        <head><title>{{ title }}</title></head>\n        <body>\n        {{ body }}\n        </body>\n    </html>": "'use strict';\nreturn '<html>\\n    <head><title>{{ title }}</title></head>\\n    <body>\\n    {{ body }}\\n    </body>\\n</html>';",
  "do -> x": "'use strict';\n(function () {\n    return x;\n}());",
  "do (x, y) => x + y": "'use strict';\nconst ion = require('ion');\nion.bind(function (x, y) {\n    return x + y;\n}, this)(x, y);",
  "const ion = import \"ion\"": "'use strict';\nconst ion = require('ion');",
  "export\n    secret: 97542": "'use strict';\nmodule.exports = exports = { secret: 97542 };",
  "export let x = 1, y = 2": "'use strict';\nlet x = exports.x = 1, y = exports.y = 2;",
  "export const\n    x = 1\n    y = 2\n    z = 3": "'use strict';\nconst x = exports.x = 1, y = exports.y = 2, z = exports.z = 3;",
  "let {x,y} = {x:1,y:2}": "'use strict';\nlet _ref = {\n        x: 1,\n        y: 2\n    };\nlet x = _ref.x;\nlet y = _ref.y;",
  "for key, {x:[a,b],y:{c:d}} of points\n    console.log(x, y)": "'use strict';\nfor (let key in points) {\n    let _ref = points[key];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "for {x:[a,b],y:{c:d}}, index in points\n    console.log(x, y)": "'use strict';\nfor (let _i = 0; _i < points.length; _i++) {\n    let index = _i;\n    let _ref = points[_i];\n    let a = _ref.x[0];\n    let b = _ref.x[1];\n    let d = _ref.y.c;\n    console.log(x, y);\n}",
  "foo ? bar": "'use strict';\nfoo != null ? foo : bar;",
  "foo ?? bar": "'use strict';\nfoo != void 0 ? foo : bar;",
  "let x\nx ?= y": "'use strict';\nlet x;\nx = x != null ? x : y;",
  "let x\nx ??= y": "'use strict';\nlet x;\nx = x != void 0 ? x : y;",
  "for const x, index in foo\n    log(x)": "'use strict';\nfor (let _i = 0; _i < foo.length; _i++) {\n    const index = _i;\n    const x = foo[_i];\n    log(x);\n}",
  "let x = 1, y = 2\n[x,y] = [y,x]": "'use strict';\nlet x = 1, y = 2;\nconst _ref = [\n        y,\n        x\n    ];\nx = _ref[0];\ny = _ref[1];",
  "a?.b": "'use strict';\na != null ? a.b : void 0;",
  "a?.b.c?.d": "'use strict';\na != null ? a.b.c != null ? a.b.c.d : void 0 : void 0;",
  "a?()": "'use strict';\na != null ? a() : void 0;",
  "a?.b?.c?()": "'use strict';\na != null ? a.b != null ? a.b.c != null ? a.b.c() : void 0 : void 0 : void 0;",
  "a?.b().c?()": "'use strict';\na != null ? a.b().c != null ? a.b().c() : void 0 : void 0;",
  "let y = (x) -> 2": "'use strict';\nlet y = function (x) {\n    return 2;\n};",
  "s?": "'use strict';\ns != null;",
  "# also test comments\nlet regex = /foo/": "'use strict';\nlet regex = /foo/;",
  "for let i = 0; i < 10; i++\n    console.log(i)": "'use strict';\nfor (let i = 0; i < 10; i++) {\n    console.log(i);\n}",
  "for key of object if key[0] isnt '_' for c in key\n    console.log(c)": "'use strict';\nfor (let key in object) {\n    if (key[0] !== '_') {\n        for (let _i = 0; _i < key.length; _i++) {\n            let c = key[_i];\n            console.log(c);\n        }\n    }\n}",
  "console.log([key for key of object if key is cool])": "'use strict';\nlet _ref = [];\nfor (let key in object) {\n    if (key === cool) {\n        _ref.push(key);\n    }\n}\nconsole.log(_ref);",
  "console.log(\n    1\n    2\n    {}\n        x: 1\n        y: 2\n)": "'use strict';\nconsole.log(1, 2, {\n    x: 1,\n    y: 2\n});",
  "let x = ->\n    try\n        foo()\n        bar()\n    catch e\n        baz()": "'use strict';\nlet x = function () {\n    try {\n        foo();\n        bar();\n    } catch (e) {\n        baz();\n    }\n};",
  "if foo\n    # bar": "'use strict';\nif (foo) {\n}",
  "let trim = (a = \"\") -> a.trim()": "'use strict';\nlet trim = function (a) {\n    if (a == null)\n        a = '';\n    return a.trim();\n};",
  "foo(\n    1\n    2\n)": "'use strict';\nfoo(1, 2);",
  "compile(\n    foo: 1\n    bar: 2\n    baz:\n        a: 1\n        b: 2\n)": "'use strict';\ncompile({\n    foo: 1,\n    bar: 2,\n    baz: {\n        a: 1,\n        b: 2\n    }\n});",
  "let array = [1,2,3]\n    4\n    5\n    6": "'use strict';\nlet array = [\n        1,\n        2,\n        3,\n        4,\n        5,\n        6\n    ];",
  "let point = new Point(10, 20)\n    z: 30": "'use strict';\nconst ion = require('ion');\nlet point = ion.patch(new Point(10, 20), { z: 30 });",
  "let object = {x:1, y:2}\n    z: 3": "'use strict';\nlet object = {\n        x: 1,\n        y: 2,\n        z: 3\n    };",
  "let origin = new Point\n    x: 1\n    y: 2": "'use strict';\nconst ion = require('ion');\nlet origin = ion.patch(new Point(), {\n        x: 1,\n        y: 2\n    });",
  "let origin = new Line\n    a: new Point\n        x: 0\n        y: 0\n    b: new Point\n        x: 10\n        y: 20": "'use strict';\nconst ion = require('ion');\nlet origin = ion.patch(new Line(), {\n        a: ion.patch(new Point(), {\n            x: 0,\n            y: 0\n        }),\n        b: ion.patch(new Point(), {\n            x: 10,\n            y: 20\n        })\n    });",
  "input:\n    # ignore this comment\n    x: 10\n    y: 20\n    z:\n        # also ignore this one\n        a: 1\n        b: 2\n    w: new Point\n        x: 0\n        y: 0": "'use strict';\nconst ion = require('ion');\n{\n    input.x = 10;\n    input.y = 20;\n    input.z = ion.patch(input.z, {\n        a: 1,\n        b: 2\n    });\n    input.w = ion.patch(new Point(), {\n        x: 0,\n        y: 0\n    });\n}",
  "let point = new Point\n    [x]: 1\n    [y]: 2": "'use strict';\nlet point = new Point();\n{\n    point[x] = 1;\n    point[y] = 2;\n}",
  "let self = @\nlet x = @x\nlet y = @.y\nlet z = this.z": "'use strict';\nlet self = this;\nlet x = this.x;\nlet y = this.y;\nlet z = this.z;",
  "let x = {}\n    [key]: value": "'use strict';\nlet x = {};\nx[key] = value;",
  "if foo\n    return {}\n        for key, value of object\n            [key]: value": "'use strict';\nif (foo) {\n    let _ref = {};\n    for (let key in object) {\n        let value = object[key];\n        _ref[key] = value;\n    }\n    return _ref;\n}",
  "for x, y, z of foo\n    log(foo)": {
    line: 1,
    column: 11
  },
  "export let x": {
    line: 1,
    column: 12
  },
  "export const x": {
    line: 1,
    column: 14
  },
  "export const x = 1\nexport {y:2}": {
    line: 2,
    column: 1
  },
  "const x = 1\nx = 2": {
    line: 2,
    column: 1
  },
  "const double = (x) ->\n    x *= 2\n    return x": "'use strict';\nconst double = function (x) {\n    x *= 2;\n    return x;\n};",
  "x = 1": {
    line: 1,
    column: 1
  },
  "let x = 1\nlet x = 2": {
    line: 2,
    column: 5
  },
  "let x = 1\nconst double = (x) ->\n    return x": "'use strict';\nlet x = 1;\nconst double = function (x) {\n    return x;\n};",
  "console.log(x)\nif a\n    let x = 1": {
    line: 1,
    column: 13
  },
  "if typeof a is 'string' and void a and delete a.b\n    log(a)": "'use strict';\nif (typeof a === 'string' && void a && delete a.b) {\n    log(a);\n}",
  "if 1\n    # 1\n    # 2\n    x = 12": {
    line: 4,
    column: 5
  },
  "export const\n    BlockStatement =\n        isBlock: true\n        newScope: tr ue": {
    line: 4,
    column: 22
  },
  "export class Foo extends import 'Bar'\n    constructor: (x,y) ->\n        @x = x\n        @y = y\n    properties:\n        x: 1\n        y: 2\n        getXY: -> [@x,@y]\n    isThisPropertyStatic: true": "'use strict';\nconst ion = require('ion');\nconst Foo = ion.defineClass({\n        name: 'Foo',\n        constructor: function Foo(x, y) {\n            this.x = x;\n            this.y = y;\n        },\n        properties: {\n            x: 1,\n            y: 2,\n            getXY: function () {\n                return [\n                    this.x,\n                    this.y\n                ];\n            }\n        },\n        isThisPropertyStatic: true\n    }, require('Bar'));\nmodule.exports = exports = Foo;",
  "const double(a) -> a * 2": "'use strict';\nfunction double(a) {\n    return a * 2;\n}",
  "const double(a) -> a * 2\ndouble = 12": {
    line: 2,
    column: 1
  },
  "let object =\n    const double(a) -> a * 2\n    if a\n        [key]: value\n    else\n        foo: double(2)": "'use strict';\nlet object = {};\n{\n    function double(a) {\n        return a * 2;\n    }\n    if (a) {\n        object[key] = value;\n    } else {\n        object.foo = double(2);\n    }\n}",
  "let items = []\n    for key, value of window\n        value": "'use strict';\nlet items = [];\nfor (let key in window) {\n    let value = window[key];\n    items.push(value);\n}",
  "let foo = div()\n    span()\n        'Hello'": "'use strict';\nconst ion = require('ion');\nlet foo = div();\nlet _ref = span();\nion.add(_ref, 'Hello');\nion.add(foo, _ref);",
  "const ion = import './'\nlet foo = div()\n    span()\n        'Hello'": "'use strict';\nconst ion = require('./');\nlet foo = div();\nlet _ref = span();\nion.add(_ref, 'Hello');\nion.add(foo, _ref);",
  "const translate({x,y}) ->\n    x++\n    y++\n    return {x,y}": "'use strict';\nfunction translate(_ref) {\n    let x = _ref.x;\n    let y = _ref.y;\n    x++;\n    y++;\n    return {\n        x: x,\n        y: y\n    };\n}",
  "let x = foo(\n    ''\n        multiline string literal\n    \"\"\n        multiline string template\n)": "'use strict';\nlet x = foo('multiline string literal', 'multiline string template');",
  "assert x is 2": "'use strict';\nif (!(x === 2))\n    throw new Error('Assertion Failed: (x is 2)');",
  "export class Point\n    constructor: ->\n        # call super with arguments object\n        super\n        # call super again with explicit arguments\n        super(width, height)\n        # calling twice is silly, but legal\n    properties:\n        x: 0\n        y: 0\n        superIdentifier: (x, y) -> super\n        superExplicit: (a, b) -> super(a, b)": "'use strict';\nconst ion = require('ion');\nconst Point = ion.defineClass({\n        name: 'Point',\n        constructor: function Point() {\n            Point.super.apply(this, arguments);\n            Point.super.call(this, width, height);\n        },\n        properties: {\n            x: 0,\n            y: 0,\n            superIdentifier: function (x, y) {\n                return Point.super.prototype.superIdentifier.apply(this, arguments);\n            },\n            superExplicit: function (a, b) {\n                return Point.super.prototype.superExplicit.call(this, a, b);\n            }\n        }\n    });\nmodule.exports = exports = Point;",
  "const spreadFunction1(a, b, ...c) ->\n    log(1)\nconst spreadFunction2(a, b, ...c, d, e) ->\n    log(2)\nconst spreadFunction3(a,b, ...c, {d,e}) ->\n    log(3)": "'use strict';\nfunction spreadFunction1(a, b, ___c) {\n    let c = Array.prototype.slice.call(arguments, 2);\n    log(1);\n}\nfunction spreadFunction2(a, b, ___c, d, e) {\n    let c = Array.prototype.slice.call(arguments, 2, arguments.length - 2);\n    d = arguments[arguments.length - 2];\n    e = arguments[arguments.length - 1];\n    log(2);\n}\nfunction spreadFunction3(a, b, ___c, _ref) {\n    let c = Array.prototype.slice.call(arguments, 2, arguments.length - 1);\n    _ref = arguments[arguments.length - 1];\n    let d = _ref.d;\n    let e = _ref.e;\n    log(3);\n}",
  "# default value for a should be set before b\nconst foo(a = 0, b = a) -> a + b": "'use strict';\nfunction foo(a, b) {\n    if (a == null)\n        a = 0;\n    if (b == null)\n        b = a;\n    return a + b;\n}",
  "export template ->\n    # cannot define classes in templates\n    class Poo": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot for loop in templates\n    for let i = 0; i < 10; i++\n        console.log(i)": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot export in templates\n    export x": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot try/catch in templates\n    try\n        return 0\n    catch e\n        return 1": {
    line: 3,
    column: 5
  },
  "export template ->\n    # cannot throw errors in templates\n    throw new Error": {
    line: 3,
    column: 5
  },
  "export template ->\n    const x = 12\n    # cannot assign to const variables, make sure enforced within template\n    x = 10\n    return x": {
    line: 4,
    column: 5
  },
  "export template ->\n    let x = 12\n    # cannot assign to let variables either.\n    x = 12\n    return x": {
    line: 4,
    column: 5
  },
  "export template ->\n    let x = {y:10}\n    # cannot assign to anything really.\n    x.y = 12\n    return x.y": {
    line: 4,
    column: 5
  },
  "export template (a) ->\n    # cannot assign to parameters either\n    a = 10\n    return a": {
    line: 3,
    column: 5
  },
  "export class Foo\n    constructor: ->\n        # there was a problem with existential operators not processing within class definitions\n        if properties?\n            log(properties)": "'use strict';\nconst ion = require('ion');\nconst Foo = ion.defineClass({\n        name: 'Foo',\n        constructor: function Foo() {\n            if (properties != null) {\n                log(properties);\n            }\n        }\n    });\nmodule.exports = exports = Foo;",
  "const ctor = @@\nconst ctorName = @@name": "'use strict';\nconst ctor = this.constructor;\nconst ctorName = this.constructor.name;",
  "const inlineThrow() -> throw new Error('inline throw')": "'use strict';\nfunction inlineThrow() {\n    throw new Error('inline throw');\n}",
  "class DynamicExpression\n    watchValue: ->\n        let x = @x ?= []": "'use strict';\nconst ion = require('ion');\nconst DynamicExpression = ion.defineClass({\n        name: 'DynamicExpression',\n        watchValue: function () {\n            let x = this.x = this.x != null ? this.x : [];\n        }\n    });\nDynamicExpression;",
  "let a = new Point(\n    1\n    2\n)": "'use strict';\nlet a = new Point(1, 2);",
  "let x = [y for y in z]": "'use strict';\nlet _ref = [];\nfor (let _i = 0; _i < z.length; _i++) {\n    let y = z[_i];\n    _ref.push(y);\n}\nlet x = _ref;",
  "return\n    z: []\n        let items = [3,2,1]\n        for item in items\n            item * 2": "'use strict';\nlet _ref = [];\n{\n    let items = [\n            3,\n            2,\n            1\n        ];\n    for (let _i = 0; _i < items.length; _i++) {\n        let item = items[_i];\n        _ref.push(item * 2);\n    }\n}\nreturn { z: _ref };",
  "let x = `y == null`": "'use strict';\nlet x = y == null;",
  "# should get accurate error locations even from inline javascript expressions\nlet x = `y := null`": {
    line: 2,
    column: 13
  },
  "let x = 0 in Array\nlet y = \"foo\" instanceof String": "'use strict';\nlet x = 0 in Array;\nlet y = 'foo' instanceof String;",
  "let output\noutput :=\n    x: 1\n    y: 2": "'use strict';\nconst ion = require('ion');\nlet output;\noutput = ion.patch(output, {\n    x: 1,\n    y: 2\n});",
  "output:\n    for a in b\n        [c]: d": "'use strict';\nfor (let _i = 0; _i < b.length; _i++) {\n    let a = b[_i];\n    output[c] = d;\n}",
  "output: {}\n    x: 1": {
    line: 1,
    column: 9
  },
  "[output]:\n    x: 1": {
    line: 1,
    column: 2
  },
  "#\n#\n\n#": "'use strict';",
  "[a for a in b]\n[a for a in c]": "'use strict';\nlet _ref = [];\nfor (let _i = 0; _i < b.length; _i++) {\n    let a = b[_i];\n    _ref.push(a);\n}\n_ref;\nlet _ref2 = [];\nfor (let _i2 = 0; _i2 < c.length; _i2++) {\n    let a = c[_i2];\n    _ref2.push(a);\n}\n_ref2;",
  "let array = []\n    1, 0, 0\n    0, 1, 0\n    0, 0, 1": "'use strict';\nlet array = [\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n    ];",
  "import(foo).bar": "'use strict';\nrequire(foo).bar;",
  "let x = []\n    ->": "'use strict';\nlet x = [function () {\n        }];",
  "x:\n    delete: true": "'use strict';\nx.delete = true;",
  "return\n    style:\n        fontSize: \"0.7em\"\n    \"delete\"": "'use strict';\nconst ion = require('ion');\nlet _ref = {};\n{\n    _ref.style = ion.patch(_ref.style, { fontSize: '0.7em' });\n    ion.add(_ref, 'delete');\n}\nreturn _ref;",
  "content:\n    name: 'foo'\n    1\n    2": "'use strict';\nconst ion = require('ion');\n{\n    content.name = 'foo';\n    ion.add(content, 1);\n    ion.add(content, 2);\n}",
  "for name, file of directory\n    write(name, file)\nelse\n    delete(name)": "'use strict';\nfor (let name in directory) {\n    let file = directory[name];\n    write(name, file);\n}",
  "foo(\n    bar()\n    baz(\n        1\n        2\n    )\n)": "'use strict';\nfoo(bar(), baz(1, 2));",
  "\n            console.log('ion')": "'use strict';\nconsole.log('ion');"
};

if (global.window != null) {
  return;
}

exports.test = function() {
  var e, error, expected, input, key, loc, options, output, value;
  for (input in tests) {
    expected = tests[input];
    options = {
      target: 'es6'
    };
    if (expected === null) {
      loc = false;
      console.log('---------------------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        postprocess: false,
        loc: loc
      }, options)), null, '  '));
      console.log('-Postprocessed-------------------------------------');
      console.log(JSON.stringify(index.compile(input, ion.patch({
        generate: false,
        loc: loc
      }, options)), null, '  '));
      console.log('---------------------------------------------------');
      console.log(index.compile(input, ion.patch({
        loc: loc
      }, options)));
    } else if (typeof expected === 'object') {
      error = null;
      try {
        index.compile(input, options);
      } catch (_error) {
        e = _error;
        error = e;
        for (key in expected) {
          value = expected[key];
          if (value !== e[key]) {
            throw new Error("\n" + (JSON.stringify(e)) + "\n!=\n" + (JSON.stringify(expected)));
          }
        }
      }
      if (error == null) {
        throw new Error("Expected an error: " + (JSON.stringify(expected)));
      }
    } else {
      output = index.compile(input, options);
      if (output.trim() !== expected.trim()) {
        console.log('-Output---------------------------------------------');
        console.log(output);
        throw new Error("\n" + output + "\n!=\n" + expected);
      }
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/ionCompiler',_ion_test_ionCompiler_);
    else
      _ion_test_ionCompiler_.call(this, module, exports, require);
  }
  else {
    _ion_test_ionCompiler_.call(this);
  }
}).call(this)