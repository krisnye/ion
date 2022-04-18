import { Phase } from "./Phase";
import { Node } from "../Node";
import { traverse, replace } from "../traverse";
import { Scope } from "../ast/Scope";
import { Function } from "../ast/Function";
import { Variable } from "../ast/Variable";
import { MultiFunction } from "../ast/MultiFunction";
import { SourceLocation } from "../SourceLocation";
import { getValue, Lookup } from "@glas/traverse";
import { SemanticError } from "../SemanticError";

export function createMultiFunctions(moduleName, module): ReturnType<Phase> {
    const errors = new Array<Error>();
    const lookup = new Lookup();
    const result = traverse(module, {
        lookup,
        leave(node) {
            if (node instanceof Scope) {
                // traverse and join any multiple
                const namedFunctions = new Map<string,Function[]>();
                for (const child of node.nodes) {
                    if (child instanceof Variable && child.value instanceof Function) {
                        let functions = namedFunctions.get(child.id.name);
                        if (functions == null) {
                            namedFunctions.set(child.id.name, functions = []);
                        }
                        functions.push(child.value);
                    }
                }
                const map = new Map<Node,any>();
                let foundMultiFunctions = 0;
                for (const [name, functions] of namedFunctions) {
                    if (functions.length > 1) {
                        foundMultiFunctions++;
                        const writableFunctionsTypes = functions.map(node => lookup.getParent(node).type).filter(Boolean) as Node[];
                        if (writableFunctionsTypes.length > 0) {
                            errors.push(new SemanticError(`Multi functions cannot be writable`, ...writableFunctionsTypes));
                        }

                        functions.forEach((func, index) => {
                            const parent = lookup.getParent(func) as Variable;
                            if (index === 0) {
                                map.set(
                                    parent,
                                    parent.patch({
                                        value: new MultiFunction({
                                            location: SourceLocation.merge(functions[0].location, functions[functions.length - 1].location),
                                            nodes: functions.map(func => func.patch({ meta: lookup.getParent(func).meta })),
                                        })
                                    })
                                )
                            }
                            else {
                                map.set(parent, false);
                            }
                        });
                    }
                }
                if (foundMultiFunctions) {
                    node = node.patch({
                        nodes: node.nodes.map(child => map.get(child) ?? child).filter(child => child !== false)
                    });
                }
            }
            return node;
        }
    });
    return [result, errors];
}
