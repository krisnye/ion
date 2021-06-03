import Assembly from "../ast/Assembly";
import { traverse, skip } from "../Traversal";
import Analysis from "../ast/Analysis";
import Expression from "../ast/Expression";
import Literal from "../ast/Literal";
import * as ast from "../ast";
import createScopeMaps, { ScopeMap, ScopeMaps } from "../createScopeMaps";
import getSortedTypedNodes from "../analysis/getSortedTypedNodes";

const binaryOps = {
    "|": (a, b) => a || b,
    "&": (a, b) => a && b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "^": (a, b) => a ** b,
    "xor": (a, b) => a ^ b,
}

const unaryOps = {
    "not": (a) => !a,
    "+": (a) => +a,
    "-": (a) => -a,
    "~": (a) => ~a,
}

// that is some typescript kung fu right there.
export const simplifyFunctions: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, resolved: { get<T>(t: T): T }, scope: ScopeMaps) => any} = {
    BinaryExpression(node, resolved) {
        let left = resolved.get(node.left)
        let right = resolved.get(node.right)
        if (Literal.is(left) && Literal.is(right)) {
            let value = binaryOps[node.operator](left.value, right.value)
            return new Literal({ location: node.location, value })
        }
    },
    UnaryExpression(node) {
        if (Literal.is(node.argument)) {
            let value = unaryOps[node.operator](node.argument)
            return new Literal({ location: node.location, value })
        }
    },
    Literal(node) {
    },
    ClassDeclaration(node) {
    },
    Parameter(node) {
    },
    VariableDeclaration(node) {
    },
    FunctionExpression(node) {
    },
    Reference(node) {
    },
    MemberExpression(node) {
    },
    ArrayExpression(node) {
    },
    CallExpression(node) {
    },
}

export default function evaluate(node: Expression, resolved: Map<ast.Node,ast.Node>, scopes: ScopeMaps) {
    let func = simplifyFunctions[node.constructor.name]
    return func?.(node, resolved, scopes) ?? node
}
