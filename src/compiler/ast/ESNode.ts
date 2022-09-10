import { EvaluationContext } from "../EvaluationContext";

export class ESNode {

    constructor(props: any) {
        let { location, ...other } = props;
        Object.assign(this, other);
    }

    toESNode(c: EvaluationContext) {
        return this;
    }

    toString() {
        return JSON.stringify(this, null, 4);
    }

}