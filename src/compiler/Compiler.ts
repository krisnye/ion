import * as common from "./common";
import fs from "fs";
import defaultPhases, { noEmit } from "./phases";
// we need the path to lib so the code works in normal compile and in parcel
import Parser = require("../../lib/compiler/parser");
import watchDirectory from "./watchDirectory";
import { copyResource } from "./phases/copyResources";

type Logger = (names?: string | string[], ast?: any) => void
const NullLogger = () => {}

export class Options {

    inputs: string[]
    output: string
    namespace: string
    parser!: ReturnType<typeof Parser>
    debug: boolean
    emit: boolean
    errors: Array<any>
    commandLine = false

    constructor(
        inputs: string[],
        output: string,
        namespace: string = common.findPackage()?.name ?? "_compiling_",
        debug = true,
        emit = true,
    ) {
        this.namespace= namespace
        this.inputs = inputs
        this.output = output
        this.debug = debug
        this.emit = emit
        this.errors = []
    }

    static from(options) {
        if (options instanceof Options) {
            return options
        }
        return new Options(
            options.inputs || [],
            options.output || "",
            options.namespace,
            options.debug || false,
            options.emit || (options.output != null && options.output.length > 0),
        )
    }

}

type OptionsJSON = {
    inputs?: string[]
    output?: string
    namespace?: string
    parser?: ReturnType<typeof Parser>
    debug?: boolean
    emit?: boolean
    commandLine?: boolean
}

type CompileSingleResult = {
    output?: string
    error?: Error
    map?: any
}

export function compileSingle(source: string, debug = true, name = "sample", ext: ".mjs" | ".js" = ".js"): CompileSingleResult {
    let output = compileSample(source, name, debug, ext)
    if (typeof output === 'string') {
        return { output }
    }
    else {
        return { error: output as Error }
    }
}

export function compileSample(text: string, name = "sample", debug = true, ext: ".mjs" | ".js" = ".mjs"): string | Error {
    let emit = false
    let compiler = new Compiler(() => {})
    let options = new Options([], "null", "none", debug, emit)
    let results = compiler.compile(options, { [name]: text })
    if (results.errors.length > 0) {
        return results.errors[0]
    }
    return "[compileSample returns nothing now]"
}

export type Results = {
    phases: Map<Function, any>
    errors: Error[]
}

export default class Compiler {

    logger: Logger

    constructor(logger: Logger = () => {}) {
        this.logger = logger
    }

    watch(optionsOrJson: Options | OptionsJSON) {
        let options = Options.from(optionsOrJson)
        //  first compile normal
        this.compile(options)
        //  then watch files for changes
        for (let input of options.inputs) {
            watchDirectory(input, {}, (filename, previous, current, change) => {
                //  incrementally recompile just this file
                if (filename.endsWith(common.ionExt)) {
                    let start = Date.now()
                    let content = common.read(filename)
                    let path = common.getPathFromFilename(options.namespace, filename.slice(input.length + 1))
                    // console.log({ filename, change, path, content })
                    //  we *really* should also kickoff a full recompile in a separate thread
                    //  or maybe the fast compile should be in the other thread
                    // always reset options errors
                    options.errors.length = 0
                    this.compile(options, { [path]: content }, defaultPhases, NullLogger)
                    let stop = Date.now()
                    let time = stop - start
                    console.log(`${filename} => ${time}ms`)
                }
                else {
                    // we just copy it as content.
                    let stats = fs.statSync(filename)
                    if (stats && !stats.isDirectory()) {
                        let path = filename.slice(input.length + 1)
                        copyResource(path, filename, options)
                    }
                }
            })
        }
    }

    compile(
        optionsOrJson: Options | OptionsJSON,
        files?: { [path: string]: string },
        phases: any = undefined,
        logger = this.logger
    ): Results {
        let options = Options.from(optionsOrJson)
        if (phases == null) {
            phases = options.emit ? defaultPhases : noEmit
        }
        options.parser = Parser()
        if (files == null) {
            files = common.getInputFilesRecursive(options.inputs, options.namespace)
        }
        function printErrorConsole(e) {
            let location = e.location
            if (location == null || location.start == null) {
                throw e
            }
            else {
                let { filename } = location
                let source = files?.[filename];
                let error = options.parser.getError(e.message, location, source, filename)
                console.log("")
                console.log(error.message.trim())
            }
        }

        let errors = options.errors
        let phaseResults = new Map<any,any>()
        let root: any = files
        logger("Input", root)
        let lastPhase
        try {
            for (let phase of phases) {
                // console.log(phase.name)
                lastPhase = phase
                let before = errors.length
                root = phase(root, options) || root
                let after = errors.length
                let count = after - before
                if (count > 0) {
                    console.log(phase.name + ": Errors: " + count)
                }
                phaseResults.set(phase, root)
                logger(phase.name, root)
            }
            logger("Output", root)
            logger()
        }
        catch (e) {
            logger()
            errors.push(e)
            if (options.commandLine) {
                console.log(lastPhase?.name)
                printErrorConsole(e)
                console.log("")
            }
        }

        if (options.errors.length > 0) {
            for (let e of options.errors) {
                printErrorConsole(e)
            }
            console.log("")
        }
        
        return { phases: phaseResults, errors }
    }

}