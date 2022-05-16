import { Scope } from "../ast/Scope";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { GetVariableFunction, traverseWithScope } from "../phases/createScopeMaps";
import { Phase } from "../phases/Phase";
import { Lookup } from "../traverse";

type ConverterType<A extends Node> = new (props: any) => A;
type ConverterFunction<A extends Node> = (a: A, c: EvaluationContext) => Node | null | boolean | void | Error[];
export type Converter<A extends Node> = [ConverterType<A> | null, ConverterFunction<A>];

export function createConverter<A extends Node>(predicate: (node) => boolean, allConverters: Converter<A>[]) {
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
    let convert = (a: A, c: EvaluationContext) => {
        let runAgain = false;
        function runConverter(converter: ConverterFunction<A>) {
            if (predicate(a)) {
                let newA = converter(a, c);
                if (newA != null && newA !== false && newA !== a) {
                    runAgain = true;
                    c.lookup.setCurrent(a, newA);
                    a = newA as any;
                    return true;
                }
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

export function createConverterPhase<A extends Node>(
    predicate: (node) => boolean,
    allConverters: Converter<A>[]
) {
    const converter = createConverter(predicate, allConverters);
    return (moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> => {
        let errors = new Array<Error>();
        let modifications = 0;
        let result = traverseWithScope(externals, module, (c) => {
            return {
                leave(node) {
                    let _original = node;
                    node = converter(node, c);
                    if (Array.isArray(node)) {
                        errors.push(...node);
                        return;
                    }
                    if (node !== _original) {
                        modifications++;
                    }
                    return node;
                }
            }
        });
        let runPhaseAgain = modifications > 0;
        return [result, errors, runPhaseAgain];
    }
}