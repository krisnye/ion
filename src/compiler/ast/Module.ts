import { EvaluationContext } from "../EvaluationContext";
import { Container, ContainerProps } from "./Container";
import { VoidType } from "./VoidType";

export interface ModuleProps extends ContainerProps {
    name: string;
    dependencies: string[];
}

export class Module extends Container {

    name!: string;

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    resolveType(c: EvaluationContext) {
        return new VoidType({ location: this.location });
    }

    toString() {
        return `module ${this.name} ${ super.toString() }`;
    }

}
