import {traverse,remove,Visitor} from "./Traversal"
import toposort from "./toposort"

function fail(node:any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
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
            callee: {type:'IdReference', name:operator},
            arguments: [left, right]
        }
    }
}
const Assembly_NamesInitAndModuleNameInit = (node:any) => {
    let names: any = {}
    for (let modulePath in node.modules) {
        let module = node.modules[modulePath]
        let name: any = modulePath.split('.').pop()
        module.name = name
        if (names[name])
            fail(node.modules[modulePath], "CompilerError: " + modulePath + " short name cannot be the same as " + names[name])
        names[name] = modulePath
    }
    node._names = names
}

const IdDeclaration_CheckNoHideModuleNames = (node:any, ancestors:any[]) => {
    let {name} = node
    let root = ancestors[0]
    if (root._names[name])
        fail(node, "Cannot declare identifier with same name as local module: " + name)
}

const Module_DependenciesCreate = (node:any, ancestors:any[]) => {
    node._dependencies = {}
}

const IdReference_ModuleDependenciesInit = (node:any, ancestors:any[]) => {
    let {name} = node
    let [assembly, , module] = ancestors
    let modulePath = assembly._names[name]
    if (modulePath) {
        module._dependencies[modulePath] = true
    }
}

const Assembly_ModuleOrderInit = (node:any) => {
    let edges: [any,any][] = []
    let tail = "00root"
    // get all the module dependencies as edges
    for (let modulePath in node.modules) {
        let module = node.modules[modulePath]
        let dependencies = module._dependencies
        edges.push([modulePath, tail])
        for (let dep in dependencies) {
            edges.push([dep, modulePath])
        }
    }

    let order = toposort(edges).slice(0, -1) // slice to remove tail
    node._moduleOrder = order
}

//  how to find an external identifier for implicit imports.
//  do we even need to do that, or can we

//  need an actual filter to do... how about adding implicit module references
export const defaultPasses = [
    [Assembly_NamesInitAndModuleNameInit, IdDeclaration_CheckNoHideModuleNames, BinaryExpression_ToCall],
    [Module_DependenciesCreate, IdReference_ModuleDependenciesInit],
    [Assembly_ModuleOrderInit]
]
