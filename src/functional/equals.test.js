import Splice from "../Splice";
import getHashCode, {hashSymbol} from "./getHashcode";
import equals from "./equals"

function setHash(object, hash) {
    object[hashSymbol] = hash
    return object
}

function equalsIfHashCollision(a, b) {
    setHash(a, 0)
    setHash(b, 0)
    return equals(a, b)
}

var assert = require('assert');
describe('equals', function () {
    it('should work', function () {
        assert(equals(undefined, undefined))
        assert(equals(null, null))
        assert(!equals(null, undefined))
        assert(!equals(0, undefined))
        assert(!equals(0, null))
        assert(equals(0, 0))
        assert(equals([], []))
        assert(equals([1,2], [1,2]))
        assert(equals({}, {}))
        assert(equals({ a: 1 }, { a: 1 }))
        assert(equals({ a: 1, b: 2 }, { b: 2, a: 1 }))
        assert(!equalsIfHashCollision({ a: 1, b: 2 }, { b: 2, a: 1, c: 2 }))
        assert(equals(new Splice(0, [5], 1), new Splice(0, [5], 1)))
        assert(equals(new Set([0, 1, 2, 3]), new Set([0, 1, 2, 3])))
        assert(equals(new Set([0, 1, 2, 3]), new Set([3, 2, 1, 0])))
        assert(!equalsIfHashCollision(new Set([0, 1, 2, 3]), new Set([3, 2, 1, 4])))
        assert(equals(new Map(), new Map()))
        assert(equals(new Map([[1, 2], [3, 4]]), new Map([[1, 2], [3, 4]])))
        assert(equals(new Map([[1, 2], [3, 4]]), new Map([[3, 4], [1, 2]])))
        assert(!equalsIfHashCollision(new Map([[1, 2], [3, 4]]), new Map([[3, 4], [1, 3]])))
    });
});
