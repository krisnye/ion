
type DataClass = { baseClasses: Set<DataClass>, implements: Set<DataClass>, interfaces: Set<DataClass> }

export default function createTypeCheck(cls: DataClass) {
    cls.implements = new Set<DataClass>()
    if (cls.baseClasses) {
        for (let baseClass of cls.baseClasses) {
            cls.implements.add(baseClass)
            if (baseClass.implements) {
                for (let i of baseClass.implements) {
                    cls.implements.add(i)
                }
            }
        }
    }
    if (cls.interfaces) {
        for (let baseInterface of cls.interfaces) {
            cls.implements.add(baseInterface)
        }
    }
    return (instance) => {
        if (instance == null) {
            return false
        }
        let ctor = instance.constructor
        return ctor === cls || ctor.implements?.has(cls) === true
    }
}