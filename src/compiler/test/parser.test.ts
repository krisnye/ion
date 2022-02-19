import { strict as assert } from "assert";
import { parsing } from "../phases/parsing";
import { testExpression } from "./testExpression";
import { testModule } from "./testModule";

// //  literals
// testExpression("1.8", `1.8`);
// //  binary operations
// testExpression("+ - !1.8", `+ - ! 1.8`);
// testExpression("1 + 2", `1 + 2`);
// testExpression("1.0 - 2.0", `1.0 - 2.0`);
// testExpression("1 + 2 * 3", `1 + 2 * 3`);
// testExpression("1 * 2 + 3", `1 * 2 + 3`);
// testExpression("(1 + 2) * 3", `(1 + 2) * 3`);
// //  right associativity
// testExpression("1 ** 2 ** 3", `1 ** 2 ** 3`);
// //  member
// testExpression("x[2]", `x[2]`);
// testExpression("x.y", `x . y`);
// testExpression("x.y.z", `x . y . z`);
// //  unary
// testExpression("-1", `- 1`);
// testExpression("-1.0", `- 1.0`);
// //  unary operator and exponentiation ambiguity
// assert.throws(
//     () => testExpression("-1 ** 2", `- 1 ** 2`)
// );
// testExpression("-(1 ** 2)", `- (1 ** 2)`);
// testExpression("+(1 ** 2)", `+ (1 ** 2)`);
// testExpression("(- 1) ** 2", `(- 1) ** 2`);
// //  various
// testExpression("x", {"":"Identifier","name":"x"});
// testExpression("void x", `void x`);
// testExpression("void x = y = 3", `void x = y = 3`);
// testExpression("1 * (2 + 3)", `1 * (2 + 3)`);
// testExpression("1*(2+3)", `1 * (2 + 3)`);
// //  sequences
// testExpression("a, b", {"":"BinaryOperation","left":{"":"Identifier","name":"a"},"operator":{"type":"Operator","source":","},"right":{"":"Identifier","name":"b"}});
// testExpression("a, b, c", `a , b , c`);
// //  calls
// testExpression("a(1)", `a(1)`);
// testExpression("a(1, 2)", `a(1 , 2)`);
// //  assignment operations
// testExpression("a += 1", `a += 1`);
// for (let op of ["+", "-", "**", "*", "/", "%", "<<", ">>", "^", "&", "|", "&&", "||"]) {
//     testExpression(`a ${op}= 1`, `a ${op}= 1`);
// };
// //  unknown operators
// testExpression("a ?!!= 1", "a ?!!= 1");
// //  if expressions
// testExpression(
// `if x
//     y
// `,
// `if x {\n    y\n}`
// );

// testExpression(
// `if x
//     y
// else
//     z
// `,
// `if x {\n    y\n} else {\n    z\n}`);

// testExpression(
// `if x
//     y
// else if z
//     w
// `,
// `if x {\n    y\n} else if z {\n    w\n}`);

// //  return
// testExpression(`return x`, {"":"Return","value":{"":"Identifier","name":"x"}});

// //  variables
// testExpression(
// `x: Number`,
// `x : Number`
// );

// testExpression(
// `x: Number | String = 1 | 2`,
// `x : Number | String = 1 | 2`
// );

// //  class
// testExpression(
// `class Vector
//     x: Number
//     y: Number
// `,
// `class Vector {\n    x : Number\n    y : Number\n}`
// );

//  for loops
testExpression(
`for x in y
    z
`,
`for x in y {\n    z\n}`
);

//  Functions
testExpression(
`(a, b) => 12`,
`(a , b) => 12`
);

testExpression(
`a => 1`,
`a => 1`,
);

testExpression(
`(a, b) =>
    x
    return y
`,
`(a , b) => {\n    x\n    return y\n}`
);

testExpression(
`(a: Number): A | B => 1 | 2`,
`(a : Number) : A | B => 1 | 2`,
);

//  modules
assert.throws(() =>
testModule(`
x y z`,
``,
{ log: false })
);

testModule(
`x
y`,
`module test {\n    x\n    y\n}`,
{ finalPhase: parsing },
);

testModule(
`
@Meta(1)
x = 10
`,
`module test {\n    @Meta(1)\n    x = 10\n}`,
{ finalPhase: parsing },
);

testModule(
`foo()
`,
`module test {\n    foo()\n}`,
{ finalPhase: parsing },
);

testModule(
`foo
    a
`,
`module test {\n    foo\n    {\n        a\n    }\n}`,
{ finalPhase: parsing },
);

testModule(
`

foo = []
`,
`module test {\n    foo = []\n}`,
{ finalPhase: parsing },
);

testModule(
`

\`+\` = []
`,
`module test {\n    + = []\n}`,
{ finalPhase: parsing },
);

testModule(
`
class Foo
`,
`module test {\n    class Foo {}\n}`,
{ finalPhase: parsing },
)
