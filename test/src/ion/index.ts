
type Type = {
    is: ($: any) => boolean
}

function freeze(value) {
    if (value && typeof value === 'object') {
        Object.freeze(value)
        for (let name in value) {
            freeze(value[name])
        }
    }
    return value
}

const ion = freeze({
    Number: {
        is($: any) { return typeof $ === 'number' },
        fraction($: number) { return $ % 1 },
        integer($: number) { return $ - $ % 1 }
    }
})