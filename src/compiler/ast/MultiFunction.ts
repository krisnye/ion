import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { AnyType } from "./AnyType";
import { Callable } from "./Callable";
import { Function } from "./Function";
import { Container, ContainerProps } from "./Container";
import { Type } from "./Type";
import { UnionType } from "./UnionType";

// export interface MultiFunctionProps extends ContainerProps {
//     nodes: Function[];
// }

// export class MultiFunction extends Container implements Callable {

//     nodes!: Function[];

//     constructor(props: MultiFunctionProps) { super(props); }
//     patch(props: Partial<MultiFunctionProps>) { return super.patch(props); }

//     call(args: Node[]): Node {
//         throw new Error();
//     }

//     getReturnType(argTypes: Type[], c: EvaluationContext): Type | null {
//         let possibleFunctionCalls = this.getPossibleFunctionCalls(argTypes, c);
//         let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(argTypes, c));
//         return UnionType.join(...returnTypes);
//     }

//     getPossibleFunctionCalls(argTypes: Type[], c: EvaluationContext): Function[] {
//         let functions = new Array<Function>();
//         for (let func of this.nodes) {
//             if (func.areArgumentsValid(argTypes, c)) {
//                 functions.push(func);
//             }
//         }
//         return functions;
//     }

//     resolveType(c: EvaluationContext) {
//         return new AnyType({ location: this.location });
//     }

//     toString() {
//         return Container.toString(this.nodes, "MultiFunction[", "]");
//     }

// }

export function getReturnType(funcs: Function[], argTypes: Type[], c: EvaluationContext): Type | null {
    let possibleFunctionCalls = getPossibleFunctionCalls(funcs, argTypes, c);
    let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(argTypes, c));
    return UnionType.join(...returnTypes);
}

export function getPossibleFunctionCalls(funcs: Function[], argTypes: Type[], c: EvaluationContext): Function[] {
    let functions = new Array<Function>();
    for (let func of funcs) {
        // console.log("Functions", func);
        if (func.areArgumentsValid(argTypes, c)) {
            functions.push(func);
        }
    }
    return functions;
}