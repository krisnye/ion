import { getReferencedDeclaration } from "./getReferencedDeclaration";
import { traverse, skip } from "../ImmutableTraversal"
import toposort from "../toposort"
import createScopeMap from "./createScopeMap";
const { ast } = require("../ion")

function getAllVariableDeclarations(scopeMap, classDeclaration) {
    if (classDeclaration.baseClasses == null || classDeclaration.baseClasses.length === 0) {
        return classDeclaration.declarations || []
    }
    let declarations: any[] = []
    for (let baseClassReference of classDeclaration.baseClasses) {
        let baseDeclaration = getReferencedDeclaration(scopeMap, baseClassReference)
        declarations.push(...getAllVariableDeclarations(scopeMap, baseDeclaration))
    }
    if (classDeclaration) {
        declarations.push(...classDeclaration.declarations)
    }
    return declarations
}

export default function inheritBaseDeclarations(root: any, scopeMap) {
    return traverse(root, {
        leave(node) {
            if (ast.ClassDeclaration.is(node)) {
                let declarations = getAllVariableDeclarations(scopeMap, node)
                return new ast.ClassDeclaration(node, { declarations })
            }
        }
    })
}
