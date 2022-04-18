import { coreTypes } from "../coreTypes";
import { Expression, ExpressionProps } from "./Expression";

export interface LiteralProps extends ExpressionProps {
    value: any;
}

export abstract class Literal extends Expression {

    constructor(props: ExpressionProps) { super(props); }
    patch(props: Partial<ExpressionProps>) { return super.patch(props); }

    value!: any;

    toString() {
        throw new Error("not implemented");
    }

}