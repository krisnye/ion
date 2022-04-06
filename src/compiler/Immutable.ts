import { Serializable } from "./Serializable";

export class Immutable extends Serializable {

    constructor(values) {
        super();
        Object.assign(this, values);
    }

    patch(props): this {
        let changed = false;
        for (let name in props) {
            let value = props[name];
            if (this[name] !== value) {
                changed = true;
                break;
            }
        }
        return changed ? new (this as any).constructor({ ...this, ...props }) : this;
    }

}