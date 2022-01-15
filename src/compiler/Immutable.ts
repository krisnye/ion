import { Serializable } from "./Serializable";

export class Immutable extends Serializable {

    constructor(props) {
        super();
        Object.assign(this, props);
    }

    patch(props): this {
        return new (this as any).constructor({ ...this, ...props })
    }

}