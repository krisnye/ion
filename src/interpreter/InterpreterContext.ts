import { getNativeJavascript } from "../compiler/ast/Call";
import { Expression } from "../compiler/ast/Expression";
import { Function } from "../compiler/ast/Function";
import { getMetaCall } from "../compiler/ast/MetaContainer";
import { coreTypes } from "../compiler/coreTypes";
import { EvaluationContext } from "../compiler/EvaluationContext";
import { Node } from "../compiler/Node";
import { evalJavascript } from "../compiler/phases/backend/javascript/addNativeCalls";
import { InterpreterInstance } from "./InterpreterInstance";
import { InterpreterValue } from "./InterpreterValue";

export class InterpreterContext {

    context: EvaluationContext;
    localStack: Map<string, InterpreterValue>[] = [];
    scopeNode: Node;
    public returnValue: InterpreterValue | null = null;
    public break = false;

    constructor(context: EvaluationContext, scopeNode: Node) {
        this.context = context;
        this.scopeNode = scopeNode;
        this.pushLocals();
    }

    pushLocals(locals = new Map<string, InterpreterValue>) {
        this.localStack.push(locals);
    }
    popLocals() {
        this.localStack.pop();
    }

    get locals() {
        return this.localStack[this.localStack.length - 1];
    }

    isTrue(value: InterpreterValue) {
        if (value instanceof InterpreterInstance) {
            return value.isTrue();
        }
        return false;
    }

    getValue(name: string) {
        return this.locals.get(name) ?? this.context.getValue(this.context.getDeclaration(this.scopeNode, name) as Expression)?.toInterpreterValue(this);
    }

    setValue(name: string, value: InterpreterValue) {
        this.locals.set(name, value);
    }

    call(func: Function, args: InterpreterValue[], checkArguments = false): InterpreterValue {
        let javascript = getNativeJavascript(func, this.context);
        if (javascript) {
            let nativeArgs = args.map(arg => (arg as InterpreterInstance).value);
            let result = evalJavascript(javascript)(...nativeArgs);
            return new InterpreterInstance(result);
        }

        if (func.parameters.length !== args.length) {
            throw new Error("Wrong arguments length");
        }
        this.pushLocals();
        for (let i = 0; i < func.parameters.length; i++) {
            const parameter = func.parameters[i];
            // check if parameter fits
            if (checkArguments && !parameter.type!.isInstance(this, args[i])) {
                throw new Error(`Argument ${i}: ${args[i]} is not of expected type: ${parameter}`);
            }

            this.setValue(parameter.id.name, args[i]);
        }
        func.body.toInterpreterValue(this);
        this.popLocals();
        if (this.returnValue == null) {
            throw new Error("Expected context.returnValue");
        }
        let returnValue = this.returnValue;
        // always reset the return value.
        this.returnValue = null;
        return returnValue;
    }

}