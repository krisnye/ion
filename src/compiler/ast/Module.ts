import { Container, ContainerProps } from "../ast/Container";
import { EvaluationContext } from "../EvaluationContext";

export interface ModuleProps extends ContainerProps {
    name: string;
    dependencies: string[];
}

export class Module extends Container {

    name!: string;
    dependencies!: string[];

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    toString() {
        if (this.dependencies.length > 0) {
            return `module ${this.name} ${ super.toString() }\n// externals: ${JSON.stringify(this.dependencies)}`;
        }
        else {
            return `module ${this.name} ${ super.toString() }`;
        }
    }

    toESNode(c: EvaluationContext): any {
        return {
            type: "Program",
            sourceType: "module",
            body: this.nodes.map(node => node.toESNode(c))
        }
    }

}
