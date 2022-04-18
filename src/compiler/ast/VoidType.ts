import { Node, NodeProps } from "../Node";
import { isType, Type } from "./Type";

export interface VoidTypeProps extends NodeProps {
}

export class VoidType extends Node implements Type {

    constructor(props: VoidTypeProps) { super(props); }
    patch(props: Partial<VoidTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type, union: boolean) {
        return null;
    }

    isSubtypeOf(b: Type): boolean | null {
        return null;
    }

    toString() {
        return `Void`;
    }

}