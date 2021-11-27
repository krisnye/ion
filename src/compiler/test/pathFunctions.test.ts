import { strict as assert } from "assert"

import * as path from "../pathFunctions"

assert.strictEqual(path.getParent("alpha.foo"), "alpha")
assert.strictEqual(path.getLastName("alpha.foo"), "foo")
assert.strictEqual(path.getParent("alpha"), path.globalNamespace)
assert.strictEqual(path.getParent(path.globalNamespace), null)
assert.strictEqual(path.resolve("foo.bar", new Map([["foo.bar", true]])), true)
assert.strictEqual(path.resolve("foo.bar", new Map([["bar", true]])), true)
assert.strictEqual(path.resolve("foo.bar", new Map([["foo", true]])), null)
