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
import { IntegerLiteral } from "../pst/IntegerLiteral";
import { Class as PstClass } from "../pst/Class";
import { Class as AstClass } from "../ast/Class";

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
    function destructure(nodes: Array<Node>, pattern: Node | null, right: Node, variableOrAssignment: boolean, memberIndex: null | number = null) {
        if (pattern instanceof Group) {
            let tempVar = new Identifier(temp(right.location));
            memberIndex = pattern.open.value == "[" ? 0 : null;
            nodes.push(new Variable({
                location: right.location,
                id: tempVar,
                type: null,
                value: right,
                writable: false,
            }));
            destructure(nodes, pattern.value, new Reference(tempVar), variableOrAssignment, memberIndex);
        }
        else if (pattern instanceof Sequence) {
            for (let id of pattern.nodes) {
                destructure(nodes, id, right, variableOrAssignment, memberIndex);
                if (memberIndex != null) {
                    memberIndex++;
                }
            }
        }
        else if (pattern instanceof Identifier) {
            let value = new Member({
                location: right.location,
                object: right,
                property: memberIndex != null ? new IntegerLiteral({ location: pattern.location, value: memberIndex }) : pattern,
                computed: memberIndex != null,
            });
            let { location } = right;
            let id = pattern;
            nodes.push(
                variableOrAssignment
                ? new Variable({ location, id, type: null, value, writable: false })
                : new Assignment({ location, id, value })
            );
        }
        else {
            throw new SemanticError(`(Should Be Impossible) Invalid destructuring pattern`, pattern!);
        }
    }
    let result = traverse(module, {
        leave(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
            // check classes as well
            if (node instanceof PstClass) {
                //  first check and extract extends
                let _extends = new Array<Reference>();
                function addExtends(node: Node | null) {
                    if (node instanceof Sequence) {
                        for (let child of node.nodes) {
                            addExtends(child);
                        }
                    }
                    else if (node instanceof Reference) {
                        _extends.push(node);
                    }
                }
                addExtends(node.extends);
                // then check that class only contains Variables
                for (let child of node.nodes) {
                    if (!(child instanceof Variable)) {
                        errors.push(new SemanticError(`Not allowed within Class`, child));
                    }
                }
                if (errors.length === 0) {
                    return new AstClass({ location: node.location, id: node.id, extends: _extends, nodes: node.nodes as Variable[] });
                }
            }
            else if (node instanceof Identifier) {
                // probably should convert most to References, but which ones NOT to?
                let retainAsIdentifier
                    = parent instanceof Member && !parent.computed && node === parent.property;
                    //      parent is Object Literal and this is key.
                if (!retainAsIdentifier) {
                    return new Reference(node);
                }
            }
            else if (node instanceof BinaryOperation) {
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
                    case ":=":
                    case "=":
                        // could this be a reassignment? No, would have to be :=
                        let isVariable = operator === "=";
                        if (left instanceof Group && !(parent instanceof Sequence)) {
                            let dnodes = new Array<Node>();
                            destructure(dnodes, left, right, isVariable);
                            return replace(...dnodes);
                        }
                        let id = left instanceof Variable ? left.id : left;
                        let type = left instanceof Variable ? left.type : null;
                        let writable = left instanceof Variable ? left.writable : false;
                        if (!(id instanceof Identifier)) {
                            errors.push(new SemanticError(`Expected Identifier`, id));
                            return;
                        }

                        if (isVariable) {
                            return new Variable({ location, id, type, value: right, writable });
                        }
                        else {
                            return new Assignment({ location, id, value: right });
                        }
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
                            errors.push(new SemanticError(`Invalid function parameter(s)`, left));
                            return;
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