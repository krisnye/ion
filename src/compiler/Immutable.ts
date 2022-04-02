import { Serializable } from "./Serializable";

export class Immutable extends Serializable {

    constructor(values) {
        super();
        Object.assign(this, values);
    }

    patch(props): this {
        return new (this as any).constructor({ ...this, ...props })
    }

}