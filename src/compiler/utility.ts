
function firstLetterOfLastName(name: string) {
    return name[name.lastIndexOf(".") + 1];
}

export function isTypeName(name: string) {
    const first = firstLetterOfLastName(name);
    return first !== "_" && first === first.toUpperCase();
}

export function isMetaName(name: string) {
    const first = firstLetterOfLastName(name);
    return first === "@";
}
