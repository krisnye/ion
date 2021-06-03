import Assembly from "../ast/Assembly";
import { Options } from "../Compiler";
import Analysis from "../ast/Analysis";
import Module from "../ast/Module";
import Declaration from "../ast/Declaration";

export default function analysisToAssembly(root: Analysis, options: Options): Assembly {

    let moduleDeclarations = new Map<string, Array<Declaration>>()

    for (let name of root.declarations.keys()) {
        let declaration = root.declarations.get(name)!
        if (declaration.location == null) {
            console.error("No location", declaration)
            throw new Error("No location: " + name)
        }
        let moduleName = declaration.location!.filename
        let declarations = moduleDeclarations.get(moduleName)
        if (declarations == null) {
            moduleDeclarations.set(moduleName, declarations = [])
        }
        declarations.push(declaration)
    }

    let modules = new Map<string, Module>()
    for (let name of moduleDeclarations.keys()) {
        let declarations = moduleDeclarations.get(name)!
        modules.set(name, new Module({ declarations }))
    }

    return new Assembly({ modules })
}
