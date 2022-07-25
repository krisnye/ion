import { Call } from "../../../ast/Call";
import { FunctionDeclaration } from "../../../ast/FunctionDeclaration";
import { getMetaCall, getMetaFieldArgument, getMetaFieldValue } from "../../../ast/MetaContainer";
import { Reference } from "../../../ast/Reference";
import { StringLiteral } from "../../../ast/StringLiteral";
import { coreTypes } from "../../../coreTypes";
import { SemanticError } from "../../../SemanticError";
import { memoize } from "../../../utility";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

const evalJavascript = memoize(eval);
const javascriptField = "javascript";

//  export a function that maybeReplacesCalls.

export function addNativeCalls(moduleName, module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors, path) {
                if (node instanceof Call && node.callee instanceof Reference) {
                    if (node.callee.name === "+") {
                        let callee = c.getValue(node.callee);
                        //  TODO: Check all possible function calls
                        //  only replace IF all possible have the same runtime implementation.
                        if (callee instanceof FunctionDeclaration) {
                            let native = getMetaCall(callee, coreTypes.Native);
                            if (native) {
                                let jsExpression = getMetaFieldValue(native, javascriptField, c);
                                if (jsExpression instanceof StringLiteral) {
                                    let jsFunction: Function;
                                    try {
                                        jsFunction = evalJavascript(jsExpression.value);
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
                                    let newNode = jsFunction(...node.nodes);
                                    return newNode;
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return [module, errors];
}
