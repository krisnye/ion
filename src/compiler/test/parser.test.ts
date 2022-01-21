import { strict as assert } from "assert";
import { createTokenizer } from "../tokenizer/createTokenizer";
import { createParser } from "../parser/createParser";

let parser = createParser();
let tokenizer = createTokenizer();

function test(source: string, expected: string) {
    let tokens = tokenizer.tokenize("test.ion", source);
    parser.setTokens(tokens);
    let expression = parser.parseExpression();
    let actual = JSON.stringify(expression);
    if (actual != expected) {
        console.log(tokens);
        console.log(actual);
    }
    assert.equal(actual, expected, source);
}

//  literals
test("1.8", `{"":"FloatLiteral","value":1.8}`)
//  binary operations
test("+ - !1.8", `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"!"},"arguments":[{"":"FloatLiteral","value":1.8}]}]}]}`)
test("1 + 2", `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}`)
test("1.0 - 2.0", `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"FloatLiteral","value":1},{"":"FloatLiteral","value":2}]}`)
test("1 + 2 * 3", `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}`)
test("1 * 2 + 3", `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]},{"":"IntegerLiteral","value":3}]}`)
//  right associativity
test("1 ** 2 ** 3", `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}`)
//  member
test("x[2]", `{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"IntegerLiteral","value":2},"computed":true}`)
test("x.y", `{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"Identifier","name":"y"},"computed":false}`)
test("x.y.z", `{"":"Member","object":{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"Identifier","name":"y"},"computed":false},"property":{"":"Identifier","name":"z"},"computed":false}`)
//  unary
test("-1", `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"IntegerLiteral","value":1}]}`)
test("-1.0", `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"FloatLiteral","value":1}]}`)
//  unary operator and exponentiation ambiguity
assert.throws(
    () => test("-1 ** 2", `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":-1},{"":"IntegerLiteral","value":2}]}`)
)
test("-(1 ** 2)", `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"Sequence","nodes":[{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}]}]}`);
test("+(1 ** 2)", `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Sequence","nodes":[{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}]}]}`);
test("(- 1) ** 2", `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"Sequence","nodes":[{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"IntegerLiteral","value":1}]}]},{"":"IntegerLiteral","value":2}]}`);
//  various
test("x", `{"":"Identifier","name":"x"}`)
test("void x", `{"":"Call","callee":{"":"Identifier","name":"void"},"arguments":[{"":"Identifier","name":"x"}]}`)
test("void x = y = 3", `{"":"Call","callee":{"":"Identifier","name":"void"},"arguments":[{"":"Assignment","id":{"":"Identifier","name":"x"},"value":{"":"Assignment","id":{"":"Identifier","name":"y"},"value":{"":"IntegerLiteral","value":3}}}]}`)
test("1 * (2 + 3)", `{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Sequence","nodes":[{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}]}`);
test("1*(2+3)", `{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Sequence","nodes":[{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}]}`);
//  Sequences
test("a, b", `{"":"Sequence","nodes":[{"":"Identifier","name":"a"},{"":"Identifier","name":"b"}]}`)
test("a, b, c", `{"":"Sequence","nodes":[{"":"Identifier","name":"a"},{"":"Identifier","name":"b"},{"":"Identifier","name":"c"}]}`)
test("a,b,c,d", `{"":"Sequence","nodes":[{"":"Identifier","name":"a"},{"":"Identifier","name":"b"},{"":"Identifier","name":"c"},{"":"Identifier","name":"d"}]}`)
//  Calls
test("a(1)", `{"":"Call","callee":{"":"Identifier","name":"a"},"arguments":[{"":"IntegerLiteral","value":1}]}`)
test("a(1, 2)", `{"":"Call","callee":{"":"Identifier","name":"a"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}`)
test("a(1, 2 + 3)", `{"":"Call","callee":{"":"Identifier","name":"a"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}`)
//  Assignment Operations
test("a += 1", `{"":"Assignment","id":{"":"Identifier","name":"a"},"value":{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Identifier","name":"a"},{"":"IntegerLiteral","value":1}]}}`)
for (let op of ["+", "-", "**", "*", "/", "%", "<<", ">>", "^", "&", "|", "&&", "||"]) {
    test(`a ${op}= 1`, `{"":"Assignment","id":{"":"Identifier","name":"a"},"value":{"":"Call","callee":{"":"Identifier","name":"${op}"},"arguments":[{"":"Identifier","name":"a"},{"":"IntegerLiteral","value":1}]}}`)
}
//  if expressions
test(
`if x
    y
`,
`{"":"Conditional","test":{"":"Identifier","name":"x"},"consequent":{"":"Block","nodes":[{"":"Identifier","name":"y"}]},"alternate":null}`);

test(
`if x
    y
else
    z
`,
`{"":"Conditional","test":{"":"Identifier","name":"x"},"consequent":{"":"Block","nodes":[{"":"Identifier","name":"y"}]},"alternate":{"":"Block","nodes":[{"":"Identifier","name":"z"}]}}`
);

test(
`if x
    y
else if z
    w
`,
`{"":"Conditional","test":{"":"Identifier","name":"x"},"consequent":{"":"Block","nodes":[{"":"Identifier","name":"y"}]},"alternate":{"":"Conditional","test":{"":"Identifier","name":"z"},"consequent":{"":"Block","nodes":[{"":"Identifier","name":"w"}]},"alternate":null}}`
)
