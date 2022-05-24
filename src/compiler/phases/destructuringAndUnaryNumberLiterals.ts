import { traverse, skip } from "../traverse";
import { createParser } from "../parser/createParser";
import { Phase } from "./Phase";
import { BinaryExpression } from "../pst/BinaryExpression";
import { Group } from "../pst/Group";
import { SemanticError } from "../SemanticError";
import { UnaryOperation } from "../pst/UnaryOperation";
import { NumberLiteral } from "../ast/NumberLiteral";
import { Identifier } from "../ast/Identifier";
import { Call as PstCall } from "../pst/Call";
import { Variable } from "../ast/Variable";
import { Token } from "../Token";
import { tokenTypes } from "../tokenizer/TokenType";
import { For } from "../pst/For";

const parser = createParser();

function checkValidDestructure(child, errors: Error[]) {
    if (child instanceof BinaryExpression) {
        if (child.operator.value === ",") {
            checkValidDestructure(child.left, errors);
            checkValidDestructure(child.right, errors);
            return;
        }
    }
    else if (child instanceof Identifier) {
        return;
    }
    console.log({ child });
    errors.push(new SemanticError(`Invalid destructuring value`, child));
}
export function destructuringAndUnaryNumberLiterals(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    module = traverse(module, {
        enter(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
            if (parent instanceof BinaryExpression
                && (parent.operator.value === "=" || parent.operator.value === ":=")
                && node === parent.left
            ) {
                // left hand side of assignment must be Identifier | Group
                if (!(
                    node instanceof Identifier
                    || node instanceof Group
                    || node instanceof BinaryExpression && node.operator.value === ":"
                )) {
                    errors.push(new SemanticError(`Invalid left hand assignment`, node));
                }
                if (node instanceof Group) {
                    checkValidDestructure(node.value, errors);
                }
            }
            if (node instanceof For && node.id instanceof Group) {
                checkValidDestructure(node.id.value, errors);
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
            if (node instanceof BinaryExpression && (node.operator.value === "=>" || node.operator.value === ":")&& node.left instanceof PstCall) {
                const { location } = node;
                return new BinaryExpression({
                    location,
                    left: node.left.callee,
                    operator: node.operator.patch({ source: "=", value: "=" }),
                    right: node.patch({
                        left: new Group({
                            location: node.left.location,
                            value: node.left.args!,
                            open: new Token({ location, type: tokenTypes.OpenParen.name , source: "(", value: "("}),
                            close: new Token({ location, type: tokenTypes.OpenParen.name , source: ")", value: ")"}),
                        }) as any
                    })
                });
            }

            return node;
        }
    })
    return [module, errors];
}
