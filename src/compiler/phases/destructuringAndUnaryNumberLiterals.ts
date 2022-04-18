import { traverse, skip } from "../traverse";
import { createParser } from "../parser/createParser";
import { Phase } from "./Phase";
import { BinaryOperation } from "../pst/BinaryOperation";
import { Group } from "../pst/Group";
import { SemanticError } from "../SemanticError";
import { UnaryOperation } from "../pst/UnaryOperation";
import { NumberLiteral } from "../ast/NumberLiteral";
import { Identifier } from "../ast/Identifier";

const parser = createParser();

export function destructuringAndUnaryNumberLiterals(moduleName, module): ReturnType<Phase> {
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
                        errors.push(new SemanticError(`Invalid destructuring value`, child));
                    }
                    checkValidDestructure(node.value);
                }
            }
        },
        leave(node) {
            if (node instanceof UnaryOperation && node.value instanceof NumberLiteral) {
                switch (node.operator.value) {
                    case "+":
                        node = node.value;
                        break;
                    case "-":
                        node = node.value.patch({ value: - node.value.value });
                        break;
                }
            }
            return node;
        }
    })
    return [module, errors];
}
