import path from "path";
import { strict as assert } from "assert"
import { Compiler } from "../../compiler/Compiler";
import { Interpreter } from "../Interpreter";
import { Function } from "../../compiler/ast/Function";
import { InterpreterInstance } from "../InterpreterInstance";
import { coreTypes } from "../../compiler/coreTypes";
import { ArrayExpression } from "../../compiler/ast/ArrayExpression";
import { Variable } from "../../compiler/ast/Variable";
import * as Colors from "../../compiler/errors/Colors";

let compiler = new Compiler({ log: console.log, test: true });
let assembly = compiler.compileToAstAssembly(
    Compiler.getFiles([path.join(__dirname, "../../../src/ion")], compiler.options)
);

function unitTest(interpreter: Interpreter, func: Function, name = func.id?.name ?? "?") {
    let unitTestMetaCalls = interpreter.getMetaCalls(func, coreTypes.UnitTest);
    for (let unitTestMetaCall of unitTestMetaCalls) {
        let args = (unitTestMetaCall.nodes[0] as ArrayExpression).nodes.map(node => node.toInterpreterValue(interpreter.context)) as InterpreterInstance[];
        let expected = unitTestMetaCall.nodes[1].toInterpreterValue(interpreter.context) as InterpreterInstance;
        if(name + args.join(",") === `combine_0{"type":"String","value":"a"},{"type":"String","value":"b"}`) {
            debugger;
        }
        let result = interpreter.call(func, args) as InterpreterInstance;
        if (expected.toString() !== result.toString()) {
            console.log(`${Colors.FgRed}Unit test failed: ${Colors.Reset}${name}(${args.join(",")}) == ${result.value}, expected: ${expected}`);
        }
        else {
            console.log(`${Colors.FgGreen}Unit test passed: ${Colors.Reset}${name}(${args.join(",")}) == ${expected}`);
        }
    }
}

let interpreter = new Interpreter(assembly);
let start = Date.now();

let declarations = interpreter.getAllDeclarations();
for (let declaration of declarations) {
    if (declaration instanceof Variable) {
        let value = declaration.value;
        if (value instanceof Function) {
            unitTest(interpreter, value, declaration.id.name);
        }
    }
}
// let add = interpreter.getValue("sample") as Function;
// unitTest(interpreter, add);
//  todo, iterate all functions and unit test them.

// let result = interpreter.call(add, [new InterpreterInstance(1), new InterpreterInstance(2)]);
// console.log({ result });

let finish = Date.now();
let time = finish - start;

console.log(`Time: ${time}`);
assert(true);
