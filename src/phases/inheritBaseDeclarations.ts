import { traverse, skip } from "../ImmutableTraversal"
import toposort from "../toposort"
import { SemanticError } from "../common"
import createScopeMap from "./createScopeMap";
const { ast } = require("../ion")

// function getDependencies(node) {
//     if (ast.BinaryExpression.is(node)) {
//         return [node.left, node.right]
//     }
//     if (ast.ConditionalExpression.is(node)) {
//         return [node.test, node.consequent, node.alternate]
//     }
//     if (ast.Reference.is(node)) {
//         let scope = map.get(node.location)
//         //  
//     }
// }


export default function inheritBaseDeclarations(root: any) {
    let scopeMap = createScopeMap(root)

    function getReferencedDeclaration(node) {
        if (ast.VariableDeclaration.is(node) && ast.Reference.is(node.value)) {
            return getReferencedDeclaration(node.value)
        }
        if (ast.Declaration.is(node)) {
            return node
        }
        if (ast.Reference.is(node)) {
            let scope = scopeMap.get(node.location)
            let value = scope[node.name]
            if (value == null) {
                throw SemanticError(`Variable '%{node.name}' not found`, node.location)
            }
            return getReferencedDeclaration(value)
        }
        throw SemanticError(`Node does not reference a declaration ${ node.constructor.name }`, node.location)
    }

    function getAllDeclarations(classDeclaration) {
        if (classDeclaration.baseClasses == null || classDeclaration.baseClasses.length === 0) {
            return classDeclaration.declarations || []
        }
        let declarations: any[] = []
        for (let baseClassReference of classDeclaration.baseClasses) {
            debugger
            let baseDeclaration = getReferencedDeclaration(baseClassReference)
            declarations.push(...getAllDeclarations(baseDeclaration))
        }
        if (classDeclaration) {
            declarations.push(...classDeclaration.declarations)
        }
        return declarations
    }

    return traverse(root, {
        leave(node) {
            if (ast.ClassDeclaration.is(node)) {
                let declarations = getAllDeclarations(node)
                return new ast.ClassDeclaration(node, { declarations })
            }
        }
    })
}
