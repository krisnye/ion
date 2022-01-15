import { strict as assert } from "assert";
import { createTokenizer } from "../tokenizer/createTokenizer";
import { tokenTypes } from "../tokenizer/TokenType";
import { createParser } from "../parser/createParser";

let parser = createParser();
let tokenizer = createTokenizer();

function testParseExpression(source: string, expected: string) {
    let { tokens } = tokenizer.tokenizeLine("test.ion", source, 0);
    parser.setTokens(tokens.filter(token => token.type !== tokenTypes.Whitespace.name));
    let expression = parser.parseExpression(0);
    let actual = JSON.stringify(expression);
    if (actual != expected) {
        console.log(actual);
    }
    assert.equal(actual, expected, source);
}

testParseExpression(
    "+ - !1.8",
    `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"!"},"arguments":[{"":"FloatLiteral","value":1.8}]}]}]}`
)

testParseExpression(
    "1.8",
    `{"":"FloatLiteral","value":1.8}`
)

testParseExpression(
    "1 + 2",
    `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}`
)

testParseExpression(
    "1.0 - 2.0",
    `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"FloatLiteral","value":1},{"":"FloatLiteral","value":2}]}`
)

testParseExpression(
    "1 + 2 * 3",
    `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}`
)

testParseExpression(
    "1 * 2 + 3",
    `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"*"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]},{"":"IntegerLiteral","value":3}]}`
)

//  test right associativity
testParseExpression(
    "1 ** 2 ** 3",
    `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":2},{"":"IntegerLiteral","value":3}]}]}`
)

testParseExpression(
    "x[2]",
    `{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"IntegerLiteral","value":2},"computed":true}`
)

testParseExpression(
    "x.y",
    `{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"Identifier","name":"y"},"computed":false}`
)

testParseExpression(
    "x.y.z",
    `{"":"Member","object":{"":"Member","object":{"":"Identifier","name":"x"},"property":{"":"Identifier","name":"y"},"computed":false},"property":{"":"Identifier","name":"z"},"computed":false}`
)

testParseExpression(
    "-1",
    `{"":"IntegerLiteral","value":-1}`
)

testParseExpression(
    "-1.0",
    `{"":"FloatLiteral","value":-1}`
)

testParseExpression(
    "-1 ** 2",
    `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":-1},{"":"IntegerLiteral","value":2}]}`
)

testParseExpression(
    "- 1 ** 2",
    `{"":"Call","callee":{"":"Identifier","name":"-"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}]}`
)

testParseExpression(
    "+1 ** 2",
    `{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}`
)

testParseExpression(
    "+ 1 ** 2",
    `{"":"Call","callee":{"":"Identifier","name":"+"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"**"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}]}`
)

testParseExpression(
    "x",
    `{"":"Identifier","name":"x"}`
)

testParseExpression(
    "void x",
    `{"":"Call","callee":{"":"Identifier","name":"void"},"arguments":[{"":"Identifier","name":"x"}]}`
)

// this has to be turned into assignments
testParseExpression(
    "void x = y = 3",
    `{"":"Call","callee":{"":"Identifier","name":"void"},"arguments":[{"":"Call","callee":{"":"Identifier","name":"="},"arguments":[{"":"Identifier","name":"x"},{"":"Call","callee":{"":"Identifier","name":"="},"arguments":[{"":"Identifier","name":"y"},{"":"IntegerLiteral","value":3}]}]}]}`
)

