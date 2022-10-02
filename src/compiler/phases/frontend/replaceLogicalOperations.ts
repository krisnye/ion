import { Phase } from "../Phase";
import { Container } from "../../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { Call } from "../../ast/Call";
import { LogicalOperators } from "../../analysis/LogicalOperators";
import { BinaryExpression } from "../../ast/BinaryExpression";

const replaceOperatorsWithExpressions: Set<String> = new Set(
    [LogicalOperators.and, LogicalOperators.or, LogicalOperators.is]
)

/**
 * Replaces logical operations with BinaryExpressions.
 */
export function replaceLogicalOperations(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors: Error[] = [];
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                if (node instanceof Call && node.isLogicalOperation()) {
                    node = new BinaryExpression({
                        location: node.location,
                        left: node.nodes[0],
                        operator: node.callee.name,
                        right: node.nodes[1]
                    })
                }
                return node;
            }
        }
    });
    return [result, errors];
}
