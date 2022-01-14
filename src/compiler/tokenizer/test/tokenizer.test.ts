import { strict as assert } from "assert";
import { Tokenizer } from "../Tokenizer";

let tokenizer = new Tokenizer();

let lines = tokenizer.tokenizeFile("sample.ion" ,
`
        hello = () => foo
`);

console.log(JSON.stringify(lines, null, "  "));
