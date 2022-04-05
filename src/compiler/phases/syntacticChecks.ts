import { traverse, skip } from "../traverse";
import { createParser } from "../parser/createParser";
import { Phase } from "./Phase";
import { BinaryOperation } from "../pst/BinaryOperation";
import { Group } from "../pst/Group";
import { Identifier } from "../ast/Identifier";
import { SemanticError } from "../SemanticError";

const parser = createParser();

export function syntacticChecks(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    module = traverse(module, {
        enter(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
            if (parent instanceof BinaryOperation
                && (parent.operator.value === "=" || parent.operator.value === ":=")
                && node === parent.left
            ) {
                // left hand side of assignment must be Identifier | Group
                if (!(
                    node instanceof Identifier
                    || node instanceof Group
                    || node instanceof BinaryOperation && node.operator.value === ":"
                )) {
                    errors.push(new SemanticError(`Invalid left hand assignment`, node));
                }
                // if it's a group, make sure it only contains an Identifier or a Sequence of Identifiers
                if (node instanceof Group) {
                    function checkValidDestructure(child) {
                        if (child instanceof BinaryOperation) {
                            if (child.operator.value === ",") {
                                checkValidDestructure(child.left);
                                checkValidDestructure(child.right);
                                return;
                            }
                        }
                        else if (child instanceof Identifier) {
                            return;
                        }
                        debugger;
                        errors.push(new SemanticError(`Invalid destructuring value`, child));
                    }
                    checkValidDestructure(node.value);
                }
                return skip;
            }
        },
        leave(node) {
        }
    })
    return [module, errors];
}
