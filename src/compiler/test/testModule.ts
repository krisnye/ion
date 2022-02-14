import { strict as assert } from "assert";
import { Compiler } from "../Compiler";
import { parsing } from "../phases/parsing";
import { Phase } from "../phases/Phase";

export function testModule(source: string, expected: string | object, finalPhase: Phase = parsing) {
    let compiler = new Compiler();
    let filename = "test";
    let result = compiler.compile(
        new Map([
            [filename, source]
        ]),
        { finalPhase },
    );
    let module = result.get(filename);
    let actual = typeof expected === "string" ? module.toString() : JSON.stringify(module);
    if (typeof expected !== "string") {
        expected = JSON.stringify(expected);
    }
    if (actual != expected) {
        // console.log(tokens);
        console.log(actual);
    }
    assert.equal(actual, expected, source);
}
