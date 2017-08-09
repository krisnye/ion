import {traverse,remove,Visitor} from "./Traversal"

const Node_identity = (node:any) => {}
const Node_deleteLocation = (node:any) => { delete node._location }
const BinaryExpression_ToCall = {
    name: 'BinaryExpression_ToCall',
    target: ['BinaryExpression'],
    mutate: true,
    leave: (node:any) => {
        let {location, left, right, operator} = node
        return {
            type:'Call',
            location,
            callee: {type:'Identifier', name:operator},
            arguments: [left, right]
        }
    }
}
const VariableDeclaration_AddPath = (node:any, ancestors:object[], path:string[]) => {
    // path may change so we have to take a copy of it.
    node.path = path.slice(0)
}

//  how to find an external identifier for implicit imports.
//  do we even need to do that, or can we

//  need an actual filter to do... how about adding implicit module references
export const defaultPasses = [
    [Node_deleteLocation, BinaryExpression_ToCall],
    [VariableDeclaration_AddPath]
]
