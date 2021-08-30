import Expression from "../ast/Expression";
import Literal from "../ast/Literal";
import * as ast from "../ast";
import { ScopeMaps } from "../createScopeMaps";

const binaryOps = {
    "||": (a, b) => a || b,
    "&&": (a, b) => a && b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "**": (a, b) => a ** b,
    "^": (a, b) => a ^ b,
}

const unaryOps = {
    "!": (a) => ! a,
    "+": (a) => + a,
    "-": (a) => - a,
    "~": (a) => ~ a,
}

export const simplifyFunctions: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, resolved: { get<T>(t: T): T }, scope: ScopeMaps) => any} = {
    BinaryExpression(node, resolved) {
        let left = resolved.get(node.left)
        let right = resolved.get(node.right)
        if (Literal.is(left) && Literal.is(right)) {
            let value = binaryOps[node.operator](left.value, right.value)
            return new Literal({ location: node.location, value })
        }
    },
    UnaryExpression(node, resolved) {
        if (Literal.is(node.argument)) {
            let arg = resolved.get(node.argument)
            let value = unaryOps[node.operator](arg.value)
            return new Literal({ location: node.location, value })
        }
    },
    Literal(node) {
    },
    ClassDeclaration(node) {
    },
    Variable(node) {
    },
    FunctionExpression(node) {
    },
    Reference(node) {
    },
    MemberExpression(node) {
    },
    ArrayExpression(node) {
    },
    Call(node) {
    },
}

export default function evaluate(node: Expression, resolved: Map<ast.Node,ast.Node>, scopes: ScopeMaps) {
    let func = simplifyFunctions[node.constructor.name]
    return func?.(node, resolved, scopes) ?? node
}
