import { traverse, replace } from "../traverse";
import { Node } from "../Node";
import { Assignment } from "../ast/Assignment";
import { BinaryExpression } from "../pst/BinaryExpression";
import { Call as PstCall } from "../pst/Call";
import { Call as AstCall, isMetaCall, MetaCall } from "../ast/Call";
import { Function } from "../ast/Function";
import { Group } from "../pst/Group";
import { Identifier, IdentifierProps } from "../ast/Identifier";
import { Sequence } from "../pst/Sequence";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { Reference } from "../ast/Reference";
import { Phase } from "./Phase";
import { Member } from "../ast/Member";
import { Class as PstClass } from "../pst/Class";
import { Class as AstClass } from "../ast/Class";
import { For as PstFor } from "../pst/For";
import { For as AstFor } from "../ast/For";
import { Variable } from "../ast/Variable";
import { FunctionType } from "../ast/FunctionType";
import { Block } from "../ast/Block";
import { addMetaCallsToContainers } from "../ast/MetaContainer";
import { UnaryOperation } from "../pst/UnaryOperation";
import { isTypeName } from "../utility";
import { TypeReference } from "../ast/TypeReference";
import { Type } from "../ast/Type";
import { Expression } from "../ast/Expression";
import { IntegerLiteral } from "../ast/NumberLiteral";
import { Pair } from "../ast/Pair";
import { coreTypes } from "../coreTypes";
import { ForItem } from "../ast/ForItem";
import { Conditional } from "../ast/Conditional";
import { FunctionDeclarationHackOperatorSource } from "./destructuringAndUnaryNumberLiterals";
import { FunctionDeclaration } from "../ast/FunctionDeclaration";

function toParametersOrMeta(value: Node | null) {
    let parameters = new Array<Variable | MetaCall>();
    if (value instanceof Sequence) {
        parameters.push(...value.nodes.map(toVariableOrMetaCall));
    }
    else if (value != null) {
        parameters.push(toVariableOrMetaCall(value));
    }
    return parameters;
}

