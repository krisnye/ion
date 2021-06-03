// import Assembly from "../ast/Assembly";
// import { Options } from "../Compiler";
// import Analysis from "../ast/Analysis";
// import Module from "../ast/Module";
// import Declaration from "../ast/Declaration";
// import Id from "../ast/Id";
// import { traverse } from "../Traversal";
// import TypeReference from "../ast/TypeReference";

// export default function restoreOriginalTypes(root: Assembly, options: Options) {
//     return traverse(root, {
//         leave(node) {
//             if (TypeReference.is(node) && node.original != null) {
//                 return node.original
//             }
//         }
//     })
// }