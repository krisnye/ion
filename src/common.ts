import * as fs from "fs"
import * as np from "path"

////////////////////////////////////////////////////////////////////////////////
//  Miscelaneous Functions
////////////////////////////////////////////////////////////////////////////////

export function freeze(object: any, deep: boolean = true) {
    if (object != null && typeof object === 'object') {
        Object.freeze(object)
        if (deep) {
            for (let name in object) {
                freeze(object[name])
            }
        }
    }
}

export function SemanticError(message: string, location: any) {
    let error: any = new Error(message)
    error.location = location
    return error
}

////////////////////////////////////////////////////////////////////////////////
//  Set Functions
////////////////////////////////////////////////////////////////////////////////

export function union(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a)
        result.add(e)
    for (let e of b)
        result.add(e)
    return result
}

export function intersection(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (b.has(e))
            result.add(e)
    }
    return result
}

export function difference(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (!b.has(e))
            result.add(e)
    }
    return result
}

////////////////////////////////////////////////////////////////////////////////
//  File operations
////////////////////////////////////////////////////////////////////////////////

export type Input = { filename: string, path: string }

export function read(file: any) {
    return fs.readFileSync(file, 'utf8')
}

function getPathFromFilename(filename: string, input: string) {
    filename = filename.substring(input.length + 1)
    return filename.substring(0, filename.length - '.ion'.length).replace(/[\/\\]/g, '.')
}

export function getFilesRecursive(directory: string | string[], rootDirectory : string | null = null, allFiles: Input[] = []): Input[] {
    if (Array.isArray(directory)) {
        for (let dir of directory) {
            getFilesRecursive(dir, dir, allFiles)
        }
    }
    else {
        if (rootDirectory == null)
            rootDirectory = directory
        for (let name of fs.readdirSync(directory)) {
            let filename = np.join(directory, name)
            if (fs.statSync(filename).isFile()) {
                let path = getPathFromFilename(filename, rootDirectory)
                allFiles.push({ filename, path})
            }
            else {
                getFilesRecursive(filename, rootDirectory, allFiles)
            }
        }
    }
    return allFiles
}

export function exists(file: string) { return fs.existsSync(file) }

export function makeDirectories(dir: string) {
    if (!exists(dir)) {
        // make parent first
        makeDirectories(np.dirname(dir))
        // make self
        fs.mkdirSync(dir)
    }
}

export function write(file:string, content:string, encoding?:string) {
    makeDirectories(np.dirname(file))
    if (content != null) {
        if (encoding === undefined && typeof content === 'string')
            encoding = 'utf8'
        fs.writeFileSync(file, content, {encoding})
    }
    else if (exists(file)) {
        fs.unlinkSync(file)
    }
}
