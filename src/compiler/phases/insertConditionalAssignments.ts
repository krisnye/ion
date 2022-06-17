import { Phase } from "./Phase";
import { traverse } from "../traverse";
import { Conditional } from "../ast/Conditional";
import { Reference } from "../ast/Reference";
import { traverseWithScope } from "./createScopeMaps";
import { isValidId } from "../common";
import { isTypeName } from "../utility";
import { addToBlock } from "../ast/Block";
import { ConditionalAssertion } from "../ast/ConditionalAssertion";
import { Expression } from "../ast/Expression";
import { Assignment } from "../ast/Assignment";

function getReferences(root, predicate: (ref: Reference) => boolean) {
    let refs = new Map<string,Reference>();
    traverse(root, {
        leave(node) {
            if (node instanceof Reference && predicate(node)) {
                refs.set(node.name, node);
            }
        }
    })
    return refs.values();
}

export function insertConditionalAssignments(moduleName, module, externals): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                if (node instanceof Conditional) {
                    // insert conditional assignments here.
                    let refs = getReferences(node.test, (ref) => isValidId(ref.name) && !isTypeName(ref.name) );
                    for (let ref of refs) {
                        node = node.patch({
                            consequent: insertConditionalAssignment(node.consequent, ref, false)
                        });
                        if (node.alternate) {
                            node = node.patch({
                                alternate: insertConditionalAssignment(node.alternate, ref, true)
                            });
                        }
                    }
                    return node;
                }
            }
        }
    })

    return [result, errors];
}

function insertConditionalAssignment(node: Expression, ref: Reference, negate: boolean) {
    return addToBlock(
        node,
        new Assignment({
            location: node.location,
            id: new Reference(ref),
            value: new ConditionalAssertion({
                location: node.location,
                value: ref,
                negate
            })
        }),
        true
    );
}

