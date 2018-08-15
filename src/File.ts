import { getCompositeHashCode, compare } from "./functional"

function getExtension(path: string) {
    let index = path.lastIndexOf(".")
    return index >= 0 ? path.slice(index + 1) : ""
}

function getName(path: string) {
    let index = path.lastIndexOf("/")
    return index >= 0 ? path.slice(index + 1) : path
}

export default class File {

    readonly path: string
    readonly isDirectory: boolean
    readonly creationTime: number | null
    readonly lastWriteTime: number | null
    readonly exists: boolean
    readonly name: string
    readonly extension: string

    constructor(path: string, isDirectory: boolean = false, creationTime: number | null = null, lastWriteTime: number | null = null) {
        this.path = path
        this.isDirectory = isDirectory
        this.creationTime = creationTime
        this.lastWriteTime = lastWriteTime
        this.exists = creationTime != null
        this.name = getName(path)
        this.extension = getExtension(path)
        Object.freeze(this)
    }

    equals(value) {
        return value instanceof File
            && value.path == this.path
            && value.lastWriteTime === this.lastWriteTime
    }

    getHashCode() {
        return getCompositeHashCode(97, 13, this.path, this.lastWriteTime)
    }

    compare(value: File) {
        return compare(this.path, value.path) || compare(this.lastWriteTime, value.lastWriteTime)
    }

}