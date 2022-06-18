import { Identifier } from "../ast/Identifier";
import { Container, ContainerProps } from "./Container";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { Node } from "../Node";
import { Callable } from "./Callable";
import { BasicType, Type } from "./Type";
import { TypeReference } from "./TypeReference";
import { EvaluationContext } from "../EvaluationContext";
import { FunctionType } from "./FunctionType";
import { ObjectType } from "./ObjectType";
import { Pair } from "./Pair";
import { BinaryExpression } from "./BinaryExpression";
import { Reference } from "./Reference";
import { TypeOperators } from "../analysis/TypeOperators";
import { Expression } from "./Expression";
import { coreTypes } from "../coreTypes";
import { NumberType } from "./NumberType";
import { SemanticError } from "../SemanticError";

export interface ClassProps extends ContainerProps {
    id: Identifier;
    extends: Node[];
    nodes: Variable[];
    meta: MetaCall[];
    structure?: boolean;
}

export class Class extends Container implements Type, Declaration, Callable {

    id!: Identifier;
    extends!: Node[];
    nodes!: Variable[];
    meta!: MetaCall[];
    structure!: boolean;
    isDeclaration: true = true;

    constructor(props: ClassProps) {
        super({ structure: false,  ...props });
    }
    patch(props: Partial<ClassProps>) { return super.patch(props); }

    call(args: Node[]): Node {
        throw new Error();
    }

    get parameters() {
        return this.nodes;
    }

    get value() {
        return this;
    }

    getBasicTypes(c: EvaluationContext) {
        switch (this.id.name) {
            case coreTypes.Array:
                return BasicType.Array;
            case coreTypes.String:
                return BasicType.String;
            case coreTypes.Number:
            case coreTypes.Integer:
                return BasicType.Number;
            default:
                return this.structure ? BasicType.Structure : BasicType.Object;
        }
    }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }

    toComparisonType(c: EvaluationContext) {
        let type = this.getReturnType();
        for (let extendType of this.extends as Type[]) {
            let extendClass = c.getValue(extendType);
            if (!(extendClass instanceof Class)) {
                throw new SemanticError(`Can only extend classes`, extendType);
            }
            type = type.merge(extendClass.getReturnType(), false, c)!;
        }
        return type;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        const { location } = this;
        return BinaryExpression.join(TypeOperators.and,
            new BinaryExpression({
                location,
                left: dot,
                operator: TypeOperators.is,
                right: new Reference(this.id)
            }),
            ...this.extends.map(ref => new BinaryExpression({
                location,
                left: dot,
                operator: TypeOperators.is,
                right: ref as Expression
            }))
        )
    }

    getReturnType(args: Type[] = this.nodes.map(node => node.declaredType!)) {
        return new ObjectType({
            location: this.location,
            properties: [
                new Pair({ location: this.id.location, key: this.id, value: NumberType.fromConstant(1, this.id.location) }),
                ...args.map(
                    (arg, index) => {
                        return new Pair({
                            location: arg.location,
                            key: this.nodes[index].id,
                            value: arg
                        });
                    }
                )
            ]
        });
    }

    areArgumentsValid(argTypes: Type[], c: EvaluationContext, errors = new Array<Error>()) : boolean {
        return (this.resolveType(c) as FunctionType).areArgumentsValid(argTypes, c, errors);
    }

    protected resolveType(c: EvaluationContext): Type | null {
        const { location } = this;
        // Function Type
        return new FunctionType({
            location,
            meta: [],
            parameters: this.nodes,
            returnType: new TypeReference({ ...this.id, resolved: true }),
            resolved: true,
        })
    }

    // evaluate(call: Call, c: EvaluationContext): Instance | Error[] {
    //     let properties = checkParameters(this, this.nodes, call.nodes, c);
    //     if (properties[0] instanceof Error) {
    //         return properties as Error[];
    //     }
    //     // not sure this needs to exist.
    //     return new Instance({
    //         location: call.location,
    //         class: call.callee as Reference,
    //         nodes: properties as Expression[],
    //     })
    // }

    toString() {
        return `${toMetaString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Container.toString([...this.meta, ...this.nodes]) }`;
    }

}