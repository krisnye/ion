import { strict as assert } from "assert"
import { b, c, e, or, m, and, dot, not, eq, is } from "./expressions"
import { BinaryExpression, TypeExpression } from "../../ast"
import toCodeString from "../../toCodeString"
import toUnionType from "../toUnionType"
import { traverse } from "../../Traversal"

let type = new TypeExpression({
    value: and(
        is(m(dot(), "foo"), "Foo"),
        and(
            is(m(m(dot(), "bar"), "baz"), "Bar"),
            and(                
                is(m(m(dot(), "bar"), "caz"), "Car"),
                is(dot(), "Daz")
            )
        )
    )
})

let unionType = traverse(toUnionType(type), {
    leave(node) {
        if (BinaryExpression.is(node) && node.operator === "is") {
            return node.right
        }
    }
})
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
console.log(toCodeString(type))
console.log("===")
console.log(toCodeString(unionType))
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
