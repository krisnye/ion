import { traverse } from "@glas/traverse";
import { BinaryExpression } from "../ast/BinaryExpression";
import { Call } from "../ast/Call";
import { Expression } from "../ast/Expression";
import { IntersectionType } from "../ast/IntersectionType";
import { Member } from "../ast/Member";
import { NumberType } from "../ast/NumberType";
import { ObjectType } from "../ast/ObjectType";
import { Pair } from "../ast/Pair";
import { Reference } from "../ast/Reference";
import { Type } from "../ast/Type";
import { UnionType } from "../ast/UnionType";
import { SourceLocation } from "../SourceLocation";

export function *splitExpression(operator: string, e: Expression): IterableIterator<Expression> {
    if (e instanceof Call && e.callee instanceof Reference && e.callee.name === operator) {
        for (let arg of e.nodes) {
            yield* splitExpression(operator, arg);
        }
    }
    else {
        yield e;
    }
}

export function joinExpressions(operator: string, location: SourceLocation, expressions: Expression[], useBinaryExpression = false): Expression | undefined {
    let right = expressions[expressions.length - 1];
    for (let i = expressions.length - 2; i >= 0; i--) {
        const left = expressions[i];
        if (useBinaryExpression) {
            right = new BinaryExpression({
                location,
                left,
                operator,
                right,
            });
        } else {
            right = new Call({
                location,
                callee: new Reference({ location, name: operator }),
                nodes: [left, right]
            })
        }
    }
    return right;
}

export function splitFilterJoinMultiple(type: boolean, root: Expression, splitOperators: string[], joinOperators: string[], filter: (e: Expression) => Expression | null) {
    let splitOperator = splitOperators[0];
    let joinOperator = joinOperators[0];
    let remainingSplitOperators = splitOperators.slice(1);
    let remainingJoinOperators = joinOperators.slice(1);
    let useFilter = remainingSplitOperators.length === 0
        ? filter
        : (e => splitFilterJoinMultiple(type, e, remainingSplitOperators, remainingJoinOperators, filter));
    let expressions = [...splitExpression(splitOperator, root)].map(useFilter).filter(Boolean) as Expression[]
    if (type) {
        if (joinOperator === "&&") {
            return IntersectionType.join(...expressions as Type[]);
        }
        if (joinOperator === "||") {
            return UnionType.join(...expressions as Type[]);
        }
        throw new Error("Invalid operator for Types: " + joinOperator);
    }
    return joinExpressions(joinOperator, root.location, expressions);
}

function isDot(e: Expression, dot: Expression): e is Reference & { name: typeof dot } {
    return e.toString() === dot.toString();
}

export function hasDot(root: Expression, dot: Expression) {
    if (isDot(root, dot)) {
        return true;
    }
    let found = false;
    traverse(root, {
        skip(node) {
            return found || node instanceof SourceLocation;
        },
        enter(node) {
            if (isDot(node, dot)) {
                found = true;
            }
        }
    });
    return found;
}

export function expressionToType(e: Expression, dot: Expression, negate: boolean): Expression | null {
    if (isComparisonOperation(e)) {
        let operator = e.callee.name;
        let [left, right] = e.nodes;
        let leftHasDot = hasDot(left, dot);
        let rightHasDot = hasDot(right, dot);
        if (rightHasDot && !leftHasDot) {
            let { reflect } = compareOperators[operator];
            if (reflect) {
                // swap left to right
                [left, right] = [right, left];
                operator = reflect;
                [leftHasDot, rightHasDot] = [rightHasDot, leftHasDot];
            }
        }
        if (leftHasDot) {
            if (isDot(left, dot)) {
                if (negate) {
                    operator = compareOperators[operator].negate!;
                }
                let type = compareOperators[operator].toType(right);
                return type;
            }
            else {
                //  TODO: This next
                //  then figure out how to handle sample.ion thingy
                if (left instanceof Member) {
                    // console.log({
                    //     leftObject: left.object.toString(),
                    //     dot: dot.toString()
                    // });
                    if (left.object.toString() === dot.toString()) {
                        // console.log("------------: " + left.object + " ?? " + dot);
                        if (compareOperators[operator]) {
                            let rightType = compareOperators[operator].toType(right);
                            let newObjectType = new ObjectType({
                                location: e.location,
                                properties: [new Pair({
                                    location: e.location,
                                    key: left.property as Type,
                                    value: rightType
                                })]
                            });
                            return newObjectType;
                        }
                    }
                }
                console.log("Handle your nested shit here: ", { left: left.toString(), e: e.toString() } );
            }
        }
    }
    return null;
}

type OperatorInfo = { toType(e: Expression) : Type, reflect: string | false, negate: string };
export const compareOperators: { [op: string]: OperatorInfo } = {
    ">": {
        toType: (min: Expression) => new NumberType({ location: min.location, min, minExclusive: true }),
        reflect: "<",
        negate: "<="
    },
    "<": {
        toType: (max: Expression) => new NumberType({ location: max.location, max, maxExclusive: true }),
        reflect: ">",
        negate: ">="
    },
    ">=": {
        toType: (min: Expression) => new NumberType({ location: min.location, min, minExclusive: false }),
        reflect: "<=",
        negate: "<"
    },
    "<=": {
        toType: (max: Expression) => new NumberType({ location: max.location, max, maxExclusive: false }),
        reflect: ">=",
        negate: "<"
    },
    "==": {
        toType: (minMax: Expression) => new NumberType({ location: minMax.location, min: minMax, max: minMax }),
        reflect: "==",
        negate: "!="
    },
    "!=": {
        toType: (value: Expression) => UnionType.join(
            new NumberType({ location: value.location, min: value, minExclusive: true }),
            new NumberType({ location: value.location, max: value, maxExclusive: true }),
        )!,
        reflect: "!=",
        negate: "=="
    },
    "is": {
        toType: (right: Expression) => right as Type,
        reflect: false,
        negate: "isnt"
    },
}

function isComparisonOperation(e: Expression): e is Call & { callee: Reference } {
    return e instanceof Call && e.nodes.length === 2 && e.callee instanceof Reference && compareOperators[e.callee.name] != null;
}