import { traverse  } from "../Traversal"
import { SemanticError } from "../common";
const { ast } = require("../ion")

export type varEnter = (node, ancestors: object[], path: string[], variables: Map<String, object>) => void
export type varLeave = (node, ancestors: object[], path: string[], variables: Map<String, object>) => object | object[] | void

function traverseImportSteps(steps, callback) {
    for (let step of steps) {
        if (step.as != null) {
            callback(step.as, step)
        }
        if (step.children.length > 0) {
            traverseImportSteps(step.children, callback)
        }
    }
}

function foreachVariable(node, callback: (id, value, scopeNode) => any) {
    if (ast.FunctionExpression.is(node)) {
        for (let parameter of node.parameters) {
            callback(parameter.id, parameter, node)
        }
    }

    if (ast.BlockStatement.is(node)) {
        for (let statement of node.statements) {
            if (ast.Declaration.is(statement)) {
                callback(statement.id, statement, node)
            }
        }
    }

    if (ast.Module.is(node)) {
        traverseImportSteps(node.imports, callback)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration, node)
        }
    }

    if (ast.ClassDeclaration.is(node)) {
        callback(node.id, node, node)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration, node)
        }
        for (let parameter of node.templateParameters) {
            callback(parameter.id, parameter, node)
        }
    }
}

//  need a traversal with declarations
export default function traverseWithScopedVariables(root, enter, leave?) {
    let scope = new Map()
    function add(id, node, sourceNode) {
        if (scope.has(id.name)) {
            throw SemanticError("Cannot hide variable " + id.name, id.location)
        }
        // console.log('+' + id.name)
        scope.set(id.name, node)
    }
    function remove(id, node, sourceNode) {
        // console.log('-' + id.name)
        scope.delete(id.name)
    }
    traverse(root, {
        enter(node: object, ancestors: object[], path: string[]) {
            foreachVariable(node, add)
            let result = enter ? enter(node, ancestors, path, scope) : undefined
            return result
        },
        leave(node: object, ancestors: object[], path: string[]) {
            let result = leave ? leave(node, ancestors, path, scope) : undefined
            foreachVariable(node, remove)
            return result
        }
    })
}
