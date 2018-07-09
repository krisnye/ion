#!/usr/bin/env node
import * as np from "path"
import Compiler from "./Compiler"
import {read, write} from "./common"
import * as HtmlLogger from "./HtmlLogger"

var args = process.argv.slice(2)

if (args.length < 2) {
    console.log('Usage: ion output root+')
}

let ionSrc = np.join(__dirname, '../ionsrc')
let output = np.join(process.cwd(), args[0])
let roots = args.slice(1).map((dir) => np.join(process.cwd(), dir)).concat([ionSrc])
function loggerFactory() {
    return HtmlLogger.create(np.join(output,  "debug.html"))
}
let compiler = new Compiler({roots, output, loggerFactory})

let time = process.hrtime()

compiler.compile("ion.Number")

let diff = process.hrtime(time)
let seconds = diff[0] + diff[1] / 1e9
console.log('seconds: ', seconds)