import { strict as assert } from "assert";
import { createParser } from "../parser/createParser";
import { createTokenizer } from "../tokenizer/createTokenizer";

let parser = createParser();
let tokenizer = createTokenizer();

export function testExpression(source: string, expected: string | object) {
    let filename = "test.ion";
    let tokens = tokenizer.tokenize(filename, source);
    parser.setTokens(tokens);
    let expression = parser.parseExpression();
    let actual = typeof expected === "string" ? expression.toString() : JSON.stringify(expression);
    if (typeof expected !== "string") {
        expected = JSON.stringify(expected);
    }
    if (actual != expected) {
        // console.log(tokens);
        console.log(actual);
    }
    assert.equal(actual, expected, source);
}
