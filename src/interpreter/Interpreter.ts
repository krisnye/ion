import { Assembly } from "../compiler/ast/Assembly";
import { Declaration, isDeclaration } from "../compiler/ast/Declaration";
import { Function } from "../compiler/ast/Function";
import { getMetaCalls, MetaContainer } from "../compiler/ast/MetaContainer";
import { createEvaluationContext } from "../compiler/phases/frontend/createScopeMaps";
import { InterpreterContext } from "./InterpreterContext";
import { InterpreterValue } from "./InterpreterValue";

export class Interpreter {

    private assembly: Assembly;
    public readonly context: InterpreterContext;

    constructor(assembly: Assembly) {
        this.assembly = assembly;
        this.context = new InterpreterContext(
            createEvaluationContext(assembly),
            this.assembly.nodes[0],
        );
    }

    getAllDeclarations(): Declaration[] {
        return this.assembly.nodes.filter(isDeclaration);
    }

    getMetaCalls(container: MetaContainer, path: string) {
        return getMetaCalls(container, path);
    }

    getValue(name: string) {
        return this.context.getValue(name);
    }

    call(func: Function, args: InterpreterValue[]): InterpreterValue {
        return this.context.call(func, args, true);
    }

}
