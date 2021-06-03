import Reference from "./ast/Reference";
import { Position, Location } from "./ast";
import * as pathFunctions from "./pathFunctions";

function ref(name: string) {
    return new Reference({ name: pathFunctions.absolute(...name.split('.')) })
}

export const Boolean = ref("Boolean")
export const String = ref("String")
export const Number = ref("Number")
export const Array = ref("Array")
export const Map = ref("Map")
export const Set = ref("Set")
export const Class = ref("Class")
export const Type = ref("Type")
export const Object = ref("Object")
export const Null = ref("Null")
export const Any = ref("Any")
export const Never = ref("Never")

export const EmptyLocation = new Location({ start: new Position(0, 0), end: new Position(0, 0), filename: "inferType.empty" })

function equals(a, b: Reference) {
    return a === b || Reference.is(a) && a.name === b.name
}

export function isAny(node): node is Reference {
    return equals(node, Any)
}

export function isNever(node): node is Reference {
    return equals(node, Never)
}
