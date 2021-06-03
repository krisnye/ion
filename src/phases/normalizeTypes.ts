// import createScopeMaps from "../createScopeMaps";
// import { traverse } from "../Traversal";
// import { SemanticError, isTypeReference, getAbsoluteName } from "../common";
// import Analysis from "../ast/Analysis";
// import Declaration from "../ast/Declaration";
// import TypeDeclaration from "../ast/TypeDeclaration";
// import Reference from "../ast/Reference";
// import TypeExpression from "../ast/TypeExpression";
// import BinaryExpression from "../ast/BinaryExpression";
// import ClassDeclaration from "../ast/ClassDeclaration";
// import Expression from "../ast/Expression";
// import Literal from "../ast/Literal";
// import MemberExpression from "../ast/MemberExpression";
// import Id from "../ast/Id";
// import FunctionType from "../ast/FunctionType";
// import Parameter from "../ast/Parameter";
// import DotExpression from "../ast/DotExpression";
// import ThisExpression from "../ast/ThisExpression";
// import { type } from "os";
// import Node from "../ast/Node";
// import IdGenerator from "../IdGenerator";

// const opMap = {
//     "|": "or",
//     "&": "and",
//     "<": "lt",
//     ">": "lt",
//     "<=": "lte",
//     ">=": "gte",
//     "==": "eq",
//     "!=": "neq",
// }

// // This is pretty O(n) performance. Functions on Nodes would be good.
// export function getName(node) {
//     if (node == null) {
//         return `UNDEFINED`
//     }
//     // if this is a reference, then it ought to be easy, just return the name
//     if (Reference.is(node)) {
//         return node.name
//     }
//     if (Literal.is(node)) {
//         return JSON.stringify(node.value)
//     }
//     if (BinaryExpression.is(node)) {
//         return `${getName(node.left)} ${opMap[node.operator] ?? node.operator} ${getName(node.right)}`
//     }
//     if (Id.is(node)) {
//         return node.name
//     }
//     if (MemberExpression.is(node)) {
//         return `${getName(node.object)}.${getName(node.property)}`
//     }
//     if (Parameter.is(node)) {
//         return `${getName(node.id)}: ${getName(node.type)}`
//     }
//     if (FunctionType.is(node)) {
//         return `func ${node.parameters.map(getName).join(",")} returns ${getName(node.returnType)}`
//     }
//     if (ThisExpression.is(node)) {
//         return `this`
//     }
//     if (DotExpression.is(node)) {
//         return `.`
//     }
//     return `!!!${node.constructor.name}!!!`
// }

// const typesFile = "ion.types"

// export default function normalizeTypes(root: Analysis) {
//     let identifiers = new Set<string>()
//     let scopes = createScopeMaps(root, { identifiers }) // DO NOT REMOVE THIS LINE, scopes is not used, but identifiers is
//     let idGenerator = new IdGenerator(identifiers)
//     let newTypeDeclarations = new Map<string,TypeDeclaration>()
//     let typeNameToIdentifierName = new Map<string,string>()
//     function ensureTypeExistsReturnReference(context: Node, node: TypeExpression) {
//         let name = getName(node)
//         let absoluteName = typeNameToIdentifierName.get(name)
//         if (absoluteName == null) {
//             let localName = idGenerator.createNewIdName(name)
//             absoluteName = getAbsoluteName(typesFile, localName)
//             typeNameToIdentifierName.set(name, absoluteName)
//             let declaration = new TypeDeclaration({
//                 location: node.location!.patch({ filename:  typesFile }),
//                 id: new Id({ location: node.location, name: absoluteName }),
//                 value: node,
//                 export: true,
//             })
//             newTypeDeclarations.set(name, declaration)
//         }
//         return new Reference({ location: node.location, name: absoluteName })
//     }
//     root = traverse(root, {
//         merge(node, changes, helper, ancestors, path) {
//             //  Find TypeExpressions which are NOT References and turn them into References.
//             if (TypeExpression.is(node) && !Reference.is(node) && !TypeDeclaration.is(ancestors[2])) {
//                 // Next we need to generate a unique canonical name for this type
//                 // that we can use to create a shared type declaration
//                 // then we create that type declaration and convert this node to a reference to it
//                 return ensureTypeExistsReturnReference(node, helper.patch(node, changes))
//             }
//         }
//     })

//     return new Analysis({ declarations: new Map([...root.declarations, ...newTypeDeclarations])})
// }
