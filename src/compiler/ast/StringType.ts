import { Node, NodeProps } from "../Node";
import { Type } from "./Type";

export interface StringTypeProps extends NodeProps {
    value: string | null
}

export class StringType extends Node implements Type {

    value!: string | null;

    constructor(props: StringTypeProps) {
        super(props);
    }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }

    isSubtypeOf(b: Type): boolean | null {
        return b instanceof StringType ? true : false;
    }

    toString() {
        return `(${this.value ? JSON.stringify(this.value) : "String"})`;
    }

}