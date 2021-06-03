// import { Analysis, IfStatement, BinaryExpression, BlockStatement, Expression, ConditionalChain, Reference } from "../ast";
// import { traverse, skip } from "../Traversal";

// function isBinaryAndExpression(node): node is BinaryExpression {
//     return BinaryExpression.is(node) && node.operator === "&"
// }

// function toExpression(node: IfStatement) {
//     let result = node.test
//     let lastConsequent = node.consequent.statements[node.consequent.statements.length - 1]
//     if (IfStatement.is(lastConsequent)) {
//         result = new BinaryExpression({
//             location: node.location,
//             left: result,
//             operator: "&",
//             right: toExpression(lastConsequent)
//         })
//     }
//     return result
// }

// export function conditionalChainToBinaryExpression(node: ConditionalChain) {
//     return toExpression(node.start) as BinaryExpression
// }

// function toIfStatement(node: Expression): IfStatement {
//     if (isBinaryAndExpression(node)) {
//         return new IfStatement({
//             location: node.location,
//             test: node.left,
//             consequent: new BlockStatement({
//                 location: node.right.location,
//                 statements: [toIfStatement(node.right)]
//             })
//         })
//     }
//     else {
//         return new IfStatement({
//             location: node.location,
//             test: node,
//             consequent: new BlockStatement({ statements: [] })
//         })
//     }
// }

// export default function createConditionalChains(root: Analysis) {
//     return traverse(root, {
//         enter(node) {
//             if (isBinaryAndExpression(node)) {
//                 return skip
//             }
//         },
//         leave(node) {
//             if (isBinaryAndExpression(node)) {
//                 return new ConditionalChain({
//                     location: node.location,
//                     start: toIfStatement(node),
//                     type: new Reference({ name: "ion.Boolean:Boolean" })
//                 })
//             }
//         }
//     })
// }
