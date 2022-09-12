import { isDeclaration } from "../../ast/Declaration";
import { Reference } from "../../ast/Reference";
import { join, resolve, getAbsolutePath } from "../../pathFunctions";
import { Module } from "../../ast/Module";
import { SemanticError } from "../../SemanticError";
import createScopeMaps, { NodeMap, ScopeMap } from "./createScopeMaps";
import { Phase } from "../Phase";
import { traverse } from "../../traverse";
import { Identifier } from "../../ast/Identifier";
import { coreTypes } from "../../coreTypes";
import { NumberType } from "../../ast/NumberType";
import { TypeReference } from "../../ast/TypeReference";
import { ArrayExpression } from "../../ast/ArrayExpression";
import { NumberLiteral } from "../../ast/NumberLiteral";
import { isProperty, Variable } from "../../ast/Variable";

export function resolveExternalReferences(moduleName, module, externalModules: Map<string,Module>): ReturnType<Phase> {
    let errors: Error[] = [];
    let replacements = new Map<string, string>();
    let scopes = createScopeMaps(module);
    let externalReferences = getExternalReferences(module, scopes);
    let dependencies = new Set<string>();

    module = traverse(module, {
        enter(node) {
            if (node instanceof Module) {
                // why are we replacing things here?
                replaceExternalReferencesToAbsolute(node, externalModules, replacements, errors, externalReferences, dependencies);
                replaceInternalReferencesToAbsolute(node, externalModules, replacements, errors, scopes);
            }
        },
        leave(node, ancestors) {
            if (node instanceof ArrayExpression) {
                dependencies.add(coreTypes.Array);
            }
            if (node instanceof NumberLiteral) {
                dependencies.add(node.integer ? coreTypes.Integer : coreTypes.Number);
            }
            if (node instanceof Reference) {
                if (node instanceof TypeReference) {
                    // convert References to Number or Integer to NumberTypes
                    if (node.name === coreTypes.Number) {
                        return new NumberType({ location: node.location, step: false }) as any
                    }
                    if (node.name === coreTypes.Integer) {
                        return new NumberType({ location: node.location, step: true }) as any
                    }
                }
            }
            if (node instanceof Identifier || node instanceof Reference) {
                let parent = ancestors[ancestors.length - 1];
                if (!isProperty(parent) || node instanceof Reference) {
                    let newName = replacements.get(node.name);
                    if (newName && newName !== node.name) {
                        node = node.patch({ name: newName });
                    }
                }
            }
            return node;
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

function replaceInternalReferencesToAbsolute(module: Module, externalModules: Map<string,Module>, replacements: Map<string, string>, errors, scopes: NodeMap<ScopeMap>) {
    for (let node of module.nodes) {
        if (isDeclaration(node) && !node.isGlobalScoped) {
            replacements.set(node.id.name, getAbsolutePath(module.name, node.id.name, true));
        }
    }
}

function replaceExternalReferencesToAbsolute(module: Module, externalModules: Map<string,Module>, replacements: Map<string, string>, errors: Error[], externalReferences: Map<string, Set<Reference>>, externalModuleDependencies: Set<string>) {
    for (let external of externalReferences.keys()) {
        let resolvedPath = resolve(join(module.name, external), externalModules);
        if (resolvedPath) {
            externalModuleDependencies.add(resolvedPath);
            let absolutePath = getAbsolutePath(resolvedPath);
            for (let ref of externalReferences.get(external)!.keys()) {
                replacements.set(ref.name, absolutePath);
            }
        }
        else {
            errors.push(new SemanticError(`Cannot resolve ${external}`, ...externalReferences.get(external)!.values()));
        }
    }
}

