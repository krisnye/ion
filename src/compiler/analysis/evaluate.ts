import Expression from "../ast/Expression";
import Literal from "../ast/Literal";
import * as ast from "../ast";
import EvaluateContext from "./EvaluateContext";
import simplify from "./simplify";

export const binaryOps = {
    "|": (a, b) => a | b,
    "&": (a, b) => a & b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "**": (a, b) => a ** b,
    "^": (a, b) => a ^ b,
    "<": (a, b) => a < b,
    ">": (a, b) => a > b,
    "<=": (a, b) => a <= b,
    ">=": (a, b) => a >= b,
    "==": (a, b) => a === b,
    "!=": (a, b) => a !== b,
    "&&": "&",
    "||": "|",
    "!==": "!=",
    "===": "==",
}

export const unaryOps = {
    "!": (a) => ! a,
    "+": (a) => + a,
    "-": (a) => - a,
    "~": (a) => ~ a,
}

export const evaluateFunctions: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, context: EvaluateContext) => any} = {
    BinaryExpression(node, c) {
        let left = c.lookup.getCurrent(node.left)
        let right = c.lookup.getCurrent(node.right)
        if (Literal.is(left) && Literal.is(right)) {
            let value = binaryOps[node.operator](left.value, right.value)
            return new Literal({ location: node.location, value })
        }
    },
    UnaryExpression(node, c) {
        if (Literal.is(node.argument)) {
            let arg = c.lookup.getCurrent(node.argument)
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

export default function evaluate(node: Expression, context: EvaluateContext) {
    let func = evaluateFunctions[node.constructor.name]
    return func?.(node, context) ?? node
}
