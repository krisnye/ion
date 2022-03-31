import { getInputFilesRecursive } from "./common";
import ErrorContext from "./errors/ErrorContext";
import { lexical } from "./phases";
import { Phase } from "./phases/Phase";

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
        let order = new Array<string>();
        let logger = debugOptions?.logger ?? (() => {});
        let finalPhase = debugOptions?.finalPhase;

        try {
            for (let [name,module] of modules.entries()) {
                this.log(logger, "Source", module, name);
            }

            for (let phase of lexical) {
                for (let [name,module] of modules.entries()) {
                    let [newModule, errors] = phase(name, module, modules, this.options);
                    if (errors.length > 0) {
                        console.log(phase.name);
                        for (let error of errors) {
                            this.printErrorConsole(error, sources);
                        }
                        return errors;
                    }
                    modules.set(name, newModule);
                    this.log(logger, phase.name, newModule, name);
                }
                if (phase === finalPhase) {
                    return modules;
                }
            }
        } catch (e) {
            this.printErrorConsole(e, sources);
        } finally {
            logger(null, order.length > 0 ? order : [...modules.keys()]);
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
        let viewAsCode = !Array.isArray(module);
        if (viewAsCode) {
            module = module.toString();
        }
        logger(phase, module, name);
    }

}
