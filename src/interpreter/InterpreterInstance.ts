import { coreTypes } from "../compiler/coreTypes";
import { InterpreterValue } from "./InterpreterValue";

export class InterpreterInstance {
    public readonly value: object | string | number | InterpreterInstance[];
    public readonly type: string;

    constructor(value: InterpreterValue[], type?: string)
    constructor(value: string, type?: string)
    constructor(value: boolean, type?: string)
    constructor(value: number, type?: string)
    constructor(value: object, type: string)
    constructor(
        value: object | string | boolean | number | InterpreterInstance[],
        type?: string,
    ) {
        if (type == null) {
            switch (typeof value) {
                case "boolean":
                    value = Number(value);
                    //  fall through
                case "number":
                    type = coreTypes.Number;
                    break;
                case "string":
                    type = coreTypes.String;
                    break;
                case "object":
                    if (Array.isArray(value)) {
                        type = coreTypes.Array;
                        break;
                    }
            }
        }
        this.type = type!;
        this.value = value as any;
    }

    isArray() {
        return this.type === coreTypes.Array;
    }

    isString() {
        return this.type === coreTypes.String;
    }

    isNumber() {
        return this.type === coreTypes.Number;
    }

    isBoolean() {
        return this.value === 1 || this.value === 0;
    }

    isTrue() {
        if (this.value === 1) {
            return true;
        }
        if (this.value === 0) {
            return false;
        }
        throw new Error(`isTrue expects a 0 | 1: ${this}`);
    }

    patch(value) {
        return new InterpreterInstance(value, this.type);
    }

    toString() {
        return JSON.stringify(this);
    }
}
