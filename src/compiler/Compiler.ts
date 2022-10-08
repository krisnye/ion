import { Assembly } from "./ast/Assembly";
import { getInputFilesRecursive } from "./common";
import ErrorContext from "./errors/ErrorContext";
import { assemblyPhases, intermediatePhases, parsingPhases } from "./phases/frontend";
import { Phase } from "./phases/Phase";
import { Module } from "./ast/Module";
import { SemanticError } from "./SemanticError";
import { SourceLocation } from "./SourceLocation";
import { SourcePosition } from "./SourcePosition";
import toposort from "./toposort";
import { middlePhasesAssembly } from "./phases/middle";
import { Expression } from "./ast/Expression";
import { moveMetaToFunctions } from "./phases/frontend/moveMetaToFunctions";
import { SemanticHighlight, SemanticTokenType } from "./SemanticHighlight";
import { traverse } from "@glas/traverse";
import { Node } from "./Node";

export type PhaseLogger = (names?: string | string[] | null, ast?: any, file?: string) => void

export interface CompilerOptions {
    log: typeof console.log;
    test?: boolean
}

export interface DebugOptions {
    logger?: PhaseLogger;
    finalPhase?: Phase;
}

const fileNameMappings = {
    // work around for some operator file names not supported by file system
    "_slash": "/"
}

function isTestFile(name: string) {
    return /\btest\b/.test(name);
}

function isTestFailFile(name: string) {
    return isTestFile(name) && /\bfail\b/.test(name);
}

const globalName = "global";

export class Compiler {

    options: CompilerOptions;

    constructor(options: CompilerOptions = { log: console.log, test: false }) {
        this.options = options;
    }

    static getFiles(inputs: string[], options: CompilerOptions): Map<string,string> {
        let entries = Object.entries(getInputFilesRecursive(inputs));
        // remap some names
        entries = entries.map(([name, content]) => [fileNameMappings[name] ?? name, content || "\n"]);
        // remove test files if not test mode
        if (!options.test) {
            entries = entries.filter(([name, value]) => { return !/\btest\b/.test(name); });
        }
        return new Map(entries);
    }

    runPhase(phase: Phase, moduleName: string, module: any, externals: Map<string,any>, options: CompilerOptions): ReturnType<Phase> {
        try {
            let result = phase(moduleName, module, externals, options);
            if (result[1].length > 0) {
                result[2] = false;
            }
            return result;
        }
        catch (e) {
            return [module, [e as Error], false];
        }
    }

    createAssembly(modules: Map<string,any>) {
        modules = new Map(modules.entries());
        let assembly = new Assembly({
            location: new SourceLocation(globalName, new SourcePosition(0, 0), new SourcePosition(0, 0)),
            nodes: [...modules.values()].map((module: Module) => {
                return module.nodes
            }).flat(),
        });
        return assembly;
    }

    runPhases(sources: Map<string,string>, modules: Map<string,any>, externals: Map<string,any>, phases: Phase[], group: boolean, options?: DebugOptions): [Map<string,any>, Error[] | null] {
        // don't modify modules directly, make a copy
        modules = new Map(modules.entries());
        let removedModules = new Set<string>();
        let removeExpectedErrors = (errors: Error[]): Error[] => {
            for (let i = errors.length - 1; i >= 0; i--) {
                let error = errors[i];
                if (error instanceof SemanticError) {
                    let { filename } = error.locations?.[0] ?? { filename: "" };
                    let isExpectedToFail = filename.indexOf("test.fail.") === 0;
                    if (isExpectedToFail) {
                        modules.delete(filename);
                        removedModules.add(filename);
                        errors.splice(i, 1);
                    }
                }
            }
            return errors;
        }

        let logger = options?.logger ?? (() => {});
        if (group) {
            for (let phase of phases) {
                // merge all the modules into a new module
                // combine all module entries
                for (let phaseRepeatCount = 0; phaseRepeatCount < 100; phaseRepeatCount++) {
                    let assembly = this.createAssembly(modules);
                    let [newAssembly, errors, runPhaseAgain] = this.runPhase(phase, globalName, assembly, externals, this.options);
                    errors = removeExpectedErrors(errors);
                    if (errors.length > 0) {
                        console.log(phase.name);
                        for (let error of errors) {
                            this.printErrorConsole(error, sources);
                        }
                        return [modules, errors];
                    }
                    // split all nodes back into modules
                    let newFilenames = new Set<string>(newAssembly.nodes.map(node => node.getFilename()));
                    let newNodes = new Map([...newFilenames].map(name => [name, [] as Expression[]]));
                    for (let node of newAssembly.nodes) {
                        newNodes.get(node.getFilename())!.push(node);
                    }
                    for (let name of newNodes.keys()) {
                        if (!removedModules.has(name)) {
                            let nodes = newNodes.get(name)!;
                            let module = modules.get(name)!;
                            if (module == null) {
                                // create new module if missing.
                                modules.set(name, module = new Module({ name, nodes, dependencies: [], location: nodes[0].location }));
                            }
                            let newModule = module.patch({ nodes });
                            modules.set(name, newModule);
                            // log each module individually.
                            this.log(logger, (phaseRepeatCount || runPhaseAgain) ? `${phase.name} (${phaseRepeatCount + 1})` : phase.name, newModule, name);
                        }
                    }
                    if (!runPhaseAgain) {
                        break;
                    }
                }
            }
        }
        else {
            for (let [name,modul] of modules.entries()) {
                let phaseRepeatCount = 0;
                for (let i = 0; i < phases.length; i++) {
                    let phase = phases[i];
                    let [newModule, errors, runPhaseAgain] = this.runPhase(phase, name, modul, externals, this.options);
                    errors = removeExpectedErrors(errors);
                    if (errors.length > 0) {
                        console.log(`${name} : ${phase.name}`);
                        for (let error of errors) {
                            this.printErrorConsole(error, sources);
                        }
                        return [modules, errors];
                    }
                    if (!removedModules.has(name)) {
                        modules.set(name, modul = newModule);
                    }
                    this.log(logger, (phaseRepeatCount || runPhaseAgain) ? `${phase.name} (${phaseRepeatCount + 1})` : phase.name, newModule, name);
                    if (runPhaseAgain) {
                        i--;
                        phaseRepeatCount++;
                    } else {
                        phaseRepeatCount = 0;
                        if (phase === options?.finalPhase) {
                            i = parsingPhases.length;
                        }
                    }
                }
            }
        }
        return [modules, null];
    }

