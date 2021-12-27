import { Declaration, Declarator, Identifier, Module, Reference } from "../ast";
import { Lookup, traverse } from "@glas/traverse";
import createScopeMaps, { getDeclarators } from "../createScopeMaps";
import { _this } from "../reservedWords";
import { resolve, join, getAbsolutePath, getLastName } from "../pathFunctions";
import { SemanticError } from "../common";
import addDefaultExport from "./addDefaultExport";

export default function getExternalReferences(module: Module, modules: Map<string,Module>, errors: Array<Error>): [Module,Map<string,Set<Reference>>] {
    module = addDefaultExport(module)

    let moduleLastName = getLastName(module.name)
    let lookup = new Lookup()
    let scopes = createScopeMaps(module, { lookup })
    let externals = new Map<string,Set<Reference>>()
    let exportNameToAbsolutePath = new Map<string,string>()
    let exportDeclarators = new Set<Declarator>()
    for (let item of module.body) {
        let last = item === module.body[module.body.length - 1]
        if (last) {
            // make sure final item isn't a declaration or if it is that it's name matches last name of module
            if (Declaration.is(item)) {
                if (Declarator.is(item.id)) {
                    if (item.id.name !== moduleLastName) {
                        errors.push(SemanticError(`Final declaration name must match module name`, item.id))
                    }
                }
                else {
                    errors.push(SemanticError(`Final expression can only export a single declarator`, item.id))
                }

                if (!Declarator.is(item.id)) {
                    errors.push(SemanticError(`Final expression must have a single declarator`, item.id))
                }
                else {
                    exportNameToAbsolutePath.set(moduleLastName, getAbsolutePath(module.name))
                    exportDeclarators.add(item.id)
                }
            }
            else {
                errors.push(SemanticError(`Impossible, last statement must be a Declaration`, item))
            }
        }

        else if (Declaration.is(item)) {
            for (let declarator of getDeclarators(item.id)) {
                exportNameToAbsolutePath.set(declarator.name, getAbsolutePath(module.name, declarator.name))
                exportDeclarators.add(declarator)
            }
        }
    }
    // console.log(exports)
    // get own exports
    module = traverse(module, {
        lookup,
        leave(node) {
            if (Reference.is(node) || Declarator.is(node)) {
                if (node.name !== _this) {
                    let scope = scopes.get(lookup.getOriginal(node))
                    if (scope == null) {
                        throw SemanticError(`Scope not found`, node)
                        // console.log("SCOPE")
                    }

                    let declarator = scope[node.name]
                    if (declarator == null) {
                        let resolved = resolve(join(module.name, node.name), modules)
                        if (resolved) {
                            let set = externals.get(resolved.name)
                            if (set == null) {
                                externals.set(resolved.name, set = new Set())
                            }
                            if (Reference.is(node)) {
                                set.add(node)
                            }
                            node = node.patch({ name: getAbsolutePath(resolved.name) })
                        }
                        else {
                            errors.push(SemanticError(`Reference could not be resolved`, node))
                        }
                    }
                    else {
                        let localExportAbsolute = exportNameToAbsolutePath.get(node.name)
                        if (localExportAbsolute != null) {
                            if (exportDeclarators.has(declarator)) {
                                // add absolute reference
                                node = node.patch({ name: localExportAbsolute })
                            }
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