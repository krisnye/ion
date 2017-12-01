
// const Module_NoVars = (node:any) => {
//     function failIfVar(declaration:any) {
//         if (Array.isArray(declaration)) {
//             for (let d of declaration) {
//                 failIfVar(d)
//             }
//         }
//         else if (declaration.type === 'VariableDeclaration' && declaration.kind !== 'let') {
//             c.fail(declaration, "Cannot export mutable variables")
//         }
//     }
//     failIfVar(node.declarations)
//     failIfVar(node.exports)
// }
// const IdDeclaration_CheckNoHideModuleNames = (node:any, ancestors:any[], path:string[]) => {
//     let {name} = node
//     let root = ancestors[0]
//     let moduleName = path[1]
//     if (root._names[name] && !moduleName.endsWith(name))
//         c.fail(node, "Cannot declare identifier with same name as local module: " + name)
// }
// const Module_DependenciesCreate = (node:any, ancestors:any[]) => {
//     node._dependencies = {}
// }
// const Assembly_ModuleOrderInit = (node:any) => {
//     let edges: [any,any,any][] = [] // third item is location of dependency IdReference
//     let tail = {}
//     // get all the module dependencies as edges
//     for (let modulePath in node.modules) {
//         let module = node.modules[modulePath]
//         let dependencies = module._dependencies
//         edges.push([modulePath, tail, null])
//         for (let dep in dependencies) {
//             edges.push([dep, modulePath, dependencies[dep]])
//         }
//     }
//     let lastRemovedEdge = null
//     while (true) {
//         let order
//         try {
//             order = toposort(edges).slice(0, -1) // slice to remove tail
//         }
//         catch (e) {
//             lastRemovedEdge = edges.pop()
//             continue
//         }
//         if (lastRemovedEdge != null) {
//             //  this means we have failed with a cyclic dependency
//             //  the last removed one must be the problem since it works now
//             let location = lastRemovedEdge[2].__location
//             c.fail(location, "Cyclic module dependencies are not supported")
//         }
//         node._moduleOrder = order
//         return
//     }
// }

// const _Literal_AddType = (node:any) => {
//     let {value} = node
//     if (typeof value === 'number') {
//         node.valueType = {type: "TypeReference", name:"Number", absolute:true}
//     }
//     if (typeof value === 'boolean') {
//         node.valueType = {type: "TypeReference", name:"Boolean", absolute:true}
//     }
//     if (typeof value === 'string') {
//         node.valueType = {type: "TypeReference", name:"String", absolute:true}
//     }
// }

// const _VariableDeclarator_ValueTypeInferFromValue = (node:any) => {
//     if (node.valueType == null && node.value != null && node.value.valueType != null) {
//         //  shared copy reference?? is this desirable?
//         node.valueType = node.value.valueType
//     }
// }

// const Assembly_NestModules = (node:any) => {
//     let rootModules: any = {modules:{}}
//     function c.getModule(steps:string[]): any {
//         if (steps.length == 0)
//             return rootModules
//         let parentModule = c.getModule(steps.slice(0, -1))
//         let name = steps[steps.length - 1]
//         let module = parentModule.modules[name]
//         if (module == null)
//             module = parentModule.modules[name] = {type:'Module',imports:[],declarations:[],exports:[],modules:{}}
//         return module
//     }

//     for (let path in node.modules) {
//         let module = node.modules[path]
//         let steps = path.split('.')
//         let parentPath = steps.slice(0, -1)
//         let parentModule = c.getModule(parentPath)
//         let name = steps[steps.length - 1]
//         parentModule.modules[name] = module
//     }
//     //  now replace root modules with this new modules
//     node.modules = rootModules.modules
// }

// const Module_ModulesToExports = (node: any) => {
//     for (let name in node.modules) {
//         let module = node.modules[name]
//         node.exports.push(
//             {
//                 type: 'VariableDeclaration',
//                 kind: 'let',
//                 declarations: [
//                     {
//                         type: 'VariableDeclarator',
//                         id: {type:'Id', name},
//                         init: module
//                     }
//                 ]
//             }
//         )
//     }
//     //  now remove modules
//     delete node.modules
// }

// const File_Write = (node:any) => {
//     console.log('Writing ' + node.path)
//     c.write(node.path, node.content, node.encoding)
// }


    // [Module_NoVars, Assembly_NamesInitAndModuleNameInit, IdDeclaration_CheckNoHideModuleNames],
    // [Module_DependenciesCreate, IdReference_ModuleDependenciesInit],
    // [_Literal_AddType,_VariableDeclarator_ValueTypeInferFromValue],
    // [Assembly_ModuleOrderInit, Assembly_NestModules],
    // [Module_ModulesToExports]
