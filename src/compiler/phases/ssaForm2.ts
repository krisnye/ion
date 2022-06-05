import { Phase } from "./Phase";
import { traverseWithScope } from "./createScopeMaps";
import { Variable } from "../ast/Variable";
import { Node } from "../Node";
import { isScope, Scope } from "../ast/Scope";
import { Conditional } from "../ast/Conditional";
import { Assignment } from "../ast/Assignment";
import { EvaluationContext } from "../EvaluationContext";

const ssaVersionSeparator = ":";

export function isSSAVersionName(name: string) {
    return name.lastIndexOf(ssaVersionSeparator) >= 0;
}

export function getSSAVersionName(name: string, count: number) {
    return `${name}${ssaVersionSeparator}${count}`;
}

export function getSSAVersionNumber(name: string) {
    let index = name.lastIndexOf(ssaVersionSeparator);
    if (index < 0) {
        return 0;
    }
    return parseInt(name.slice(index + 1));
}

export function getSSAOriginalName(name: string) {
    let lastIndex = name.lastIndexOf(ssaVersionSeparator);
    return lastIndex >= 0 ? name.slice(0, lastIndex) : name;
}

export function getSSANextVersion(name: string) {
    return getSSAVersionName(getSSAOriginalName(name), getSSAVersionNumber(name) + 1);
}

export function getScope(ancestors: object[]): Scope {
    for (let i = ancestors.length - 1; i >= 0; i--) {
        let ancestor = ancestors[i];
        if (isScope(ancestor)) {
            return ancestor;
        }
    }
    throw new Error("No Scope found");
}

function toDebugString(value) {
    if (value instanceof Node) {
        return value.constructor.name;
    }
    return value;
}

function getLastName(nodes: StateNode[]): string {
    for (let i = nodes.length - 1; i >= 0; i--) {
        let node = nodes[i];
        if (typeof node === "string") {
            return node;
        }
    }
    throw new Error();
}

function popLastStrings(nodes: StateNode[]): string[] {
    let result = new Array<string>();
    while (typeof nodes[nodes.length - 1] === "string") {
        result.unshift(nodes.pop() as string);
    }
    return result;
}

function isConditionalBranch(c: EvaluationContext, node, ancestors: object[]) {
    node = c.lookup.getOriginal(node);
    let parent = ancestors[ancestors.length - 1];
    return parent instanceof Conditional && (node === parent.consequent || node === parent.alternate);
}

type StateNode = Node | string | string[]

export function ssaForm2(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let varNumbers = new Map<string,number>();
    function getNewVarName(name: string) {
        let count = varNumbers.get(name) ?? 1;
        varNumbers.set(name, count + 1);
        return getSSAVersionName(`${name}${ssaVersionSeparator}${count}`, 0);
    }
    let scopedVars = new Map<Scope, Set<Variable>>();
    function addVarToScope(block: Scope, variable: Variable) {
        let vars = scopedVars.get(block);
        if (vars == null) {
            scopedVars.set(block, vars = new Set());
        }
        vars.add(variable);
    }
    const debug = (name) => name === "total";
    let varState = new Map<Variable, StateNode[]>();
    function logState(message) {
        for (let [variable, state] of varState) {
            console.log(message + " : " + variable.id.name + " ->\n    " + JSON.stringify(state.map(toDebugString)));
        }
    }
    let result = traverseWithScope(new Map(), module, (c) => {
        return {
            enter(node, ancestors) {
                //  branch check first on enter
                if (isConditionalBranch(c, node, ancestors)) {
                    for (let state of varState.values()) {
                        state.push(node);
                    }
                    logState("+branch " + toDebugString(node));
                }
                if (node instanceof Variable) {
                    //  initialize variable state.
                    if (debug(node.id.name)) {
                        let block = getScope(ancestors);
                        addVarToScope(block, node);
                        varState.set(node, [getNewVarName(node.id.name)]);
                        console.log(`+`, varState.get(node));
                    }
                }
                if (node instanceof Assignment) {
                    for (let state of varState.values()) {
                        let last = getLastName(state);
                        //  TODO: use this to change assignment to new Variable.
                        let next = getSSANextVersion(last);
                        // replace last if last is string
                        if (typeof state[state.length - 1] === "string") {
                            state.pop();
                        }
                        state.push(next);
                    }
                    logState("asign");
                }
                if (node instanceof Conditional) {
                    for (let state of varState.values()) {
                        state.push(node);
                    }
                    logState("enter " + toDebugString(node));
                }
            },
            leave(node, ancestors) {
                if (isScope(node)) {
                    let vars = scopedVars.get(node);
                    if (vars != null) {
                        //  delete variable states.
                        for (let variable of vars) {
                            console.log(`-`, varState.get(variable)?.map(toDebugString));
                            varState.delete(variable);
                        }
                    }
                }
                if (node instanceof Conditional) {
                    for (let state of varState.values()) {
                        let index = state.lastIndexOf(c.lookup.getOriginal(node));
                        let names = state.slice(index + 1);
                        // remove everything at and past insertion
                        state.length = index;
                        console.log(">>>>>>>>> " + JSON.stringify(names));
                    }
                    logState("leave " + toDebugString(node));
                }
                //  branch check last on leave
                if (isConditionalBranch(c, node, ancestors)) {
                    for (let state of varState.values()) {
                        // find index of branch
                        let index = state.lastIndexOf(c.lookup.getOriginal(node));
                        let names = state.slice(index + 1);
                        // remove everything at and past insertion
                        state.length = index;
                        //  add names
                        state.push(names as string[]);
                    }
                    logState("-branch " + toDebugString(node));
                }
                // if (node instanceof Block) {
                //     for (let state of varState.values()) {
                //         let last = state[state.length - 1];
                //         if (typeof last === "string") {
                //             state.pop();
                //             state.push([last]);
                //         }
                //     }
                //     logState("leave " + toDebugString(node));
                // }
            }
        };
    });

    return [result, errors];
}
