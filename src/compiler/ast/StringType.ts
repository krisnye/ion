import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Node, NodeProps } from "../Node";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { Reference } from "./Reference";
import { StringLiteral } from "./StringLiteral";
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

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        const { location } = this;
        return BinaryExpression.join("&&",
            new BinaryExpression({
                location, left: dot, operator: "&&", right: new Reference({ location, name: coreTypes.String })
            }),
            this.value == null
                ? null
                : new BinaryExpression({
                    location,
                    left: dot,
                    operator: "==",
                    right: new StringLiteral({ location, value: this.value })
                })
        )
    }


    toString() {
        return `(${this.value ? JSON.stringify(this.value) : "String"})`;
    }

}