import { EvaluationContext } from "../EvaluationContext";
import { Node, NodeProps } from "../Node";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { isType, Type } from "./Type";

export interface AnyTypeProps extends NodeProps {
}

export class AnyType extends Node implements Type {

    constructor(props: AnyTypeProps) { super(props); }
    patch(props: Partial<AnyTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type, union: boolean) {
        return union ? this : b;
    }

    isSubtypeOf(b: Type): boolean | null {
        return null;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        throw new Error("Not implemented");
    }

    toString() {
        return `Any`;
    }

}