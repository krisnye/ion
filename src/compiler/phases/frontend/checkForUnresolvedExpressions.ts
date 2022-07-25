import { Expression } from "../../ast/Expression";
import { EvaluationContext } from "../../EvaluationContext";
import { SemanticError } from "../../SemanticError";
import { traverseWithScope } from "./createScopeMaps";
import { Phase } from "../Phase";

function *getUnresolvedDependencies(node: Expression, c: EvaluationContext) {
    for (const dep of node.getDependencies(c)) {
        if (!dep.resolved) {
            yield dep;
        }
    }
}

export function checkForUnresolvedExpressions(moduleName, module, externals): ReturnType<Phase> {
    let errors = new Array<Error>();
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Expression && !node.resolved) {
                    let deps = [...getUnresolvedDependencies(node, c)];
                    errors.push(new SemanticError(`Dependencies not resolved`, node, ...deps));
                }
            }
        };
    })
    
    return [module, errors];
}
