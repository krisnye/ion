import { strict as assert } from "assert"
import { createIsType } from "../isType"
import * as t from "../../types"
import { Reference } from "../../ast";


let is = createIsType([]);
function test(a: Reference, b: Reference, result: Boolean | null) {
    assert.strictEqual(is(a, b), result)
}

test(t.Array, t.Object, true)
test(t.RegExp, t.Object, true)
test(t.Null, t.Boolean, false)
//  a class should be an object through recursive extension
test(t.Class, t.Object, true)
// this should fail
test(t.Function, t.RegExp, false)
test(t.Map, t.Set, false)
test(t.Integer, t.Number, true)
test(t.Number, t.Integer, null)
test(t.Number, t.Boolean, false)
test(t.Object, t.String, false)
test(t.Array, t.RegExp, false)
test(t.Array, t.Function, false)
test(t.Function, t.Object, true)
// unknown references will return null => meaning unknown if implements
test(new Reference({ name: "foo", path: "/foo" }), new Reference({ name: "bar", path: "/bar"}), null)
