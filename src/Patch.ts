
//  TODO:
//      Work on Maps and Sets
//      Test that it works

class Patch {

    changes: Map<any,any>

    constructor(changes: Map<any,any> | object) {
        if (changes instanceof Map) {
            this.changes = changes
        }
        else {
            this.changes = new Map()
            for (let key in changes) {
                this.changes.set(key, changes[key])
            }
        }
    }

    static isEmpty(patch) {
        if (patch != null) {
            return patch.changes.size == 0
        }
        return true
    }

    static readonly empty = new Patch(new Map())
    
    static is(value) {
        return value != null && value instanceof Patch
    }

    static combine(a: Patch | any, b: Patch | any): any | Patch {
        if (!Patch.is(a) || !Patch.is(b))
            return b
        if (Patch.isEmpty(a))
            return b
        if (Patch.isEmpty(b))
            return a

        let newMap = new Map(a.changes)
        b.changes.forEach(function (value, key) {
            newMap.set(key, Patch.combine(newMap.get(key), value))
        })
        return new Patch(newMap)
    }

    static apply(a: any, b: Patch | any): any {
        if (!Patch.is(b)) {
            return b
        }
        if (a == null) {
            throw new Error("Cannot patch a null object")
        }
        if (Patch.isEmpty(b)) {
            return a
        }
        // we have to patch any descendants first..
        if (a instanceof Map) {
            let newMap = new Map(a)
            b.changes.forEach(function (value, key) {
                newMap.set(key, Patch.apply(a.get(key), value))
            })
            return newMap
        }
        else {
            let newValues = {}
            b.changes.forEach(function(value, key) {
                newValues[key] = Patch.apply(a[key], value)
            })
            if (a.constructor === Object)
                return Object.assign({}, a, newValues)
            return new a.constructor(a, newValues)
        }
    }

}

export default Patch
