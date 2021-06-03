import { strict as assert } from "assert"
import { clone } from "../common";

{
    let original = new Map([["a", 1], ["b", 2]])
    let copy = clone(original)
    assert(copy instanceof Map)
    assert(original !== copy)
    assert.deepEqual(original, copy)
}

{
    let original = [["a", 1], ["b", 2]]
    let copy = clone(original)
    assert(Array.isArray(copy))
    assert(original !== copy)
    assert.deepEqual(original, copy)
}