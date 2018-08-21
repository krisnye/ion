import { SemanticError } from "../common";
const { ast } = require("../ion");

export function getReferencedDeclaration(scopeMap, node) {
    if (ast.VariableDeclaration.is(node) && ast.Reference.is(node.value)) {
        return getReferencedDeclaration(scopeMap, node.value);
    }
    if (ast.Declaration.is(node)) {
        return node;
    }
    if (ast.Reference.is(node)) {
        let scope = scopeMap.get(node);
        let value = scope[node.name];
        if (value == null) {
            throw SemanticError(`Variable '%{node.name}' not found`, node.location);
        }
        return getReferencedDeclaration(scopeMap, value);
    }
    throw SemanticError(`Node does not reference a declaration ${node.constructor.name}`, node.location);
}