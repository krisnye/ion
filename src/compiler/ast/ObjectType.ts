import { Node, NodeProps } from "../Node";
import { isType, Type } from "./Type";
import { Identifier } from "./Identifier";
import { Pair } from "./Pair";
import { BinaryExpression } from "./BinaryExpression";
import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";

export type SimpleObjectType = ObjectType & { types: [] };

export interface ObjectTypeProps extends NodeProps {
    properties: Pair<Type|Identifier,Type>[];
}

export class ObjectType extends Node implements Type {

    properties!: Pair<Type|Identifier,Type>[];

    constructor(props: ObjectTypeProps) { super(props); }
    patch(props: Partial<ObjectTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type) {
        return null;
    }

    isSubtypeOf(b: Type): boolean | null {
        return null;
    }

    toString() {
        return `(${this.properties.map(({ key, value }) => `${key} : ${value}`).join(", ")})`;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        throw new Error("Not implemented");
    }

    // toSimpleObjectType(c: EvaluationContext) {
    //     for (let type of this.types) {
    //         type = c.lookup.getCurrent(type);
    //         let variable = c.getVariable(type);
    //         if (isCallable(variable.value)) {
    //             if (variable.value.getInstanceType != null) {
    //                 let instance = variable.value.getInstanceType(c);
    //                 console.log("FOUND Instance", instance);
    //             }
    //             else {
    //                 throw new SemanticError(`Expected class or type`, type);
    //             }
    //         }
    //         console.log("EXPANDED", { variable });
    //     }
    // }

}