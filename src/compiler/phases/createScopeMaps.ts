import { Visitor } from "@glas/traverse";
import { Reference } from "../ast/Reference";
import { Container } from "../ast/Container";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { traverse, skip, Lookup } from "../traverse";
import { isScope } from "../ast/Scope";
import { Function } from "../ast/Function";
import { isSSAVersionName } from "./ssaForm";
import { Declaration, isDeclaration } from "../ast/Declaration";

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

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, externals?: Map<string,Container>): ScopeMaps {
    let globalScope: ScopeMap = {};
    // if (externals != null) {
    //     for (let { nodes } of externals.values()) {
    //         for (let node of nodes) {
    //             if (isDeclaration(node)) {
    //                 globalScope[node.id.name] = node;
    //             }
    //         }
    //     }
    // }
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
    })

    return map as NodeMap<ScopeMap>;
}

export type GetVariableFunction = {
    (ref: Reference): Declaration[];
    (node: Node, name?: string): Declaration[];
}

export function traverseWithScope(
    externals: Map<string,Container>,
    node: Readonly<any>,
    callback: (c: EvaluationContext) => Visitor,
): any {
    let lookup = new Lookup();
    let scopeMaps = createScopeMaps(node, externals);
    function getDeclarations(ref: Reference | Node, name?: string): Declaration[] {
        if (name == null) {
            name = (ref as Reference).name;
        }
        let original = lookup.getOriginal(ref);
        let scope = scopeMaps.get(original) ?? scopeMaps.get(null);
        return scope[name] ?? [];
    }
    let c = new EvaluationContext(getDeclarations, lookup);
    let visitor = callback(c);
    return traverse(node, {...visitor, lookup });
}
