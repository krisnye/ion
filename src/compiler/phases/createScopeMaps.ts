import { Declaration, isDeclaration } from "../ast/Declaration";
import { Scope } from "../ast/Scope";
import { Node } from "../Node";
import { traverse, skip, Lookup } from "./traverse";

export type NodeMap<T> = {
    get(node: Node | null): T
    set(node: Node | null, t: T)
}

export type ScopeMap = { [id: string]: Declaration }
export type ScopeMaps = NodeMap<ScopeMap>

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root): ScopeMaps {
    let globalScope: ScopeMap = {};
    let map = new Map<Node | null, ScopeMap>();
    map.set(null, globalScope);
    let scopes: ScopeMap[] = [globalScope];

    traverse(root, {
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

            if (isDeclaration(node)) {
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