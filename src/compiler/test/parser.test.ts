import { strict as assert } from "assert";
import { createTokenizer } from "../tokenizer/createTokenizer";
import { tokenTypes } from "../tokenizer/TokenType";
import { createParser } from "../parser/createParser";

let parser = createParser();
let tokenizer = createTokenizer();

function testParseExpression(source: string, expected: string) {
    let { tokens } = tokenizer.tokenizeLine("test.ion", source, 0);
    parser.setTokens(tokens.filter(token => token.type !== tokenTypes.Whitespace.name));
    let expression = parser.parseExpression();
    let actual = JSON.stringify(expression);
    if (actual != expected) {
        console.log(actual);
    }
    assert.equal(actual, expected, source);
}

testParseExpression(
    "+ - !1.8",
    `{"":"Call","callee":{"":"Reference","name":"+"},"arguments":[{"":"Call","callee":{"":"Reference","name":"-"},"arguments":[{"":"Call","callee":{"":"Reference","name":"!"},"arguments":[{"":"FloatLiteral","value":1.8}]}]}]}`
)

testParseExpression(
    "1.8",
    `{"":"FloatLiteral","value":1.8}`
)

testParseExpression(
    "1 + 2",
    `{"":"Call","callee":{"":"Reference","name":"+"},"arguments":[{"":"IntegerLiteral","value":1},{"":"IntegerLiteral","value":2}]}`
)

testParseExpression(
    "1.0 - 2.0",
    `{"":"Call","callee":{"":"Reference","name":"-"},"arguments":[{"":"FloatLiteral","value":1},{"":"FloatLiteral","value":2}]}`
)
