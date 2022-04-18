import { Node } from "../Node";
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

    getReturnType(argTypes: Type[]): Type {
        let possibleFunctionCalls = this.getPossibleFunctionCalls(argTypes);
        let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(argTypes));
        return UnionType.join(returnTypes);
    }

    getPossibleFunctionCalls(argTypes: Type[]): Function[] {
        let functions = new Array<Function>();
        for (let func of this.nodes) {
            if (func.areArgumentsValid(argTypes)) {
                functions.push(func);
            }
        }
        return functions;
    }

    toString() {
        return Scope.toString(this.nodes, "MultiFunction[", "]");
    }

}