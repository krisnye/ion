import { traverse, replace } from "./traverse";
import { Node } from "../Node";
import { BinaryOperation } from "../pst/BinaryOperation";
import { Call } from "../pst/Call";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { Phase } from "./Phase";
import { Scope } from "../ast/Scope";
import { Block } from "../pst/Block";
import { Sequence } from "../pst/Sequence";

type IdentifierFactory = (location: SourceLocation) => { location: SourceLocation, name: string }
export function tempFactory(name: string): IdentifierFactory {
    let count = 0;
    return (location: SourceLocation) => {
        return { location, name: `_${name}_${++count}` };
    }
}

function getLastNode(node: Node) {
    if (node instanceof BinaryOperation) {
        return getLastNode(node.right);
    }
    else {
        return node;
    }
}

function replaceNode(root: Node, find: Node, replace: Node) {
    if (root === find) {
        return replace;
    }
    return traverse(root, {
        leave(node) {
            if (node === find) {
                return replace;
            }
        }
    })
}

export function bindIndents(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverse(module, {
        leave(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
            // check classes as well
            if (node instanceof Scope) {
                // merge indent with previous expressions.
                let newNodes = new Array<Node>();
                for (let i = 0; i < node.nodes.length; i++) {
                    let current = node.nodes[i];
                    let next = node.nodes[i + 1];
                    if (next instanceof Block) {
                        let lastNode = getLastNode(current);
                        if (lastNode instanceof Call) {
                            let args = lastNode.args != null ? Array.isArray(lastNode.args) ? lastNode.args : [lastNode.args] : [];
                            if (args.length > 0) {
                                errors.push(new SemanticError(`Outline arguments cannot be mixed with inline`, ...args, next));
                                return;
                            }
                            newNodes.push(
                                replaceNode(current, lastNode, new Call({
                                    ...lastNode,
                                    args: new Sequence(next),
                                }))
                            );
                            //  skip the next
                            i++;
                        }
                        else {
                            errors.push(new SemanticError(`Unexpected Indent`, current));
                        }
                    }
                    else {
                        newNodes.push(current);
                    }
                }
                if (newNodes.length != node.nodes.length) {
                    node = node.patch({ ...node, nodes: newNodes });
                }
            }
            return node;
        }
    })
    return [result, errors];
}