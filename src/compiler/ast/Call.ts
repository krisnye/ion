import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { Function } from "./Function";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Container, ContainerProps } from "./Container";
import { isCallable } from "./Callable";
import { SemanticError } from "../SemanticError";
import { getReturnType } from "./MultiFunction";

export interface AssignmentProps extends ContainerProps {
    callee: Expression;
}

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

export class Call extends Container {

    callee!: Expression;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* super.getDependencies(c);
        // can't resolve the callee type if it's a multi-method until the arguments are known.
        let values = c.getValues(this.callee);
        if (values.findIndex(v => !v) >= 0) {
            debugger;
            values = c.getValues(this.callee);
        }
        yield* c.getValues(this.callee);
    }

    protected resolveType(c: EvaluationContext) {
        let callables = c.getValues(this.callee) as Function[];
        let types = this.nodes.map(arg => {
            return arg.type!;
        });
        // console.log("Callables: " + callables.map(c => c?.toString() ?? "undefined").join(", "));
        if (callables.length > 1) {
            let returnType = getReturnType(callables, types, c);
            if (returnType === null) {
                throw new SemanticError(`No function ${this.callee.toString()} found with arg types ${types.join(`, `)}`, this.location);
            }
            return returnType;
        }
        let callable = callables[0];
        if (!isCallable(callable)) {
            c.errors.push(new SemanticError(`${this.callee} is not callable`, this.callee));
            return null;
        }
        return callable.getReturnType(types, c);
    }

    toString() {
        return `${this.callee}(${this.nodes})${this.toTypeString()}`;
    }

}