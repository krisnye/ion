import { TypeExpression, UnionType, IntersectionType, Expression, Reference, BinaryExpression, MemberExpression, DotExpression, Id, ExpressionStatement } from "../ast";
import toCodeString from "../toCodeString";
import { mapValues } from "../common";

function operandsToArray(e: Expression, operator: string) {
    let operands = new Array<Expression>()
    function add(e: Expression) {
        if (BinaryExpression.is(e) && e.operator === operator) {
            add(e.left)
            add(e.right)
        }
        else {
            operands.push(e)
        }
    }
    add(e)
    return operands
}

// dot.b.c
// MemberExpression
//     object: MemberExpression
//         object: DotExpression
//         property: b
//     property: c
// return
// b
// MemberExpression
//     object: DotExpression
//     property: c

function membersToArray(e: MemberExpression) {
    let members = new Array<Expression | Id>()
    while (true) {
        members.unshift(e.property)
        if (MemberExpression.is(e.object)) {
            e = e.object
        }
        else {
            members.unshift(e.object)
            return members
        }
    }
}

function memberArrayToExpression(members: Array<Expression | Id> & [Expression]) {
    let e = members[0]
    for (let i = 1; i < members.length; i++) {
        e = new MemberExpression({ object: e, property: members[i] })
    }
    return e
}

function getRootDotMemberAndExpression(e: MemberExpression): [Expression | Id, Expression] | null {
    let members = membersToArray(e)
    if (DotExpression.is(members[0])) {
        return [members[1], memberArrayToExpression([members[0], ...members.slice(2)] as any)]
    }
    return null
}

export default function toUnionType(e: TypeExpression): UnionType {
    let types = operandsToArray(e.value, "|").map(toIntersectionType)
    return new UnionType({ types })
}

function toIntersectionType(e: Expression): IntersectionType {    
    if (TypeExpression.is(e)) {
        e = e.value
    }
    let properties = new Map<number|string, Expression>()
    let types = new Map<Expression, Reference | IntersectionType>()
    let expressions = new Map<string, Expression>()

    for (let clause of operandsToArray(e, "&")) {
        if (BinaryExpression.is(clause) && MemberExpression.is(clause.left)) {
            let rootAndMember = getRootDotMemberAndExpression(clause.left)
            if (rootAndMember) {
                let [property, expression] = rootAndMember
                // restore expression as left of clause
                expression = clause.patch({ left: expression })
                // no support for types yet
                if (TypeExpression.is(property)) {
                    throw new Error("Type members not supported yet")
                }
                let pstring = toCodeString(property)
                let current = properties.get(pstring)
                if (current != null) {
                    expression = new BinaryExpression({ left: current, operator: "&", right: expression })
                }
                properties.set(pstring, expression)
                continue
            }
        }

        // if it's not a property or type member expression chain then it's an arbitrary expression
        expressions.set(toCodeString(clause), clause)
    }

    return new IntersectionType({
        properties: mapValues(properties, toIntersectionType),
        types,
        expressions
    })
}
