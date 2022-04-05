
export function isMetaName(name: string) {
    return name[name.lastIndexOf(".") + 1] === "@";
}
