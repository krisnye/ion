import getFinalExpressions from "../../analysis/getFinalExpressions"
import { Function } from "../../ast/Function"
import { Return } from "../../ast/Return"
import { SemanticError } from "../../SemanticError"
import { traverse, skip, Lookup } from "../../traverse"
import { Phase } from "../Phase"

export default function addExplicitReturns(moduleName, module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    let lookup = new Lookup();
    module = traverse(module, {
        lookup,
        enter(node) {
            if (node instanceof Function) {
                return skip;
            }
        },
        leave(node, path) {
            if (node instanceof Function) {
                let expressions = new Set(getFinalExpressions(node.body));
                if (expressions.size === 0) {
                    errors.push(new SemanticError("Functions must return a value", node));
                }
                node = traverse(node, {
                    leave(innerNode) {
                        if (expressions.has(innerNode) && !(innerNode instanceof Return)) {
                            return new Return({ location: innerNode.location, value: innerNode })
                        }
                    }
                })
            }
            return node;
        }
    })
    //  I don't know how nested Returns are ending up in here, but let's remove them.
    module = traverse(module, {
        leave(node) {
            if (node instanceof Return && node.value instanceof Return) {
                return node.value;
            }
        }
    });
    return [module, errors];
}
