import { isDeclaration } from "../ast/Declaration";
import { Reference } from "../ast/Reference";
import { join, resolve, getAbsolutePath } from "../pathFunctions";
import { Module } from "../pst/Module";
import { SemanticError } from "../SemanticError";
import createScopeMaps, { NodeMap, ScopeMap } from "./createScopeMaps";
import { Phase } from "./Phase";
import { traverse } from "../traverse";
import { Identifier } from "../ast/Identifier";
import { coreTypes } from "../coreTypes";
import { NumberType } from "../ast/NumberType";
import { TypeReference } from "../ast/TypeReference";
import { ArrayExpression } from "../ast/ArrayExpression";
import { NumberLiteral } from "../ast/NumberLiteral";

export function resolveExternalReferences(moduleName, module, externalModules: Map<string,Module>): ReturnType<Phase> {
    let errors: Error[] = [];
    let replacements = new Map<Identifier, Reference>();
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
        leave(node) {
            if (node instanceof ArrayExpression) {
                dependencies.add(coreTypes.Array);
            }
            if (node instanceof NumberLiteral) {
                dependencies.add(node.integer ? coreTypes.Integer : coreTypes.Float);
            }
            if (node instanceof Reference) {
                if (node instanceof TypeReference) {
                    // convert References to Float or Integer to NumberTypes
                    if (node.name === coreTypes.Float) {
                        return new NumberType({ location: node.location, step: false }) as any
                    }
                    if (node.name === coreTypes.Integer) {
                        return new NumberType({ location: node.location, step: true }) as any
                    }
                }

                let declarations = scopes.get(node)[node.name];
                if (declarations != null) {
                    let declaration = declarations[0];
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
        if (isDeclaration(node) && !node.isGlobalScoped) {
            replacements.set(node.id, node.id.patch({ name: getAbsolutePath(module.name, node.id.name) }));
        }
    }
}

function replaceExternalReferencesToAbsolute(module: Module, externalModules: Map<string,Module>, replacements: Map<Identifier, Reference>, errors: Error[], externalReferences: Map<string, Set<Reference>>, externalModuleDependencies: Set<string>) {
    for (let external of externalReferences.keys()) {
        let resolvedPath = resolve(join(module.name, external), externalModules);
        if (resolvedPath) {
            externalModuleDependencies.add(resolvedPath);
            let absolutePath = getAbsolutePath(resolvedPath);
            for (let ref of externalReferences.get(external)!.keys()) {
                replacements.set(ref, ref.patch({ name: absolutePath }));
            }
        }
        else {
            errors.push(new SemanticError(`Cannot resolve ${external}`, ...externalReferences.get(external)!.values()));
        }
    }
}

