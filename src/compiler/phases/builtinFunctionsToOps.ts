import { traverse, skip, replace, Lookup } from "@glas/traverse";
import combineExpressions from "../analysis/combineExpressions";
import { binaryOps, unaryOps } from "../analysis/evaluate";
import { isSubtype } from "../analysis/newTypeAnalysis";
import { combineNumberTypes, numberType, isLiteralNumberType } from "../analysis/numberTypes";
import { Assignment, BinaryExpression, Call, ClassDeclaration, Type, Expression, ExpressionStatement, FunctionExpression, Identifier, Literal, Module, ObjectExpression, Position, Reference, Variable, Property, MemberExpression, ArrayExpression, Declarator, Node, Block, Conditional, OutlineOperation, Declaration, For, SideEffect, UnaryExpression, NumberType, IntersectionType, ObjectType, ArrayPattern, PatternProperty, RestElement, ObjectPattern, Argument } from "../ast";
import { hasNodesOfType, SemanticError, isTypeName, isMetaName } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import { getLastName } from "../pathFunctions";
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
            if (Call.is(node) && Reference.is(node.callee)) {
                let isBuiltin = ops[node.callee.name] != null
                if (isBuiltin) {
                    if (node.arguments.length === 2) {
                        let [left, right] = <Array<Argument>><any>node.arguments
                        return new BinaryExpression({ ...node, left: left.value, right: right.value, operator: node.callee.name })
                    }
                    if (node.arguments.length === 1) {
                        return new UnaryExpression({ ...node, operator: node.callee.name, argument: arguments[0] })
                    }
                    errors.push(SemanticError(`Unexpected argument count`, node.callee))
                }
            }
        }
    })
}