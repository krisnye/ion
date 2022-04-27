import { TypeReference } from "./TypeReference";
import { Node, NodeProps } from "../Node";
import { isType, Type } from "./Type";

type TypePair = [key: Type, value: Type];

export interface ObjectTypeProps extends NodeProps {
    types: TypeReference[];
    properties: TypePair[];
}

export class ObjectType extends Node implements Type {

    types!: TypeReference[];
    properties!: TypePair[];

    constructor(props: ObjectTypeProps) { super(props); }
    patch(props: Partial<ObjectTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type) {
        return null;
    }

    isSubtypeOf(b: Type): boolean | null {
        return null;
    }

    toString() {
        return `${this.types.join("|")}(${this.properties.map(pair => pair.join("=")).join(",")})`;
    }

}