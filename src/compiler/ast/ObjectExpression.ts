import { EvaluationContext } from "../EvaluationContext";
import { Container, ContainerProps } from "./Container";
import { ObjectType } from "./ObjectType";
import { Pair } from "./Pair";
import { Variable } from "./Variable";

export interface ObjectExpressionProps extends ContainerProps {
}

export class ObjectExpression extends Container {

    constructor(props: ObjectExpressionProps) { super(props); }
    patch(props: Partial<ObjectExpressionProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext) {
        const { location } = this;
        return new ObjectType({ location,
            properties: [
                ...this.nodes.filter(node => node instanceof Variable).map((node, index) => new Pair({
                    location: node.location,
                    key: (node as Variable).id,
                    value: node.type!
                }))
            ]
        });
    }

    toString() {
        return Container.toString(this.nodes, "(", ")");
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "ObjectExpression",
            properties: this.nodes.map(node => {
                let key = (node as Variable).id.toESNode(c);
                let value = (node as Variable).value!.toESNode(c);
                let shorthand = JSON.stringify(key) === JSON.stringify(value);
                return { type: "Property", key, value, shorthand };
            })
        };
    }
    
}
