import { Analysis, IfStatement, BinaryExpression, BlockStatement, Expression, Reference, VariableDeclaration, ConditionalDeclaration, DotExpression, Id } from "../ast";
import { traverse, skip, remove } from "../Traversal";
import toCodeString from "../toCodeString";
import { getNodesOfType, isLowerCase } from "../common";
// import { conditionalChainToBinaryExpression } from "./createConditionalChains";

export default function createConditionalDeclarations(root: Analysis) {
    return traverse(root, {
        enter(node) {
        },
        leave(node) {
            // remove conditional declarations
            if (ConditionalDeclaration.is(node)) {
                return remove
            }
            // also remove extra BlockStatements from within a chained IfStatement.alternate
            if (IfStatement.is(node) && BlockStatement.is(node.alternate) && node.alternate.statements.length === 1 && IfStatement.is(node.alternate.statements[0])) {
                return node.patch({ alternate: node.alternate.statements[0] as IfStatement })
            }
        }
    })
}
