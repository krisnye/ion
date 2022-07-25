import { traverse as glasTraverse, Visitor } from "@glas/traverse";
import { SourceLocation } from "./SourceLocation";
export { skip, replace, pair, Visitor, Lookup } from "@glas/traverse";

export function traverse(node: Readonly<any>, visitor: Visitor) {
    return glasTraverse(node, {
        skip(node) {
            return node instanceof SourceLocation;
        },
        ...visitor,
    })
}

export const skipTypePaths = function skip(node, ancestors, path) {
    let step = path[path.length - 1];
    if (step === "type") {
        return true;
    }
    return node instanceof SourceLocation;
}

export function traverseSkipTypePaths(node: Readonly<any>, visitor: Visitor) {
    return glasTraverse(node, { skip: skipTypePaths, ...visitor, });
}

