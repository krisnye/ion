import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { AnyType } from "./AnyType";
import { Container, ContainerProps } from "./Container";
import { IntersectionType } from "./IntersectionType";
import { NumberType } from "./NumberType";
import { ObjectType } from "./ObjectType";
import { Pair } from "./Pair";
import { TypeReference } from "./TypeReference";
import { UnionType } from "./UnionType";

export interface ArrayExpressionProps extends ContainerProps {
}

export class ArrayExpression extends Container {

    constructor(props: ArrayExpressionProps) { super(props); }
    patch(props: Partial<ArrayExpressionProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext) {
        const { location } = this;
        return new IntersectionType({
            location,
            left: new TypeReference({ location, name: coreTypes.Array }),
            right: new ObjectType({ location,
                properties: [
                    ...this.nodes.map((node, index) => new Pair({
                        location: node.location,
                        key: NumberType.fromConstant(index, node.location, true),
                        value: node.type!
                    })),
                    new Pair({
                        location,
                        key: new NumberType({ location, step: 1 }),
                        value: UnionType.join(...this.nodes.map(node => node.type!)) ?? new AnyType({ location })
                    })
                ]
            })
        });
    }

    toString() {
        return Container.toString(this.nodes, "[", "]");
    }
    
}
