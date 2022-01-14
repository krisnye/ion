import { strict as assert } from "assert";
import { ADDRGETNETWORKPARAMS } from "dns";
import { Tokenizer } from "../Tokenizer";
import { tokenTypes } from "../TokenType";

let tokenizer = new Tokenizer();

function testLine(line: string, expectedResult: string) {
    let { tokens } = tokenizer.tokenizeLine("test.ion", line, 1);
    let actualResult = tokens.filter(token => token.type != tokenTypes.Whitespace.name).map(token => [token.type, token.value ?? token.source].join(":")).join("\n");
    if (actualResult !== expectedResult) {
        console.log(actualResult);
    }
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
Comment:// foo`
);

testLine(`"foo\\"bar"`, `String:foo"bar`);

testLine(`foo##bar`,
`Id:foo
Unknown:##
Id:bar`
);

assert.deepEqual(JSON.parse(JSON.stringify(tokenizer.tokenizeFile("foo.ion", `
foo = bar
    doo()
        baz .. quz
`))), [{"tokens":[],"children":[]},{"tokens":[{"type":"Id","source":"foo","location":{"filename":"foo.ion","start":{"line":2,"column":1},"finish":{"line":2,"column":4}}},{"type":"Whitespace","source":" ","location":{"filename":"foo.ion","start":{"line":2,"column":4},"finish":{"line":2,"column":5}}},{"type":"Operator","source":"=","location":{"filename":"foo.ion","start":{"line":2,"column":5},"finish":{"line":2,"column":6}}},{"type":"Whitespace","source":" ","location":{"filename":"foo.ion","start":{"line":2,"column":6},"finish":{"line":2,"column":7}}},{"type":"Id","source":"bar","location":{"filename":"foo.ion","start":{"line":2,"column":7},"finish":{"line":2,"column":10}}}],"children":[]},{"tokens":[{"type":"Tab","source":"    ","value":1,"location":{"filename":"foo.ion","start":{"line":3,"column":1},"finish":{"line":3,"column":5}}},{"type":"Id","source":"doo","location":{"filename":"foo.ion","start":{"line":3,"column":5},"finish":{"line":3,"column":8}}},{"type":"Open","source":"(","location":{"filename":"foo.ion","start":{"line":3,"column":8},"finish":{"line":3,"column":9}}},{"type":"Close","source":")","location":{"filename":"foo.ion","start":{"line":3,"column":9},"finish":{"line":3,"column":10}}}],"children":[]},{"tokens":[{"type":"Tab","source":"        ","value":2,"location":{"filename":"foo.ion","start":{"line":4,"column":1},"finish":{"line":4,"column":9}}},{"type":"Id","source":"baz","location":{"filename":"foo.ion","start":{"line":4,"column":9},"finish":{"line":4,"column":12}}},{"type":"Whitespace","source":" ","location":{"filename":"foo.ion","start":{"line":4,"column":12},"finish":{"line":4,"column":13}}},{"type":"Operator","source":"..","location":{"filename":"foo.ion","start":{"line":4,"column":13},"finish":{"line":4,"column":15}}},{"type":"Whitespace","source":" ","location":{"filename":"foo.ion","start":{"line":4,"column":15},"finish":{"line":4,"column":16}}},{"type":"Id","source":"quz","location":{"filename":"foo.ion","start":{"line":4,"column":16},"finish":{"line":4,"column":19}}}],"children":[]},{"tokens":[],"children":[]}])
