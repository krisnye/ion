import { Phase } from "./Phase";
import { Container } from "../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { FunctionDeclaration } from "../ast/FunctionDeclaration";
import { getSSAOriginalName } from "./ssaForm";
import { Variable } from "../ast/Variable";
import { SemanticError } from "../SemanticError";

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
            }
        }
    });
    // check that names match for all global function declarations.
    checkFunctionDeclarationParameterNames(multiFunctions, errors);
    return [result, errors];
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
