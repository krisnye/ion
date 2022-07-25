import { Node } from "../Node";

export class ESNode {

    constructor(props: any) {
        let { location, ...other } = props;
        Object.assign(this, other);
    }

    toString() {
        return JSON.stringify(this, null, 4);
    }

}