import getResolvedModule from "./getResolvedModule";
import { Context, getParsedModule, ResolvedModule } from "../compile";

export function getResolvedModulesAndDependencies(context: Context, name: string, resolvedModules: Map<string,ResolvedModule>) {
    if (!resolvedModules.has(name)) {
        let parsedModule = getParsedModule(context, name);
        let filename = parsedModule.ast.location.filename
        context.debug(filename, "Parsed", parsedModule.ast)
        let resolvedModule = getResolvedModule(context, parsedModule);
        context.debug(filename, "Resolved", resolvedModule.declarations)
        resolvedModules.set(name, resolvedModule);
        for (let dep of resolvedModule.dependencies) {
            let dependencyModuleName = dep.moduleName;
            getResolvedModulesAndDependencies(context, dependencyModuleName, resolvedModules);
        }
    }
}