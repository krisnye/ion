import { strict as assert } from "assert";
import is from "../../is"
// import for side effects
import "../index"

assert(is([12, 20], Array, Number))
assert(!is([12, true], Array, Number))
assert(is(["a","b"], Array, String))
assert(!is(["a",12], Array, String))

//  Object Tests
assert(is({ x: true }, Object, String, Boolean))
assert(!is({ x: true }, Object, String, Number))
assert(is({ x: 12 }, Object, String, Number))
assert(!is({ x: "foo" }, Object, String, Number))
assert(is({ x: 12, y: 20 }, Object, String, Number))

let Alpha = /^[a-z]$/i
assert(is({ x: true }, Object, Alpha, Boolean))
assert(!is({ x9: true }, Object, Alpha, Boolean))
