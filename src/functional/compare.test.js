import Splice from "../Splice";
import compare from "./compare";
import equals from "./equals"

var assert = require('assert');
describe('compare', function () {
    it('should work', function () {
        assert(compare(0, 1) === -1)
        assert(compare(1, 0) === 1)
        assert(compare(0, 0) === 0)
        assert(compare({ a: 1 }, { b: 1 }) === -1)
        assert(compare({ b: 1 }, { a: 1 }) === 1)
        assert(compare([1, 2], [2, 1]) === -1)
        assert(compare([2, 1], [1, 2]) === 1)
        assert(compare(new Set([1, 2]), new Set([2, 1])) === 0)
        assert(compare(new Set([1, 2, 3]), new Set([2, 1])) === 1)
        assert(compare(new Set([2, 1]), new Set([1, 2, 3])) === -1)
        assert(compare(new Map([[1, 2], [2, 3]]), new Map([[2, 3], [1, 2]])) === 0)
        assert(compare(new Map([[1, 2], [1, 3]]), new Map([[1, 2], [2, 3]])) === -1)
        assert(compare(new Map([[1, 2], [2, 3]]), new Map([[1, 2], [1, 3]])) === 1)
    });
});