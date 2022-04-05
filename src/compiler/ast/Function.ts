import { coreTypes } from "../coreTypes";
import { instanceToNode } from "../interpreter/instanceToNode";
import { Node } from "../Node";
import { GetVariableFunction } from "../phases/createScopeMaps";
import { SemanticError } from "../SemanticError";
import { Call, checkParameters } from "./Call";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { IntegerLiteral } from "./IntegerLiteral";
import { getMetaCall } from "./MetaContainer";
import { StringLiteral } from "./StringLiteral";

export interface FunctionProps extends FunctionBaseProps {
    body: Node;
}

export class Function extends FunctionBase {

    body!: Node;

    constructor(props: FunctionProps) { super(props); }
    patch(props: Partial<FunctionProps>) { return super.patch(props); }

    evaluate(call: Call, getVariable: GetVariableFunction): Node | Error[] {
        let properties = checkParameters(this, this.parameters, call.nodes);
        if (properties[0] instanceof Error) {
            return properties as Error[];
        }

        // is a native javascript function
        let native = getMetaCall(this, coreTypes.Native);
        if (!native) {
            return [new SemanticError(`Interpreting not implemented yet`, call)];
        }

        let args = call.nodes.map(arg => arg.toInterpreterInstance(getVariable));
        let source = native.getValue("javascript");
        if (!(source instanceof StringLiteral)) {
            return [new SemanticError(`Native function missing javascript source`, call)];
        }
        let javascriptFunction = eval(source.value);
        let interpreterResult = javascriptFunction(...args);

        return instanceToNode(interpreterResult, call.location);
    }

    toString() {
        return `${super.toString()} => ${this.body}`;
    }

}