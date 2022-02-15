import { traverse, replace } from "@glas/traverse";
import { Node } from "../Node";
import { Assignment } from "../ast/Assignment";
import { BinaryOperation } from "../pst/BinaryOperation";
import { Call } from "../pst/Call";
import { Function } from "../pst/Function";
import { Group } from "../pst/Group";
import { Identifier } from "../ast/Identifier";
import { Sequence } from "../pst/Sequence";
import { Variable } from "../pst/Variable";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { Reference } from "../ast/Reference";
import { Phase } from "./Phase";

function toVariable(value: Node) {
    if (value instanceof Variable) {
        return value;
    }
    if (value instanceof Identifier) {
        return new Variable({
            location: value.location,
            id: value,
            type: null,
            value: null,
            writable: true,
        });
    }
    throw new SemanticError(`Expected Variable`, value);
}

export function opsToNodes(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverse(module, {
        skip(node) {
            return node instanceof SourceLocation;
        },
        leave(node) {
            if (node instanceof BinaryOperation) {
                let { location, left, right } = node;
                let operator = node.operator.value as string;
                switch (operator) {
                    case ":":
                        return new Variable({
                            location,
                            id: left,
                            type: right,
                            value: null,
                            writable: true,
                        })
                    case "=":
                        // could this be a reassignment? No, would have to be :=
                        return new Variable({
                            location,
                            id: left instanceof Variable ? left.id : left,
                            type: left instanceof Variable ? left.type : null,
                            value: right,
                            writable: left instanceof Variable ? left.writable : false,
                        })
                    case ",":
                        return Sequence.merge(left, right)
                    case "=>":
                        //  Function
                        //  left should be an Identifier or a Group
                        let parameters = new Array<Variable>();
                        if (left instanceof Identifier) {
                            parameters.push(toVariable(left))
                        }
                        else if (left instanceof Group) {
                            let { value } = left;
                            if (value instanceof Sequence) {
                                parameters.push(...value.nodes.map(toVariable))
                            }
                            else if (value != null) {
                                parameters.push(toVariable(value));
                            }
                        }
                        else {
                            console.log(left);
                            throw new SemanticError(`Invalid function parameter(s)`, left);
                        }
        
                        return new Function({
                            location,
                            parameters,
                            body: right,
                        })
                    default:
                        if (operator.endsWith("=")) {
                            if (!(left instanceof Identifier)) {
                                errors.push(new SemanticError(`Expected a variable reference`, left));
                                return;
                            }
                            let value = right;
                            if (operator !== "=") {
                                value = new Call({
                                    location,
                                    callee: new Reference({
                                        location: node.operator.location,
                                        name: node.operator.value.slice(0, -1),
                                    }),
                                    args: [left, right],
                                })
                            }
                            return new Assignment({
                                location,
                                id: left,
                                value,
                            })
                        }
                        else {
                            return new Call({
                                location,
                                callee: new Reference({
                                    location: node.operator.location,
                                    name: node.operator.value,
                                }),
                                args: [left, right],
                            })
                        }
                }
            }
        }
    })
    return [result, errors];
}