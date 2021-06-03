import Assembly from "../ast/Assembly";
import { traverse, skip } from "../Traversal";
import Analysis from "../ast/Analysis";
import FunctionExpression from "../ast/FunctionExpression";
import Node from "../ast/Node";
import BlockStatement from "../ast/BlockStatement";
import Expression from "../ast/Expression";
import ExpressionStatement from "../ast/ExpressionStatement";
import { SemanticError } from "../common";
import IfStatement from "../ast/IfStatement";
import ReturnStatement from "../ast/ReturnStatement";

function getFinalExpressionStatements(node: Node, expressions: Set<ExpressionStatement> = new Set()) {
    if (BlockStatement.is(node)) {
        // check that this is the only expression statement
        for (let i = 0; i < node.statements.length - 1; i++) {
            let statement = node.statements[i]
            if (ExpressionStatement.is(statement)) {
                throw SemanticError("Only the final statement can be an expression", statement)
            }
        }
        getFinalExpressionStatements(node.statements[node.statements.length - 1], expressions)
    }
    else if (IfStatement.is(node)) {
        getFinalExpressionStatements(node.consequent, expressions)
        if (node.alternate) {
            getFinalExpressionStatements(node.alternate, expressions)
        }
    }
    else if (ExpressionStatement.is(node)) {
        expressions.add(node)
    }
    else {
        throw SemanticError(`Final statement must be an expression`, node)
    }
    return expressions
}

export default function addImplicitReturns(root: Assembly | Analysis) {
    return traverse(root, {
        enter(node) {
            if (FunctionExpression.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (FunctionExpression.is(node)) {
                let expressions = getFinalExpressionStatements(node.body)
                if (expressions.size === 0) {
                    throw SemanticError("Functions must return a value", node)
                }
                return traverse(node, {
                    leave(node) {
                        return expressions.has(node) ? new ReturnStatement({ ...node }) : node
                    }
                })
            }
        }
    })
}
