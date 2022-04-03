import { Assembly } from "./ast/Assembly";
import { getInputFilesRecursive } from "./common";
import ErrorContext from "./errors/ErrorContext";
import { Node } from "./Node";
import { groupPhases, soloPhases } from "./phases";
import { Phase } from "./phases/Phase";
import { Module } from "./pst/Module";
import { SourceLocation } from "./SourceLocation";
import { SourcePosition } from "./SourcePosition";
import { toposort } from "./toposort";

export type PhaseLogger = (names?: string | string[] | null, ast?: any, file?: string) => void

export interface CompilerOptions {
    log: typeof console.log
}

export interface DebugOptions {
    logger?: PhaseLogger;
    finalPhase?: Phase;
}

export class Compiler {

    options: CompilerOptions;

    constructor(options: CompilerOptions = { log: console.log }) {
        this.options = options;
    }

    static getFiles(inputs: string[]): Map<string,string> {
        return new Map(Object.entries(getInputFilesRecursive(inputs)));
    }

    compile(
        input: Map<string,string>,
        debugOptions?: DebugOptions,
    ) : Map<string,any> | Error[] {
        let sources = new Map(input.entries());
        let modules: Map<string,any> = input;
        let logger = debugOptions?.logger ?? (() => {});
        let finalPhase = debugOptions?.finalPhase;

        try {
            // log the initial source
            for (let [name,module] of modules.entries()) {
                this.log(logger, "Source", module, name);
            }

            //  do solo phases
            for (let [name,module] of modules.entries()) {
                let phaseRepeatCount = 0;
                for (let i = 0; i < soloPhases.length; i++) {
                    let phase = soloPhases[i];
                    let [newModule, errors, runPhaseAgain] = phase(name, module, modules, this.options);
                    if (errors.length > 0) {
                        console.log(phase.name);
                        for (let error of errors) {
                            this.printErrorConsole(error, sources);
                        }
                        return errors;
                    }
                    modules.set(name, module = newModule);
                    this.log(logger, (phaseRepeatCount || runPhaseAgain) ? `${phase.name} (${phaseRepeatCount + 1})` : phase.name, newModule, name);
                    if (runPhaseAgain) {
                        i--;
                        phaseRepeatCount++;
                    } else {
                        phaseRepeatCount = 0;
                        if (phase === finalPhase) {
                            i = soloPhases.length;
                        }
                    }
                }
            }
            if (finalPhase != null) {
                return modules;
            }
            
            // sort the modules map based upon inter-module dependencies
            let sortedModuleNames = toposort([...modules.keys()], [...modules.values()].map((module: Module) => {
                return [...module.dependencies.map(dep => {
                    return [dep, module.name];
                })];
            }).flat() as [any,any][]);
            modules = new Map(sortedModuleNames.map(name => [name, modules.get(name)]));

            for (let phase of groupPhases) {
                // merge all the modules into a new module
                let name = "$";
                let assembly = new Assembly({
                    location: new SourceLocation(name, new SourcePosition(0, 0), new SourcePosition(0, 0)),
                    nodes: [...modules.values()].map((module: Module) => module.nodes).flat(),
                })
                // combine all module entries
                let [newAssembly, errors] = phase(name, assembly, modules, this.options);
                if (errors.length > 0) {
                    console.log(phase.name);
                    for (let error of errors) {
                        this.printErrorConsole(error, sources);
                    }
                    return errors;
                }
                // split all nodes back into modules
                let newNodes = new Map([...modules.keys()].map(name => [name, [] as Node[]]));
                for (let node of newAssembly.nodes) {
                    newNodes.get(node.location.filename)!.push(node);
                }
                for (let name of newNodes.keys()) {
                    let module = modules.get(name)!;
                    let newModule = module.patch({ nodes: newNodes.get(name)})
                    modules.set(name, newModule);
                    // log each module individually.
                    this.log(logger, phase.name, newModule, name);
                }
                if (phase === finalPhase) {
                    return modules;
                }
            }
        } catch (e) {
            this.printErrorConsole(e, sources);
        } finally {
            if (modules.size === 0) {
                throw new Error("Expected modules");
            }
            logger(null, [...modules.keys()]);
        }

        return modules;
    }

    printErrorConsole(e, sources: Map<string,string>) {
        let location = e.locations?.[0];
        if (location == null || location.start == null) {
            throw e;
        }
        else {
            let { filename } = location;
            let source = sources.get(filename);
            if (source == null) {
                throw new Error("Source not found: " + filename);
            }
            let errorContext = new ErrorContext(source, filename);
            let error = errorContext.getError(e.message, ...e.locations);
            this.options.log("");
            this.options.log(error.message);
        }
    }

    log(logger: PhaseLogger, phase: string, module: any, name: string) {
        // console.log("LOGGER", phase, name);
        let viewAsCode = !Array.isArray(module);
        if (viewAsCode) {
            module = module.toString();
        }
        logger(phase, module, name);
    }

}
