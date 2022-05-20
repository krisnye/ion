import getFinalExpressions from "../analysis/getFinalExpressions";
import { isSubtype } from "../analysis/isSubtype";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { nativeTypeFunctions } from "../phases/nativeTypeFunctions";
import { SemanticError } from "../SemanticError";
import { AnyType } from "./AnyType";
import { Call } from "./Call";
import { Callable } from "./Callable";
import { Expression } from "./Expression";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { FunctionType } from "./FunctionType";
import { Identifier } from "./Identifier";
import { getMetaCall, toMetaString } from "./MetaContainer";
import { isType, Type } from "./Type";
import { UnionType } from "./UnionType";

export interface FunctionProps extends FunctionBaseProps {
    id?: Identifier
    body: Node;
}

export class Function extends FunctionBase implements Callable {

    id?: Identifier
    body!: Expression;

    constructor(props: FunctionProps) { super(props); }
    patch(props: Partial<FunctionProps>) { return super.patch(props); }

    call(args: Node[]): Node {
        throw new Error();
    }

    getReturnType(argTypes: Type[], c: EvaluationContext): Type {
        let native = getMetaCall(this, coreTypes.Native);
        if (native) {
            const types = this.parameters.map(node => node.type);
            const nativeName = `${this.id!.name}(${types.join(`,`)})`;
            const nativeTypeFunction = nativeTypeFunctions[nativeName];
            if (nativeTypeFunction) {
                return nativeTypeFunction(this, argTypes, c);
            }
        }
        if (isType(this.returnType)) {
            return this.returnType;
        }
        // calculate the return type of the function.

        throw new Error("Function.getReturnType not implemented");
    }

    *getDependencies(c: EvaluationContext) {
        for (const param of this.parameters) {
            if (!param.type && param.value) {
                yield param.value;
            }
        }
        yield* getFinalExpressions(this.body);
    }

    protected resolve(c: EvaluationContext): Expression {
        const finalTypes = [...getFinalExpressions(this.body)].map(node => node.type!);
        const inferredType = UnionType.join(...finalTypes)!;
        if (this.returnType != null) {
            const result = isSubtype(inferredType, this.returnType, c);
            if (result !== true) {
                c.errors.push(new SemanticError(`Actual return type ${inferredType} ${result == false ? `does` : `may`} not match declared type`, this.returnType));
            }
        }
        const returnType = this.returnType ?? inferredType;
        const type = new FunctionType({
            ...this,
            returnType,
            resolved: true,
        });
        return this.patch({ returnType, type });
    }

    evaluate(call: Call, c: EvaluationContext): Node | Error[] {
        throw new Error("Function.evaluate not implemented");
        // let properties = checkParameters(this, this.parameters, call.nodes, getVariable);
        // if (properties[0] instanceof Error) {
        //     return properties as Error[];
        // }

        // // is a native javascript function
        // let native = getMetaCall(this, coreTypes.Native);
        // if (!native) {
        //     return [new SemanticError(`Interpreting not implemented yet`, call)];
        // }

        // let args = call.nodes.map(arg => arg.toInterpreterInstance(getVariable));
        // let source = native.getValue("javascript");
        // if (!(source instanceof StringLiteral)) {
        //     return [new SemanticError(`Native function missing javascript source`, call)];
        // }
        // let javascriptFunction = eval(source.value);
        // let interpreterResult = javascriptFunction(...args);

        // return instanceToNode(interpreterResult, call.location);
    }

    toString() {
        return `${toMetaString(this)}${this.id ?? ``}${super.toString()} => ${this.body}`;
    }

}