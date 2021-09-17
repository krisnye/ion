// import { traverse, skip } from "@glas/traverse";
// import { ClassDeclaration, Declarator, Module, Position, Reference, TypeExpression, Variable } from "../ast";
// import { SemanticError } from "../common";
// import { Options } from "../Compiler"

// export default function instanceFunctions(
//     module: Module,
//     externals: Map<string,Module>,
//     options: Options
// ): Module | Error[] {
//     let errors = new Array<Error>()
//     module = traverse(module, {
//         enter(node, ancestors) {
//             if (Position.is(node) || TypeExpression.is(node)) {
//                 return skip
//             }
//         },
//         leave(node, ancestors) {
//             if (FunctionExpression.is(node)) {
//                 let parent = ancestors[ancestors.length - 1]
//                 let gparent = ancestors[ancestors.length - 3]
//                 if (Variable.is(parent)) {
//                     // name the function expression for the variable.
//                     if (ClassDeclaration.is(gparent)) {
//                         // check that no 'this' parameters are explicitly declared
//                         for (let param of node.parameters) {
//                             if (param.id.name === "this") {
//                                 errors.push(SemanticError(`Cannot explicitly declare 'this' parameter on a class function`, param.id))
//                             }
//                         }
//                         node = node.patch({
//                             // insert implicit 'this' parameter
//                             parameters: [new Variable({ id: new Declarator({ name: "this" }), type: new Reference({ name: gparent.id.name })}), ...node.parameters],
//                             // add implicit 'this' to local references to class variables
//                             body: traverse(node.body, {
//                                 leave(node) {
//                                     if (Reference.is(node)) {
//                                         // check against scope
//                                         let scope = scopes.get(node)
//                                         let declaration = scope[node.name]
//                                         // TODO: I need to have the ancestors available.
//                                         console.log("Declaration", declaration)
//                                         if (Variable.is(declaration) && declaration.isInstance) {
//                                             console.log ("---------> later step")
//                                         }
//                                         // if (classVarNames.has(node.name)) {
//                                         //     return new MemberExpression({
//                                         //         object: new Reference({ name: "this" }),
//                                         //         property: new Identifier(node)
//                                         //     })
//                                         // }
//                                     }
//                                 }
//                             })
//                         })
//                     }
//                     // rename anonymous functions to the name of their variable
//                     if (node.id == null) {
//                         node = node.patch({ id: parent.id }) as FunctionExpression
//                     }
//                 }
//             }
//             return node
//         }
//     })
//     return errors.length ? errors : module
// }