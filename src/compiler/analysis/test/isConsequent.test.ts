import { strict as assert } from "assert"
import { BinaryExpression, Reference, Identifier, MemberExpression, UnaryExpression, CallExpression, Property, Literal, Expression, ExpressionStatement } from "../../ast"
import toCodeString from "../../toCodeString"
import isConsequent from "../isConsequent"
import simplify from "../simplify"
import negateExpression from "../negate"
import combineExpressions from "../combineExpressions"
import splitExpressions from "../splitExpressions"
import { createIsType } from "../isType"
import * as t from "../../types"

function e(expr: string): Reference
function e(expr: number): Literal
function e(expr: string | number | Expression): Expression
function e(expr: string | number | Expression) {
    if (!Expression.is(expr)) {
        expr = typeof expr === 'string' ? new Reference({ name: expr, path: `/${expr}` }) : new Literal({ value: expr })
    }
    return expr
}
function b(left: string | number | Expression, operator: string, right: string | number | Expression) {
    left = e(left)
    right = e(right)
    return new BinaryExpression({ left, operator, right })
}
function c(callee, ...args: Array<string | number | Expression>) {
    return new CallExpression({
        callee: e(callee),
        arguments: args.map(e)
    })
}
function not(a: Expression) {
    return negateExpression(a)
}
type E = string | number | Expression
function and(A: E, B: E) {
    return b(A, "&&", B)
}
function or(A: E, B: E) {
    return b(A, "||", B)
}
function lt(A: E, B: E) {
    return b(A, "<", B)
}
function gt(A: E, B: E) {
    return b(A, ">", B)
}
function lte(A: E, B: E) {
    return b(A, ">=", B)
}
function gte(A: E, B: E) {
    return b(A, "<=", B)
}
function ne(A: E, B: E) {
    return b(A, "!=", B)
}
function eq(A: E, B: E) {
    return b(A, "==", B)
}
function is(A: E, B: E) {
    return b(A, "is", B)
}
let Animal = e("Animal")
let Dog = e("Dog")
let Cat = e("Cat")
let isType = createIsType([
    [Animal, t.Object],
    [Cat, t.Object, Animal],
    [Dog, t.Object, Animal],
])
function testConsequent(a: Expression, b: Expression, ab_expected: true | false | null, ba_expected: true | false | null) {
    const ab_actual = isConsequent(a, b, isType)
    const ba_actual = isConsequent(b, a, isType)
    assert.equal(ab_actual, ab_expected, `\n${toCodeString(a)} => ${toCodeString(b)}, expected ${ab_expected}, actual: ${ab_actual}`)
    assert.equal(ba_actual, ba_expected, `\n${toCodeString(b)} => ${toCodeString(a)}, expected ${ba_expected}, actual: ${ba_actual}`)
}

testConsequent(b("foo", ">", 1), b("foo", ">", 0), true, null)
testConsequent(b("foo", "<", 1), b("foo", "<", 2), true, null)
testConsequent(b("foo", ">=", 1), b("foo", ">=", 0), true, null)
testConsequent(b("foo", "<=", 1), b("foo", "<=", 2), true, null)
testConsequent(b("foo", ">", 0), b("foo", ">", 0), true, true)
testConsequent(b("foo", ">", 0), b("foo", "<", 0), false, false)
testConsequent(b("foo", ">=", 0), b("foo", "<", 0), false, false)
testConsequent(b("foo", ">=", 0), b("foo", "<=", 0), null, null)
testConsequent(b("foo", "<", 0), b("foo", "!=", 0), true, null)
testConsequent(b("foo", ">", 0), b("foo", "!=", 0), true, null)
testConsequent(b("foo", "==", 0), b("foo", "<=", 0), true, null)
testConsequent(b("foo", "==", 0), b("foo", ">=", 0), true, null)
testConsequent(b("foo", "==", "x"), b("foo", ">=", "x"), true, null)
testConsequent(b("foo", "==", "x"), b("foo", "<=", "x"), true, null)
testConsequent(b("foo", "==", "x"), b("foo", ">", "x"), false, false)
testConsequent(b("foo", "==", "x"), b("foo", "<", "x"), false, false)
testConsequent(b("foo", ">", "x"), b("foo", ">=", "x"), true, null)
testConsequent(b("foo", "<", "x"), b("foo", "<=", "x"), true, null)
testConsequent(b("foo", "<", "x"), b("foo", "!=", "x"), true, null)
testConsequent(b("foo", ">", 0), b("foo", "!=", 0), true, null)
testConsequent(
    b(b("foo", "<", "x"), "||", b("foo", ">", "x")),
    b("foo", "!=", "x"),
    true,
    null    // although conceptually, != x implies > x | < x, our analysis does not recognize this.
)

