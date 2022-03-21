import { strict as assert } from "assert";
import { opsToNodes } from "../phases/opsToNodes";
import { testModule } from "./testModule";

// test opsToNodes phase handling of functions and binary operators
testModule(
`
double = () => 2
double = x => 2 * x
double = (x) => 2 * x
double = (x, y) => 2 * x
double = x =>
    x * 2
`,
`module test {
    const double = () => 2
    const double = (var x) => *(2,x)
    const double = (var x) => *(2,x)
    const double = (var x, var y) => *(2,x)
    const double = (var x) => {
        *(x,2)
    }
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
x +++= 2 * 10
`,
`module test {
    x = +++(x,*(2,10))
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
(x, y) = foo()
`,
`module test {
    const _opsToNodes_1 = foo()
    const x = _opsToNodes_1.x
    const y = _opsToNodes_1.y
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
[x, y] = foo()
`,
`module test {
    const _opsToNodes_1 = foo()
    const x = _opsToNodes_1[0]
    const y = _opsToNodes_1[1]
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
foo = ""
    <html>
        <body>
        </body>
    </html>
`,
`module test {
    const foo = "<html>\\n    <body>\\n    </body>\\n</html>\\n"
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
foo = ""
    <html>
        <body>

`,
`module test {
    const foo = "<html>\\n    <body>\\n"
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
foo = ""
    (a, b) =>
        a + b
`,
`module test {
    const foo = "(a, b) =>\\n    a + b\\n"
}`,
{ finalPhase: opsToNodes },
);

testModule(
`
foo()
    1
    bar()
        2
        3
`,
`module test {
    foo(1,bar(2,3))
}`
);

assert.throws(() => {
    testModule(
        `
        @Foo()
        `,
        `module test {\n    @Foo()\n}`
    )
})

testModule(
`
@Foo()
x = 1
`,
`module test {
    const x = 1 {
        @Foo()
    }
}`
)

testModule(
`
add = (a: Number, b: Number): Number => a
`
,
`module test {
    const add = (var a : Number, var b : Number): Number => a
}`
)

testModule(
`
add = (a, b): Number
`
,
`module test {
    const add = (var a, var b): Number
}`
)

testModule(
`
add = (a): Number
`
,
`module test {
    const add = (var a): Number
}`
)

testModule(
`
x = ()
    a
    b
=>
    a + b
`,
`module test {
    const x = (var a, var b) => +(a,b)
}`
)

testModule(
`
x =
    ()
        a
        b
    =>
        a + b
`,
`module test {
    const x = (var a, var b) => +(a,b)
}`
)

testModule(
`
x = (a, b) => a + b
`,
`module test {
    const x = (var a, var b) => +(a,b)
}`
)
        
testModule(
`
x = (a, b) =>
    a + b
`,
`module test {
    const x = (var a, var b) => +(a,b)
}`
)
    