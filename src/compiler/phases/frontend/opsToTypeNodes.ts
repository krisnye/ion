import { NumberLiteral } from "../../ast/NumberLiteral";
import { NumberType } from "../../ast/NumberType";
import { UnionType } from "../../ast/UnionType";
import { IntersectionType } from "../../ast/IntersectionType";
import { BinaryExpression } from "../../pst/BinaryExpression";
import { traverse } from "../../traverse";
import { Phase } from "../Phase";
import { UnaryOperation } from "../../pst/UnaryOperation";
import { Node } from "../../Node";
import { isTypeName } from "../../utility";
import { Lookup } from "@glas/traverse";
import { Identifier } from "../../ast/Identifier";
import { Group } from "../../pst/Group";
import { isType, Type } from "../../ast/Type";
import { SemanticError } from "../../SemanticError";
import { ObjectType } from "../../ast/ObjectType";
import { Pair } from "../../ast/Pair";
import { Expression } from "../../ast/Expression";
import { TypeReference } from "../../ast/TypeReference";
import { SourceLocation } from "../../SourceLocation";
import { Call as PstCall } from "../../pst/Call";
import { Member } from "../../ast/Member";
import { coreTypes } from "../../coreTypes";
import { TypeofExpression } from "../../ast/TypeofExpression";

export function opsToTypeNodes(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();

    let pushedTypeMode = new Set<any>();
    let isTypeModeStack = [false];
    function getTypeMode(node, ancestors): boolean | null {
        let parent = ancestors[ancestors.length - 1];
        if (parent instanceof BinaryExpression && node === parent.right) {
            switch (parent.operator.value) {
                case ":":
                    return true;
                case "=":
                    if (parent.left instanceof Identifier) {
                        return isTypeName(parent.left.name);
                    }
                    return false;
                case "=>":
                    return false;
            }
        }
        return null;
    }
    let lookup = new Lookup();
    let result = traverse(module, {
        lookup,
        enter(node, ancestors, path) {
            const isNewTypeMode = getTypeMode(node, ancestors);
            if (isNewTypeMode !== null) {
                isTypeModeStack.push(isNewTypeMode);
                pushedTypeMode.add(node);
            }
        },
        leave(node: Node, ancestors, path) {
            const { location } = node;
            const pushedNewTypeMode = pushedTypeMode.has(lookup.getOriginal(node));
            const isTypeMode = isTypeModeStack[isTypeModeStack.length - 1]
            if (isTypeMode) {
                // perform type mode conversions here.
                if (node instanceof NumberLiteral) {
                    node = new NumberType({ location, min: node, max: node, step: node.integer });
                }
                if (node instanceof UnaryOperation) {
                    switch (node.operator.value) {
                        case ">":
                            node = new NumberType({ location, min: node.value, minExclusive: true });
                            break;
                        case ">=":
                            node = new NumberType({ location, min: node.value, minExclusive: false });
                            break;
                        case "<":
                            node = new NumberType({ location, max: node.value, maxExclusive: true });
                            break;
                        case "<=":
                            node = new NumberType({ location, max: node.value, maxExclusive: false });
                            break;
                        case "typeof":
                            node = new TypeofExpression({ location, value: node.value });
                            break;    
                        case "!=":
                            node = new UnionType({
                                location,
                                left: new NumberType({ location, max: node.value, maxExclusive: true }),
                                right: new NumberType({ location, min: node.value, minExclusive: true })
                            })
                            break;
                        }
                }
                if (node instanceof BinaryExpression) {
                    switch (node.operator.value) {
                        case "..":
                            node = new NumberType({ location, min: node.left, max: node.right });
                            break;
                        case "|":
                            node = new UnionType({ location, left: node.left, right: node.right });
                            break;
                        case "&":
                            node = new IntersectionType({ location, left: node.left, right: node.right });
                            break;
                    }
                }
                //  Type( prop: Type )
                if (node instanceof PstCall) {
                    let { callee } = node;
                    if (!(callee instanceof Identifier) || !isTypeName(callee.name)) {
                        throw new SemanticError(`Expected type name`, callee);
                    }
                    node = new IntersectionType({
                        location,
                        left: new TypeReference(callee),
                        right: buildObjectType(node.args, location, "(")
                    });
                }
                if (node instanceof Member) {
                    let { object, property } = node;
                    if (!(object instanceof Identifier) || !isTypeName(object.name)) {
                        throw new SemanticError(`Expected type name`, object);
                    }
                    if (object instanceof Identifier) {
                        object = new TypeReference(object);
                    }
                    node = buildObjectType(
                        [
                            new Pair({
                                location,
                                key: new TypeReference({
                                    location,
                                    name: coreTypes.Integer
                                }),
                                value: object
                            }),
                            property as Expression,
                        ],
                        location,
                        "["
                    );
                }
                if (node instanceof Group) {
                    node = buildObjectType(node.value, location, node.open.value);
                }
                //  simplify type nodes right away
                if (node instanceof Node) {
                    node = node.simplify();
                }
            }
            if (pushedNewTypeMode) {
                isTypeModeStack.pop();
            }
            return node;
        }
    })
    return [result, errors];
}