function toVariableOrMetaCall(value: Node) {
    if (value instanceof Variable || isMetaCall(value)) {
        return value;
    }
    if (value instanceof Identifier || value instanceof Reference) {
        return new Variable({
            location: value.location,
            id: new Identifier(value),
            type: null,
            value: null,
            meta: [],
            constant: false,
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

function destructure(temp: IdentifierFactory, nodes: Array<Node>, pattern: Node | null, right: Expression | Identifier, variableOrAssignment: boolean, memberIndex: null | number = null) {
    if (pattern instanceof Group) {
        if (right instanceof Reference) {
            destructure(temp, nodes, pattern.value, right, variableOrAssignment, memberIndex);
        }
        else {
            // make temp variable IF the right is not a reference.
            let tempVar = new Identifier(temp(right.location));
            memberIndex = pattern.open.value == "[" ? 0 : null;
            nodes.push(new Variable({
                location: right.location,
                id: tempVar,
                type: null,
                value: right as Expression,
                constant: true,
                meta: [],
            }));
            destructure(temp, nodes, pattern.value, new Reference(tempVar), variableOrAssignment, memberIndex);
        }
    }
    else if (pattern instanceof Sequence) {
        for (let id of pattern.nodes) {
            destructure(temp, nodes, id, right, variableOrAssignment, memberIndex);
            if (memberIndex != null) {
                memberIndex++;
            }
        }
    }
    else if (pattern instanceof Identifier || pattern instanceof Reference) {
        let computed = memberIndex != null;
        let value = new Member({
            location: right.location,
            object: right as Expression,
            property: memberIndex != null ? IntegerLiteral({ location: pattern.location, value: memberIndex }) : (computed ? pattern : new Identifier(pattern))
        });
        let { location } = right;
        let id = pattern;
        nodes.push(
            variableOrAssignment
            ? new Variable({ location, id: new Identifier(id), type: null, value, constant: true, meta: [] })
            : new Assignment({ location, id: new Reference(id), value })
        );
    }
    else {
        console.log({ impossible: true, pattern });
        throw new SemanticError(`(Should Be Impossible) Invalid destructuring pattern`, pattern!);
    }
}
export function opsToValueNodes(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let temp = tempFactory("opsToNodes");
    let result = traverse(module, {
        enter(node, ancestors, path) {
        },
        leave(node, ancestors, path) {
            let parent = ancestors[ancestors.length - 1];
            if (parent instanceof Conditional) {
                // console.log({ parent, node });
                if (!(node instanceof Block) && (node === parent.consequent || node === parent.alternate)) {
                    // convert conditional branches to always be Blocks.
                    return new Block({ location: node.location, nodes: [ node ]});
                }
            }
            // check classes as well
            if (node instanceof PstFor) {
                let { id, value, body } = node;
                let dnodes = new Array<Node>();
                let _leftId: IdentifierProps;
                if (id instanceof Reference) {
                    _leftId = new Identifier(id);
                }
                else {
                    _leftId = temp(id.location);
                    destructure(temp, dnodes, id, new Reference(_leftId), true, null);
                }
                return new AstFor({
                    location: node.location,
                    left: new ForItem({
                        location: node.id.location,
                        meta: [],
                        id: new Identifier(_leftId),
                        // TEMPORARY HACK. FIXME
                        type: new TypeReference({ location: value.location, name: coreTypes.Float }),
                        value: null
                    }),
                    right: value as Expression,
                    body: body.patch({
                        nodes: [...dnodes, ...body.nodes] as Expression[]
                    })
                })
            }
            if (node instanceof PstClass) {
                //  first check and extract extends
                let _extends = new Array<Reference>();
                function addExtends(node: Node | null) {
                    if (node instanceof Sequence) {
                        for (let child of node.nodes) {
                            addExtends(child);
                        }
                    }
                    else if (node instanceof Reference || node instanceof Identifier) {
                        if (!isTypeName(node.name)) {
                            throw new SemanticError(`Expected Type name`, node);
                        }
                        _extends.push(new TypeReference(node));
                    }
                    else if (node != null) {
                        throw new SemanticError(`Expected class reference`, node);
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
                    return new AstClass({ location: node.location, id: node.id, extends: _extends, nodes: node.nodes as Variable[], meta: [] });
                }
            }
            else if (node instanceof PstCall) {
                let args = node.args instanceof Sequence ? [...node.args.nodes] : node.args ? [node.args] : [];
                return new AstCall({ location: node.location, callee: node.callee, nodes: args });
            }
            else if (node instanceof Identifier) {
                // probably should convert most to References, but which ones NOT to?
                let retainAsIdentifier
                    = parent instanceof Pair
                    || parent instanceof AstClass || parent instanceof PstClass
                    || parent instanceof Variable && parent.id === node
                    || parent instanceof BinaryExpression && node === parent.right && parent.operator.value === ".";
                    //      parent is Object Literal and this is key.
                if (!retainAsIdentifier) {
                    return isTypeName(node.name) ? new TypeReference(node) : new Reference(node);
                }
            }
            else if (node instanceof UnaryOperation) {
                let { location } = node;
                return new AstCall({
                    location,
                    callee: new Reference({
                        location: node.operator.location,
                        name: node.operator.value,
                    }),
                    nodes: [node.value],
                })
            }
            else if (node instanceof BinaryExpression) {
                let { location } = node;
                let left = node.left as Expression;
                let right = node.right as Expression;
                let operator = node.operator.value as string;
                switch (operator) {
                    case ":":
                        if (left instanceof Identifier || left instanceof Reference) {
                            return new Variable({
                                location,
                                id: new Identifier(left),
                                declaredType: right as Type,
                                value: null,
                                constant: false,
                                meta: [],
                            })
                        }
                        else if (left instanceof Group) {
                            let parameters = toParametersOrMeta(left.value) as Variable[];
                            return new FunctionType({
                                location,
                                meta: [],
                                parameters,
                                returnType: right as any as Type,
                            })
                        }
                        else {
                            errors.push(new SemanticError(`Expected identifier`, left));
                            return;
                        }
                    case ":=":
                    case "=":
                        // could this be a reassignment? No, would have to be :=
                        let isVariable = operator === "=";
                        if (left instanceof Group && !(parent instanceof Sequence)) {
                            let dnodes = new Array<Node>();
                            destructure(temp, dnodes, left, right, isVariable);
                            return replace(...dnodes);
                        }
                        let id = left instanceof Variable ? left.id : left;
                        let declaredType = left instanceof Variable ? left.declaredType : null;
                        let constant = left instanceof Variable ? left.constant : true;
                        if (!(id instanceof Identifier || id instanceof Reference)) {
                            console.log({ id });
                            errors.push(new SemanticError(`Expected Identifier`, id));
                            return;
                        }

                        if (isVariable) {
                            if (node.operator.source === FunctionDeclarationHackOperatorSource) {
                                return new FunctionDeclaration({
                                    ...right as Function,
                                    location,
                                    id: new Identifier(id)
                                });
                                // return new Variable({ location, id: new Identifier(id), declaredType, value: right, constant, meta: [] });
                            }
    
                            return new Variable({ location, id: new Identifier(id), declaredType, value: right, constant, meta: [] });
                        }
                        else {
                            return new Assignment({ location, id: new Reference(id), value: right });
                        }
                    case ".":
                        return new Member({ location, object: left as Expression, property: right });
                    case ",":
                        return Sequence.merge(left, right)
                    case "=>":
                        let returnType = null;
                        //  Function
                        if (left instanceof FunctionType) {
                            return new Function({
                                ...left,
                                location: SourceLocation.merge(left.location, right.location),
                                body: right,
                            })
                        }
                        //  left should be an Identifier or a Group
                        let parameters = new Array<Variable | MetaCall>();
                        if (left instanceof Identifier || left instanceof Reference) {
                            parameters.push(toVariableOrMetaCall(left))
                        }
                        else if (left instanceof Group) {
                            parameters.push(...toParametersOrMeta(left.value));
                        }
                        else if (left instanceof Block) {
                            parameters.push(...left.nodes.map(toParametersOrMeta).flat())
                        }
                        else if (left instanceof Variable && left.value instanceof FunctionType) {
                            return left.patch({
                                value: new Function({
                                    ...left.value,
                                    body: right,
                                })
                            })
                        }
                        else if (left instanceof Function) {
                            return left.patch({
                                body: right
                            });
                        }
                        else {
                            errors.push(new SemanticError(`Invalid function parameter(s)`, left));
                            return;
                        }

                        return new Function({
                            location,
                            meta: [],
                            parameters: addMetaCallsToContainers(parameters, errors),
                            returnType,
                            body: right,
                        })
                    default:
                        if (operator.endsWith("=") && operator !== "==") {
                            if (!(left instanceof Identifier || left instanceof Reference)) {
                                errors.push(new SemanticError(`Expected a variable reference`, left));
                                return;
                            }
                            let value = right;
                            if (operator !== "=") {
                                value = new AstCall({
                                    location,
                                    callee: new Reference({
                                        location: node.operator.location,
                                        name: node.operator.value.slice(0, -1),
                                    }),
                                    nodes: [left, right],
                                })
                            }
                            return new Assignment({
                                location,
                                id: new Reference(left),
                                value,
                            })
                        }
                        else {
                            return new AstCall({
                                location,
                                callee: new Reference({
                                    location: node.operator.location,
                                    name: node.operator.value,
                                }),
                                nodes: [left, right],
                            })
                        }
                }
            }
        }
    })
    return [result, errors];
}