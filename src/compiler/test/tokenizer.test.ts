import { strict as assert } from "assert";
import { createTokenizer } from "../tokenizer/createTokenizer";
import { tokenTypes } from "../tokenizer/TokenType";

let tokenizer = createTokenizer();

function test(line: string, expectedResult: string) {
    let tokens = tokenizer.tokenize("test.ion", line);
    let actualResult = tokens.filter(
        token => token.type != tokenTypes.Whitespace.name).map(
            token => [token.type, tokenTypes[token.type].isWhitespace ? JSON.stringify(token.source) : token.value ?? token.source].join(":")
        ).join("\n"
    );
    if (actualResult !== expectedResult) {
        console.log(actualResult);
    }
    assert.equal(actualResult, expectedResult, line);
}

test("f",
`Id:f`);

test("foo",
`Id:foo`);

test("    foo: bar = () => a.b // foo",
`Indent:"    "
Id:foo
Operator::
Id:bar
Operator:=
OpenParen:(
CloseParen:)
Operator:=>
Id:a
Operator:.
Id:b
Comment:// foo
Outdent:""`
);

test(`"foo\\"bar"`, `String:foo"bar`);

test(`foo##bar`,
`Id:foo
Unknown:##
Id:bar`
);

test(
`
foo
        x
        y
            a
            b
        z
`,
`Eol:"\\n"
Id:foo
Eol:"\\n"
Indent:"    "
Indent:"    "
Id:x
Eol:"\\n"
Id:y
Eol:"\\n"
Indent:"    "
Id:a
Eol:"\\n"
Id:b
Eol:"\\n"
Outdent:""
Id:z
Eol:"\\n"
Outdent:""
Outdent:""`)

test(
`
foo
    x
    y
        a
        b
    z
`,
`Eol:"\\n"
Id:foo
Eol:"\\n"
Indent:"    "
Id:x
Eol:"\\n"
Id:y
Eol:"\\n"
Indent:"    "
Id:a
Eol:"\\n"
Id:b
Eol:"\\n"
Outdent:""
Id:z
Eol:"\\n"
Outdent:""`)