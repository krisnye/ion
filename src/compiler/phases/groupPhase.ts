import { Module } from "../pst/Module";
import { Phase } from "./Phase";

export function groupPhase(moduleName, module, externalModules: Map<string,Module>): ReturnType<Phase> {
    let errors: Error[] = [];
    return [module, errors];
}
