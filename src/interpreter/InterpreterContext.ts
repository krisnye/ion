import { getNativeJavascript } from "../compiler/ast/Call";
import { Class } from "../compiler/ast/Class";
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

    toInterpreterValue(node) {
        let value: InterpreterValue | void;
        if (node instanceof Expression) {
            value = node.toInterpreterValue(this);
        }
        value = InterpreterInstance.wrap(value);
        return value;
    }

    call(func: Function | Class, args: InterpreterValue[], checkArguments = false): InterpreterValue {
        if (func == null) {
            console.log("????", func);
            debugger;
        }
        let javascript = getNativeJavascript(func, this.context);
        if (javascript) {
            let nativeArgs = args.map(InterpreterInstance.unwrap);
            let result = evalJavascript(javascript)(...nativeArgs);
            if (!(result instanceof InterpreterInstance)) {
                result = new InterpreterInstance(result);
            }
            return result;
        }


        if (func.parameters.length !== args.length) {
            throw new Error(`Wrong arguments length, function: ${func.id}, expected: ${func.parameters.length}, actual: ${args.length}`);
        }
        if (func instanceof Function) {
            this.pushLocals();
            for (let i = 0; i < func.parameters.length; i++) {
                const parameter = func.parameters[i];
                // check if parameter fits
                // console.log({ parameter, parameterType: parameter.type });
                if (checkArguments && !parameter.type!.isInstance(this, args[i])) {
                    throw new Error(`Argument ${i}: ${args[i]} is not of expected type: ${parameter}`);
                }
    
                this.setValue(parameter.id.name, args[i]);
            }
            func.body.toInterpreterValue(this);
            this.popLocals();
            if (this.returnValue == null) {
                console.log(args);
                throw new Error(`Expected context.returnValue from function ${func}`);
            }
            let returnValue = this.returnValue;
            // always reset the return value.
            this.returnValue = null;
            return returnValue;
        }
        else {
            let propertyEntries = args.map((value, index) => [func.parameters[index].id.name, value]);
            return new InterpreterInstance(Object.fromEntries(propertyEntries), func.id.name);
        }
    }

}