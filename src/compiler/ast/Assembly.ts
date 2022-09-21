import { Container, ContainerProps } from "./Container";

export interface AssemblyProps extends ContainerProps {
}

export class Assembly extends Container {

    constructor(props: AssemblyProps) { super(props); }
    patch(props: Partial<AssemblyProps>) { return super.patch(props); }

    toString() {
        return `assembly ${ super.toString() }`;
    }

    get isScope() {
        return true;
    }

}
