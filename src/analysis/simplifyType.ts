// import { TypeExpression, Reference, BinaryExpression, DotExpression } from "../ast";
// import simplifyExpression from "./simplify";

// export default function simplifyTypeExpression(node: TypeExpression): TypeExpression | Reference {
//     let value = simplifyExpression(node.value)
//     if (BinaryExpression.is(value) && DotExpression.is(value.left) && value.operator === "is" && Reference.is(value.right)) {
//         return value.right
//     }
//     if (node.value !== value) {
//         node = node.patch({ value })
//     }
//     return node
// }