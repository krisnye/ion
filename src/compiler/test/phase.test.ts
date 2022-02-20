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
    const double = (var x,var y) => *(2,x)
    const double = (var x) => {
        *(x,2)
    }
}`,
{ finalPhase: opsToNodes },
)

testModule(
`
x +++= 2 * 10
`,
`module test {
    x = +++(x,*(2,10))
}`,
{ finalPhase: opsToNodes },
)

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
)

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
)
