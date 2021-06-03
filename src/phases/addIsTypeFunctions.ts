// import Assembly from "../ast/Assembly";
// import { traverse, skip, replace } from "../Traversal";
// import { getTypeCheckFunctionName, SemanticError, isTypeReference } from "../common";
// import VariableDeclaration from "../ast/VariableDeclaration";
// import Id from "../ast/Id";
// import FunctionExpression from "../ast/FunctionExpression";
// import Parameter from "../ast/Parameter";
// import Reference from "../ast/Reference";
// import BlockStatement from "../ast/BlockStatement";
// import ReturnStatement from "../ast/ReturnStatement";
// import BinaryExpression from "../ast/BinaryExpression";
// import CallExpression from "../ast/CallExpression";
// import ConstrainedType from "../ast/ConstrainedType";
// import DotExpression from "../ast/DotExpression";
// import TypeDeclaration from "../ast/TypeDeclaration";
// import { Argument, Expression, MemberExpression, Literal, ThisExpression } from "../ast";

// function toMemberExpressions(ids: readonly Id[], value: Expression) {
//     for (let id of ids) {
//         value = new MemberExpression({ location: value.location, object: value, property: id })
//     }
//     return value
// }

// function toBinaryExpressions(expressions: Expression[], operator: string) {
//     let value: Expression = expressions[0]!
//     for (let i = 1; i < expressions.length; i++) {
//         value = new BinaryExpression({ location: value.location, left: value, operator, right: expressions[i]! })
//     }
//     return value
// }

// export function toExpression(constraint: Constraint, value: Expression) {
//     return new BinaryExpression({
//         location: constraint.location,
//         left: toMemberExpressions(constraint.left, value),
//         operator: constraint.operator,
//         right: constraint.right as any
//     })
// }

// export function createRuntimeTypeCheckExpression(type: Expression, value: Expression) {
//     return traverse(type!, {
//         merge(node, changes) {
//             // new Reference({ name: "value", location: node.location })
//             if (UnionType.is(node)) {
//                 return toBinaryExpressions(changes.types, "||")
//             }
//             if (isTypeReference(node)) {
//                 return new CallExpression({
//                     callee: new Reference({ name: getTypeCheckFunctionName(node.name), location: node.location }),
//                     arguments: [
//                         new Argument({ value: new Reference({ name: "value", location: node.location }) })
//                     ]
//                 })
//             }
//             if (ConstrainedType.is(node)) {
//                 return toBinaryExpressions(changes.constraints, "&&")
//             }
//             if (Constraint.is(node)) {
//                 return toExpression(node, value)
//             }
//         }
//     })
// }

// function createRuntimeTypeCheckingFunctionDeclaration(name: string, node: TypeDeclaration, root: Assembly) {
//     return new VariableDeclaration({
//         location: node.location,
//         id: new Id({ name }),
//         assignable: false,
//         export: node.export,
//         value: new FunctionExpression({
//             id: new Id({ name }),
//             parameters: [
//                 new Parameter({
//                     id: new Id({ name: "value" }),
//                 })
//             ],
//             // flag to indicate that this is a type guard.
//             typeGuard: new TypeReference({ name: node.id.name.valueOf() }),
//             body: new BlockStatement({
//                 statements: [
//                     new ReturnStatement({
//                         value: createRuntimeTypeCheckExpression(node.value!, new Reference({ name: "value", location: node.location }))
//                     })
//                 ]
//             })
//         })
//     })
// }

// export default function addIsTypeFunctions(root: Assembly) {
//     return traverse(root, {
//         enter(node) {
//             if (TypeDeclaration.is(node)) {
//                 return skip
//             }
//         },
//         leave(node, ancestors, path) {
//             if (TypeDeclaration.is(node)) {
//                 const name = node.id.name
//                 const isName = getTypeCheckFunctionName(name)
//                 return replace(
//                     node,
//                     createRuntimeTypeCheckingFunctionDeclaration(isName, node, root)
//                 )
//             }
//             // else if (BinaryExpression.is(node)) {
//             //     // convert A is Foo type checks into calls to runtime function.
//             //     if (node.operator === "is") {
//             //         if (!Reference.is(node.right)) {
//             //             throw SemanticError("Right side of type check must be a type reference", node.right)
//             //         }
//             //         let isName = getTypeCheckFunctionName(node.right.name)
//             //         return new CallExpression({
//             //             location: node.location,
//             //             callee: new Reference({ location: node.right.location, name: isName }),
//             //             arguments: [new Argument({ value: node.left })]
//             //         })
//             //     }
//             // }
//         }
//     })
// }
