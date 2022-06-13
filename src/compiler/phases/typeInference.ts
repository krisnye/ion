import { Phase } from "./Phase";
import { Container } from "../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { Expression } from "../ast/Expression";
import { Function } from "../ast/Function";
import { skip, traverse } from "../traverse";
import { Call } from "../ast/Call";
import { FunctionDeclaration } from "../ast/FunctionDeclaration";
import { clone } from "../common";
import { Node } from "../Node";

export function isInferFunction(node): node is Function {
    return node.parameters.some(p => p.declaredType == null);
}

function getCreateFunctionKey(func: FunctionDeclaration) {
    return `${func.id.name}(${func.parameters.map(p => p.declaredType)})`;
}

export function typeInference(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors!: Error[];
    let modifications = 0;
    let existingInferFunctions = new Set<string>();
    let createInferFunctions = new Map<string, FunctionDeclaration>();
    let result = traverseWithScope(externals, module, (c) => {
        errors = c.errors;
        return {
            enter(node) {
                if (node instanceof Function) {
                    let inferred = isInferFunction(node);
                    if (inferred) {
                        //  we don't type analyze infer functions.
                        //  they have to be instantiated per type before analysis
                        return skip;
                    }
                    if (node instanceof FunctionDeclaration) {
                        let inferKey = node.inferredKey;
                        if (inferKey) {
                            existingInferFunctions.add(inferKey);
                        }
                    }
                }
            },
            leave(node) {
                if (node instanceof Expression && !node.resolved) {
                    let _original = node;
                    let maybeResolved = node.maybeResolve(c);
                    if (maybeResolved) {
                        node = maybeResolved;
                    }
                    else {
                        if (node instanceof Call) {
                            let maybeCreateConcreteFunction = node.needsToInferNewConcreteFunction(c);
                            if (maybeCreateConcreteFunction) {
                                let inferKey = maybeCreateConcreteFunction.inferredKey;
                                if (!inferKey) {
                                    throw new Error("Missing inferKey");
                                }
                                if (!existingInferFunctions.has(inferKey)) {
                                    //  TODO: this clone is NOT working.
                                    //  hmmm, clone may be necessary because otherwise the scopes may be wrong.
                                    debugger;
                                    let cloned = clone(maybeCreateConcreteFunction, true);
                                    // let's test that there are no longer any shared nodes
                                    // let nodes = new Set<Node>();
                                    // traverse(maybeCreateConcreteFunction, {
                                    //     enter(node) {
                                    //         if (node instanceof Node) {
                                    //             nodes.add(node);
                                    //         }
                                    //     }
                                    // })
                                    // traverse(cloned, {
                                    //     enter(node) {
                                    //         if (node instanceof Node) {
                                    //             if (nodes.has(node)) {
                                    //                 debugger;
                                    //                 throw new Error("WTF man?");
                                    //             }
                                    //         }
                                    //     }
                                    // })
                                    createInferFunctions.set(inferKey, cloned);
                                }
                            }
                        }
                    }
                    if (node !== _original) {
                        modifications++;
                    }
                }
                return node;
            }
        }
    }) as Container;
    let runPhaseAgain = modifications > 0;
    if (createInferFunctions.size > 0) {
        runPhaseAgain = true;
        result = result.patch({
            nodes: [...result.nodes, ...createInferFunctions.values()]
        })
    }
    return [result, errors, runPhaseAgain];

}
