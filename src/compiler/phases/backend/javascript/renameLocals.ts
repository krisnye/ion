import { Identifier } from "../../../ast/Identifier";
import { Reference } from "../../../ast/Reference";
import { Variable } from "../../../ast/Variable";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { getSSAOriginalName } from "../../frontend/ssaForm";
import { Phase } from "../../Phase";
import { replace } from "../../../traverse";
import { defaultExportName } from "../../../pathFunctions";
import { Function } from "../../../ast/Function";
import { memoize } from "../../../utility";
import { Declarator } from "../../../ast/Declarator";

export const toJavascriptIdentifier = memoize((name: string) => {
    return name
        .replace(/\./g, "_dot_")
        .replace(/;/g, "_semicolon_")
        .replace(/\+/g, "_add_")
        .replace(/-/g, "_subtract_")
        .replace(/\*/g, "_multiply_")
        .replace(/\//g, "_divide_")
        .replace(/%/g, "_modulo_")
        .replace(/\*\*/g, "_exponent_")
        .replace(/@/g, "_at_")
        .replace(/</g, "_lt_")
        .replace(/>/g, "_gt_")
        .replace(/<=/g, "_lte_")
        .replace(/>=/g, "_gte_")
        .replace(/<</g, "_left_shift_")
        .replace(/>>/g, "_right_shift_")
        .replace(/\|/g, "_bitwise_or_")
        .replace(/\|\|/g, "_logical_or_");
});

export function renameLocals(moduleName, module, externals): ReturnType<Phase> {
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof Variable) {
                    if (node.conditional || node.phi) {
                        node = replace();
                    }
                }
                if (node instanceof Reference || (node instanceof Identifier) && !(parent instanceof Function)) {
                    // rename the main name to "export".
                    let name: string;
                    if (node.name === moduleName) {
                        name = defaultExportName;
                    }
                    else {
                        name = getSSAOriginalName(node.name);
                    }

                    
                    if (name !== node.name) {
                        node = node.patch({ name });
                    }
                }
                if (node instanceof Reference || node instanceof Declarator) {
                    let name = toJavascriptIdentifier(node.name);
                    if (name != node.name) {
                        // console.log(node.name + " ---> " + name);
                        node = node.patch({ name });
                    }
                }
                return node;
            }
        }
    })
    return [module, []];
}
