
//  not even sure we need this.
class Splice {

    index: number
    insert: any[]
    remove: number

    constructor(index: number, insert: any[], remove: number = 0) {
        this.index = index
        this.insert = <any[]>Object.freeze(insert)
        this.remove = remove
        Object.freeze(this)
    }

    isEmpty() {
        return this.insert.length == 0 && this.remove == 0
    }

    static readonly empty = new Splice(0, [], 0)

    static is(value) {
        return value != null && value instanceof Splice
    }

    static apply(array: any[], ...splices: any[]) {
        let result: any[] | null = null
        let offset = 0
        for (let splice of splices) {
            if (!splice.isEmpty()) {
                if (result == null) {
                    result = array.slice(0)
                }
                result.splice(splice.index + offset, splice.remove, ...splice.insert)
                offset += splice.insert.length - splice.remove
            }
        }
        return result != null ? result : array
    }

}

export default Splice
