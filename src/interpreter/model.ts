import { coreTypes } from "../compiler/coreTypes";

export type TypeId = string;
export type ClassId = string;

export interface BaseInstance {
    /** An optional unique identifier which is retained in results if this value is retained */
    id?: string;
    type: ClassId;
    value: Value;
}

export interface IntegerInstance extends BaseInstance {
    type: typeof coreTypes.Integer
    value: IntegerValue
}

export interface FloatInstance extends BaseInstance {
    type: typeof coreTypes.Float
    value: FloatValue
}

export interface StringInstance extends BaseInstance {
    type: typeof coreTypes.String
    value: StringValue
}

export interface ObjectInstance extends BaseInstance {
    value: ObjectValue
}

export interface ArrayInstance extends BaseInstance {
    type: typeof coreTypes.Array
    value: ArrayValue
}

export type Instance = IntegerInstance | FloatInstance | StringInstance | ObjectInstance | ArrayInstance;

export type IntegerValue = number;
export type FloatValue = number;
export type StringValue = string;
export type ObjectValue = {
    [key: string]: Instance
}
export type ArrayValue = Instance[];

export type Value = IntegerValue | FloatValue | StringValue | ObjectValue | ArrayValue;

export function isIntegerInstance(instance: Instance): instance is IntegerInstance {
    return instance.type === coreTypes.Integer;
}

export function isFloatInstance(instance: Instance): instance is FloatInstance {
    return instance.type === coreTypes.Float;
}

export function isStringInstance(instance: Instance): instance is StringInstance {
    return instance.type === coreTypes.String;
}
