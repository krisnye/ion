import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Block, BlockProps } from "./Block";
import { Container } from "./Container";
import { IntersectionType } from "./IntersectionType";
import { NumberType } from "./NumberType";
import { ObjectType } from "./ObjectType";
import { Pair } from "./Pair";
import { TypeReference } from "./TypeReference";

export interface ArrayExpressionProps extends BlockProps {
}

export class ArrayExpression extends Block {

    constructor(props: ArrayExpressionProps) { super(props); }
    patch(props: Partial<ArrayExpressionProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext) {
        const { location } = this;
        return new IntersectionType({
            location,
            left: new TypeReference({ location, name: coreTypes.Array }),
            right: new ObjectType({ location,
                properties: this.nodes.map((node, index) => new Pair({
                    location: node.location,
                    key: NumberType.fromConstant(index, node.location, true),
                    value: node.type!
                }))
            })
        });
    }

    toString() {
        return Container.toString(this.nodes, "[", "]");
    }
    
}
