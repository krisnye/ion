import { Node } from "../Node";
import { GetVariableFunction } from "../phases/createScopeMaps";

type ConverterType<A extends Node> = new (props: any) => A;
type ConverterFunction<A extends Node> = (a: A, getVariable: GetVariableFunction) => Node | Error[];
export type Converter<A extends Node> = [ConverterType<A> | null, ConverterFunction<A>];

export function createConverter<A extends Node>(allConverters: Converter<A>[]) {
    let map = new Map<ConverterType<A>, Array<ConverterFunction<A>>>();
    let runOnAll = new Array<ConverterFunction<A>>();
    for (let converter of allConverters) {
        let [ctor] = converter;
        if (ctor == null) {
            runOnAll.push(converter[1]);
        }
        else {
            let value = map.get(ctor);
            if (value == null) {
                map.set(ctor, value = []);
            }
            value.push(converter[1]);
        }
    }
    let convert = (a: A, getVariable: GetVariableFunction) => {
        let runAgain = false;
        function runConverter(converter: ConverterFunction<A>) {
            let newA = converter(a, getVariable);
            if (newA !== a) {
                runAgain = true;
                a = newA as any;
                return true;
            }
            return false;
        }
        do {
            runAgain = false;
            for (let converter of runOnAll) {
                if (runConverter(converter)) {
                    break;
                }
            }
            if (!runAgain) {
                let converters = map.get((a as any).constructor);
                if (converters) {
                    for (let converter of converters) {
                        if (runConverter(converter)) {
                            break;
                        }
                    }
                }
            }
            if (Array.isArray(a)) {
                return a;
            }
        }
        while (runAgain);
        return a;
    }
    return convert;
}
