import {traverse,skip,remove} from "./Traversal"

export function removeLocations(ast:object) {
    return traverse(
        ast,
        (node) => {
            delete node.location
        }
    )
}

export function convertBinaryOperationsToCalls(ast:object) {
    return traverse(
        ast,
        (node) => {
            node.foo = "bar"
        }
    )
}

export default [removeLocations, convertBinaryOperationsToCalls]
