import combineExpressions from "./analysis/combineExpressions";
import { BinaryExpression, DotExpression, Expression, Literal, Void as AstVoid } from "./ast";
import Reference from "./ast/Reference";
import { getGlobalPath } from "./pathFunctions";

function ref(name: string) {
    return new Reference({ name: getGlobalPath(name) })
}

function number(type: Reference, min: number, max: number) {
    return combineExpressions([
        new BinaryExpression({ left: new DotExpression({}), operator: "is", right: type }),
        new BinaryExpression({ left: new DotExpression({}), operator: ">=", right: new Literal({ value: min }) }),
        new BinaryExpression({ left: new DotExpression({}), operator: "<=", right: new Literal({ value: max }) }),
    ])
}

export const Boolean = ref("Boolean")
export const String = ref("String")
export const Number = ref("Number")
export const Integer = ref("Integer")
export const Array = ref("Array")
export const Map = ref("Map")
export const Set = ref("Set")
export const Class = ref("Class")
export const Function = ref("Function")
export const Type = ref("Type")
export const Object = ref("Object")
export const Null = ref("Null")
export const Any = ref("Any")
export const Never = ref("Never")
export const Undefined = ref("Undefined")
export const Void = new AstVoid({})
export const Symbol = ref("Symbol")
export const RegExp = ref("RegExp")
export const WeakMap = ref("WeakMap")

export const UInt8 = number(Integer, 0, 255)
export const Int8 = number(Integer, -128, 127)
export const UInt16 = number(Integer, 0, 65535)
export const Int16 = number(Integer, -32768, 32767)
export const UInt32 = number(Integer, 0, 4294967295)
export const Int32 = number(Integer, -2147483648, 2147483647)
export const IntegerTypes = { UInt8, Int8, UInt16, Int16, UInt32, Int32 }

// export const EmptyLocation = new Location({ start: new Position(0, 0), end: new Position(0, 0), filename: "inferType.empty" })

function equals(a, b: Reference) {
    return a === b || Reference.is(a) && a.name === b.name
}

export function isAny(node): node is Reference {
    return equals(node, Any)
}

export function isNever(node): node is Reference {
    return equals(node, Never)
}
