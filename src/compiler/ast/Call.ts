import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Scope, ScopeProps } from "./Scope";
import { isCallable } from "./Callable";
import { SemanticError } from "../SemanticError";
import { MultiFunction } from "./MultiFunction";

export interface AssignmentProps extends ScopeProps {
    callee: Expression;
}

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

export class Call extends Scope {

    callee!: Expression;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* super.getDependencies(c);
        // can't resolve the callee type if it's a multi-method until the arguments are known.
        yield this.callee;
    }

    protected resolveType(c: EvaluationContext) {
        let callable = c.getValue(this.callee);
        if (isCallable(callable)) {
            let types = this.nodes.map(arg => arg.type!);
            let returnType = callable.getReturnType(types, c);
            if (returnType === null) {
                if (callable instanceof MultiFunction) {
                    console.log({ callee: this.callee });
                    throw new SemanticError(`No function ${this.callee.toString()} found with arg types ${types.join(`, `)}`, this.location);
                }
                else {
                    throw new SemanticError(`Arguments do not match function parameter types`, this.location);
                }
            }
            return returnType;
        }
        else {
            c.errors.push(new SemanticError(`${this.callee} is not callable`, this.callee));
            return null;
        }
    }

    toString() {
        return `${this.callee}(${this.nodes})${this.toTypeString()}`;
    }

}