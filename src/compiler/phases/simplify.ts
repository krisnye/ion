import { Phase } from "./Phase";
import { createConverterPhase } from "../converters/Converter";
import { Scope } from "../ast/Scope";
import { Reference } from "../ast/Reference";
import { NumberLiteral } from "../ast/NumberLiteral";
import { GetVariableFunction } from "./createScopeMaps";
import { isAbsolutePath } from "../pathFunctions";

/**
 * Gets the original variable traversing references if the variables containing the reference are constant.
 */
export function getSourceVariable(ref: Reference, getVariable: GetVariableFunction) {
    let variable = getVariable(ref);
    while (variable.constant && variable.value instanceof Reference) {
        variable = getVariable(variable.value);
    }
    return variable;
}

const converterPhase = createConverterPhase([
    [Reference, (ref: Reference, getVariable) => {
        if (ref.constant === null) {
            // get original variable
            let variable = getSourceVariable(ref, getVariable);
            let constant = variable.constant;
            if (constant != null) {
                if (constant) {
                    if (variable.value instanceof NumberLiteral) {
                        // just propagate numeric literals completely.
                        return variable.value;
                    }
                    else {
                        // constant value, use a reference to the original variable
                        if (ref.name !== variable.id.name && isAbsolutePath(variable.id.name)) {
                            return ref.patch({ name: variable.id.name });
                        }
                    }
                }
                return ref.patch({ constant });
            }
        }
        return ref;
    }]
] as any);

export function simplify(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    debugger;
    return converterPhase(moduleName, module, externals);
}
