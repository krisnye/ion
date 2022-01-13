import { strict as assert } from "assert"
import Compiler, { Options } from "../Compiler";
import { create } from "@glas/diff-logger";
import path from "path";

const perfTest = false

let compiler = new Compiler(perfTest ? (() => {}) : create("./output.html") as any)
let start = Date.now()
let count = perfTest ? 1000 : 1
for (let i = 0; i < count; i++) {
    let result = compiler.compile(
        Object.assign(
            new Options(
                [path.join(__dirname, "../../../ionsrc"), path.join(__dirname, "../../../src/compiler/test/ionsrc")],
                path.join(__dirname, "../../../dist"),
            ),
            {
                commandLine: true,
                // treat the sample as the root namespace.
                namespace: "",
            }
        )
    )
}
let finish = Date.now()
let time = finish - start

console.log(`Time: ${time}`)

assert(true)
