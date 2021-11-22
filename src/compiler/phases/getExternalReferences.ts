import { Declaration, Declarator, Identifier, Module, Reference } from "../ast";
import { traverse } from "@glas/traverse";
import createScopeMaps, { getDeclarators } from "../createScopeMaps";
import { _this } from "../reservedWords";
import { resolve, join, getAbsolutePath, getLast } from "../pathFunctions";
import { SemanticError } from "../common";
import * as builtins from "../builtins";

export default function getExternalReferences(module: Module, modules: Map<string,Module>, errors: Array<Error>): [Module,Map<string,Set<Reference>>] {
    let scopes = createScopeMaps(module)
    let externals = new Map<string,Set<Reference>>()
    let exports = new Map<string,string>()
    for (let item of module.body) {
        let last = item === module.body[module.body.length - 1]
        if (last) {
            // make sure final item isn't a declaration or if it is that it's name matches last name of module
            if (Declaration.is(item)) {
                if (Declarator.is(item.id)) {
                    if (item.id.name !== getLast(module.name)) {
                        errors.push(SemanticError(`Final declaration name must match module name`, item.id))
                    }
                }
                else {
                    errors.push(SemanticError(`Final expression can only export a single declarator`, item.id))
                }
            }
            let localName = Declaration.is(item) && Identifier.is(item.id) ? item.id.name : getLast(module.name)
            exports.set(localName, getAbsolutePath(module.name))
        }
        else if (Declaration.is(item)) {
            for (let declarator of getDeclarators(item.id)) {
                exports.set(declarator.name, getAbsolutePath(module.name, declarator.name))
            }
        }
    }
    // console.log(exports)
    // get own exports
    module = traverse(module, {
        leave(node) {
            if (Reference.is(node)) {
                if (node.name !== _this) {
                    let scope = scopes.get(node)
                    // let builtInType = builtins[node.name]
                    // if (Reference.is(builtInType)) {
                    //     node = node.patch({ name: builtInType.name })
                    // }
                    if (scope == null) {
                        throw SemanticError(`Scope not found`, node)
                        // console.log("SCOPE")
                    }
                    if (scope[node.name] == null) {
                        let resolved = resolve(join(module.name, node.name), modules)
                        if (resolved) {
                            let set = externals.get(resolved.name)
                            if (set == null) {
                                externals.set(resolved.name, set = new Set())
                            }
                            set.add(node)
                            if (resolved) {
                                return node.patch({ name: getAbsolutePath(resolved.name) })
                            }
                        }
                        else {
                            errors.push(SemanticError(`Reference could not be resolved`, node))
                        }
                    }
                    else {
                        let localExportAbsolute = exports.get(node.name)
                        if (localExportAbsolute != null) {
                            // add absolute reference
                            return node.patch({ absolute: localExportAbsolute })
                        }
                    }
                }
            }
            return node
        }
    })
    // console.log(module.name, externals)
    return [module, externals]
}