import { Identifier } from "../ast/Identifier";
import { Container, ContainerProps } from "./Container";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { Call, MetaCall } from "./Call";
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
import { ESNode } from "./ESNode";
import { Module } from "./Module";
import { split } from "../pathFunctions";
import { IntersectionType } from "./IntersectionType";

export interface ClassProps extends ContainerProps {
    id: Identifier;
    extends: Node[];
    nodes: Variable[];
    meta: MetaCall[];
    structure?: boolean;
    staticMembers?: Reference[];
}

export class Class extends Container implements Type, Declaration, Callable {

    id!: Identifier;
    extends!: Node[];
    nodes!: Variable[];
    meta!: MetaCall[];
    structure!: boolean;
    isDeclaration: true = true;
    staticMembers!: Reference[];

    constructor(props: ClassProps) {
        super({ structure: false, staticMembers: [],  ...props });
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
        let type = this.getReturnType(this, undefined, c);
        for (let extendType of this.extends as Type[]) {
            let extendClass = c.getValue(extendType);
            if (!(extendClass instanceof Class)) {
                throw new SemanticError(`Can only extend classes`, extendType);
            }
            type = type.merge(extendClass.getReturnType(this, undefined, c), false, c)!;
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

    *getAllBaseClassesAndThis(c: EvaluationContext): IterableIterator<Class> {
        for (let base of this.extends) {
            if (!(base instanceof Reference)) {
                throw new SemanticError(`Expected reference`, base);
            }
            let baseClass = c.getValue(base as Reference);
            if (!(baseClass instanceof Class)) {
                throw new SemanticError(`Expected reference to a class`, base);
            }
            yield* baseClass.getAllBaseClassesAndThis(c);
        }
        yield this;
    }

    getReturnType(source: Node, args: Type[] | undefined, c: EvaluationContext) {
        let parameters = this.getParameters(c);
        if (!args) {
            args = parameters.map(p => p.type ?? p.declaredType!);
        }
        //  technically this sort of parameter checking ought to be present generally for all function calls.
        if (args.length != parameters.length) {
            if (args.length < parameters.length) {
                let missing = parameters.slice(args.length).map(p => p.id.name);
                throw new SemanticError(`Missing parameter${missing.length > 1 ? `s` : ``}: ${missing.join(", ")}`, source);
            }
            throw new SemanticError(`Expected ${parameters.length} arguments, actual: ${args.length}`, source);
        }
        let bases = [...this.getAllBaseClassesAndThis(c)];
        return new ObjectType({
            location: this.location,
            properties: [
                ...bases.map(cls => 
                    new Pair({ location: cls.id.location, key: cls.id, value: NumberType.fromConstant(1, cls.id.location) }),
                ),
                ...args.map(
                    (arg, index) => {
                        return new Pair({
                            location: arg.location,
                            key: parameters[index].id,
                            value: arg
                        });
                    }
                )
            ]
        });
    }

    areArgumentsValid(args: Expression[], argTypes: Type[], c: EvaluationContext, errors = new Array<Error>()) : boolean {
        return this.getFunctionType(c).areArgumentsValid(args, argTypes, c, errors);
    }

    _cachedPreResolveFunctionType?: FunctionType

    getParameters(c: EvaluationContext): Variable[] {
        return this.getFunctionType(c).parameters;
    }

    private getFunctionType(c: EvaluationContext): FunctionType {
        const { location, type } = this;
        if (type) {
            return type as FunctionType;
        }
        if (this._cachedPreResolveFunctionType) {
            return this._cachedPreResolveFunctionType;
        }
        // Function Type
        let bases = [...this.getAllBaseClassesAndThis(c)];
        let allVariables = [...bases.map(base => base.nodes)].flat();
        return this._cachedPreResolveFunctionType = new FunctionType({
            location,
            meta: [],
            parameters: allVariables,
            returnType: new TypeReference({ ...this.id, resolved: true }),
            resolved: true,
        });
    }

    *getDependencies(c: EvaluationContext) {
        yield* super.getDependencies(c);
        yield* this.extends as Expression[];
        // yield* this.staticMembers;
    }

    protected resolveType(c: EvaluationContext): Type | null {
        let type: Type = this.getFunctionType(c);
        // let objectType = new ObjectType({
        //     location: this.location,
        //     properties: this.staticMembers.map(member => {
        //         let shortName = split(member.name).pop()!;
        //         return new Pair({
        //             location: member.location,
        //             key: new Identifier({ location: member.location, name: shortName }),
        //             value: member.type!,
        //         });
        //     })
        // });
        // if (objectType.properties.length > 0) {
        //     type = IntersectionType.join(type, objectType)!;
        // }
        return type;
    }

    toString() {
        return `${toMetaString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Container.toString([...this.meta, ...this.nodes]) }`;
    }

    toESNode(c: EvaluationContext) {
        let vars = this.nodes;
        return new ESNode({
            type: "ClassDeclaration",
            id: this.id.toESNode(c),
            body: {
                type: "ClassBody",
                body: [
                    {
                        type: "MethodDefinition",
                        kind: "constructor",
                        key: { type: "Identifier", name: "constructor" },
                        value: {
                            type: "FunctionExpression",
                            params: vars.map(v => v.toESParameter(c)),
                            body: {
                                type: "BlockStatement",
                                body: vars.map(variable => ({
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AssignmentExpression",
                                        operator: "=",
                                        left: {
                                            type: "MemberExpression",
                                            object: { type: "ThisExpression" },
                                            property: variable.id.toESNode(c),
                                        },
                                        right: variable.id.toESNode(c)
                                    }
                                }))
                            }
                        }
                    }
                ]
            }
        });
    }

}