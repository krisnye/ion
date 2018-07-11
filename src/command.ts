#!/usr/bin/env node
import * as np from "path"
import Compiler from "./Compiler"

var args = process.argv.slice(2)

if (args.length < 2) {
    console.log('Usage: ion output root+')
}

let ionSrc = np.join(__dirname, '../ionsrc')
let output = np.join(process.cwd(), args[0])
let roots = args.slice(1).map((dir) => np.join(process.cwd(), dir)).concat([ionSrc])
let compiler = new Compiler({roots, output})

let time = process.hrtime()

compiler.compile("sample.Point2")

let diff = process.hrtime(time)
let seconds = diff[0] + diff[1] / 1e9
console.log('seconds: ', seconds)