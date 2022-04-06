import { isDeclaration } from "../ast/Declaration";
import { Reference } from "../ast/Reference";
import { join, resolve, getAbsolutePath } from "../pathFunctions";
import { Module } from "../pst/Module";
import { SemanticError } from "../SemanticError";
import createScopeMaps, { NodeMap, ScopeMap } from "./createScopeMaps";
import { Phase } from "./Phase";
import { traverse } from "../traverse";

export function resolveExternalReferences(moduleName, module, externalModules: Map<string,Module>): ReturnType<Phase> {
    let errors: Error[] = [];
    let replacements = new Map<Reference, Reference>();
    let scopes = createScopeMaps(module);
    let externalReferences = getExternalReferences(module, scopes);
    let dependencies = new Set<string>();

    module = traverse(module, {
        enter(node) {
            if (node instanceof Module) {
                replaceExternalReferencesToAbsolute(node, externalModules, replacements, errors, externalReferences, dependencies);
                replaceInternalReferencesToAbsolute(node, externalModules, replacements, errors, scopes);
            }
        },
        leave(node) {
            if (node instanceof Reference) {
                let declaration = scopes.get(node)[node.name];
                if (declaration != null) {
                    let rootId = replacements.get(declaration.id);
                    if (rootId != null) {
                        node = node.patch({ name: rootId.name });
                    }
                }
            }
            return replacements.get(node) ?? node;
        }
    });
    module = module.patch({ dependencies: [...dependencies] });
    return [module, errors];
}

function getExternalReferences(module: any, scopes: NodeMap<ScopeMap>): Map<string, Set<Reference>> {
    let externalReferences = new Map<string, Set<Reference>>();
    traverse(module, {
        leave(node) {
            if (node instanceof Reference) {
                let declaration = scopes.get(node)[node.name];
                if (declaration == null) {
                    let externalSet = externalReferences.get(node.name);
                    if (externalSet == null) {
                        externalReferences.set(node.name, externalSet = new Set());
                    }
                    externalSet.add(node);
                }
            }
        }
    });
    return externalReferences;
}

function replaceInternalReferencesToAbsolute(module: Module, externalModules: Map<string,Module>, replacements, errors, scopes: NodeMap<ScopeMap>) {
    for (let node of module.nodes) {
        if (isDeclaration(node)) {
            replacements.set(node.id, node.id.patch({ name: getAbsolutePath(module.name, node.id.name), constant: true }));
        }
    }
}

function replaceExternalReferencesToAbsolute(module: Module, externalModules: Map<string,Module>, replacements: Map<Reference, Reference>, errors: Error[], externalReferences: Map<string, Set<Reference>>, externalModuleDependencies: Set<string>) {
    for (let external of externalReferences.keys()) {
        let resolved = resolve(join(module.name, external), externalModules);
        if (resolved) {
            externalModuleDependencies.add(resolved);
            let absolutePath = getAbsolutePath(resolved);
            for (let ref of externalReferences.get(external)!.keys()) {
                replacements.set(ref, ref.patch({ name: absolutePath, constant: true }));
            }
        }
        else {
            errors.push(new SemanticError(`Cannot resolve ${external}`, ...externalReferences.get(external)!.values()));
        }
    }
}

