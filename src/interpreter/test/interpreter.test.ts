import path from "path";
import { strict as assert } from "assert"
import { Compiler } from "../../compiler/Compiler";
import { Interpreter } from "../Interpreter";
import { Function } from "../../compiler/ast/Function";
import { InterpreterInstance } from "../InterpreterInstance";

const perfTest = false;
let compiler = new Compiler({ log: console.log, test: true });
let assembly = compiler.compileToAstAssembly(
    Compiler.getFiles([path.join(__dirname, "../../../src/ion")], compiler.options)
);

let interpreter = new Interpreter(assembly);
let start = Date.now();
let add = interpreter.getValue("sample") as Function;
let result = interpreter.call(add, [new InterpreterInstance(1), new InterpreterInstance(2)]);
console.log({ result });
let finish = Date.now();
let time = finish - start;

console.log(`Time: ${time}`);
assert(true);
