import { strict as assert } from "assert"

import * as path from "../pathFunctions"

assert.strictEqual(path.getRelative("alpha/foo", "foo/beta"), "foo/beta")
assert.strictEqual(path.getRelative("alpha/foo", "./beta"), "alpha/beta")
assert.strictEqual(path.getRelative("alpha/foo", "../beta"), "beta")
assert.strictEqual(path.getRelative("alpha/foo", "../../beta"), "../beta")
