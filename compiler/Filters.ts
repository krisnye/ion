import {traverse,skip,remove,Visitor} from "./Traversal"

//  phases are a very granular term for the major sections of compilation
//  passes represent each traversal of the ast
//  filter is the name for each individual operation

/////////////////////////////////////////////////////////////////////////////
//  Filters
/////////////////////////////////////////////////////////////////////////////

const Node_deleteLocation = (node:any) => { delete node.location }
const BinaryExpression_ToCall = {
    name: 'BinaryExpression_ToCall',
    target: ['BinaryExpression'],
    mutate: true,
    leave: (node:any) => {
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
}

export const defaultPasses = [
    [Node_deleteLocation, BinaryExpression_ToCall]
]
