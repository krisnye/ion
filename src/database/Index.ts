
import {Compare, Filter} from "./Database"

export default class Index {

    private filter: Filter
    private compare: Compare
    private records: object[] = []
    private dirty = true

    constructor(filter: Filter, compare: Compare) {
        this.filter = filter
        this.compare = compare
    }

    add(record: object) {
        if (this.filter(record)) {
            this.records.push(record)
            this.dirty = true
        }
    }

    remove(record: object) {
        let index = this.indexOf(record)
        if (index >= 0) {
            this.records.splice(index, 1)
        }
    }

    indexOf(record: object) {
        if (this.filter(record)) {
            // should really use a binary search
            return this.records.indexOf(record)
        }
        return -1
    }

    getRecords() {
        if (this.dirty) {
            this.records.sort(this.compare)
            this.dirty = false;
        }
        return this.records
    }

}