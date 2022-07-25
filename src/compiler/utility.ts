import { isValidId } from "./common";

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

export const evalMemoized = memoize(eval);

function firstLetterOfLastName(name: string) {
    return name[name.lastIndexOf(".") + 1];
}

export function isTypeName(name?: string) {
    if (name == null || !isValidId(name)) {
        return false;
    }
    const first = firstLetterOfLastName(name);
    return first !== "_" && first === first.toUpperCase();
}

export function isMetaName(name?: string) {
    if (name == null) {
        return false;
    }
    const first = firstLetterOfLastName(name);
    return first === "@";
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
