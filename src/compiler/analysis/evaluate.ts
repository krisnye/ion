import Expression from "../ast/Expression";
import Literal from "../ast/Literal";
import * as ast from "../ast";
import EvaluateContext from "./EvaluateContext";

export const binaryOps = {
    "|": (a, b) => a | b,
    "&": (a, b) => a & b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
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
    "min": (a, b) => Math.min(a, b),
    "max": (a, b) => Math.max(a, b),
    "pow": (a, b) => Math.pow(a, b),
}

export const unaryOps = {
    "!": (a) => ! a,
    "+": (a) => + a,
    "-": (a) => - a,
    "~": (a) => ~ a,
    "abs": (a) => Math.abs(a),
    "inv": (a) => 1 / a,
}

export const evaluateFunctions: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, context: EvaluateContext) => any} = {
    BinaryExpression(node, c) {
        let left = evaluate(c.lookup.getCurrent(node.left), c)
        let right = evaluate(c.lookup.getCurrent(node.right), c)
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
        // let value = c.getValue(node)
        // console.log(`${node.name} ->`, toCodeString(value))
    },
    MemberExpression(node) {
    },
    ArrayExpression(node) {
    },
    Call(node) {
        //  This is where real evaluation happens.
        //  Also, Conditionals, Loops.
        //  check and see if this is evaluatable?
        //  console.log("!!! Evaluate this shit!", node)
    },
}

export default function evaluate(node: Expression, context: EvaluateContext) {
    let func = evaluateFunctions[node.constructor.name]
    return func?.(node, context) ?? node
}
