import { EvaluationContext } from "../EvaluationContext";
import { Reference } from "./Reference";
import { Container, ContainerProps } from "./Container";
import { Variable } from "./Variable";

export interface InstanceProps extends ContainerProps {
    class: Reference;
}

export class Instance extends Container {

    class!: Reference;
    nodes!: Variable[];

    constructor(props: InstanceProps) { super(props); }
    patch(props: Partial<InstanceProps>) { return super.patch(props); }

    getValue(name: string) {
        for (let node of this.nodes) {
            if (node.id.name === name) {
                return node.value;
            }
        }
        return null;
    }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : this.class.name, ...Object.fromEntries(this.nodes.map((node: Variable) => [node.id.name, node.value])) };
    }

    toString() {
        // this is virtually indistinguishable from a call...
        return `${this.class}${Container.toString(this.nodes, "{{", "}}")}`;
    }

}
