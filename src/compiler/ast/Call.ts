import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { Function } from "./Function";
import { isMetaName, logOnce } from "../utility";
import { Reference } from "./Reference";
import { Container, ContainerProps } from "./Container";
import { isCallable } from "./Callable";
import { SemanticError } from "../SemanticError";
import { getPossibleFunctionCalls, getReturnType } from "./MultiFunction";
import { FunctionDeclaration } from "./FunctionDeclaration";
import { isInferFunction } from "../phases/typeInference";

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
        let possibleFunctions = this.getResolvedPossibleFunctions(c);
        if (possibleFunctions) {
            let allInferred = possibleFunctions.length > 0 && possibleFunctions.every(f => isInferFunction(f));
            if (possibleFunctions.length > 0 && !allInferred) {
                yield* possibleFunctions.filter(f => !isInferFunction(f));
                return;
            }
        }

        yield* c.getValues(this.callee);
    }

    getResolvedPossibleFunctions(c: EvaluationContext): Function[] | null {
        const areAllParametersResolved = this.nodes.every(param => param.resolved);
        if (areAllParametersResolved) {
            let values = c.getValues(this.callee) as Function[];
            let argTypes = this.getArgTypes();
            let possibleFunctionCalls = getPossibleFunctionCalls(values, argTypes, c);
            return possibleFunctionCalls;
        }
        return null;
    }

    needsToInferNewConcreteFunction(c: EvaluationContext): FunctionDeclaration | void {
        let possibleFunctions = this.getResolvedPossibleFunctions(c);
        if (possibleFunctions) {
            let allInferred = possibleFunctions.length > 0 && possibleFunctions.every(f => isInferFunction(f));
            if (allInferred) {
                let argTypes = this.getArgTypes();
                let createFunction = possibleFunctions[0] as FunctionDeclaration;
                createFunction = createFunction.patch({
                    inferred: true,
                    parameters: createFunction.parameters.map(
                        (param, index) => param.patch({ declaredType: param.declaredType ?? argTypes[index] })
                    )
                });
                // logOnce("!!!!! we should infer: " + createFunction);
                return new FunctionDeclaration(createFunction);
            }
        }
    }

    getArgTypes() {
        return this.nodes.map(arg => arg.type!);
    }

    protected resolveType(c: EvaluationContext) {
        let callables = c.getValues(this.callee) as Function[];
        let types = this.getArgTypes();
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