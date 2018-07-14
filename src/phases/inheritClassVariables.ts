import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import Compiler from "../Compiler"
import ModuleCompiler from "../ModuleCompiler";
const { ast } = require("../ion")

function inheritClassVariables(moduleCompiler: ModuleCompiler) {
    let module = moduleCompiler.getResolvedModule()
    let scopes = moduleCompiler.getResolvedModuleScopeMap()
    for (let statement of module.statements) {
        if (ast.ClassDeclaration.is(statement)) {
            let classDeclaration = statement
            for (let baseType of classDeclaration.baseClasses) {
                let baseClassDeclaration = moduleCompiler.compiler.getResolvedDeclaration(baseType, moduleCompiler)
                console.log(classDeclaration.id.name + " extends " + baseClassDeclaration.id.name)
            }
        }
    }
    return module
}

export default inheritClassVariables
