import { Phase } from "./Phase";
import { Converter, createConverterPhase } from "../converters/Converter";
import { Scope } from "../ast/Scope";
import { Reference } from "../ast/Reference";
import { NumberLiteral } from "../ast/NumberLiteral";
import { GetVariableFunction } from "./createScopeMaps";
import { isAbsolutePath } from "../pathFunctions";
import { Node } from "../Node";

/**
 * Gets the original variable traversing references if the variables containing the reference are constant.
 */
export function getSourceVariable(ref: Reference, getVariable: GetVariableFunction) {
    let variable = getVariable(ref);
    if (variable == null) {
        debugger;
        getVariable(ref);
    }
    while (variable.constant && variable.value instanceof Reference) {
        variable = getVariable(variable.value);
        if (variable == null) {
            debugger;
            getVariable(ref);
        }
    }
    return variable;
}

export const simplifyConverters = [
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
] as any as Converter<Node>[];

const converterPhase = createConverterPhase(simplifyConverters);

export function simplify(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    return converterPhase(moduleName, module, externals);
}
