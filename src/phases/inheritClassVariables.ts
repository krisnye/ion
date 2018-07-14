import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import Compiler from "../Compiler"
import ModuleCompiler from "../ModuleCompiler";
const { ast } = require("../ion")

function getOriginalDeclaration(node, scopes: Map<any,object>, compiler: Compiler) {
    if (ast.Reference.is(node)) {
        let scope = scopes.get(node)!
        let referencedDeclaration = scope[node.name]
        if (referencedDeclaration == null)
            throw SemanticError("Type reference not found: " + node.name, node.location)
        return getOriginalDeclaration(referencedDeclaration, scopes, compiler)
    }
    else if (ast.ImportDeclaration.is(node)) {
        let referencedModule = compiler.getModule(node.module.name, true)
        let referencedExport = referencedModule.getResolvedExport()
        return getOriginalDeclaration(referencedExport, referencedModule.getResolvedModuleScopeMap(), compiler)
    }
    else {
        return node
    }
}

function inheritClassVariables(moduleCompiler: ModuleCompiler) {
    let module = moduleCompiler.getResolvedModule()
    let scopes = moduleCompiler.getResolvedModuleScopeMap()
    for (let statement of module.statements) {
        if (ast.ClassDeclaration.is(statement)) {
            let classDeclaration = statement
            for (let baseType of classDeclaration.baseClasses) {
                let baseClassDeclaration = getOriginalDeclaration(baseType, scopes, moduleCompiler.compiler)
                console.log(classDeclaration.id.name + " extends " + baseClassDeclaration.id.name)
            }
        }
    }
    return module
}

export default inheritClassVariables
