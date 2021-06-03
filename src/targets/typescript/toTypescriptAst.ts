// import Assembly from "../../ast/Assembly";
// import { traverse, skip, remove, traverseChildren, replace, Merge, Leave, Enter } from "../../Traversal";
// import { getTypeCheckFunctionName, isTypeReference, isValidId, getUniqueClientName, getAbsoluteName } from "../../common";
// import ImportDeclaration from "../../ast/ImportDeclaration";
// import BinaryExpression from "../../ast/BinaryExpression";
// import Module from "../../ast/Module";
// import BlockStatement from "../../ast/BlockStatement";
// import ConstrainedType from "../../ast/ConstrainedType";
// import Parameter from "../../ast/Parameter";
// import ReturnStatement from "../../ast/ReturnStatement";
// import ClassDeclaration from "../../ast/ClassDeclaration";
// import FunctionExpression from "../../ast/FunctionExpression";
// import FunctionType from "../../ast/FunctionType";
// import VariableDeclaration from "../../ast/VariableDeclaration";
// import Declaration from "../../ast/Declaration";
// import Node from "../../ast/Node";
// import Literal from "../../ast/Literal";
// // import TemplateReference from "../../ast/TemplateReference";
// import CallExpression from "../../ast/CallExpression";
// import Reference from "../../ast/Reference";
// import ExpressionStatement from "../../ast/ExpressionStatement";
// import TypeReference from "../../ast/TypeReference";
// import UnionType from "../../ast/UnionType";
// import reservedWords from "./reservedWords";
// import * as ast from "../../ast";
// import Output from "../../ast/Output";
// import { createRuntimeTypeCheckExpression } from "../../phases/addIsTypeFunctions";

// const DO_NOT_EDIT_WARNING = `
// This file was generated from ion source. Do not edit.
// `

// const typeMap = {
//     Id: "Identifier",
//     Reference: "Identifier"
// }

// const operatorMap = {
//     "==": "===",
//     "!=": "!==",
// }

// function renameIfReserved(name: string) {
//     return reservedWords.has(name) ? "_" + name : name
// }

// function toRelativeModulePath(from: string, to: string) {
//     let a = from.split('.')
//     let b = to.split('.')
//     while (a[0] === b[0]) {
//         a.shift()
//         b.shift()
//     }
//     let prefix = "./"
//     let suffix = ""
//     if (a.length == 2) {
//         prefix = "../"
//     }
//     else if (a.length > 2) {
//         prefix = "../"
//         for (let i = 2; i < a.length; i++) {
//             prefix = "../" + prefix
//         }
//     }

//     return prefix + b.join("/") + suffix
// }

// function getIdentifier(parameter) {
//     if (parameter.type === "Identifier") {
//         return parameter
//     }
//     else {
//         throw new Error("Not supported yet, maybe implement it: " + parameter.type)
//     }
// }

// function getTypeReferenceName(node) {
//     if (node.type === "Identifier") {
//         return node.name
//     }
//     else if (node.type === "MemberExpression") {
//         return node.property.name
//     }
//     else if (node.type === "BinaryExpression") {
//         if (node.operator === "is") {
//             return getTypeReferenceName(node.right)
//         }
//         return getTypeReferenceName(node.left) + " " + node.operator + " " + getTypeReferenceName(node.right)
//     }
//     else if (node.type === "UnionType") {
//         return node.types.map(getTypeReferenceName).join(" | ")
//     }
//     else if (node.type === "Literal") {
//         return node.value.toString()
//     }
//     else {
//         throw new Error("Expected Identifier or MemberExpression: " + node.type)
//     }
// }

// function toTypeCheckFunction(ref: Reference | ast.MemberExpression, value: ast.Expression) {
//     let callee: ast.Expression
//     if (Reference.is(ref)) {
//         callee = new Reference({ name: getTypeCheckFunctionName(ref.name) })
//     }
//     else if (ast.MemberExpression.is(ref) && ast.Id.is(ref.property)) {
//         callee = ref.patch({
//             property: new ast.Id({ name: getTypeCheckFunctionName(ref.property.name)})
//         })
//     }
//     else {
//         throw new Error("Type not implemented: " + ref.type)
//     }
//     return new CallExpression({ callee, arguments: [new ast.Argument({ value })] })
// }

// const toAstEnter: { [name: string]: Enter } = {
//     default(node) {
//     },
// }

