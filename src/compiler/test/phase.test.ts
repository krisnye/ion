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
opsToNodes,
)

testModule(
`
x +++= 2 * 10
`,
`module test {
    x = +++(x,*(2,10))
}`,
opsToNodes,
)