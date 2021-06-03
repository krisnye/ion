import { strict as assert } from "assert"

import * as path from "../pathFunctions"

let alpha = path.absolute("alpha")
let beta = path.absolute("beta")
let root = path.absolute()
assert.equal(root.length, 1)
assert.equal(path.join(root, alpha), path.absolute(root, alpha))
assert.equal(path.getParent(alpha), root, "parent should be same as root")
assert.equal(path.getRelative(alpha, beta), beta)
