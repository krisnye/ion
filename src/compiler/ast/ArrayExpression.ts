import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { AnyType } from "./AnyType";
import { Container, ContainerProps } from "./Container";
import { Identifier } from "./Identifier";
import { IntersectionType } from "./IntersectionType";
import { NumberLiteral } from "./NumberLiteral";
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
        const length = new NumberLiteral({ location, value: this.nodes.length, integer: true });
        return new IntersectionType({
            location,
            left: new TypeReference({ location, name: coreTypes.Array }),
            right: new ObjectType({ location,
                properties: [
                    ...this.nodes.map((node, index) => {
                        if (node.type instanceof Identifier) {
                            console.log("WHAT THE FUCK?", this)
                        }
                        return new Pair({
                            location: node.location,
                            key: NumberType.fromConstant(index, node.location, true),
                            value: node.type!
                        })
                    }),
                    new Pair({
                        location,
                        key: new NumberType({ location, step: 1 }),
                        value: UnionType.join(...this.nodes.map(node => node.type!)) ?? new AnyType({ location })
                    }),
                    new Pair({
                        location,
                        key: new Identifier({ location, name: "length" }),
                        value: new NumberType({ location, min: length, max: length })
                    })
                ]
            })
        });
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        return new InterpreterInstance(this.nodes.map(node => node.toInterpreterValue(c)!));
    }

    toString() {
        return Container.toString(this.nodes, "[", "]");
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "ArrayExpression",
            elements: this.nodes.map(node => node.toESNode(c))
        };
    }
    
}
