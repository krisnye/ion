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

test(``,``);

test("f",
`Id:f`);

test("iff",
`Id:iff`);

test("foo",
`Id:foo`);

test("if class else return",
`If:if
Class:class
Else:else
Return:return`);

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
Outdent:""`);

test(`"foo\\"bar"`, `String:foo"bar`);

test(`foo##bar`,
`Id:foo
Unknown:##
Id:bar`);

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
Outdent:""`);

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
Outdent:""`);

test(
`if x
    y
else if z
    w
`,
`If:if
Id:x
Eol:"\\n"
Indent:"    "
Id:y
Eol:"\\n"
Outdent:""
Else:else
If:if
Id:z
Eol:"\\n"
Indent:"    "
Id:w
Eol:"\\n"
Outdent:""`);

test(
`a

b`,
`Id:a
Eol:"\\n"
Eol:"\\n"
Id:b`);

test(
`foo()`,
`Id:foo
OpenParen:(
CloseParen:)`);

test(
"`+?-*`",
`EscapedId:+?-*`);
