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
    "is": null,
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
    Reference(node, c: EvaluateContext) {
        // let scope = c.scopes.get(node)
        // let declaration = scope[node.name]
        // if (!declaration.isMutable && ast.Variable.is(declaration) && declaration.value != null) {
        //     // we will only replace references with literal values IF they are numbers
        //     let { value } = declaration
        //     if (Literal.is(value) && typeof value.value === "number") {
        //         return value
        //     }
        // }
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
