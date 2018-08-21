import { traverse } from "../ImmutableTraversal";
import { SemanticError } from "../common";
import toposort from "../toposort";
import { getSortedExpressions } from "./getSortedExpressions";

const { ast } = require("../ion")

export function simplifyExpressions(root, scopeMap) {
    let sortedExpressions = getSortedExpressions(root, scopeMap)
    console.log(sortedExpressions)
}
