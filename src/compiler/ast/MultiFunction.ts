import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { Function } from "./Function";
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

export function getReturnType(funcs: Function[], args: Expression[], argTypes: Type[], c: EvaluationContext): Type | null {
    let possibleFunctionCalls = getPossibleFunctionCalls(funcs, args, argTypes, c);
    let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(argTypes, c));
    return UnionType.join(...returnTypes);
}

export function getPossibleFunctionCalls(funcs: (Function | null)[], args: Expression[], argTypes: Type[], c: EvaluationContext): Function[] {
    let functions = new Array<Function>();
    for (let func of funcs) {
        if (func?.areArgumentsValid(args, argTypes, c)) {
            functions.push(func);
        }
    }
    return functions;
}