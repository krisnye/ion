import Splice from "../Splice";
import memoize from "./memoize"

let calls = 0

let stringify = memoize(function stringify(...args) {
    calls++
    return JSON.stringify(args)
})

var assert = require('assert');
describe('memoize', function () {
    it('should work', function () {
        assert.equal(stringify(12), "[12]")
        assert.equal(stringify(12), "[12]")
        assert.equal(calls, 1)
        assert.equal(stringify(new Splice(10, [5], 2)), '[{"index":10,"insert":[5],"remove":2}]')
        assert.equal(stringify(new Splice(10, [5], 2)), '[{"index":10,"insert":[5],"remove":2}]')
        assert.equal(calls, 2)
        assert.equal(stringify(new Set([1, 2, 3])), '[{}]')
        assert.equal(stringify(new Set([1, 2, 3])), '[{}]')
        assert.equal(calls, 3)
        assert.equal(stringify(null, true, new Map([[1, 1], [2, 2]])), '[null,true,{"elements":[[1,1],[2,2]]}]')
        assert.equal(stringify(null, true, new Map([[1, 1], [2, 2]])), '[null,true,{"elements":[[1,1],[2,2]]}]')
        assert.equal(calls, 4)
    });
});