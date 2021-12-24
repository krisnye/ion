import { Expression, BinaryExpression, UnaryExpression, TypeExpression, NumberType, NeverType, UnionType, IntersectionType, Node, Type, ReferenceType, Literal } from "../ast";
import toCodeString from "../toCodeString";
import { memoize } from "../common";
import { traverse } from "@glas/traverse";
import normalize from "./normalize";
import splitExpressions from "./splitExpressions";
import { combineAnyNumberTypes, intersectionOfNumberTypes, isLiteralNumberType, numberType } from "./numberTypes";
import * as types from "../types";

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

function removeDuplicates(nodes: Array<Type>) {
    let found = new Set<string>()
    let removed = nodes.filter(node => {
        let cs = toCodeString(node)
        if (found.has(cs)) {
            return false
        }
        found.add(cs)
        return true
    })
    return removed.length < nodes.length ? removed : nodes
}

function isLiteralNumberOrType(e: Expression, value: number) {
    return Literal.is(e) && e.value === value
        || isLiteralNumberType(e) && e.min?.value === value && e.max?.value === value;
}

const simplify = memoize(function(e: Expression): Expression {
    if (UnaryExpression.is(e)) {
        let argument = simplify(e.argument)
        if (e.operator === "-" && isLiteralNumberType(argument) && argument.min?.value === 0 && argument.max?.value === 0) {
            return argument
        }
        return argument !== e.argument ? e.patch({ argument }) : e
    }
    if (ReferenceType.is(e) && e.name === types.Number.name) {
        return numberType(null, null)
    }

    if (IntersectionType.is(e) || UnionType.is(e)) {
        // merge any adjacent number types
        let types = combineAnyNumberTypes(removeDuplicates(e.types.map(simplify)), UnionType.is(e))
        if (types.length === 1) {
            e = types[0]
        }
        else {
            e = e.patch({ types })
        }
    }

    e = normalize(e)

    if (NumberType.is(e)) {
        let min = e.min ? simplify(e.min) : e.min
        let max = e.max ? simplify(e.max) : e.max
        if (min != null && min.type != null) {
            min = min.type
        }
        if (max != null && max.type != null) {
            max = max.type
        }
        if (NumberType.is(min) && min.min) {
            min = min.min
        }
        if (NumberType.is(max) && max.max) {
            max = max.max
        }
        return ((min != null || max != null) && (min != e.min || max != e.max)) ? e.patch({ min, max }) : e
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
        else if (e.operator === "+") {
            if (isLiteralNumberOrType(e.left, 0)) {
                return e.right
            }
            if (isLiteralNumberOrType(e.right, 0)) {
                return e.left
            }
        }
        else if (e.operator === "-") {
            if (isLiteralNumberOrType(e.right, 0)) {
                return e.left
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
