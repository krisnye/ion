
import {Property,Filter} from "./Database"
import Index from "./Index"

export default class Table {

    filter: Filter
    idProperty: Property
    records: Map<string,object> = new Map()
    indexes: Index[] = []

    constructor(filter: Filter, idProperty: Property) {
        this.filter = filter
        this.idProperty = idProperty
    }

    put(record: object) {
        if (this.filter(record)) {
            let id = this.idProperty.get(record)
            this.records.set(id, record)
            for (let index of this.indexes) {
                index.add(record)
            }
        }
    }

    get(id: string) {
        return this.records.get(id) || null
    }

    remove(record: object) {
        let id = this.idProperty.get(record)
        if (this.records.delete(id)) {
            for (let index of this.indexes) {
                index.remove(record)
            }
        }
    }

}