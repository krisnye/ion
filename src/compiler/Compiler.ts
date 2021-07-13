import * as common from "./common";
import fs from "fs";
import Phase from "./phases/Phase";
import defaultPhases from "./phases";
// we need the path to lib so the code works in normal compile and in parcel
import Parser = require("../../lib/compiler/parser");
import watchDirectory from "./watchDirectory";
import { copyResource } from "./phases/copyResources";
import getExternalReferences from "./phases/getExternalReferences";
import { Module } from "./ast";
import { join, resolve } from "./pathFunctions";

type Logger = (names?: string | string[] | null, ast?: any, file?: string) => void
const NullLogger = () => {}

export class Options {

    inputs: string[]
    output: string
    namespace: string
    parser!: ReturnType<typeof Parser>
    debug: boolean
    emit: boolean
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
    // let emit = false
    // let compiler = new Compiler(() => {})
    // let options = new Options([], "null", "none", debug, emit)
    // let results = compiler.compile(options, { [name]: text })
    // if (results.errors.length > 0) {
    //     return results.errors[0]
    // }
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
                    throw new Error("Watch has not been implemented yet for latest")
                    // this.compile(options, { [path]: content }, defaultPhases, NullLogger)
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

    logOld(root, phase: string) {
        for (let name of root.modules.keys()) {
            let module = root.modules.get(name)
            this.logger(phase, module, name)
        }
    }

    getFiles(options: Options): Map<string,string> {
        return new Map(Object.entries(common.getInputFilesRecursive(options.inputs, options.namespace)))
    }

    normalizeOptions(optionsOrJson: Options | OptionsJSON) {
        let options = Options.from(optionsOrJson)
        options.parser = Parser()
        return options
    }

    compile(optionsOrJson: Options | OptionsJSON) {
        let options = this.normalizeOptions(optionsOrJson)
        let sources = this.getFiles(options)
        for (let name of sources.keys()) {
            this.logger("Source", sources.get(name), name)
        }

        let modules = new Map(
            Array.from(sources.entries()).map(([name, source]) => {
                let module: Module = options.parser.parse(source, name)
                module = module.patch({ name })
                this.logger("Parser", module, name)
                return [name, module]
            })
        )

        let failedResolution = false
        let modulesWithExternals = new Map(
            Array.from(modules.entries()).map(([name, file]) => {
                let [newFile, externals] = getExternalReferences(file)
                // let's make sure it's possible to resolve these externals.
                for (let external of externals.keys()) {
                    let result = resolve(join(name, external), modules)
                    if (result == null) {
                        // failed to find an external reference.
                        failedResolution = true
                        let firstReference = Array.from(externals.get(external)!)[0]
                        this.printErrorConsole(common.SemanticError(`Reference could not be resolved`, firstReference), sources, options)
                    }
                }
                return [name, [file, externals] as [typeof file, typeof externals]]
            })
        )

        if (failedResolution) {
            return
        }

        let compiled = new Map<string,any>()
        function areAllCompiled(externals: Iterable<string>) {
            for (let external of externals) {
                if (!compiled.has(external)) {
                    return false
                }
            }
            return true
        }
        let order = new Array<string>()
        // now we will loop and compile files for which all their external dependencies are already compiled
        while (compiled.size < modulesWithExternals.size) {
            let beforeCompiledSize = compiled.size
            for (let [name, [file, externals]] of modulesWithExternals) {
                if (!compiled.has(name) && areAllCompiled(externals.keys())) {
                    compiled.set(name, this.compileSingleFile(file, sources, compiled, options))
                    order.push(name)
                }
            }
            let afterCompiledSize = compiled.size
            let compiledThisPass = afterCompiledSize - beforeCompiledSize
            if (compiledThisPass == 0) {
                throw new Error("Circular reference, should be resolved and debugged here")
            }
        }

        this.logger(null, order)
    }

    printErrorConsole(e, sources, options) {
        let location = e.locations?.[0]
        if (location == null || location.start == null) {
            throw e
        }
        else {
            let { filename } = location
            let source = sources.get(filename);
            let error = options.parser.getError(e.message, e.locations, source, filename)
            console.log("")
            console.log(error.message)
        }
    }

    compileSingleFile(module, sources: Map<string,string>, externals: Map<string,Module>, options: Options) {
        let { name } = module
        console.log(`Compiling: ${name}`)
        let phases: Phase[] = defaultPhases

        let root: any = module
        for (let phase of phases) {
            console.log(`    ${phase.name}`)
            let result = phase(root, externals, options)
            if (Array.isArray(result)) {
                for (let e of result) {
                    this.printErrorConsole(e, sources, options)
                }
                return result
            }
            else {
                root = result
            }
            this.logger(phase.name, root, name)
        }

        return root
    }

}