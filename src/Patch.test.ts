import Patch from "./Patch";
const { ast } = require("./ion")

declare var describe: any
declare var it: any

var assert = require('assert');
describe('Patch', function() {
    describe('apply()', function() {
        it('should work on objects', function () {
            let object = { a: 1, c: 30 }
            let patch = new Patch({ a: 10, b: 20 })
            let result = Patch.apply(object, patch)
            assert.equal(JSON.stringify(result), JSON.stringify({ a: 10, c: 30, b: 20 }))
            // assert.equal([1,2,3].indexOf(4), -1);
        });
        it('should work on objects with Map', function () {
            let object = { a: 1, c: 30 }
            let patch = new Patch(new Map([["a",10],["b",20]]))
            let result = Patch.apply(object, patch)
            assert.equal(JSON.stringify(result), JSON.stringify({ a: 10, c: 30, b: 20 }))
            // assert.equal([1,2,3].indexOf(4), -1);
        });
        it('should work on Maps', function () {
            let object = new Map([["a", 1], ["b", 2]])
            let patch = new Patch(new Map([["a", 10], [50, 100]] as any))
            let result = Patch.apply(object, patch)
            assert.equal(JSON.stringify(Array.from(result.entries())), `[["a",10],["b",2],[50,100]]`)
            // assert.equal([1,2,3].indexOf(4), -1);
        });
        it('should work on Position Objects', function () {
            let object = new ast.Position({line: 10, column: 20})
            let patch = new Patch({ column: 40 })
            let result = Patch.apply(object, patch)
            assert.equal(JSON.stringify(result), JSON.stringify({ line:10, column:40 }))
            // assert.equal([1,2,3].indexOf(4), -1);
        });
    });
    describe("combine()", function() {
        it('should work with Location Objects', function () {
            let object = new ast.Location({
                start: new ast.Position({ line: 10, column: 20 }),
                end: new ast.Position({ line: 30, column: 40 }),
                filename: "foo"
            })
            let patch = Patch.combine(
                new Patch({ filename: "bar", end: new Patch({ line: 50 }) }),
                new Patch({ end: new Patch({ column: 100 }) })
            )
            let result = Patch.apply(object, patch)
            assert.equal(JSON.stringify(result), `{"start":{"line":10,"column":20},"end":{"line":50,"column":100},"filename":"bar"}`)
        });
    })
});