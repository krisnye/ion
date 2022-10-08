import { Expression } from "../compiler/ast/Expression";
import { coreTypes } from "../compiler/coreTypes";
import { InterpreterValue } from "./InterpreterValue";

export class InterpreterInstance {
    public readonly value: object | string | number | InterpreterInstance[];
    public readonly type: string;

    public constructor(value: InterpreterValue[], type?: string)
    public constructor(value: null, type?: string)
    public constructor(value: string, type?: string)
    public constructor(value: boolean, type?: string)
    public constructor(value: number, type?: string)
    public constructor(value: object, type: string)
    public constructor(
        value: object | string | boolean | number | null | InterpreterInstance[],
        type?: string,
    ) {
        value = InterpreterInstance.unwrap(value);
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
                    if (value == null) {
                        type = coreTypes.Null;
                    }
                    else if (Array.isArray(value)) {
                        type = coreTypes.Array;
                    }
                    else if (value instanceof RegExp) {
                        type = coreTypes.RegExp;
                    }
                    break;
            }
        }
        if (type == null) {
            throw new Error(`type is required: ${value}`);
        }
        if (Array.isArray(value)) {
            value = value.map(InterpreterInstance.wrap);
        }
        this.type = type;
        this.value = value as any;
    }

    *getKeys(): Generator<string | number> {
        if (this.isArray()) {
            for (let i = 0; i < (this.value as any[]).length; i++) {
                yield i;
            }
        }
        else {
            for (let name in this.value as any) {
                yield name;
            }
        }
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
        if (this.value === 0) {
            return false;
        }
        // if (this.value === 1) {
        return true;
        // }
        // throw new Error(`isTrue expects a 0 | 1: ${this}`);
    }

    get(key): InterpreterInstance {
        key = InterpreterInstance.unwrap(key);
        return InterpreterInstance.wrap(this.value[key]);
    }

    patch(value) {
        return new InterpreterInstance(value, this.type);
    }

    toString() {
        if (primitives[this.type]) {
            return JSON.stringify(this.value);
        }
        if (this.isArray()) {
            return `[${Object.values(this.value).join(`, `)}]`;
        }
        return `${this.type}(${Object.entries(this.value).map(([name,value]) => `${name}=${value}`)})`;
    }

    static wrap(value) {
        if (value === undefined || value instanceof InterpreterInstance || value instanceof Expression) {
            return value;
        }
        return new InterpreterInstance(value);
    }

    static unwrap(value) {
        if (value instanceof InterpreterInstance) {
            value = value.value;
        }
        if (Array.isArray(value)) {
            value = value.map(InterpreterInstance.unwrap);
        }
        return value;
    }

}

const primitives = {
    String: true, Number: true, Boolean: true, Null: true,
}
