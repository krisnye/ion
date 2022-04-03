
export type Converter<A,B> = [new () => A, (a: A) => boolean, (a: A) => B];

export function createConverter<A,B>(allConverters: Converter<A,B>[]) {
    let map = new Map<new () => A, Array<Converter<A,B>>>();
    for (let converter of allConverters) {
        let value = map.get(converter[0]);
        if (value == null) {
            map.set(converter[0], value = []);
        }
        value.push(converter);
    }
    let convert = (a: A) => {
        let runAgain = false;
        do {
            runAgain = false;
            let converters = map.get((a as any).constructor);
            if (converters) {
                for (let [, predicate, converter] of converters) {
                    if (predicate(a)) {
                        runAgain = true;
                        let newA = converter(a);
                        if (newA === a as any) {
                            throw new Error(`Converter must alter instance: ${converter.toString()}`);
                        }
                        a = newA as any;
                        break;
                    }
                }
            }
        }
        while (runAgain);
        return a;
    }
    return convert;
}
