import { traverse } from "@glas/traverse";
import { Module, Node } from "../ast";
import { Options } from "../Compiler"

export default function numbering(
    module: Module,
    externals: Map<string,Module>,
    options: Options
): Module | Error[] {
    let index = 0;
    let map = new Map<Node, number>()
    return traverse(module, {
        enter(node) {
            if (Node.is(node)) {
                map.set(node, ++index)
            }
        },
        // we have to do it in merge, because by leave the node has been replaced
        merge(node, changes, helper) {
            if (Node.is(node)) {
                changes = { ...changes, $: map.get(node) }
            }
            if (changes != null) {
                return helper.patch(node, changes)
            }
        },
    })
}