import Type from "./Type"

export default class MetaProperty {

    readonly name: string
    readonly type: Type
    readonly defaultValue?
    readonly symbol: Symbol
    
    constructor(name: string, type: Type, defaultValue?) {
        this.name = name
        this.type = type
        this.defaultValue = defaultValue
        this.symbol = Symbol(name)
    }

}
