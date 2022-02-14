import { strict as assert } from "assert"
import { Compiler, CompilerOptions, PhaseLogger } from "../Compiler";
import { create } from "@glas/diff-logger";
import path from "path";

const perfTest = false;
let compiler = new Compiler();
let start = Date.now();
let count = perfTest ? 1000 : 1;
for (let i = 0; i < count; i++) {
    let result = compiler.compile(
        Compiler.getFiles([path.join(__dirname, "../../../src/ion")]),
        {
            logger: perfTest ? (() => {}) : create("./output.html") as PhaseLogger
        }
    );
}
let finish = Date.now();
let time = finish - start;

console.log(`Time: ${time}`);
assert(true);
