import { strict as assert } from "assert"
import Compiler, { Options } from "../Compiler";
import * as HtmlLogger from "../HtmlLogger";
import path from "path";

const perfTest = false

let compiler = new Compiler(perfTest ? (() => {}) : HtmlLogger.create("./output.html"))
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
                commandLine: true
            }
        )
    )
}
let finish = Date.now()
let time = finish - start

console.log(`Time: ${time}`)

assert(true)
