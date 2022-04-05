import { GetVariableFunction } from "../phases/createScopeMaps";
import { Block, BlockProps } from "./Block";
import { Reference } from "./Reference";
import { Scope } from "./Scope";
import { Variable } from "./Variable";

export interface ObjectExpressionProps extends BlockProps {
    class: Reference;
}

export class ObjectExpression extends Block {

    class!: Reference;
    nodes!: Variable[];

    constructor(props: ObjectExpressionProps) { super(props); }
    patch(props: Partial<ObjectExpressionProps>) { return super.patch(props); }

    getValue(name: string) {
        for (let node of this.nodes) {
            if (node.id.name === name) {
                return node.value;
            }
        }
        return null;
    }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        return { "" : this.class.name, ...Object.fromEntries(this.nodes.map((node: Variable) => [node.id.name, node.value])) };
    }

    toString() {
        // this is virtually indistinguishable from a call...
        return `instance ${this.class}${Scope.toString(this.nodes, "(", ")")})`;
    }

}
