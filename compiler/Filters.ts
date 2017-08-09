import {traverse,remove,Visitor} from "./Traversal"

function fail(node:any, message: string) {
    let error = new Error(message)
    let location = node.__location || node
    error.location = location
    console.log(location)
    throw error
}

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
const Assembly_NamesInit = (node:any) => {
    let names: {[name:string]:string = {}
    for (let modulePath in node.modules) {
        let name = modulePath.split('.').pop()
        if (names[name])
            fail(node.modules[modulePath], "CompilerError: " + modulePath + " short name cannot be the same as " + names[name])
        names[name] = modulePath
    }
    node._names = names
}

//  how to find an external identifier for implicit imports.
//  do we even need to do that, or can we

//  need an actual filter to do... how about adding implicit module references
export const defaultPasses = [
    [Assembly_NamesInit, BinaryExpression_ToCall]
]
