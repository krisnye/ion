import Splice from "../Splice";
import getHashcode from "./getHashcode";

var assert = require('assert');
describe('getHashcode', function () {
    it('should return consistent and diverse values', function () {
        let objects = [
            null, true, false, undefined,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            [], [0], [1], [2], [0,1], [[]],
            {}, { b: 1 }, { a: 1 },
            "", "a", "aa", "ab", "bb", "ac", "A", "AA", "AB", "Abcdefg", "AC",
            new Splice(0, [5], 1), new Splice(1, [], 2), new Splice(4, [7, 8, 9]),
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23],
            new Set([0, 1, 2, 3]), new Set([0, 1, 2]), new Set([0, 1]), new Set([0]), new Set(), new Set([3]), new Set([4]),
            new Map(), new Map([[0, 0]]), new Map([[0, 1]]), new Map([[1, 0]]), new Map([[1, 1]]),
            new Map([[0, 0], [1, 1], [2, 2]]), new Map([[0, 0], [1, 1], [3, 3]])
        ]
        let map = new Map()
        for (let value of objects) {
            let hash = getHashcode(value)
            let hash2 = getHashcode(value)
            if (hash !== hash2) {
                throw new Error(`Inconsistent hashes ${hash}, ${hash2} from value ${JSON.stringify(value)}`)
            }
            if (map.has(hash)) {
                let previousValue = map.get(hash)
                throw new Error(`Hash collision ${hash} between ${JSON.stringify(previousValue)} and ${JSON.stringify(value)}`)
            }
            map.set(hash, value)
            // console.log(hash, value)
        }
    });
});