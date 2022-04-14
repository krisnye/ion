import { NumberLiteral } from "../ast/NumberLiteral";
import { NumberType } from "../ast/NumberType";
import { UnionType } from "../ast/UnionType";
import { IntersectionType } from "../ast/IntersectionType";
import { BinaryOperation } from "../pst/BinaryOperation";
import { traverse } from "../traverse";
import { Phase } from "./Phase";
import { UnaryOperation } from "../pst/UnaryOperation";
import { Node } from "../Node";
import { Identifier } from "../ast/Identifier";
import { isTypeName } from "../utility";
import { Lookup } from "@glas/traverse";

export function opsToTypeNodes(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();

    let pushedTypeMode = new Set<any>();
    let isTypeModeStack = [false];
    function getTypeMode(node, ancestors): boolean | null {
        let parent = ancestors[ancestors.length - 1];
        if (parent instanceof BinaryOperation && node === parent.right) {
            switch (parent.operator.value) {
                case ":": return true;
                case "=":
                    if (parent.left instanceof Identifier) {
                        return isTypeName(parent.left.name);
                    }
                    return false;
            }
        }
        return null;
    }
    let lookup = new Lookup();
    let result = traverse(module, {
        lookup,
        enter(node, ancestors, path) {
            const isNewTypeMode = getTypeMode(node, ancestors);
            if (isNewTypeMode !== null) {
                isTypeModeStack.push(isNewTypeMode);
                pushedTypeMode.add(node);
            }
        },
        leave(node, ancestors, path) {
            const { location } = node;
            const pushedNewTypeMode = pushedTypeMode.has(lookup.getOriginal(node));
            const isTypeMode = isTypeModeStack[isTypeModeStack.length - 1]
            if (isTypeMode) {
                // perform type mode conversions here.
                if (node instanceof NumberLiteral) {
                    node = new NumberType({ location, min: node, max: node });
                }
                if (node instanceof UnaryOperation) {
                    switch (node.operator.value) {
                        case ">":
                            node = new NumberType({ location, min: node.value, minExclusive: true });
                            break;
                        case ">=":
                            node = new NumberType({ location, min: node.value, minExclusive: false });
                            break;
                        case "<":
                            node = new NumberType({ location, max: node.value, maxExclusive: true });
                            break;
                        case "<=":
                            node = new NumberType({ location, max: node.value, maxExclusive: false });
                            break;
                        }
                }
                if (node instanceof BinaryOperation) {
                    switch (node.operator.value) {
                        case "..":
                            node = new NumberType({ location, min: node.left, max: node.right });
                            break;
                        case "|":
                            node = new UnionType({ location, left: node.left, right: node.right });
                            break;
                        case "&":
                            node = new IntersectionType({ location, left: node.left, right: node.right });
                            break;
                    }
                }
                //  simplify type nodes right away
                if (node instanceof Node) {
                    node = node.simplify();
                }
            }
            if (pushedNewTypeMode) {
                isTypeModeStack.pop();
            }
            return node;
        }
    })
    return [result, errors];
}