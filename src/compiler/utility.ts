
function firstLetterOfLastName(name: string) {
    return name[name.lastIndexOf(".") + 1];
}

export function isTypeName(name?: string) {
    if (name == null) {
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
