import { Phase } from "./Phase";
import { traverse, replace, Lookup } from "../traverse";
import { Assignment } from "../ast/Assignment";
import { Reference } from "../ast/Reference";
import { Node } from "../Node";
import { Variable } from "../ast/Variable";
import { isScope } from "../ast/Scope";
import { TypeReference } from "../ast/TypeReference";
import { Conditional } from "../ast/Conditional";
import { Block } from "../ast/Block";
import { Identifier } from "../ast/Identifier";
import { Expression } from "../ast/Expression";
import { TypeofExpression } from "../ast/TypeofExpression";
import { UnionType } from "../ast/UnionType";
import { traverseWithScope } from "./createScopeMaps";
import { EvaluationContext } from "../EvaluationContext";

function findPreviousVariableOrAssignment(c: EvaluationContext, originalNode: Node, ancestors: object[], name: string): Variable | Assignment | null {
    originalNode = c.lookup.getOriginal(originalNode);
    ancestors = ancestors.filter(a => !Array.isArray(a));
    for (let ancestorIndex = ancestors.length - 1; ancestorIndex >= 0; ancestorIndex--) {
        let ancestor = ancestors[ancestorIndex];
        let node = ancestors[ancestorIndex + 1] ?? originalNode;
        if (isScope(ancestor)) {
            // traverse backwards from this nodes index
            let nodes = ancestor.nodes as object[];
            let index = nodes.indexOf(node);
            if (index < 0) {
                continue;
            }
            for (let i = index - 1; i >= 0; i--) {
                let check = nodes[i];
                if (check instanceof Variable || check instanceof Assignment) {
                    if (check.id.name === name) {
                        return c.lookup.getOriginal(check);
                    }
                }
            }
        }
    }
    return null;
}


const ssaVersionSeparator = "#";

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

function getVariables(block: Block, result = new Set<Variable>() ) {
    for (let node of block.nodes) {
        if (node instanceof Variable) {
            result.add(node);
        }
        else if (node instanceof Block) {
            getVariables(node, result);
        }
    }
    return result;
}

function getFinalSSAVersionVariables(block: Block | Expression | null): Map<string,Variable> {
    if (!(block instanceof Block)) {
        return new Map();
    }
    let highest = new Map<string,Variable>();
    for (let variable of getVariables(block)) {
        let originalName = getSSAOriginalName(variable.id.name);
        if (originalName !== variable.id.name) {
            let best = highest.get(originalName);
            let replace = best == null || getSSAVersionNumber(variable.id.name) > getSSAVersionNumber(best.id.name);
            if (replace) {
                highest.set(originalName, variable);
            }
        }
    }
    return highest;
}

export function ssaForm(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let ssaCounts = new Map<string, number>();
    function getNextSSAName(name: string): string {
        name = getSSAOriginalName(name);
        let count = ssaCounts.get(name) ?? 0;
        count++;
        ssaCounts.set(name, count);
        return getSSAVersionName(name, count);
    }
    function toSSAPhiVariables(consequent: Map<string,Variable>, alternate?: Map<string,Variable>): Variable[] {
        const variables = new Array<Variable>();
        let names = [...consequent.keys()];
        if (alternate) {
            names.push(...alternate.keys());
        }
        names = [...new Set(names)];
        for (let name of names) {
            let a = consequent.get(name);
            let b = alternate?.get(name) ?? null;
            let aType = a ? new TypeofExpression({ location: a.location, value: new Reference(a.id) }) : null;
            let bType = b ? new TypeofExpression({ location: b.location, value: new Reference(b.id) }) : null;
            let type = UnionType.join(aType, bType)!;
            let variable: Variable = a ?? b!;

            variables.push(new Variable({
                meta: [],
                location: variable.location,
                id: variable.id.patch({ name: getNextSSAName(variable.id.name) }),
                type,
                value: null
            }));
        }
        return variables;
    }
    let ssaVersions = new Map<Variable | Assignment, Variable>();
    let newSsaVariables = new Map<object,Variable[]>();
    function addNewSssaVariable(ancestors: object[], variable: Variable) {
        let parent = ancestors[ancestors.length - 1];
        let vars = newSsaVariables.get(parent);
        if (vars == null) {
            newSsaVariables.set(parent, vars = []);
        }
        vars.push(variable);
    }
    let result = traverseWithScope(new Map(), module, (c) => {
        return {
            leave(node, ancestors) {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof Assignment) {
                    //  replace node with a new version
                    let { location, id, value } = node;
                    let newVar = new Variable({
                        meta: [],
                        location,
                        id: new Identifier({ location: id.location, name: getNextSSAName(id.name)}),
                        value
                    });
                    ssaVersions.set(c.lookup.getOriginal(node), newVar);
                    return newVar;
                }
                if (node instanceof Reference && !(node instanceof TypeReference)) {
                    if (parent instanceof Assignment && node === parent.id) {
                        // we don't care about fixing reference id's.
                        return;
                    }
                    let original = c.getVariable(node);
                    let previous = findPreviousVariableOrAssignment(c, node, ancestors, node.name);
                    if (previous) {
                        let ssaVersion = ssaVersions.get(previous);
                        if (ssaVersion != null) {
                            // throw new SemanticError(`SSA FORM NOT FOUND`, node);
                            return node.patch({ name: ssaVersion.id.name });
                        }
                    }
                }
                if (node instanceof Conditional) {
                    let finalCondVariables = getFinalSSAVersionVariables(node.consequent);
                    let finalAltVariables = getFinalSSAVersionVariables(node.alternate);
                    let finalVariables = toSSAPhiVariables(finalCondVariables, finalAltVariables);
                    for (let variable of finalVariables) {
                        let previousVariable = findPreviousVariableOrAssignment(c, node, ancestors, getSSAOriginalName(variable.id.name));
                        if (previousVariable) {
                            ssaVersions.set(previousVariable, variable);
                        }
                    }
                    if (finalVariables.length > 0) {
                        return replace(
                            node, ...finalVariables
                        )
                    }
                }
            }
        };
    });

    return [result, errors];
}
