import { traverse, skip } from "../ImmutableTraversal"
import toposort from "../toposort"
import { SemanticError } from "../common"
const { ast } = require("../ion")

export default function getSortedRootNodes(declarations: any[]) {
    let rootMap = new Map(declarations.map(d => [d.id.name, d]) as any)
    let sentinel = {} //    holds head position to ensure all nodes have edges
    let dependencies: [any,any][] = declarations.map(d => [sentinel, d]) as any

    rootMap.forEach((successor, name) => {
        traverse(successor, {
            enter(otherNode) {
                if (ast.TypeDeclaration.is(otherNode)) {
                    // we skip type expressions as they have no declaration time dependency
                    return skip
                }
                if (ast.Reference.is(otherNode)) {
                    let predecessor = rootMap.get(otherNode.name)
                    if (predecessor && predecessor !== successor) {
                        dependencies.push([predecessor, successor])
                    }
                }
            }
        })
    })

    let sorted = toposort(dependencies)
    // kick off the sentinel
    if (sorted.shift() !== sentinel) {
        throw new Error("Sentinel should have been first")
    }
    return new ast.BlockStatement({ statements: sorted })
}
