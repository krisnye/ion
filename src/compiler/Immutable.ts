

export class Immutable {

    constructor(props) {
        Object.assign(this, props);
    }

    patch(props): this {
        return new (this as any).constructor({ ...this, ...props })
    }

}