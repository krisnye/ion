import { EvaluationContext } from "../EvaluationContext";
import { Expression } from "./Expression";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Scope, ScopeProps } from "./Scope";
import { isCallable } from "./Callable";
import { SemanticError } from "../SemanticError";
import { getMetaCall, isMetaContainer } from "./MetaContainer";
import { coreTypes } from "../coreTypes";
import { MultiFunction } from "./MultiFunction";

export interface AssignmentProps extends ScopeProps {
    callee: Expression;
}

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

// export function isConsequent(assertedType: Node, consequentType: Node): boolean | null {
//     // for now... make sure they are the same.
//     return assertedType.toString() === consequentType.toString();
// }

// function checkParameter(call: Expression, param: Variable | undefined, arg: Expression | undefined) : Expression | Error {
//     if (param == null) {
//         return new SemanticError(`Unexpected argument`, arg!);
//     }
//     // TODO: We need to be checking against the Function TYPE not the Function directly.
//     // for now, a variable argument name must match param name
//     if (arg instanceof Variable) {
//         if (arg.id.name !== param.id.name) {
//             return new SemanticError(`Wrong argument name '${arg.id.name}', expected '${param.id.name}`, arg.id);
//         }
//         arg = arg.value!;
//     }
//     if (arg == null) {
//         if (param.value) {
//             return param.value;
//         }
//         return new SemanticError(`Missing argument ${param.id.name}`, call);
//     }
//     // check types here.
//     let consequent = isConsequent(param.type!, arg.type!);
//     if (consequent === true) {
//         return arg;
//     }
//     return new SemanticError(
//         consequent === false
//             ? `Argument is never of type: ${param.type!}`
//             : `Argument may not be of type: ${param.type!}`,
//         arg,
//     );
// }

// export function checkParameters(call: Node, params: Variable[], args: Node[], c: EvaluationContext): Node[] | Error[] {
//     //  1. [x] check parameters
//     //  2. [x] implement Class.Call => ObjectExpression
//     //  3. [ ] implement MultiFunction.call =>
//     //      a. [x] conversion of AST Node to Interpreter Instance
//     //      b. [ ] conversion of Interpreter Instance to AST Node
//     //      c. [ ] invoking Javascript Interpreter for Native
//     let result = new Array<Variable>();
//     let errors = new Array<Error>();
//     for (let i = 0; i < Math.max(params.length, args.length); i++) {
//         let param = params[i];
//         let arg = c.getValue(args[i]);
//         let value = checkParameter(call, param, arg);
//         if (value instanceof Error) {
//             errors.push(value);
//             break;
//         }
//         else {
//             result.push(param.patch({ location: arg.location, value }));
//         }
//     }
//     return errors.length ? errors : result;
// }

export class Call extends Scope {

    callee!: Expression;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield this.callee;
        yield* super.getDependencies(c);
    }

    resolveType(c: EvaluationContext) {
        let callable = c.getValue(this.callee);
        if (isCallable(callable)) {
            let types = this.nodes.map(arg => arg.type!);
            let returnType = callable.getReturnType(types, c);
            if (returnType === null) {
                if (callable instanceof MultiFunction) {
                    throw new SemanticError(`No function ${this.callee} with matching parameter types found`, this.location);
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