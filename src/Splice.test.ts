import Splice from "./Splice";
const { ast } = require("./ion")

declare var describe: any
declare var it: any

var assert = require('assert');
describe('Splice', function() {
    describe('apply()', function() {
        it('should work', function () {
            let object = [1,2,3,4,5]
            let splices = [
                new Splice(0, [5], 1),
                new Splice(1, [], 2),
                new Splice(4, [7,8,9])
            ]
            let result = Splice.apply(object, ...splices)
            assert.equal(JSON.stringify(result), `[5,4,7,8,9,5]`)
            // assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});