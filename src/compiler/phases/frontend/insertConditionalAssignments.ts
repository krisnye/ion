import { Phase } from "../Phase";
import { traverse } from "../../traverse";
import { Conditional } from "../../ast/Conditional";
import { Reference } from "../../ast/Reference";
import { traverseWithScope } from "./createScopeMaps";
import { isValidId } from "../../common";
import { isTypeName } from "../../utility";
import { addToBlock } from "../../ast/Block";
import { ConditionalAssertion } from "../../ast/ConditionalAssertion";
import { Expression } from "../../ast/Expression";
import { Assignment } from "../../ast/Assignment";
import { Call } from "../../ast/Call";
import { isLogicalOperator, LogicalOperators } from "../../analysis/LogicalOperators";
import { BinaryExpression } from "../../ast/BinaryExpression";

function getReferences(
    root,
    predicate: ((ref: Reference) => boolean) = (ref) => isValidId(ref.name) && !isTypeName(ref.name)
) {
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

export function isLogicalBinaryExpression(node: Expression): node is BinaryExpression & { operator: LogicalOperators } {
    return node instanceof BinaryExpression && isLogicalOperator(node.operator);
    // return node instanceof Call && node.callee instanceof Reference && (node.callee.name === LogicalOperators.and || node.callee.name === LogicalOperators.or);
}

export function insertConditionalAssignments(moduleName, module, externals): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                // we need to also insert conditional assignments into the right hand side of chained &&, || expressions.
                if (isLogicalBinaryExpression(node)) {
                    // just && for now.
                    const debug = node.toString().indexOf("chained_conditionals") >= 0;
                    if (debug) {
                        // console.log("_______" + node);
                        let {left, right} = node;
                        let refs = getReferences(left);
                        for (let ref of refs) {
                            right = insertConditionalAssignment(right, ref, node.operator === LogicalOperators.or, true);
                        }
                        node = node.patch({ right });
                    }
                }

                if (node instanceof Conditional) {
                    // insert conditional assignments here.
                    let refs = getReferences(node.test);
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
                }
                return node;
            }
        }
    })

    return [result, errors];
}

function insertConditionalAssignment(node: Expression, ref: Reference, negate: boolean, isChained = false) {
    return addToBlock(
        node,
        new Assignment({
            location: node.location,
            id: new Reference(ref),
            conditional: true,
            value: new ConditionalAssertion({
                location: node.location,
                value: ref,
                negate,
                isChained
            })
        }),
        true
    );
}

