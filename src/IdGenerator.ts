
export function normalizeIdentifier(name: string) {
    return name.replace(/[^_a-z0-9]/ig, "_")
}

export default class IdGenerator
{

    public ids: Set<string>

    constructor(ids: Iterable<string> = []) {
        this.ids = new Set(ids)
    }

    createNewIdName(name: string) {
        name = normalizeIdentifier(name)
        while (this.ids.has(name)) {
            name = "_" + name
        }
        this.ids.add(name)
        return name
    }

}