testConsequent(
    and(
        b("foo", "is", t.Number),
        b("foo", "==", 12),
    ),
    and(
        b("foo", "is", t.Number),
        b("foo", "<", 10),
    ),
    false,
    false,
)

testConsequent(
    and(
        b("foo", "is", t.Number),
        b("foo", ">", 10),
    ),
    and(
        b("foo", "is", t.Integer),
        b("foo", "==", 9),
    ),
    false,
    false,
)

testConsequent(b("foo", "is", Dog), b("foo", "isnt", Dog), false, false)
testConsequent(b("foo", "is", Cat), b("foo", "is", Cat), true, true)
testConsequent(b("foo", "is", Cat), b("foo", "is", Dog), null, null)
testConsequent(b("foo", "is", Cat), b("foo", "is", Animal), true, null)
testConsequent(b("foo", "is", Dog), b("foo", "is", Animal), true, null)
testConsequent(b("foo", "is", Dog), b("foo", "is", t.Object), true, null)
testConsequent(b("foo", "is", Dog), b("foo", "is", t.Boolean), false, false)
testConsequent(b("foo", "is", Dog), b("foo", "is", t.String), false, false)
testConsequent(b("foo", "is", Dog), b("foo", "is", t.RegExp), false, false)
testConsequent(b("foo", "is", Dog), b("foo", "is", t.Array), false, false)

testConsequent(
    b(b("foo", "is", Cat), "&&", b("foo", "is", Dog)),
    b(b("foo", "is", Cat), "||", b("foo", "is", Dog)),
    true,
    null
)

testConsequent(
    b(b("foo", "is", "Bar"), "||", b("foo", "is", "Baz")),
    b("foo", "is", "Bar"),
    null,
    true
)
testConsequent(
    b(b("foo", "is", "Bar"), "&&", b("foo", "is", "Baz")),
    b("foo", "is", "Bar"),
    true,
    null
)
testConsequent(
    b(b("foo", "is", "Bar"), "&&", b("foo", "is", "Baz")),
    b(b("foo", "is", "Bar"), "||", b("foo", "is", "Baz")),
    true,
    null
)

testConsequent(
    b(b("foo", ">", 0), "&&", b("foo", "<", 10)),
    b(b("foo", ">", 1), "&&", b("foo", "<", 8)),
    null,
    true
)

testConsequent(
    b(b("foo", ">", 0), "||", b("foo", "<", 10)),
    b(b("foo", ">", 1), "||", b("foo", "<", 8)),
    null,
    true
)
testConsequent(
    b(b("foo", ">", 0), "||", b("foo", "<", 10)),
    b(b("foo", ">", 1), "&&", b("foo", "<", 8)),
    null,
    true
)
testConsequent(
    b(c("foo", 1, 2), "&&", c("bar", 3, 4)),
    c("foo", 1, 2),
    true,
    null
)

// simplify Expressions test

function testSimplify(input: Expression, expected: Expression) {
    let actual = simplify(input)
    let as = toCodeString(actual)
    let es = toCodeString(expected)
    assert(as === es, `simplify(${toCodeString(input)}), expected: ${es}, actual: ${as}`)
}

const A = e("A")
const B = e("B")
const C = e("C")
const D = e("D")
const E = e("E")

testSimplify(or(and(A, B), B), B)
testSimplify(or(and(A, A), A), A)
testSimplify(or(B, and(A, B)), B)
testSimplify(or(A, and(A, B)), A)

testSimplify(or(or(A, B), B), or(A, B))
testSimplify(or(A, or(B, A)), or(A, B))

testSimplify(and(or(A, B), A), A)
testSimplify(and(A, or(A, B)), A)

testSimplify(and(or(A, B), B), B)

testSimplify(and(or(A, B), not(A)), B)
testSimplify(and(or(or(A, B), C), not(B)), or(A, C))
testSimplify(and(or(A, or(B, C)), not(B)), or(A, C))

// test simplify 
testSimplify(eq(10, A), eq(A, 10))
testSimplify(is(10, A), is(10, A))// make sure 'is' operator is not sorted

// test toSubExpressions and combineExpressions
let chain = and(A, and(B, and(C, D)))
assert.deepStrictEqual(toCodeString(chain), toCodeString(combineExpressions([...splitExpressions(chain)])))
