import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { Function } from "./Function";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Container, ContainerProps } from "./Container";
import { isCallable } from "./Callable";
import { SemanticError } from "../SemanticError";
import { getPossibleFunctionCalls, getReturnType } from "./MultiFunction";
import { FunctionDeclaration } from "./FunctionDeclaration";
import { isInferFunction } from "../phases/typeInference";
import { getSSAOriginalName } from "../phases/ssaForm";
import { traverse } from "../traverse";
import { Variable } from "./Variable";
import { Identifier } from "./Identifier";
import { Type } from "./Type";
import { ObjectType } from "./ObjectType";
import { Member } from "./Member";

export interface CallProps extends ContainerProps {
    callee: Expression;
    uniformFunctionCallSyntax?: boolean;
}

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

export class Call extends Container {

    callee!: Expression;
    uniformFunctionCallSyntax!: boolean;

    constructor(props: CallProps) {
        super({
            uniformFunctionCallSyntax: false,
            ...props
        });
    }
    patch(props: Partial<CallProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* super.getDependencies(c);
        // can't resolve the callee type if it's a multi-method until the arguments are known.
        let possibleFunctions = this.getResolvedPossibleFunctions(c);
        if (possibleFunctions) {
            let allInferred = possibleFunctions.length > 0 && possibleFunctions.every(isInferFunction);
            if (possibleFunctions.length > 0 && !allInferred) {
                yield* possibleFunctions.filter(f => !isInferFunction(f));
                return;
            }
        }

        yield* c.getValues(this.callee);
    }

    getResolvedPossibleFunctions(c: EvaluationContext): Expression[] | null {
        const areAllParametersResolved = this.nodes.every(param => param.resolved);
        if (areAllParametersResolved) {
            let values = c.getValues(this.callee) as Function[];
            let args = this.nodes;
            let argTypes = this.getArgTypes();
            let possibleFunctionCalls = getPossibleFunctionCalls(values, args, argTypes, c);
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
        return this.nodes.map(node => node.type!);
    }

    protected resolve(c: EvaluationContext) {
        let callee = this.callee;
        if (callee instanceof Call && callee.uniformFunctionCallSyntax) {
            return callee.patch({ nodes: [...callee.nodes, ...this.nodes], uniformFunctionCallSyntax: false });
        }
        return super.resolve(c);
    }

    protected resolveType(c: EvaluationContext) {
        let callables = c.getValues(this.callee) as Function[];
        let args = this.nodes;
        let types = toUniformArgParameterTypes(args);
        if (callables.length > 1) {
            let returnType = getReturnType(this, callables, args, types, c);
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
        let errors = new Array<Error>();
        if (!this.uniformFunctionCallSyntax && !callable.areArgumentsValid(args, types, c, errors)) {
            c.errors.push(...errors);
        }

        return callable.getReturnType(this, types, c);
    }

    toString() {
        return `${this.callee}(${this.nodes})${this.toTypeString()}`;
    }

}

const uniformParamPrefix = "_param_";

function getUniformParamName(index: number) {
    return `${uniformParamPrefix}${index}`;
}

function getUniformParamIndex(name: string): number {
    if (name.startsWith(uniformParamPrefix)) {
        return parseInt(name.slice(uniformParamPrefix.length));
    }
    return -1;
}

export function replaceParamReferencesWithArgumentTypes(c: EvaluationContext, argTypes: Type[], paramType: Type) {
    function getObjectType(node): ObjectType | null {
        if (node instanceof Reference) {
            let paramIndex = getUniformParamIndex(node.name);
            if (paramIndex >= 0) {
                let argType = c.getComparisonType(argTypes[paramIndex]);
                if (argType instanceof ObjectType) {
                    return argType;
                }
            }
        }
        return null;
    }

    // try to traverse and find other parameter thingies.
    return traverse(paramType, {
        leave(node) {
            if (node instanceof Member) {
                // we will replace members with referenced type if present.
                let objectType = getObjectType(node.object);
                if (objectType) {
                    let keyType = node.property instanceof Expression ? node.property.type : node.property;
                    if (keyType) {
                        let propertyType = objectType.getPropertyType(keyType, c);
                        if (propertyType) {
                            return propertyType;
                        }
                    }
                }
            }
        }
    });
}

export function toUniformArgParameterTypes(params: Expression[]) {
    let namesMap = new Map<string,string>();
    for (let index = 0; index < params.length; index++) {
        let param: Expression | Identifier = params[index];
        if (param instanceof Variable) {
            param = param.id;
        }
        if (param instanceof Reference || param instanceof Identifier) {
            namesMap.set(getSSAOriginalName(param.name), getUniformParamName(index));
        }
    }
    let types = params.map(arg => (arg instanceof Variable ? arg.declaredType ?? arg.type : arg.type)!);
    // remap reference names
    types = traverse(types, {
        leave(node) {
            if (node instanceof Reference) {
                let name = getSSAOriginalName(node.name);
                let mappedName = namesMap.get(name);
                if (mappedName) {
                    node = node.patch({ name: mappedName });
                }
            }
            return node;
        }
    });

    return types;
}