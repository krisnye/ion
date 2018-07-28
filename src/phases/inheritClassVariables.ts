// import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
// import { SemanticError } from "../common"
// import Compiler from "../Compiler"
// import ModuleCompiler from "../ModuleCompiler";
// import Patch from "../Patch"
// const ion = require("../ion")
// const { ast } = ion

// //  I think we now officially need a Patch system design for deep patching of recursive object structures.

// function inheritModuleClassVariables(moduleCompiler: ModuleCompiler) {
//     let module = moduleCompiler.getResolvedModule()
//     let scopes = moduleCompiler.getResolvedModuleScopeMap()
//     let moduleStatementsPatch = Patch.empty
//     module.statements.forEach((statement, index) => {
//         if (ast.ClassDeclaration.is(statement)) {
//             let newClassDeclaration = inheritClassVariables(statement, moduleCompiler)
//             if (statement !== newClassDeclaration) {
//                 moduleStatementsPatch = Patch.combine(moduleStatementsPatch, new Patch(index, newClassDeclaration))
//             }
//         }
//     })
//     return Patch.apply(module, new Patch("statements", moduleStatementsPatch))
// }

// export default inheritModuleClassVariables

// function inheritClassVariables(statement: any, moduleCompiler: ModuleCompiler) {
//     let classDeclaration = statement
//     let newClassStatements = null
//     for (let baseType of classDeclaration.baseClasses) {
//         if (newClassStatements == null) {
//             newClassStatements = classDeclaration.declarations.slice(0) // sliced into mutable array
//         }
//         let baseClassDeclaration = moduleCompiler.compiler.getResolvedDeclaration(baseType, moduleCompiler)
//         // Shit... how do we just import Nodes from another class that MIGHT be referencing local variables
//         //  for type information and default values... shiznaggity.
//         //  this is why I put everything into a global namespace with absolute references first.
//         //  we might be able to get away with this... temporarily... but we will have to fix it soon.
//         console.log(classDeclaration.id.name + " extends " + baseClassDeclaration.id.name)
//     }
//     return classDeclaration
// }
