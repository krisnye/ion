import { strict as assert } from "assert";
import { createTokenizer } from "../../tokenizer/createTokenizer";
import { tokenTypes } from "../../tokenizer/TokenType";
import { createParser } from "../createParser";

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
    `{"":"Call","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":1},"finish":{"":"SourcePosition","line":1,"column":9}},"callee":{"":"Reference","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":1},"finish":{"":"SourcePosition","line":1,"column":2}},"name":"+"},"arguments":[{"":"Call","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":3},"finish":{"":"SourcePosition","line":1,"column":9}},"callee":{"":"Reference","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":3},"finish":{"":"SourcePosition","line":1,"column":4}},"name":"-"},"arguments":[{"":"Call","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":5},"finish":{"":"SourcePosition","line":1,"column":9}},"callee":{"":"Reference","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":5},"finish":{"":"SourcePosition","line":1,"column":6}},"name":"!"},"arguments":[{"":"FloatLiteral","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":6},"finish":{"":"SourcePosition","line":1,"column":9}},"value":1.8}]}]}]}`
)

testParseExpression(
    "1.8",
    `{"":"FloatLiteral","location":{"":"SourceLocation","filename":"test.ion","start":{"":"SourcePosition","line":1,"column":1},"finish":{"":"SourcePosition","line":1,"column":4}},"value":1.8}`
)
