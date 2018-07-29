import equals from "./equals"
import {getHashKey} from "./getHashCode";

//  does not guarantee that keys will return same value in future
export default function CacheMap() {
    let map = new Map<any,any>()
    return {
        clear() {
            map.clear()
        },
        get(key) {
            let hashKey = getHashKey(key)
            if (hashKey !== key) {
                // we can try a direct lookup since this is an object and cannot collide with a hash number
                let directValue = map.get(key)
                if (directValue !== undefined) {
                    return directValue
                }
            }
            //  use hash key
            let bucket = map.get(hashKey)
            if (bucket != null) {
                // check bucket for exact key match
                for (let i = 0; i < bucket.length; i += 2) {
                    let bkey = bucket[i]
                    if (equals(bkey, key)) {
                        return bucket[i + 1]
                    }
                }
            }
            return undefined
        },
        set(key, value) {
            let hashKey = getHashKey(key)
            if (hashKey !== key) {
                // direct set
                map.set(key, value)
            }
            // use hash key
            let bucket = map.get(hashKey)
            if (bucket == null) {
                map.set(hashKey, bucket = [])
            }
            // check bucket for exact key match
            for (let i = 0; i < bucket.length; i += 2) {
                let bkey = bucket[i]
                if (equals(bkey, key)) {
                    //  matched bucket key so replace value
                    bucket[i + 1] = value
                    //  then return so we don't add another entry
                    return
                }
            }
            // add new entry to the bucket
            bucket.push(key, value)
        }
    }
}
