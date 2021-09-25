import { Lookup, traverse } from "@glas/traverse";
import evaluate from "../analysis/evaluate";
import getSortedExpressions from "../analysis/getSortedExpressions";
import { Expression, Literal, Module, TypeExpression } from "../ast";
import * as ast from "../ast";
import { SemanticError } from "../common";
import { Options } from "../Compiler"
import createScopeMaps, { createGlobalScope } from "../createScopeMaps";
import * as types from "../types"
import EvaluateContext from "../analysis/EvaluateContext";
import combineExpressions from "../analysis/combineExpressions";

function getResolved<T extends Expression>(lookup: Lookup, node: T): T | null  {
    if (node.type != null) {
        return node
    }
    let current = lookup.getCurrent(node)
    if (current.type != null) {
        return current
    }
    return null
}
function setResolved(lookup: Lookup, originalNode: Expression, currentNode: Expression) {
    lookup.setCurrent(originalNode, currentNode)
}


const literalTypes = {
    boolean: types.Boolean,
    number: types.Number,
    object: types.Object,
    string: types.String,
}

const binaryOperationsType = {
    "<": types.Boolean,
    ">": types.Boolean,
    "<=": types.Boolean,
    ">=": types.Boolean,
    "==": types.Boolean,
    "!=": types.Boolean,
    "is": types.Boolean,
    // "&": types.Boolean,
    // "|": types.Boolean,
    "^": types.Number,
    "+": types.Number,
    "-": types.Number,
    "*": types.Number,
    "/": types.Number,
    "%": types.Number,
}

export const inferType: {
    [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, props: EvaluateContext) => any
} = {
    BinaryExpression(node, c) {
        let type = binaryOperationsType[node.operator]
        if (type == null) {
            type = c.lookup.getCurrent(node.left).type
            // throw SemanticError(`Could not find type for operator: ${node.operator}`, node)
        }
        return { type }
    },
    Literal(node) {
        let jstypeof = typeof node.value
        let type = literalTypes[jstypeof]
        if (type == null) {
            throw SemanticError(`Cannot find type ${jstypeof}`, type)
        }
        type = new TypeExpression({
            value: combineExpressions([
                new ast.BinaryExpression({
                    left: new ast.DotExpression({}), operator: "is", right: type
                }),
                new ast.BinaryExpression({
                    left: new ast.DotExpression({}), operator: "==", right: node
                })
            ])
        })
        return { type }
    },
}

export default function inferTypes(
    module: Module,
    options: Options
): Module | Error[] {
    let lookup = new Lookup()
    let scopes = createScopeMaps(module, { globalScope: options.globalScope, lookup })
    let sorted = getSortedExpressions(module, scopes, lookup)
    let customConvertedNodes = new Set<Expression>()

    // console.log(sorted)

    function ensureResolved(originalNode: Expression) {
        let resolved = getResolved(lookup, originalNode)
        if (resolved) {
            return resolved
        }

        let context = { lookup, scopes }
        // first try to simplify
        let currentNode = originalNode
        currentNode = evaluate(currentNode, context)
        setResolved(lookup, originalNode, currentNode)
        // then try to infer types
        if (currentNode.type == null) {
            let func = inferType[currentNode.constructor.name]
            let changes = func?.(currentNode, context)
            if (changes != null) {
                if (Expression.is(changes)) {
                    // we track these so they don't get properties merged later but are returned as is.
                    customConvertedNodes.add(changes)
                    currentNode = changes
                }
                else {
                    currentNode = currentNode.patch(changes)
                }
            }
            setResolved(lookup, originalNode, currentNode)
        }
        return currentNode
    }

    for (let originalNode of sorted) {
        ensureResolved(originalNode)
    }

    return traverse(module, {
        merge(node, changes, helper) {
            let result = lookup.getCurrent(node)
            if (customConvertedNodes.has(result)) {
                return result
            }
            if (result) {
                return Expression.is(changes) ? changes : helper.patch(result, changes)
            }
        }
    })

}
