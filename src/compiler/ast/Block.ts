import { Container, ContainerProps } from "./Container";

export interface BlockProps extends ContainerProps {

}

export class Block extends Container {

    constructor(props: ContainerProps) { super(props); }
    patch(props: Partial<ContainerProps>) { return super.patch(props); }
    
}
