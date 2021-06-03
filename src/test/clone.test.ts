import { strict as assert } from "assert"

import VariableDeclaration from "../ast/VariableDeclaration";
import Node from "../ast/Node";
import Variable from "../ast/Variable";
import Declaration from "../ast/Declaration";
import UnaryExpression from "../ast/UnaryExpression";
import Id from "../ast/Id";
import { clone } from "../common";

{
    let original = new VariableDeclaration({ id: new Id({ name: "kris"}) })
    let copy = clone(original)
    assert(copy instanceof VariableDeclaration)
    assert(original !== copy)
    assert.deepEqual(original, copy)
    assert(original.id !== copy.id)
}

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