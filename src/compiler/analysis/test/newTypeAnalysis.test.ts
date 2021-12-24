import { strict as assert } from "assert"
import { Identifier, NumberType, Type, ObjectType, Property, Reference, ReferenceType, UnionType, IntersectionType } from "../../ast"
import { isSubtype } from "../newTypeAnalysis"
import { numberTypesAdjacent, intersectionOfNumberTypes, isNumberSubtype, numberNotEqual, numberType } from "../numberTypes"
import * as types from "../../types"
import toCodeString from "../../toCodeString"
import normalize from "../normalize"
import simplify from "../simplify"

assert.strictEqual(intersectionOfNumberTypes([numberType(10), numberType(20)]), null)

// numbertypes overlapping
assert.strictEqual(numberTypesAdjacent(numberType(1, 2, true, true), numberType(3, 4, true, true)), false)
assert.strictEqual(numberTypesAdjacent(numberType(1, 2, true, true), numberType(2, 3, true, true)), false)
assert.strictEqual(numberTypesAdjacent(numberType(1, 2, true, false), numberType(2, 3, true, true)), true)
assert.strictEqual(numberTypesAdjacent(numberType(1, 2, true, true), numberType(2, 3, false, true)), true)
assert.strictEqual(numberTypesAdjacent(numberType(1, 2, true, true), numberType(2, 3, true, true)), false)

// mutually exclusive ranges
assert.strictEqual(isNumberSubtype(numberType(10, 20), numberType(30, 40)), false)
assert.strictEqual(isNumberSubtype(numberType(10, 20), numberType(0, 1)), false)
assert.strictEqual(isNumberSubtype(numberType(null, 20), numberType(30, null)), false)
assert.strictEqual(isNumberSubtype(numberType(10, null), numberType(null, 1)), false)

//  inclusive barely touching ranges
assert.strictEqual(isNumberSubtype(numberType(10, 20), numberType(20, 40)), null)
assert.strictEqual(isNumberSubtype(numberType(10, 20), numberType(2, 10)), null)
assert.strictEqual(isNumberSubtype(numberType(null, 20), numberType(20, null)), null)
assert.strictEqual(isNumberSubtype(numberType(10, null), numberType(null, 10)), null)
//  partially overlapping ranges
assert.strictEqual(isNumberSubtype(numberType(10, 20), numberType(15, 30)), null)
assert.strictEqual(isNumberSubtype(numberType(15, 30), numberType(10, 20)), null)

//  exclusive barely touching ranges
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(20, 40, true, true)), false)
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(2, 10, true, true)), false)
assert.strictEqual(isNumberSubtype(numberType(null, 20, true, true), numberType(20, null, true, true)), false)
assert.strictEqual(isNumberSubtype(numberType(10, null, true, true), numberType(null, 10, true, true)), false)

//  exclusive same range
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(10, 20, true, true)), true)
//  inclusive same range
assert.strictEqual(isNumberSubtype(numberType(10, 20, false, false), numberType(10, 20, false, false)), true)
//  inclusive on subtype range
assert.strictEqual(isNumberSubtype(numberType(10, 20, false, true), numberType(10, 20, true, true)), null)
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, false), numberType(10, 20, true, true)), null)
assert.strictEqual(isNumberSubtype(numberType(10, 20, false, false), numberType(10, 20, true, true)), null)
//  >10 .. <20 , 10 .. < 20, true
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(10, 20, false, true)), true)
//  >10 .. <20 , >10 .. 20, true
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(10, 20, true, false)), true)
//  >10 .. <20 , 10 .. 20, true
assert.strictEqual(isNumberSubtype(numberType(10, 20, true, true), numberType(10, 20, false, false)), true)

//  non-literal comparison
function ref(name: string) { return new Reference({ name })}
//  >= a, >= a, true
assert.strictEqual(isNumberSubtype(new NumberType({ min: ref("a")}), new NumberType({ min: ref("a")})), true)
//  > a , >= a, true
assert.strictEqual(isNumberSubtype(new NumberType({ min: ref("a"), minExclusive: true}), new NumberType({ min: ref("a")})), true)
//  >= a , > a, maybe
assert.strictEqual(isNumberSubtype(new NumberType({ min: ref("a")}), new NumberType({ min: ref("a"), minExclusive: true})), null)
//  >= a , >= a, true
assert.strictEqual(isNumberSubtype(new NumberType({ min: ref("a"), minExclusive: true}), new NumberType({ min: ref("a"), minExclusive: true})), true)

//  check object types

let A = new ReferenceType({ name: "a" })
let B = new ReferenceType({ name: "b" })
assert.strictEqual(isSubtype(A, A), true)
assert.strictEqual(isSubtype(B, B), true)
assert.strictEqual(isSubtype(A, B), false)
assert.strictEqual(isSubtype(B, A), false)

