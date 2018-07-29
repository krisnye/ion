import Splice from "../Splice";
import intern from "./intern";
import { hashSymbol } from "./getHashcode";

//  used to simulate hash collision so we can exercise all code paths
function setHash(object, hash = 0) {
    object[hashSymbol] = hash
    return object
}

var assert = require('assert');
describe('intern', function () {
    it('should work', function () {
        assert.equal(intern(0), intern(0))
        assert.equal(intern(new Splice(0, [5, 3], 1)), intern(new Splice(0, [5, 3], 1)))
        assert.equal(intern([1, 2, 3]), intern([1, 2, 3]))
        assert.equal(intern(new Set([1, 2, 3])), intern(new Set([1, 2, 3])))
        assert.equal(intern(new Set([1, 2, 3])), intern(new Set([1, 3, 2])))
        assert.equal(intern(new Map()), intern(new Map()))
        assert.equal(intern(new Map([[0, 0], [1, 2]])), intern(new Map([[1, 2], [0, 0]])))
        assert.notEqual(intern([1, 2, 3]), intern([1, 2, 4]))
        assert.notEqual(intern(setHash([1, 2, 3])), intern(setHash([1, 2, 4])))
    });
});