import { Identifier } from "../ast"
import { SemanticError } from "../common"
import * as t from "../types"

//  key = type, value = all types implemented by this type
class TypeData {
    baseType: string
    types: Set<string>
    constructor(baseType: Identifier, ...types: Identifier[]) {
        this.baseType = baseType.path!.toString()
        this.types = new Set(types.map(type => type.path!.toString()))
        this.types.add(this.baseType)
    }
}

//  type, [baseType], ...otherBaseTypesTheMainTypeImplements
let baseTypes: Identifier[][] = [
    [t.Boolean],
    [t.String],
    [t.Number],
    [t.Integer, t.Number],
    [t.Symbol],
    [t.Null, t.Null, t.Undefined],
    [t.Undefined, t.Null, t.Null],
    [t.Object],
    [t.Array, t.Array, t.Object],
    [t.RegExp, t.RegExp, t.Object],
    [t.Map, t.Map, t.Object],
    [t.Set, t.Set, t.Object],
    [t.WeakMap, t.Map, t.Object],
    [t.Function, t.Function, t.Object],
    [t.Class, t.Function, t.Type],
    [t.Type, t.Object],
]

function getTypeMap(types: Identifier[][]) {
    let typeMap = new Map<string,TypeData>()
    for (let typeArray of types) {
        let [type, baseType = type, ...types] = typeArray
        typeMap.set(type.path!.toString(), new TypeData(baseType, ...types))
    }
    // now make sure we recursively add subtypes
    function addRecursive(type: string, types?: Iterable<string>, added = new Set<string>()) {
        if (types) {
            let data = typeMap.get(type)!
            for (let addType of types) {
                if (!added.has(addType)) {
                    added.add(addType)
                    data.types.add(addType)
                    addRecursive(type, typeMap.get(addType)?.types, added)
                }
            }
        }
    }
    for (let type of typeMap.keys()) {
        addRecursive(type, typeMap.get(type)!.types)
    }
    return typeMap
}

export type IsType = (isInstanceOfThisType: Identifier, anInstanceOfThisType: Identifier) => boolean | null

export function createIsType(types: Identifier[][]): IsType {
    let typeMap = getTypeMap([...baseTypes, ...types])
    return (checkIfType: Identifier, isInstanceOfOtherType: Identifier): boolean | null => {
        let checkPath = checkIfType.path?.toString()
        let otherPath = isInstanceOfOtherType.path?.toString()
        if (checkPath == null || otherPath == null) {
            console.log("TODO: Figure out why isType#createIsType path's aren't present, possibly because of cyclic references")
            return null
        }
        let checkData = typeMap.get(checkPath)
        let otherData = typeMap.get(otherPath)
        if (checkData == null || otherData == null) {
            return null
        }

        if (checkData.types.has(otherPath)) {
            //  it definitely does implement it
            return true
        }

        if (checkData.baseType !== otherData.baseType) {
            // if two types have a different base type then they absolutely cannot implement each other
            //  it definitely does NOT implement it
            return false
        }

        // it MIGHT implement it
        return null
    }
}