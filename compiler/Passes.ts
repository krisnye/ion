import {traverse,skip,remove} from "./Traversal"

export function removeLocations(ast:object) {
    return traverse(
        ast,
        (node) => {
            delete node.location
        }
    )
}

export function opsToCalls(ast:object) {
    return traverse(
        ast,
        null,
        (node) => {
            if (node.type === 'BinaryExpression') {
                let {location, left, right, operator} = node
                return {
                    type:'Call',
                    location,
                    callee: {type:'Identifier', name:operator},
                    arguments: [left, right]
                }
            }
        }
    )
}

export function identity(ast:object) { return ast }

export default [removeLocations, opsToCalls, identity]
