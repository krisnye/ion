import { Phase } from "./Phase";
import { Container } from "../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { FunctionDeclaration } from "../ast/FunctionDeclaration";
import { getSSAOriginalName } from "./ssaForm";
import { Variable } from "../ast/Variable";
import { SemanticError } from "../SemanticError";
import { Call } from "../ast/Call";
import { EvaluationContext } from "../EvaluationContext";
import { Callable, isCallable } from "../ast/Callable";
import { Expression } from "../ast/Expression";
import { isOperator } from "../parser/operators";
import { getMetaCall, MetaContainer } from "../ast/MetaContainer";
import { coreTypes } from "../coreTypes";

export function checkCalls(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors: Error[] = [];
    let multiFunctions = new Map<string,Array<FunctionDeclaration>>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            enter(node) {
                if (node instanceof FunctionDeclaration) {
                    let set = multiFunctions.get(node.id.name);
                    if (set == null) {
                        multiFunctions.set(node.id.name, set = []);
                    }
                    set.push(node);
                }
            },
            leave(node) {
                // let's also reorder function parameters and provide default values at call site.
                if (node instanceof Call) {
                    node = reorderCallArguments(c, node);
                }
                return node;
            }
        }
    });
    // check that names match for all global function declarations.
    checkFunctionDeclarationParameterNames(multiFunctions, errors);
    return [result, errors];
}

function reorderCallArguments(c: EvaluationContext, call: Call): Call {
    let originalArgs = call.nodes;
    let values = c.getValues(call.callee).filter(isCallable);
    //  get the function with the most parameters.
    let func: Callable | undefined = values.sort((a, b) => b.getParameters(c).length - a.getParameters(c).length)[0];
    if (func == null) {
        //  UFCS functions may not be identified as callable yet.
        //  This also means we cannot reorder UFCS call arguments.
        return call;
    }
    let native = getMetaCall(func as any, coreTypes.Native);
    if (native) {
        return call;
    }

    let parameters = func.getParameters(c);
    //  get the parameter names mapped to indices.
    let namesToParametersAndIndexes = new Map(func.getParameters(c).map((parameter, index) => [getSSAOriginalName(parameter.id.name), { parameter, index }]));
    //  if this may call one of multiple functions... then how could we provide default values?
    let reorderedArgs: (Expression | null)[] = new Array(originalArgs.length).fill(null);
    function setArg(index: number, arg: Expression) {
        if (reorderedArgs[index]) {
            let name = getSSAOriginalName(parameters[index].id.name);
            throw new SemanticError(`More than one argument supplied for ${name}`, reorderedArgs[index]!, arg);
        }
        reorderedArgs[index] = arg;
    }

    let checkLength = values.length > 1 ? originalArgs.length : parameters.length;
    for (let index = 0; index < checkLength; index++) {
        let arg = originalArgs[index];
        let name = arg instanceof Variable ? arg.id.name : null;
        if (name == null) {
            if (index < originalArgs.length) {
                setArg(index, arg);
            }
        }
        else {
            let values = namesToParametersAndIndexes.get(name);
            if (values) {
                setArg(values.index, arg);
            }
            else {
                // this shouldn't be thrown for native functions/operations.
                throw new SemanticError(`Invalid argument name ${name}`, arg);
            }
        }
    }

    //  now fill in any missing arguments with default values.
    reorderedArgs.forEach((arg, index) => {
        if (arg == null) {
            let parameter = parameters[index];
            let parameterName = getSSAOriginalName(parameter.id.name);
            if (values.length > 1) {
                // multi-functions can NOT have default values
                throw new SemanticError(`Missing parameter '${parameterName}'`, call);
            }
            let defaultValue = parameter.value;
            if (defaultValue != null) {
                reorderedArgs[index] = defaultValue;
            }
            else {
                throw new SemanticError(`Missing required property ${parameterName}`, call);
            }
        }
    })

    //  see if changed
    let changed = reorderedArgs.some((arg, index) => arg !== originalArgs[index]);
    if (changed) {
        call = call.patch({ nodes: reorderedArgs as Expression[] });
    }

    //  can functions with optional parameters provide different default values?
    //  [ ] Multifunction Declarations can not have default parameters
    // maybe patch here if changed.
    //  TODO: Why doesn't the next typeInference run?
    return call;
}

function checkFunctionDeclarationParameterNames(
    multiFunctions: Map<string,Array<FunctionDeclaration>>,
    errors: Error[],
) {
    for (let [name, functions] of multiFunctions.entries()) {
        if (functions.length === 1) {
            continue;
        }
        let firstParameters: Variable[] = [];
        for (let func of functions) {
            let { parameters } = func;
            let foundError = false;
            for (let i = 0; i < parameters.length; i++) {
                let newParameter = parameters[i];
                let firstParameter: Variable | undefined = firstParameters[i];
                if (firstParameter == null) {
                    firstParameters.push(newParameter);
                }
                else {
                    // check that names are the same.
                    let firstParameterName = getSSAOriginalName(firstParameter.id.name);
                    let newParameterName = getSSAOriginalName(newParameter.id.name);
                    if (firstParameterName !== newParameterName) {
                        errors.push(new SemanticError(`Multifunction parameter names at the same position must match`, firstParameter.id, newParameter.id))
                        foundError = true;
                    }
                }
            }
            if (foundError) {
                break;
            }
        }
    }
}
