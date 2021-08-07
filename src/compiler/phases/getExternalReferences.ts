import { Module, Reference } from "../ast";
import { traverse } from "@glas/traverse";
import createScopeMaps from "../createScopeMaps";

export default function getExternalReferences(module: Module): [Module,Map<string,Set<Reference>>] {
    let scopes = createScopeMaps(module)
    let externals: Map<string,Set<Reference>> = new Map()
    traverse(module, {
        leave(node) {
            if (Reference.is(node)) {
                let scope = scopes.get(node.$)
                if (scope[node.name] == null) {
                    let set = externals.get(node.name)
                    if (set == null) {
                        externals.set(node.name, set = new Set())
                    }
                    set.add(node)
                }
            }
        }
    })
    return [module, externals]
}