import { traverse, replace } from "./traverse";
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
import { Member } from "../pst/Member";

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

type IdentifierFactory = (location: SourceLocation) => { location: SourceLocation, name: string }
export function tempFactory(name: string): IdentifierFactory {
    let count = 0;
    return (location: SourceLocation) => {
        return { location, name: `_${name}_${++count}` };
    }
}

export function opsToNodes(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let temp = tempFactory("opsToNodes");
    function destructure(nodes: Array<Node>, pattern: Node | null, right: Node) {
        if (pattern instanceof Group) {
            let tempVar = new Identifier(temp(right.location));
            nodes.push(new Variable({
                location: right.location,
                id: tempVar,
                type: null,
                value: right,
                writable: false,
            }));
            destructure(nodes, pattern.value, new Reference(tempVar));
        }
        else if (pattern instanceof Sequence) {
            for (let id of pattern.nodes) {
                destructure(nodes, id, right);
            }
        }
        else if (pattern instanceof Identifier) {
            nodes.push(new Variable({
                location: right.location,
                id: pattern,
                type: null,
                value: new Member({
                    location: right.location,
                    object: right,
                    property: pattern,
                    computed: false,
                }),
                writable: false,
            }));
        }
        else {
            throw new SemanticError(`Invalid destructuring pattern`, pattern!);
        }
    }
    let result = traverse(module, {
        leave(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
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
                        if (left instanceof Group && !(parent instanceof Sequence)) {
                            let dnodes = new Array<Node>();
                            destructure(dnodes, left, right);
                            return replace(...dnodes);
                        }
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