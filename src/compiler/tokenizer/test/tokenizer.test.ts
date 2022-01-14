import { strict as assert } from "assert";
import { Tokenizer } from "../Tokenizer";
import { tokenTypes } from "../TokenType";

let tokenizer = new Tokenizer();

function testLine(line: string, expectedResult: string) {
    let { tokens } = tokenizer.tokenizeLine("test.ion", line, 1);
    let actualResult = tokens.filter(token => token.type != tokenTypes.Whitespace.name).map(token => [token.type, token.value ?? token.source].join(":")).join("\n");
    console.log("--------------------")
    console.log(actualResult);
    assert.equal(actualResult, expectedResult, line);
}

testLine("f",
`Id:f`);

testLine("foo",
`Id:foo`);

testLine("    foo: bar = () => a.b // foo",
`Tab:1
Id:foo
Operator::
Id:bar
Operator:=
Open:(
Close:)
Operator:=>
Id:a
Operator:.
Id:b
Comment:// foo`);

testLine(`"foo\\"bar"`, `String:foo"bar`)
