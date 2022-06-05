import { Phase } from "./Phase";
import { traverseWithScope } from "./createScopeMaps";
import { Variable } from "../ast/Variable";
import { Node } from "../Node";
import { isScope, Scope } from "../ast/Scope";
import { Conditional } from "../ast/Conditional";
import { Assignment } from "../ast/Assignment";
import { EvaluationContext } from "../EvaluationContext";
import { Block } from "../ast/Block";
import { traverse } from "@glas/traverse";
import { Reference } from "../ast/Reference";
import { Identifier } from "../ast/Identifier";
import { TypeofExpression } from "../ast/TypeofExpression";
import { UnionType } from "../ast/UnionType";

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

function getFinalSSAVersionVariable(block: Node | null | undefined, originalName: string): Variable | null {
    let prefix = originalName + ssaVersionSeparator;
    if (block instanceof Block) {
        let { nodes } = block;
        for (let i = nodes.length - 1; i >= 0; i--) {
            let node = nodes[i];
            if (node instanceof Variable && node.id.name.startsWith(prefix)) {
                return node;
            }
        }
    }
    return null;
}

class Converter {

    originalName: string;
    currentName: string;
    lastName: string;

    constructor(originalName: string, currentName: string) {
        this.originalName = originalName;
        this.currentName = currentName;
        this.lastName = currentName;
    }

    getNextName() {
        return this.currentName = this.lastName = getSSANextVersion(this.lastName);
    }

    convert(c: EvaluationContext, block: Block): Block {
        let stack = new Array<string>();
        let originalVariable!: Variable;
        return traverse(block, {
            enter: (node, ancestors) => {
                if (node instanceof Block) {
                    stack.push(this.currentName);
                }
            },
            leave: (node, ancestors) => {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof Variable && node.id.name === this.originalName) {
                    return originalVariable = node.patch({
                        id: node.id.patch({ name: this.currentName })
                    });
                }
                if (node instanceof Assignment && node.id.name === this.originalName) {
                    let { location, id, value } = node;
                    return new Variable({
                        meta: [],
                        location,
                        declaredType: originalVariable.declaredType,
                        id: new Identifier({ location: id.location, name: this.getNextName() }),
                        value
                    });
                }
                if (node instanceof Reference && node.name === this.originalName && !(parent instanceof Assignment && parent.id === node)) {
                    return node.patch({ name: this.currentName });
                }
                if (node instanceof Conditional) {
                    let consequent = getFinalSSAVersionVariable(node.consequent, this.originalName);
                    let alternate = getFinalSSAVersionVariable(node.alternate, this.originalName);
                    let vars = [consequent, alternate].filter(Boolean) as Variable[];
                    if (vars.length > 0) {
                        if (vars.length < 2) {
                            vars.push(originalVariable);
                        }
                        let types = vars.map(v => new TypeofExpression({ location: v.location, value: new Reference(v.id) }));
                        let type = UnionType.join(...types);
                        let phi = new Variable({
                            meta: [],
                            location: originalVariable.location,
                            id: originalVariable.id.patch({ name: this.getNextName() }),
                            type,
                            value: null
                        });

                        return new Block({
                            location: originalVariable.location,
                            nodes: [node as any, phi]
                        });
                    }
                }
                if (node instanceof Block) {
                    this.currentName = stack.pop()!;
                }
            }
        });
    }

}

export function ssaForm3(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let varNumbers = new Map<string,number>();
    function getNewVarName(name: string) {
        let count = varNumbers.get(name) ?? 1;
        varNumbers.set(name, count + 1);
        return getSSAVersionName(`${name}${ssaVersionSeparator}${count}`, 0);
    }
    let result = traverseWithScope(new Map(), module, (c) => {
        return {
            leave(node, ancestors) {
                if (node instanceof Block) {
                    let variables = node.nodes.filter(n => n instanceof Variable) as Variable[];
                    if (variables.length > 0) {
                        for (let variable of variables) {
                            let name = getNewVarName(variable.id.name);
                            let converter = new Converter(variable.id.name, name);
                            node = converter.convert(c, node);
                        }
                    }
                }
                return node;
            }
        };
    });

    return [result, errors];
}
