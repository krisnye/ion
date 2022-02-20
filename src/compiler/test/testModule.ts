import { strict as assert } from "assert";
import { Compiler } from "../Compiler";
import { parsing } from "../phases/parsing";
import { Phase } from "../phases/Phase";

export type Options = {
    finalPhase?: Phase
    log?: boolean
}

//  number implies error count
export function testModule(source: string, expected: string | object | number, options: Options = { log: true }) {
    let compiler = new Compiler({
        log(value) {
        }
    });
    let filename = "test";
    let result = compiler.compile(
        new Map([
            [filename, source]
        ]),
        { finalPhase: options.finalPhase },
    );
    if (Array.isArray(result)) {
        if (typeof expected === "number") {
            assert.equal(result.length, expected, `Expected ${expected} errors, actual: ${result.length}`);
        }
        else {
            assert.fail(`Unexpected errors: ${result}`);
        }
    }
    else {
        let module = result.get(filename);
        let actual = typeof expected === "string" ? module.toString() : JSON.stringify(module);
        if (typeof expected !== "string") {
            expected = JSON.stringify(expected);
        }
        if (actual != expected) {
            // console.log(tokens);
            if (options.log) {
                console.log(actual);
            }
        }
        assert.equal(actual, expected, source);
    }
}