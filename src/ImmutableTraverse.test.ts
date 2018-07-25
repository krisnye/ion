import Patch from "./Patch";
const { ast } = require("./ion")
import {traverse,skip,remove} from "./ImmutableTraversal"

declare var describe: any
declare var it: any

let dom = new ast.BlockStatement({
    statements: [
        new ast.VariableDeclaration({
            id: new ast.Id({name:"foo"}),
            value: new ast.Literal({value: 1})
        }),
        new ast.VariableDeclaration({
            id: new ast.Id({ name: "bar" }),
            value: new ast.Literal({ value: 2 })
        })
    ]
})

var assert = require('assert');
describe('ImmutableTraverse', function() {
    describe('traverse()', function() {
        it('should work with Patch return values', function () {
            let result = traverse(dom, {
                leave(node, ancestors, path, changes) {
                    if (ast.Literal.is(node)) {
                        return new Patch({value: node.value * 2})
                    }
                }
            })
            assert.equal(JSON.stringify(result), `{"location":null,"statements":[{"location":null,"id":{"location":null,"name":"foo"},"type":null,"value":{"location":null,"value":2},"assignable":false,"property":false},{"location":null,"id":{"location":null,"name":"bar"},"type":null,"value":{"location":null,"value":4},"assignable":false,"property":false}]}`)
        });
        it('should work with Node return values', function () {
            let result = traverse(dom, {
                leave(node, ancestors, path, changes) {
                    if (ast.Literal.is(node)) {
                        return new ast.Literal({value: node.value * 2})
                    }
                }
            })
            assert.equal(JSON.stringify(result), `{"location":null,"statements":[{"location":null,"id":{"location":null,"name":"foo"},"type":null,"value":{"location":null,"value":2},"assignable":false,"property":false},{"location":null,"id":{"location":null,"name":"bar"},"type":null,"value":{"location":null,"value":4},"assignable":false,"property":false}]}`)
        });
        it('should work with Array return values', function () {
            let result = traverse(dom, {
                leave(node, ancestors, path, changes) {
                    if (ast.VariableDeclaration.is(node) && node.value.value == 1) {
                        return [
                            new ast.VariableDeclaration({
                                id: new ast.Id({ name: "foo1" }),
                                value: new ast.Literal({ value: 10 })
                            }),
                            new ast.VariableDeclaration({
                                id: new ast.Id({ name: "foo2" }),
                                value: new ast.Literal({ value: 20 })
                            })
                        ]
                    }
                }
            })
            assert.equal(JSON.stringify(result), `{"location":null,"statements":[{"location":null,"id":{"location":null,"name":"foo1"},"type":null,"value":{"location":null,"value":10},"assignable":false,"property":false},{"location":null,"id":{"location":null,"name":"foo2"},"type":null,"value":{"location":null,"value":20},"assignable":false,"property":false},{"location":null,"id":{"location":null,"name":"bar"},"type":null,"value":{"location":null,"value":2},"assignable":false,"property":false}]}`)
        });
    });
});