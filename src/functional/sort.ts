import compare from "./compare"

export default function(iterable: Iterable<any>) {
    let result: any[] = []
    for (let item of iterable) {
        result.push(item)
    }
    result.sort(compare)
    return result
}
