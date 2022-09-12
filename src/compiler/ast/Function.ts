import getFinalExpressions from "../analysis/getFinalExpressions";
import { isSubtype } from "../analysis/isSubtype";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { nativeTypeFunctions, TypeFunction } from "../phases/frontend/nativeTypeFunctions";
import { SemanticError } from "../SemanticError";
import { Node } from "../Node";
import { Call } from "./Call";
import { Callable } from "./Callable";
import { CompoundType } from "./CompoundType";
import { Expression } from "./Expression";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { FunctionType } from "./FunctionType";
import { Identifier } from "./Identifier";
import { IntersectionType } from "./IntersectionType";
import { getMetaCall, toMetaString } from "./MetaContainer";
import { isType, Type } from "./Type";
import { UnionType } from "./UnionType";
import { Variable } from "./Variable";
import { Block } from "./Block";
import { Reference } from "./Reference";

export interface FunctionProps extends FunctionBaseProps {
    id?: Identifier;
    body: Node;
    multiFunctions?: Reference[];
}

function toParameters(nodes: Variable[]) {
    return nodes.map(node => {
        if (node.kind !== "parameter") {
            node = node.patch({ kind: "parameter" });
        }
        return node;
    })
}

export class Function extends FunctionBase implements Callable {

    id?: Identifier
    body!: Expression;
    multiFunctions?: Reference[];

    constructor(props: FunctionProps) { super({ ...props, parameters: toParameters(props.parameters!)}); }
    patch(props: Partial<FunctionProps>) { return super.patch(props); }

    call(args: Node[]): Node {
        throw new Error();
    }

    //  Scope.nodes
    get nodes() {
        return [...this.parameters, this.body];
    }

    getNativeReturnType(argTypes: Type[], nativeTypeFunction: TypeFunction, c: EvaluationContext) {
        let compoundIndex = argTypes.findIndex(type => type instanceof CompoundType);
        if (compoundIndex >= 0) {
            let cArg = argTypes[compoundIndex];
            let cType: typeof UnionType | typeof IntersectionType = cArg instanceof UnionType ? UnionType : IntersectionType;
            let splitArgs = [...cType.split(cArg)];
            let splitTypes = splitArgs.map(splitArgType => {
                return this.getNativeReturnType(Object.assign(argTypes.slice(0), { [compoundIndex]: splitArgType }), nativeTypeFunction, c);
            });
            return cType.join(...splitTypes) as Type;
        }
        else {
            return nativeTypeFunction(this, argTypes, c);
        }
    }

    getParameters(c: EvaluationContext): Variable[] {
        return this.parameters;
    }

    getReturnType(source: Call, argTypes: Type[], c: EvaluationContext): Type | null {
        let native = getMetaCall(this, coreTypes.Native);
        if (native) {
            const types = this.parameters.map(node => node.type);
            const shortNativeName = `${this.id!.name}`;
            const longNativeName = `${this.id!.name}(${types.join(`,`)})`;
            const nativeTypeFunction = nativeTypeFunctions[longNativeName] ?? nativeTypeFunctions[shortNativeName];
            if (nativeTypeFunction) {
                return this.getNativeReturnType(argTypes, nativeTypeFunction, c);
            }
        }
        if (isType(this.returnType)) {
            return this.returnType;
        }
        return null;
    }

    *getDependencies(c: EvaluationContext) {
        yield* this.parameters;
        yield* getFinalExpressions(this.body);
    }

    protected resolve(c: EvaluationContext): Expression {
        let finalExpressions = [...getFinalExpressions(this.body)];
        const finalTypes = finalExpressions.map(node => node.type!);
        const inferredType = UnionType.join(...finalTypes)?.simplify(c) as Type;
        if (this.returnType != null) {
            const result = isSubtype(inferredType, this.returnType, c);
            if (result !== true) {
                c.errors.push(new SemanticError(`Actual return type ${inferredType} ${result == false ? `does` : `may`} not match declared type ${this.returnType}`, this.returnType));
            }
        }
        let returnType = this.returnType ?? inferredType;
        const type = new FunctionType({
            location: this.location,
            parameters: this.parameters,
            returnType,
            meta: [],
            resolved: true,
        });
        return this.patch({ returnType, type, resolved: true });
    }

    toString() {
        return `${toMetaString(this)}${this.id ?? ``}${super.toString()} => ${this.body}`;
    }

    toESNode(c: EvaluationContext) {
        let body = this.body.toESNode(c);
        if (!(this.body instanceof Block)) {
            body = { type: "BlockStatement", body: [body] };
        }
        return {
            type: "FunctionExpression",
            id: this.id?.toESNode(c),
            params: this.parameters.map(p => p.toESParameter(c)),
            body,
        }
    }

}