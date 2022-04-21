import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { nativeTypeFunctions } from "../phases/nativeTypeFunctions";
import { Call } from "./Call";
import { Callable } from "./Callable";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { Identifier } from "./Identifier";
import { getMetaCall, toMetaString } from "./MetaContainer";
import { isType, Type } from "./Type";

export interface FunctionProps extends FunctionBaseProps {
    id?: Identifier
    body: Node;
}

export class Function extends FunctionBase implements Callable {

    id?: Identifier
    body!: Node;

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
            // console.log("Check Native Name: " + nativeName);
            const nativeTypeFunction = nativeTypeFunctions[nativeName];
            if (nativeTypeFunction) {
                return nativeTypeFunction(this, argTypes, c);
            }
        }
        if (isType(this.returnType)) {
            return this.returnType;
        }
        throw new Error("Function.getReturnType not implemented");
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