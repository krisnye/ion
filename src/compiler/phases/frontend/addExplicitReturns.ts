import getFinalExpressions from "../../analysis/getFinalExpressions"
import { Function } from "../../ast/Function"
import { Return } from "../../ast/Return"
import { SemanticError } from "../../SemanticError"
import { traverse, skip } from "../../traverse"
import { Phase } from "../Phase"

export default function addExplicitReturns(moduleName, module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    module = traverse(module, {
        enter(node) {
            if (node instanceof Function) {
                return skip;
            }
        },
        leave(node) {
            if (node instanceof Function) {
                let expressions = new Set(getFinalExpressions(node.body));
                if (expressions.size === 0) {
                    errors.push(new SemanticError("Functions must return a value", node));
                }
                return traverse(node, {
                    leave(node) {
                        return expressions.has(node) && !(node instanceof Return)
                            ? new Return({ location: node.location, value: node })
                            : node;
                    }
                })
            }
        }
    })
    return [module, errors];
}
