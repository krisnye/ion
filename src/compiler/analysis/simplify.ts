import { Expression, BinaryExpression, UnaryExpression, TypeExpression } from "../ast";
import toCodeString from "../toCodeString";
import { memoize } from "../common";
import { traverse } from "@glas/traverse";
import normalize from "./normalize";
import splitExpressions from "./splitExpressions";

function find<T>(items: Iterable<T>, predicate: (value: T) => boolean): T | null {
    for (let item of items) {
        if (predicate(item)) {
            return item
        }
    }
    return null
}

function equals(a: Expression, b: Expression) {
    return toCodeString(a) === toCodeString(b)
}

const simplify = memoize(function(e: Expression): Expression {
    e = normalize(e)
    if (TypeExpression.is(e)) {
        let value = simplify(e.value)
        if (e.value !== value) {
            e = e.patch({ value })
        }
    }

    if (BinaryExpression.is(e)) {
        const left = simplify(e.left)
        const right = simplify(e.right)
        if (equals(left, right)) {
            if (e.operator === "&" || e.operator == "|") {
                //  A &  A => A
                //  A |  A => A
                return left
            }
        }
        else if (e.operator === "|") {
            if (find(splitExpressions(left, "&"), c => equals(c, right))) {
                // A & B | A => A
                return right
            }
            if (find(splitExpressions(right, "&"), c => equals(c, left))) {
                //  A | A & B => A
                return left
            }
            if (find(splitExpressions(left, "|"), c => equals(c, right))) {
                // (A | B) | A => A | B
                return left
            }
            if (find(splitExpressions(right, "|"), c => equals(c, left))) {
                //  A | (A & B) => A | B
                return right
            }
        }
        else if (e.operator === "&") {
            for (let c of splitExpressions(left, "|")) {
                if (equals(c, right)) {
                    // (A | B) & A => A
                    return right
                }
                if (UnaryExpression.is(right) && right.operator === "!" && equals(c, right.argument)) {
                    //  (A | B) && !A => B
                    //  (A | B | C) && !A => B | C
                    return traverse(left, {
                        // find and remove the impossible clause
                        leave(node) {
                            if (BinaryExpression.is(node) && node.operator === "|") {
                                if (equals(node.left, right.argument)) {
                                    return node.right
                                }
                                if (equals(node.right, right.argument)) {
                                    return node.left
                                }
                            }
                        }
                    })
                }
            }
            for (let c of splitExpressions(right, "|")) {
                if (equals(c, left)) {
                    // A & (A | B) => A
                    return left
                }
            }
        }
        // should be normalized
        if (e.left !== left || e.right !== right) {
            e = e.patch({ left, right })
        }
    }
    else if (UnaryExpression.is(e)) {
        let argument = simplify(e.argument)
        if (e.operator === "!" && e.argument !== argument) {
            e = e.patch({ argument })
        }
    }
    return e
}, true)

export default simplify
