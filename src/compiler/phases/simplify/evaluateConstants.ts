import { Call, isConsequent, isMetaCall } from "../../ast/Call";
import { Function } from "../../ast/Function";
import { Converter } from "../../converters/Converter";
import { Class } from "../../ast/Class";
import { SemanticError } from "../../SemanticError";
import { getValue, GetVariableFunction } from "../createScopeMaps";
import { ArrayExpression } from "../../ast/ArrayExpression";
import { getMetaCalls, isMetaContainer } from "../../ast/MetaContainer";
import { Reference } from "../../ast/Reference";
import { Node } from "../../Node";
import { coreTypes } from "../../coreTypes";
import { Variable } from "../../ast/Variable";

function isMultiFunction(callee: Node, getVariable: GetVariableFunction) {
    if (!(callee instanceof Reference)) {
        return false;
    }
    let variable = getVariable(callee);
    let multiFunctionMetas = getMetaCalls(variable, coreTypes.MultiFunction);
    return multiFunctionMetas.length > 0;
}

function argumentsMatchParameters(args: Node[], params: Variable[]) {
    if (args.length !== params.length) {
        return false;
    }
    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        let param = params[i];
        if (!isConsequent(arg.type!, param.type!)) {
            return false;
        }
    }
    return true;
}

function getMultiFunctionToCall(callee: ArrayExpression, args: Node[], getVariable: GetVariableFunction) {
    for (let element of callee.nodes) {
        let elementValue = getValue(element, getVariable);
        if (!(elementValue instanceof Function)) {
            throw new SemanticError(`Expected Function`, elementValue);
        }
        // now check parameters
        if (argumentsMatchParameters(args, elementValue.parameters)) {
            return elementValue;
        }
    }
    return null;
}

export const evaluateConstants: Converter<Call> = [
    Call,
    (call: Call, getVariable) => {
        if (call.callee.constant && call.nodes.every(node => node.constant)) {
            // for now no meta evaluate
            let callee = getValue(call.callee, getVariable);
            if (callee instanceof Class) {
                return callee.evaluate(call, getVariable);
            }
            else if (callee instanceof Function) {
                console.log("EVALUATE Function!!: " + callee);
            }
            else if (callee instanceof ArrayExpression) {
                //  find correct function implementation
                //  check that has MultiFunction metadata
                if (!isMultiFunction(call.callee, getVariable)) {
                    return [new SemanticError(`Referenced operator is neither a Function nor a MultiFunction`, call.callee)];
                }
                let func = getMultiFunctionToCall(callee, call.nodes, getVariable);
                if (func == null) {
                    return [new SemanticError(`Found no function matching argument types`, call)];
                }
                return func.evaluate(call, getVariable);
            }
            else {
                console.log({ callee });
                throw new SemanticError(`Expected Class or Function`, call.callee);
            }
            // return call.nodes[0].patch({ value: 3 })
        }
        return call;
    }
]
