import { Call } from "../../../ast/Call";
import { ESNode } from "../../../ast/ESNode";
import { Expression } from "../../../ast/Expression";
import { Function } from "../../../ast/Function";
import { FunctionDeclaration } from "../../../ast/FunctionDeclaration";
import { getMetaCall, getMetaFieldArgument, getMetaFieldValue } from "../../../ast/MetaContainer";
import { getPossibleFunctionCalls } from "../../../ast/MultiFunction";
import { Reference } from "../../../ast/Reference";
import { StringLiteral } from "../../../ast/StringLiteral";
import { Variable } from "../../../ast/Variable";
import { coreTypes } from "../../../coreTypes";
import { EvaluationContext } from "../../../EvaluationContext";
import { SemanticError } from "../../../SemanticError";
import { memoize } from "../../../utility";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";


export const evalJavascript = memoize(eval);
const javascriptField = "javascript";

//  export a function that maybeReplacesCalls.

function getPossibleFunctionsFromMultifunction(c: EvaluationContext, call: Call): Function[] {
    let functions = c.getValues(call.callee);
    if (functions.length !== 1 || !(functions[0] instanceof Function)) {
        throw new SemanticError("SHOULD NOT HAPPEN", call);
    }
    let func = functions[0];
    if ((func.multiFunctions?.length ?? 0) > 0 && call.multiFunctionIndices != null) {
        // this has individual multi functions, let's grab these back out.
        let allFunctions = func.multiFunctions!.map(ref => c.getValue(ref));
        let indices = new Set(call.multiFunctionIndices);
        let possible = allFunctions.filter((func, index) => indices.has(index)) as Function[];
        // let possible = getPossibleFunctionCalls(allFunctions, call.nodes, call.getArgTypes(), c);
        // console.log({ possible: possible.length, possible2: possible2.length });
        return possible;
    }
    return [func];
}

//  At Each Call Site, we MUST know what the possible function calls can be.
//  This should be determined in advance.
//  Maybe
//      for multifunctions, store references, not strings
//      when checking possible function calls, store the indices of each possible call
//      on each Call site.

export function addNativeCalls(moduleName, module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors, path) {
                if (node instanceof Call && node.callee instanceof Reference) {
                    if (node.callee.name === "+") {
                        let possible = getPossibleFunctionsFromMultifunction(c, node);
                        let nativeJSCalls = possible.map(func => {
                            let native = getMetaCall(func, coreTypes.Native);
                            if (native) {
                                let jsExpression = getMetaFieldValue(native, javascriptField, c);
                                if (jsExpression instanceof StringLiteral) {
                                    return jsExpression.value;
                                }
                            }
                            return null;
                        });
                        if (new Set(nativeJSCalls).size === 1) {
                            let jsExpression = nativeJSCalls[0];
                            if (jsExpression != null) {
                                let jsFunction: any;
                                try {
                                    jsFunction = evalJavascript(jsExpression);
                                }
                                catch (e) {
                                    throw new SemanticError(`Error calling javascript eval: `, jsExpression);
                                }
                                if (typeof jsFunction !== "function") {
                                    throw new SemanticError(`Expected Javascript function`);
                                }
                                if (jsFunction.length !== node.nodes.length) {
                                    throw new SemanticError(`Native.javascript function has different arguments length, expected ${node.nodes.length}`, node, jsExpression);
                                }
                                let newNode = jsFunction(...node.nodes.map(node => node.toESNode(c)));
                                return new ESNode(newNode);
                            }
                        }
                    }
                }
            }
        }
    })
    return [module, errors];
}
