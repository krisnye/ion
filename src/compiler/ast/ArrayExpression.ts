import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Block, BlockProps } from "./Block";
import { ObjectType } from "./ObjectType";
import { Container } from "./Container";
import { StringType } from "./StringType";
import { TypeReference } from "./TypeReference";

export interface ArrayExpressionProps extends BlockProps {
}

export class ArrayExpression extends Block {

    constructor(props: ArrayExpressionProps) { super(props); }
    patch(props: Partial<ArrayExpressionProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext) {
        const { location } = this;
        return new TypeReference({ location, name: coreTypes.Array })
        // return new ObjectType({
        //     location: this.location,
        //     types: [],
        //     properties: []
        // });
    }

    toString() {
        return Container.toString(this.nodes, "[", "]");
    }
    
}
