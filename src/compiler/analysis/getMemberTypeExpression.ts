// import { TypeExpression, Identifier, Expression, BinaryExpression, Reference, MemberExpression, DotExpression } from "../ast";
// import { replaceNodes } from "../phases/runtimeTypeChecking";
// import toCodeString from "../toCodeString";
// import combineExpressions from "./combineExpressions";
// import simplify from "./simplify";
// import splitExpressions from "./splitExpressions";
// import { traverse } from "@glas/traverse";

// export function combine(left: Expression | null, operator: string, right: Expression | null) {
//     if (left == null) {
//         return right
//     }
//     if (right == null) {
//         return left
//     }
//     return new BinaryExpression({ left, operator, right })
// }

// function findAndReplaceMembers(e: Expression, member: Identifier | Expression): Expression | null {
//     let count = 0
//     let result = traverse(e, {
//         leave(node) {
//             if (MemberExpression.is(node.left) && DotExpression.is(node.left.object)) {
//                 let dotProperty = node.left.property
//                 if (toCodeString(dotProperty) === toCodeString(member)) {
//                     count++
//                     // return the same expression, but remove the member expression so
//                     //  .foo is Bar => . is Bar
//                     return node.patch({ left: node.left.object })
//                 }
//             }            
//         }
//     })
//     return count > 0 ? result : null
// }

// export function getMemberExpression(e: Expression, member: Identifier | Expression | TypeExpression): Expression | null {
//     // must combine all member expression values
//     let terms = [...splitExpressions(e)].map(e => {
//         return findAndReplaceMembers(e, member)
//     }).filter(e => e != null) as Expression[]
//     return combineExpressions(terms)
// }

// export default function getMemberTypeExpression(t: TypeExpression, member: Identifier | Expression | TypeExpression) {
//     let e = t.value
//     let value = getMemberExpression(e, member)
//     if (value == null) {
//         return null
//     }
//     value = Reference.is(value) ? value : new TypeExpression({ value })
//     return simplify(value)
// }
