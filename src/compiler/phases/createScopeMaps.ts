import { Visitor } from "@glas/traverse";
import { Reference } from "../ast/Reference";
import { Scope } from "../ast/Scope";
import { Variable } from "../ast/Variable";
import { Node } from "../Node";
import { traverse, skip, Lookup } from "../traverse";

export type NodeMap<T> = {
    get(node: Node | null): T
    set(node: Node | null, t: T)
}

export type ScopeMap = { [id: string]: Variable }
export type ScopeMaps = NodeMap<ScopeMap>

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, externals?: Map<string,Scope>): ScopeMaps {
    let globalScope: ScopeMap = {};
    if (externals != null) {
        for (let { nodes } of externals.values()) {
            for (let node of nodes) {
                if (node instanceof Variable) {
                    globalScope[node.id.name] = node;
                }
            }
        }
    }
    let map = new Map<Node | null, ScopeMap>();
    map.set(null, globalScope);
    let scopes: ScopeMap[] = [globalScope];

    traverse(root, {
        // lookup,
        enter(node) {
            //  get the current scope
            let scope = scopes[scopes.length - 1];
            //  save a map from this nodes location to it's scope
            map.set(node, scope);
            function pushScope() {
                scopes.push(scope = Object.create(scope));
            }

            if (node instanceof Scope) {
                pushScope();
            }

            if (node instanceof Variable) {
                scope[node.id.name] = node;
            }
        },
        leave(node) {
            if (node instanceof Scope) {
                scopes.pop();
            }
        }
    })

    return map as NodeMap<ScopeMap>;
}

export type GetVariableFunction = (ref: Reference) => Variable;

export function traverseWithScope(
    node: Readonly<any>,
    callback: (args: { getVariable: GetVariableFunction }) => Visitor,
    externals?: Map<string,Scope>,
): any {
    let lookup = new Lookup();
    let scopeMaps = createScopeMaps(node, externals);
    function getVariable(ref: Reference): Variable {
        let original = lookup.getOriginal(ref);
        let scope = scopeMaps.get(original) ?? scopeMaps.get(null);
        return scope[ref.name];
    }
    let visitor = callback({ getVariable });
    return traverse(node, {...visitor, lookup });
}

export function getValue(ref: Node, getVariable: GetVariableFunction) {
    let value = ref;
    while (value instanceof Reference || value instanceof Variable) {
        let variable = value instanceof Variable ? value : getVariable(value);
        value = getValue(variable.value!, getVariable);
    }
    return value;
}