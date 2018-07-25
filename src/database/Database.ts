
import Table from "./Table"

export type Compare = (a, b) => -1 | 0 | 1
export type Filter = (a) => boolean
export interface Property {
    get(record): any
    set(record, value): void
}

export default class Database {

    idProperty: Property

    public Database(idProperty: Property) {
        this.idProperty = idProperty
    }

    getTable(type) {
    }

}