// const toAstMerge: { [P in keyof typeof ast]?: Merge } & { default: Merge } = {
//     default(node, changes, helper) {
//         let name = node.constructor.name
//         let type = typeMap[name] || name
//         let esnode = { ...node } as any
//         esnode = helper.patch(esnode, changes)
//         esnode.type = type
//         if (BinaryExpression.is(node)) {
//             esnode.type = "BinaryExpression",
//             esnode.operator = operatorMap[node.operator] ?? node.operator
//         }
//         return esnode
//     },
//     Constraint(node: ast.Constraint, changes: Partial<ast.Constraint>) {
//         if (node.left && node.operator === "is") {
//             return changes.right!
//         }
//         else {
//             return null as any
//         }
//     },
//     ConstrainedType(node: ast.ConstrainedType, changes: Partial<ast.ConstrainedType>) {
//         for (let constraint of changes.constraints!) {
//             if (constraint != null) {
//                 return constraint
//             }
//         }
//         throw new Error("Missing Constraint")
//     },
//     UnionType(node: ast.UnionType, changes: Partial<ast.UnionType>) {
//         let value = changes.types![0] as any
//         for (let i = 1; i < changes.types!.length; i++) {
//             value = { type: "BinaryExpression", left: value, operator: "|", right: changes.types![i] }
//         }
//         return value
//     },
//     Argument(node: ast.Argument, changes: Partial<ast.Argument>) {
//         return changes.value
//     },
//     TypeReference(node: TypeReference) {
//         return { type: "Identifier", name: node.name }
//     },
//     Module(node: Module, changes: Partial<Module>, helper, ancestors, path) {
//         let lastName = path[path.length - 1].split('.').pop()!
//         return {
//             type: "Program",
//             leadingComments: [{
//                 value: DO_NOT_EDIT_WARNING
//             }],
//             body: [
//                 ...(changes.declarations ?? []).values(),
//                 // add a default export of declaration with same name as module if such a declaration exists.
//                 ...(
//                     node.declarations.map(d => d.id.name).includes(lastName) ? [{
//                     type: "ExportDefaultDeclaration",
//                     declaration: {
//                         type: "Identifier",
//                         name: lastName
//                     }
//                 }] : [])
//             ]
//         }
//     },
//     // TemplateReference(node: TemplateReference, changes: Partial<TemplateReference>) {
//     //     let result = {
//     //         ...changes.baseType,
//     //         genericArguments: changes.arguments
//     //     }
//     //     return result
//     // },
//     ExpressionStatement(node: ExpressionStatement, changes: Partial<ExpressionStatement>) {
//         return {
//             type: "ExpressionStatement",
//             expression: changes.value!
//         }
//     },
//     DotExpression(node: ast.DotExpression) {
//         return {
//             type: "Identifier",
//             name: "value"
//         }
//     },
//     CallExpression(node: CallExpression, changes: Partial<CallExpression>) {
//         const isConstructor = node.new || isTypeReference(node.callee)
//         return {
//             type: isConstructor ? "NewExpression" : "CallExpression",
//             callee: changes.callee,
//             arguments: changes.arguments
//         }
//     },
//     ClassDeclaration(node: ClassDeclaration, changes: Partial<ClassDeclaration>, helper, ancestors, path) {
//         const isAssignable = d => d.kind === "let"
//         return replace(
//             maybeExport(
//                 node,
//                 {
//                     type: "ClassDeclaration",
//                     id: changes.id,
//                     implements: changes.baseClasses!,
//                     body: {
//                         type: "ClassBody",
//                         body: [
//                             // static readonly id = "ClassName"
//                             {
//                                 type: "VariableDeclaration",
//                                 kind: "static readonly",
//                                 declarations: [{
//                                     type: "VariableDeclarator",
//                                     id: { type: "Identifier", name: "id" },
//                                     init: {
//                                         type: "Literal",
//                                         value: getUniqueClientName(getAbsoluteName(path[1], node.id.name))
//                                     }
//                                 }]
//                             },
//                             ...(changes.declarations ?? []).map((d: any) => {
//                                 if (isAssignable(d)) {
//                                     return {
//                                         ...d,
//                                         kind: "readonly",
//                                         declarations: d.declarations.map(dd => ({ ...dd, init: null }))
//                                     }
//                                 }
//                                 else {
//                                     let id = d.declarations[0].id
//                                     return {
//                                         type: "MethodDefinition",
//                                         kind: "get",
//                                         key: isValidId(id.name) ? id : { type: "Literal", value: id.name },
//                                         value: {
//                                             type: "FunctionExpression",
//                                             params: [],
//                                             body: {
//                                                 type: "BlockStatement",
//                                                 body: [{
//                                                     type: "ReturnStatement",
//                                                     argument: d.declarations[0].init
//                                                 }]
//                                             }
//                                         }
//                                     }
//                                 }
//                             }),
//                             // // static readonly implements = new Set(...)
//                             // {
//                             //     type: "VariableDeclaration",
//                             //     kind: "static readonly",
//                             //     declarations: [{
//                             //         type: "VariableDeclarator",
//                             //         id: { type: "Identifier", name: "implements" },
//                             //         init: {
//                             //             type: "NewExpression",
//                             //             callee: { type: "Identifier", name: "Set" },
//                             //             arguments: [{                            
//                             //                 type: "ArrayExpression",
//                             //                 elements: node._implements.map(value => ({ type: "Literal", value }))
//                             //             }]
//                             //         }
//                             //     }]
//                             // },
//                             {
//                                 type: "MethodDefinition",
//                                 kind: "constructor",
//                                 key: { type: "Identifier", name: "constructor" },
//                                 value: {
//                                     type: "FunctionExpression",
//                                     params: !node.isStructure ? (() => {
//                                         // we need to use the ObjectPattern
//                                         return  [
//                                             {
//                                                 type: "ObjectPattern",
//                                                 properties: (changes.declarations ?? []).filter(isAssignable).map((d: any) => {
//                                                     let declaration = d.declarations[0]
//                                                     let name = declaration.id.name
//                                                     let localName = renameIfReserved(name)
//                                                     return {
//                                                         type: "Property",
//                                                         kind: "init",
//                                                         shorthand: name === localName,
//                                                         key: { type: "Identifier", name },
//                                                         value: declaration.init ? {
//                                                             type: "AssignmentPattern",
//                                                             left: { type: "Identifier", name: localName },
//                                                             right: declaration.init
//                                                         }
//                                                         : { type: "Identifier", name: localName },
//                                                     }
//                                                 }),
//                                                 tstype: {
//                                                     type: "ObjectExpression",
//                                                     properties: (changes.declarations ?? []).filter(isAssignable).map((d: any) => {
//                                                         let declaration = d.declarations[0]
//                                                         let required = declaration.init == null
//                                                         let name = declaration.id.name
//                                                         return {
//                                                             type: "Property",
//                                                             kind: "init",
//                                                             key: { type: "Identifier", name: required ? name : `${name}?` },
//                                                             value: declaration.tstype,
//                                                         }
//                                                     })
//                                                 }
//                                             }
//                                         ]
//                                     })() : (changes.declarations ?? []).filter(isAssignable).map((d: any) => {
//                                         let declaration = d.declarations[0]
//                                         let parameter: any = {
//                                             type: "Identifier",
//                                             name: declaration.id.name,
//                                             tstype: declaration.tstype
//                                         }
//                                         if (declaration.init) {
//                                             parameter = {
//                                                 type: "AssignmentPattern",
//                                                 left: parameter,
//                                                 right: declaration.init
//                                             }
//                                         }
//                                         return parameter
//                                     }),
//                                     body: {
//                                         type: "BlockStatement",
//                                         body: [
//                                             ...(changes.declarations ?? []).map((d: any, index) => {
//                                                 if (!isAssignable(d) || d.declarations[0].tstype == null) {
//                                                     return null
//                                                 }
//                                                 let originalDeclaration = node.declarations[0]
//                                                 let declarator = d.declarations[0]
//                                                 let name = declarator.id.name
//                                                 let localName = renameIfReserved(name)
//                                                 return {
//                                                     type: "IfStatement",
//                                                     test: {
//                                                         type: "UnaryExpression",
//                                                         operator: "!",
//                                                         prefix: true,
//                                                         argument: toTypescriptAst(traverse(createRuntimeTypeCheckExpression(
//                                                             originalDeclaration.type as UnionType,
//                                                             new Reference({ name: localName })
//                                                         ), {
//                                                             leave(node) {
//                                                                 // Not pretty, but it works for now.
//                                                                 // TODO: Make a better intermediate language.
//                                                                 if (BinaryExpression.is(node) && node.operator === "is") {
//                                                                     return toTypeCheckFunction(node.right as any, new Reference({ name: localName }))
//                                                                 }
//                                                             }
//                                                         }))
//                                                     },
//                                                     consequent: {
//                                                         type: "ThrowStatement",
//                                                         argument: {
//                                                             type: "NewExpression",
//                                                             callee: { type: "Identifier", name: "Error" },
//                                                             arguments: [{
//                                                                 type: "BinaryExpression",
//                                                                 left: {
//                                                                     type: "Literal",
//                                                                     value: `${declarator.id.name} is not a ${getTypeReferenceName(declarator.tstype)}: `
//                                                                 },
//                                                                 operator: "+",
//                                                                 right: {
//                                                                     type: "CallExpression",
//                                                                     callee: {
//                                                                         type: "MemberExpression",
//                                                                         object: { type: "Identifier", name: "Class" },
//                                                                         property: { type: "Identifier", name: "toString" }
//                                                                     },
//                                                                     arguments: [
//                                                                         { type: "Identifier", name: localName }
//                                                                     ]
//                                                                 }
//                                                             }]
//                                                         }
//                                                     }
//                                                 }
//                                             }).filter(d => d != null),
//                                             ...(changes.declarations ?? []).filter(isAssignable).map((d: any) => {
//                                                 let name = d.declarations[0].id.name
//                                                 let localName = renameIfReserved(name)
//                                                 return {
//                                                     type: "ExpressionStatement",
//                                                     expression: {
//                                                         type: "AssignmentExpression",
//                                                         left: {
//                                                             type: "MemberExpression",
//                                                             object: { type: "ThisExpression" },
//                                                             property: { type: "Identifier", name: name }
//                                                         },
//                                                         operator: "=",
//                                                         right: { type: "Identifier", name: localName }
//                                                     }
//                                                 }
//                                             }),
//                                             // Object.freeze(this)
//                                             {
//                                                 type: "ExpressionStatement",
//                                                 expression: {
//                                                     type: "CallExpression",
//                                                     callee: {
//                                                         type: "MemberExpression",
//                                                         object: { type: "Identifier", name: "Object" },
//                                                         property: { type: "Identifier", name: "freeze" }
//                                                     },
//                                                     arguments: [ { type: "ThisExpression" } ]
//                                                 }
//                                             }
//                                         ]
//                                     }
//                                 },
//                             },
//                             ...(node.isStructure ? [] : [{
//                                 type: "MethodDefinition",
//                                 kind: "method",
//                                 key: { type: "Identifier", name: "patch" },
//                                 value: {
//                                     type: "FunctionExpression",
//                                     params: (() => {
//                                         // we need to use the ObjectPattern
//                                         return  [{
//                                             type: "Identifier",
//                                             name: "properties",
//                                             tstype: {
//                                                 type: "ObjectExpression",
//                                                 properties: (changes.declarations ?? []).filter(isAssignable).map((d: any) => {
//                                                     let declaration = d.declarations[0]
//                                                     let name = declaration.id.name
//                                                     return {
//                                                         type: "Property",
//                                                         kind: "init",
//                                                         key: { type: "Identifier", name: `${name}?` },
//                                                         value: declaration.tstype,
//                                                     }
//                                                 })
//                                             }
//                                         }]
//                                     })(),
//                                     body: {
//                                         type: "BlockStatement",
//                                         body: [
//                                             {
//                                                 type: "ReturnStatement",
//                                                 argument: {
//                                                     type: "NewExpression",
//                                                     callee: { type: "Identifier", name: node.id.name },
//                                                     arguments: [{
//                                                         type: "ObjectExpression",
//                                                         properties: [
//                                                             {
//                                                                 type: "SpreadElement",
//                                                                 argument: { type: "ThisExpression" }
//                                                             },
//                                                             {
//                                                                 type: "SpreadElement",
//                                                                 argument: { type: "Identifier", name: "properties" }
//                                                             }
//                                                         ]
//                                                     }]
//                                                 }
//                                             }
//                                         ]
//                                     }
//                                 },
//                             }]),
//                             {
//                                 type: "MethodDefinition",
//                                 kind: "method",
//                                 static: true,
//                                 key: { type: "Identifier", name: "is" },
//                                 value: {
//                                     type: "FunctionExpression",
//                                     params: [ { type: "Identifier", name: "value" } ],
//                                     body: {
//                                         type: "BlockStatement",
//                                         body: [
//                                             {
//                                                 type: "ReturnStatement",
//                                                 argument: {
//                                                     type: "CallExpression",
//                                                     callee: { type: "Identifier", name: getTypeCheckFunctionName(node.id.name) },
//                                                     arguments: [{ type: "Identifier", name: "value" }]
//                                                 }
//                                             }
//                                         ]
//                                     },
//                                     tstype: ({ type: "BinaryExpression", left: { type: "Identifier", name: "value" }, operator: "is", right: changes.id })
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             ),
//         )
//     },
//     BlockStatement(node: BlockStatement, changes: Partial<BlockStatement>) {
//         return {
//             type: "BlockStatement",
//             body: changes.statements ?? [],
//         }
//     },
//     Parameter(node: Parameter, changes: Partial<Parameter>) {
//         if (node.value) {
//             return {
//                 type: "AssignmentPattern",
//                 left: changes.id,
//                 right: changes.value,
//             }
//         }
//         else {
//             return { ...changes.id, tstype: changes.type }
//         }
//     },
//     ReturnStatement(node: ReturnStatement, changes: Partial<ReturnStatement>) {
//         return {
//             type: "ReturnStatement",
//             argument: changes.value
//         }
//     },
//     FunctionExpression(node: FunctionExpression, changes: Partial<FunctionExpression>) {
//         return {
//             type: "FunctionExpression",
//             id: changes.id,
//             params: changes.parameters,
//             tstype: changes.typeGuard ? ({
//                 type: "BinaryExpression",
//                 left: getIdentifier(changes.parameters![0]),
//                 operator: "is",
//                 right: changes.typeGuard
//             }) : changes.returnType,
//             body: changes.body,
//         }
//     },
//     FunctionType(node: FunctionType) {
//         return {
//             type: "Identifier",
//             value: "TodoFunctionType"
//         }
//     },
//     ImportDeclaration(node: ImportDeclaration, changes: Partial<ImportDeclaration>, helper, ancestors, path: string[]) {
//         let thisModuleName = path[1]
//         return {
//             type: "ImportDeclaration",
//             specifiers: [
//                 {
//                     type: "ImportNamespaceSpecifier",
//                     local: {
//                         type: "Identifier",
//                         name: node.id.name
//                     }
//                 }
//             ],
//             source: {
//                 type: "Literal",
//                 value: toRelativeModulePath(thisModuleName, node.from),
//             }
//         }
//     },
//     TypeDeclaration(node: VariableDeclaration, changes, helper, ancestors, path) {
//         return (toAstMerge.VariableDeclaration as any)(node, changes, helper, ancestors, path, "type")
//     },
//     VariableDeclaration(node: VariableDeclaration, changes: Partial<VariableDeclaration>, helper, ancestors, path: string[], kind?: string) {
//         let value = changes.value as any
//         if (value && value.type === "FunctionExpression" && (value.id == null || node.id.name === value.id.name)) {
//             // simplify
//             //  const foo = function foo() {}
//             // into
//             //  function foo() {}
//             return maybeExport(node, { ...value, id: { type: "Identifier", name: node.id.name }, type: "FunctionDeclaration" })
//         }

//         return maybeExport(node, {
//             type: "VariableDeclaration",
//             kind: kind ?? (node.assignable ? "let" : "const"),
//             declarations: [{
//                 type: "VariableDeclarator",
//                 id: changes.id,
//                 tstype: changes.type,
//                 init: changes.value
//             }]
//         })
//     },
//     Assembly(node: Assembly, changes: Partial<Assembly>) {
//         return new Output({ files: changes.modules as any })
//     }
// }

// function maybeExport(node: Declaration, ast) {
//     if (Declaration.is(node) && node.export) {
//         return {
//             type: "ExportNamedDeclaration",
//             declaration: ast,
//         }
//     }
//     return ast
// }

// const visitor = {
//     enter(node, ancestors, path) {
//         return (toAstEnter[node.constructor.name] ?? toAstEnter.default)(node, ancestors, path)
//     },
//     merge(node, ancestors, path, values, helper) {
//         return (toAstMerge[node.constructor.name] ?? toAstMerge.default)(node, ancestors, path, values, helper)
//     },
// };

// export default function toTypescriptAst(node): Output {
//     return traverse(node, visitor)
// }
