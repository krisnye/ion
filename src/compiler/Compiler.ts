import * as common from "./common";
import Phase from "./phases/Phase";
import defaultPhases from "./phases";
// we need the path to lib so the code works in normal compile and in parcel
import Parser = require("../../lib/compiler/parser");
import getExternalReferences from "./phases/getExternalReferences";
import { Module } from "./ast";
import toCodeString from "./toCodeString";

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
    globalScope: any

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
        // if debug only Number compile =>
        sources = new Map([...sources.entries()].filter(([name, source]) => true || ({ Boolean: 1, true: 1, false: 1, "aa.sample": 0 })[name])) as any

        let order = new Array<string>()

        try {
            for (let name of sources.keys()) {
                this.logger("Source", sources.get(name), name)
            }

            let modules = new Map(
                Array.from(sources.entries()).map(([name, source]) => {
                    let module: Module = options.parser.parse(source, name)
                    module = module.patch({ name })
                    this.log("Parser", module, name)
                    return [name, module]
                })
            )

            let failedResolution = false
            let modulesWithExternals = new Map(
                Array.from(modules.entries()).map(([name, file]) => {
                    let errors = new Array<Error>()
                    let [newFile, externals] = getExternalReferences(file, modules, errors)
                    this.log("getExternalReferences", newFile, name)
                    for (let error of errors) {
                        this.printErrorConsole(error, sources, options)
                        failedResolution = true
                    }
                    return [name, [newFile, externals] as [typeof file, typeof externals]]
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
            // now we will loop and compile files for which all their external dependencies are already compiled
            while (compiled.size < modulesWithExternals.size) {
                let beforeCompiledSize = compiled.size
                for (let [name, [file, externals]] of modulesWithExternals) {
                    if (!compiled.has(name) && areAllCompiled(externals.keys())) {
                        order.push(name)
                        compiled.set(name, this.compileSingleFile(file, sources, compiled, options))
                    }
                }
                let afterCompiledSize = compiled.size
                let compiledThisPass = afterCompiledSize - beforeCompiledSize
                if (compiledThisPass == 0) {
                    for (let [name, [file, externals]] of modulesWithExternals) {
                        if (!compiled.has(name)) {
                            for (let externalName of externals.keys()) {
                                if (!compiled.has(externalName)) {
                                    let ref = [...externals.get(externalName)!][0]
                                    this.printErrorConsole(common.SemanticError(`Circular reference`, ref), sources, options)
                                }
                            }
                        }
                    }
                    return
                }
            }
        } catch (e) {
            this.printErrorConsole(e, sources, options)
        } finally {
            this.logger(null, order.length > 0 ? order : [...sources.keys()])
        }
    }

    log(phase: string, module: any, name: string) {
        let viewAsCode = false
        if (viewAsCode) {
            module = toCodeString(module)
        }
        this.logger(phase, module, name)
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
            // add the externals as global scope (including self module)
            // options.globalScope = createGlobalScope([...externals.values(), root])
            // also add global declarations from current module
            let [result,errors] = phase(root, options, externals)
            this.log(phase.name, result, name)
            if (errors.length > 0) {
                for (let e of errors) {
                    this.printErrorConsole(e, sources, options)
                }
                return result
            }
            else {
                root = result
            }
        }

        return root
    }

}