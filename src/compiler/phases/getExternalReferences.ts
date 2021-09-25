import { Module, Reference } from "../ast";
import { traverse } from "@glas/traverse";
import createScopeMaps from "../createScopeMaps";
import { _this } from "../reservedWords";
import { resolve, join, getGlobalPath } from "../pathFunctions";
import { SemanticError } from "../common";

export default function getExternalReferences(module: Module, modules: Map<string,Module>, errors: Array<Error>): [Module,Map<string,Set<Reference>>] {
    let scopes = createScopeMaps(module)
    let externals = new Map<string,Set<Reference>>()
    module = traverse(module, {
        leave(node) {
            if (Reference.is(node)) {
                if (node.name !== _this) {
                    let scope = scopes.get(node)
                    if (scope[node.name] == null) {
                        let resolved = resolve(join(module.name, node.name), modules)
                        if (resolved) {
                            let set = externals.get(resolved.name)
                            if (set == null) {
                                externals.set(resolved.name, set = new Set())
                            }
                            set.add(node)
                            if (resolved) {
                                return node.patch({ name: getGlobalPath(resolved.name) })
                            }
                        }
                        else {
                            errors.push(SemanticError(`Reference could not be resolved`, node))
                        }
                    }
                }
            }
        }
    })
    return [module, externals]
}