    compileToAstAssembly(input: Map<string,string>): Assembly {
        let result = this.compile(input);
        if (Array.isArray(result)) {
            throw result[0];
        }
        return this.createAssembly(result);
    }

    parseSingleFile(name: string, source: string): Module {
        let result = this.compile(new Map([[name, source]]), {
            finalPhase: moveMetaToFunctions    //  mode right before resolving external references.
        });
        if (Array.isArray(result)) {
            throw result[0];
        }
        return result.get(name) as Module;
    }

    getSemanticHighlights(filename: string, source: string): SemanticHighlight[] {
        const module = this.parseSingleFile(filename, source);
        const lines = source.split("\n");
        const highlights: SemanticHighlight[] = [];
        traverse(module, {
            enter(node) {
                if (node instanceof Node) {
                    highlights.push(...node.getSemanticHighlights(lines));
                }
            }
        });
        // also add comments, manually here.
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith("//")) {
                highlights.push(new SemanticHighlight(i, 0, line.length, SemanticTokenType.comment));
            }
        }
        return highlights;
    }

    compile(
        input: Map<string,string>,
        debugOptions?: DebugOptions,
    ) : Map<string,any> | Error[] {
        let sources = new Map(input.entries());
        let modules: Map<string,any> = input;
        let emptyLogger = () => {};
        let logger = debugOptions?.logger ?? emptyLogger;
        let finalPhase = debugOptions?.finalPhase;
        let silentOptions = { ...debugOptions } //, logger: emptyLogger };

        try {
            // log the initial source
            for (let [name,module] of modules.entries()) {
                // this.log(logger, "Source", module, name);
            }

            //  do solo phases
            let externals = modules;
            let errors: Error[] | null = null;
            [modules, errors] = this.runPhases(sources, modules, externals, parsingPhases, false, silentOptions);
            if (errors) { return errors; }
            if (finalPhase != null) { return modules; }

            // sort the modules map based upon inter-module dependencies
            let sortedModuleNames = toposort([...modules.keys()], [...modules.values()].map((module: Module) => {
                return [...module.dependencies.map(dep => {
                    return [dep, module.name];
                })];
            }).flat() as [any,any][]);
            modules = new Map(sortedModuleNames.map(name => {
                let module = modules.get(name);
                return [name, module];
            }));
            externals = modules;

            [modules, errors] = this.runPhases(sources, modules, externals, intermediatePhases, false, silentOptions);
            externals = modules;

            if (errors) { return errors; }
            [modules, errors] = this.runPhases(sources, modules, externals, assemblyPhases, true, silentOptions);
            if (errors) { return errors; }
            externals = modules;

            //  middle tier
            [modules, errors] = this.runPhases(sources, modules, externals, middlePhasesAssembly, true, debugOptions);
            if (errors) { return errors; }
            externals = modules;

            // //  This final output should NOT be using the final outputs at input
            // //  the "externals" needs to be the output from the previous phases.
            // [modules, errors] = this.runPhases(sources, modules, externals, javascriptPhases, false, debugOptions);
            // if (errors) { return errors; }
            // //  we DO NOT reset the externals now from the back end phases.

            // // finally check that any expected fail files failed to compile.
            // if (this.options.test) {
            //     for (let [name, module] of modules) {
            //         if (isTestFailFile(name)) {
            //             this.printErrorConsole(new SemanticError(`Expected '${name}' to fail`, module), sources);
            //         }
            //     }
            // }
        } catch (e) {
            this.printErrorConsole(e, sources);
            return Array.isArray(e) ? e : [e];
        } finally {
            if (modules.size === 0) {
                throw new Error("Expected modules");
            }
            logger(null, [...modules.keys()].filter(name => this.logModule(name)));
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

    logFilter = new Set([ "test.sample", "Range" ]);
    logModule(name: string) {
        return this.logFilter && this.logFilter.has(name);
    }
    log(logger: PhaseLogger, phase: string, module: any, name: string) {
        if (!this.logModule(name)) {
            return;
        }
        let viewAsCode = !Array.isArray(module);
        if (viewAsCode) {
            let text = module.toString();
            if (text != "[object Object]") {
                module = text;                
            }
        }
        logger(phase, module, name);
    }

}
