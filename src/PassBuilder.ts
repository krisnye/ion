import {Visitor} from "./Traversal"

export type Filter = Visitor & {name:string,target:string[],mutate:boolean}
export type Pass = Visitor & {names:string[]}

function createFilter(filter: Filter | ((node:any, ancestors?: object[], path?: string[]) => any)): Filter {
    if (typeof filter === 'function') {
        let name = filter.name
        let enter: any = filter
        let leave: any = null
        let mutate = false
        //  _ prefix means filter on leave instead of enter
        if (name.startsWith('_')) {
            leave = filter
            enter = null
            name = name.substring(1)
            //  another _ prefix means we are mutating on leave
            if (name.startsWith('_')) {
                mutate = true
                name = name.substring(1)
            }
        }
        //  allows you to provide target in name of function
        let split = name.split('_')
        if (split.length <= 1)
            throw new Error("Name must have target prefix: " + name)
        let target = split.slice(0, -1)
        return {name, target, mutate, enter, leave}
    }
    else {
        if (!Array.isArray(filter.target))
            throw new Error(filter.name + " target is not an array: " + filter.target)
        return filter
    }
}

const AllNodeTargetType = "Node"

export function createPass(filters: Filter[], options:{debug?:boolean} = {}): Pass {
    let debug = options.debug !== false
    //  ensure all filters are visitors
    filters = filters.map(f => createFilter(f))
    //  get mutate filters
    let mutators = filters.filter(f => f.mutate === true)
    //  check that none operate on same types
    let mutationTypes: any = {}
    for (let filter of mutators) {
        for (let target of filter.target) {
            if (target === AllNodeTargetType)
                throw new Error("Mutation filters cannot target all nodes: " + filter.name)
            if (mutationTypes[target] != null)
                throw new Error("Mutation filters operate on same type: " + mutationTypes[target] + " and " + filter.name)
            mutationTypes[target] = filter.name
        }
    }
    //  sort mutate filters to end
    filters = filters.filter(f => f.mutate !== true).concat(mutators)

    //  create type map
    let targetTypeMap: any = {}
    for (let filter of filters) {
        for (let target of filter.target) {
            let handlers = targetTypeMap[target]
            if (handlers == null)
                handlers = targetTypeMap[target] = {enters:[],leaves:[]}

            if (filter.enter) {
                (<any>filter.enter).filter = filter    // store filter ref
                handlers.enters.push(filter.enter)
            }
            if (filter.leave) {
                (<any>filter.leave).filter = filter    //  store filter ref
                handlers.leaves.push(filter.leave)
            }
        }
    }

    // now join the all's to every other handlers enters/leaves
    let allHandler = targetTypeMap[AllNodeTargetType]
    if (allHandler != null) {
        for (let type in targetTypeMap) {
            if (type !== allHandler) {
                let handler = targetTypeMap[type]
                handler.enters = handler.enters.concat(allHandler.enters)
                handler.leaves = handler.leaves.concat(allHandler.leaves)
            }
        }
    }

    function getHandler(type: string) {
        return targetTypeMap[type] || targetTypeMap[AllNodeTargetType]
    }

    return {
        names: filters.map(f => f.name),
        enter: (node:any, ancestors: object[], path: string[]) => {
            let type = node.type
            let handler = getHandler(node.type)
            if (handler) {
                let {enters} = handler
                for (let enter of enters) {
                    enter(node, ancestors, path)
                    if (debug) {
                        if (node.type !== type)
                            throw new Error("Enter filter cannot modify node type: " + enter.name)
                    }
                }
            }
        },
        leave: (node:any, ancestors: object[], path: string[]) => {
            let handler = getHandler(node.type)
            if (handler) {
                let {leaves} = handler
                for (let leave of leaves) {
                    let result = leave(node, ancestors, path)
                    if (result !== undefined) {
                        if (leave.filter.mutate !== true)
                            throw new Error("Filter mutated without setting mutate true: " + leave.filter.name)
                        //  we know there cannot be any other applicable Mutation filters at this point
                        return result
                    }
                }
            }
        }
    }
}
