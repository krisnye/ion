import { traverse, skip, replace, Lookup } from "@glas/traverse";
import combineExpressions from "../analysis/combineExpressions";
import { binaryOps, unaryOps } from "../analysis/evaluate";
import { isSubtype } from "../analysis/newTypeAnalysis";
import { numberType, isLiteralNumberType } from "../analysis/numberTypes";
import { Assignment, BinaryExpression, Call, ClassDeclaration, Type, Expression, ExpressionStatement, FunctionExpression, Identifier, Literal, Module, ObjectExpression, Position, Reference, Variable, Property, MemberExpression, ArrayExpression, Declarator, Node, Block, Conditional, OutlineOperation, Declaration, For, SideEffect, UnaryExpression, NumberType, IntersectionType, ObjectType, ArrayPattern, PatternProperty, RestElement, ObjectPattern, Argument } from "../ast";
import { hasNodesOfType, SemanticError, isTypeName, isMetaName, getLast } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import { getLastName, isAbsolutePath } from "../pathFunctions";
import { _this } from "../reservedWords";
import * as ops from "../ops";

export default function builtinFunctionsToOps(
    module: Module,
    options: Options
): Module | Error[] {
    let errors = new Array<Error>()
    return traverse(module, {
        // skip(node) {
        //     return Node.is(node)
        // },
        leave(node) {
            if (BinaryExpression.is(node)) {
                if (Literal.is(node.left) && node.left.value === 1 && node.operator === "/") {
                    // convert 1 / x to inv x
                    return new UnaryExpression({...node, operator: "inv", argument: node.right})
                }
            }
            if (Call.is(node) && Reference.is(node.callee)) {
                let lastName = getLastName(node.callee.name)
                let isBuiltin = isAbsolutePath(node.callee.name) && ops[lastName] != null
                if (isBuiltin) {
                    if (node.arguments.length === 2) {
                        let [left, right] = <Array<Argument>><any>node.arguments
                        return new BinaryExpression({ ...node, left: left.value, right: right.value, operator: lastName })
                    }
                    if (node.arguments.length === 1) {
                        let [argument] = <Array<Argument>><any>node.arguments
                        return new UnaryExpression({ ...node, operator: lastName, argument: argument.value })
                    }
                    errors.push(SemanticError(`Unexpected argument count`, node.callee))
                }
            }
        }
    })
}