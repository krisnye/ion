import { getInputFilesRecursive } from "./common";
import { lexical } from "./phases";
import { Phase } from "./phases/Phase";

export type PhaseLogger = (names?: string | string[] | null, ast?: any, file?: string) => void

export interface CompilerOptions {
}

export interface DebugOptions {
    logger?: PhaseLogger;
    finalPhase?: Phase;
}

export class Compiler {

    options: CompilerOptions;

    constructor(options: CompilerOptions = {}) {
        this.options = options;
    }

    static getFiles(inputs: string[]): Map<string,string> {
        return new Map(Object.entries(getInputFilesRecursive(inputs)));
    }

    compile(
        input: Map<string,string>,
        debugOptions?: DebugOptions,
    ) : Map<string,any> {
        let options = this.options;
        let modules: Map<string,any> = input;
        let order = new Array<string>();
        let logger = debugOptions?.logger ?? (() => {});
        let finalPhase = debugOptions?.finalPhase;

        try {
            for (let [name,module] of modules.entries()) {
                this.log(logger, "Source", module, name);
            }

            for (let phase of lexical) {
                for (let [name,module] of modules.entries()) {
                    let newModule = phase(name, module, this.options);
                    modules.set(name, newModule);
                    this.log(logger, phase.name, newModule, name);
                }
                if (phase === finalPhase) {
                    return modules;
                }
            }

            // let modules = new Map(
            //     Array.from(sources.entries()).map(([name, source]) => {
            //         let module: Module = options.parser.parse(source, name);
            //         module = module.patch({ name });
            //         this.log("Parser", module, name);
            //         return [name, module];
            //     })
            // )

            // let failedResolution = false
            // let modulesWithExternals = new Map(
            //     Array.from(modules.entries()).map(([name, file]) => {
            //         let errors = new Array<Error>()
            //         let [newFile, externals] = getExternalReferences(file, modules, errors)
            //         this.log("getExternalReferences", newFile, name)
            //         for (let error of errors) {
            //             this.printErrorConsole(error, sources, options)
            //             failedResolution = true
            //         }
            //         return [name, [newFile, externals] as [typeof file, typeof externals]]
            //     })
            // )

            // if (failedResolution) {
            //     return
            // }

            // let compiled = new Map<string,any>()
            // function areAllCompiled(externals: Iterable<string>) {
            //     for (let external of externals) {
            //         if (!compiled.has(external)) {
            //             return false
            //         }
            //     }
            //     return true
            // }
            // // now we will loop and compile files for which all their external dependencies are already compiled
            // while (compiled.size < modulesWithExternals.size) {
            //     let beforeCompiledSize = compiled.size
            //     for (let [name, [file, externals]] of modulesWithExternals) {
            //         if (!compiled.has(name) && areAllCompiled(externals.keys())) {
            //             order.push(name)
            //             compiled.set(name, this.compileSingleFile(file, sources, compiled, options))
            //         }
            //     }
            //     let afterCompiledSize = compiled.size
            //     let compiledThisPass = afterCompiledSize - beforeCompiledSize
            //     if (compiledThisPass == 0) {
            //         for (let [name, [file, externals]] of modulesWithExternals) {
            //             if (!compiled.has(name)) {
            //                 for (let externalName of externals.keys()) {
            //                     if (!compiled.has(externalName)) {
            //                         let ref = [...externals.get(externalName)!][0]
            //                         this.printErrorConsole(common.SemanticError(`Circular reference`, ref), sources, options)
            //                     }
            //                 }
            //             }
            //         }
            //         return
            //     }
            // }
        } catch (e) {
            this.printErrorConsole(e, modules, options)
        } finally {
            logger(null, order.length > 0 ? order : [...modules.keys()])
        }

        return modules;
    }

    printErrorConsole(e, sources, options) {
        let location = e.locations?.[0]
        // if (location == null || location.start == null) {
            throw e
        // }
        // else {
        //     let { filename } = location
        //     let source = sources.get(filename);
        //     let error = options.parser.getError(e.message, e.locations, source, filename)
        //     console.log("")
        //     console.log(error.message)
        // }
    }

    log(logger: PhaseLogger, phase: string, module: any, name: string) {
        let viewAsCode = !Array.isArray(module);
        if (viewAsCode) {
            module = module.toString();
        }
        logger(phase, module, name);
    }


}
