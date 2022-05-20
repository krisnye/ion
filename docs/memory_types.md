# Memory Allocator for individual heap objects

    //  one per class
    class ObjectAllocator<T>
        pool: ObjectPool<T>
        nextSlot: ObjectLayout<T> | null
        released: ObjectLayout<T> | null
        allocate(): ObjectLayout<T> =>
            let next = this.nextSlot
            if next != null
                //  quick allocate next in new pool
                this.nextSlot = this.pool.getNextSlot()
                return next
            next = this.released
            if next != null
                //  recycle a released
                this.released = next.refCountOrNextFree
                return next
            //  allocate a new pool and return first
            this.pool = new ObjectPool<T> { next = this.pool }
            next = & this.pool.slots[0]
            this.nextSlot = this.pool.getNextSlot(next)
            return next
        release(pointer: ObjectLayout<T>) =>
            pointer.refCountOrNextFree = this.released
            this.released = pointer
    const PAGE_SIZE = 2 ** 16   //  64kb
    class ObjectPool<T>
        class: classof T
        next: ObjectPool<T> | null
        slots: ObjectLayout<T>[(PAGE_SIZE - sizeof ObjectPoolHeader) / (4 + sizeof T)]
        getNextSlot(pointer: ObjectLayout<T>) =>
            if space within page return next else null

    struct ObjectLayout<T>
        refCountOrNextFree: Integer | ObjectLayout<T>
        ...dataFields of T
        getClass() => * (this.pointer & (PAGE_SIZE - 1)) //  use class pointer from top of page

## TODO: Array Allocation

- Quick allocation and recycling of arrays with same type+length.
- Passing inline tuple to a function that expects an Array pointer?
