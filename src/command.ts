#!/usr/bin/env node
import * as np from "path"
import Compiler from "./Compiler"
import {read, write} from "./common"
import * as HtmlLogger from "./HtmlLogger"

var args = process.argv.slice(2)

let path = args[0]

let input = np.join(process.cwd(), path, "src")
let output = np.join(process.cwd(), path, "lib")
let logger = HtmlLogger.create(np.join(process.cwd(), path, "lib/passes.html"))
let compiler = new Compiler({input, output, logger})
compiler.compile()