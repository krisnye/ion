import { Visitor } from "@glas/traverse";
import { Reference } from "../../ast/Reference";
import { Container } from "../../ast/Container";
import { EvaluationContext } from "../../EvaluationContext";
import { Node } from "../../Node";
import { traverse, skip, Lookup } from "../../traverse";
import { isScope } from "../../ast/Scope";
import { Function } from "../../ast/Function";
import { isSSAVersionName } from "../frontend/ssaForm";
import { Declaration, isDeclaration } from "../../ast/Declaration";
import { Variable } from "../../ast/Variable";

export type NodeMap<T> = {
    get(node: Node | null): T
    set(node: Node | null, t: T)
}

export type ScopeMap = { [id: string]: Declaration[] }
export type ScopeMaps = NodeMap<ScopeMap>

function setScopeValue(scope, name, value) {
    let current = scope[name];
    if (current == null || !scope.hasOwnProperty(name)) {
        current = scope[name] = [];
    }
    current.push(value);
}

export function sortDeclarations(declarations: Declaration[]) {
    declarations.sort((a, b) => a.order! - b.order!);
    return declarations;
}

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, externals?: Map<string,Container>): ScopeMaps {
    let declarationsToSort = new Set<(Declaration)[]>();
    let globalScope: ScopeMap = {};
    if (externals != null) {
        for (let { nodes } of externals.values()) {
            if (Array.isArray(nodes)) {
                for (let node of nodes) {
                    if (isDeclaration(node)) {
                        // HACK: skip Variables that reference themselves
                        let check = node;
                        if (check instanceof Variable && check.value instanceof Reference && check.id.name === check.value.name) {
                            // console.log("******** ATTEMPT TO ADD SAME DECLARATION: " + check);
                            continue;
                        }
                        let declarations = globalScope[node.id.name] ??= [];
                        globalScope[node.id.name].push(node);
                        if (node.order != null) {
                            declarationsToSort.add(declarations);
                        }
                    }
                }
            }
        }
    }
    let map = new Map<Node | null, ScopeMap>();
    map.set(null, globalScope);
    let scopes: ScopeMap[] = [globalScope];
    let functionScopes: ScopeMap[] = [globalScope];

    traverse(root, {
        // lookup,
        enter(node) {
            //  get the current scope
            let scope = scopes[scopes.length - 1];
            let functionScope = functionScopes[functionScopes.length - 1];
            //  save a map from this nodes location to it's scope
            map.set(node, scope);

            if (isDeclaration(node)) {
                setScopeValue(scope, node.id.name, node);
                if (isSSAVersionName(node.id.name)) {
                    //  SSA variables must be put in function scope so they can be used by
                    //  PHI functions that reference the variables from previous conditionals
                    setScopeValue(functionScope, node.id.name, node);
                }
            }

            if (isScope(node)) {
                let newScope = scope = Object.create(scope);
                scopes.push(newScope);
                if (node instanceof Function) {
                    functionScopes.push(newScope);
                }
            }

        },
        leave(node) {
            if (isScope(node)) {
                scopes.pop();
            }
        }
    });

    for (let declarations of declarationsToSort) {
        sortDeclarations(declarations);
    }

    return map as NodeMap<ScopeMap>;
}

export type GetVariableFunction = {
    (ref: Reference): Declaration[];
    (node: Node, name?: string): Declaration[];
}

export function createEvaluationContext(node: Node, externals = new Map<string,Container>(), lookup = new Lookup()) {
    let scopeMaps = createScopeMaps(node, externals);
    function getDeclarations(ref: Reference | Node, name?: string): Declaration[] {
        if (name == null) {
            name = (ref as Reference).name;
        }
        let original = lookup.getOriginal(ref);
        let scope = scopeMaps.get(original) ?? scopeMaps.get(null);
        return scope[name] ?? [];
    }
    return new EvaluationContext(getDeclarations, lookup);
}

export function traverseWithScope(
    externals: Map<string,Container>,
    node: Node,
    callback: (c: EvaluationContext) => Visitor,
): any {
    let lookup = new Lookup();
    let c = createEvaluationContext(node, externals, lookup);
    let visitor = callback(c);
    return traverse(node, {...visitor, lookup });
}
