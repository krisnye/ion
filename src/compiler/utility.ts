import { isValidId } from "./common";
import { getLastName } from "./pathFunctions";

export function memoize<A,B>(fn: (a: A) => B): (a: A) => B {
    let cache = new Map<A,B>();
    return (a: A) => {
        let cached = cache.get(a);
        if (cached == null) {
            cache.set(a, cached = fn(a)); 
        }
        return cached;
    }
}

export function memoize2<A,B,C>(fn: (a: A, b: B) => C): (a: A, b: B) => C {
    let cache1 = new Map<A,Map<B,C>>();
    return (a: A, b: B) => {
        let cache2 = cache1.get(a);
        if (cache2 == null) {
            cache1.set(a, cache2 = new Map());
        }
        let cachedValue = cache2.get(b);
        if (cachedValue == null) {
            cache2.set(b, cachedValue = fn(a, b));
        }
        return cachedValue;
    }
}

export const evalMemoized = memoize(eval);

function firstLetterOfLastName(name: string) {
    return name[name.lastIndexOf(".") + 1];
}

export function isPrivateName(name: string) { return getLastName(name).startsWith("_"); }

export function isTypeName(name?: string) {
    if (name == null) {
        return false;
    }
    const first = firstLetterOfLastName(name);
    if (!isValidId(first)) {
        return false;
    }
    return !isPrivateName(first) && first === first.toUpperCase();
}

export function isMetaName(name?: string) {
    if (name == null) {
        return false;
    }
    const first = firstLetterOfLastName(name);
    return first === "@";
}

export function areAllElementsTheSame(array: any[]) {
    return array.length === 0 || new Set(array).size === 1;
}

const logged = new Set<string>();
export function logOnce(message: string) {
    if (!logged.has(message)) {
        console.log(message);
        logged.add(message);
        return true;
    }
    return false;
}