let Vector2 = new ObjectType({
    kind: "Object",
    properties: [
        new Property({ id: new Identifier({ name: "x" }), value: types.Number }),
        new Property({ id: new Identifier({ name: "y" }), value: types.Number }),
    ],
})

let Vector3 = new ObjectType({
    kind: "Object",
    properties: [
        new Property({ id: new Identifier({ name: "x" }), value: types.Number }),
        new Property({ id: new Identifier({ name: "y" }), value: types.Number }),
        new Property({ id: new Identifier({ name: "z" }), value: types.Number }),
    ],
})

assert(!isSubtype(Vector2, Vector3))
assert(isSubtype(Vector3, Vector2))

function testSubType(a: Type, b: Type, ab_expected: true | false | null, ba_expected: true | false | null) {
    const ab_actual = isSubtype(a, b)
    const ba_actual = isSubtype(b, a)
    assert.equal(ab_actual, ab_expected, `\n${toCodeString(a)} isSubtype ${toCodeString(b)}, expected ${ab_expected}, actual: ${ab_actual}`)
    assert.equal(ba_actual, ba_expected, `\n${toCodeString(b)} isSubtype ${toCodeString(a)}, expected ${ba_expected}, actual: ${ba_actual}`)
}

testSubType(numberType(1, null), numberType(0, null), true, null)
testSubType(numberType(null, 1), numberType(null, 2), true, null)
testSubType(numberType(null, 1, false), numberType(null, 2, false), true, null)
testSubType(numberType(null, 1, false), numberType(null, 2, false), true, null)
testSubType(numberType(null, 0, false), numberType(null, 0, false), true, true)
testSubType(numberType(null, 0, false), numberType(0, null, true), false, false)
testSubType(numberType(0, null, false), numberType(null, 0, false), null, null)
testSubType(numberType(0, null, true), numberNotEqual(0), true, null)
testSubType(numberType(null, 0, true), numberNotEqual(0), true, null)
testSubType(numberType(0, 0), numberType(null, 0), true, null)
testSubType(numberType(0, 0), numberType(0, null), true, null)
let x = ref("x")
testSubType(numberType(x, x), numberType(x, null), true, null)
testSubType(numberType(x, x), numberType(null, x), true, null)
testSubType(numberType(x, x), numberType(x, null, true), false, false)
testSubType(numberType(x, x), numberType(null, x, true), false, false)
testSubType(numberType(x, null, true), numberType(x, null, false), true, null)
testSubType(numberType(null, x, true), numberType(null, x, false), true, null)
testSubType(numberType(null, x, true), numberNotEqual(x), true, null)

testSubType(numberType(null, x, true), numberNotEqual(x), true, null)
testSubType(
    new UnionType({
        types: [
            numberType(null, x, true),
            numberType(x, null, true),
        ]
    }),
    numberNotEqual(x),
    true,
    true,
)
testSubType(
    new UnionType({
        types: [
            numberType(x, null, true),
            numberType(null, x, true),
        ]
    }),
    numberNotEqual(x),
    true,
    true,
)

assert.strictEqual(toCodeString(
    normalize(
        new IntersectionType({
            types: [
                ref("B"),
                ref("C"),
                ref("A"),
                new ObjectType({
                    kind: "Object",
                    properties: [
                        new Property({ id: new Identifier({ name: "beta"}), value: numberType(0, null)}),
                        new Property({ id: new Identifier({ name: "charlie"}), value: numberType(0, null)}),
                        new Property({ id: new Identifier({ name: "alpha"}), value: numberType(0, null)}),
                    ]
                })
            ]
        })
    )
), "A & B & C & (alpha:(>=0), beta:(>=0), charlie:(>=0))")

assert.strictEqual(toCodeString(simplify(
    new IntersectionType({
        types: [
            types.Number,
            numberType(null, null),
            numberType(1, 10)
        ]
    })
)), toCodeString(numberType(1, 10)))

assert.strictEqual(toCodeString(simplify(
    new UnionType({
        types: [
            types.Number,
            numberType(null, null),
            numberType(1, 10)
        ]
    })
)), toCodeString(numberType(1, 10)))

let foo = new IntersectionType({
    types: [
        numberType(ref("a"), null),
        numberType(null, ref("b"))
    ]
})
debugger

simplify(foo)

assert.strictEqual(toCodeString(simplify(
    new IntersectionType({
        types: [
            numberType(ref("a"), null),
            numberType(null, ref("b"))
        ]
    })
)), toCodeString(numberType(ref("a"), ref("b"))))
