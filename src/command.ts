#!/usr/bin/env node
import * as np from "path"
import Compiler from "./Compiler"


function parseArgs() {
    let usage = 'Usage: ion output root+ -c|-w module+'

    let args = process.argv.slice(2)

    // console.log(args)

    if (args.length < 4) {
        console.log('too few arguments')
        console.log(usage)
        return
    }

    let flagIndex = -1
    let watch = false
    if (args.indexOf('-w') > 0) {
        flagIndex = args.indexOf('-w')
        watch = true
    } else if (args.indexOf('-c') > 0) {
        flagIndex = args.indexOf('-c')
    }

    if (flagIndex < 0) {
        console.log('-c|-w flag missing')
        console.log(usage)
        return
    }

    if (watch)
        console.warn('Watch is not implemented yet, one-time compiling instead.')

    return {
        output: args[0],
        roots: args.slice(1, flagIndex),
        modules: args.slice(flagIndex + 1),
        watch
    }
}

function main() {

    let args = parseArgs()
    if (!args) return

    let ionSrc = np.join(__dirname, '../ionsrc')
    let output = np.join(process.cwd(), args.output)
    let roots = args.roots.map((dir) => np.join(process.cwd(), dir)).concat([ionSrc])
    let compiler = new Compiler({roots, output})

    let time = process.hrtime()

    for (let module of args.modules)
        compiler.compile(module)

    let diff = process.hrtime(time)
    let seconds = diff[0] + diff[1] / 1e9
    console.log('seconds: ', seconds)
}

main()