import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { AnyType } from "./AnyType";
import { Callable } from "./Callable";
import { Function } from "./Function";
import { Scope, ScopeProps } from "./Scope";
import { Type } from "./Type";
import { UnionType } from "./UnionType";

export interface MultiFunctionProps extends ScopeProps {
    nodes: Function[];
}

export class MultiFunction extends Scope implements Callable {

    nodes!: Function[];

    constructor(props: MultiFunctionProps) { super(props); }
    patch(props: Partial<MultiFunctionProps>) { return super.patch(props); }

    call(args: Node[]): Node {
        throw new Error();
    }

    getReturnType(argTypes: Type[], c: EvaluationContext): Type | null {
        let possibleFunctionCalls = this.getPossibleFunctionCalls(argTypes, c);
        let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(argTypes, c));
        return UnionType.join(...returnTypes);
    }

    getPossibleFunctionCalls(argTypes: Type[], c: EvaluationContext): Function[] {
        let functions = new Array<Function>();
        for (let func of this.nodes) {
            if (func.areArgumentsValid(argTypes, c)) {
                functions.push(func);
            }
        }
        return functions;
    }

    resolveType(c: EvaluationContext) {
        return new AnyType({ location: this.location });
    }

    toString() {
        return Scope.toString(this.nodes, "MultiFunction[", "]");
    }

}