function buildObjectType(values: Expression | (Expression | Pair)[] | null, location: SourceLocation, openToken: string) {
    if (values == null) {
        throw new SemanticError(`Expected Object Type`, location);
    }
    if (!Array.isArray(values)) {
        values = [values];
    }
    const isArray = openToken === "[";
    const isMap = openToken === "{";
    const children: (Expression | Pair<Type|Identifier,Type>)[] = [...values.filter(v => v != null).map(value => [...BinaryExpression.split(value, ",")])].flat();
    let pairs = children.map(
        (pair, index) => {
            if (pair instanceof Pair) {
                return pair;
            } 
            if (isArray && !(pair instanceof BinaryExpression)) {
                const indexValue = NumberLiteral.fromConstant(index, pair.location, true);
                return new Pair({
                    location: pair.location,
                    key: new NumberType({
                        location: pair.location,
                        min: indexValue,
                        max: indexValue,
                    }),
                    value: pair as any as Type
                });
            }
            if (!(pair instanceof BinaryExpression)) {
                throw new SemanticError(`Expected Object Type Pair`, pair);
            }
            let { left, right, operator } = pair;
            if (operator.value !== ":") {
                throw new SemanticError(`Expected :`, operator.location);
            }
            if (right instanceof BinaryExpression) {
                // then we assume that this is a NumberType == to right expression
                right = new NumberType({ location: right.location, min: right, max: right.patch({}) });
            }
            if (!(isType(right) || right instanceof Identifier)) {
                throw new SemanticError(`Expected Type`, right);
            }
            if (!(left instanceof Identifier || isType(left))) {
                throw new SemanticError(`Expected Identifier or Type`);
            }
            return new Pair({ location: pair.location, key: left as Type | Identifier, value: right as Type });
        }
    );
    if (isArray) {
        let length = inferArrayLength(children, location);
        if (length != null) {
            pairs.push(
                new Pair({
                    location,
                    key: new Identifier({ location, name: "length" }),
                    value: length
                })
            );
        }
    }
    let result: Type = new ObjectType({ location, properties: pairs });
    if (isArray || isMap) {
        result = new IntersectionType({
            location,
            left: new TypeReference({ location, name: isArray ? "Array" : "Map" }),
            right: result
        });
    }
    return result;
}

function inferArrayLength(items: (Expression | Pair)[], location: SourceLocation): NumberType | null {
    let minLength = 0;
    let maxLength : number | null = null;
    for (let item of items) {
        if (item instanceof Pair) {
            //  with any pair, we cannot determine length.
            //  only when all are expressions can we
            return null;
        }
        if (item instanceof BinaryExpression) {
            let { left } = item;
            if (left instanceof NumberType) {
                let { min, max, step: integer } = left;
                if (!integer) {
                    throw new SemanticError(`Arrays can only have integer indices`, left);
                }
                if (min instanceof NumberLiteral) {
                    if (min.value < 0) {
                        throw new SemanticError(`Array indices must be >= 0`, min);
                    }
                }
                if (max instanceof NumberLiteral) {
                    let actualMax = max.value + (left.maxExclusive ? -1 : 0);
                    maxLength = maxLength != null ? Math.max(maxLength, actualMax) : actualMax;
                }
            }
        }
        else {
            minLength++;
        }
    }
    if (maxLength != null) {
        return new NumberType({
            location,
            min: new NumberLiteral({ location, value: maxLength, integer: true }),
            max: new NumberLiteral({ location, value: maxLength, integer: true }),
            step: true
        });
    }
    if (minLength === items.length) {
        return NumberType.fromConstant(minLength, location, true);
    }

    return null;
}