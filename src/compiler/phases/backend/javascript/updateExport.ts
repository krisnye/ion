// import { Declaration, isDeclaration } from "../../../ast/Declaration";
// import { Module } from "../../../ast/Module";
// import { Variable } from "../../../ast/Variable";
// import { traverse } from "../../../traverse";
// import { createExportObject } from "../../frontend/addExport";
// import { Phase } from "../../Phase";

// //  now obsolete since we moved all functions to root.
// //  after we create multifunctions each local function declaration is renamed
// //  now we have to update our exports to contain these new named functions
// //  since the root multi function will need to use these local exports
// export default function updateExport(moduleName, module: Module, externals): ReturnType<Phase> {
//     let errors: Error[] = [];
//     if (module.nodes.length > 1) {
//         let exportVariable = module.nodes.find(node => node instanceof Variable && node.id.name === moduleName)!;
//         let exports = module.nodes.filter(node => isDeclaration(node) && node !== exportVariable) as Declaration[];
//         let newExportVariable = exportVariable.patch({
//             value: createExportObject(module.location, exports)
//         });
//         module = traverse(module, {
//             // can skip most.
//             leave(node) {
//                 if (node === exportVariable) {
//                     node = newExportVariable;
//                 }
//                 return node;
//             }
//         });
//     }
//     return [module, errors];
// }
