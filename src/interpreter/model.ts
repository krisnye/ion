import { SourceLocation } from "../compiler/SourceLocation";
import { classIds } from "./classIds";

export type TypeId = string;
export type ClassId = string;

export interface BaseInstance {
    /** An optional unique identifier which is retained in results if this value is retained */
    id?: string;
    type: ClassId;
    value: Value;
}

export interface IntegerInstance extends BaseInstance {
    type: classIds.Integer
    value: IntegerValue
}

export interface FloatInstance extends BaseInstance {
    type: classIds.Float
    value: FloatValue
}

export interface StringInstance extends BaseInstance {
    type: classIds.String
    value: StringValue
}

export interface ObjectInstance extends BaseInstance {
    value: ObjectValue
}

export interface ArrayInstance extends BaseInstance {
    type: classIds.Array
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
    return instance.type === classIds.Integer;
}

export function isFloatInstance(instance: Instance): instance is FloatInstance {
    return instance.type === classIds.Float;
}

export function isStringInstance(instance: Instance): instance is StringInstance {
    return instance.type === classIds.String;
}
