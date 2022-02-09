import { strict as assert } from "assert"
import { Compiler, Options } from "../Compiler";
import { create } from "@glas/diff-logger";
import path from "path";

const perfTest = false;
let options: Options = {
    inputs: [path.join(__dirname, "../../../src/ion")],
    output: path.join(__dirname, "../../../dist"),
    logger: perfTest ? (() => {}) : create("./output.html") as any,
};
let compiler = new Compiler(options);
let start = Date.now();
let count = perfTest ? 1000 : 1;
for (let i = 0; i < count; i++) {
    let result = compiler.compile();
}
let finish = Date.now();
let time = finish - start;

console.log(`Time: ${time}`);
assert(true);
