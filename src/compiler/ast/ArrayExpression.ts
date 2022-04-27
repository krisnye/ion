import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Block, BlockProps } from "./Block";
import { ObjectType } from "./ObjectType";
import { Scope } from "./Scope";
import { StringType } from "./StringType";
import { TypeReference } from "./TypeReference";

export interface ArrayExpressionProps extends BlockProps {
}

export class ArrayExpression extends Block {

    constructor(props: ArrayExpressionProps) { super(props); }
    patch(props: Partial<ArrayExpressionProps>) { return super.patch(props); }

    resolveType(c: EvaluationContext) {
        const { location } = this;
        return new ObjectType({
            location: this.location,
            types: [new TypeReference({ location, name: coreTypes.Array })],
            properties: []
        });
    }

    toString() {
        return Scope.toString(this.nodes, "[", "]");
    }
    
}
