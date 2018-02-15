#!/usr/bin/env node
import * as np from "path"
import Compiler from "./Compiler"
import {read, write} from "./common"
import * as HtmlLogger from "./HtmlLogger"

var args = process.argv.slice(2)

let path = args[0]

let input = np.join(process.cwd(), path, "src")
let output = np.join(process.cwd(), path, "lib")
function loggerFactory() {
    return HtmlLogger.create(np.join(output,  "debug.html"))
}
let compiler = new Compiler({input, output, loggerFactory})
compiler.compile()