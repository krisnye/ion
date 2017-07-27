import * as np from "path"
import Compiler from "../Compiler"
import * as HtmlLogger from "../HtmlLogger"

let input = np.join(process.cwd(), "compiler/test")
let output = np.join(process.cwd(), "lib/compiler/test")
let logger = HtmlLogger.create(np.join(process.cwd(), "lib/compiler/test/passes.html"))
let compiler = new Compiler({input, output, namespace:"sample", logger})
compiler.compile()
