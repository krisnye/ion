import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { Node, NodeProps } from "../Node";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { BasicType, isType, Type } from "./Type";

export interface VoidTypeProps extends BaseTypeProps {
}

export class VoidType extends BaseType {

    constructor(props: VoidTypeProps) { super(props); }
    patch(props: Partial<VoidTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type, union: boolean) {
        return null;
    }

    getBasicTypes() {
        return BasicType.None;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        return new BinaryExpression({
            location: this.location,
            left: dot,
            operator: TypeOperators.notEquals,
            right: dot
        });
    }

    toString() {
        return `Void`;
    }

}